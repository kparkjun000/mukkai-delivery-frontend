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
      <div className="flex gap-2 justify-center overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => (
          <Button
            key={category.label}
            variant={selectedCategory === category.key ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category.key)}
            className="flex-shrink-0 min-w-fit"
          >
            <span className="mr-2">{category.icon}</span>
            {category.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
