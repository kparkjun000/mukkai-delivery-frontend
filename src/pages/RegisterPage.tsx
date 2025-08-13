import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { useAuthStore, useUIStore } from '@/store';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { showToast } = useUIStore();

  // 이미 로그인된 경우 리다이렉트
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleRegisterSuccess = () => {
    showToast('회원가입이 완료되었습니다. 로그인해주세요.', 'success');
    navigate('/auth/login');
  };

  const handleSwitchToLogin = () => {
    navigate('/auth/login');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <RegisterForm
        onSuccess={handleRegisterSuccess}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </div>
  );
}
