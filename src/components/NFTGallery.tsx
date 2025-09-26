import { motion } from "framer-motion";
import { Images, ExternalLink, Copy, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface NFTGalleryProps {
  nfts: any[];
  transfers: any[];
}

export function NFTGallery({ nfts, transfers }: NFTGalleryProps) {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const allNFTs = [...nfts, ...transfers.map(t => ({ ...t.nft, chain: t.toChain }))];

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getChainColor = (chain: string) => {
    switch (chain) {
      case "Chain 1": return "bg-primary/20 text-primary border-primary/30";
      case "Chain 2": return "bg-accent/20 text-accent border-accent/30";
      case "Chain 3": return "bg-warning/20 text-warning border-warning/30";
      default: return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="col-span-full"
    >
      <Card className="cosmic-card p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <Images className="h-8 w-8 text-primary" />
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1"
            >
              <div className="h-3 w-3 bg-accent rounded-full animate-pulse" />
            </motion.div>
          </div>
          <div>
            <h2 className="text-xl font-orbitron font-bold text-gradient">
              NFT Gallery
            </h2>
            <p className="text-muted-foreground">
              Your cross-chain NFT collection ({allNFTs.length} items)
            </p>
          </div>
        </div>

        {allNFTs.length === 0 ? (
          <div className="text-center py-12">
            <Images className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">
              No NFTs Yet
            </h3>
            <p className="text-sm text-muted-foreground">
              Mint your first NFT to see it appear here
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allNFTs.map((nft, index) => (
              <motion.div
                key={`${nft.id}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="interactive-hover cosmic-card p-4 h-full">
                  <div className="space-y-4">
                    {/* NFT Image */}
                    <div className="relative overflow-hidden rounded-lg">
                      <img
                        src={nft.image}
                        alt={nft.name}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      {/* Chain Badge */}
                      <Badge 
                        variant="secondary" 
                        className={`absolute top-2 right-2 ${getChainColor(nft.chain)}`}
                      >
                        {nft.chain}
                      </Badge>
                    </div>

                    {/* NFT Details */}
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg line-clamp-1">
                        {nft.name}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {nft.description}
                      </p>
                      
                      {/* Token ID */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          Token ID: #{nft.tokenId}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(nft.tokenId.toString(), nft.id)}
                          className="h-auto p-1"
                        >
                          {copiedId === nft.id ? (
                            <CheckCircle className="h-3 w-3 text-success" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                      </div>

                      {/* Owner */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          Owner: {nft.owner.slice(0, 6)}...{nft.owner.slice(-4)}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(nft.owner, nft.id * 1000)}
                          className="h-auto p-1"
                        >
                          {copiedId === nft.id * 1000 ? (
                            <CheckCircle className="h-3 w-3 text-success" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <ExternalLink className="h-3 w-3" />
                        View
                      </Button>
                      <Button variant="cosmic" size="sm" className="flex-1">
                        Details
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </Card>
    </motion.div>
  );
}