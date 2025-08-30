import { create } from "zustand";
import { persist } from "zustand/middleware";
import { StoreUser, StoreUserRegisterRequest } from "@/types/auth.types";
import { storeUserApi } from "@/services/api";

interface StoreUserState {
  storeUser: StoreUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  register: (data: StoreUserRegisterRequest) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  getMe: () => Promise<void>;
  clearError: () => void;
}

export const useStoreUserStore = create<StoreUserState>()(
  persist(
    (set, get) => ({
      storeUser: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      register: async (data: StoreUserRegisterRequest) => {
        set({ isLoading: true, error: null });
        try {
          const response = await storeUserApi.register(data);
          set({
            storeUser: response,
            isLoading: false,
          });
        } catch (error: any) {
          console.error("Store user register error:", error);
          const errorMessage =
            error.message ||
            error.response?.data?.message ||
            "회원가입에 실패했습니다.";
          set({
            error: errorMessage,
            isLoading: false,
          });
          throw error;
        }
      },

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          // 점주용 로그인 API 호출
          const tokenResponse = await storeUserApi.login(email, password);
          const token = tokenResponse.accessToken;

          localStorage.setItem("storeUserAccessToken", token);
          // 사장님 로그인 이메일도 저장 (Header에서 사용)
          localStorage.setItem("lastStoreLoginEmail", email);

          // Mock 점주 정보 직접 설정 (API 호출 없이)
          const mockStoreUser = {
            id: 1,
            email: email,
            name: "테스트 점주",
            phone: "010-1234-5678",
            role: "MASTER" as const,
            status: "REGISTERED" as const,
            registeredAt: new Date().toISOString(),
            unregisteredAt: null,
          };

          set({
            token,
            storeUser: mockStoreUser,
            isAuthenticated: true,
            isLoading: false,
          });

        } catch (error: any) {
          console.error("Store user login error:", error);
          const errorMessage =
            error.message ||
            error.response?.data?.message ||
            "로그인에 실패했습니다.";
          set({
            error: errorMessage,
            isLoading: false,
          });
          throw error;
        }
      },

      logout: () => {
        localStorage.removeItem("storeUserAccessToken");
        localStorage.removeItem("lastStoreLoginEmail");
        set({
          storeUser: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      getMe: async () => {
        set({ isLoading: true, error: null });
        try {
          const storeUser = await storeUserApi.getMe();
          set({
            storeUser,
            isLoading: false,
          });
        } catch (error: any) {
          console.error("Store user getMe error:", error);
          const errorMessage =
            error.message ||
            error.response?.data?.message ||
            "사용자 정보를 불러올 수 없습니다.";
          set({
            error: errorMessage,
            isLoading: false,
          });
          throw error;
        }
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "store-user-store",
      partialize: (state) => ({
        storeUser: state.storeUser,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
