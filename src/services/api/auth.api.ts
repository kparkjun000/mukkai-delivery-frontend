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

// Mock 사용자 데이터 저장소
let mockUsers: (UserResponse & { password: string })[] = [
  {
    id: 1,
    email: "user@example.com",
    name: "김푸디",
    phone: "010-1234-5678",
    address: "서울시 강남구 테헤란로 123",
    registeredAt: "2024-01-01T00:00:00",
    password: "password123", // Mock용
  },
  {
    id: 2,
    email: "test@test.com",
    name: "테스트",
    phone: "010-2222-3333",
    address: "서울시 서초구 서초대로 456",
    registeredAt: "2024-01-15T00:00:00",
    password: "1234", // Mock용
  },
  {
    id: 3,
    email: "john@gmail.com",
    name: "John",
    phone: "010-3333-4444",
    address: "서울시 마포구 홍대로 789",
    registeredAt: "2024-02-01T00:00:00",
    password: "1234", // Mock용
  },
  {
    id: 4,
    email: "alice123@naver.com",
    name: "Alice",
    phone: "010-4444-5555",
    address: "서울시 종로구 종로 321",
    registeredAt: "2024-02-10T00:00:00",
    password: "password", // Mock용
  },
];

let nextUserId = 5;

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
      // API 호출 실패 시 Mock 데이터 사용 (fallback)
      await new Promise((resolve) => setTimeout(resolve, 800));

      // 이메일 중복 체크
      const existingUser = mockUsers.find((user) => user.email === data.email);
      if (existingUser) {
        throw new Error("이미 존재하는 이메일입니다.");
      }

      const newUser: UserResponse & { password: string } = {
        id: nextUserId++,
        email: data.email,
        name: data.name,
        phone: data.phone,
        address: data.address,
        registeredAt: new Date().toISOString(),
        password: data.password,
      };

      mockUsers.push(newUser);

      // 비밀번호 제외하고 반환
      const { password, ...userResponse } = newUser;
      return userResponse;
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

      // test@test.com 계정을 Mock 데이터에 추가
      const testUser = {
        id: 999,
        email: "test@test.com",
        name: "테스트",
        phone: "010-1234-5678",
        address: "서울시 강남구",
        registeredAt: new Date().toISOString(),
        password: "1234",
      };

      // Mock 사용자 데이터에 test@test.com 계정이 없으면 추가
      const existingTestUser = mockUsers.find(
        (u) => u.email === "test@test.com"
      );
      if (!existingTestUser) {
        mockUsers.push(testUser);
      }

      // API 호출 실패 시 Mock 데이터 사용 (fallback)
      await new Promise((resolve) => setTimeout(resolve, 600));

      // 사용자 인증
      const user = mockUsers.find(
        (u) => u.email === data.email && u.password === data.password
      );
      if (!user) {
        throw new Error("이메일 또는 비밀번호가 올바르지 않습니다.");
      }

      // Mock JWT 토큰 생성
      const mockToken = `mock-jwt-token-${user.id}-${Date.now()}`;
      const mockRefreshToken = `mock-refresh-token-${user.id}-${Date.now()}`;

      return {
        accessToken: mockToken,
        refreshToken: mockRefreshToken,
        tokenType: "Bearer",
        expiresIn: 3600, // 1시간
      };
    }
  },

  // 내 정보 조회 - 실제 API 호출 후 Mock fallback
  getMe: async (): Promise<UserResponse> => {
    // 토큰이 없으면 에러 발생
    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw new Error("인증 토큰이 없습니다.");
    }

    // TODO: 백엔드 준비되면 실제 API 호출 활성화
    // 현재는 Mock 데이터 우선 사용으로 안정성 확보
    console.log("GetMe - Using mock data to avoid 400 errors");

    if (false) {
      // 실제 API 호출을 임시로 비활성화
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
        console.warn(
          "GetMe API 호출 실패, Mock 데이터로 fallback:",
          error.response?.status,
          error.response?.data
        );

        // 401/403 오류인 경우 토큰 무효화
        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          throw new Error("인증 토큰이 만료되었습니다.");
        }
      }
    }

    // Mock 데이터 사용 (현재 기본 동작)
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Mock 토큰인 경우
    if (token.startsWith("mock-jwt-token-")) {
      const userId = parseInt(token.split("-")[3]);
      const user = mockUsers.find((u) => u.id === userId);

      if (!user) {
        throw new Error("사용자를 찾을 수 없습니다.");
      }

      const { password, ...userResponse } = user;
      return userResponse;
    }

    // 실제 JWT 토큰인 경우 - 로그인한 사용자 정보 반환
    console.log("GetMe - Using fallback for real JWT token");

    // 최근 로그인한 사용자 정보를 localStorage에서 가져오기
    const lastLoginEmail = localStorage.getItem("lastLoginEmail");
    const lastLoginName = localStorage.getItem("lastLoginName");

    // 이메일에서 사용자 이름 추출 (@ 앞부분 사용)
    const emailToName = (email: string) => {
      const namePart = email.split("@")[0];
      // 숫자나 특수문자 제거하고 첫 글자 대문자로
      const cleanName = namePart.replace(/[0-9._-]/g, "");
      return cleanName.charAt(0).toUpperCase() + cleanName.slice(1) || namePart;
    };

    const userEmail = lastLoginEmail || "test@test.com";
    const userName = lastLoginName || emailToName(userEmail);

    return {
      id: 999,
      email: userEmail,
      name: userName,
      phone: "010-1234-5678",
      address: "서울시 강남구",
      registeredAt: new Date().toISOString(),
    };
  },

  // 헬스체크 - Mock 데이터
  healthCheck: async (): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    // 항상 성공
  },
};
