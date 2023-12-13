import { Contrast } from "lucide-react";

export const LEVERAGE_VAULT_LIST: Record<
  string,
  {
    name: string;
    logo: string;
    info: string;
    howItWorks: {
      type: "number" | "bullet";
      contents: string[];
    };
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
    info: `This strategy makes good use of Sui Programmable Transaction to achieve leverage by completing multiple "Stake SUI → Borrow BUCK → Buy SUI with BUCK" transactions within the same Epoch, using the same amount of collateral to borrow more BUCK and increase the efficiency of capital utilization.`,
    howItWorks: {
      type: "number",
      contents: [
        "Deposit SUI as collateral",
        "Borrow BUCK on Bucket",
        "Buy SUI with BUCK on DEX",
        "Deposit the SUI you got in prev step, add SUI collateral value",
        "Repeat the flow base on your target leverage",
      ],
    },
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
    info: `By using Sui's Programmable Transaction to achieve a revolving loan, the collateral can borrow more assets, amplifying the utilization of funds to achieve leverage effect.`,
    howItWorks: {
      type: "number",
      contents: [
        "Deposit SUI as collateral",
        "Borrow USDC",
        "Buy SUI with USDC ",
        "Deposit the SUI you got in prev step, add SUI collateral value",
        "Repeat the flow to reach your target leverage",
      ],
    },
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
