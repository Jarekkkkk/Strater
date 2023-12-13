import { IStrategyCard } from "@/type";

export const MOCK_LIVE_STRATEGY: IStrategyCard[] = [
  {
    title: "Leverage",
    protocolName: "Bucket Protocol",
    logo: "/images/bucket.svg",
    link: "/leverage-vault/bucketProtocol",
    description: `Users Deposit SUI and auto swap half for USDC and provide liquidity
    for SUI/BUCK on DEX to earn trading fees and SUI rewards.`,
  },
  {
    title: "Leverage",
    protocolName: "Scallop",
    logo: "/images/scallop.svg",
    link: "/leverage-vault/scallop",
    description: `Users Deposit SUI and auto swap half for USDC and provide liquidity
    for SUI/BUCK on DEX to earn trading fees and SUI rewards.`,
  },
  {
    title: "LST Transformer",
    protocolName: "Bucket Protocol",
    logo: "/images/bucket.svg",
    link: "/lst-vault/bucketProtocol",
    description: `Users Deposit SUI and auto swap half for USDC and provide liquidity
    for SUI/BUCK on DEX to earn trading fees and SUI rewards.`,
  },
  {
    title: "LST Transformer",
    protocolName: "Scallop",
    logo: "/images/scallop.svg",
    link: "/lst-vault/scallop",
    description: `Users Deposit SUI and auto swap half for USDC and provide liquidity
    for SUI/BUCK on DEX to earn trading fees and SUI rewards.`,
  },
  {
    title: "Sui LP Staking",
    protocolName: "Navi Protocol",
    logo: "/images/navi.svg",
    // link: "/sui-lp-vault/naviProtocol",
    link: "#",
    description: `Users Deposit SUI and auto swap half for USDC and provide liquidity
    for SUI/BUCK on DEX to earn trading fees and SUI rewards.`,
  },
];

export const MOCK_COMING_SOON = [
  {
    title: "Flash Leverage",
    name: "Bucket Protocol",
    logo: "/images/bucket.svg",
  },
  {
    title: "Leverage Lend",
    name: "Navi Protocol",
    logo: "/images/navi.svg",
  },
  {
    title: "Earn Yield",
    name: "Scallop",
    logo: "/images/scallop.svg",
  },
];

export const MOCK_SINGLE_LEVERAGE_VAULT_DATA = {
  bucketProtocol: {},
  naviProtocol: {},
  scallop: {},
};

export const FAQ = [
  {
    title: "What is Starter and How Does It Work?",
    content: `Starter is a one-stop DeFi strategy hub for the Sui ecosystem. By integrating protocols like lending, DEX, and LST, we simplify complex and tedious operations, allowing users to effortlessly enhance their capital efficiency and potentially increase their returns.`,
    contentHeight: "h-27 xl:h-22",
  },
  {
    title: "What is a Vault?",
    content: `Each Vault represents a series of specific on-chain operations and is the core product of Strater. Users can find a suitable Vault based on their risk preference, yield, and protocol attributes. Strater simplifies complex on-chain operations using Programmable Transactions, which can include multiple deposits, borrow, and swap operations within the same transaction block. From the user's perspective, this offers an experience where no additional funds are needed, nor is there a need to worry about parameter settings to achieve the desired outcome.`,
    contentHeight: "h-52 xl:h-40",
  },
  {
    title: "What Do Leverage Vaults Do?",
    content: `Leverage Vaults are primarily used in lending protocols, enabling users to execute leverage with a single click. This is achieved through a series of folding  loans (also utilizing Programmable Transactions). Users only need to set the desired leverage level without worrying about the intermediary steps, and the setup of the correct collateral ratio since it is managed through flash loans.`,
    contentHeight: "h-40 xl:h-26",
  },
  {
    title: "What is Leveraged Staking?",
    content: `Leveraged Staking involves using LST (Liquid Staking Tokens) as collateral for borrowing, and then converting the borrowed native SUI into LST assets. This process effectively enables users to hold more LST, thereby increasing their potential staking profits.`,
    contentHeight: "h-27 xl:h-20",
  },
  {
    title: "What Do LST Transformer Vaults Do?",
    content: `LST Transformer Vaults function by converting users' existing Sui collateral into interest-bearing LST assets, without the need to close or withdraw the position.`,
    contentHeight: "h-20 xl:h-16",
  },
];
