import { MoveCallTarget } from "@/lib/common/types";
import {
  TransactionBlock,
  TransactionArgument,
  TransactionResult
} from "@mysten/sui.js/transactions";
import { ScallopTxBlock } from "@scallop-io/sui-scallop-sdk";

export function txMoveCall(
  tx: TransactionBlock | ScallopTxBlock,
  inputs: {
    target: MoveCallTarget,
    typeArguments?: string[],
    arguments?: TransactionArgument[],
  },
): TransactionResult {
  if (tx instanceof TransactionBlock) {
    return tx.moveCall(inputs);
  } else {
    return tx.moveCall(
      inputs.target,
      inputs.arguments,
      inputs.typeArguments,
    );
  }
}