import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Cart } from '@/types/order.types';
import { StoreMenuResponse } from '@/types/menu.types';
import { useAuthStore } from './authStore';
import { useStoreUserStore } from './storeUserStore';

interface CartState extends Cart {
  // Actions
  addItem: (item: StoreMenuResponse, quantity?: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  removeItem: (itemId: number) => void;
  clearCart: () => void;
  setStore: (storeId: number) => void;
  getTotalAmount: () => number;
  getItemCount: () => number;
  getCartItem: (itemId: number) => CartItem | undefined;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      storeId: null,
      items: [],
      totalAmount: 0,

      addItem: (item: StoreMenuResponse, quantity = 1) => {
        // 로그인 상태 체크
        const authState = useAuthStore.getState();
        const storeUserState = useStoreUserStore.getState();
        
        // 일반 사용자 로그인도 안 되어있고, 사장님 로그인도 안 되어있는 경우
        if (!authState.isAuthenticated && !storeUserState.isAuthenticated) {
          // 회원가입 페이지로 리다이렉트
          window.location.href = '/auth/register';
          return;
        }
        
        // 사장님으로만 로그인되어 있는 경우
        if (!authState.isAuthenticated && storeUserState.isAuthenticated) {
          // 일반 사용자로 회원가입하도록 안내
          if (window.confirm('주문하려면 일반 사용자로 로그인이 필요합니다. 회원가입 페이지로 이동하시겠습니까?')) {
            window.location.href = '/auth/register';
          }
          return;
        }
        
        const state = get();
        
        // 다른 가게의 메뉴를 추가하려고 할 때
        if (state.storeId && state.storeId !== item.storeId) {
          // 기존 장바구니를 비우고 새로운 가게로 설정
          if (window.confirm('다른 가게의 메뉴입니다. 기존 장바구니를 비우고 추가하시겠습니까?')) {
            set({
              storeId: item.storeId,
              items: [{
                id: item.id,
                storeId: item.storeId,
                name: item.name,
                amount: item.amount,
                thumbnailUrl: item.thumbnailUrl,
                quantity
              }],
              totalAmount: item.amount * quantity
            });
          }
          return;
        }

        // 기존 아이템이 있는지 확인
        const existingItemIndex = state.items.findIndex(cartItem => cartItem.id === item.id);
        
        if (existingItemIndex !== -1) {
          // 기존 아이템의 수량 업데이트
          const updatedItems = [...state.items];
          updatedItems[existingItemIndex].quantity += quantity;
          
          set({
            items: updatedItems,
            totalAmount: updatedItems.reduce((total, item) => total + (item.amount * item.quantity), 0)
          });
        } else {
          // 새 아이템 추가
          const newItem: CartItem = {
            id: item.id,
            storeId: item.storeId,
            name: item.name,
            amount: item.amount,
            thumbnailUrl: item.thumbnailUrl,
            quantity
          };
          
          const updatedItems = [...state.items, newItem];
          
          set({
            storeId: item.storeId,
            items: updatedItems,
            totalAmount: updatedItems.reduce((total, item) => total + (item.amount * item.quantity), 0)
          });
        }
      },

      updateQuantity: (itemId: number, quantity: number) => {
        const state = get();
        
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        
        const updatedItems = state.items.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        );
        
        set({
          items: updatedItems,
          totalAmount: updatedItems.reduce((total, item) => total + (item.amount * item.quantity), 0)
        });
      },

      removeItem: (itemId: number) => {
        const state = get();
        const updatedItems = state.items.filter(item => item.id !== itemId);
        
        set({
          items: updatedItems,
          totalAmount: updatedItems.reduce((total, item) => total + (item.amount * item.quantity), 0),
          // 장바구니가 비면 storeId도 초기화
          storeId: updatedItems.length === 0 ? null : state.storeId
        });
      },

      clearCart: () => {
        set({
          storeId: null,
          items: [],
          totalAmount: 0
        });
      },

      setStore: (storeId: number) => {
        set({ storeId });
      },

      getTotalAmount: () => {
        const state = get();
        return state.items.reduce((total, item) => total + (item.amount * item.quantity), 0);
      },

      getItemCount: () => {
        const state = get();
        return state.items.reduce((total, item) => total + item.quantity, 0);
      },

      getCartItem: (itemId: number) => {
        const state = get();
        return state.items.find(item => item.id === itemId);
      }
    }),
    {
      name: 'cart-storage'
    }
  )
);
