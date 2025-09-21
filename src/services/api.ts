import axios from "axios";

const COINGECKO_API_URL = "https://api.coingecko.com/api/v3";
const API_KEY = import.meta.env.VITE_COINGECKO_API_KEY;

export const fetchTokenList = async () => {
  const response = await axios.get(`${COINGECKO_API_URL}/coins/markets`, {
    params: {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: 100,
      page: 1,
      sparkline: true,
      price_change_percentage: "24h",
      x_cg_demo_api_key: API_KEY,
    },
  });
  return response.data;
};

export const fetchTokenPrice = async (ids: string[]) => {
  if (ids.length === 0) return [];
  const response = await axios.get(`${COINGECKO_API_URL}/coins/markets`, {
    params: {
      vs_currency: "usd",
      ids: ids.join(","),
      order: "market_cap_desc",
      per_page: 250,
      page: 1,
      sparkline: true,
      price_change_percentage: "24h",
      x_cg_demo_api_key: API_KEY,
    },
  });
  return response.data;
};
