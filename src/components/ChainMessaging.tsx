import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Send, Loader2, SwitchCamera } from "lucide-react";
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
  useSwitchChain,
} from "wagmi";
import {
  CrossChainMessagingABI,
  MESSAGING_APP_ADDRESSES,
} from "@/config/contracts";
import { kadenaChain1, kadenaChain2 } from "@/config/chains";

interface ChainMessagingProps {
  chainId: number;
  destinationChainId: number;
  isConnected: boolean;
}

export function ChainMessaging({
  chainId,
  destinationChainId,
  isConnected,
}: ChainMessagingProps) {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSwitchingChain, setIsSwitchingChain] = useState(false);
  const { address } = useAccount();
  const currentChainId = useChainId();
  const { writeContractAsync } = useWriteContract();
  const { switchChainAsync } = useSwitchChain();
  const { toast } = useToast();

  const isCorrectChain = currentChainId === chainId;

  // Get last received message
  const { data: lastMessage } = useReadContract({
    address:
      MESSAGING_APP_ADDRESSES[chainId as keyof typeof MESSAGING_APP_ADDRESSES],
    abi: CrossChainMessagingABI,
    functionName: "lastMessage",
    query: {
      enabled: isConnected && isCorrectChain,
      refetchInterval: 5000, // Poll every 5 seconds
    },
  });

  const handleSwitchChain = async () => {
    if (!isConnected) return;

    setIsSwitchingChain(true);
    try {
      await switchChainAsync({ chainId });
      toast({
        title: "Chain Switched! 🔄",
        description: `Switched to Chain ${chainId}`,
      });
    } catch (error: any) {
      console.error("Failed to switch chain:", error);
      toast({
        title: "Chain Switch Failed",
        description: error?.message || "Failed to switch chain",
        variant: "destructive",
      });
    } finally {
      setIsSwitchingChain(false);
    }
  };

  const handleSendMessage = async () => {
    if (!message || !isConnected || !isCorrectChain) return;

    setIsSending(true);
    try {
      const destinationAddress =
        MESSAGING_APP_ADDRESSES[
          destinationChainId as keyof typeof MESSAGING_APP_ADDRESSES
        ];

      const tx = await writeContractAsync({
        address:
          MESSAGING_APP_ADDRESSES[
            chainId as keyof typeof MESSAGING_APP_ADDRESSES
          ],
        abi: CrossChainMessagingABI,
        functionName: "sendCrossChainMessage",
        args: [BigInt(destinationChainId), destinationAddress, message],
        chain: chainId === 5920 ? kadenaChain1 : kadenaChain2,
        account: address,
      });

      toast({
        title: "Message Sent! 🚀",
        description: `Message sent to Chain ${destinationChainId}`,
      });

      setMessage("");
    } catch (error: any) {
      console.error("Failed to send message:", error);
      toast({
        title: "Error",
        description: error?.message || "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Card className="cosmic-card p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <MessageSquare className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-orbitron font-bold text-gradient">
            Chain {chainId}
          </h2>
          <p className="text-muted-foreground">
            Send messages to Chain {destinationChainId}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Chain Switch Warning */}
        {isConnected && !isCorrectChain && (
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 flex items-center justify-between">
            <p className="text-sm text-warning">
              Switch to Chain {chainId} to send messages
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSwitchChain}
              disabled={isSwitchingChain}
            >
              {isSwitchingChain ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <SwitchCamera className="h-4 w-4 mr-2" />
                  Switch Chain
                </>
              )}
            </Button>
          </div>
        )}

        {/* Message Input */}
        <div className="space-y-2">
          <Label>Message</Label>
          <div className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message..."
              disabled={!isConnected || !isCorrectChain || isSending}
            />
            <Button
              variant="outline"
              onClick={handleSendMessage}
              disabled={
                !isConnected || !isCorrectChain || !message || isSending
              }
            >
              {isSending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Last Received Message */}
        <div className="space-y-2">
          <Label>Last Received Message</Label>
          <div className="p-4 rounded-lg bg-card/50 border border-border min-h-[60px]">
            {lastMessage ? (
              <p className="break-words">{lastMessage as string}</p>
            ) : (
              <p className="text-muted-foreground text-sm">No messages yet</p>
            )}
          </div>
        </div>

        {/* Contract Info */}
        <div className="text-xs text-muted-foreground space-y-1">
          <p>Contract Address:</p>
          <p className="font-mono">
            {
              MESSAGING_APP_ADDRESSES[
                chainId as keyof typeof MESSAGING_APP_ADDRESSES
              ]
            }
          </p>
        </div>
      </div>
    </Card>
  );
}
