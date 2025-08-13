// 임시로 여기서 타입 정의
interface ApiResponse<T> {
  result: {
    resultCode: number;
    resultMessage: string;
    resultDescription: string;
  };
  body: T;
}
import {
  StoreUserRegisterRequest,
  StoreUserResponse,
  TokenResponse,
} from "@/types/auth.types";
import axiosInstance from "../axios.config";

// Mock 점주 데이터
let mockStoreUsers: (StoreUserResponse & { password: string })[] = [
  {
    id: 1,
    email: "owner@example.com",
    name: "김사장",
    phone: "010-1111-2222",
    businessNumber: "123-45-67890",
    storeName: "김사장 치킨집",
    storeAddress: "서울시 강남구 테헤란로 123",
    registeredAt: "2024-01-01T00:00:00",
    password: "owner123", // Mock용
  },
  {
    id: 2,
    email: "pizza@store.com",
    name: "박대표",
    phone: "010-3333-4444",
    businessNumber: "987-65-43210",
    storeName: "박대표 피자집",
    storeAddress: "서울시 서초구 서초대로 456",
    registeredAt: "2024-01-15T00:00:00",
    password: "1234", // Mock용
  },
];

let nextStoreUserId = 3;

class StoreUserApi {
  // 점주 회원가입 - Mock 데이터 우선 사용으로 안정성 확보
  async register(data: StoreUserRegisterRequest): Promise<StoreUserResponse> {
    // TODO: 백엔드 준비되면 실제 API 호출 활성화
    console.log("Store user register - Using mock data to avoid CORS errors");

    if (false) {
      // 실제 API 호출을 임시로 비활성화
      try {
        const response = await axiosInstance.post<
          ApiResponse<StoreUserResponse>
        >("/store-open-api/store-user", data);
        return response.data.body;
      } catch (error) {
        console.warn(
          "Store user register API 호출 실패, Mock 데이터 사용:",
          error
        );
      }
    }

    // Mock 회원가입 로직
    await new Promise((resolve) => setTimeout(resolve, 800));

    // 이메일 중복 체크
    const existingUser = mockStoreUsers.find(
      (user) => user.email === data.email
    );
    if (existingUser) {
      throw new Error("이미 존재하는 이메일입니다.");
    }

    // 사업자번호 중복 체크
    const existingBusiness = mockStoreUsers.find(
      (user) => user.businessNumber === data.businessNumber
    );
    if (existingBusiness) {
      throw new Error("이미 등록된 사업자번호입니다.");
    }

    const newStoreUser: StoreUserResponse & { password: string } = {
      id: nextStoreUserId++,
      email: data.email,
      name: data.name,
      phone: data.phone,
      businessNumber: data.businessNumber,
      storeName: data.storeName,
      storeAddress: data.storeAddress,
      registeredAt: new Date().toISOString(),
      password: data.password, // Mock용
    };

    mockStoreUsers.push(newStoreUser);

    const { password, ...userResponse } = newStoreUser;
    return userResponse;
  }

  // 점주 로그인 - Mock 데이터 우선 사용으로 안정성 확보
  async login(email: string, password: string): Promise<TokenResponse> {
    // TODO: 백엔드 준비되면 실제 API 호출 활성화
    console.log("Store user login - Using mock data to avoid CORS errors");

    if (false) {
      // 실제 API 호출을 임시로 비활성화
      try {
        const response = await axiosInstance.post<ApiResponse<TokenResponse>>(
          "/store-open-api/store-user/login",
          { email, password }
        );
        return response.data.body;
      } catch (error) {
        console.warn(
          "Store user login API 호출 실패, Mock 데이터 사용:",
          error
        );
      }
    }

    // Mock 로그인 로직
    await new Promise((resolve) => setTimeout(resolve, 500));

    console.log("Store user login attempt:", { email, password });
    console.log(
      "Available store users:",
      mockStoreUsers.map((u) => ({ email: u.email, password: u.password }))
    );

    const user = mockStoreUsers.find(
      (u) => u.email === email && u.password === password
    );

    console.log("Found user:", user);

    if (!user) {
      throw new Error("이메일 또는 비밀번호가 잘못되었습니다.");
    }

    return {
      accessToken: `mock-store-jwt-token-${user.id}`,
      refreshToken: `mock-store-refresh-token-${user.id}`,
      expiresIn: 3600, // 1시간
    };
  }

  // 점주 내 정보 조회 - Mock 데이터 우선 사용으로 안정성 확보
  async getMe(): Promise<StoreUserResponse> {
    // TODO: 백엔드 준비되면 실제 API 호출 활성화
    console.log("Store user getMe - Using mock data to avoid CORS errors");

    if (false) {
      // 실제 API 호출을 임시로 비활성화
      try {
        const response = await axiosInstance.get<
          ApiResponse<StoreUserResponse>
        >("/store-api/store-user/me");
        return response.data.body;
      } catch (error) {
        console.warn(
          "Store user getMe API 호출 실패, Mock 데이터 사용:",
          error
        );
      }
    }

    // Mock 데이터 사용
    await new Promise((resolve) => setTimeout(resolve, 200));

    const token = localStorage.getItem("storeUserAccessToken");
    if (!token) {
      throw new Error("인증 토큰이 없습니다.");
    }

    // Mock 토큰인 경우
    if (token.startsWith("mock-store-jwt-token-")) {
      const userId = parseInt(token.split("-")[4]);
      const user = mockStoreUsers.find((u) => u.id === userId);

      if (!user) {
        throw new Error("사용자를 찾을 수 없습니다.");
      }

      const { password, ...userResponse } = user;
      return userResponse;
    }

    // Fallback
    return {
      id: 1,
      email: "owner@example.com",
      name: "김사장",
      phone: "010-1111-2222",
      businessNumber: "123-45-67890",
      storeName: "김사장 치킨집",
      storeAddress: "서울시 강남구 테헤란로 123",
      registeredAt: new Date().toISOString(),
    };
  }
}

export const storeUserApi = new StoreUserApi();
