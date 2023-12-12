import { OKX_MarkPrice } from "@/type";
import { MARKET_COINS } from "@/constants/coins";

const acceptedCoins = MARKET_COINS.map((coin) => coin.symbolToFetchPrice);

const sybmolsToFetch = acceptedCoins
  .filter(
    (coin) =>
      coin !== "USDT" && coin !== "afSUI" && coin !== "haSUI" && coin !== "vSUI"
  )
  .map((coin) => {
    if (coin === "SUI" || coin === "USDC") {
      return `${coin}-USDT-SWAP`;
    } else {
      return `${coin}-USD-SWAP`;
    }
  });
const exchangeRate = 1.0001;
export const getPrices = async () => {
  const fetchArray = sybmolsToFetch.map(
    (symbol) =>
      fetch(
        `https://www.okx.com/api/v5/public/mark-price?instType=SWAP&instId=${symbol}`
      ).then((res) => res.json()) as Promise<OKX_MarkPrice>
  );

  const response = await Promise.all(fetchArray);

  const result = response.map((coin) => {
    const symbol = coin.data[0].instId.split("-")[0].replace("ETH", "WETH");
    return { symbol, price: coin.data[0].markPx };
  });

  return result.concat([
    { symbol: "USDT", price: "1" },
    { symbol: "BUCK", price: "1" },
    {
      symbol: "afSUI",
      price: `${
        Number(result.find((coin) => coin.symbol === "SUI")?.price ?? 0.4) *
        exchangeRate
      }`,
    },
    {
      symbol: "haSUI",
      price: `${
        Number(result.find((coin) => coin.symbol === "SUI")?.price ?? 0.4) *
        exchangeRate
      }`,
    },
    {
      symbol: "vSUI",
      price: `${
        Number(result.find((coin) => coin.symbol === "SUI")?.price ?? 1) *
        exchangeRate
      }`,
    },
  ]);
};
