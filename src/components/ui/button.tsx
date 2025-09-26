import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow-primary hover:shadow-glow-primary",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-border bg-card/50 backdrop-blur-sm hover:bg-card hover:border-primary/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Cosmic variants
        cosmic: "bg-gradient-cosmic text-foreground border border-primary/30 hover:border-primary/60 shadow-glow-primary hover:scale-105",
        neon: "bg-gradient-neon text-primary-foreground hover:shadow-glow-accent transform hover:scale-105",
        portal: "bg-gradient-portal text-foreground border border-accent/50 hover:border-accent animate-portal-pulse",
        bridge: "bg-gradient-chain text-foreground border border-primary/40 hover:border-primary/70 chain-bridge",
        hero: "bg-primary text-primary-foreground border border-primary/50 hover:bg-primary/90 shadow-glow-primary hover:shadow-glow-accent transform hover:scale-105 font-orbitron font-bold",
        connect: "bg-card/80 backdrop-blur-sm text-foreground border border-success/50 hover:border-success hover:bg-success/10 shadow-glow-success",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-lg px-10 text-lg font-semibold",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
