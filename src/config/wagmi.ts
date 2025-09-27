import { http, createConfig } from "wagmi";
import { metaMask } from "wagmi/connectors";
import { kadenaChain1, kadenaChain2 } from "./chains";

export const config = createConfig({
  chains: [kadenaChain1, kadenaChain2] as const,
  connectors: [metaMask()],
  transports: {
    [kadenaChain1.id]: http(),
    [kadenaChain2.id]: http(),
  },
});

// Export chains for convenience
export const availableChains = [kadenaChain1, kadenaChain2] as const;
