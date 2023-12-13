import { SuiClient } from "@mysten/sui.js/client";
import {
  TransactionArgument,
  TransactionBlock,
  TransactionResult,
} from "@mysten/sui.js/transactions";
import { COIN_TYPES } from "./constants";
import { SUPRA_OBJECT_IDS } from "../supra/config";
import { LstSymbol } from "./types";
import { voloStakeSUI } from "../volo/operations";
import { haedalStakeSUI } from "../haedal/operations";
import { aftermathStakeSUI } from "../aftermath/operations";
import { txMoveCall } from "../utils/parser/scallopParser";
import { ScallopTxBlock } from "@scallop-io/sui-scallop-sdk";

export function newZeroCoin(
  tx: TransactionBlock | ScallopTxBlock,
  coinType: string,
): TransactionResult {
  return txMoveCall(tx, {
    target: "0x2::coin::zero",
    typeArguments: [coinType],
  });
}

export function newZeroBalance(
  tx: TransactionBlock | ScallopTxBlock,
  coinType: string,
): TransactionResult {
  return txMoveCall(tx, {
    target: "0x2::balance::zero",
    typeArguments: [coinType],
  });
}

export function getCoinValue(
  tx: TransactionBlock | ScallopTxBlock,
  coinType: string,
  coin: TransactionArgument,
): TransactionResult {
  return txMoveCall(tx, {
    target: "0x2::coin::value",
    typeArguments: [coinType],
    arguments: [coin],
  });
}

export function getBalanceValue(
  tx: TransactionBlock | ScallopTxBlock,
  coinType: string,
  balance: TransactionArgument,
): TransactionResult {
  return txMoveCall(tx, {
    target: "0x2::balance::value",
    typeArguments: [coinType],
    arguments: [balance],
  });
}

export function coinFromBalance(
  tx: TransactionBlock | ScallopTxBlock,
  coinType: string,
  balance: TransactionArgument,
): TransactionResult {
  return txMoveCall(tx, {
    target: "0x2::coin::from_balance",
    typeArguments: [coinType],
    arguments: [balance]
  });
}

export function coinIntoBalance(
  tx: TransactionBlock | ScallopTxBlock,
  coinType: string,
  coin: TransactionArgument,
): TransactionResult {
  return txMoveCall(tx, {
    target: "0x2::coin::into_balance",
    typeArguments: [coinType],
    arguments: [coin]
  });
}

export function destroyZeroCoin(
  tx: TransactionBlock | ScallopTxBlock,
  coinType: string,
  coin: TransactionArgument,
) {
  tx.moveCall({
    target: "0x2::coin::destroy_zero",
    typeArguments: [coinType],
    arguments: [coin],
  });
}

export function destroyZeroBalance(
  tx: TransactionBlock | ScallopTxBlock,
  coinType: string,
  balance: TransactionArgument,
) {
  tx.moveCall({
    target: "0x2::balance::destroy_zero",
    typeArguments: [coinType],
    arguments: [balance],
  });
}

export async function getInputCoins(
  suiClient: SuiClient,
  tx: TransactionBlock | ScallopTxBlock,
  owner: string,
  coinSymbol: string,
  ...amounts: number[]
): Promise<TransactionResult> {
  const coinType = COIN_TYPES[coinSymbol];
  if (coinType === COIN_TYPES.SUI) {
    return tx.splitCoins(
      tx.gas,
      amounts.map((amount) => tx.pure(amount, 'u64')),
    );
  };

  const { data: userCoins } = await suiClient.getCoins({ owner, coinType });
  const [mainCoin, ...otherCoins] = userCoins.map((coin) =>
    tx.objectRef({
      objectId: coin.coinObjectId,
      version: coin.version,
      digest: coin.digest,
    }),
  );
  if (otherCoins.length > 0) tx.mergeCoins(mainCoin, otherCoins);

  return tx.splitCoins(
    mainCoin,
    amounts.map((amount) => tx.pure(amount, 'u64')),
  );
}

export async function getCoinPrice(
  suiClient: SuiClient,
  coinSymbol: string,
): Promise<number | undefined> {
  const supraPriceFeedId = SUPRA_OBJECT_IDS[coinSymbol];
  if (supraPriceFeedId) {
    const resp = await suiClient.getObject({
      id: supraPriceFeedId,
      options: {
        showContent: true,
      }
    });
    if (resp.data) {
      const content = resp.data.content as any;
      const rawPrice = Number(content.fields.value.fields.value);
      const decimals = Number(content.fields.value.fields.decimal);
      return rawPrice/10**decimals;
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
}

export function stakeSUI(
	tx: TransactionBlock | ScallopTxBlock,
	suiCoin: TransactionArgument,
	lstSymbol?: LstSymbol,
): TransactionArgument {
  if (lstSymbol === 'afSUI') {
    return aftermathStakeSUI(tx, suiCoin);
  } else if (lstSymbol === 'vSUI') {
    return voloStakeSUI(tx, suiCoin);
	} else if (lstSymbol === 'haSUI') {
    return haedalStakeSUI(tx, suiCoin);
	} else {
    return suiCoin;
  };
}
