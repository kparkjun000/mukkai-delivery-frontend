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
  id: number;
  email: string;
  name: string;
  address: string;
  registeredAt: string;
  unregisteredAt?: string;
  lastLoginAt?: string;
}

export interface UserResponse {
  id: number;
  email: string;
  name: string;
  address: string;
  registeredAt: string;
  unregisteredAt?: string;
  lastLoginAt?: string;
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
