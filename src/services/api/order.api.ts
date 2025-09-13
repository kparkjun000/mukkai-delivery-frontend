import axiosInstance from "../axios.config";
import {
  UserOrderRequest,
  UserOrderResponse,
  UserOrderDetailResponse,
} from "@/types/order.types";
import { menuApi } from "./menu.api";
// 임시로 여기서 타입 정의
interface ApiResponse<T> {
  result: {
    resultCode: number;
    resultMessage: string;
    resultDescription: string;
  };
  body: T;
}

// Mock 주문 데이터 저장소 - 사용자별로 분리되어 관리됨
let mockOrders: UserOrderDetailResponse[] = [];

let nextOrderId = 1;

// 현재 로그인한 사용자 ID 가져오기 (fallback 처리)
const getCurrentUserId = () => {
  try {
    // localStorage에서 사용자 정보 가져오기
    const lastLoginEmail = localStorage.getItem("lastLoginEmail");
    const lastStoreLoginEmail = localStorage.getItem("lastStoreLoginEmail");

    // 이메일을 간단한 사용자 ID로 변환 (해시 또는 고유 번호)
    const email = lastStoreLoginEmail || lastLoginEmail;
    if (email) {
      // 이메일을 간단한 숫자 ID로 변환 (해시 함수 대신 간단한 매핑)
      const emailHash = email.split("").reduce((a, b) => {
        a = (a << 5) - a + b.charCodeAt(0);
        return a & a; // 32비트 정수로 변환
      }, 0);
      return Math.abs(emailHash % 1000) + 1; // 1-1000 범위의 ID
    }
    return 1; // 기본 사용자 ID
  } catch (error) {
    console.warn("Failed to get current user ID:", error);
    return 1; // 기본 사용자 ID
  }
};

// 진행중인 주문 중 문제가 있는 것들을 제거하는 함수 (최근 생성된 유효한 주문은 보호)
export const clearInvalidCurrentOrders = (userId?: number) => {
  const currentUserId = userId || getCurrentUserId();
  const beforeCount = mockOrders.length;
  const recentOrderTime = Date.now() - 30 * 60 * 1000; // 30분 이내 주문은 보호 (더 길게)

  // 진행중 주문 중 불완전한 것들만 직접 제거 (사용자별 적용)
  for (let i = mockOrders.length - 1; i >= 0; i--) {
    const order = mockOrders[i];

    if (
      ["PENDING", "CONFIRMED", "PREPARING", "DELIVERING"].includes(
        order.status
      ) &&
      order.userId === currentUserId // 현재 사용자의 주문만 처리
    ) {
      // 최근 30분 이내에 생성된 주문은 검사하지 않음 (새로 생성된 유효한 주문 보호)
      const orderTime = new Date(order.orderDate).getTime();
      if (orderTime > recentOrderTime) {
        console.log(
          "Protecting recent order for user",
          currentUserId,
          ":",
          order.id,
          "created at",
          order.orderDate
        );
        continue;
      }

      // 엉터리 주문 식별을 위한 더 정확한 로직
      const isInvalid =
        !order.id ||
        !order.storeId ||
        !order.storeName ||
        order.storeName === "알 수 없는 가게" ||
        order.storeName === "undefined" ||
        order.storeName === "가게 정보 없음" ||
        order.storeName.includes("Store Name") ||
        order.storeName.includes("정보 없음") ||
        !order.orderItems ||
        order.orderItems.length === 0 ||
        !order.totalAmount ||
        order.totalAmount <= 0 ||
        order.totalAmount === 3000 || // 배송비만 있는 경우
        !order.orderDate ||
        !order.deliveryAddress ||
        order.deliveryAddress === "배송 주소 정보 없음" ||
        order.deliveryAddress === "주소 정보 없음" ||
        order.deliveryAddress.includes("정보 없음") ||
        order.orderItems.some(
          (item) =>
            !item.id ||
            !item.menuId ||
            !item.menuName ||
            item.menuName === "메뉴명 없음" ||
            item.menuName === "정보 없음" ||
            item.menuName.includes("Menu Name") ||
            item.menuName.includes("정보 없음") ||
            !item.quantity ||
            item.quantity <= 0 ||
            !item.price ||
            item.price <= 0
        );

      if (isInvalid) {
        console.warn(
          "Removing invalid current order:",
          order.id,
          order.storeName
        );
        mockOrders.splice(i, 1); // 직접 제거
      }
    }
  }

  const afterCount = mockOrders.length;
  console.log(
    `Cleaned up invalid current orders: ${
      beforeCount - afterCount
    } removed, ${afterCount} remaining`
  );
};

