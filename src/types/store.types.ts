// 가게 관련 타입들

export enum StoreStatus {
  REGISTERED = "REGISTERED",
  UNREGISTERED = "UNREGISTERED",
}

export enum StoreCategory {
  CHICKEN = "CHICKEN",
  PIZZA = "PIZZA",
  HAMBURGER = "HAMBURGER",
  KOREAN_FOOD = "KOREAN_FOOD",
  CHINESE_FOOD = "CHINESE_FOOD",
  JAPANESE_FOOD = "JAPANESE_FOOD",
  COFFEE_TEA = "COFFEE_TEA",
}

export interface StoreResponse {
  // 기존 DB 필드들
  id: number;
  store_id: number;
  storeName: string; // DB: storeName
  name: string; // DB: name
  address: string;
  status: string; // DB: status (REGISTERED/UNREGISTERED)
  category: string; // DB: category (문자열)
  star?: number; // DB: star (평점)
  thumbnail_url?: string; // DB: thumbnail_url
  thumbnailUrl?: string; // DB: thumbnailUrl
  minimum_amount?: number; // DB: minimum_amount
  minimum_delivery_amount?: number; // DB: minimum_delivery_amount
  minimumAmount?: number; // DB: minimumAmount
  minimumDeliveryAmount?: number; // DB: minimumDeliveryAmount
  phone_number?: string; // DB: phone_number
  phoneNumber?: string; // DB: phoneNumber

  // 프론트엔드에서 사용하는 추가 필드들 (호환성)
  description?: string;
  phone?: string; // phoneNumber와 동일
  imageUrl?: string; // thumbnail_url과 동일
  rating?: number; // star와 동일
  deliveryTime?: string; // 계산된 값
  deliveryFee?: number; // 기본값 3000
  minOrderAmount?: number; // minimum_amount와 동일
  isOpen?: boolean; // status === 'REGISTERED'
}

export interface StoreRegisterRequest {
  name: string;
  address: string;
  category: StoreCategory;
  thumbnailUrl: string;
  minimumAmount: number;
  minimumDeliveryAmount: number;
  phoneNumber: string;
}
