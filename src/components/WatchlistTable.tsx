import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { updateHoldings } from "../store/slices/tokenSlice";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";
import { useTokenPrices } from "../hooks/useTokenData";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale);

const WatchlistTable = () => {
  const { watchlist, holdings } = useSelector(
    (state: RootState) => state.tokens
  );
  const dispatch = useDispatch();
  const { data: pricesData, isLoading, error } = useTokenPrices();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(watchlist.length / itemsPerPage);
  const paginatedWatchlist = watchlist.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading)
    return (
      <div className="p-4 bg-gray-900 text-white">Loading watchlist...</div>
    );
  if (error)
    return (
      <div className="p-4 bg-gray-900 text-white">
        Error loading watchlist: {(error as Error).message}
      </div>
    );
  if (watchlist.length === 0)
    return (
      <div className="p-4 bg-gray-900 text-white">No tokens in watchlist</div>
    );

  const updatedWatchlist = paginatedWatchlist.map((token) => {
    const priceInfo =
      (Array.isArray(pricesData) ? pricesData : []).find(
        (t) => t.id === token.id
      ) || token;
    return {
      ...token,
      current_price: priceInfo.current_price,
      price_change_percentage_24h: priceInfo.price_change_percentage_24h,
      sparkline_in_7d: priceInfo.sparkline_in_7d,
    };
  });

  const handleHoldingsChange = (id: string, value: number) => {
    dispatch(updateHoldings({ id, amount: value >= 0 ? value : 0 }));
  };

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg shadow-md">
      <h2 className="text-lg mb-4">Watchlist</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-800 border-b border-gray-700">
              <th className="p-2 text-left text-xs uppercase text-gray-400">
                Token
              </th>
              <th className="p-2 text-left text-xs uppercase text-gray-400">
                Price
              </th>
              <th className="p-2 text-left text-xs uppercase text-gray-400">
                24h %
              </th>
              <th className="p-2 text-left text-xs uppercase text-gray-400">
                Sparkline (7d)
              </th>
              <th className="p-2 text-left text-xs uppercase text-gray-400">
                Holdings
              </th>
              <th className="p-2 text-left text-xs uppercase text-gray-400">
                Value
              </th>
              <th className="p-2 text-left text-xs uppercase text-gray-400">
                Menu
              </th>
            </tr>
          </thead>
          <tbody>
            {updatedWatchlist.map((token) => {
              const sparklineData =
                token.sparkline_in_7d.price.filter(
                  (price: number | undefined) =>
                    price !== undefined && !isNaN(price)
                ) || [];

              return (
                <tr
                  key={token.id}
                  className="border-b border-gray-700 hover:bg-gray-800"
                >
                  <td className="p-2 flex items-center">
                    <img
                      src={token.image}
                      alt={token.name}
                      className="w-6 h-6 mr-2"
                    />
                    {token.name} ({token.symbol})
                  </td>
                  <td className="p-2">${token.current_price.toFixed(2)}</td>
                  <td
                    className={
                      token.price_change_percentage_24h < 0
                        ? "text-red-500 p-2"
                        : "text-green-500 p-2"
                    }
                  >
                    {token.price_change_percentage_24h.toFixed(2)}%
                  </td>
                  <td className="p-2">
                    <div className="relative w-24 h-10">
                      <Line
                        data={{
                          labels: sparklineData.map(
                            (_: unknown, i: { toString: () => unknown }) =>
                              i.toString()
                          ),
                          datasets: [
                            {
                              data: sparklineData,
                              borderColor:
                                token.price_change_percentage_24h < 0
                                  ? "#FF6384"
                                  : "#36A2EB",
                              backgroundColor: "transparent",
                              borderWidth: 1.5,
                              pointRadius: 0,
                              fill: false,
                            },
                          ],
                        }}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          scales: {
                            x: { display: false },
                            y: { display: false, beginAtZero: true },
                          },
                          plugins: {
                            legend: { display: false },
                            tooltip: { enabled: false },
                          },
                          animation: { duration: 0 },
                        }}
                      />
                    </div>
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      value={holdings[token.id] || 0}
                      onChange={(e) =>
                        handleHoldingsChange(
                          token.id,
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="w-20 bg-gray-700 border border-gray-600 rounded p-1 text-white"
                      min="0"
                    />
                  </td>
                  <td className="p-2">
                    $
                    {((holdings[token.id] || 0) * token.current_price).toFixed(
                      2
                    )}
                  </td>
                  <td className="p-2">
                    <button className="text-gray-400 hover:text-white text-lg">
                      ⋯
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-4 text-sm">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="bg-gray-700 px-3 py-1 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="bg-gray-700 px-3 py-1 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default WatchlistTable;
