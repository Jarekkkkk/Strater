import { getPrices } from "@/lib/utils/priceFeed/getPrices";
import { useQuery } from "@tanstack/react-query";

const useTicker = () => {
  const { data: cryptosPriceData, refetch: refetchCryptosPrices } = useQuery({
    queryKey: ["getPrices"],
    queryFn: () => getPrices(),
    refetchInterval: 10 * 1000,
  });

  return { cryptosPriceData, refetchCryptosPrices };
};

export { useTicker };
