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

// 백엔드 API URL - context-path 제거됨
const API_BASE_URL = "https://mukkai-backend-api-f9dc2d5aad02.herokuapp.com";

// Axios 인스턴스 생성
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30초로 증가
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  },
  // CORS 설정
  withCredentials: false, // 쿠키를 포함하지 않음
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

// 백엔드 연결 테스트 함수
export const testBackendConnection = async (): Promise<boolean> => {
  try {
    const response = await axiosInstance.get('/health', { timeout: 5000 });
    console.log('✅ Backend connection successful:', API_BASE_URL);
    return true;
  } catch (error) {
    console.error('❌ Backend connection failed:', error);
    console.log('Backend URL:', API_BASE_URL);
    return false;
  }
};

// 앱 시작시 연결 테스트
testBackendConnection();

export { axiosInstance };
export default axiosInstance;
