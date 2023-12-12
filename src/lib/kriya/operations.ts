import {
  TransactionBlock,
  TransactionArgument,
} from "@mysten/sui.js/transactions";
import { COIN_TYPES } from "../common/constants";
import { getCoinValue } from "../common/helpers";
import { KRIYA_CONFIG } from "./config";

export function kriyaSwapUsdcToBuck(
  tx: TransactionBlock,
	inputs: {
		usdcCoin: TransactionArgument,
		minBuckOutAmount: number,
	},
): TransactionArgument {
	const { usdcCoin, minBuckOutAmount } = inputs;
  const usdcCoinValue = getCoinValue(tx, COIN_TYPES.USDC, usdcCoin);
  const buckOutCoin = tx.moveCall({
    target: KRIYA_CONFIG.swapX2YTarget,
    typeArguments: [COIN_TYPES.USDC, COIN_TYPES.BUCK],
    arguments: [
      tx.sharedObjectRef(KRIYA_CONFIG.usdcBuckPoolObj),
      usdcCoin,
      usdcCoinValue,
      tx.pure(minBuckOutAmount, 'u64'),
    ],
  });

  return buckOutCoin;
}

export function kriyaSwapBuckToUsdc(
  tx: TransactionBlock,
  inputs: {
    buckCoin: TransactionArgument,
    minUsdcOutAmount: number,
  },
): TransactionArgument {
  const { buckCoin, minUsdcOutAmount } = inputs;
  const buckCoinValue = getCoinValue(tx, COIN_TYPES.BUCK, buckCoin);
  const usdcOutCoin = tx.moveCall({
    target: KRIYA_CONFIG.swapY2XTarget,
    typeArguments: [COIN_TYPES.USDC, COIN_TYPES.BUCK],
    arguments: [
      tx.sharedObjectRef(KRIYA_CONFIG.usdcBuckPoolObj),
      buckCoin,
      buckCoinValue,
      tx.pure(minUsdcOutAmount, 'u64'),
    ],
  });

  return usdcOutCoin;
}