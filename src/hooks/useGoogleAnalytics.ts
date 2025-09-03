import { useEffect } from "react";

// Google Analytics 타입 정의
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

interface GAEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export const useGoogleAnalytics = () => {
  // 페이지뷰 추적
  const trackPageView = (page_path: string, page_title?: string) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("config", "G-VHEL5W2V27", {
        page_path,
        page_title,
      });
    }
  };

  // 이벤트 추적
  const trackEvent = (event: GAEvent) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
      });
    }
  };

  // 커스텀 이벤트들
  const trackUserAction = (
    action: string,
    category: string,
    label?: string
  ) => {
    trackEvent({ action, category, label });
  };

  const trackPurchase = (value: number, currency: string = "KRW") => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "purchase", {
        value,
        currency,
      });
    }
  };

  const trackSearch = (search_term: string) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "search", {
        search_term,
      });
    }
  };

  const trackAddToCart = (
    item_id: string,
    item_name: string,
    value: number
  ) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "add_to_cart", {
        currency: "KRW",
        value,
        items: [
          {
            item_id,
            item_name,
            category: "food",
            quantity: 1,
            price: value,
          },
        ],
      });
    }
  };

  const trackRemoveFromCart = (
    item_id: string,
    item_name: string,
    value: number
  ) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "remove_from_cart", {
        currency: "KRW",
        value,
        items: [
          {
            item_id,
            item_name,
            category: "food",
            quantity: 1,
            price: value,
          },
        ],
      });
    }
  };

  return {
    trackPageView,
    trackEvent,
    trackUserAction,
    trackPurchase,
    trackSearch,
    trackAddToCart,
    trackRemoveFromCart,
  };
};
