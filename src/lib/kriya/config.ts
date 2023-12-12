import { MoveCallTarget } from "../common/types";

export const KRIYA_CONFIG = {
  swapX2YTarget:
    "0xa0eba10b173538c8fecca1dff298e488402cc9ff374f8a12ca7758eebe830b66::spot_dex::swap_token_x" as MoveCallTarget,
  swapY2XTarget:
    "0xa0eba10b173538c8fecca1dff298e488402cc9ff374f8a12ca7758eebe830b66::spot_dex::swap_token_y" as MoveCallTarget,
  usdcBuckPoolObj: {
    objectId: "0xbb4a712b3353176092cdfe3dd2d1251b725f9372e954248e5dd2eb2ab6a5f21a",
    initialSharedVersion: 6704083,
    mutable: true
  },
}