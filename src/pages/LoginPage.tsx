import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LoginForm } from '@/components/auth/LoginForm';
import { useAuthStore } from '@/store';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuthStore();

  // 이미 로그인된 경우 리다이렉트
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleLoginSuccess = () => {
    const from = location.state?.from?.pathname || '/';
    navigate(from, { replace: true });
  };

  const handleSwitchToRegister = () => {
    navigate('/auth/register');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <LoginForm
        onSuccess={handleLoginSuccess}
        onSwitchToRegister={handleSwitchToRegister}
      />
    </div>
  );
}
