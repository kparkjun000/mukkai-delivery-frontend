import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  variant?: "circular" | "dots" | "pulse" | "wave";
  className?: string;
}

export function LoadingSpinner({
  size = "md",
  variant = "circular",
  className,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  if (variant === "circular") {
    return (
      <motion.div
        className={cn(
          "border-2 border-muted border-t-primary rounded-full",
          sizeClasses[size],
          className
        )}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    );
  }

  if (variant === "dots") {
    const dotSizes = {
      sm: "w-1 h-1",
      md: "w-2 h-2",
      lg: "w-3 h-3",
    };

    return (
      <div className={cn("flex gap-1", className)}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={cn("bg-primary rounded-full", dotSizes[size])}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <motion.div
        className={cn("bg-primary rounded-full", sizeClasses[size], className)}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.8, 0.4, 0.8],
        }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    );
  }

  if (variant === "wave") {
    const barSizes = {
      sm: "w-0.5 h-3",
      md: "w-1 h-4",
      lg: "w-1.5 h-6",
    };

    return (
      <div className={cn("flex gap-0.5 items-center", className)}>
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className={cn("bg-primary rounded-full", barSizes[size])}
            animate={{
              scaleY: [1, 0.4, 1],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>
    );
  }

  return null;
}
