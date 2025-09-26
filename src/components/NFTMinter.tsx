import { useState } from "react";
import { motion } from "framer-motion";
import { ImageIcon, Sparkles, Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface NFTMinterProps {
  isConnected: boolean;
  onMint?: (nft: any) => void;
}

export function NFTMinter({ isConnected, onMint }: NFTMinterProps) {
  const [isMinting, setIsMinting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null as File | null,
  });
  const [previewUrl, setPreviewUrl] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleMint = async () => {
    if (!isConnected) return;
    
    setIsMinting(true);
    
    try {
      // Simulate NFT minting process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockNFT = {
        id: Date.now(),
        name: formData.name,
        description: formData.description,
        image: previewUrl,
        tokenId: Math.floor(Math.random() * 10000),
        chain: "Chain 1",
        owner: "0x742d35Cc6641C02D5c5474db0C38bA1c5f4F9CAe",
      };

      onMint?.(mockNFT);
      
      // Reset form
      setFormData({ name: "", description: "", image: null });
      setPreviewUrl("");
    } catch (error) {
      console.error("Minting failed:", error);
    } finally {
      setIsMinting(false);
    }
  };

  const isFormValid = formData.name && formData.description && formData.image;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="cosmic-card p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <ImageIcon className="h-8 w-8 text-primary" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute -top-1 -right-1"
            >
              <Sparkles className="h-4 w-4 text-accent" />
            </motion.div>
          </div>
          <div>
            <h2 className="text-xl font-orbitron font-bold text-gradient">
              NFT Minter
            </h2>
            <p className="text-muted-foreground">
              Create your cross-chain NFT on Chain 1
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Image Upload */}
          <div>
            <Label htmlFor="image" className="text-sm font-medium">
              Upload Image
            </Label>
            <div className="mt-2">
              {previewUrl ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="relative group"
                >
                  <img
                    src={previewUrl}
                    alt="NFT Preview"
                    className="w-full h-48 object-cover rounded-lg border border-primary/30"
                  />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <Upload className="h-8 w-8 text-primary" />
                  </div>
                </motion.div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                  <Upload className="h-12 w-12 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">
                    Click to upload image
                  </span>
                </label>
              )}
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          {/* NFT Details */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium">
                NFT Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter NFT name..."
                className="neon-border"
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-sm font-medium">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your NFT..."
                className="neon-border"
                rows={3}
              />
            </div>
          </div>

          {/* Mint Button */}
          <Button
            variant="hero"
            size="lg"
            onClick={handleMint}
            disabled={!isConnected || !isFormValid || isMinting}
            className={`w-full ${isMinting ? "status-connecting" : ""}`}
          >
            {isMinting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Minting NFT...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                Mint NFT
              </>
            )}
          </Button>

          {!isConnected && (
            <p className="text-sm text-muted-foreground text-center">
              Connect your wallet to mint NFTs
            </p>
          )}
        </div>
      </Card>
    </motion.div>
  );
}