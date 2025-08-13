import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Store,
  Users,
  ShoppingBag,
  TrendingUp,
  Bell,
  Settings,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useStoreUserStore } from "@/store/storeUserStore";
import { useSSE } from "@/hooks/useSSE";
import { rabbitmqApi } from "@/services/api";

interface DashboardStats {
  totalOrders: number;
  todayOrders: number;
  revenue: number;
  rating: number;
}

export default function OwnerDashboardPage() {
  const { storeUser } = useStoreUserStore();
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    todayOrders: 0,
    revenue: 0,
    rating: 0,
  });
  const [newOrders, setNewOrders] = useState<any[]>([]);

  // RabbitMQ WebSocket 연결 상태
  const [isRabbitMQConnected, setIsRabbitMQConnected] = useState(false);

  // RabbitMQ WebSocket 연결 및 실시간 주문 수신
  useEffect(() => {
    if (storeUser?.id) {
      // RabbitMQ WebSocket 연결
      rabbitmqApi
        .connect(storeUser.id)
        .then(() => {
          console.log("RabbitMQ WebSocket 연결 성공");
          setIsRabbitMQConnected(true);
        })
        .catch((error) => {
          console.error("RabbitMQ WebSocket 연결 실패:", error);
          setIsRabbitMQConnected(false);
        });

      // 새 주문 알림 처리
      const handleNewOrder = (message: any) => {
        console.log("새 주문 수신:", message);
        setNewOrders((prev) => [message.data, ...prev.slice(0, 9)]); // 최대 10개 유지

        // 통계 업데이트
        setStats((prev) => ({
          ...prev,
          totalOrders: prev.totalOrders + 1,
          todayOrders: prev.todayOrders + 1,
        }));

        // 브라우저 알림
        if (Notification.permission === "granted") {
          new Notification("🔔 새 주문이 들어왔습니다!", {
            body: `주문번호: ${message.data?.id || message.orderId}`,
            icon: "/favicon.ico",
          });
        }

        // 소리 알림 (선택사항)
        try {
          const audio = new Audio("/notification.mp3");
          audio.play().catch((e) => console.log("알림음 재생 실패:", e));
        } catch (e) {
          console.log("알림음 파일 없음");
        }
      };

      // 주문 상태 업데이트 처리
      const handleOrderStatusUpdate = (message: any) => {
        console.log("주문 상태 업데이트:", message);
        // 기존 주문 목록에서 해당 주문의 상태 업데이트
        setNewOrders((prev) =>
          prev.map((order) =>
            order.id === message.orderId
              ? { ...order, status: message.data?.status }
              : order
          )
        );
      };

      // RabbitMQ 이벤트 리스너 등록
      rabbitmqApi.addEventListener("NEW_ORDER", handleNewOrder);
      rabbitmqApi.addEventListener(
        "ORDER_STATUS_UPDATE",
        handleOrderStatusUpdate
      );

      return () => {
        // 이벤트 리스너 제거
        rabbitmqApi.removeEventListener("NEW_ORDER", handleNewOrder);
        rabbitmqApi.removeEventListener(
          "ORDER_STATUS_UPDATE",
          handleOrderStatusUpdate
        );

        // WebSocket 연결 종료
        rabbitmqApi.disconnect();
        setIsRabbitMQConnected(false);
      };
    }
  }, [storeUser?.id]);

  // 브라우저 알림 권한 요청
  useEffect(() => {
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  const statCards = [
    {
      title: "총 주문 수",
      value: stats.totalOrders.toLocaleString(),
      icon: ShoppingBag,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "오늘 주문",
      value: stats.todayOrders.toLocaleString(),
      icon: Users,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      title: "매출",
      value: `${stats.revenue.toLocaleString()}원`,
      icon: TrendingUp,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      title: "평점",
      value: stats.rating.toFixed(1),
      icon: Store,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
    },
  ];

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">점주 대시보드</h1>
            <p className="text-muted-foreground">{storeUser?.storeName} 관리</p>
          </div>

          <div className="flex items-center gap-4">
            <Badge variant={isRabbitMQConnected ? "default" : "secondary"}>
              {isRabbitMQConnected ? "실시간 연결" : "연결 끊김"}
            </Badge>
            <Button variant="outline" size="icon">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <div
                      className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}
                    >
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 실시간 주문 알림 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                실시간 주문 알림
              </CardTitle>
            </CardHeader>
            <CardContent>
              {newOrders.length > 0 ? (
                <div className="space-y-3">
                  {newOrders.map((order, index) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-muted rounded-lg"
                    >
                      <div>
                        <p className="font-medium">주문 #{order.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.totalAmount?.toLocaleString()}원
                        </p>
                      </div>
                      <Badge>신규</Badge>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    새로운 주문이 없습니다
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 가게 정보 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="w-5 h-5" />
                가게 정보
              </CardTitle>
            </CardHeader>
            <CardContent>
              {storeUser ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">가게명</p>
                    <p className="font-medium">{storeUser.storeName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">카테고리</p>
                    <p className="font-medium">{storeUser.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">주소</p>
                    <p className="font-medium">{storeUser.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">전화번호</p>
                    <p className="font-medium">{storeUser.phone}</p>
                  </div>
                  {storeUser.description && (
                    <div>
                      <p className="text-sm text-muted-foreground">소개</p>
                      <p className="font-medium">{storeUser.description}</p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  가게 정보를 불러오는 중...
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* 빠른 액션 */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>빠른 액션</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <ShoppingBag className="w-6 h-6" />
                주문 관리
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <Store className="w-6 h-6" />
                메뉴 관리
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <TrendingUp className="w-6 h-6" />
                매출 분석
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <Settings className="w-6 h-6" />
                설정
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
