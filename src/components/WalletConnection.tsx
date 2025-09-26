import { useState } from "react";
import { motion } from "framer-motion";
import { Wallet, Zap, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface WalletConnectionProps {
  onConnect?: (address: string) => void;
}

export function WalletConnection({ onConnect }: WalletConnectionProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [error, setError] = useState("");

  const handleConnect = async () => {
    setIsConnecting(true);
    setError("");
    
    try {
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockAddress = "0x742d35Cc6641C02D5c5474db0C38bA1c5f4F9CAe";
      setWalletAddress(mockAddress);
      setIsConnected(true);
      onConnect?.(mockAddress);
    } catch (err) {
      setError("Failed to connect wallet");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setWalletAddress("");
    setError("");
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
            <Wallet className="h-8 w-8 text-primary" />
            {isConnected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1"
              >
                <CheckCircle className="h-4 w-4 text-success" />
              </motion.div>
            )}
          </div>
          <div>
            <h2 className="text-xl font-orbitron font-bold text-gradient">
              Wallet Connection
            </h2>
            <p className="text-muted-foreground">
              Connect your MetaMask or Kadena wallet
            </p>
          </div>
        </div>

        {!isConnected ? (
          <div className="space-y-4">
            <Button
              variant="connect"
              size="lg"
              onClick={handleConnect}
              disabled={isConnecting}
              className={`w-full ${isConnecting ? "status-connecting" : ""}`}
            >
              <Zap className="h-5 w-5" />
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </Button>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 text-destructive"
              >
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{error}</span>
              </motion.div>
            )}

            <div className="text-xs text-muted-foreground text-center">
              Supported: MetaMask, Kadena Chainweaver, WalletConnect
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="status-connected p-4 rounded-lg bg-success/10 border border-success/20">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-success">Connected</div>
                  <div className="text-sm text-muted-foreground font-mono">
                    {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                  </div>
                </div>
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleDisconnect}
              className="w-full"
            >
              Disconnect
            </Button>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
}