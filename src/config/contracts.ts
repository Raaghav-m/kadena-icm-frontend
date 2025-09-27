import NFTSenderABI from "@/lib/NFTSenderABI.json";

// Contract addresses for different chains
export const CONTRACT_ADDRESSES = {
  5920: "0x932A74CfD47820EB63540eDF02CEBe7ca58D72CE", // NFT Sender on Chain 5920
  5921: "0x0AB00d3e683e8cEF99e5f1Db80394807506638B6", // NFT Sender on Chain 5921
} as const;

// Message Sender addresses for cross-chain communication
export const MESSAGE_SENDER_ADDRESSES = {
  5920: "0x31f1bDB782e971256C2aEC2a29A6DfeD13F91DF6", // Message Sender on Chain 5920
  5921: "0x0e29239308015DD57e215DF3610B7d9d8231B976", // Message Sender on Chain 5921
} as const;

// NFT Receiver addresses for cross-chain transfers
export const NFT_RECEIVER_ADDRESSES = {
  5920: "0xF95c11D596b1650f11336D33E318475Dc1e21472", // NFT Receiver on Chain 5920
  5921: "0x31f1bDB782e971256C2aEC2a29A6DfeD13F91DF6", // NFT Receiver on Chain 5921
} as const;

export { NFTSenderABI };
