import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, CheckCircle, Truck, MapPin, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useSSE } from "@/hooks/useSSE";
import { OrderStatusUpdate } from "@/types/sse.types";

interface RealtimeOrderStatusProps {
  orderId: number;
  initialStatus?: string;
  onStatusUpdate?: (status: string) => void;
}

const statusConfig = {
  PENDING: {
    label: "주문 접수",
    icon: Clock,
    color: "bg-yellow-500",
    description: "주문이 접수되었습니다",
  },
  CONFIRMED: {
    label: "주문 확인",
    icon: CheckCircle,
    color: "bg-blue-500",
    description: "가게에서 주문을 확인했습니다",
  },
  PREPARING: {
    label: "조리 중",
    icon: Clock,
    color: "bg-orange-500",
    description: "음식을 준비하고 있습니다",
  },
  DELIVERING: {
    label: "배달 중",
    icon: Truck,
    color: "bg-purple-500",
    description: "배달원이 음식을 배달하고 있습니다",
  },
  DELIVERED: {
    label: "배달 완료",
    icon: MapPin,
    color: "bg-green-500",
    description: "배달이 완료되었습니다",
  },
  CANCELLED: {
    label: "주문 취소",
    icon: AlertCircle,
    color: "bg-red-500",
    description: "주문이 취소되었습니다",
  },
};

export function RealtimeOrderStatus({
  orderId,
  initialStatus = "PENDING",
  onStatusUpdate,
}: RealtimeOrderStatusProps) {
  const [currentStatus, setCurrentStatus] = useState(initialStatus);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [statusHistory, setStatusHistory] = useState<OrderStatusUpdate[]>([]);

  const { isConnected } = useSSE({
    autoConnect: true,
    autoReconnect: true,
  });

  // SSE 이벤트 리스너 등록
  useEffect(() => {
    const handleOrderStatusUpdate = (data: OrderStatusUpdate) => {
      if (data.orderId === orderId) {
        setCurrentStatus(data.status);
        setLastUpdate(new Date(data.timestamp));
        setStatusHistory((prev) => [...prev, data]);
        onStatusUpdate?.(data.status);
      }
    };

    // SSE 이벤트 리스너 등록
    const sseApi = require("@/services/api").sseApi;
    sseApi.addEventListener("order-status-update", handleOrderStatusUpdate);

    return () => {
      sseApi.removeEventListener(
        "order-status-update",
        handleOrderStatusUpdate
      );
    };
  }, [orderId, onStatusUpdate]);

  const currentConfig =
    statusConfig[currentStatus as keyof typeof statusConfig] ||
    statusConfig.PENDING;
  const Icon = currentConfig.icon;

  const statusSteps = Object.keys(statusConfig).slice(0, 5); // CANCELLED 제외
  const currentStepIndex = statusSteps.indexOf(currentStatus);

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        {/* 현재 상태 헤더 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <motion.div
              key={currentStatus}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className={`w-12 h-12 rounded-full ${currentConfig.color} flex items-center justify-center`}
            >
              <Icon className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <motion.h3
                key={currentStatus}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-lg font-semibold"
              >
                {currentConfig.label}
              </motion.h3>
              <motion.p
                key={currentStatus}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-sm text-muted-foreground"
              >
                {currentConfig.description}
              </motion.p>
            </div>
          </div>

          <div className="text-right">
            <Badge variant={isConnected ? "default" : "secondary"}>
              {isConnected ? "실시간 연결" : "연결 끊김"}
            </Badge>
            <p className="text-xs text-muted-foreground mt-1">
              {lastUpdate.toLocaleTimeString()}
            </p>
          </div>
        </div>

        {/* 진행 상태 표시 */}
        {currentStatus !== "CANCELLED" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              {statusSteps.map((status, index) => {
                const config =
                  statusConfig[status as keyof typeof statusConfig];
                const StepIcon = config.icon;
                const isCompleted = index <= currentStepIndex;
                const isCurrent = index === currentStepIndex;

                return (
                  <div
                    key={status}
                    className="flex flex-col items-center flex-1"
                  >
                    <motion.div
                      animate={{
                        scale: isCurrent ? 1.2 : 1,
                        backgroundColor: isCompleted
                          ? config.color.replace("bg-", "")
                          : "#e5e7eb",
                      }}
                      transition={{ duration: 0.3 }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isCompleted ? config.color : "bg-gray-300"
                      }`}
                    >
                      <StepIcon
                        className={`w-4 h-4 ${
                          isCompleted ? "text-white" : "text-gray-500"
                        }`}
                      />
                    </motion.div>
                    <p
                      className={`text-xs mt-2 text-center ${
                        isCompleted
                          ? "text-gray-900 font-medium"
                          : "text-muted-foreground"
                      }`}
                    >
                      {config.label}
                    </p>

                    {index < statusSteps.length - 1 && (
                      <div className="absolute top-4 left-1/2 w-full h-0.5 bg-gray-300 transform -translate-y-1/2 -z-10">
                        <motion.div
                          className={`h-full ${
                            isCompleted ? config.color : "bg-gray-300"
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: isCompleted ? "100%" : "0%" }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 상태 변경 히스토리 */}
        {statusHistory.length > 0 && (
          <div className="mt-6 pt-4 border-t">
            <h4 className="text-sm font-medium mb-3">상태 변경 히스토리</h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              <AnimatePresence>
                {statusHistory
                  .slice(-5)
                  .reverse()
                  .map((update, index) => (
                    <motion.div
                      key={`${update.orderId}-${update.timestamp}`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between text-xs p-2 bg-muted rounded"
                    >
                      <span>{update.message}</span>
                      <span className="text-muted-foreground">
                        {new Date(update.timestamp).toLocaleTimeString()}
                      </span>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
