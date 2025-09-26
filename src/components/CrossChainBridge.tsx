import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRightLeft, ArrowRight, Zap, CheckCircle, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CrossChainBridgeProps {
  nfts: any[];
  isConnected: boolean;
  onTransfer?: (transfer: any) => void;
}

export function CrossChainBridge({ nfts, isConnected, onTransfer }: CrossChainBridgeProps) {
  const [selectedNFT, setSelectedNFT] = useState("");
  const [destinationChain, setDestinationChain] = useState("");
  const [recipient, setRecipient] = useState("");
  const [isBridging, setIsBridging] = useState(false);
  const [bridgeStep, setBridgeStep] = useState(0);

  const chains = [
    { id: "chain2", name: "Chain 2", color: "text-accent" },
    { id: "chain3", name: "Chain 3", color: "text-warning" },
  ];

  const selectedNFTData = nfts.find(nft => nft.id.toString() === selectedNFT);

  const handleBridge = async () => {
    if (!selectedNFTData || !destinationChain || !recipient) return;

    setIsBridging(true);
    setBridgeStep(0);

    const steps = [
      "Initiating cross-chain transfer...",
      "Locking NFT on source chain...",
      "Generating cross-chain proof...",
      "Transmitting to destination...",
      "Unlocking on destination chain...",
    ];

    for (let i = 0; i < steps.length; i++) {
      setBridgeStep(i);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    const transfer = {
      id: Date.now(),
      nft: selectedNFTData,
      fromChain: "Chain 1",
      toChain: chains.find(c => c.id === destinationChain)?.name,
      recipient,
      status: "completed",
      timestamp: new Date(),
    };

    onTransfer?.(transfer);
    
    // Reset form
    setSelectedNFT("");
    setDestinationChain("");
    setRecipient("");
    setIsBridging(false);
    setBridgeStep(0);
  };

  const isFormValid = selectedNFT && destinationChain && recipient;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="cosmic-card p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <ArrowRightLeft className="h-8 w-8 text-primary" />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0"
            >
              <ArrowRightLeft className="h-8 w-8 text-accent opacity-50" />
            </motion.div>
          </div>
          <div>
            <h2 className="text-xl font-orbitron font-bold text-gradient">
              Cross-Chain Bridge
            </h2>
            <p className="text-muted-foreground">
              Transfer NFTs across Kadena chains
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* NFT Selection */}
          <div>
            <Label className="text-sm font-medium">Select NFT</Label>
            <Select value={selectedNFT} onValueChange={setSelectedNFT}>
              <SelectTrigger className="neon-border">
                <SelectValue placeholder="Choose NFT to bridge" />
              </SelectTrigger>
              <SelectContent>
                {nfts.map((nft) => (
                  <SelectItem key={nft.id} value={nft.id.toString()}>
                    <div className="flex items-center gap-2">
                      <img
                        src={nft.image}
                        alt={nft.name}
                        className="w-6 h-6 rounded object-cover"
                      />
                      {nft.name} (#{nft.tokenId})
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Bridge Visualization */}
          <AnimatePresence>
            {selectedNFTData && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="portal-effect p-4 rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">From</div>
                    <div className="font-semibold text-primary">Chain 1</div>
                  </div>
                  
                  <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <ArrowRight className="h-6 w-6 text-accent" />
                  </motion.div>
                  
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">To</div>
                    <div className="font-semibold text-accent">
                      {destinationChain ? chains.find(c => c.id === destinationChain)?.name : "Select Chain"}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Destination Chain */}
          <div>
            <Label className="text-sm font-medium">Destination Chain</Label>
            <Select value={destinationChain} onValueChange={setDestinationChain}>
              <SelectTrigger className="neon-border">
                <SelectValue placeholder="Select destination chain" />
              </SelectTrigger>
              <SelectContent>
                {chains.map((chain) => (
                  <SelectItem key={chain.id} value={chain.id}>
                    <span className={chain.color}>{chain.name}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Recipient Address */}
          <div>
            <Label htmlFor="recipient" className="text-sm font-medium">
              Recipient Address
            </Label>
            <Input
              id="recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="0x..."
              className="neon-border font-mono"
            />
          </div>

          {/* Bridge Button & Status */}
          <div className="space-y-4">
            <Button
              variant="bridge"
              size="lg"
              onClick={handleBridge}
              disabled={!isConnected || !isFormValid || isBridging}
              className={`w-full ${isBridging ? "status-connecting" : ""}`}
            >
              {isBridging ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Bridging...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Bridge NFT
                </>
              )}
            </Button>

            {/* Bridge Progress */}
            <AnimatePresence>
              {isBridging && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-2"
                >
                  {[
                    "Initiating cross-chain transfer...",
                    "Locking NFT on source chain...",
                    "Generating cross-chain proof...",
                    "Transmitting to destination...",
                    "Unlocking on destination chain...",
                  ].map((step, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-2 text-sm ${
                        index <= bridgeStep ? "text-success" : "text-muted-foreground"
                      }`}
                    >
                      {index <= bridgeStep ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border border-current" />
                      )}
                      {step}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {!isConnected && (
            <p className="text-sm text-muted-foreground text-center">
              Connect your wallet to bridge NFTs
            </p>
          )}
        </div>
      </Card>
    </motion.div>
  );
}