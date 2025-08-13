import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Truck } from "lucide-react";
import { StoreResponse } from "@/types/store.types";
import { cn } from "@/lib/utils";

interface StoreCardProps {
  store: StoreResponse;
  className?: string;
}

const categoryLabels = {
  CHICKEN: "치킨",
  PIZZA: "피자",
  HAMBURGER: "햄버거",
  KOREAN: "한식",
  KOREAN_FOOD: "한식",
  CHINESE: "중식",
  CHINESE_FOOD: "중식",
  JAPANESE: "일식",
  JAPANESE_FOOD: "일식",
  COFFEE: "카페",
  COFFEE_TEA: "카페",
};

// 기본 이미지 URL
const DEFAULT_STORE_IMAGE =
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop";

export function StoreCard({ store, className }: StoreCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    if (!currentTarget) return;
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  let maskImage = useMotionTemplate`radial-gradient(240px at ${mouseX}px ${mouseY}px, white, transparent)`;
  let style = { maskImage, WebkitMaskImage: maskImage };

  const isOpen = store.status === "REGISTERED" || store.isOpen;

  const handleImageError = () => {
    setImageError(true);
  };

  const getImageSrc = () => {
    if (imageError) return DEFAULT_STORE_IMAGE;
    return (
      store.imageUrl ||
      store.thumbnailUrl ||
      store.thumbnail_url ||
      DEFAULT_STORE_IMAGE
    );
  };

  return (
    <Link to={`/stores/${store.id}`}>
      <motion.div
        ref={cardRef}
        className={cn(
          "group relative w-full bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg cursor-pointer",
          !isOpen && "opacity-60",
          className
        )}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Spotlight Effect */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 transition duration-300 group-hover:opacity-100 opacity-0"
          style={style}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 opacity-60"
            style={style}
          />
        </motion.div>

        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          <motion.img
            src={getImageSrc()}
            alt={store.name || store.storeName}
            onError={handleImageError}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

          {/* Status Overlay */}
          {!isOpen && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-semibold">준비중</span>
            </div>
          )}

          {/* Category Badge */}
          <motion.div
            className="absolute top-3 left-3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
              {categoryLabels[store.category] || store.category}
            </Badge>
          </motion.div>

          {/* Rating Badge */}
          <motion.div
            className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium text-gray-900">
              {store.rating?.toFixed(1) || "0.0"}
            </span>
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative z-10 p-4 space-y-3">
          {/* Store Name & Address */}
          <div className="space-y-1">
            <motion.h3
              className="font-semibold text-lg text-gray-900 group-hover:text-primary transition-colors duration-300 line-clamp-1"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              {store.name || store.storeName}
            </motion.h3>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {store.address}
            </p>
          </div>

          {/* Rating & Delivery Time */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-gray-900">
                {(store.rating || store.star)?.toFixed(1) || "0.0"}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {store.deliveryTime || "30-40분"}
              </span>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-200">
            <motion.div
              className="flex items-center gap-1"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-xs text-muted-foreground">
                {(
                  store.minOrderAmount ||
                  store.minimumAmount ||
                  store.minimum_amount
                )?.toLocaleString() || "0"}
                원 최소
              </span>
            </motion.div>

            <motion.div
              className="flex items-center gap-1"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Truck className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {store.minOrderAmount === 0
                  ? "무료배송"
                  : `최소 ${store.minOrderAmount?.toLocaleString() || "0"}원`}
              </span>
            </motion.div>
          </div>
        </div>

        {/* Hover Border Effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/20 transition-colors duration-300 pointer-events-none"
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </Link>
  );
}
