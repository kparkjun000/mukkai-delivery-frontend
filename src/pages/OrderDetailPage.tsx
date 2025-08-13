import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft, Store, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RealtimeOrderStatus } from "@/components/order/RealtimeOrderStatus";
import { orderApi } from "@/services/api";

export default function OrderDetailPage() {
  const { orderId } = useParams<{ orderId: string }>();

  const {
    data: order,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => orderApi.getOrderDetail(parseInt(orderId!)),
    enabled: !!orderId,
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">주문을 찾을 수 없습니다</h1>
        <p className="text-gray-600 mb-6">요청하신 주문이 존재하지 않습니다.</p>
        <Button onClick={() => window.history.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          뒤로 가기
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">주문 상세</h1>
              <p className="text-muted-foreground">주문번호 #{order.id}</p>
            </div>
          </div>
          <Badge variant="outline">
            {new Date(order.orderedAt).toLocaleDateString()}
          </Badge>
        </div>

        {/* 실시간 주문 상태 */}
        <RealtimeOrderStatus orderId={order.id} initialStatus={order.status} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 가게 정보 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="w-5 h-5" />
                가게 정보
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">가게명</p>
                <p className="font-medium">
                  {order.store?.name || "정보 없음"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">주소</p>
                <p className="font-medium">
                  {order.store?.address || "정보 없음"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">전화번호</p>
                <p className="font-medium">
                  {order.store?.phone || "정보 없음"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 배송 정보 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                배송 정보
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">배송 주소</p>
                <p className="font-medium">{order.address}</p>
              </div>
              {order.request && (
                <div>
                  <p className="text-sm text-muted-foreground">요청사항</p>
                  <p className="font-medium">{order.request}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-muted-foreground">주문 시간</p>
                <p className="font-medium">
                  {new Date(order.orderedAt).toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 주문 항목 */}
        <Card>
          <CardHeader>
            <CardTitle>주문 항목</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order.userOrderMenuList?.map((item: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-muted rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        item.storeMenu?.thumbnailUrl || "/placeholder-menu.jpg"
                      }
                      alt={item.storeMenu?.name}
                      className="w-12 h-12 rounded-lg object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder-menu.jpg";
                      }}
                    />
                    <div>
                      <p className="font-medium">{item.storeMenu?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.storeMenu?.amount?.toLocaleString()}원
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">수량: {item.quantity}</p>
                    <p className="text-sm text-muted-foreground">
                      {(
                        (item.storeMenu?.amount || 0) * item.quantity
                      ).toLocaleString()}
                      원
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* 총액 */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>총 결제금액</span>
                  <span className="text-primary">
                    {order.amount?.toLocaleString()}원
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
