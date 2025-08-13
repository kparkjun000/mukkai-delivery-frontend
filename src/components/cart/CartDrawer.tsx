import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingCart, Plus, Minus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store";
import { Link } from "react-router-dom";
import { storeApi } from "@/services/api";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    getTotalAmount,
    getItemCount,
    storeId,
  } = useCartStore();

  const [storeInfo, setStoreInfo] = useState<any>(null);

  useEffect(() => {
    const fetchStoreInfo = async () => {
      if (storeId && isOpen) {
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
  }, [storeId, isOpen]);

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    updateQuantity(id, newQuantity);
  };

  const subtotal = getTotalAmount();
  const deliveryFee = 3000; // 3,000원
  const total = subtotal + deliveryFee;

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.4,
            }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white border-l border-gray-200 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <ShoppingCart className="h-6 w-6 text-gray-900" />
                <h2 className="text-xl font-semibold text-gray-900">
                  장바구니
                </h2>
                {getItemCount() > 0 && (
                  <Badge className="bg-primary text-primary-foreground">
                    {getItemCount()}
                  </Badge>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Store Info */}
            {storeInfo && (
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center gap-3">
                  <img
                    src={storeInfo.thumbnailUrl || "/placeholder-store.jpg"}
                    alt={storeInfo.name}
                    className="w-10 h-10 rounded-lg object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder-store.jpg";
                    }}
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {storeInfo.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      배달 예상시간: 20-30분
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    장바구니가 비어있습니다
                  </h3>
                  <p className="text-muted-foreground">
                    맛있는 음식을 담아보세요!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {items.length}개 상품
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearCart}
                      className="text-destructive hover:text-destructive"
                    >
                      전체 삭제
                    </Button>
                  </div>

                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        transition={{ duration: 0.2 }}
                        className="flex gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                          <img
                            src={
                              item.thumbnailUrl ||
                              "https://via.placeholder.com/64x64/f3f4f6/6b7280?text=Menu"
                            }
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src =
                                "https://via.placeholder.com/64x64/f3f4f6/6b7280?text=Menu";
                            }}
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 truncate">
                            {item.name}
                          </h4>
                          <p className="text-sm font-semibold text-primary mt-1">
                            {item.amount.toLocaleString()}원
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            개당 {item.amount.toLocaleString()}원
                          </p>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            className="h-6 w-6 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>

                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                handleUpdateQuantity(item.id, item.quantity - 1)
                              }
                              className="h-7 w-7"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                handleUpdateQuantity(item.id, item.quantity + 1)
                              }
                              className="h-7 w-7"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer with totals and checkout */}
            {items.length > 0 && (
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="border-t border-gray-200 p-6 bg-white"
              >
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">주문금액</span>
                    <span className="text-gray-900">
                      {subtotal.toLocaleString()}원
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">배달료</span>
                    <span className="text-gray-900">
                      {deliveryFee.toLocaleString()}원
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-200">
                    <span className="text-gray-900">총 결제금액</span>
                    <span className="text-primary">
                      {total.toLocaleString()}원
                    </span>
                  </div>
                </div>

                <Link to="/checkout" onClick={onClose}>
                  <Button
                    className="w-full h-12 text-base font-semibold"
                    size="lg"
                  >
                    주문하기
                  </Button>
                </Link>

                <p className="text-xs text-muted-foreground text-center mt-3">
                  예상 배달시간: 20-30분
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
