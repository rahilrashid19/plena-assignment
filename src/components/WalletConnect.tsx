import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

const WalletConnect = () => {
  const { address, isConnected } = useAccount();

  return (
    <div className="flex justify-end mb-4">
      <ConnectButton />
      {isConnected && <p className="ml-4">Connected: {address}</p>}
    </div>
  );
};

export default WalletConnect;
