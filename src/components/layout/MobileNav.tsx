import { Link, useLocation } from "react-router-dom";
import { Home, Search, ShoppingCart, User, Clock } from "lucide-react";
import { useAuthStore, useCartStore } from "@/store";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const location = useLocation();
  const { isAuthenticated } = useAuthStore();
  const { getItemCount } = useCartStore();

  const cartItemCount = isAuthenticated ? getItemCount() : 0;

  const navItems = [
    {
      to: "/",
      icon: Home,
      label: "홈",
    },
    {
      to: "/search",
      icon: Search,
      label: "검색",
    },
    {
      to: "/cart",
      icon: ShoppingCart,
      label: "장바구니",
      badge: cartItemCount > 0 ? cartItemCount : undefined,
    },
    {
      to: isAuthenticated ? "/orders" : "/auth/login",
      icon: isAuthenticated ? Clock : User,
      label: isAuthenticated ? "주문내역" : "로그인",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t md:hidden">
      <div className="grid grid-cols-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to;

          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-1 min-h-[60px] text-xs transition-colors",
                isActive
                  ? "text-primary bg-primary/5"
                  : "text-gray-600 hover:text-primary"
              )}
            >
              <div className="relative">
                <Icon className="h-5 w-5 mb-1" />
                {item.badge && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center min-w-[16px]">
                    {item.badge > 99 ? "99+" : item.badge}
                  </span>
                )}
              </div>
              <span className="leading-none">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
