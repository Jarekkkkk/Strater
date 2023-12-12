export interface IStrategyCard {
  title: string;
  protocolName: string;
  logo: string;
  link: string;
  description: string;
}

export type ACCEPT_ASSETS =
  | "SUI"
  | "afSUI"
  | "haSUI"
  | "vSUI"
  | "USDC"
  | "USDT";

export type MarketCoin = {
  name: string;
  symbol: string;
  symbolToFetchPrice: string;
  coinType: string;
  image: StaticImageData | string;
  decimal: number;
};

export type OKX_MarkPrice = {
  code: string;
  data: [
    {
      instId: string;
      instType: string;
      markPx: string;
      ts: string;
    }
  ];
  msg: string;
};
