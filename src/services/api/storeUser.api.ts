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
  // 점주 회원가입 - 실제 API만 사용
  async register(data: StoreUserRegisterRequest): Promise<StoreUserResponse> {
    try {
      const response = await axiosInstance.post<ApiResponse<StoreUserResponse>>(
        "/store-open-api/store-user",
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

  // 점주 로그인 - 실제 API만 사용
  async login(email: string, password: string): Promise<TokenResponse> {
    try {
      const response = await axiosInstance.post<ApiResponse<TokenResponse>>(
        "/store-open-api/store-user/login",
        { email, password }
      );
      return response.data.body;
    } catch (error: any) {
      console.error("Store user login API error:", error);
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "점주 로그인에 실패했습니다. 백엔드 API를 확인해주세요."
      );
    }
  }

  // 점주 내 정보 조회 - 실제 API만 사용
  async getMe(): Promise<StoreUserResponse> {
    try {
      const response = await axiosInstance.get<ApiResponse<StoreUserResponse>>(
        "/store-api/store-user/me"
      );
      return response.data.body;
    } catch (error: any) {
      console.error("Store user getMe API error:", error);
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "점주 정보를 가져올 수 없습니다. 백엔드 API를 확인해주세요."
      );
    }
  }
}

export const storeUserApi = new StoreUserApi();
