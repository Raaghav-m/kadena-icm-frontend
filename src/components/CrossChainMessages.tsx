import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, ArrowRight, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

interface CrossChainMessagesProps {
  transfers: any[];
}

export function CrossChainMessages({ transfers }: CrossChainMessagesProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-success/20 text-success border-success/30";
      case "pending": return "bg-warning/20 text-warning border-warning/30";
      case "failed": return "bg-destructive/20 text-destructive border-destructive/30";
      default: return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4" />;
      case "pending": return <Clock className="h-4 w-4" />;
      case "failed": return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="col-span-full"
    >
      <Card className="cosmic-card p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <MessageSquare className="h-8 w-8 text-primary" />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1"
            >
              <div className="h-3 w-3 bg-accent rounded-full" />
            </motion.div>
          </div>
          <div>
            <h2 className="text-xl font-orbitron font-bold text-gradient">
              Cross-Chain Messages
            </h2>
            <p className="text-muted-foreground">
              Real-time transfer activity ({transfers.length} messages)
            </p>
          </div>
        </div>

        {transfers.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">
              No Messages Yet
            </h3>
            <p className="text-sm text-muted-foreground">
              Cross-chain transfers will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            <AnimatePresence>
              {transfers.map((transfer, index) => (
                <motion.div
                  key={transfer.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="cosmic-card p-4 border border-primary/20"
                >
                  <div className="flex items-start gap-4">
                    {/* NFT Image */}
                    <img
                      src={transfer.nft.image}
                      alt={transfer.nft.name}
                      className="w-12 h-12 rounded-lg object-cover border border-primary/30"
                    />

                    {/* Transfer Details */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{transfer.nft.name}</h4>
                        <Badge className={getStatusColor(transfer.status)}>
                          {getStatusIcon(transfer.status)}
                          {transfer.status}
                        </Badge>
                      </div>

                      {/* Transfer Route */}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="font-medium text-primary">
                          {transfer.fromChain}
                        </span>
                        <ArrowRight className="h-3 w-3" />
                        <span className="font-medium text-accent">
                          {transfer.toChain}
                        </span>
                      </div>

                      {/* Recipient */}
                      <div className="text-sm">
                        <span className="text-muted-foreground">To: </span>
                        <span className="font-mono text-foreground">
                          {transfer.recipient.slice(0, 6)}...{transfer.recipient.slice(-4)}
                        </span>
                      </div>

                      {/* Timestamp */}
                      <div className="text-xs text-muted-foreground">
                        {formatDistanceToNow(transfer.timestamp, { addSuffix: true })}
                      </div>
                    </div>
                  </div>

                  {/* Progress Animation */}
                  {transfer.status === "pending" && (
                    <motion.div
                      className="mt-3 h-1 bg-warning/20 rounded-full overflow-hidden"
                    >
                      <motion.div
                        className="h-full bg-warning rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 5, repeat: Infinity }}
                      />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </Card>
    </motion.div>
  );
}