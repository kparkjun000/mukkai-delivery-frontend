import axiosInstance from "../axios.config";
import {
  LoginRequest,
  RegisterRequest,
  TokenResponse,
  UserResponse,
} from "@/types";
// 임시로 여기서 타입 정의
interface ApiResponse<T> {
  result: {
    resultCode: number;
    resultMessage: string;
    resultDescription: string;
  };
  body: T;
}

export const authApi = {
  // 회원가입
  register: async (data: RegisterRequest): Promise<UserResponse> => {
    try {
      const response = await axiosInstance.post<ApiResponse<UserResponse>>(
        "/open-api/user/register",
        { body: data }
      );
      return response.data.body;
    } catch (error: any) {
      console.error("Register API error:", error);
      // Mock 데이터 fallback 제거 - 실제 API만 사용
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "회원가입에 실패했습니다. 백엔드 API를 확인해주세요."
      );
    }
  },

  // 로그인
  login: async (data: LoginRequest): Promise<TokenResponse> => {
    try {
      console.log("Login request data:", data);

      // Spring Security를 위한 여러 형식 시도
      let response;

      try {
        // 첫 번째: body 래퍼와 함께
        response = await axiosInstance.post<ApiResponse<TokenResponse>>(
          "/open-api/user/login",
          { body: data },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } catch (firstError) {
        console.log("First attempt failed, trying direct format...");

        // 두 번째: 직접 데이터 전송
        response = await axiosInstance.post<ApiResponse<TokenResponse>>(
          "/open-api/user/login",
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }

      console.log("Login API response:", response.data);
      return response.data.body;
    } catch (error: any) {
      console.error("Login API error:", error);
      console.error("Error response:", error.response?.data);

      // Mock 데이터 fallback 제거 - 실제 API만 사용
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "로그인에 실패했습니다. 백엔드 API를 확인해주세요."
      );
    }
  },

  // 내 정보 조회 - 실제 API만 사용
  getMe: async (): Promise<UserResponse> => {
    // 토큰이 없으면 에러 발생
    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw new Error("인증 토큰이 없습니다.");
    }

    try {
      console.log("GetMe - Attempting API call with token:", token);
      const response = await axiosInstance.get<ApiResponse<UserResponse>>(
        "/api/user/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("GetMe - API response:", response.data);
      return response.data.body;
    } catch (error: any) {
      console.error(
        "GetMe API 호출 실패:",
        error.response?.status,
        error.response?.data
      );

      // 401/403 오류인 경우 토큰 무효화
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        throw new Error("인증 토큰이 만료되었습니다.");
      }

      // Mock 데이터 fallback 제거 - 실제 API만 사용
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "사용자 정보를 가져올 수 없습니다. 백엔드 API를 확인해주세요."
      );
    }
  },

  // 헬스체크 - 실제 API 사용 (health 엔드포인트가 존재하지 않으므로 제거)
  healthCheck: async (): Promise<void> => {
    // 백엔드에서 health 엔드포인트가 존재하지 않으므로 항상 성공으로 처리
    console.log("Health check skipped - endpoint not available");
    return Promise.resolve();
  },
};
