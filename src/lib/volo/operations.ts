import {
  TransactionArgument,
  TransactionBlock,
  TransactionResult,
} from "@mysten/sui.js/transactions";
import { SYSTEM_STATE_OBJECT } from "../common/constants";
import { VOLO_CONFIG } from "./config";

export function voloStakeSUI(
	tx: TransactionBlock,
	suiCoin: TransactionArgument,
): TransactionResult {
  return tx.moveCall({
    target: VOLO_CONFIG.stakeTarget,
    arguments: [
      tx.sharedObjectRef(VOLO_CONFIG.nativePool),
      tx.sharedObjectRef(VOLO_CONFIG.metadata),
      tx.object(SYSTEM_STATE_OBJECT),
      suiCoin,
    ],
  });
}
