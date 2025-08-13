import { create } from 'zustand';

interface UIState {
  // 모달 상태
  isCartDrawerOpen: boolean;
  isMenuModalOpen: boolean;
  selectedMenuId: number | null;
  
  // 로딩 상태
  isGlobalLoading: boolean;
  
  // 검색 상태
  searchQuery: string;
  
  // 알림 상태
  toast: {
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    isVisible: boolean;
  } | null;
  
  // Actions
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  openMenuModal: (menuId: number) => void;
  closeMenuModal: () => void;
  setGlobalLoading: (isLoading: boolean) => void;
  setSearchQuery: (query: string) => void;
  showToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  hideToast: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  // Initial state
  isCartDrawerOpen: false,
  isMenuModalOpen: false,
  selectedMenuId: null,
  isGlobalLoading: false,
  searchQuery: '',
  toast: null,

  // Actions
  openCartDrawer: () => set({ isCartDrawerOpen: true }),
  closeCartDrawer: () => set({ isCartDrawerOpen: false }),
  
  openMenuModal: (menuId: number) => set({ 
    isMenuModalOpen: true, 
    selectedMenuId: menuId 
  }),
  closeMenuModal: () => set({ 
    isMenuModalOpen: false, 
    selectedMenuId: null 
  }),
  
  setGlobalLoading: (isLoading: boolean) => set({ isGlobalLoading: isLoading }),
  
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  
  showToast: (message: string, type = 'info' as const) => {
    set({ 
      toast: { message, type, isVisible: true } 
    });
    
    // 3초 후 자동으로 토스트 숨김
    setTimeout(() => {
      set(state => state.toast?.isVisible ? { toast: null } : {});
    }, 3000);
  },
  
  hideToast: () => set({ toast: null })
}));
