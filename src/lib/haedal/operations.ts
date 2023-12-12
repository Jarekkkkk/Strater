import {
  TransactionArgument,
  TransactionBlock,
  TransactionResult,
} from "@mysten/sui.js/transactions";
import { HAEDAL_CONFIG } from "./config";
import { SYSTEM_STATE_OBJECT } from "../common/constants";

export function haedalStakeSUI(
  tx: TransactionBlock,
	suiCoin: TransactionArgument,
): TransactionResult {
	return tx.moveCall({
		target: HAEDAL_CONFIG.stakeTarget,
    arguments: [
      tx.object(SYSTEM_STATE_OBJECT),
      tx.sharedObjectRef(HAEDAL_CONFIG.stakeObj),
      suiCoin,
      tx.pure(HAEDAL_CONFIG.validatorAddress, 'address'),
    ],
	});
}