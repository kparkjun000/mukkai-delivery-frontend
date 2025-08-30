import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";
import { cn } from "@/lib/utils";
import {
  Star,
  Clock,
  MapPin,
  Phone,
  Heart,
  Plus,
  Minus,
  ShoppingCart,
  Search,
  Filter,
  ArrowLeft,
  ChefHat,
  Utensils,
  Coffee,
  Pizza,
  Sandwich,
  IceCream,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { storeApi, menuApi } from "@/services/api";
import { useCartStore, useAuthStore } from "@/store";
import { StoreMenuResponse } from "@/types/menu.types";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { MenuItemSkeleton, ErrorMessage } from "@/components/common";

// Expandable Tabs Component
interface Tab {
  title: string;
  icon: React.ComponentType<{ size?: number }>;
}

interface ExpandableTabsProps {
  tabs: Tab[];
  className?: string;
  activeColor?: string;
  onChange?: (index: number | null) => void;
}

const buttonVariants = {
  initial: {
    gap: 0,
    paddingLeft: ".5rem",
    paddingRight: ".5rem",
  },
  animate: (isSelected: boolean) => ({
    gap: isSelected ? ".5rem" : 0,
    paddingLeft: isSelected ? "1rem" : ".5rem",
    paddingRight: isSelected ? "1rem" : ".5rem",
  }),
};

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
};

const transition = { delay: 0.1, type: "spring", bounce: 0, duration: 0.6 };

