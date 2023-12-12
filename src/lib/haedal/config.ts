import { MoveCallTarget } from "../common/types";

export const HAEDAL_CONFIG = {
  stakeTarget: "0xbde4ba4c2e274a60ce15c1cfff9e5c42e41654ac8b6d906a57efa4bd3c29f47d::staking::request_stake_coin" as MoveCallTarget,
  stakeObj: {
    objectId: "0x47b224762220393057ebf4f70501b6e657c3e56684737568439a04f80849b2ca",
    initialSharedVersion: 24060192,
    mutable: true,
  },
  validatorAddress: "0x0000000000000000000000000000000000000000000000000000000000000000",  
}