import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsName,
  useBalance,
} from "wagmi";
import { type Address } from "viem";

export function useWallet() {
  const { address, isConnected, status } = useAccount();
  const { connect, connectors, isPending, error: connectError } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: balance } = useBalance({ address });

  const shortenAddress = (address: Address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return {
    // Connection state
    address,
    isConnected,
    status,
    ensName,
    balance,
    displayAddress: address ? shortenAddress(address) : "",

    // Actions
    connect,
    disconnect,

    // Connection options
    connectors,

    // Loading states
    isConnecting: isPending,

    // Errors
    connectError,
  };
}