function ExpandableTabs({
  tabs,
  className,
  activeColor = "text-primary",
  onChange,
}: ExpandableTabsProps) {
  const [selected, setSelected] = React.useState<number | null>(null);
  const outsideClickRef = React.useRef(null);

  useOnClickOutside(outsideClickRef, () => {
    setSelected(null);
    onChange?.(null);
  });

  const handleSelect = (index: number) => {
    setSelected(index);
    onChange?.(index);
  };

  return (
    <div
      ref={outsideClickRef}
      className={cn(
        "flex flex-wrap items-center gap-2 rounded-2xl border bg-white p-1 shadow-sm",
        className
      )}
    >
      {tabs.map((tab, index) => {
        const Icon = tab.icon;
        return (
          <motion.button
            key={tab.title}
            variants={buttonVariants}
            initial={false}
            animate="animate"
            custom={selected === index}
            onClick={() => handleSelect(index)}
            transition={transition}
            className={cn(
              "relative flex items-center rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-300",
              selected === index
                ? cn("bg-muted", activeColor)
                : "text-muted-foreground hover:bg-muted hover:text-gray-900"
            )}
          >
            <Icon size={20} />
            <AnimatePresence initial={false}>
              {selected === index && (
                <motion.span
                  variants={spanVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={transition}
                  className="overflow-hidden"
                >
                  {tab.title}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </div>
  );
}

// Bookmark Icon Button Component
function BookmarkIconButton({
  isFavorited,
  onToggle,
}: {
  isFavorited: boolean;
  onToggle: () => void;
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onToggle}
      aria-pressed={isFavorited}
    >
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: isFavorited ? 1.1 : 1 }}
        whileTap={{ scale: 0.85 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="relative flex items-center justify-center"
      >
        <Heart
          className={cn(
            "h-5 w-5 transition-all duration-300",
            isFavorited ? "text-red-500 fill-red-500" : "text-muted-foreground"
          )}
        />
      </motion.div>
    </Button>
  );
}

export default function StoreDetailPage() {
  const { storeId } = useParams<{ storeId: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isFavorited, setIsFavorited] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { isAuthenticated } = useAuthStore();
  const {
    addItem,
    updateQuantity,
    removeItem,
    getCartItem,
    getTotalAmount,
    getItemCount,
  } = useCartStore();

  // Fetch store data
  const { data: store, isLoading: isStoreLoading } = useQuery({
    queryKey: ["store", storeId],
    queryFn: () => storeApi.getStoreDetail(parseInt(storeId!)),
    enabled: !!storeId,
  });

  // Fetch menu data
  const { data: menuItems = [], isLoading: isMenuLoading } = useQuery({
    queryKey: ["menu", storeId],
    queryFn: () => menuApi.getStoreMenus(parseInt(storeId!)),
    enabled: !!storeId,
  });

  // Categories based on available menu items
  const availableCategories = React.useMemo(() => {
    const categories = ["전체"];
    const categorySet = new Set(menuItems.map((item) => "메뉴"));
    return ["전체", ...Array.from(categorySet)];
  }, [menuItems]);

  const categoryTabs = [
    { title: "전체", icon: Utensils },
    { title: "메뉴", icon: ChefHat },
  ];

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleAddToCart = (item: StoreMenuResponse) => {
    addItem(item, 1);
  };

  const handleUpdateQuantity = (item: StoreMenuResponse, change: number) => {
    const cartItem = getCartItem(item.id);
    if (cartItem) {
      const newQuantity = cartItem.quantity + change;
      if (newQuantity <= 0) {
        removeItem(item.id);
      } else {
        updateQuantity(item.id, newQuantity);
      }
    }
  };

  const getItemQuantity = (itemId: number) => {
    const cartItem = getCartItem(itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  if (!store) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">가게를 찾을 수 없습니다</h1>
          <p className="text-muted-foreground">
            요청하신 가게가 존재하지 않습니다.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <BookmarkIconButton
                isFavorited={isFavorited}
                onToggle={() => setIsFavorited(!isFavorited)}
              />
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-5 w-5" />
                {isAuthenticated && getItemCount() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
                    {getItemCount()}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Restaurant Hero */}
      <div className="relative">
        <div className="h-64 bg-gradient-to-r from-primary/20 to-primary/10 overflow-hidden">
          <img
            src={store.thumbnailUrl || "/placeholder-store.jpg"}
            alt={store.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder-store.jpg";
            }}
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="container mx-auto px-4 -mt-8 relative z-10">
          <Card className="bg-white/95 backdrop-blur">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold mb-2">{store.name}</h1>
                  <p className="text-muted-foreground mb-3">{store.address}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="secondary">{store.category}</Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{store.star.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>20-30분</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{store.phoneNumber}</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-muted rounded-lg">
                <div className="flex justify-between text-sm">
                  <span>
                    배달료:{" "}
                    {store.minimumDeliveryAmount === 0
                      ? "무료"
                      : `${store.minimumDeliveryAmount.toLocaleString()}원`}
                  </span>
                  <span>
                    최소주문: {store.minimumAmount.toLocaleString()}원
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="메뉴 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            필터
          </Button>
        </div>

        {/* Menu Items */}
        <div className="grid gap-4">
          {isMenuLoading
            ? // Loading skeleton
              Array.from({ length: 6 }).map((_, index) => (
                <MenuItemSkeleton key={index} />
              ))
            : filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="flex">
                        <div className="flex-1 p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-lg">
                              {item.name}
                            </h3>
                            <div className="flex items-center gap-1 text-sm">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span>4.{Math.floor(Math.random() * 9) + 1}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-primary">
                              {item.amount.toLocaleString()}원
                            </span>

                            <div className="flex items-center gap-2">
                              {getItemQuantity(item.id) > 0 ? (
                                <div className="flex items-center gap-2">
                                  <Button
                                    size="icon"
                                    variant="outline"
                                    className="h-8 w-8"
                                    onClick={() =>
                                      handleUpdateQuantity(item, -1)
                                    }
                                  >
                                    <Minus className="h-4 w-4" />
                                  </Button>
                                  <span className="w-8 text-center font-medium">
                                    {getItemQuantity(item.id)}
                                  </span>
                                  <Button
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() =>
                                      handleUpdateQuantity(item, 1)
                                    }
                                  >
                                    <Plus className="h-4 w-4" />
                                  </Button>
                                </div>
                              ) : (
                                <Button onClick={() => handleAddToCart(item)}>
                                  <Plus className="h-4 w-4 mr-2" />
                                  담기
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="w-24 h-24 md:w-32 md:h-32 m-4 rounded-lg overflow-hidden bg-muted">
                          <img
                            src={item.thumbnailUrl || "/placeholder-menu.jpg"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "/placeholder-menu.jpg";
                            }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
        </div>

        {filteredItems.length === 0 && !isMenuLoading && (
          <ErrorMessage
            type="notFound"
            title="검색 결과가 없습니다"
            message="다른 검색어를 입력해보세요"
          />
        )}
      </div>

      {/* Cart Summary */}
      <AnimatePresence>
        {getItemCount() > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t p-4"
          >
            <div className="container mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{getItemCount()}개 상품</p>
                  <p className="text-sm text-muted-foreground">
                    총액: {getTotalAmount().toLocaleString()}원
                  </p>
                </div>
                <Button
                  size="lg"
                  className="px-8"
                  onClick={() => setIsCartOpen(true)}
                >
                  장바구니 보기
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
