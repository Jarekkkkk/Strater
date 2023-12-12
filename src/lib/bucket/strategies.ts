import { TransactionBlock, TransactionResult } from "@mysten/sui.js/transactions";
import { LstSymbol } from "../common/types";
import { COIN_TYPES } from "../common/constants";
import { coinFromBalance, coinIntoBalance, getCoinPrice, stakeSUI } from "../common/helpers";
import { SuiClient } from "@mysten/sui.js/client";
import { bucketBorrow, bucketFlashBorrow, bucketFlashRepay } from "./operations";
import { cetusSwapUsdcToSui } from "../cetus/operations";
import { kriyaSwapBuckToUsdc } from "../kriya/operations";

export async function createBucketLeverageTx(inputs: {
  suiClient: SuiClient,
  senderAddress: string,
  inputAmount: number,
  leverage: number,
  lstSymbol?: LstSymbol,
}): Promise<TransactionBlock | undefined> {
  const {
    suiClient, lstSymbol, senderAddress, inputAmount, leverage
  } = inputs;
  const tx = new TransactionBlock();
  const suiInCoin = tx.splitCoins(tx.gas, [tx.pure(inputAmount, 'u64')]);

  const price = await getCoinPrice(suiClient, 'SUI');
  if (price) {
    const leverageAmount = inputAmount * (leverage - 1);
    const usdcAmount = Math.round(leverageAmount * price / 1000);

    const [usdcLoans, receipt] = bucketFlashBorrow(tx, {
      coinSymbol: 'USDC',
      amount: usdcAmount,
    });

    const usdcLoansCoin = coinFromBalance(tx, COIN_TYPES.USDC, usdcLoans);
  
    const suiCoin = cetusSwapUsdcToSui(tx, senderAddress, usdcLoansCoin);
    tx.mergeCoins(suiInCoin, [suiCoin] as TransactionResult);
  
    // stake SUI
    const stSuiCoin = stakeSUI(tx, suiInCoin, lstSymbol);
  
    // borrow BUCK
    const buckAmount = Math.round(usdcAmount * 1000 * 1.005);
    const buckBalance = bucketBorrow(tx, {
      collSymbol: lstSymbol ?? 'SUI',
      collCoinInput: stSuiCoin,
      borrowAmount: buckAmount,
      ifUpdateOracle: true,
      ifReturnBalance: true,
    });
    const buckCoin = coinFromBalance(tx, COIN_TYPES.BUCK, buckBalance);
  
    // swap BUCK to USDC
    // -- aftermath --
    // const usdcCoin = await aftermathSwap(tx, {
    //   senderAddress,
    //   coinInSymbol: 'BUCK',
    //   coinOutSymbol: 'USDC',
    //   coinInAmount: BigInt(buckAmount),
    //   coinIn: buckCoin,
    // });
    // if (!usdcCoin) return undefined;
  
    // -- kriya --
    const minUsdcOutAmount = Math.ceil(usdcAmount * 1.0005);
    const usdcCoin = kriyaSwapBuckToUsdc(tx, {
      buckCoin,
      minUsdcOutAmount,
    });
  
    // flash repay USDC
    const usdcRepayment = coinIntoBalance(tx, COIN_TYPES.USDC, usdcCoin);
    bucketFlashRepay(tx, {
      coinSymbol: 'USDC',
      repayment: usdcRepayment,
      flashReceipt: receipt,
    });
  
    return tx;
  } else {
    return undefined;
  }
}
