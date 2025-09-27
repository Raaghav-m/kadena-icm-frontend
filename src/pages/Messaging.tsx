import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRightLeft } from "lucide-react";
import { useAccount } from "wagmi";
import { ChainMessaging } from "@/components/ChainMessaging";

export default function MessagingPage() {
  const [isConnected, setIsConnected] = useState(false);
  const { address } = useAccount();

  useEffect(() => {
    setIsConnected(Boolean(address));
  }, [address]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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
                <ArrowRightLeft className="h-16 w-16 text-primary mx-auto" />
              </div>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-orbitron font-black text-gradient">
              Cross-Chain Messaging
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Send messages between Kadena chains
            </p>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chain 20 Messaging */}
          <ChainMessaging
            chainId={5920}
            destinationChainId={5921}
            isConnected={isConnected}
          />

          {/* Chain 21 Messaging */}
          <ChainMessaging
            chainId={5921}
            destinationChainId={5920}
            isConnected={isConnected}
          />
        </div>
      </div>
    </div>
  );
}
