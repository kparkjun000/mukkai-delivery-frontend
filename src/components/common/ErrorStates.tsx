import React from "react";
import { motion } from "framer-motion";
import {
  RefreshCw,
  AlertCircle,
  WifiOff,
  ChefHat,
  ShoppingBag,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ErrorMessageProps {
  title?: string;
  message?: string;
  type?: "network" | "server" | "notFound" | "general" | "empty";
  onRetry?: () => void;
  onGoHome?: () => void;
  className?: string;
}

export function ErrorMessage({
  title = "문제가 발생했습니다",
  message = "잠시 후 다시 시도해주세요",
  type = "general",
  onRetry,
  onGoHome,
  className,
}: ErrorMessageProps) {
  const getIcon = () => {
    switch (type) {
      case "network":
        return <WifiOff className="w-12 h-12 text-destructive" />;
      case "server":
        return <AlertCircle className="w-12 h-12 text-destructive" />;
      case "notFound":
        return <ChefHat className="w-12 h-12 text-muted-foreground" />;
      case "empty":
        return <ShoppingBag className="w-12 h-12 text-muted-foreground" />;
      default:
        return <AlertCircle className="w-12 h-12 text-destructive" />;
    }
  };

  const getDefaultContent = () => {
    switch (type) {
      case "network":
        return {
          title: "인터넷 연결을 확인해주세요",
          message: "네트워크 연결을 확인하고 다시 시도해주세요",
        };
      case "server":
        return {
          title: "서버 오류",
          message: "서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요",
        };
      case "notFound":
        return {
          title: "검색 결과가 없습니다",
          message: "검색 조건을 변경하거나 다른 키워드로 검색해보세요",
        };
      case "empty":
        return {
          title: "텅 비어있네요",
          message: "아직 아무것도 없습니다. 새로운 항목을 추가해보세요",
        };
      default:
        return { title, message };
    }
  };

  const content = getDefaultContent();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center",
        className
      )}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        {getIcon()}
      </motion.div>
      <h3 className="mt-4 text-lg font-semibold text-gray-900">
        {content.title}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-sm">
        {content.message}
      </p>

      <div className="flex gap-3 mt-6">
        {onRetry && (
          <Button onClick={onRetry} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            다시 시도
          </Button>
        )}
        {onGoHome && (
          <Button onClick={onGoHome} variant="default" size="sm">
            <Home className="w-4 h-4 mr-2" />
            홈으로 가기
          </Button>
        )}
      </div>
    </motion.div>
  );
}

interface EmptyStateProps {
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  message,
  actionLabel,
  onAction,
  icon,
  className,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "flex flex-col items-center justify-center p-12 text-center",
        className
      )}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="mb-6"
      >
        {icon || <ShoppingBag className="w-16 h-16 text-muted-foreground" />}
      </motion.div>

      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-md">{message}</p>

      {actionLabel && onAction && (
        <Button onClick={onAction} className="px-6">
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
}

interface NetworkErrorProps {
  onRetry?: () => void;
  className?: string;
}

export function NetworkError({ onRetry, className }: NetworkErrorProps) {
  return (
    <ErrorMessage type="network" onRetry={onRetry} className={className} />
  );
}

interface ServerErrorProps {
  onRetry?: () => void;
  onGoHome?: () => void;
  className?: string;
}

export function ServerError({
  onRetry,
  onGoHome,
  className,
}: ServerErrorProps) {
  return (
    <ErrorMessage
      type="server"
      onRetry={onRetry}
      onGoHome={onGoHome}
      className={className}
    />
  );
}

interface NotFoundErrorProps {
  message?: string;
  onRetry?: () => void;
  onGoHome?: () => void;
  className?: string;
}

export function NotFoundError({
  message,
  onRetry,
  onGoHome,
  className,
}: NotFoundErrorProps) {
  return (
    <ErrorMessage
      type="notFound"
      message={message}
      onRetry={onRetry}
      onGoHome={onGoHome}
      className={className}
    />
  );
}
