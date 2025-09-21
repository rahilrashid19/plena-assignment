import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { fetchTokenList, fetchTokenPrice } from "../services/api";
import type { Token } from "../types";

export const useTokenList = () => {
  return useQuery<Token[]>({
    queryKey: ["tokenList"],
    queryFn: fetchTokenList,
  });
};

export const useTokenPrices = () => {
  const watchlist = useSelector((state: RootState) => state.tokens.watchlist);
  const ids = watchlist.map((t) => t.id).filter(Boolean);

  return useQuery<unknown, Error, unknown, (string | string[])[]>({
    queryKey: ["tokenPrices", ids],
    queryFn: () => fetchTokenPrice(ids),
    enabled: ids.length > 0,
    staleTime: 5 * 60 * 1000,
  });
};

export const useTrendingTokens = () => {
  return useQuery<Token[]>({
    queryKey: ["trendingTokens"],
    queryFn: async () => {
      const response = await fetchTokenList();
      return response.slice(0, 10);
    },
  });
};
