import { defineChain } from "viem";

export const kadenaChain1 = defineChain({
  id: 5920,
  name: "Kadena Chain 20",
  nativeCurrency: {
    name: "Kadena",
    symbol: "KDA",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [
        "https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/20/evm/rpc",
      ],
    },
    public: {
      http: [
        "https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/20/evm/rpc",
      ],
    },
  },
});

export const kadenaChain2 = defineChain({
  id: 5921,
  name: "Kadena Chain 21",
  nativeCurrency: {
    name: "Kadena",
    symbol: "KDA",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [
        "https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/21/evm/rpc",
      ],
    },
    public: {
      http: [
        "https://evm-testnet.chainweb.com/chainweb/0.0/evm-testnet/chain/21/evm/rpc",
      ],
    },
  },
});
