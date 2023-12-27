import {
  TransactionBlock,
  TransactionArgument,
} from '@mysten/sui.js/transactions'
import { COIN_TYPES } from '../common/constants'
import { getCoinValue } from '../common/helpers'
import { KRIYA_CONFIG } from './config'

export function kriyaSwapUsdcToBuck(
  tx: TransactionBlock,
  inputs: {
    usdcCoin: TransactionArgument
    minBuckOutAmount: number
  },
): TransactionArgument {
  const { usdcCoin, minBuckOutAmount } = inputs
  const usdcCoinValue = getCoinValue(tx, COIN_TYPES.USDC, usdcCoin)
  const buckOutCoin = tx.moveCall({
    target: KRIYA_CONFIG.swapX2YTarget,
    typeArguments: [COIN_TYPES.USDC, COIN_TYPES.BUCK],
    arguments: [
      tx.sharedObjectRef(KRIYA_CONFIG.usdcBuckPoolObj),
      usdcCoin,
      usdcCoinValue,
      tx.pure(minBuckOutAmount, 'u64'),
    ],
  })

  return buckOutCoin
}

export function kriyaSwapBuckToUsdc(
  tx: TransactionBlock,
  inputs: {
    buckCoin: TransactionArgument
    minUsdcOutAmount: number
  },
): TransactionArgument {
  const { buckCoin, minUsdcOutAmount } = inputs
  const buckCoinValue = getCoinValue(tx, COIN_TYPES.BUCK, buckCoin)
  const usdcOutCoin = tx.moveCall({
    target: KRIYA_CONFIG.swapY2XTarget,
    typeArguments: [COIN_TYPES.USDC, COIN_TYPES.BUCK],
    arguments: [
      tx.sharedObjectRef(KRIYA_CONFIG.usdcBuckPoolObj),
      buckCoin,
      buckCoinValue,
      tx.pure(minUsdcOutAmount, 'u64'),
    ],
  })

  return usdcOutCoin
}

export function kriyaAddLiquidity(
  tx: TransactionBlock,
  coin0: TransactionArgument,
  coin1: TransactionArgument,
  amount0: string,
  amount1: string,
) {
  tx.moveCall({
    target: KRIYA_CONFIG.addLiquidityTarget,
    typeArguments: [COIN_TYPES.BUCK, COIN_TYPES.SUI],
    arguments: [
      tx.sharedObjectRef(KRIYA_CONFIG.buckSuiPoolObj),
      coin0,
      coin1,
      tx.pure(amount0),
      tx.pure(amount1),
      tx.pure(0),
      tx.pure(0),
    ],
  })
}
