import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  MapPin,
  CreditCard,
  Wallet,
  Smartphone,
  Clock,
  Minus,
  Plus,
  CheckCircle,
  ArrowLeft,
  Truck,
} from "lucide-react";
import { useCartStore } from "@/store";
import { orderApi, storeApi } from "@/services/api";
import { motion } from "framer-motion";
import { ActionButton } from "@/components/common";

interface DeliveryAddress {
  street: string;
  apartment: string;
  city: string;
  zipCode: string;
  instructions: string;
}

interface PaymentMethod {
  id: string;
  type: "card" | "wallet" | "cash";
  label: string;
  icon: React.ReactNode;
  details?: string;
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    getTotalAmount,
    getItemCount,
    storeId,
  } = useCartStore();

  const [currentStep, setCurrentStep] = useState<
    "cart" | "address" | "payment" | "confirmation"
  >("cart");
  const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddress>({
    street: "",
    apartment: "",
    city: "",
    zipCode: "",
    instructions: "",
  });
  const [selectedPayment, setSelectedPayment] = useState<string>("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [storeInfo, setStoreInfo] = useState<any>(null);

  useEffect(() => {
    const fetchStoreInfo = async () => {
      if (storeId) {
        try {
          const store = await storeApi.getStoreDetail(storeId);
          setStoreInfo({
            name: store.name || store.storeName,
            thumbnailUrl:
              store.imageUrl || store.thumbnailUrl || "/placeholder-store.jpg",
          });
        } catch (error) {
          console.error("Failed to fetch store info:", error);
          setStoreInfo({
            name: `가게 (ID: ${storeId})`,
            thumbnailUrl: "/placeholder-store.jpg",
          });
        }
      }
    };
    fetchStoreInfo();
  }, [storeId]);

  const paymentMethods: PaymentMethod[] = [
    {
      id: "card",
      type: "card",
      label: "신용/체크카드",
      icon: <CreditCard className="w-5 h-5" />,
      details: "카드 결제",
    },
    {
      id: "wallet",
      type: "wallet",
      label: "간편결제",
      icon: <Wallet className="w-5 h-5" />,
      details: "카카오페이, 네이버페이",
    },
    {
      id: "cash",
      type: "cash",
      label: "현금결제",
      icon: <Smartphone className="w-5 h-5" />,
      details: "배달시 현금결제",
    },
  ];

  const subtotal = getTotalAmount();
  const deliveryFee = 3000;
  const total = subtotal + deliveryFee;

  const handleUpdateQuantity = (id: number, change: number) => {
    const currentItem = items.find((item) => item.id === id);
    if (currentItem) {
      const newQuantity = currentItem.quantity + change;
      if (newQuantity <= 0) {
        removeItem(id);
      } else {
        updateQuantity(id, newQuantity);
      }
    }
  };

  const handleAddressChange = (field: keyof DeliveryAddress, value: string) => {
    setDeliveryAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handlePlaceOrder = async () => {
    if (!storeId) return;

    setIsProcessing(true);

    try {
      const orderData = {
        storeId: storeId,
        userOrderMenuRequestList: items.map((item) => ({
          storeMenuId: item.id,
          quantity: item.quantity,
        })),
        deliveryAddress: `${deliveryAddress.street} ${deliveryAddress.apartment}`,
        paymentMethod: selectedPayment,
        instructions: deliveryAddress.instructions,
      };

      const response = await orderApi.createOrder(orderData);
      setOrderId(response.id);
      clearCart();

      // 주문 내역 쿼리 캐시 무효화하여 새 주문이 즉시 표시되도록 함
      queryClient.invalidateQueries({ queryKey: ["orders", "history"] });
      queryClient.invalidateQueries({ queryKey: ["orders", "current"] });

      setCurrentStep("confirmation");
    } catch (error) {
      console.error("주문 실패:", error);
      alert("주문에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsProcessing(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-4">
        {[
          { key: "cart", label: "장바구니", number: 1 },
          { key: "address", label: "배송지", number: 2 },
          { key: "payment", label: "결제", number: 3 },
          { key: "confirmation", label: "완료", number: 4 },
        ].map((step, index) => (
          <React.Fragment key={step.key}>
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep === step.key
                    ? "bg-primary text-primary-foreground"
                    : index <
                      ["cart", "address", "payment", "confirmation"].indexOf(
                        currentStep
                      )
                    ? "bg-green-500 text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {index <
                ["cart", "address", "payment", "confirmation"].indexOf(
                  currentStep
                ) ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  step.number
                )}
              </div>
              <span className="ml-2 text-sm font-medium">{step.label}</span>
            </div>
            {index < 3 && (
              <div
                className={`w-8 h-0.5 ${
                  index <
                  ["cart", "address", "payment", "confirmation"].indexOf(
                    currentStep
                  )
                    ? "bg-green-500"
                    : "bg-muted"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  const renderCartStep = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>주문 상품</span>
              <Badge variant="secondary">{items.length}개</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  장바구니가 비어있습니다.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => navigate("/")}
                >
                  쇼핑 계속하기
                </Button>
              </div>
            ) : (
              items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  className="flex items-center gap-4 p-4 border rounded-lg"
                >
                  <img
                    src={item.thumbnailUrl || "/placeholder-menu.jpg"}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder-menu.jpg";
                    }}
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="font-medium text-primary">
                      {item.amount.toLocaleString()}원
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpdateQuantity(item.id, -1)}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpdateQuantity(item.id, 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>주문 요약</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>상품금액</span>
              <span>{subtotal.toLocaleString()}원</span>
            </div>
            <div className="flex justify-between">
              <span>배달료</span>
              <span>{deliveryFee.toLocaleString()}원</span>
            </div>
            <Separator />
            <div className="flex justify-between font-medium text-lg">
              <span>총 결제금액</span>
              <span className="text-primary">{total.toLocaleString()}원</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>예상 배달시간: 20-30분</span>
            </div>
            <Button
              className="w-full"
              onClick={() => setCurrentStep("address")}
              disabled={items.length === 0}
            >
              배송지 입력하기
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderAddressStep = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              배송 주소
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="street">도로명 주소</Label>
                <Input
                  id="street"
                  placeholder="서울시 강남구 테헤란로 123"
                  value={deliveryAddress.street}
                  onChange={(e) =>
                    handleAddressChange("street", e.target.value)
                  }
                />
              </div>
              <div>
                <Label htmlFor="apartment">상세주소</Label>
                <Input
                  id="apartment"
                  placeholder="101동 1001호"
                  value={deliveryAddress.apartment}
                  onChange={(e) =>
                    handleAddressChange("apartment", e.target.value)
                  }
                />
              </div>
              <div>
                <Label htmlFor="zipCode">우편번호</Label>
                <Input
                  id="zipCode"
                  placeholder="12345"
                  value={deliveryAddress.zipCode}
                  onChange={(e) =>
                    handleAddressChange("zipCode", e.target.value)
                  }
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="instructions">배송 요청사항 (선택)</Label>
                <Textarea
                  id="instructions"
                  placeholder="초인종 눌러주세요, 문 앞에 두고 가세요 등"
                  value={deliveryAddress.instructions}
                  onChange={(e) =>
                    handleAddressChange("instructions", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setCurrentStep("cart")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                이전
              </Button>
              <Button
                className="flex-1"
                onClick={() => setCurrentStep("payment")}
                disabled={!deliveryAddress.street || !deliveryAddress.zipCode}
              >
                결제 방법 선택
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>주문 요약</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between font-medium text-lg">
              <span>총 결제금액</span>
              <span className="text-primary">{total.toLocaleString()}원</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Truck className="w-4 w-4" />
              <span>3만원 이상 배달료 무료</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderPaymentStep = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>결제 방법</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedPayment}
              onValueChange={setSelectedPayment}
            >
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className="flex items-center space-x-2 p-4 border rounded-lg"
                  >
                    <RadioGroupItem value={method.id} id={method.id} />
                    <Label
                      htmlFor={method.id}
                      className="flex items-center gap-3 flex-1 cursor-pointer"
                    >
                      {method.icon}
                      <div>
                        <div className="font-medium">{method.label}</div>
                        {method.details && (
                          <div className="text-sm text-muted-foreground">
                            {method.details}
                          </div>
                        )}
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>

            <div className="flex gap-4 mt-6">
              <Button
                variant="outline"
                onClick={() => setCurrentStep("address")}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                이전
              </Button>
              <ActionButton
                className="flex-1"
                onClick={handlePlaceOrder}
                isLoading={isProcessing}
                loadingText="주문 처리 중..."
              >
                {total.toLocaleString()}원 결제하기
              </ActionButton>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>주문 요약</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.quantity}x {item.name}
                  </span>
                  <span>
                    {(item.amount * item.quantity).toLocaleString()}원
                  </span>
                </div>
              ))}
            </div>
            <Separator />
            <div className="flex justify-between font-medium text-lg">
              <span>총 결제금액</span>
              <span className="text-primary">{total.toLocaleString()}원</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderConfirmationStep = () => (
    <div className="max-w-2xl mx-auto text-center">
      <Card>
        <CardContent className="pt-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <CheckCircle className="w-8 h-8 text-green-600" />
          </motion.div>
          <h2 className="text-2xl font-bold mb-2">주문이 완료되었습니다!</h2>
          <p className="text-muted-foreground mb-6">
            주문이 성공적으로 접수되었습니다. 곧 조리가 시작됩니다.
          </p>

          <div className="bg-muted p-4 rounded-lg mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">주문번호 #{orderId}</span>
              <Badge>조리중</Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>예상 배달시간: 20-30분</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-left">
              <h3 className="font-medium mb-2">배송 주소</h3>
              <p className="text-sm text-muted-foreground">
                {deliveryAddress.street} {deliveryAddress.apartment}
                <br />
                {deliveryAddress.zipCode}
              </p>
            </div>

            <div className="text-left">
              <h3 className="font-medium mb-2">결제 방법</h3>
              <p className="text-sm text-muted-foreground">
                {paymentMethods.find((m) => m.id === selectedPayment)?.label}
              </p>
            </div>

            <div className="text-left">
              <h3 className="font-medium mb-2">결제 금액</h3>
              <p className="text-lg font-bold text-primary">
                {total.toLocaleString()}원
              </p>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => navigate("/orders")}
            >
              주문 내역 보기
            </Button>
            <Button className="flex-1" onClick={() => navigate("/")}>
              홈으로 가기
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  if (items.length === 0 && currentStep !== "confirmation") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">장바구니가 비어있습니다</h1>
          <p className="text-muted-foreground mb-4">
            맛있는 음식을 담아보세요!
          </p>
          <Button onClick={() => navigate("/")}>쇼핑 계속하기</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-2">주문하기</h1>
          <p className="text-muted-foreground text-center">
            몇 단계만 거치면 주문이 완료됩니다
          </p>
        </div>

        {renderStepIndicator()}

        {currentStep === "cart" && renderCartStep()}
        {currentStep === "address" && renderAddressStep()}
        {currentStep === "payment" && renderPaymentStep()}
        {currentStep === "confirmation" && renderConfirmationStep()}
      </div>
    </div>
  );
}
