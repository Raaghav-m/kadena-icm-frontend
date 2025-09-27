import { useState } from "react";
import { motion } from "framer-motion";
import { ImageIcon, Sparkles, Link2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  useChainId,
  useWriteContract,
  useAccount,
  useReadContract,
} from "wagmi";
import type { Chain } from "viem";
import { NFTSenderABI, CONTRACT_ADDRESSES } from "@/config/contracts";
import { kadenaChain1, kadenaChain2 } from "@/config/chains";
import { NFTTransfer } from "./NFTTransfer";

interface NFTMinterProps {
  isConnected: boolean;
  onMint?: (nft: any) => void;
  onTransfer?: (details: any) => void;
}

export function NFTMinter({ isConnected, onMint, onTransfer }: NFTMinterProps) {
  const [isMinting, setIsMinting] = useState(false);
  const [mintedTokenId, setMintedTokenId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    link: "",
  });
  const [linkError, setLinkError] = useState("");
  const { toast } = useToast();
  const chainId = useChainId();
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const { data: tokenURI } = useReadContract({
    address: CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES],
    abi: NFTSenderABI,
    functionName: "tokenURI",
    args: mintedTokenId ? [BigInt(mintedTokenId)] : undefined,
    query: {
      enabled: Boolean(mintedTokenId),
    },
  });

  // Get the current chain configuration
  const currentChain =
    chainId === kadenaChain1.id
      ? kadenaChain1
      : chainId === kadenaChain2.id
      ? kadenaChain2
      : null;

  const validateLink = (link: string) => {
    try {
      new URL(link);
      setLinkError("");
      return true;
    } catch {
      setLinkError("Please enter a valid URL");
      return false;
    }
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const link = e.target.value;
    setFormData({ ...formData, link });
    if (link) validateLink(link);
  };

  const handleMint = async () => {
    if (
      !isConnected ||
      !validateLink(formData.link) ||
      !address ||
      !currentChain
    )
      return;

    const contractAddress =
      CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES];
    if (!contractAddress) {
      toast({
        title: "Chain Not Supported",
        description: "Please switch to a supported chain",
        variant: "destructive",
      });
      return;
    }

    setIsMinting(true);

    try {
      // Call the contract's mint function
      const tx = await writeContractAsync({
        abi: NFTSenderABI,
        address: contractAddress,
        functionName: "mint",
        args: [formData.link],
        chain: currentChain,
        account: address,
      });

      // For now, we'll use a simple counter for the token ID
      // In production, you should get this from contract events
      const newTokenId = Date.now() % 1000; // Simple demo ID
      setMintedTokenId(newTokenId);

      const nft = {
        id: Date.now(),
        link: formData.link,
        tokenId: newTokenId,
        chain: chainId,
        owner: address,
        txHash: tx,
      };

      onMint?.(nft);

      // Reset form
      setFormData({ link: "" });

      toast({
        title: "NFT Minting Initiated! 🚀",
        description: "Transaction submitted to the blockchain",
      });
    } catch (error) {
      console.error("Minting failed:", error);
      toast({
        title: "Minting Failed",
        description: "Failed to mint NFT. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsMinting(false);
    }
  };

  const isFormValid = formData.link && !linkError;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="cosmic-card p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <ImageIcon className="h-8 w-8 text-primary" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute -top-1 -right-1"
            >
              <Sparkles className="h-4 w-4 text-accent" />
            </motion.div>
          </div>
          <div>
            <h2 className="text-xl font-orbitron font-bold text-gradient">
              NFT Minter
            </h2>
            <p className="text-muted-foreground">
              Create your NFT on Chain {chainId}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Link Input */}
          <div>
            <Label htmlFor="link" className="text-sm font-medium">
              NFT Link
            </Label>
            <div className="mt-2 space-y-2">
              <div className="relative">
                <Input
                  id="link"
                  type="url"
                  value={formData.link}
                  onChange={handleLinkChange}
                  placeholder="Enter NFT link..."
                  className={`neon-border pl-9 ${
                    linkError ? "border-destructive" : ""
                  }`}
                />
                <Link2 className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
              </div>
              {linkError && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-destructive"
                >
                  {linkError}
                </motion.p>
              )}
            </div>
          </div>

          {/* Current Token Info */}
          {mintedTokenId !== null && tokenURI && (
            <div className="p-4 rounded-lg bg-card/50 border border-border">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Token ID
                  </span>
                  <span className="font-mono">{mintedTokenId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Token URI
                  </span>
                  <span className="font-mono text-xs truncate max-w-[200px]">
                    {tokenURI as string}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Mint Button */}
          <Button
            variant="hero"
            size="lg"
            onClick={handleMint}
            disabled={!isConnected || !isFormValid || isMinting}
            className={`w-full ${isMinting ? "status-connecting" : ""}`}
          >
            {isMinting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Minting NFT...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                Mint NFT
              </>
            )}
          </Button>

          {!isConnected && (
            <p className="text-sm text-muted-foreground text-center">
              Connect your wallet to mint NFTs
            </p>
          )}

          {/* Transfer Option */}
          {mintedTokenId !== null && (
            <NFTTransfer
              isConnected={isConnected}
              tokenId={mintedTokenId}
              onTransfer={onTransfer}
            />
          )}
        </div>
      </Card>
    </motion.div>
  );
}
