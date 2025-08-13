// 메뉴 관련 타입들

export enum StoreMenuStatus {
  REGISTERED = "REGISTERED",
  UNREGISTERED = "UNREGISTERED",
}

export interface StoreMenuResponse {
  // 기존 DB 필드들
  id: number;
  store_id: number; // DB: store_id
  name: string; // DB: name
  amount: number; // DB: amount (decimal)
  status: string; // DB: status (varchar)
  thumbnail_url: string; // DB: thumbnail_url
  like_count?: number; // DB: like_count
  likeCount?: number; // DB: likeCount
  sequence?: number; // DB: sequence

  // 프론트엔드 호환성
  storeId?: number; // store_id와 동일
  thumbnailUrl?: string; // thumbnail_url과 동일
  price?: number; // amount와 동일
}

export interface StoreMenuRegisterRequest {
  storeId: number;
  name: string;
  amount: number;
  thumbnailUrl: string;
}
