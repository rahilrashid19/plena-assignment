import { useState } from "react";
import { useDispatch } from "react-redux";
import { useTokenList, useTrendingTokens } from "../hooks/useTokenData";
import { addToken } from "../store/slices/tokenSlice";

interface AddTokenModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddTokenModal: React.FC<AddTokenModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);
  const dispatch = useDispatch();

  const { data: tokens = [], isLoading } = useTokenList();
  const { data: trending = [] } = useTrendingTokens();

  const filteredTokens = tokens.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (id: string) => {
    setSelectedTokens((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleAdd = () => {
    selectedTokens.forEach((id) => {
      const token = tokens.find((t) => t.id === id);
      if (token) dispatch(addToken(token));
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 max-h-[80vh] flex flex-col">
        <div className="flex justify-between items-center border-b border-gray-700 pb-2 mb-4">
          <h2 className="text-xl font-semibold">Add Token</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl font-bold"
          >
            &times;
          </button>
        </div>
        <input
          type="text"
          placeholder="Search tokens..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <>
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-2">Trending</h3>
                {trending.map((token) => (
                  <div
                    key={token.id}
                    className="flex items-center py-2 border-b border-gray-700 last:border-0"
                  >
                    <input
                      type="checkbox"
                      checked={selectedTokens.includes(token.id)}
                      onChange={() => handleSelect(token.id)}
                      className="mr-2 accent-green-500"
                    />
                    <img
                      src={token.image}
                      alt={token.name}
                      className="w-6 h-6 mr-2"
                    />
                    <span className="flex-1">
                      {token.name} ({token.symbol.toUpperCase()})
                    </span>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Search Results</h3>
                {filteredTokens.map((token) => (
                  <div
                    key={token.id}
                    className="flex items-center py-2 border-b border-gray-700 last:border-0"
                  >
                    <input
                      type="checkbox"
                      checked={selectedTokens.includes(token.id)}
                      onChange={() => handleSelect(token.id)}
                      className="mr-2 accent-green-500"
                    />
                    <img
                      src={token.image}
                      alt={token.name}
                      className="w-6 h-6 mr-2"
                    />
                    <span className="flex-1">
                      {token.name} ({token.symbol.toUpperCase()})
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-500 transition duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              disabled={selectedTokens.length === 0}
              className="bg-green-600 px-4 py-2 rounded hover:bg-green-500 disabled:opacity-50 transition duration-200"
            >
              Add to Watchlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTokenModal;
