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

class StoreUserApi {
  // 점주 회원가입 - 8081 포트 API 사용 (실제 경로)
  async register(data: StoreUserRegisterRequest): Promise<StoreUserResponse> {
    try {
      const response = await axiosInstance.post<ApiResponse<StoreUserResponse>>(
        "/open-api/store-user",  // 8081 포트의 점주 회원가입 API
        data
      );
      return response.data.body;
    } catch (error: any) {
      console.error("Store user register API error:", error);
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "점주 회원가입에 실패했습니다. 백엔드 API를 확인해주세요."
      );
    }
  }

  // 점주 로그인 - 일반 사용자 로그인 API 사용 (8080 포트)
  async login(email: string, password: string): Promise<TokenResponse> {
    try {
      const response = await axiosInstance.post<ApiResponse<TokenResponse>>(
        "/open-api/user/login",  // 8080 포트의 일반 사용자 로그인 API 사용
        { email, password }
      );
      return response.data.body;
    } catch (error: any) {
      console.error("Store user login API error:", error);
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "점주 로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요."
      );
    }
  }

  // 점주 내 정보 조회 - 일반 사용자 API 사용 (8080 포트)
  async getMe(): Promise<StoreUserResponse> {
    try {
      const response = await axiosInstance.get<ApiResponse<StoreUserResponse>>(
        "/api/user/me"  // 8080 포트의 일반 사용자 정보 조회 API 사용
      );
      
      // 일반 사용자 응답을 점주 응답 형태로 변환
      const userData = response.data.body;
      return {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        phone: userData.phone || "010-0000-0000",
        role: "MASTER", // 점주로 설정
        status: "REGISTERED",
        registeredAt: userData.registeredAt,
        unregisteredAt: userData.unregisteredAt,
      };
    } catch (error: any) {
      console.error("Store user getMe API error:", error);
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "점주 정보를 가져올 수 없습니다. 로그인이 필요합니다."
      );
    }
  }
}

export const storeUserApi = new StoreUserApi();
