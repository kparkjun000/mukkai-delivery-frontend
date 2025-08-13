import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Star, Heart, Clock, MapPin, Utensils, Coffee, Pizza, Sandwich, IceCream } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { menuApi } from "@/services/api/menu.api";
import { MenuItem } from "@/types/menu.types";

export default function MenuExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 카테고리 정의
  const categories = [
    { id: "all", name: "전체", icon: Utensils, color: "bg-blue-500" },
    { id: "pizza", name: "피자", icon: Pizza, color: "bg-red-500" },
    { id: "sandwich", name: "샌드위치", icon: Sandwich, color: "bg-yellow-500" },
    { id: "coffee", name: "커피/음료", icon: Coffee, color: "bg-brown-500" },
    { id: "dessert", name: "디저트", icon: IceCream, color: "bg-pink-500" },
  ];

  useEffect(() => {
    loadMenuItems();
  }, []);

  useEffect(() => {
    filterItems();
  }, [searchQuery, selectedCategory, menuItems]);

  const loadMenuItems = async () => {
    try {
      setIsLoading(true);
      const items = await menuApi.search();
      setMenuItems(items);
    } catch (error) {
      console.error("Failed to load menu items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterItems = () => {
    let filtered = menuItems;

    // 카테고리 필터링
    if (selectedCategory !== "all") {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(selectedCategory) ||
        item.name.includes(selectedCategory)
      );
    }

    // 검색어 필터링
    if (searchQuery.trim()) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredItems(filtered);
  };

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.color : "bg-gray-500";
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString() + "원";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      {/* 헤더 섹션 */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            🍽️ 메뉴 둘러보기
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-orange-100 mb-8"
          >
            맛있는 메뉴들을 발견해보세요!
          </motion.p>

          {/* 검색바 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="메뉴 이름이나 설명을 검색해보세요..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-6 py-4 text-lg border-0 shadow-lg"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* 카테고리 필터 */}
      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap gap-3 justify-center mb-8"
        >
          {categories.map((category, index) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 transition-all duration-300 ${
                selectedCategory === category.id 
                  ? "bg-primary text-white shadow-lg scale-105" 
                  : "hover:scale-105"
              }`}
            >
              <category.icon className="h-5 w-5" />
              {category.name}
            </Button>
          ))}
        </motion.div>

        {/* 결과 통계 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mb-8"
        >
          <p className="text-lg text-gray-600">
            <span className="font-semibold text-primary">{filteredItems.length}</span>개의 메뉴를 발견했습니다!
          </p>
        </motion.div>

        {/* 메뉴 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group"
            >
              <Card className="h-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-0 bg-white">
                {/* 메뉴 이미지 */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.imageUrl || item.thumbnailUrl || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop"}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop";
                    }}
                  />
                  
                  {/* 좋아요 버튼 */}
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-700 rounded-full w-8 h-8 p-0"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>

                  {/* 카테고리 배지 */}
                  <Badge className="absolute top-2 left-2 bg-primary text-white border-0">
                    {item.category || "인기"}
                  </Badge>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-bold text-gray-800 group-hover:text-primary transition-colors duration-300">
                    {item.name}
                  </CardTitle>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {item.description || "맛있는 메뉴입니다!"}
                  </p>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* 가격과 평점 */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-bold text-primary">
                      {formatPrice(item.price || item.amount)}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-gray-700">
                        {item.rating || item.star || "4.5"}
                      </span>
                    </div>
                  </div>

                  {/* 추가 정보 */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>25분</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>1.2km</span>
                    </div>
                  </div>

                  {/* 주문하기 버튼 */}
                  <Button className="w-full mt-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    주문하기
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* 결과가 없을 때 */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🍕</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">메뉴를 찾을 수 없습니다</h3>
            <p className="text-gray-500 mb-6">
              다른 검색어나 카테고리를 시도해보세요
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="bg-primary hover:bg-primary/90"
            >
              전체 메뉴 보기
            </Button>
          </motion.div>
        )}
      </div>

      {/* 하단 CTA 섹션 */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            맛있는 메뉴가 마음에 드셨나요?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 mb-8"
          >
            지금 바로 주문하고 맛있는 음식을 즐겨보세요!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" className="bg-primary hover:bg-primary/90 px-8 py-3">
              🚀 주문하러 가기
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3">
              📱 앱 다운로드
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
