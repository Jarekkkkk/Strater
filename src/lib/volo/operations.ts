import {
  TransactionArgument,
  TransactionBlock,
  TransactionResult,
} from "@mysten/sui.js/transactions";
import { SYSTEM_STATE_OBJECT } from "../common/constants";
import { VOLO_CONFIG } from "./config";
import { txMoveCall } from "../utils/parser/scallopParser";
import { ScallopTxBlock } from "@scallop-io/sui-scallop-sdk";

export function voloStakeSUI(
	tx: TransactionBlock | ScallopTxBlock,
	suiCoin: TransactionArgument,
): TransactionResult {
  return txMoveCall(tx, {
    target: VOLO_CONFIG.stakeTarget,
    arguments: [
      tx.sharedObjectRef(VOLO_CONFIG.nativePool),
      tx.sharedObjectRef(VOLO_CONFIG.metadata),
      tx.object(SYSTEM_STATE_OBJECT),
      suiCoin,
    ],
  });
}
