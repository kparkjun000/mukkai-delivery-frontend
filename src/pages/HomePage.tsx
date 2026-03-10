import { useState, useRef, useEffect } from "react";
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
  const browseSectionRef = useRef<HTMLDivElement>(null);

  // 모바일: 로그인 직후 홈 진입 시 음식 둘러보기(인기 맛집) 섹션이 화면 중앙에 오도록 스크롤
  useEffect(() => {
    const shouldScroll = sessionStorage.getItem('scrollToBrowse') === 'true';
    sessionStorage.removeItem('scrollToBrowse');
    const isMobile = window.innerWidth < 768;
    if (shouldScroll && isMobile && browseSectionRef.current) {
      const timer = setTimeout(() => {
        browseSectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, []);

  const {
    data: stores = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["stores", selectedCategory],
    queryFn: () => storeApi.search(selectedCategory),
  });

  return (
    <div className="space-y-0">
      {/* 히어로 섹션 */}
      <HeroSection />

      {/* 가게 섹션 - 모바일에서 로그인 직후 포커스 */}
      <div
        ref={browseSectionRef}
        className="px-4 sm:px-6 lg:px-8 space-y-8 pt-12"
      >
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
