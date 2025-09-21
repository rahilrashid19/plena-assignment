import { useState } from "react";
import PortfolioCard from "../components/PortfolioCard";
import WatchlistTable from "../components/WatchlistTable";
import WalletConnect from "../components/WalletConnect";
import AddTokenModal from "../components/AddTokenModal";
import { useTokenPrices } from "../hooks/useTokenData";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { refetch } = useTokenPrices();

  const handleRefresh = () => {
    refetch();
  };

  return (
    <div className="p-4 bg-gray-800 text-white min-h-screen md:flex md:flex-col">
      <h1 className="text-2xl mb-4">Token Portfolio</h1>
      <WalletConnect />
      <PortfolioCard />
      <WatchlistTable />
      <div className="flex mt-4">
        <button
          onClick={handleRefresh}
          className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 hover:text-gray-200 transition duration-200 cursor-pointer"
        >
          Refresh Prices
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 px-4 py-2 rounded hover:bg-green-500 hover:text-white transition duration-200 cursor-pointer ml-4"
        >
          Add Token
        </button>
      </div>
      <AddTokenModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Home;
