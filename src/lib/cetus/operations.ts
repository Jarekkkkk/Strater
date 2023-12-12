import {
  TransactionBlock,
  TransactionArgument,
} from "@mysten/sui.js/transactions";
import { CLOCK_OBJECT, COIN_TYPES } from "../common/constants";
import { getCoinValue, newZeroCoin } from "../common/helpers";
import { CETUS_CONFIG } from "./config";

export function cetusSwapUsdcToSui(
  tx: TransactionBlock,
  senderAddress: string,
	usdcCoin: TransactionArgument,
): TransactionArgument {
  const zeroSuiCoin = newZeroCoin(tx, COIN_TYPES.SUI);
  const usdcCoinValue = getCoinValue(tx, COIN_TYPES.USDC, usdcCoin);

  const [usdcOutCoin, suiOutCoin] = tx.moveCall({
    target: CETUS_CONFIG.swapTarget,
    typeArguments: [COIN_TYPES.USDC, COIN_TYPES.SUI],
    arguments: [
      tx.sharedObjectRef(CETUS_CONFIG.globalConfigObj),
      tx.sharedObjectRef(CETUS_CONFIG.usdcSuiPoolObj),
      usdcCoin,
      zeroSuiCoin,
      tx.pure(true, 'bool'),
      tx.pure(true, 'bool'),
      usdcCoinValue,
      tx.pure(4295048016, 'u128'),
      tx.pure(false, 'bool'),
      tx.object(CLOCK_OBJECT),
    ]
  });

  tx.transferObjects([usdcOutCoin], senderAddress);
  return suiOutCoin;
}

export function cetusSwapSuiToUsdc(
  tx: TransactionBlock,
  senderAddress: string,
  suiCoin: TransactionArgument,
): TransactionArgument {
  const zeroUsdcCoin = newZeroCoin(tx, COIN_TYPES.USDC);
  const suiCoinValue = getCoinValue(tx, COIN_TYPES.SUI, suiCoin);

  const [usdcOutCoin, suiOutCoin] = tx.moveCall({
    target: CETUS_CONFIG.swapTarget,
    typeArguments: [COIN_TYPES.USDC, COIN_TYPES.SUI],
    arguments: [
      tx.sharedObjectRef(CETUS_CONFIG.globalConfigObj),
      tx.sharedObjectRef(CETUS_CONFIG.usdcSuiPoolObj),
      zeroUsdcCoin,
      suiCoin,
      tx.pure(true, 'bool'),
      tx.pure(true, 'bool'),
      suiCoinValue,
      tx.pure(4295048016, 'u128'),
      tx.pure(false, 'bool'),
      tx.object(CLOCK_OBJECT),
    ]
  });

  tx.transferObjects([suiOutCoin], senderAddress);
  return usdcOutCoin;
}