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
    title: "LST Transformer",
    protocolName: "Bucket Protocol",
    logo: "/images/bucket.svg",
    link: "/lst-vault/bucketProtocol",
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
    title: "What is Starter ? How does it work ?",
    content: `Starter is a one-stop DeFi strategy vaults for Move ecosystem, 
    integrating protocols like lending, DEX, and LST.
    
    We aim is to maximize the advantages of each protocol, 
    simplifying complex on-chain operations for users and enhancing the efficiency of their capital utilization.`,
    contentHeight: "h-27 xl:h-18",
  },
  {
    title: "What are strategy Vaults ?",
    content: `Strategy Vaults are the main product of Strater. 
    On this page, users can find suitable strategy pools (Vaults) 
    based on their risk preference, yield, and protocol attributes.
    
    Strater simplifies complex on-chain operations using Programmable Transactions, 
    which can include deposit , borrow and swap in same transactions,
    reducing the threshold for users to manually manage their assets.`,
    contentHeight: "h-36 xl:h-18",
  },
  {
    title: "What is Leverage vaults do ?",
    content: `Leverage Vaults primarily apply to lending protocols, 
    allowing users to execute leverage with a single click.

    This is realized through a cycle of loans based on Programmable Transactions.
    Users first select the desired leverage; 
    
    then, upon depositing collateral and borrowing assets, 
    they immediately swap these for more collateral on a DEX, 
    repeating the process several times to achieve target leverage.
    
    Thus, even with over-collateralized limits, 
    users can still borrow more tokens.`,
    contentHeight: "h-44 xl:h-18",
  },
  {
    title: "What is LST and how it earn yield ? ",
    content: `LST ( Liquid Staking Tokens ) Vaults operate 
    by converting users' existing Sui collateral into interest-bearing 
    LST assets such as afSUI, voloSUI, and HASUi.
    
    As LSTs are appreciating assets,
    leveraging with LST theoretically allows borrowing of more assets,
    while also potentially bringing in more yield.`,
    contentHeight: "h-27 xl:h-18",
  },
];
