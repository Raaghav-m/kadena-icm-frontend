import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Loader2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useChainId, useReadContract } from "wagmi";
import {
  NFTSenderABI,
  CONTRACT_ADDRESSES,
  NFT_RECEIVER_ADDRESSES,
} from "@/config/contracts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function NFTViewer() {
  const [tokenId, setTokenId] = useState("");
  const [contractType, setContractType] = useState<"sender" | "receiver">(
    "sender"
  );
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const chainId = useChainId();

  // Get the appropriate contract address based on type
  const contractAddress =
    contractType === "sender"
      ? CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES]
      : NFT_RECEIVER_ADDRESSES[chainId as keyof typeof NFT_RECEIVER_ADDRESSES];

  // Query token URI
  const { data: tokenURI, refetch: refetchURI } = useReadContract({
    address: contractAddress,
    abi: NFTSenderABI,
    functionName: "tokenURI",
    args: tokenId ? [BigInt(tokenId)] : undefined,
    query: {
      enabled: false,
    },
  });

  // Query token owner
  const { data: owner, refetch: refetchOwner } = useReadContract({
    address: contractAddress,
    abi: NFTSenderABI,
    functionName: "ownerOf",
    args: tokenId ? [BigInt(tokenId)] : undefined,
    query: {
      enabled: false,
    },
  });

  const handleSearch = async () => {
    if (!tokenId) {
      toast({
        title: "Invalid Token ID",
        description: "Please enter a token ID",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const [uriResult, ownerResult] = await Promise.all([
        refetchURI(),
        refetchOwner(),
      ]);

      if (!uriResult.data && !ownerResult.data) {
        // If not found in current contract type, try the other one
        const otherType = contractType === "sender" ? "receiver" : "sender";
        setContractType(otherType);
        toast({
          title: "Switching Contract",
          description: `Checking ${otherType} contract...`,
        });
        return;
      }

      toast({
        title: "NFT Found! 🎉",
        description: `Found in ${contractType} contract`,
      });
    } catch (error) {
      console.error("Error fetching NFT:", error);
      toast({
        title: "Error",
        description: "Failed to fetch NFT details",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="cosmic-card p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <Search className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-orbitron font-bold text-gradient">
              NFT Viewer
            </h2>
            <p className="text-muted-foreground">
              View NFT details by token ID
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Contract Type Selection */}
          <div className="space-y-2">
            <Label>Contract Type</Label>
            <Select
              value={contractType}
              onValueChange={(value: "sender" | "receiver") =>
                setContractType(value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select contract type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sender">NFT Sender</SelectItem>
                <SelectItem value="receiver">NFT Receiver</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Current Contract:{" "}
              <span className="font-mono">{contractAddress}</span>
            </p>
          </div>

          {/* Token ID Input */}
          <div className="space-y-2">
            <Label htmlFor="tokenId">Token ID</Label>
            <div className="flex gap-2">
              <Input
                id="tokenId"
                type="number"
                value={tokenId}
                onChange={(e) => setTokenId(e.target.value)}
                placeholder="Enter token ID..."
                className="neon-border"
              />
              <Button
                variant="outline"
                onClick={handleSearch}
                disabled={isLoading || !tokenId}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Search"
                )}
              </Button>
            </div>
          </div>

          {/* NFT Details */}
          {tokenURI && owner && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="p-4 rounded-lg bg-card/50 border border-border">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Contract Type
                    </span>
                    <span className="font-mono capitalize">{contractType}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Token ID
                    </span>
                    <span className="font-mono">{tokenId}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Owner</span>
                    <span className="font-mono text-xs">
                      {(owner as string)?.slice(0, 6)}...
                      {(owner as string)?.slice(-4)}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Token URI
                      </span>
                      <a
                        href={tokenURI as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-primary hover:underline"
                      >
                        <span className="font-mono text-xs">View</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                    <div className="font-mono text-xs break-all bg-card/30 p-2 rounded">
                      {tokenURI as string}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
