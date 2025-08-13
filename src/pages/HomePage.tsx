import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { HeroSection } from "@/components/common/HeroSection";
import { StoreList } from "@/components/store/StoreList";
import { CategoryFilter } from "@/components/store/CategoryFilter";
import { storeApi } from "@/services/api";
import { StoreCategory } from "@/types/store.types";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<
    StoreCategory | undefined
  >();

  const {
    data: stores = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["stores", selectedCategory],
    queryFn: () => storeApi.search(selectedCategory),
  });

  return (
    <div className="space-y-12">
      {/* 히어로 섹션 */}
      <HeroSection />

      {/* 가게 섹션 */}
      <div className="container-padding space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">
            인기 맛집을 둘러보세요
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            지금 가장 인기있는 음식점들을 카테고리별로 확인하고 주문해보세요
          </p>
        </div>

        {/* 카테고리 필터 */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* 가게 목록 */}
        <StoreList stores={stores} isLoading={isLoading} error={error} />
      </div>
    </div>
  );
}
