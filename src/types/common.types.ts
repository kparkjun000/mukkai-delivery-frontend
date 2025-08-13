// 공통 API 응답 타입
export interface ApiResponse<T> {
  result: {
    resultCode: number;
    resultMessage: string;
    resultDescription: string;
  };
  body: T;
}

// 페이지네이션 타입
export interface Pagination {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

// 에러 타입
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}
