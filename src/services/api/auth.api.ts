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
  // 회원가입 - 백엔드 호출만 하고 응답 그대로 반환
  register: async (data: RegisterRequest): Promise<UserResponse> => {
    // 여러 형식 시도
    const formats = [
      // 형식 1: 기본
      {
        name: data.name,
        email: data.email,
        address: data.address || "서울시 강남구",
        password: data.password
      },
      // 형식 2: user 접두사
      {
        userName: data.name,
        userEmail: data.email,
        userAddress: data.address || "서울시 강남구", 
        userPassword: data.password
      },
      // 형식 3: snake_case
      {
        user_name: data.name,
        user_email: data.email,
        user_address: data.address || "서울시 강남구",
        user_password: data.password
      },
      // 형식 4: userRegisterRequest wrapper
      {
        userRegisterRequest: {
          name: data.name,
          email: data.email,
          address: data.address || "서울시 강남구",
          password: data.password
        }
      },
      // 형식 5: request wrapper
      {
        request: {
          name: data.name,
          email: data.email,
          address: data.address || "서울시 강남구",
          password: data.password
        }
      },
      // 형식 6: 대소문자 다른 형식
      {
        Name: data.name,
        Email: data.email,
        Address: data.address || "서울시 강남구",
        Password: data.password
      }
    ];
    
    for (let i = 0; i < formats.length; i++) {
      try {
        const requestBody = formats[i];
        console.log(`Trying format ${i + 1}:`, requestBody);
        
        const response = await axiosWithFallback.post<ApiResponse<UserResponse>>(
          "/open-api/user/register",
          requestBody
        );
        
        console.log("Success! Backend response:", response.data);
        return response.data.body;
        
      } catch (error: any) {
        console.log(`Format ${i + 1} failed:`, error.response?.data);
        if (i === formats.length - 1) {
          // 마지막 형식도 실패하면 에러 던지기
          throw error;
        }
      }
    }
    
    throw new Error("모든 형식 시도 실패");
  },

  // 로그인
  login: async (data: LoginRequest): Promise<TokenResponse> => {
    // 테스트 계정일 경우 목 토큰 반환
    if (data.email === "test@user.com" && data.password === "1234") {
      return {
        accessToken: "mock-user-access-token-" + Date.now(),
        refreshToken: "mock-user-refresh-token-" + Date.now(),
      };
    }

    try {
      console.log("Login request data:", data);

      // Spring Security를 위한 여러 형식 시도
      let response;

      // Swagger 방식: 직접 데이터 전송
      response = await axiosWithFallback.post<ApiResponse<TokenResponse>>(
        "/open-api/user/login",
        data,  // 직접 데이터 전송
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Login API response:", response.data);
      return response.data.body;
    } catch (error: any) {
      console.error("Login API error:", error);
      console.error("Error response:", error.response?.data);

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
            "authorization-token": token,
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
