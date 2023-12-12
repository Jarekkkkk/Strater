import { Aftermath, AftermathApi, IndexerCaller } from "aftermath-ts-sdk";
import { MoveCallTarget } from "../common/types";
import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";

const AFTERMATH_INNER_CONFIG = {
  pools: {
    packages: {
      amm: "0xefe170ec0be4d762196bedecd7a065816576198a6527c99282a2551aaa7da38c",
      ammInterface:
        "0x0625dc2cd40aee3998a1d6620de8892964c15066e0a285d8b573910ed4c75d50",
      events: "0xefe170ec0be4d762196bedecd7a065816576198a6527c99282a2551aaa7da38c",
    },
    objects: {
      poolRegistry:
        "0xfcc774493db2c45c79f688f88d28023a3e7d98e4ee9f48bbf5c7990f651577ae",
      protocolFeeVault:
        "0xf194d9b1bcad972e45a7dd67dd49b3ee1e3357a00a50850c52cd51bb450e13b4",
      treasury:
        "0x28e499dff5e864a2eafe476269a4f5035f1c16f338da7be18b103499abf271ce",
      insuranceFund:
        "0xf0c40d67b078000e18032334c3325c47b9ec9f3d9ae4128be820d54663d14e3b",
      lpCoinsTable:
        "0x7f3bb65251feccacc7f48461239be1008233b85594114f7bf304e5e5b340bf59",
    },
  },
  referralVault: {
    packages: {
     referralVault:
      "0xc66fabf1a9253e43c70f1cc02d40a1d18db183140ecaae2a3f58fa6b66c55acf",
    },
    objects: {
     referralVault:
      "0x35d35b0e5b177593d8c3a801462485572fc30861e6ce96a55af6dc4730709278",
    },
  }
};

const af = new Aftermath('MAINNET');
const suiClient = new SuiClient({ url: getFullnodeUrl('mainnet') });
const indexerCaller = new IndexerCaller('MAINNET');

export const AFTERMATH_CONFIG = {
  stakeTarget:
    "0x7f6ce7ade63857c4fd16ef7783fed2dfc4d7fb7e40615abdb653030b76aef0c6::staked_sui_vault::request_stake" as MoveCallTarget,
  stakedSuiVaultObj: {
    objectId: "0x2f8f6d5da7f13ea37daa397724280483ed062769813b6f31e9788e59cc88994d",
    initialSharedVersion: 32696040,
    mutable: true,
  },
  afSuiTreasuryObj: {
    objectId: "0xeb685899830dd5837b47007809c76d91a098d52aabbf61e8ac467c59e5cc4610",
    initialSharedVersion: 32347695,
    mutable: true,
  },
  referralVaultObj: {
    objectId: "0x4ce9a19b594599536c53edb25d22532f82f18038dc8ef618afd00fbbfb9845ef",
    initialSharedVersion: 32347696,
    mutable: false,
  },
  validatorAddress: "0xcb7efe4253a0fe58df608d8a2d3c0eea94b4b40a8738c8daae4eb77830c16cd7",
  referrerAddress: "0x73c88d432ad4b2bfc5170148faae6f11f39550fb84f9b83c8d152dd89bc8eda3",
  afRouter:  af.Router(),
  afPools: af.Pools(),
  afStaking: af.Staking(),
  afApi: new AftermathApi(suiClient as any, AFTERMATH_INNER_CONFIG, indexerCaller),
};