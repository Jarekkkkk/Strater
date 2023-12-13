import {
  TransactionArgument,
  TransactionBlock,
  TransactionResult,
} from "@mysten/sui.js/transactions";
import { HAEDAL_CONFIG } from "./config";
import { SYSTEM_STATE_OBJECT } from "../common/constants";
import { Scallop, ScallopTxBlock } from "@scallop-io/sui-scallop-sdk";
import { txMoveCall } from "../utils/parser/scallopParser";

export function haedalStakeSUI(
  tx: TransactionBlock | ScallopTxBlock,
	suiCoin: TransactionArgument,
): TransactionResult {
  return txMoveCall(tx, {
    target: HAEDAL_CONFIG.stakeTarget,
    arguments: [
      tx.object(SYSTEM_STATE_OBJECT),
      tx.sharedObjectRef(HAEDAL_CONFIG.stakeObj),
      suiCoin,
      tx.pure(HAEDAL_CONFIG.validatorAddress, 'address'),
    ],
  });
}