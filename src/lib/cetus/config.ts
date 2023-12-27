import { MoveCallTarget } from '../common/types'

export const CETUS_CONFIG = {
  // target
  swapTarget:
    '0x12fc0b1791df55bf2c91921f12152659c4a897fa6867144b5b3939a3ea004c46::router::swap' as MoveCallTarget,
  collectFeeTarget:
    '0xc33c3e937e5aa2009cc0c3fdb3f345a0c3193d4ee663ffc601fe8b894fbc4ba6::pool::collect_fee' as MoveCallTarget,
  removeLiquidityTarget:
    '0xc33c3e937e5aa2009cc0c3fdb3f345a0c3193d4ee663ffc601fe8b894fbc4ba6::pool::remove_liquidity' as MoveCallTarget,
  closePositionTarget:
    '0xc33c3e937e5aa2009cc0c3fdb3f345a0c3193d4ee663ffc601fe8b894fbc4ba6::pool::close_position' as MoveCallTarget,
  openPositionWithLiquidityByFixCoinTarget:
    '0x12fc0b1791df55bf2c91921f12152659c4a897fa6867144b5b3939a3ea004c46::pool_script_v2::open_position_with_liquidity_by_fix_coin' as MoveCallTarget,

  // globalConfig
  globalConfigObj: {
    objectId:
      '0xdaa46292632c3c4d8f31f23ea0f9b36a28ff3677e9684980e4438403a67a3d8f',
    initialSharedVersion: 1574190,
    mutable: false,
  },

  // pool
  usdcSuiPoolObj: {
    objectId:
      '0xcf994611fd4c48e277ce3ffd4d4364c914af2c3cbb05f7bf6facd371de688630',
    initialSharedVersion: 1580450,
    mutable: true,
  },
  buckSuiPoolObj: {
    objectId:
      '0x9379d2d3f221dcea70f7f7d4a7bf30bab0128bcfda0d13a85267e51f7e6e15c0',
  },
}
