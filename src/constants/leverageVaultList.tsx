import { Contrast } from "lucide-react";

export const LEVERAGE_VAULT_LIST: Record<
  string,
  {
    name: string;
    logo: string;
    info: string;
    risk: string;
    contract: Record<
      string,
      {
        name: string;
        address: string;
      }
    >;
  }
> = {
  bucketProtocol: {
    name: "Bucket Protocol",
    logo: "/images/bucket.svg",
    info: `Users Deposit SUI and auto swap half for USDC and provide
    liquidity for SUI/BUCK on DEX to earn trading fees and SUI
    rewards.`,
    risk: `Users Deposit SUI and auto swap half for USDC and provide
    liquidity for SUI/BUCK on DEX to earn trading fees and SUI
    rewards.`,
    contract: {
      protocolContract: {
        name: "Navi Contract ( Supply & Borrow )",
        address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      },
      vaultContract: {
        name: "Cetus Contract ( Swap )",
        address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      },
    },
  },
  scallop: {
    name: "Scallop",
    logo: "/images/scallop.svg",
    info: `Users Deposit SUI and auto swap half for USDC and provide
    liquidity for SUI/BUCK on DEX to earn trading fees and SUI
    rewards.`,
    risk: `Users Deposit SUI and auto swap half for USDC and provide
    liquidity for SUI/BUCK on DEX to earn trading fees and SUI
    rewards.`,
    contract: {
      protocolContract: {
        name: "Navi Contract ( Supply & Borrow )",
        address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      },
      vaultContract: {
        name: "Cetus Contract ( Swap )",
        address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      },
    },
  },
};