// 불완전한 주문들을 직접 제거하는 함수
export const removeInvalidOrders = () => {
  const beforeCount = mockOrders.length;

  // 불완전한 주문들 제거
  for (let i = mockOrders.length - 1; i >= 0; i--) {
    const order = mockOrders[i];

    const isInvalid =
      !order.id ||
      !order.storeId ||
      !order.storeName ||
      order.storeName === "알 수 없는 가게" ||
      order.storeName === "undefined" ||
      order.storeName === "가게 정보 없음" ||
      order.storeName.includes("Store Name") ||
      order.storeName.includes("정보 없음") ||
      !order.orderItems ||
      order.orderItems.length === 0 ||
      !order.totalAmount ||
      order.totalAmount <= 0 ||
      order.totalAmount === 3000 || // 배송비만 있는 경우
      !order.orderDate ||
      !order.deliveryAddress ||
      order.deliveryAddress === "배송 주소 정보 없음" ||
      order.deliveryAddress === "주소 정보 없음" ||
      order.deliveryAddress.includes("정보 없음") ||
      order.orderItems.some(
        (item) =>
          !item.id ||
          !item.menuId ||
          !item.menuName ||
          item.menuName === "메뉴명 없음" ||
          item.menuName === "정보 없음" ||
          item.menuName.includes("Menu Name") ||
          item.menuName.includes("정보 없음") ||
          !item.quantity ||
          item.quantity <= 0 ||
          !item.price ||
          item.price <= 0
      );

    if (isInvalid) {
      console.warn("Removing invalid order:", order.id, order.storeName);
      mockOrders.splice(i, 1);
    }
  }

  const afterCount = mockOrders.length;
  console.log(
    `Removed ${
      beforeCount - afterCount
    } invalid orders. ${afterCount} orders remaining.`
  );
};

// 기존 불완전한 주문들을 제거하고 초기 상태로 재설정
export const resetMockOrders = () => {
  mockOrders.length = 0; // 배열 비우기 - 새 사용자는 주문 내역이 없어야 함
  nextOrderId = 1; // 주문 ID도 1부터 시작
  console.log("Mock orders reset to clean state - empty for new users");
};

