import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Sparkles, ArrowRightLeft, MessageSquare } from "lucide-react";
import { WalletConnection } from "@/components/WalletConnection";
import { NFTMinter } from "@/components/NFTMinter";
import { NFTTransfer } from "@/components/NFTTransfer";
import { NFTViewer } from "@/components/NFTViewer";
import { useToast } from "@/hooks/use-toast";
import { useChainId } from "wagmi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const chainId = useChainId();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleWalletConnect = (address: string) => {
    setIsConnected(true);
    setWalletAddress(address);
    toast({
      title: "Wallet Connected! 🚀",
      description: `Connected to ${address.slice(0, 6)}...${address.slice(-4)}`,
    });
  };

  const handleNFTMint = (nft: any) => {
    toast({
      title: "NFT Minted Successfully! ✨",
      description: `NFT #${nft.tokenId} has been minted`,
    });
  };

  const handleNFTTransfer = (details: any) => {
    toast({
      title: "Cross-Chain Transfer Initiated! 🌉",
      description: `NFT #${details.tokenId} is being transferred to Chain ${details.toChain}`,
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
              Experience the future of NFTs with seamless cross-chain transfers
              across Kadena networks
            </p>

            {/* Messaging Page Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/messaging")}
                className="gap-2"
              >
                <MessageSquare className="h-5 w-5" />
                Cross-Chain Messaging
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        {/* Wallet Connection */}
        <div className="mb-8">
          <WalletConnection onConnect={handleWalletConnect} />
        </div>

        {/* Main Functionality Tabs */}
        <Tabs defaultValue="mint" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px] mx-auto">
            <TabsTrigger value="mint">NFT Minting</TabsTrigger>
            <TabsTrigger value="view">NFT Viewer</TabsTrigger>
            <TabsTrigger value="transfer">Cross Chain</TabsTrigger>
          </TabsList>

          {/* NFT Minting Section */}
          <TabsContent value="mint" className="space-y-8">
            <div className="max-w-xl mx-auto">
              <NFTMinter isConnected={isConnected} onMint={handleNFTMint} />
            </div>
          </TabsContent>

          {/* NFT Viewer Section */}
          <TabsContent value="view" className="space-y-8">
            <div className="max-w-xl mx-auto">
              <NFTViewer />
            </div>
          </TabsContent>

          {/* Cross Chain Transfer Section */}
          <TabsContent value="transfer" className="space-y-8">
            <div className="max-w-xl mx-auto">
              <NFTTransfer
                isConnected={isConnected}
                onTransfer={handleNFTTransfer}
              />
            </div>
          </TabsContent>
        </Tabs>
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
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Index;
