import {
    TransactionArgument,
    TransactionBlock,
    TransactionResult,
    Inputs,
  } from "@mysten/sui.js/transactions";
  import { Scallop } from '@scallop-io/sui-scallop-sdk'
  import { bucketFlashBorrow, bucketFlashRepay } from "../bucket/operations";
  import { LstSymbol } from "../common/types";
  import { coinFromBalance, stakeSUI } from "../common/helpers";
import { COIN_TYPES } from "../common/constants";
  
  export async function createScallopLeverageTx(inputs: {
    senderAddress: string,
    inputAmount: number,
    leverage: number,
    lstSymbol?: LstSymbol,
  }): Promise<TransactionBlock | undefined> {
    
    const {
      senderAddress, lstSymbol, inputAmount, leverage
    } = inputs;
    const scallopSDK = new Scallop({
      // secretKey: process.env.SECRET_KEY,
      networkType: 'mainnet',
    });
    const scallopBuilder = await scallopSDK.createScallopBuilder();
    const tx = scallopBuilder.createTxBlock();
    tx.setSender(senderAddress);
    const leverageAmount = inputAmount * (leverage - 1);
    
    // 1. flashloan sui from bucket 
    const [flashLoans, flashReceipt] = bucketFlashBorrow(tx, {
      coinSymbol: 'SUI',
      amount: leverageAmount,
    });
  
    const [inputCoin] = tx.splitCoins(tx.gas, [tx.pure(inputAmount, 'u64')]);
    const flashLoansCoin = coinFromBalance(tx, COIN_TYPES.SUI, flashLoans);
    tx.mergeCoins(inputCoin, [flashLoansCoin]);
  
    // 2. stake sui and get afsui/hasui/vsui
    const stSuiCoin = stakeSUI(tx, inputCoin, lstSymbol);
  
    // 3. deposit collateral afsui/hasui/vsui on scallop
    // Create an account and send obligation key to sender.
    // Simply Create an account, but the object returned by the instruction needs to be processed.
    const [obligation, obligationKey, hotPotato] = tx.openObligation();
    tx.addCollateral(obligation, stSuiCoin, lstSymbol?.toLowerCase() ?? 'sui');
    
    // 4. borrow SUI from scallop
    const suiAmount = Math.ceil(leverageAmount * 1.0005);
    const borrowedSuiCoin = await tx.borrow(obligation, obligationKey, suiAmount, 'sui');
    tx.returnObligation(obligation, hotPotato);
    tx.transferObjects([obligationKey], tx.pure(inputs.senderAddress, 'address'));
  
    // 5. repay flashloan on bucket
    bucketFlashRepay(tx, {
      coinSymbol: 'SUI',
      repayment: borrowedSuiCoin,
      flashReceipt: flashReceipt,
    });
  
    return tx;
  };
  