import { ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, loadUser, isLoading } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    // 토큰이 있지만 사용자 정보가 없는 경우 사용자 정보 로드
    const token = localStorage.getItem('accessToken');
    if (token && !isAuthenticated && !isLoading) {
      loadUser();
    }
  }, [isAuthenticated, loadUser, isLoading]);

  // 로딩 중인 경우
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // 인증되지 않은 경우 로그인 페이지로 리다이렉트
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
