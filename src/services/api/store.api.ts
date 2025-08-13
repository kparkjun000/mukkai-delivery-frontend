import { axiosInstance } from "../axios.config";
import type { StoreResponse } from "@/types/store.types";

// 임시로 여기서 타입 정의
interface ApiResponse<T> {
  result: {
    resultCode: number;
    resultMessage: string;
    resultDescription: string;
  };
  body: T;
}

export const storeApi = {
  // 가게 검색 API - Mock 데이터 우선 사용으로 안정성 확보
  search: async (category?: string): Promise<StoreResponse[]> => {
    // TODO: 백엔드 준비되면 실제 API 호출 활성화
    console.log("Store search - Using mock data to avoid 400 errors");

    if (false) {
      // 실제 API 호출을 임시로 비활성화
      try {
        // 실제 API 호출 시도
        const response = await axiosInstance.get<ApiResponse<StoreResponse[]>>(
          "/api/store/search",
          {
            params: category && category !== "ALL" ? { category } : {},
          }
        );
        return response.data.body;
      } catch (error) {
        console.warn("실제 API 호출 실패, Mock 데이터 사용:", error);
      }
    }

    // Mock 데이터 사용 (현재 기본 동작)
    const mockStores: StoreResponse[] = [
      {
        id: 1,
        store_id: 1,
        storeName: "맛있는 치킨집",
        name: "맛있는 치킨집",
        address: "서울시 강남구 역삼동 123-45",
        status: "REGISTERED",
        category: "CHICKEN",
        star: 4.5,
        thumbnail_url:
          "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop&auto=format",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop&auto=format",
        minimum_amount: 15000,
        minimum_delivery_amount: 3000,
        minimumAmount: 15000,
        minimumDeliveryAmount: 3000,
        phone_number: "02-1234-5678",
        phoneNumber: "02-1234-5678",
        // 프론트엔드 호환성
        rating: 4.5,
        imageUrl:
          "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop&auto=format",
        minOrderAmount: 15000,
        deliveryTime: "30-40분",
        isOpen: true,
        description: "바삭하고 맛있는 치킨을 제공합니다.",
        phone: "02-1234-5678",
        deliveryFee: 3000,
      },
      {
        id: 2,
        store_id: 2,
        storeName: "피자나라 치킨공주",
        name: "피자나라 치킨공주",
        address: "서울시 서초구 서초동 567-89",
        status: "REGISTERED",
        category: "PIZZA",
        star: 4.2,
        thumbnail_url:
          "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&auto=format",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&auto=format",
        minimum_amount: 20000,
        minimum_delivery_amount: 3500,
        minimumAmount: 20000,
        minimumDeliveryAmount: 3500,
        phone_number: "02-9876-5432",
        phoneNumber: "02-9876-5432",
        // 프론트엔드 호환성
        rating: 4.2,
        imageUrl:
          "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&auto=format",
        minOrderAmount: 20000,
        deliveryTime: "25-35분",
        isOpen: true,
        description: "신선한 재료로 만든 수제 피자",
        phone: "02-9876-5432",
        deliveryFee: 3500,
      },
      {
        id: 3,
        store_id: 3,
        storeName: "한식당 고향맛",
        name: "한식당 고향맛",
        address: "서울시 종로구 종로 789",
        status: "REGISTERED",
        category: "KOREAN",
        star: 4.3,
        thumbnail_url:
          "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=400&h=300&fit=crop&auto=format",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=400&h=300&fit=crop&auto=format",
        minimum_amount: 12000,
        minimum_delivery_amount: 3500,
        minimumAmount: 12000,
        minimumDeliveryAmount: 3500,
        phone_number: "02-3456-7890",
        phoneNumber: "02-3456-7890",
        // 프론트엔드 호환성
        rating: 4.3,
        imageUrl:
          "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=400&h=300&fit=crop&auto=format",
        minOrderAmount: 12000,
        deliveryTime: "35-45분",
        isOpen: true,
        description: "엄마가 해주는 따뜻한 한식",
        phone: "02-3456-7890",
        deliveryFee: 3500,
      },
      {
        id: 8,
        store_id: 8,
        storeName: "한식당 서울집",
        name: "한식당 서울집",
        address: "서울시 중구 명동길 123-45",
        status: "REGISTERED",
        category: "KOREAN",
        star: 4.4,
        thumbnail_url:
          "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=300&fit=crop&auto=format",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=300&fit=crop&auto=format",
        minimum_amount: 10000,
        minimum_delivery_amount: 3000,
        minimumAmount: 10000,
        minimumDeliveryAmount: 3000,
        phone_number: "02-7777-8888",
        phoneNumber: "02-7777-8888",
        // 프론트엔드 호환성
        rating: 4.4,
        imageUrl:
          "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=300&fit=crop&auto=format",
        minOrderAmount: 10000,
        deliveryTime: "30-40분",
        isOpen: true,
        description: "전통 한식의 깊은 맛",
        phone: "02-7777-8888",
        deliveryFee: 3000,
      },
      {
        id: 9,
        store_id: 9,
        storeName: "한식당 정가네",
        name: "한식당 정가네",
        address: "서울시 서초구 반포대로 567",
        status: "REGISTERED",
        category: "KOREAN",
        star: 4.5,
        thumbnail_url:
          "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=300&fit=crop&auto=format",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=300&fit=crop&auto=format",
        minimum_amount: 11000,
        minimum_delivery_amount: 3500,
        minimumAmount: 11000,
        minimumDeliveryAmount: 3500,
        phone_number: "02-9999-0000",
        phoneNumber: "02-9999-0000",
        // 프론트엔드 호환성
        rating: 4.5,
        imageUrl:
          "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=300&fit=crop&auto=format",
        minOrderAmount: 11000,
        deliveryTime: "25-35분",
        isOpen: true,
        description: "집밥 같은 푸근한 한식",
        phone: "02-9999-0000",
        deliveryFee: 3500,
      },
      {
        id: 4,
        store_id: 4,
        storeName: "중화반점",
        name: "중화반점",
        address: "서울시 마포구 홍대입구로 321",
        status: "REGISTERED",
        category: "CHINESE",
        star: 4.2,
        thumbnail_url:
          "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400&h=300&fit=crop&auto=format",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400&h=300&fit=crop&auto=format",
        minimum_amount: 15000,
        minimum_delivery_amount: 2000,
        minimumAmount: 15000,
        minimumDeliveryAmount: 2000,
        phone_number: "02-4567-8901",
        phoneNumber: "02-4567-8901",
        // 프론트엔드 호환성
        rating: 4.2,
        imageUrl:
          "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400&h=300&fit=crop&auto=format",
        minOrderAmount: 15000,
        deliveryTime: "20-30분",
        isOpen: true,
        description: "정통 중화요리의 진수",
        phone: "02-4567-8901",
        deliveryFee: 2000,
      },
      {
        id: 10,
        store_id: 10,
        storeName: "중화반점 황금성",
        name: "중화반점 황금성",
        address: "서울시 용산구 이태원로 789",
        status: "REGISTERED",
        category: "CHINESE",
        star: 4.3,
        thumbnail_url:
          "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop&auto=format",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop&auto=format",
        minimum_amount: 12000,
        minimum_delivery_amount: 2500,
        minimumAmount: 12000,
        minimumDeliveryAmount: 2500,
        phone_number: "02-1111-2222",
        phoneNumber: "02-1111-2222",
        // 프론트엔드 호환성
        rating: 4.3,
        imageUrl:
          "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop&auto=format",
        minOrderAmount: 12000,
        deliveryTime: "25-35분",
        isOpen: true,
        description: "정통 중화요리 전문점",
        phone: "02-1111-2222",
        deliveryFee: 2500,
      },
      {
        id: 11,
        store_id: 11,
        storeName: "중화반점 만리장성",
        name: "중화반점 만리장성",
        address: "서울시 영등포구 여의도동 456",
        status: "REGISTERED",
        category: "CHINESE",
        star: 4.1,
        thumbnail_url:
          "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400&h=300&fit=crop&auto=format",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400&h=300&fit=crop&auto=format",
        minimum_amount: 13000,
        minimum_delivery_amount: 3000,
        minimumAmount: 13000,
        minimumDeliveryAmount: 3000,
        phone_number: "02-3333-4444",
        phoneNumber: "02-3333-4444",
        // 프론트엔드 호환성
        rating: 4.1,
        imageUrl:
          "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400&h=300&fit=crop&auto=format",
        minOrderAmount: 13000,
        deliveryTime: "30-40분",
        isOpen: true,
        description: "깔끔한 중화요리",
        phone: "02-3333-4444",
        deliveryFee: 3000,
      },
      {
        id: 5,
        store_id: 5,
        storeName: "일식집 스시로",
        name: "일식집 스시로",
        address: "서울시 강남구 논현로 456",
        status: "REGISTERED",
        category: "JAPANESE",
        star: 4.6,
        thumbnail_url:
          "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=300&fit=crop&auto=format",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=300&fit=crop&auto=format",
        minimum_amount: 25000,
        minimum_delivery_amount: 4000,
        minimumAmount: 25000,
        minimumDeliveryAmount: 4000,
        phone_number: "02-5678-9012",
        phoneNumber: "02-5678-9012",
        // 프론트엔드 호환성
        rating: 4.6,
        imageUrl:
          "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=300&fit=crop&auto=format",
        minOrderAmount: 25000,
        deliveryTime: "40-50분",
        isOpen: true,
        description: "신선한 회와 초밥 전문점",
        phone: "02-5678-9012",
        deliveryFee: 4000,
      },
      {
        id: 6,
        store_id: 6,
        storeName: "버거킹",
        name: "버거킹",
        address: "서울시 마포구 홍대입구역 111-22",
        status: "UNREGISTERED",
        category: "HAMBURGER",
        star: 4.0,
        thumbnail_url:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&auto=format",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&auto=format",
        minimum_amount: 10000,
        minimum_delivery_amount: 2500,
        minimumAmount: 10000,
        minimumDeliveryAmount: 2500,
        phone_number: "02-5555-1234",
        phoneNumber: "02-5555-1234",
        // 프론트엔드 호환성
        rating: 4.0,
        imageUrl:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&auto=format",
        minOrderAmount: 10000,
        deliveryTime: "20-30분",
        isOpen: false,
        description: "프리미엄 햄버거 전문점",
        phone: "02-5555-1234",
        deliveryFee: 2500,
      },
      {
        id: 7,
        store_id: 7,
        storeName: "카페 드롭탑",
        name: "카페 드롭탑",
        address: "서울시 성동구 성수동 654",
        status: "REGISTERED",
        category: "COFFEE",
        star: 4.4,
        thumbnail_url:
          "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop&auto=format",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop&auto=format",
        minimum_amount: 8000,
        minimum_delivery_amount: 2000,
        minimumAmount: 8000,
        minimumDeliveryAmount: 2000,
        phone_number: "02-6789-0123",
        phoneNumber: "02-6789-0123",
        // 프론트엔드 호환성
        rating: 4.4,
        imageUrl:
          "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop&auto=format",
        minOrderAmount: 8000,
        deliveryTime: "15-25분",
        isOpen: true,
        description: "신선한 원두로 내린 커피와 디저트",
        phone: "02-6789-0123",
        deliveryFee: 2000,
      },
      {
        id: 12,
        store_id: 12,
        storeName: "일식집 도쿄",
        name: "일식집 도쿄",
        address: "서울시 서초구 서초대로 321",
        status: "REGISTERED",
        category: "JAPANESE",
        star: 4.7,
        thumbnail_url:
          "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop&auto=format",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop&auto=format",
        minimum_amount: 20000,
        minimum_delivery_amount: 4000,
        minimumAmount: 20000,
        minimumDeliveryAmount: 4000,
        phone_number: "02-5555-6666",
        phoneNumber: "02-5555-6666",
        // 프론트엔드 호환성
        rating: 4.7,
        imageUrl:
          "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop&auto=format",
        minOrderAmount: 20000,
        deliveryTime: "40-50분",
        isOpen: true,
        description: "정통 일본 요리",
        phone: "02-5555-6666",
        deliveryFee: 4000,
      },
      {
        id: 13,
        store_id: 13,
        storeName: "일식집 오사카",
        name: "일식집 오사카",
        address: "서울시 송파구 올림픽로 654",
        status: "REGISTERED",
        category: "JAPANESE",
        star: 4.4,
        thumbnail_url:
          "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=300&fit=crop&auto=format",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=300&fit=crop&auto=format",
        minimum_amount: 18000,
        minimum_delivery_amount: 3500,
        minimumAmount: 18000,
        minimumDeliveryAmount: 3500,
        phone_number: "02-7777-8888",
        phoneNumber: "02-7777-8888",
        // 프론트엔드 호환성
        rating: 4.4,
        imageUrl:
          "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=300&fit=crop&auto=format",
        minOrderAmount: 18000,
        deliveryTime: "35-45분",
        isOpen: true,
        description: "신선한 회와 초밥",
        phone: "02-7777-8888",
        deliveryFee: 3500,
      },
      {
        id: 14,
        store_id: 14,
        storeName: "카페 블루문",
        name: "카페 블루문",
        address: "서울시 마포구 홍대입구역로 123",
        status: "REGISTERED",
        category: "CAFE",
        star: 4.5,
        thumbnail_url:
          "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop&auto=format",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop&auto=format",
        minimum_amount: 8000,
        minimum_delivery_amount: 2000,
        minimumAmount: 8000,
        minimumDeliveryAmount: 2000,
        phone_number: "02-9999-0000",
        phoneNumber: "02-9999-0000",
        // 프론트엔드 호환성
        rating: 4.5,
        imageUrl:
          "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop&auto=format",
        minOrderAmount: 8000,
        deliveryTime: "15-25분",
        isOpen: true,
        description: "향긋한 원두커피와 디저트",
        phone: "02-9999-0000",
        deliveryFee: 2000,
      },
      {
        id: 15,
        store_id: 15,
        storeName: "카페 그린빈",
        name: "카페 그린빈",
        address: "서울시 강남구 테헤란로 987",
        status: "REGISTERED",
        category: "CAFE",
        star: 4.2,
        thumbnail_url:
          "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop&auto=format",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop&auto=format",
        minimum_amount: 10000,
        minimum_delivery_amount: 2500,
        minimumAmount: 10000,
        minimumDeliveryAmount: 2500,
        phone_number: "02-1010-2020",
        phoneNumber: "02-1010-2020",
        // 프론트엔드 호환성
        rating: 4.2,
        imageUrl:
          "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop&auto=format",
        minOrderAmount: 10000,
        deliveryTime: "20-30분",
        isOpen: true,
        description: "프리미엄 커피와 수제 케이크",
        phone: "02-1010-2020",
        deliveryFee: 2500,
      },
    ];

    // 카테고리 필터링 (fallback)
    if (category && category !== "ALL") {
      console.log("Filtering by category:", category);

      // StoreCategory enum을 mock 데이터 카테고리로 매핑
      const categoryMap: { [key: string]: string } = {
        KOREAN_FOOD: "KOREAN",
        CHINESE_FOOD: "CHINESE",
        JAPANESE_FOOD: "JAPANESE",
        COFFEE_TEA: "CAFE",
      };

      const mappedCategory = categoryMap[category] || category;
      console.log("Mapped category:", mappedCategory);

      const filtered = mockStores.filter(
        (store) => store.category === mappedCategory
      );
      console.log(
        "Filtered stores:",
        filtered.length,
        "out of",
        mockStores.length
      );
      console.log(
        "Store categories:",
        mockStores.map((s) => ({ name: s.name, category: s.category }))
      );

      return filtered;
    }

    return mockStores;
  },

  // 특정 가게 상세 조회 - Mock 데이터 우선 사용으로 안정성 확보
  getStoreDetail: async (storeId: number): Promise<StoreResponse> => {
    // TODO: 백엔드 준비되면 실제 API 호출 활성화
    console.log("Store detail - Using mock data to avoid 400 errors");

    if (false) {
      // 실제 API 호출을 임시로 비활성화
      try {
        // 실제 API 호출 시도
        const response = await axiosInstance.get<ApiResponse<StoreResponse>>(
          `/api/store/${storeId}`
        );
        return response.data.body;
      } catch (error) {
        console.warn("실제 API 호출 실패, Mock 데이터 사용:", error);
      }
    }

    // Mock 데이터에서 해당 가게 찾기 (현재 기본 동작)
    const allStores = await storeApi.search(); // 위의 Mock 데이터 재사용
    const store = allStores.find((s) => s.id === storeId);

    if (!store) {
      throw new Error(`가게를 찾을 수 없습니다. (ID: ${storeId})`);
    }

    return store;
  },

  // 가게 등록 (점주용 - 나중에 구현)
  // register: async (data: StoreRegisterRequest): Promise<StoreResponse> => {
  //   const response = await axiosInstance.post<ApiResponse<StoreResponse>>(
  //     '/open-api/store/register',
  //     { body: data }
  //   );
  //   return response.data.body;
  // }
};
