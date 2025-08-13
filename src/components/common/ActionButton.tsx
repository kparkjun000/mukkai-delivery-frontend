import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "./LoadingSpinner";
import { cn } from "@/lib/utils";

interface ActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

export function ActionButton({
  children,
  isLoading = false,
  loadingText = "처리 중...",
  className,
  disabled,
  ...props
}: ActionButtonProps) {
  return (
    <Button
      disabled={disabled || isLoading}
      className={cn(
        "relative transition-all duration-200",
        isLoading && "cursor-not-allowed",
        className
      )}
      {...props}
    >
      <motion.span
        animate={{ opacity: isLoading ? 0 : 1 }}
        className="flex items-center gap-2"
      >
        {children}
      </motion.span>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <LoadingSpinner size="sm" className="mr-2" />
          {loadingText}
        </motion.div>
      )}
    </Button>
  );
}
