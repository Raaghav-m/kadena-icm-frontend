import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRightLeft, Loader2 } from "lucide-react";
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
import {
  NFTSenderABI,
  CONTRACT_ADDRESSES,
  NFT_RECEIVER_ADDRESSES,
} from "@/config/contracts";
import { kadenaChain1, kadenaChain2 } from "@/config/chains";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface NFTTransferProps {
  isConnected: boolean;
  onTransfer?: (details: any) => void;
}

export function NFTTransfer({ isConnected, onTransfer }: NFTTransferProps) {
  const [isTransferring, setIsTransferring] = useState(false);
  const [formData, setFormData] = useState({
    tokenId: "",
    destinationChainId: "",
    recipientAddress: "",
  });
  const { toast } = useToast();
  const chainId = useChainId();
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();

  // Get the current chain configuration
  const currentChain =
    chainId === kadenaChain1.id
      ? kadenaChain1
      : chainId === kadenaChain2.id
      ? kadenaChain2
      : null;

  // Get available destination chains
  const destinationChains = [kadenaChain1, kadenaChain2].filter(
    (chain) => chain.id !== chainId
  );

  // Check token ownership
  const { data: tokenOwner } = useReadContract({
    address: CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES],
    abi: NFTSenderABI,
    functionName: "ownerOf",
    args: formData.tokenId ? [BigInt(formData.tokenId)] : undefined,
    query: {
      enabled: Boolean(formData.tokenId),
    },
  });

  // Auto-fill recipient address with current address
  useEffect(() => {
    if (address) {
      setFormData((prev) => ({
        ...prev,
        recipientAddress: address,
      }));
    }
  }, [address]);

  const handleTransfer = async () => {
    if (!isConnected || !address || !currentChain) return;

    const { tokenId, destinationChainId, recipientAddress } = formData;

    if (!tokenId || !destinationChainId || !recipientAddress) {
      toast({
        title: "Missing Information",
        description: "Please fill out all fields",
        variant: "destructive",
      });
      return;
    }

    if (!recipientAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
      toast({
        title: "Invalid Recipient Address",
        description: "Please enter a valid wallet address",
        variant: "destructive",
      });
      return;
    }

    // Get the NFT Receiver address for the destination chain
    const destinationContract =
      NFT_RECEIVER_ADDRESSES[
        parseInt(destinationChainId) as keyof typeof NFT_RECEIVER_ADDRESSES
      ];
    if (!destinationContract) {
      toast({
        title: "Invalid Destination Chain",
        description: "NFT Receiver not configured for this chain",
        variant: "destructive",
      });
      return;
    }

    // Check if user owns the token
    if ((tokenOwner as string)?.toLowerCase() !== address.toLowerCase()) {
      toast({
        title: "Not Token Owner",
        description: "You don't own this token",
        variant: "destructive",
      });
      return;
    }

    setIsTransferring(true);

    try {
      // Call the contract's sendNFT function
      const tx = await writeContractAsync({
        abi: NFTSenderABI,
        address: CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES],
        functionName: "sendNFT",
        args: [
          BigInt(tokenId),
          BigInt(destinationChainId),
          destinationContract,
          recipientAddress,
        ],
        chain: currentChain,
        account: address,
      });

      const transferDetails = {
        tokenId,
        fromChain: chainId,
        toChain: parseInt(destinationChainId),
        destinationContract,
        recipientAddress,
        txHash: tx,
      };

      onTransfer?.(transferDetails);

      toast({
        title: "NFT Transfer Initiated! 🌉",
        description: `Transfer to Chain ${destinationChainId} submitted`,
      });

      // Reset form
      setFormData({
        tokenId: "",
        destinationChainId: "",
        recipientAddress: address || "",
      });
    } catch (error: any) {
      console.error("Transfer failed:", error);
      toast({
        title: "Transfer Failed",
        description:
          error?.message || "Failed to transfer NFT. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTransferring(false);
    }
  };

  if (!isConnected) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-4"
    >
      <Card className="cosmic-card p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <ArrowRightLeft className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-orbitron font-bold text-gradient">
              Cross-Chain Transfer
            </h2>
            <p className="text-muted-foreground">
              Transfer NFTs between chains
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Token ID Input */}
          <div className="space-y-2">
            <Label htmlFor="tokenId">Token ID</Label>
            <Input
              id="tokenId"
              type="number"
              value={formData.tokenId}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, tokenId: e.target.value }))
              }
              placeholder="Enter token ID..."
              className="neon-border"
            />
          </div>

          {/* Destination Chain */}
          <div className="space-y-2">
            <Label>Destination Chain</Label>
            <Select
              value={formData.destinationChainId}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, destinationChainId: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select destination chain" />
              </SelectTrigger>
              <SelectContent>
                {destinationChains.map((chain) => (
                  <SelectItem key={chain.id} value={chain.id.toString()}>
                    Chain {chain.id}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Recipient Address */}
          <div className="space-y-2">
            <Label htmlFor="recipientAddress">Recipient Address</Label>
            <Input
              id="recipientAddress"
              value={formData.recipientAddress}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  recipientAddress: e.target.value,
                }))
              }
              placeholder="Enter recipient address"
              className="neon-border"
            />
          </div>

          {/* Token Ownership Status */}
          {formData.tokenId && tokenOwner && (
            <div className="text-sm">
              {(tokenOwner as string).toLowerCase() ===
              address?.toLowerCase() ? (
                <p className="text-success">You own this token</p>
              ) : (
                <p className="text-destructive">You don't own this token</p>
              )}
            </div>
          )}

          {/* Destination Contract Info */}
          {formData.destinationChainId && (
            <div className="text-xs text-muted-foreground">
              <p>NFT Receiver on Chain {formData.destinationChainId}:</p>
              <p className="font-mono mt-1">
                {
                  NFT_RECEIVER_ADDRESSES[
                    parseInt(
                      formData.destinationChainId
                    ) as keyof typeof NFT_RECEIVER_ADDRESSES
                  ]
                }
              </p>
            </div>
          )}

          <Button
            variant="outline"
            size="lg"
            onClick={handleTransfer}
            disabled={!formData.tokenId || isTransferring}
            className="w-full"
          >
            {isTransferring ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Transferring...
              </>
            ) : (
              "Transfer NFT"
            )}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
