import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Token } from "../../types";

interface TokenState {
  watchlist: Token[];
  holdings: { [key: string]: number };
}

const defaultWatchlist: Token[] = [
  {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    current_price: 0,
    price_change_percentage_24h: 0,
    sparkline_in_7d: { price: [] },
  },
  {
    id: "ethereum",
    symbol: "eth",
    name: "Ethereum",
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    current_price: 0,
    price_change_percentage_24h: 0,
    sparkline_in_7d: { price: [] },
  },
  {
    id: "solana",
    symbol: "sol",
    name: "Solana",
    image: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
    current_price: 0,
    price_change_percentage_24h: 0,
    sparkline_in_7d: { price: [] },
  },
  {
    id: "dogecoin",
    symbol: "doge",
    name: "Dogecoin",
    image: "https://assets.coingecko.com/coins/images/5/large/dogecoin.png",
    current_price: 0,
    price_change_percentage_24h: 0,
    sparkline_in_7d: { price: [] },
  },
];

const initialState: TokenState = {
  watchlist:
    JSON.parse(localStorage.getItem("watchlist") || "[]") || defaultWatchlist,
  holdings: JSON.parse(localStorage.getItem("holdings") || "{}") || {
    bitcoin: 2.5,
    ethereum: 5.0,
    solana: 25.0,
    dogecoin: 1000.0,
  },
};

const tokenSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    addToken: (state, action: PayloadAction<Token>) => {
      if (!state.watchlist.find((t) => t.id === action.payload.id)) {
        state.watchlist.push(action.payload);
        localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
      }
    },
    updateHoldings: (
      state,
      action: PayloadAction<{ id: string; amount: number }>
    ) => {
      state.holdings[action.payload.id] = action.payload.amount;
      localStorage.setItem("holdings", JSON.stringify(state.holdings));
    },
  },
});

export const { addToken, updateHoldings } = tokenSlice.actions;
export default tokenSlice.reducer;
