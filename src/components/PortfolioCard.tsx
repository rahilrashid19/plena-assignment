import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import DonutChart from "./DonutChart";
import { useTokenPrices } from "../hooks/useTokenData";

const PortfolioCard = () => {
  const { watchlist, holdings } = useSelector(
    (state: RootState) => state.tokens
  );
  const { data: pricesData, isLoading, error } = useTokenPrices();

  if (isLoading)
    return (
      <div className="p-4 bg-gray-900 text-white">Loading portfolio...</div>
    );
  if (error)
    return (
      <div className="p-4 bg-gray-900 text-white">
        Error loading prices: {(error as Error).message}
      </div>
    );
  if (!watchlist.length)
    return (
      <div className="p-4 bg-gray-900 text-white">No tokens in portfolio</div>
    );

  const updatedWatchlist = watchlist.map((token) => {
    const priceInfo =
      (Array.isArray(pricesData) ? pricesData : [])?.find(
        (t) => t.id === token.id
      ) || token;
    return {
      ...token,
      current_price: priceInfo.current_price,
      price_change_percentage_24h: priceInfo.price_change_percentage_24h,
      sparkline_in_7d: priceInfo.sparkline_in_7d,
    };
  });

  const portfolioData = updatedWatchlist
    .map((t) => ({
      name: t.name,
      value: (holdings[t.id] || 0) * t.current_price,
    }))
    .filter((d) => d.value > 0);

  const total = portfolioData.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="p-4 bg-gray-900 rounded-lg shadow-md mb-6">
      <div className="text-left">
        <h2 className="text-xs uppercase text-gray-400 mb-1">
          Portfolio Total
        </h2>
        <p className="text-3xl font-bold mb-2">${total.toFixed(2)}</p>
        <p className="text-xs text-gray-500 mb-4">
          Last updated:{" "}
          {new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
      </div>
      <div className="h-64 w-full">
        {portfolioData.length > 0 ? (
          <DonutChart data={portfolioData} />
        ) : (
          <p className="text-gray-500 text-center">No data to display</p>
        )}
      </div>
    </div>
  );
};

export default PortfolioCard;
