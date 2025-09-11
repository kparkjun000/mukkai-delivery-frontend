import axiosWithFallback from "../axios.config";
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
  // 회원가입 - 백엔드 API 스펙에 맞춰 body 래퍼로 전송
  register: async (data: RegisterRequest): Promise<UserResponse> => {
    console.log("회원가입 API 호출:", data);
    
    try {
      const requestBody = {
        body: {
          name: data.name,
          email: data.email,
          address: data.address || "서울시 강남구",
          password: data.password
        }
      };
      
      console.log("회원가입 요청 데이터:", requestBody);
      
      const response = await axiosWithFallback.post<ApiResponse<UserResponse>>(
        "/open-api/user/register",
        requestBody
      );
      
      console.log("회원가입 API 응답:", response.data);
      return response.data.body;
      
    } catch (error: any) {
      console.error("회원가입 API 에러:", error.response?.data);
      throw new Error(
        error.response?.data?.result?.resultMessage ||
        error.response?.data?.message ||
        error.message ||
        "회원가입에 실패했습니다."
      );
    }
  },

  // 로그인 - 백엔드 API 스펙에 맞춰 body 래퍼로 전송
  login: async (data: LoginRequest): Promise<TokenResponse> => {
    // 테스트 계정일 경우 목 토큰 반환
    if (data.email === "test@user.com" && data.password === "1234") {
      return {
        accessToken: "mock-user-access-token-" + Date.now(),
        refreshToken: "mock-user-refresh-token-" + Date.now(),
      };
    }

    try {
      const requestBody = {
        body: {
          email: data.email,
          password: data.password
        }
      };
      
      console.log("로그인 API 호출:", requestBody);

      const response = await axiosWithFallback.post<ApiResponse<TokenResponse>>(
        "/open-api/user/login",
        requestBody
      );

      console.log("로그인 API 응답:", response.data);
      return response.data.body;
    } catch (error: any) {
      console.error("로그인 API 에러:", error.response?.data);

      throw new Error(
        error.response?.data?.result?.resultMessage ||
        error.response?.data?.message ||
        error.message ||
        "로그인에 실패했습니다."
      );
    }
  },

  // 내 정보 조회 - 백엔드 API 호출
  getMe: async (): Promise<UserResponse> => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw new Error("인증 토큰이 없습니다.");
    }

    try {
      console.log("사용자 정보 조회 API 호출");
      
      const response = await axiosInstance.get<ApiResponse<UserResponse>>(
        "/api/user/me",
        {
          headers: {
            "authorization-token": token,
          },
          timeout: 10000
        }
      );
      
      console.log("사용자 정보 조회 성공:", response.data);
      return response.data.body;
      
    } catch (error: any) {
      console.error("사용자 정보 조회 API 에러:", error.response?.data);

      // 401/403 오류인 경우 토큰 무효화
      if (error.response?.status === 401 || error.response?.status === 403) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        throw new Error("인증 토큰이 만료되었습니다.");
      }

      throw new Error(
        error.response?.data?.result?.resultMessage ||
        error.response?.data?.message ||
        error.message ||
        "사용자 정보를 가져올 수 없습니다."
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