export const orderApi = {
  // 주문 생성 - 백엔드 API 우선 시도 후 Mock fallback
  createOrder: async (data: UserOrderRequest): Promise<UserOrderResponse> => {
    console.log("주문 생성 API 호출:", data);
    
    // 실제 백엔드 API 호출 시도
    try {
      const requestBody = {
        body: {
          storeId: data.storeId,
          deliveryAddress: data.deliveryAddress || "서울시 강남구 테헤란로 123",
          userOrderMenuRequestList: data.userOrderMenuRequestList || data.orderItems || [],
          totalAmount: data.totalAmount,
          deliveryFee: data.deliveryFee || 3000
        }
      };
      
      console.log("백엔드 주문 생성 API 시도:", requestBody);
      
      const response = await axiosInstance.post<ApiResponse<UserOrderResponse>>(
        "/api/user-order",
        requestBody,
        { timeout: 10000 }
      );
      
      console.log("백엔드 주문 생성 성공:", response.data);
      return response.data.body;
      
    } catch (error: any) {
      console.log("백엔드 주문 생성 실패, Mock 데이터로 fallback:", error.response?.data || error.message);
    }
    
    // Mock 데이터 처리 (기존 로직 유지)
    // 로딩 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Creating order with data:", data);

    // 완전한 주문 아이템 정보 생성
    let completeOrderItems = [];
    let calculatedTotal = 0;

    try {
      // 메뉴 정보 조회하여 완전한 orderItems 생성
      const storeMenus = await menuApi.getStoreMenus(data.storeId);
      console.log("Store menus:", storeMenus);

      completeOrderItems = (
        data.userOrderMenuRequestList ||
        data.orderItems ||
        []
      ).map((item, index) => {
        // CheckoutPage에서 오는 구조와 기존 구조 모두 처리
        const menuId = item.storeMenuId || item.menuId || item.id;
        const quantity = item.quantity || 1;

        // 메뉴 정보 찾기
        const menuInfo = storeMenus.find((menu) => menu.id === menuId);
        const price = menuInfo?.amount || menuInfo?.price || 0;
        const menuName = menuInfo?.name || item.menuName || "메뉴명 없음";

        calculatedTotal += price * quantity;

        return {
          id: nextOrderId + index, // 고유 ID 생성
          menuId: menuId,
          menuName: menuName,
          quantity: quantity,
          price: price,
          options: item.options || [],
        };
      });

      console.log("Complete order items:", completeOrderItems);
    } catch (error) {
      console.error("Failed to get menu info, using fallback:", error);

      // 메뉴 조회 실패 시 기본값 사용
      completeOrderItems = (
        data.userOrderMenuRequestList ||
        data.orderItems ||
        []
      ).map((item, index) => ({
        id: nextOrderId + index,
        menuId: item.storeMenuId || item.menuId || item.id || 1,
        menuName: item.menuName || "메뉴명 없음",
        quantity: item.quantity || 1,
        price: 15000, // 기본 가격
        options: item.options || [],
      }));
      calculatedTotal = completeOrderItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    }

    const deliveryFee = data.deliveryFee || 3000;
    const totalAmount = data.totalAmount || calculatedTotal + deliveryFee;

    const newOrder: UserOrderResponse = {
      id: nextOrderId++,
      status: "CONFIRMED", // 새 주문을 확인됨 상태로 설정하여 진행중 주문에 표시
      orderDate: new Date().toISOString(),
      totalAmount: totalAmount,
      deliveryFee: deliveryFee,
      estimatedDeliveryTime: "30-40분",
    };

    // Mock 주문 상세 데이터도 생성 - 완전한 정보만 포함 (현재 사용자 ID 사용)
    const currentUserId = getCurrentUserId();
    const orderDetail: UserOrderDetailResponse = {
      ...newOrder,
      storeId: data.storeId,
      storeName: getStoreName(data.storeId),
      userId: currentUserId, // 현재 로그인한 사용자 ID
      deliveryAddress: data.deliveryAddress || "서울시 강남구 테헤란로 123", // 기본 주소 제공
      orderItems: completeOrderItems,
    };

    console.log("Created order detail:", orderDetail);
    console.log("Total mock orders before adding:", mockOrders.length);

    mockOrders.unshift(orderDetail); // 최신 주문을 앞에 추가

    console.log("Total mock orders after adding:", mockOrders.length);
    console.log("First order in mock data:", mockOrders[0]);

    return newOrder;
  },

  // 현재 진행중인 주문 조회 - 백엔드 API 우선 시도 후 Mock fallback
  getCurrentOrders: async (): Promise<UserOrderDetailResponse[]> => {
    console.log("현재 진행중인 주문 조회 API 호출");
    
    // 실제 백엔드 API 호출 시도
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        console.log("백엔드 현재 주문 조회 API 시도");
        
        const response = await axiosInstance.get<ApiResponse<UserOrderDetailResponse[]>>(
          "/api/user-order/current",
          {
            headers: {
              "authorization-token": token,
            },
            timeout: 10000
          }
        );
        
        console.log("백엔드 현재 주문 조회 성공:", response.data);
        return response.data.body;
      }
    } catch (error: any) {
      console.log("백엔드 현재 주문 조회 실패, Mock 데이터로 fallback:", error.response?.data || error.message);
    }
    
    // Mock 데이터 처리 (기존 로직 유지)
    const currentUserId = getCurrentUserId();
    console.log("getCurrentOrders called for user:", currentUserId);

    // 조회 전에 자동으로 불완전한 주문들 정리
    try {
      removeInvalidOrders(); // 모든 불완전한 주문들 제거 (기본 주문들은 보호됨)
      clearInvalidCurrentOrders(); // 진행중인 주문 중 불완전한 것들 제거
    } catch (error) {
      console.error("자동 주문 정리 중 오류:", error);
    }

    console.log("Total mockOrders:", mockOrders.length);
    console.log(
      "All orders statuses:",
      mockOrders.map((o) => ({
        id: o.id,
        userId: o.userId,
        status: o.status,
        storeName: o.storeName,
      }))
    );

    await new Promise((resolve) => setTimeout(resolve, 300));

    // 완전한 데이터이면서 진행중인 주문만 필터링 (더 엄격한 검증, 사용자별)
    const validOrders = mockOrders.filter((order) => {
      // 사용자 ID 매칭 - 백엔드 연동 실패 시에만 Mock 사용하므로 현재 사용자 주문만 표시
      const userMatches = !order.userId || order.userId === currentUserId; // userId가 없거나 현재 사용자와 일치
      const isValid =
        userMatches && // 사용자 매칭
        order.id &&
        order.storeId &&
        order.storeName &&
        order.storeName !== "알 수 없는 가게" &&
        order.storeName !== "undefined" &&
        order.storeName !== "가게 정보 없음" &&
        order.orderItems &&
        order.orderItems.length > 0 &&
        order.totalAmount &&
        order.totalAmount > 3000 && // 배송비(3000)보다 커야 실제 주문
        order.orderDate &&
        order.deliveryAddress &&
        order.deliveryAddress !== "배송 주소 정보 없음" &&
        order.deliveryAddress !== "주소 정보 없음" &&
        // 모든 orderItems도 완전한지 확인
        order.orderItems.every(
          (item) =>
            item.id &&
            item.menuId &&
            item.menuName &&
            item.menuName !== "메뉴명 없음" &&
            item.menuName !== "정보 없음" &&
            item.quantity > 0 &&
            item.price > 0
        ) &&
        // 진행중인 상태만 (단, 완전한 데이터인 경우에만)
        ["PENDING", "CONFIRMED", "PREPARING", "DELIVERING"].includes(
          order.status
        );

      if (
        !isValid &&
        ["PENDING", "CONFIRMED", "PREPARING", "DELIVERING"].includes(
          order.status
        )
      ) {
        console.warn("Invalid current order filtered out:", order);
      }
      return isValid;
    });

    console.log(`Returning ${validOrders.length} valid current orders`);
    return validOrders;
  },

  // 주문 내역 조회 - 백엔드 API 우선 시도 후 Mock fallback
  getOrderHistory: async (): Promise<UserOrderDetailResponse[]> => {
    console.log("주문 내역 조회 API 호출");
    
    // 실제 백엔드 API 호출 시도
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        console.log("백엔드 주문 내역 조회 API 시도");
        
        const response = await axiosInstance.get<ApiResponse<UserOrderDetailResponse[]>>(
          "/api/user-order/history",
          {
            headers: {
              "authorization-token": token,
            },
            timeout: 10000
          }
        );
        
        console.log("백엔드 주문 내역 조회 성공:", response.data);
        return response.data.body;
      }
    } catch (error: any) {
      console.log("백엔드 주문 내역 조회 실패, Mock 데이터로 fallback:", error.response?.data || error.message);
    }
    
    // Mock 데이터 처리 (기존 로직 유지)
    const currentUserId = getCurrentUserId();
    console.log("getOrderHistory called for user:", currentUserId);

    // 조회 전에 자동으로 불완전한 주문들 정리
    try {
      removeInvalidOrders(); // 모든 불완전한 주문들 제거 (기본 주문들은 보호됨)
    } catch (error) {
      console.error("자동 주문 정리 중 오류:", error);
    }

    console.log("Total mockOrders for history:", mockOrders.length);

    await new Promise((resolve) => setTimeout(resolve, 300));

    // 완전한 데이터만 필터링 (사용자별)
    const validOrders = mockOrders.filter((order) => {
      // 사용자 ID 매칭 - 백엔드 연동 실패 시에만 Mock 사용하므로 현재 사용자 주문만 표시
      const userMatches = !order.userId || order.userId === currentUserId; // userId가 없거나 현재 사용자와 일치
      const isValid =
        userMatches && // 사용자 매칭
        order.id &&
        order.storeId &&
        order.storeName &&
        order.storeName !== "알 수 없는 가게" &&
        order.storeName !== "undefined" &&
        order.storeName !== "가게 정보 없음" &&
        order.orderItems &&
        order.orderItems.length > 0 &&
        order.totalAmount &&
        order.totalAmount > 0 &&
        order.orderDate &&
        order.deliveryAddress &&
        order.deliveryAddress !== "배송 주소 정보 없음" &&
        order.deliveryAddress !== "주소 정보 없음" &&
        // 모든 orderItems도 완전한지 확인
        order.orderItems.every(
          (item) =>
            item.id &&
            item.menuId &&
            item.menuName &&
            item.menuName !== "메뉴명 없음" &&
            item.menuName !== "정보 없음" &&
            item.quantity > 0 &&
            item.price > 0
        );

      if (!isValid) {
        console.warn("Invalid order filtered out from history:", order);
      }
      return isValid;
    });

    console.log(
      `Returning ${validOrders.length} valid orders out of ${mockOrders.length} total`
    );

    return validOrders
      .slice()
      .sort(
        (a, b) =>
          new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
      );
  },

  // 특정 주문 상세 조회 - 백엔드 API 우선 시도 후 Mock fallback
  getOrderDetail: async (orderId: number): Promise<UserOrderDetailResponse> => {
    console.log("주문 상세 조회 API 호출, ID:", orderId);
    
    // 실제 백엔드 API 호출 시도
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        console.log("백엔드 주문 상세 조회 API 시도");
        
        const response = await axiosInstance.get<ApiResponse<UserOrderDetailResponse>>(
          `/api/user-order/id/${orderId}`,
          {
            headers: {
              "authorization-token": token,
            },
            timeout: 10000
          }
        );
        
        console.log("백엔드 주문 상세 조회 성공:", response.data);
        return response.data.body;
      }
    } catch (error: any) {
      console.log("백엔드 주문 상세 조회 실패, Mock 데이터로 fallback:", error.response?.data || error.message);
    }
    
    // Mock 데이터 처리 (기존 로직 유지)
    await new Promise((resolve) => setTimeout(resolve, 200));

    const order = mockOrders.find((o) => o.id === orderId);
    if (!order) {
      throw new Error(`주문을 찾을 수 없습니다. (ID: ${orderId})`);
    }

    return order;
  },
};

// 헬퍼 함수: 가게 ID로 가게명 가져오기
function getStoreName(storeId: number): string {
  const storeNames: Record<number, string> = {
    1: "맛있는 치킨집",
    2: "피자 마스터",
    3: "한식당 고향맛",
    4: "중화반점",
    5: "일식집 사쿠라",
  };
  return storeNames[storeId] || "알 수 없는 가게";
}
