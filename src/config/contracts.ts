import NFTSenderABI from "@/lib/NFTSenderABI.json";
import CrossChainMessagingABI from "@/lib/CrossChainMessagingABI.json";

// Contract addresses for different chains
export const CONTRACT_ADDRESSES = {
  5920: "0x932A74CfD47820EB63540eDF02CEBe7ca58D72CE", // NFT Sender on Chain 5920
  5921: "0x1E5BbBae6BA1BF4556230b7D2A9E66E91a657D87", // NFT Sender on Chain 5921
} as const;

// Message Sender addresses for cross-chain communication
export const MESSAGE_SENDER_ADDRESSES = {
  5920: "0x31f1bDB782e971256C2aEC2a29A6DfeD13F91DF6", // Message Sender on Chain 5920
  5921: "0xF95c11D596b1650f11336D33E318475Dc1e21472", // Message Sender on Chain 5921
} as const;

// NFT Receiver addresses for cross-chain transfers
export const NFT_RECEIVER_ADDRESSES = {
  5920: "0xF95c11D596b1650f11336D33E318475Dc1e21472", // NFT Receiver on Chain 5920
  5921: "0x098F11AfD4c818B119906D8f46D7DBa9C8058ceb", // NFT Receiver on Chain 5921
} as const;

// Cross Chain Messaging App addresses
export const MESSAGING_APP_ADDRESSES = {
  5920: "0x60D43382c7C3Fd4e9550bEC5540e01cE46cd754f", // Chain 20
  5921: "0x0C148487b85858246ac5F33E2fC3587E5C4B6691", // Chain 21
} as const;

export { NFTSenderABI, CrossChainMessagingABI };
