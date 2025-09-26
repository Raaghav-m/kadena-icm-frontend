# 🚀 Kadena Cross-Chain NFT Demo

> **Futuristic cross-chain NFT interface for Kadena networks - Built for hackathons and demos**

A cutting-edge React application showcasing seamless NFT minting, cross-chain transfers, and real-time messaging across Kadena blockchain networks. Features a cyberpunk-inspired design with cosmic animations and interactive bridge visualizations.

![Kadena CrossChain Demo](https://img.shields.io/badge/Status-Hackathon%20Ready-brightgreen)
![Tech Stack](https://img.shields.io/badge/Tech-React%20%7C%20Wagmi%20%7C%20Framer%20Motion-blue)

## ⚡ Quick Start

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd kadena-crosschain-nft-demo

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:8080` to see the futuristic interface in action!

## 🎨 Features

### 🔗 **Wallet Connection**
- MetaMask & Kadena EVM wallet support
- Real-time connection status with glow effects
- Animated connection flow with status indicators

### ✨ **NFT Minting**
- Mint NFTs on Chain 1 with image upload
- Live preview with cosmic animations
- IPFS metadata support (ready for integration)

### 🌉 **Cross-Chain Bridge**
- Interactive bridge visualization
- Animated cross-chain transfer flow
- Real-time progress tracking with 5-step process
- Support for multiple destination chains

### 🖼️ **NFT Gallery**
- Responsive grid layout with hover effects
- Multi-chain NFT display
- Copy-to-clipboard functionality
- Chain-specific color coding

### 📡 **Real-Time Messaging**
- Live cross-chain transfer activity
- Message status tracking (pending/completed/failed)
- Timestamp and transfer details
- Animated message updates

## 🎨 Design System

### **Color Palette**
- **Primary**: Electric Blue (`hsl(200 100% 50%)`)
- **Accent**: Neon Cyan (`hsl(180 100% 50%)`)
- **Secondary**: Deep Purple (`hsl(270 50% 20%)`)
- **Background**: Deep Space (`hsl(240 10% 4%)`)

### **Typography**
- **Headers**: Orbitron (Futuristic, bold)
- **Body**: Exo 2 (Clean, readable)

### **Animations**
- Portal pulse effects for cross-chain elements
- Cosmic floating animations
- Glow effects and neon borders
- Interactive hover transformations

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom Design System
- **Animations**: Framer Motion
- **Blockchain**: Wagmi + Viem
- **UI Components**: shadcn/ui (customized)
- **Icons**: Lucide React

## 🔧 Project Structure

```
src/
├── components/
│   ├── ui/                 # Enhanced shadcn components
│   ├── WalletConnection.tsx # Wallet integration
│   ├── NFTMinter.tsx       # NFT creation interface
│   ├── CrossChainBridge.tsx # Bridge visualization
│   ├── NFTGallery.tsx      # NFT display grid
│   └── CrossChainMessages.tsx # Activity feed
├── pages/
│   └── Index.tsx           # Main dashboard
├── hooks/
│   └── use-toast.ts        # Toast notifications
└── lib/
    └── utils.ts            # Utility functions
```

## 🚀 Deployment

### **Quick Deploy with Lovable**
1. Open [Lovable Project](https://lovable.dev/projects/baeaf771-6707-4a92-9b28-cbeb12fb8119)
2. Click **Share → Publish**
3. Your demo is live! 🎉

### **Custom Domain**
- Go to Project → Settings → Domains
- Connect your custom domain for professional demos

## 🔗 Integration Guide

### **Smart Contract Integration**

```typescript
// Example contract addresses (replace with your deployed contracts)
const CONTRACTS = {
  CHAIN_1: {
    NFT_CONTRACT: "0x...", // Your NFT contract on Chain 1
    BRIDGE_CONTRACT: "0x...", // Bridge contract
  },
  CHAIN_2: {
    NFT_CONTRACT: "0x...", // Your NFT contract on Chain 2
    BRIDGE_CONTRACT: "0x...", // Bridge contract
  }
};

// Update in src/components/NFTMinter.tsx
const handleMint = async () => {
  const contract = new Contract(CONTRACTS.CHAIN_1.NFT_CONTRACT, abi, signer);
  const tx = await contract.mintNFT(metadata);
  // Handle transaction...
};
```

### **Wagmi Configuration**

```typescript
// Add to your wagmi config
import { kadena, kadenaTestnet } from 'wagmi/chains';

export const config = createConfig({
  chains: [kadena, kadenaTestnet],
  // Your configuration...
});
```

## 🎪 Demo Features

### **Hackathon-Ready Elements**
- ✅ Animated wallet connection
- ✅ Live NFT minting simulation
- ✅ Cross-chain bridge visualization
- ✅ Real-time transfer tracking
- ✅ Responsive cosmic design
- ✅ Toast notifications
- ✅ Interactive hover effects

### **Perfect for Presentations**
- Large, clear typography
- High contrast cosmic theme
- Smooth animations
- Intuitive user flow
- Visual feedback for all actions

## 📱 Responsive Design

- **Desktop**: Full 3-column layout with all features
- **Tablet**: 2-column responsive grid
- **Mobile**: Single column with optimized spacing

## 🎯 Customization

### **Brand Colors**
Update `src/index.css` to match your brand:

```css
:root {
  --primary: [your-brand-hsl];
  --accent: [your-accent-hsl];
  /* Update gradient variables */
}
```

### **Add Your Logo**
Replace the animated Zap icon in the header with your logo.

### **Contract Addresses**
Update placeholder contract addresses in components with your deployed contracts.

## 🐛 Development

```bash
# Type checking
npm run build

# Linting
npm run lint

# Preview production build
npm run preview
```

## 📈 Performance

- ⚡ Vite for lightning-fast development
- 🎨 CSS-in-JS with Tailwind for optimal bundles
- 🔄 Lazy loading for components
- 📦 Tree-shaking for minimal bundle size

## 🤝 Contributing

This is a hackathon demo template. Feel free to:
1. Fork the repository
2. Customize for your project
3. Add your smart contract integration
4. Deploy and demo!

## 📄 License

MIT License - Perfect for hackathon projects and demos.

---

**Built with ⚡ by the Kadena CrossChain Labs team**

*Ready to bridge the future of NFTs across Kadena networks!*