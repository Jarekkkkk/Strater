import {
  TransactionArgument,
  TransactionBlock,
  TransactionResult,
} from "@mysten/sui.js/transactions";
import { BUCKET_CONFIG } from "./config";
import { COIN_TYPES, CLOCK_OBJECT } from "../common/constants";
import { SUPRA_OJBECT_HOLDER_ID, SUPRA_PRICE_FEED_IDS } from "../supra/config";
import { coinIntoBalance } from "../common/helpers";

export function bucketFlashBorrow(
  tx: TransactionBlock,
  inputs: {
    coinSymbol: string,
    amount: number,
  },
): [TransactionArgument, TransactionArgument] {
  const { corePackageId, protocolObj } = BUCKET_CONFIG;
  const { coinSymbol, amount } = inputs;
  const coinType = COIN_TYPES[coinSymbol];
  if (coinType === COIN_TYPES.BUCK) {
    const [flashLoans, flashReceipt] = tx.moveCall({
      target: `${corePackageId}::buck::flash_borrow_buck`,
      typeArguments: [COIN_TYPES.SUI],
      arguments: [
        tx.sharedObjectRef(protocolObj),
        tx.pure(amount, 'u64'),
      ],
    });
    return [flashLoans, flashReceipt];
  } else {
    const [flashLoans, flashReceipt] = tx.moveCall({
      target: `${corePackageId}::buck::flash_borrow`,
      typeArguments: [coinType],
      arguments: [
        tx.sharedObjectRef(protocolObj),
        tx.pure(amount, 'u64'),
      ],
    });
    return [flashLoans, flashReceipt];
  };
}

export function bucketFlashRepay(
  tx: TransactionBlock,
  inputs: {
    coinSymbol: string,
    repayment: TransactionArgument,
    flashReceipt: TransactionArgument,
  },
) {
  const { corePackageId, protocolObj } = BUCKET_CONFIG;
  const { coinSymbol, repayment, flashReceipt } = inputs;
  const coinType = COIN_TYPES[coinSymbol];
  if (coinType === COIN_TYPES.BUCK) {
    return tx.moveCall({
      target: `${corePackageId}::buck::flash_repay_buck`,
      typeArguments: [COIN_TYPES.SUI],
      arguments: [
        tx.sharedObjectRef(protocolObj),
        repayment,
        flashReceipt,
      ],
    });
  } else {
    return tx.moveCall({
      target: `${corePackageId}::buck::flash_repay`,
      typeArguments: [coinType],
      arguments: [
        tx.sharedObjectRef(protocolObj),
        repayment,
        flashReceipt,
      ],
    });
  };
}

export function bucketBorrow(
  tx: TransactionBlock,
  inputs: {
    collSymbol: string,
    collCoinInput: TransactionArgument,
    borrowAmount: number,
    ifUpdateOracle?: boolean,
    ifReturnBalance?: boolean,
  },
): TransactionResult {
  const {
    collSymbol,
    collCoinInput,
    borrowAmount,
    ifUpdateOracle,
    ifReturnBalance
  } = inputs;
  const { oracleUpdateTarget, corePackageId, oracleObj, protocolObj } = BUCKET_CONFIG;
  
  const collType = COIN_TYPES[collSymbol];
  if (ifUpdateOracle) {
    tx.moveCall({
      target: oracleUpdateTarget,
      typeArguments: [collType],
      arguments: [
        tx.sharedObjectRef(oracleObj),
        tx.object(CLOCK_OBJECT),
        tx.object(SUPRA_OJBECT_HOLDER_ID),
        tx.pure(SUPRA_PRICE_FEED_IDS[collSymbol], 'u32'),
      ],
    });
  };
  if (ifReturnBalance) {
    const collInput = coinIntoBalance(tx, collType, collCoinInput);
    return tx.moveCall({
      target: `${corePackageId}::buck::borrow`,
      typeArguments: [collType],
      arguments: [
        tx.sharedObjectRef(protocolObj),
        tx.sharedObjectRef(oracleObj),
        tx.object(CLOCK_OBJECT),
        collInput, // should be Balance<T>
        tx.pure(borrowAmount, 'u64'),
        tx.pure([]),
      ],
    });
  } else {
    const { peripheryPackageId } = BUCKET_CONFIG;
    return tx.moveCall({
      target: `${peripheryPackageId}::bucket_operations::borrow`,
      typeArguments: [collType],
      arguments: [
        tx.sharedObjectRef(protocolObj),
        tx.sharedObjectRef(oracleObj),
        tx.object(CLOCK_OBJECT),
        collCoinInput, // should be Coin<T>
        tx.pure(borrowAmount, 'u64'),
        tx.pure([]),
      ],
    });
  };
}
