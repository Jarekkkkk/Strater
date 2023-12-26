import {
  TransactionBlock,
  TransactionArgument,
} from '@mysten/sui.js/transactions'
import { CLOCK_OBJECT, COIN_TYPES } from '../common/constants'
import {
  coinFromBalance,
  getCoinValue,
  getInputCoins,
  newZeroCoin,
} from '../common/helpers'
import { CETUS_CONFIG } from './config'
import {
  Pool,
  Position,
  SuiObjectIdType,
  asUintN,
} from '@cetusprotocol/cetus-sui-clmm-sdk'
import { CetusSDK } from './getter'

export function cetusSwapUsdcToSui(
  tx: TransactionBlock,
  senderAddress: string,
  usdcCoin: TransactionArgument,
): TransactionArgument {
  const zeroSuiCoin = newZeroCoin(tx, COIN_TYPES.SUI)
  const usdcCoinValue = getCoinValue(tx, COIN_TYPES.USDC, usdcCoin)

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
    ],
  })

  tx.transferObjects([usdcOutCoin], senderAddress)
  return suiOutCoin
}

export function cetusSwapSuiToUsdc(
  tx: TransactionBlock,
  senderAddress: string,
  suiCoin: TransactionArgument,
): TransactionArgument {
  const zeroUsdcCoin = newZeroCoin(tx, COIN_TYPES.USDC)
  const suiCoinValue = getCoinValue(tx, COIN_TYPES.SUI, suiCoin)

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
    ],
  })

  tx.transferObjects([suiOutCoin], senderAddress)
  return usdcOutCoin
}

export function remove_liquiditiy(
  tx: TransactionBlock,
  pool: Pool,
  position: Position,
  deltaLiquidity: string,
): [TransactionArgument, TransactionArgument] {
  const [balance0, balance1] = tx.moveCall({
    target: CETUS_CONFIG.removeLiquidityTarget,
    typeArguments: [pool.coinTypeA, pool.coinTypeB],
    arguments: [
      tx.sharedObjectRef(CETUS_CONFIG.globalConfigObj),
      tx.object(pool.poolAddress),
      tx.object(position.pos_object_id),
      tx.pure(deltaLiquidity),
      tx.object(CLOCK_OBJECT),
    ],
  })
  return [balance0, balance1]
}

export function collect_fee(
  tx: TransactionBlock,
  pool: Pool,
  position: Position,
) {
  const [balance0, balance1] = tx.moveCall({
    target: CETUS_CONFIG.collectFeeTarget,
    typeArguments: [pool.coinTypeA, pool.coinTypeB],
    arguments: [
      tx.sharedObjectRef(CETUS_CONFIG.globalConfigObj),
      tx.object(pool.poolAddress),
      tx.object(position.pos_object_id),
      tx.pure(false),
    ],
  })
  return [balance0, balance1]
}

export function open_position(
  tx: TransactionBlock,
  pool: Pool,
  lower_tick: number,
  upper_tick: number,
): TransactionArgument {
  return tx.moveCall({
    target: CETUS_CONFIG.openPositionTarget,
    typeArguments: [pool.coinTypeA, pool.coinTypeB],
    arguments: [
      tx.sharedObjectRef(CETUS_CONFIG.globalConfigObj),
      tx.object(pool.poolAddress),
      tx.pure(asUintN(BigInt(lower_tick)).toString()),
      tx.pure(asUintN(BigInt(upper_tick)).toString()),
    ],
  })
}
export function close_position(
  tx: TransactionBlock,
  pool: Pool,
  position: Position,
) {
  tx.moveCall({
    target: CETUS_CONFIG.closePositionTarget,
    typeArguments: [pool.coinTypeA, pool.coinTypeB],
    arguments: [
      tx.sharedObjectRef(CETUS_CONFIG.globalConfigObj),
      tx.object(pool.poolAddress),
      tx.object(position.pos_object_id),
    ],
  })
}
export function open_position_with_liquidity(
  tx: TransactionBlock,
  pool: Pool,
  liq: string,
  coin0: TransactionArgument[],
  coin1: TransactionArgument[],
  amount0: string,
  amount1: string,
  lower_tick: number,
  upper_tick: number,
  fixAmount0: boolean,
) {
  const isPosition = (pos: any): pos is Position =>
    pos.pos_object_id !== undefined
  tx.moveCall({
    target: CETUS_CONFIG.openPositionWitLiquidityWithAllTarget,
    typeArguments: [pool.coinTypeA, pool.coinTypeB],
    arguments: [
      tx.object(CETUS_CONFIG.globalConfigObj.objectId),
      tx.object(pool.poolAddress),
      tx.pure(asUintN(BigInt(lower_tick)).toString()),
      tx.pure(asUintN(BigInt(upper_tick)).toString()),
      tx.makeMoveVec({
        objects: coin0,
        type: `0x2::coin::Coin<${pool.coinTypeA}>`,
      }),
      tx.makeMoveVec({
        objects: coin1,
        type: `0x2::coin::Coin<${pool.coinTypeB}>`,
      }),
      tx.pure(amount0),
      tx.pure(amount1),
      tx.pure(fixAmount:queueMicrotask-1),
      tx.object(CLOCK_OBJECT),
    ],
  })
}
