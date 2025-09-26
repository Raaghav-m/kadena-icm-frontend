import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Sparkles, ArrowRightLeft } from "lucide-react";
import { WalletConnection } from "@/components/WalletConnection";
import { NFTMinter } from "@/components/NFTMinter";
import { CrossChainBridge } from "@/components/CrossChainBridge";
import { NFTGallery } from "@/components/NFTGallery";
import { CrossChainMessages } from "@/components/CrossChainMessages";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [nfts, setNFTs] = useState<any[]>([]);
  const [transfers, setTransfers] = useState<any[]>([]);
  const { toast } = useToast();

  const handleWalletConnect = (address: string) => {
    setIsConnected(true);
    setWalletAddress(address);
    toast({
      title: "Wallet Connected! 🚀",
      description: `Connected to ${address.slice(0, 6)}...${address.slice(-4)}`,
    });
  };

  const handleNFTMint = (nft: any) => {
    setNFTs(prev => [...prev, nft]);
    toast({
      title: "NFT Minted Successfully! ✨",
      description: `${nft.name} has been minted on Chain 1`,
    });
  };

  const handleCrossChainTransfer = (transfer: any) => {
    setTransfers(prev => [...prev, transfer]);
    toast({
      title: "Cross-Chain Transfer Complete! 🌉",
      description: `${transfer.nft.name} bridged to ${transfer.toChain}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden bg-gradient-cosmic border-b border-border/50"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5" />
        <div className="container mx-auto px-6 py-16 relative">
          <div className="text-center space-y-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="inline-block"
            >
              <div className="relative">
                <Zap className="h-16 w-16 text-primary mx-auto" />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0"
                >
                  <Sparkles className="h-16 w-16 text-accent opacity-50" />
                </motion.div>
              </div>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-orbitron font-black text-gradient">
              Kadena CrossChain
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Experience the future of NFTs with seamless cross-chain transfers across Kadena networks
            </p>
            
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <ArrowRightLeft className="h-4 w-4 text-primary" />
                Multi-Chain Bridge
              </span>
              <span className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-accent" />
                Real-Time Transfers
              </span>
              <span className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-success" />
                Instant Minting
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {/* Wallet Connection */}
          <WalletConnection onConnect={handleWalletConnect} />

          {/* NFT Minter */}
          <NFTMinter isConnected={isConnected} onMint={handleNFTMint} />

          {/* Cross Chain Bridge */}
          <CrossChainBridge 
            nfts={nfts} 
            isConnected={isConnected}
            onTransfer={handleCrossChainTransfer}
          />

          {/* NFT Gallery */}
          <NFTGallery nfts={nfts} transfers={transfers} />

          {/* Cross Chain Messages */}
          <CrossChainMessages transfers={transfers} />
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="border-t border-border/50 bg-card/50 backdrop-blur-sm"
      >
        <div className="container mx-auto px-6 py-8">
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Built with ⚡ Kadena CrossChain Technology
            </p>
            <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
              <span>Wagmi + Viem</span>
              <span>•</span>
              <span>Framer Motion</span>
              <span>•</span>
              <span>Tailwind CSS</span>
              <span>•</span>
              <span>Hackathon Ready</span>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Index;
