import { Button } from "@/components/ui/button";
import { StoreCategory } from "@/types/store.types";

interface CategoryFilterProps {
  selectedCategory?: StoreCategory;
  onCategoryChange: (category?: StoreCategory) => void;
}

const categories = [
  { key: undefined, label: "전체", icon: "🍽️" },
  { key: StoreCategory.CHICKEN, label: "치킨", icon: "🍗" },
  { key: StoreCategory.PIZZA, label: "피자", icon: "🍕" },
  { key: StoreCategory.HAMBURGER, label: "햄버거", icon: "🍔" },
  { key: StoreCategory.KOREAN_FOOD, label: "한식", icon: "🍚" },
  { key: StoreCategory.CHINESE_FOOD, label: "중식", icon: "🥢" },
  { key: StoreCategory.JAPANESE_FOOD, label: "일식", icon: "🍣" },
  { key: StoreCategory.COFFEE_TEA, label: "카페", icon: "☕" },
];

export function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="w-full">
      {/* 모바일: 2열 그리드 (4줄), 데스크톱: flex wrap */}
      <div className="grid grid-cols-2 gap-2 md:flex md:flex-wrap md:justify-center md:gap-3">
        {categories.map((category) => (
          <Button
            key={category.label}
            variant={selectedCategory === category.key ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category.key)}
            className="flex-shrink-0 min-w-fit w-full md:w-auto"
          >
            <span className="mr-2">{category.icon}</span>
            {category.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
