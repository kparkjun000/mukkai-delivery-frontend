// 주문 관련 타입들

export enum UserOrderStatus {
  ORDER = "ORDER",
  ACCEPT = "ACCEPT",
  COOKING = "COOKING",
  DELIVERY = "DELIVERY",
  RECEIVE = "RECEIVE",
}

export interface UserOrderRequest {
  storeId: number;
  storeMenuIdList: number[];
}

export interface UserOrderResponse {
  // 기존 DB 필드들
  id: number;
  user_id: number; // DB: user_id
  store_id: number; // DB: store_id
  status?: string; // DB: status (varchar 50)
  amount: number; // DB: amount (decimal)
  orderedAt?: string; // DB: orderedAt (datetime)
  acceptedAt?: string; // DB: acceptedAt (datetime)
  cookingStartedAt?: string; // DB: cookingStartedAt (datetime)
  deliveryStartedAt?: string; // DB: deliveryStartedAt (datetime)
  receivedAt?: string; // DB: receivedAt (datetime)
  accepted_at?: string; // DB: accepted_at (datetime)
  cooking_started_at?: string; // DB: cooking_started_at (datetime)
  delivery_started_at?: string; // DB: delivery_started_at (datetime)
  ordered_at?: string; // DB: ordered_at (datetime)
  received_at?: string; // DB: received_at (datetime)

  // 프론트엔드 호환성
  userId?: number; // user_id와 동일
  storeId?: number; // store_id와 동일
}

export interface UserOrderDetailResponse {
  userOrderResponse: UserOrderResponse;
  storeResponse: {
    id: number;
    name: string;
    address: string;
    status: string;
    category: string;
    star: number;
    thumbnailUrl: string;
    minimumAmount: number;
    minimumDeliveryAmount: number;
    phoneNumber: string;
  };
  storeMenuResponseList: Array<{
    id: number;
    storeId: number;
    name: string;
    amount: number;
    status: string;
    thumbnailUrl: string;
    likeCount: number;
    sequence: number;
  }>;
}

// 주문 내역 페이지용 통합 타입
export interface OrderResponse {
  id: number;
  status: string;
  amount: number;
  orderedAt: string;
  address: string;
  request?: string;
  store?: {
    id: number;
    name: string;
    address: string;
    thumbnailUrl: string;
  };
  userOrderMenuList?: Array<{
    quantity: number;
    storeMenu?: {
      id: number;
      name: string;
      amount: number;
      thumbnailUrl: string;
    };
  }>;
}

// 장바구니 아이템 타입
export interface CartItem {
  id: number;
  storeId: number;
  name: string;
  amount: number;
  thumbnailUrl: string;
  quantity: number;
}

// 장바구니 타입
export interface Cart {
  storeId: number | null;
  items: CartItem[];
  totalAmount: number;
}
