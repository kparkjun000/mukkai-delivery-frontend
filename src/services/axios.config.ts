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

// 환경변수에서 API URL을 가져오거나 기본값 사용 (새로운 백엔드 전용 Heroku 앱)
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://mukkai-delivery-backend-new-0624743d472e.herokuapp.com";

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

// Request Interceptor - 토큰 자동 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
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
