import {
  Pool,
  Position,
  RemoveLiquidityParams,
  TickMath,
} from '@cetusprotocol/cetus-sui-clmm-sdk'
import {
  TransactionBlock,
  TransactionArgument,
} from '@mysten/sui.js/transactions'
import {
  close_position,
  collect_fee,
  open_position_with_liquidity_by_fix_coin,
  remove_liquiditiy,
} from './operations'
import {
  coinFromBalance,
  coinIntoBalance,
  getBalanceValue,
  getInputCoins,
  join_balance,
  join_coin,
} from '../common/helpers'
import { SuiClient } from '@mysten/sui.js/client'
import { getSymbolByType } from '../common/constants'

export async function adjustBuckSuiLiquidity(
  client: SuiClient,
  senderAddress: string,
  pool: Pool,
  position: Position,
  deltaLiquidity: string,
  lower_tick: number,
  upper_tick: number,
  liq: string,
  amount0: string | number,
  amount1: string | number,
  diff0: number,
  diff1: number,
) {
  const tx = new TransactionBlock()
  // remove_liquiditiy
  const [liq_balance0, liq_balance1] = remove_liquiditiy(
    tx,
    pool,
    position,
    deltaLiquidity,
  )

  // collect_fee
  const [fee_balance0, fee_balance1] = collect_fee(tx, pool, position)

  join_balance(tx, pool.coinTypeA, liq_balance0, fee_balance0)
  join_balance(tx, pool.coinTypeB, liq_balance1, fee_balance1)
  const main0 = coinFromBalance(tx, pool.coinTypeA, liq_balance0)
  const main1 = coinFromBalance(tx, pool.coinTypeB, liq_balance1)

  // close_position ( delete position NFT)
  close_position(tx, pool, position)

  // merge rquired coins
  if (diff0 > 0 && diff1 > 0) throw new Error('Invalid diff value')
  const symbol = getSymbolByType(pool.coinTypeA)
  if (!symbol) throw new Error('unsupported coinType')
  const { data: coins0_ } = await client.getCoins({
    owner: senderAddress,
    coinType: pool.coinTypeA,
  })
  const coins0 = coins0_.map((coin) =>
    tx.objectRef({
      objectId: coin.coinObjectId,
      version: coin.version,
      digest: coin.digest,
    }),
  )
  if (coins0.length > 0) tx.mergeCoins(main0, coins0)
  // join_coin(tx, pool.coinTypeA, main0, coin)
  const symbol1 = getSymbolByType(pool.coinTypeB)
  if (!symbol1) throw new Error('unsupported coinType')

  const suiBalance = Number(
    (
      await client.getBalance({
        owner: senderAddress,
        coinType: '0x2::sui::SUI',
      })
    ).totalBalance,
  )

  if (suiBalance < 50_000_000) throw new Error('Insufficient Gas')
  const coin1 = tx.splitCoins(tx.gas, [
    tx.pure(Number(suiBalance - 50_000_000), 'u64'),
  ])
  tx.mergeCoins(main1, [coin1])

  open_position_with_liquidity_by_fix_coin(
    tx,
    pool,
    liq,
    main0,
    main1,
    amount0.toString(),
    amount1.toString(),
    lower_tick,
    upper_tick,
    diff0 <= 0,
  )

  return tx
}
