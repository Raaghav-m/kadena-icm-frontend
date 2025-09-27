import { motion } from "framer-motion";
import { Wallet, Zap, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useWallet } from "@/hooks/useWallet";
import { formatEther } from "viem";
import { useEffect, useState } from "react";

interface WalletConnectionProps {
  onConnect?: (address: string) => void;
}

export function WalletConnection({ onConnect }: WalletConnectionProps) {
  const {
    isConnected,
    isConnecting,
    connect,
    disconnect,
    connectors,
    displayAddress,
    balance,
    connectError,
    address,
  } = useWallet();

  // Track if we've already called onConnect
  const [hasConnected, setHasConnected] = useState(false);

  useEffect(() => {
    if (address && onConnect && !hasConnected) {
      onConnect(address);
      setHasConnected(true);
    }
  }, [address, onConnect, hasConnected]);

  // Reset hasConnected when disconnected
  useEffect(() => {
    if (!isConnected) {
      setHasConnected(false);
    }
  }, [isConnected]);

  // Filter for MetaMask only
  const metaMaskConnector = connectors.find(
    (connector) => connector.name === "MetaMask"
  );

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
              Kadena Wallet
            </h2>
            <p className="text-muted-foreground">
              Connect your Kadena-compatible wallet to continue
            </p>
          </div>
        </div>

        {!isConnected ? (
          <div className="space-y-4">
            {metaMaskConnector && (
              <Button
                variant="connect"
                size="lg"
                onClick={() => connect({ connector: metaMaskConnector })}
                disabled={isConnecting}
                className={`w-full ${isConnecting ? "status-connecting" : ""}`}
              >
                <Zap className="h-5 w-5 mr-2" />
                {isConnecting ? "Connecting..." : "Connect Kadena Wallet"}
              </Button>
            )}

            {connectError && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 text-destructive"
              >
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{connectError.message}</span>
              </motion.div>
            )}

            <div className="text-xs text-muted-foreground text-center">
              Please make sure you have MetaMask installed with Kadena network
              configured
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
                    {displayAddress}
                  </div>
                  {balance && (
                    <div className="text-sm text-muted-foreground mt-1">
                      Balance: {formatEther(balance.value)} {balance.symbol}
                    </div>
                  )}
                </div>
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => disconnect()}
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
