import axios from "axios";
import type { AxiosInstance, AxiosResponse, AxiosError } from "axios";

// 임시로 여기서 타입 정의
interface ApiResponse<T> {
  result: {
    resultCode: number;
    resultMessage: string;
    resultDescription: string;
  };
  body: T;
}

// 환경변수에서 API URL을 가져오거나 기본값 사용 (Railway 백엔드)
const API_BASE_URL = "https://web-production-274dd.up.railway.app";

// Axios 인스턴스 생성
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  // Spring Security CORS 설정을 위해
  withCredentials: false,
});

// Request Interceptor - 토큰 자동 추가 (일반 사용자 + 점주)
axiosInstance.interceptors.request.use(
  (config) => {
    // 일반 사용자 토큰 우선 확인
    let token = localStorage.getItem("accessToken");
    
    // 일반 사용자 토큰이 없으면 점주 토큰 확인
    if (!token) {
      token = localStorage.getItem("storeUserAccessToken");
    }
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor - 에러 처리 및 토큰 갱신
axiosInstance.interceptors.response.use(
  (response: AxiosResponse<ApiResponse<any>>) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;

    // 401 에러 처리 (토큰 만료)
    if (error.response?.status === 401 && originalRequest) {
      // 토큰 제거 및 로그인 페이지로 리다이렉트
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      // 로그인 페이지로 리다이렉트 (나중에 라우터와 연동)
      window.location.href = "/auth/login";

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export { axiosInstance };
export default axiosInstance;
