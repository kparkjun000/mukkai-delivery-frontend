import { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileNav } from "./MobileNav";
import { FoodieMascot } from "@/components/common/FoodieMascot";
import { useAuthStore } from "@/store";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";

export function Layout() {
  const { loadUser } = useAuthStore();
  const location = useLocation();

  // 메인 페이지인지 확인
  const isHomePage = location.pathname === "/" || location.pathname === "/home";

  useEffect(() => {
    // 앱 시작 시 토큰이 있으면 사용자 정보 로드
    const token = localStorage.getItem("accessToken");
    if (token) {
      loadUser();
    }
  }, [loadUser]);

  return (
    <div className="min-h-screen bg-white">
      <GoogleAnalytics />
      <Header />

      <main
        className={`${
          isHomePage ? "px-0" : "container-padding"
        } py-4 pb-20 md:pb-4`}
      >
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>

      {/* 모바일 하단 네비게이션 */}
      <MobileNav />

      {/* 먹깨비 캐릭터 */}
      <FoodieMascot />

      {/* Footer */}
      <Footer />
    </div>
  );
}
