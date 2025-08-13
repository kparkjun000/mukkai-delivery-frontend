import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, LogOut, Menu, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore, useCartStore, useUIStore } from "@/store";
import { useStoreUserStore } from "@/store/storeUserStore";
import { storeApi } from "@/services/api/store.api";
import { StoreResponse } from "@/types/store.types";

export function Header() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const {
    isAuthenticated: isStoreAuthenticated,
    storeUser,
    logout: storeLogout,
  } = useStoreUserStore();
  const { getItemCount } = useCartStore();
  const { searchQuery, setSearchQuery, openCartDrawer } = useUIStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [recommendedStores, setRecommendedStores] = useState<StoreResponse[]>(
    []
  );
  const [isLoadingStores, setIsLoadingStores] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // 추천 가게 로딩
  const loadRecommendedStores = async () => {
    if (recommendedStores.length > 0) return; // 이미 로딩했으면 스킵

    setIsLoadingStores(true);
    try {
      const stores = await storeApi.search();
      // 평점 높은 순으로 정렬해서 상위 5개 선택
      const topStores = stores
        .filter((store) => store.rating && store.rating > 0)
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 5);
      setRecommendedStores(topStores);
    } catch (error) {
      console.error("Failed to load recommended stores:", error);
    } finally {
      setIsLoadingStores(false);
    }
  };

  // 검색창 호버 처리 - 약간의 지연으로 의도적 호버만 감지
  const handleSearchHover = () => {
    setTimeout(() => {
      setIsSearchFocused(true);
      loadRecommendedStores();
    }, 150);
  };

  const handleSearchLeave = () => {
    // 약간의 지연을 두어 드롭다운 호버가 가능하도록 함
    setTimeout(() => {
      setIsSearchFocused(false);
    }, 300);
  };

  // 드롭다운 영역 호버 처리
  const handleDropdownHover = () => {
    setIsSearchFocused(true);
  };

  const handleDropdownLeave = () => {
    setTimeout(() => {
      setIsSearchFocused(false);
    }, 200);
  };

  // 추천 가게 클릭 처리
  const handleStoreClick = (store: StoreResponse) => {
    setIsSearchFocused(false);
    navigate(`/stores/${store.id}`);
  };

  // 검색 폼 제출 처리
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchFocused(false);
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // 검색창 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    if (isStoreAuthenticated) {
      storeLogout();
      navigate("/owner/login");
    } else {
      logout();
      navigate("/");
    }
  };

  // 현재 로그인한 사용자 정보 결정
  const currentUser = isStoreAuthenticated ? storeUser : user;
  const isAnyAuthenticated = isAuthenticated || isStoreAuthenticated;
  const userTypePrefix = isStoreAuthenticated ? "(사장님)" : "(사용자)";

  // 이름 → 아이디 → 기본값 순으로 표시
  const getDisplayName = () => {
    if (currentUser?.name && currentUser.name !== "사용자") {
      return currentUser.name;
    }
    if (currentUser?.email) {
      // 이메일에서 @ 앞부분을 아이디로 사용
      return currentUser.email.split("@")[0];
    }
    // 마지막 fallback도 이메일 @ 앞부분을 우선 시도
    // localStorage에서 마지막 로그인 이메일 확인 (사용자 타입별로)
    const lastLoginEmail = isStoreAuthenticated
      ? localStorage.getItem("lastStoreLoginEmail")
      : localStorage.getItem("lastLoginEmail");
    if (lastLoginEmail) {
      return lastLoginEmail.split("@")[0];
    }
    // 정말 마지막 fallback - 기본 이메일에서라도 추출
    const defaultEmail = isStoreAuthenticated
      ? "owner@store.com"
      : "user@site.com";
    return defaultEmail.split("@")[0];
  };

  const displayName = getDisplayName();

  const cartItemCount = getItemCount();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex h-20 items-center justify-between">
          {/* 로고 */}
          <Link to="/" className="flex items-center space-x-3 smooth-hover">
            <div className="text-3xl lg:text-4xl font-bold text-primary tracking-tight">Foodie</div>
          </Link>

          {/* 검색바 (데스크톱) */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-xl lg:max-w-2xl mx-12 lg:mx-16"
          >
            <div 
              className="relative w-full" 
              ref={searchRef}
              onMouseEnter={handleSearchHover}
              onMouseLeave={handleSearchLeave}
            >
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="가게나 메뉴를 검색하세요"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-6 py-3 text-lg smooth-focus"
              />

              {/* 추천 가게 드롭다운 */}
              {isSearchFocused && (
                <div 
                  className="absolute top-full left-0 right-0 mt-1 bg-gray-100 border border-gray-300 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto backdrop-blur-sm"
                  onMouseEnter={handleDropdownHover}
                  onMouseLeave={handleDropdownLeave}
                >
                  <div className="p-3 border-b border-gray-300">
                    <h3 className="text-sm font-medium text-gray-700">
                      인기 가게
                    </h3>
                  </div>

                  {isLoadingStores ? (
                    <div className="p-4 text-center text-gray-500">
                      <div className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full"></div>
                      <span className="ml-2">로딩 중...</span>
                    </div>
                  ) : recommendedStores.length > 0 ? (
                    <div className="py-2">
                      {recommendedStores.map((store) => (
                        <button
                          key={store.id}
                          type="button"
                          onClick={() => handleStoreClick(store)}
                          className="w-full px-4 py-3 hover:bg-white/80 hover:shadow-sm flex items-center gap-3 text-left transition-all duration-200 smooth-hover"
                        >
                          <img
                            src={
                              store.imageUrl ||
                              store.thumbnailUrl ||
                              "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=60&h=60&fit=crop"
                            }
                            alt={store.name || store.storeName}
                            className="w-12 h-12 rounded-lg object-cover"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=60&h=60&fit=crop";
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 truncate">
                              {store.name || store.storeName}
                            </h4>
                            <div className="flex items-center gap-1 mt-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs text-gray-600">
                                {(store.rating || store.star || 0).toFixed(1)}
                              </span>
                              <span className="text-xs text-gray-400 ml-2">
                                {store.address
                                  ? store.address.slice(0, 20) + "..."
                                  : ""}
                              </span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-600">
                      추천 가게가 없습니다
                    </div>
                  )}
                </div>
              )}
            </div>
          </form>

          {/* 우측 메뉴 */}
          <div className="flex items-center space-x-3 lg:space-x-4">
            {/* 장바구니 */}
            <Button
              variant="ghost"
              size="lg"
              onClick={openCartDrawer}
              className="relative smooth-hover p-3"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-sm rounded-full h-6 w-6 flex items-center justify-center font-semibold">
                  {cartItemCount > 99 ? "99+" : cartItemCount}
                </span>
              )}
            </Button>

            {/* 사용자 메뉴 */}
            {isAnyAuthenticated ? (
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  to={isStoreAuthenticated ? "/owner/dashboard" : "/profile"}
                >
                  <Button variant="ghost" size="default" className="smooth-hover px-4 py-2">
                    <User className="h-5 w-5 mr-2" />
                    {userTypePrefix} {displayName}
                  </Button>
                </Link>
                <Button variant="ghost" size="lg" onClick={handleLogout} className="smooth-hover p-3">
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link to="/auth/login">
                  <Button variant="ghost" size="default" className="smooth-hover px-4 py-2">
                    로그인
                  </Button>
                </Link>
                <Link to="/auth/register">
                  <Button variant="ghost" size="default" className="smooth-hover px-4 py-2">
                    회원가입
                  </Button>
                </Link>
                {!isStoreAuthenticated && (
                  <Link to="/owner/login">
                    <Button size="default" className="bg-blue-600 hover:bg-blue-700 smooth-hover px-5 py-2">
                      사장님
                    </Button>
                  </Link>
                )}
              </div>
            )}

            {/* 모바일 메뉴 버튼 */}
            <Button
              variant="ghost"
              size="lg"
              className="md:hidden smooth-hover p-3"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* 모바일 검색바 */}
        <form onSubmit={handleSearch} className="md:hidden pb-4">
          <div 
            className="relative"
            onMouseEnter={handleSearchHover}
            onMouseLeave={handleSearchLeave}
          >
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="가게나 메뉴를 검색하세요"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-6 py-3 text-lg smooth-focus"
            />

            {/* 모바일 추천 가게 드롭다운 */}
            {isSearchFocused && (
              <div 
                className="absolute top-full left-0 right-0 mt-1 bg-gray-100 border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto backdrop-blur-sm"
                onMouseEnter={handleDropdownHover}
                onMouseLeave={handleDropdownLeave}
              >
                <div className="p-3 border-b border-gray-300">
                  <h3 className="text-sm font-medium text-gray-700">
                    인기 가게
                  </h3>
                </div>

                {isLoadingStores ? (
                  <div className="p-4 text-center text-gray-500">
                    <div className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full"></div>
                    <span className="ml-2">로딩 중...</span>
                  </div>
                ) : recommendedStores.length > 0 ? (
                  <div className="py-2">
                    {recommendedStores.map((store) => (
                      <button
                        key={store.id}
                        type="button"
                        onClick={() => handleStoreClick(store)}
                        className="w-full px-4 py-3 hover:bg-white/80 hover:shadow-sm flex items-center gap-3 text-left transition-all duration-200 smooth-hover"
                      >
                        <img
                          src={
                            store.imageUrl ||
                            store.thumbnailUrl ||
                            "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=60&h=60&fit=crop"
                          }
                          alt={store.name || store.storeName}
                          className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=60&h=60&fit=crop";
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 truncate text-sm">
                            {store.name || store.storeName}
                          </h4>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-gray-600">
                              {(store.rating || store.star || 0).toFixed(1)}
                            </span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-600">
                    추천 가게가 없습니다
                  </div>
                )}
              </div>
            )}
          </div>
        </form>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-3 space-y-2">
            {isAnyAuthenticated ? (
              <>
                <Link
                  to={isStoreAuthenticated ? "/owner/dashboard" : "/profile"}
                  className="block"
                >
                  <Button variant="ghost" className="w-full justify-start">
                    <User className="h-4 w-4 mr-2" />
                    {userTypePrefix} {displayName}
                  </Button>
                </Link>
                {!isStoreAuthenticated && (
                  <Link to="/orders" className="block">
                    <Button variant="ghost" className="w-full justify-start">
                      주문 내역
                    </Button>
                  </Link>
                )}
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  로그아웃
                </Button>
              </>
            ) : (
              <>
                <Link to="/auth/login" className="block">
                  <Button variant="ghost" className="w-full justify-start">
                    로그인
                  </Button>
                </Link>
                <Link to="/auth/register" className="block">
                  <Button className="w-full">회원가입</Button>
                </Link>
                <Link to="/owner/login" className="block">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    사장님 로그인
                  </Button>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
