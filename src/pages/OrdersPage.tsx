import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  MapPin,
  Calendar,
  CreditCard,
  User,
  Phone,
  Mail,
  MoreVertical,
  ArrowRight,
  Star,
  MessageSquare,
  ShoppingBag,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoadingSpinner, ErrorMessage } from "@/components/common";
import { orderApi, sseApi, storeApi, menuApi } from "@/services/api";
import {
  resetMockOrders,
  removeInvalidOrders,
  clearInvalidCurrentOrders,
} from "@/services/api/order.api";
import { useSSE } from "@/hooks/useSSE";
import { useAuthStore } from "@/store";
import type { OrderResponse } from "@/types/order.types";

const getStatusIcon = (status: string) => {
  switch (status?.toUpperCase()) {
    case "PENDING":
      return <Clock className="h-4 w-4" />;
    case "CONFIRMED":
    case "PREPARING":
      return <Package className="h-4 w-4" />;
    case "DELIVERING":
      return <Truck className="h-4 w-4" />;
    case "DELIVERED":
      return <CheckCircle className="h-4 w-4" />;
    case "CANCELLED":
      return <XCircle className="h-4 w-4" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status?.toUpperCase()) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "CONFIRMED":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "PREPARING":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "DELIVERING":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "DELIVERED":
      return "bg-green-100 text-green-800 border-green-200";
    case "CANCELLED":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getStatusText = (status: string) => {
  switch (status?.toUpperCase()) {
    case "PENDING":
      return "주문 접수";
    case "CONFIRMED":
      return "주문 확인";
    case "PREPARING":
      return "조리 중";
    case "DELIVERING":
      return "배달 중";
    case "DELIVERED":
      return "배달 완료";
    case "CANCELLED":
      return "주문 취소";
    default:
      return status || "알 수 없음";
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatPrice = (price: number | undefined | null) => {
  if (price == null || isNaN(price)) {
    return "0원";
  }
  return price.toLocaleString() + "원";
};

interface OrderCardProps {
  order: OrderResponse;
  isActive?: boolean;
  onStatusUpdate?: (orderId: number, newStatus: string) => void;
}

const OrderCard = ({
  order,
  isActive = false,
  onStatusUpdate,
}: OrderCardProps) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(order.status);

  // 디버깅: 주문 카드 데이터 확인 (가격과 햄버거 메뉴 표시 문제 해결용)
  console.log("OrderCard rendering with order:", {
    id: order.id,
    amount: order.amount,
    orderedAt: order.orderedAt,
    status: order.status,
    store: order.store?.name,
    amountType: typeof order.amount,
    hasAmount: !!order.amount,
  });

  // 실시간 상태 업데이트
  useEffect(() => {
    const handleOrderStatusUpdate = (data: any) => {
      if (data.orderId === order.id) {
        setCurrentStatus(data.status);
        onStatusUpdate?.(order.id, data.status);
      }
    };

    // SSE 이벤트 리스너 등록
    if (sseApi) {
      sseApi.addEventListener("order-status-update", handleOrderStatusUpdate);
    }

    return () => {
      if (sseApi) {
        sseApi.removeEventListener(
          "order-status-update",
          handleOrderStatusUpdate
        );
      }
    };
  }, [order.id, onStatusUpdate]);

  const handleViewDetails = () => {
    navigate(`/orders/${order.id}`);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`transition-all duration-200 ${
        isActive ? "ring-2 ring-primary" : ""
      }`}
    >
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="pb-3 flex flex-col space-y-2">
          {/* 첫 번째 행: 상태 배지 + 주문 번호 + 햄버거 메뉴 */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Badge
                className={`flex items-center gap-2 flex-shrink-0 ${getStatusColor(
                  currentStatus
                )}`}
              >
                {getStatusIcon(currentStatus)}
                {getStatusText(currentStatus)}
              </Badge>
              <CardTitle className="text-lg font-semibold truncate">
                주문 #{order.id}
              </CardTitle>
            </div>
            <div className="flex-shrink-0 ml-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  console.log("More menu clicked for order:", order.id);
                  setIsExpanded(!isExpanded);
                }}
                className="h-8 w-8 p-0 min-w-[32px] flex items-center justify-center hover:bg-gray-100"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* 두 번째 행: 날짜 + 가격 */}
          <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
            <div className="flex items-center gap-1 flex-1 min-w-0">
              <Calendar className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{formatDate(order.orderedAt)}</span>
            </div>
            <div className="font-semibold text-gray-900 flex-shrink-0 ml-4 text-right whitespace-nowrap">
              {formatPrice(order.amount || 0)}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* 가게 정보 */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <img
              src={order.store?.thumbnailUrl || "/placeholder-store.jpg"}
              alt={order.store?.name}
              className="w-12 h-12 rounded-md object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder-store.jpg";
              }}
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">
                {order.store?.name || "가게 정보 없음"}
              </p>
              <p className="text-sm text-muted-foreground truncate">
                {order.store?.address || "주소 정보 없음"}
              </p>
            </div>
          </div>

          {/* 주문 메뉴 */}
          <div className="space-y-2">
            {order.userOrderMenuList
              ?.slice(0, isExpanded ? order.userOrderMenuList.length : 2)
              .map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-2 rounded-lg bg-muted/30"
                >
                  <img
                    src={
                      item.storeMenu?.thumbnailUrl || "/placeholder-menu.jpg"
                    }
                    alt={item.storeMenu?.name}
                    className="w-10 h-10 rounded-md object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder-menu.jpg";
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">
                      {item.storeMenu?.name || "메뉴명 없음"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      수량: {item.quantity} ×{" "}
                      {formatPrice(item.storeMenu?.amount || 0)}
                    </p>
                  </div>
                </div>
              ))}

            {(order.userOrderMenuList?.length || 0) > 2 && !isExpanded && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(true)}
                className="w-full"
              >
                +{(order.userOrderMenuList?.length || 0) - 2}개 더 보기
              </Button>
            )}
          </div>

          {/* 배송 정보 */}
          {(currentStatus === "DELIVERING" ||
            currentStatus === "DELIVERED") && (
            <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Truck className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-900">배송 정보</span>
              </div>
              <p className="text-sm text-blue-700">
                배송 주소: {order.address}
              </p>
              {currentStatus === "DELIVERING" && (
                <p className="text-sm text-blue-700 mt-1">
                  예상 배송 시간: 20-30분
                </p>
              )}
            </div>
          )}

          {/* 확장된 세부 정보 */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 pt-4 border-t"
              >
                {/* 배송 주소 */}
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    배송 주소
                  </h4>
                  <p className="text-sm pl-6">{order.address}</p>
                </div>

                {/* 요청사항 */}
                {order.request && (
                  <div className="space-y-2">
                    <h4 className="font-medium">요청사항</h4>
                    <p className="text-sm pl-6 text-muted-foreground">
                      {order.request}
                    </p>
                  </div>
                )}

                {/* 액션 버튼 */}
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    onClick={handleViewDetails}
                    className="flex items-center gap-1"
                  >
                    상세 보기
                    <ArrowRight className="h-3 w-3" />
                  </Button>

                  {currentStatus === "DELIVERED" && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Star className="h-3 w-3" />
                        리뷰 작성
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <MessageSquare className="h-3 w-3" />
                        재주문
                      </Button>
                    </>
                  )}

                  {(currentStatus === "DELIVERING" ||
                    currentStatus === "PREPARING") && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <Truck className="h-3 w-3" />
                      실시간 추적
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function OrdersPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);
  const [orders, setOrders] = useState<OrderResponse[]>([]);

  // 컴포넌트 마운트 시 초기화
  useEffect(() => {
    console.log("OrdersPage mounted");
    // UI 상태만 초기화 (정리 로직은 API 레벨에서 자동 처리됨)
    setOrders([]);
  }, []);

  // SSE 연결
  const { isConnected } = useSSE({
    userId: user?.id,
    autoConnect: true,
    autoReconnect: true,
  });

  // 주문 내역 조회
  const {
    data: orderHistory,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["orders", "history"],
    queryFn: () => orderApi.getOrderHistory(),
    enabled: !!user,
    refetchInterval: 30000, // 30초마다 새로고침
  });

  // 현재 진행중인 주문 조회
  const { data: currentOrders } = useQuery({
    queryKey: ["orders", "current"],
    queryFn: () => orderApi.getCurrentOrders(),
    enabled: !!user,
    refetchInterval: 10000, // 10초마다 새로고침
  });

  useEffect(() => {
    const convertOrdersWithDetails = async () => {
      if (orderHistory) {
        console.log("Converting order history:", orderHistory);

        // 유효한 주문들만 필터링하고 변환
        const validOrderPromises = orderHistory
          .filter((order) => {
            // 기본 검증
            const isValid =
              order.id &&
              order.storeId &&
              order.storeName &&
              order.orderItems &&
              order.orderItems.length > 0 &&
              order.totalAmount &&
              order.orderDate;

            if (!isValid) {
              console.warn(`Invalid order filtered out:`, order);
            }
            return isValid;
          })
          .map(async (order) => {
            try {
              // 가게 정보 조회
              let storeInfo = null;
              try {
                storeInfo = await storeApi.getStoreDetail(order.storeId);
                console.log(`Store info for ${order.storeId}:`, storeInfo);
              } catch (error) {
                console.warn(`Failed to fetch store ${order.storeId}:`, error);
              }

              // 메뉴 정보들 조회
              const enhancedMenuList = await Promise.all(
                (order.orderItems || []).map(async (item) => {
                  let menuInfo = null;
                  try {
                    const storeMenus = await menuApi.getStoreMenus(
                      order.storeId
                    );
                    menuInfo = storeMenus.find(
                      (menu) => menu.id === item.menuId || menu.id === item.id
                    );
                    console.log(`Menu info for ${item.menuId}:`, menuInfo);
                  } catch (error) {
                    console.warn(`Failed to fetch menu ${item.menuId}:`, error);
                  }

                  return {
                    quantity: item.quantity || 1,
                    storeMenu: {
                      id: item.menuId || item.id,
                      name: item.menuName || menuInfo?.name || "메뉴명 없음",
                      amount: item.price || menuInfo?.amount || 0,
                      thumbnailUrl:
                        menuInfo?.thumbnailUrl ||
                        menuInfo?.imageUrl ||
                        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop&auto=format",
                    },
                  };
                })
              );

              const convertedOrder = {
                id: order.id,
                status: order.status,
                amount: Number(order.totalAmount) || 0, // 숫자로 변환하여 확실히 처리
                orderedAt: order.orderDate || new Date().toISOString(), // 기본값 제공
                address: order.deliveryAddress || "배송 주소 정보 없음",
                request: order.orderItems?.[0]?.options?.find(
                  (opt) => opt.name === "request"
                )?.value,
                store: {
                  id: order.storeId,
                  name: order.storeName || storeInfo?.name || "가게 정보 없음",
                  address:
                    storeInfo?.address ||
                    order.deliveryAddress ||
                    "주소 정보 없음",
                  thumbnailUrl:
                    storeInfo?.thumbnailUrl ||
                    storeInfo?.imageUrl ||
                    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop&auto=format",
                },
                userOrderMenuList: enhancedMenuList,
              };

              console.log(
                `Successfully converted order ${order.id}:`,
                convertedOrder
              );
              return convertedOrder;
            } catch (error) {
              console.error(`Failed to convert order ${order.id}:`, error);
              return null; // 에러가 있는 주문은 null 반환
            }
          });

        // Promise.all로 모든 변환 완료 후 null 제거
        const convertedResults = await Promise.all(validOrderPromises);
        const convertedOrders = convertedResults.filter(
          (order): order is OrderResponse => order !== null
        );

        console.log(
          `Successfully converted ${convertedOrders.length} orders out of ${orderHistory.length} total`
        );
        setOrders(convertedOrders);
      }
    };

    convertOrdersWithDetails();
  }, [orderHistory]);

  const handleStatusUpdate = (orderId: number, newStatus: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">로그인이 필요합니다</h1>
        <p className="text-muted-foreground mb-6">
          주문 내역을 보려면 로그인해주세요.
        </p>
        <Button onClick={() => navigate("/auth/login")}>로그인하기</Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="space-y-4">
          <LoadingSpinner size="lg" className="mx-auto" />
          <p className="text-center text-muted-foreground">
            주문 내역을 불러오는 중...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <ErrorMessage
          type="server"
          onRetry={() => refetch()}
          onGoHome={() => navigate("/")}
        />
      </div>
    );
  }

  const activeOrders = [
    ...(currentOrders || []),
    ...orders.filter((order) =>
      ["PENDING", "CONFIRMED", "PREPARING", "DELIVERING"].includes(
        order.status?.toUpperCase()
      )
    ),
  ];

  const pastOrders = orders.filter((order) =>
    ["DELIVERED", "CANCELLED"].includes(order.status?.toUpperCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">주문 내역</h1>
            <p className="text-muted-foreground">
              주문 상태를 확인하고 배송을 추적하세요
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="smooth-hover"
              onClick={() => {
                console.log("Manual refresh triggered");
                // UI 상태만 초기화
                setOrders([]);
                // React Query 캐시 갱신
                refetch();
                console.log("Refresh completed");
              }}
            >
              🔄 새로고침
            </Button>
            <Badge variant={isConnected ? "default" : "secondary"}>
              {isConnected ? "실시간 연결" : "연결 끊김"}
            </Badge>
          </div>
        </div>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">
            진행중 주문 ({activeOrders.length})
          </TabsTrigger>
          <TabsTrigger value="past">
            과거 주문 ({pastOrders.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeOrders.length > 0 ? (
            <AnimatePresence>
              {activeOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  isActive={selectedOrder === order.id}
                  onStatusUpdate={handleStatusUpdate}
                />
              ))}
            </AnimatePresence>
          ) : (
            <Card className="p-8 text-center">
              <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">
                진행중인 주문이 없습니다
              </h3>
              <p className="text-muted-foreground mb-4">
                새로운 주문을 시작해보세요!
              </p>
              <Button onClick={() => navigate("/")}>
                <ShoppingBag className="w-4 h-4 mr-2" />
                쇼핑 계속하기
              </Button>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastOrders.length > 0 ? (
            <AnimatePresence>
              {pastOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  isActive={selectedOrder === order.id}
                  onStatusUpdate={handleStatusUpdate}
                />
              ))}
            </AnimatePresence>
          ) : (
            <Card className="p-8 text-center">
              <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">과거 주문이 없습니다</h3>
              <p className="text-muted-foreground">
                완료된 주문 내역이 여기에 표시됩니다.
              </p>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
