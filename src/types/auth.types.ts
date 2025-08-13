// 인증 관련 타입들

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  address: string;
  password: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken?: string;
}

export interface User {
  // 기존 DB 필드들
  id: number;
  name: string; // DB: name (varchar 50)
  email?: string; // DB: email (varchar 255)
  password?: string; // DB: password (varchar 100) - 응답에서는 제외
  status?: string; // DB: status (varchar 50)
  address: string; // DB: address (varchar 150)
  registeredAt?: string; // DB: registeredAt (datetime)
  unregisteredAt?: string; // DB: unregisteredAt (datetime)
  lastLoginAt?: string; // DB: lastLoginAt (datetime)
  last_login_at?: string; // DB: last_login_at (datetime)
  registered_at?: string; // DB: registered_at (datetime)
  unregistered_at?: string; // DB: unregistered_at (datetime)
}

export interface UserResponse {
  // 기존 DB 필드들
  id: number;
  name: string; // DB: name (varchar 50)
  email?: string; // DB: email (varchar 255)
  status?: string; // DB: status (varchar 50)
  address: string; // DB: address (varchar 150)
  registeredAt?: string; // DB: registeredAt (datetime)
  unregisteredAt?: string; // DB: unregisteredAt (datetime)
  lastLoginAt?: string; // DB: lastLoginAt (datetime)
  last_login_at?: string; // DB: last_login_at (datetime)
  registered_at?: string; // DB: registered_at (datetime)
  unregistered_at?: string; // DB: unregistered_at (datetime)
}

// 점주 관련 타입들
export interface StoreUserRegisterRequest {
  email: string;
  password: string;
  name: string;
  storeName: string;
  category: string;
  address: string;
  phone: string;
  description?: string;
}

export interface StoreUser {
  id: number;
  email: string;
  name: string;
  storeName: string;
  category: string;
  address: string;
  phone: string;
  description?: string;
  registeredAt: string;
  unregisteredAt?: string;
  lastLoginAt?: string;
}

export interface StoreUserResponse {
  id: number;
  email: string;
  name: string;
  storeName: string;
  category: string;
  address: string;
  phone: string;
  description?: string;
  registeredAt: string;
  unregisteredAt?: string;
  lastLoginAt?: string;
}
