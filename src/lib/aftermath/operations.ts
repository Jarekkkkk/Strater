import {
  TransactionArgument,
  TransactionBlock,
  TransactionResult,
} from "@mysten/sui.js/transactions";
import { AFTERMATH_CONFIG } from "./config";
import { COIN_TYPES, SYSTEM_STATE_OBJECT } from "../common/constants";
import { txMoveCall } from "../utils/parser/scallopParser";
import { ScallopTxBlock } from "@scallop-io/sui-scallop-sdk";

export function aftermathStakeSUI(
  tx: TransactionBlock | ScallopTxBlock,
	suiCoin: TransactionArgument,
): TransactionResult {
  return txMoveCall(tx, {
    target: AFTERMATH_CONFIG.stakeTarget,
    arguments: [
      tx.sharedObjectRef(AFTERMATH_CONFIG.stakedSuiVaultObj),
      tx.sharedObjectRef(AFTERMATH_CONFIG.afSuiTreasuryObj),
      tx.object(SYSTEM_STATE_OBJECT),
      tx.sharedObjectRef(AFTERMATH_CONFIG.referralVaultObj),
      suiCoin,
      tx.pure(AFTERMATH_CONFIG.validatorAddress, 'address'),
    ],
  });
}

export async function aftermathSwap(
  tx: TransactionBlock,
  inputs: {
    senderAddress: string,
    coinInSymbol: string,
    coinOutSymbol: string,
    coinInAmount: bigint,
    coinIn: TransactionArgument,
  },
): Promise<TransactionArgument | undefined> {
  const route = await AFTERMATH_CONFIG.afRouter.getCompleteTradeRouteGivenAmountIn({
    coinInType: COIN_TYPES[inputs.coinInSymbol],
    coinOutType: COIN_TYPES[inputs.coinOutSymbol],
    coinInAmount: inputs.coinInAmount, 
    // optional
    referrer: "0x73c88d432ad4b2bfc5170148faae6f11f39550fb84f9b83c8d152dd89bc8eda3",
    externalFee: {
      recipient: "0x73c88d432ad4b2bfc5170148faae6f11f39550fb84f9b83c8d152dd89bc8eda3",
      feePercentage: 0.001, // 0.1% fee from amount out
    },
  });
  return AFTERMATH_CONFIG.afApi.Router().fetchAddTransactionForCompleteTradeRoute({
    tx: tx as any,
    walletAddress: inputs.senderAddress,
    completeRoute: route,
    slippage: 0.025,
    coinInId: inputs.coinIn,
    isSponsoredTx: false,
  });
}