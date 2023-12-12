import { ACCEPT_ASSETS, MarketCoin } from "@/type";

export const ASSET_DECIAMLS: Record<ACCEPT_ASSETS, number> = {
  SUI: 9,
  afSUI: 9,
  haSUI: 9,
  vSUI: 9,
  USDC: 6,
  USDT: 6,
};

export const MARKET_COINS_TYPE_LIST: Record<ACCEPT_ASSETS, string> = {
  SUI: "0x2::sui::SUI",
  afSUI:
    "0xf325ce1300e8dac124071d3152c5c5ee6174914f8bc2161e88329cf579246efc::afsui::AFSUI",
  haSUI:
    "0xbde4ba4c2e274a60ce15c1cfff9e5c42e41654ac8b6d906a57efa4bd3c29f47d::hasui::HASUI",
  vSUI: "0x549e8b69270defbfafd4f94e17ec44cdbdd99820b33bda2278dea3b9a32d3f55::cert::CERT",
  USDC: "0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN",
  USDT: "0xc060006111016b8a020ad5b33834984a437aaa7d3c74c18e09a95d48aceab08c::coin::COIN",
};

export const LST: MarketCoin[] = [
  {
    name: "Aftermath SUI",
    symbol: "afSUI",
    symbolToFetchPrice: "afSUI",
    coinType: MARKET_COINS_TYPE_LIST.afSUI,
    image: "/coinIcons/afsui.svg",
    decimal: ASSET_DECIAMLS.afSUI,
  },
  {
    name: "Haedal SUI",
    symbol: "haSUI",
    symbolToFetchPrice: "haSUI",
    coinType: MARKET_COINS_TYPE_LIST.haSUI,
    image: "/coinIcons/haSUI.svg",
    decimal: ASSET_DECIAMLS.haSUI,
  },
  {
    name: "Volo SUI",
    symbol: "vSUI",
    symbolToFetchPrice: "vSUI",
    coinType: MARKET_COINS_TYPE_LIST.vSUI,
    image: "/coinIcons/voloSUI.png",
    decimal: ASSET_DECIAMLS.vSUI,
  },
];

export const MARKET_COINS: MarketCoin[] = [
  {
    name: "SUI",
    symbol: "SUI",
    symbolToFetchPrice: "SUI",
    coinType: MARKET_COINS_TYPE_LIST.SUI,
    image: "/coinIcons/sui-icon.png",
    decimal: ASSET_DECIAMLS.SUI,
  },
  ...LST,
  {
    name: "Wormhole USDC",
    symbol: "USDC",
    symbolToFetchPrice: "USDC",
    coinType: MARKET_COINS_TYPE_LIST.USDC,
    image: "/coinIcons/usdc-light.png",
    decimal: ASSET_DECIAMLS.USDC,
  },
  {
    name: "Wormhole USDT",
    symbol: "USDT",
    symbolToFetchPrice: "USDT",
    coinType: MARKET_COINS_TYPE_LIST.USDT,
    image: "/coinIcons/usdt-light.png",
    decimal: ASSET_DECIAMLS.USDT,
  },
];
