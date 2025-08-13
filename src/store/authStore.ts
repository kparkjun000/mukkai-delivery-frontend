import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, LoginRequest, RegisterRequest } from "@/types/auth.types";
import { authApi } from "@/services/api";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  loadUser: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials: LoginRequest) => {
        try {
          console.log("Auth store - Starting login with:", credentials);
          set({ isLoading: true, error: null });

          const tokenResponse = await authApi.login(credentials);
          console.log("Auth store - Token response received:", tokenResponse);

          // 토큰 저장
          localStorage.setItem("accessToken", tokenResponse.accessToken);
          if (tokenResponse.refreshToken) {
            localStorage.setItem("refreshToken", tokenResponse.refreshToken);
          }

          // 로그인한 사용자 정보 저장 (fallback용)
          localStorage.setItem("lastLoginEmail", credentials.email);

          // 토큰 먼저 저장하고 인증 상태 설정
          set({
            token: tokenResponse.accessToken,
            user: null, // 사용자 정보는 나중에 로드
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          // 토큰 저장 후 약간의 지연을 두고 사용자 정보 로드
          try {
            await new Promise((resolve) => setTimeout(resolve, 100)); // 100ms 대기
            const user = await authApi.getMe();
            console.log("Auth store - User info loaded:", user);

            // 사용자 이름도 저장
            if (user?.name) {
              localStorage.setItem("lastLoginName", user.name);
            }

            // 사용자 정보 업데이트
            set((state) => ({
              ...state,
              user,
            }));
          } catch (userError: any) {
            console.warn(
              "사용자 정보 로드 실패, Mock 데이터 사용:",
              userError.message
            );
            // 사용자 정보 로드 실패 시 기본값으로 설정
            // 이메일에서 더 나은 사용자 이름 추출
            const emailToName = (email: string) => {
              const namePart = email.split("@")[0];
              // 숫자나 특수문자 제거하고 첫 글자 대문자로
              const cleanName = namePart.replace(/[0-9._-]/g, "");
              return (
                cleanName.charAt(0).toUpperCase() + cleanName.slice(1) ||
                namePart
              );
            };

            const mockUser = {
              id: 1,
              email: credentials.email,
              name: emailToName(credentials.email), // 향상된 이름 추출
              phone: "010-0000-0000",
              address: "서울시 강남구",
              role: "USER" as const,
            };
            localStorage.setItem("lastLoginName", mockUser.name);
            set((state) => ({
              ...state,
              user: mockUser,
            }));
          }
          console.log("Auth store - Login completed successfully");
        } catch (error: any) {
          console.error("Auth store - Login error:", error);
          console.error("Auth store - Error message:", error.message);
          console.error("Auth store - Error response:", error.response?.data);

          const errorMessage =
            error.message ||
            error.response?.data?.message ||
            "로그인에 실패했습니다.";
          console.error("Auth store - Final error message:", errorMessage);

          set({
            isLoading: false,
            error: errorMessage,
          });
          throw error;
        }
      },

      register: async (data: RegisterRequest) => {
        try {
          set({ isLoading: true, error: null });

          await authApi.register(data);

          set({ isLoading: false, error: null });
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.response?.data?.message || "회원가입에 실패했습니다.",
          });
          throw error;
        }
      },

      logout: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      loadUser: async () => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          // 토큰이 없으면 로그아웃 상태로 설정
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
          return;
        }

        try {
          set({ isLoading: true });
          const user = await authApi.getMe();
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          console.warn("사용자 정보 로드 실패:", error.message);
          // 토큰이 유효하지 않은 경우
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
