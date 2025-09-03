import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics';

export const GoogleAnalytics = () => {
  const location = useLocation();
  const { trackPageView } = useGoogleAnalytics();

  useEffect(() => {
    // 페이지 변경 시 자동으로 페이지뷰 추적
    trackPageView(location.pathname + location.search);
  }, [location, trackPageView]);

  return null; // 이 컴포넌트는 UI를 렌더링하지 않음
};
