import { MoveCallTarget } from "../common/types";

export const BUCKET_CONFIG = {
  peripheryPackageId:
    "0x899a11d003b8429e8ae8052920d703eb3d4f3e0ccdf6e3c96b244125295bd643",
  corePackageId:
    "0x1f2ec04660d4d28593cdfd245e6e0d26c4c1127ee47dd313ff297efa0ccadf59",
  typeId:
    "0xce7ff77a83ea0cb6fd39bd8748e2ec89a3f41e8efdc3f4eb123e0ca37b184db2",
  oracleUpdateTarget:
    "0xe2077d678de929d64d3fcd79c1adfbd23d97324e9bae3a60102d44367fbe008c::bucket_oracle::update_price_from_supra" as MoveCallTarget,
  oracleObj: {
    objectId: "0xf578d73f54b3068166d73c1a1edd5a105ce82f97f5a8ea1ac17d53e0132a1078",
    initialSharedVersion: 5174506,
    mutable: true,
  },
  protocolObj: {
    objectId: "0x9e3dab13212b27f5434416939db5dec6a319d15b89a84fd074d03ece6350d3df",
    initialSharedVersion: 6365975,
    mutable: true,
  },
};
