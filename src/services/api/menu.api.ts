import { axiosInstance } from "../axios.config";
import type { StoreMenuResponse } from "@/types/menu.types";

// 임시로 여기서 타입 정의
interface ApiResponse<T> {
  result: {
    resultCode: number;
    resultMessage: string;
    resultDescription: string;
  };
  body: T;
}

export const menuApi = {
  // 가게 메뉴 조회 - Mock 데이터 우선 사용으로 안정성 확보
  getStoreMenus: async (storeId: number): Promise<StoreMenuResponse[]> => {
    // TODO: 백엔드 준비되면 실제 API 호출 활성화
    console.log("Store menus - Using mock data to avoid 400 errors");

    if (false) {
      // 실제 API 호출을 임시로 비활성화
      try {
        // 실제 API 호출 시도
        const response = await axiosInstance.get<
          ApiResponse<StoreMenuResponse[]>
        >(`/api/store-menu/search`, {
          params: { storeId },
        });
        return response.data.body;
      } catch (error) {
        console.warn("실제 API 호출 실패, Mock 데이터 사용:", error);
      }
    }

    // Mock 데이터 사용 (현재 기본 동작)
    const mockMenus: { [key: number]: StoreMenuResponse[] } = {
      1: [
        // 치킨집 메뉴
        {
          id: 1,
          store_id: 1,
          name: "후라이드 치킨",
          amount: 18000,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop&auto=format",
          like_count: 120,
          likeCount: 120,
          sequence: 1,
          // 프론트엔드 호환성
          storeId: 1,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop&auto=format",
          price: 18000,
        },
        {
          id: 2,
          store_id: 1,
          name: "양념 치킨",
          amount: 19000,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=400&h=300&fit=crop&auto=format",
          like_count: 98,
          likeCount: 98,
          sequence: 2,
          // 프론트엔드 호환성
          storeId: 1,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=400&h=300&fit=crop&auto=format",
          price: 19000,
        },
        {
          id: 3,
          store_id: 1,
          name: "치킨 무 세트",
          amount: 3000,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop&auto=format",
          like_count: 45,
          likeCount: 45,
          sequence: 3,
          // 프론트엔드 호환성
          storeId: 1,
          menuName: "치킨 무 세트",
          description: "바삭한 치킨과 시원한 무가 들어간 든든한 세트 메뉴",
          thumbnailUrl:
            "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop&auto=format",
          imageUrl:
            "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop&auto=format",
          price: 3000,
        },
      ],
      2: [
        // 피자집 메뉴
        {
          id: 4,
          store_id: 2,
          name: "마르게리타 피자",
          amount: 22000,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&auto=format",
          like_count: 85,
          likeCount: 85,
          sequence: 1,
          // 프론트엔드 호환성
          storeId: 2,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&auto=format",
          price: 22000,
        },
        {
          id: 5,
          store_id: 2,
          name: "페퍼로니 피자",
          amount: 25000,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop&auto=format",
          like_count: 110,
          likeCount: 110,
          sequence: 2,
          // 프론트엔드 호환성
          storeId: 2,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop&auto=format",
          price: 25000,
        },
        {
          id: 6,
          store_id: 2,
          name: "콜라 (1.25L)",
          amount: 3000,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=300&fit=crop&auto=format",
          like_count: 30,
          likeCount: 30,
          sequence: 3,
          // 프론트엔드 호환성
          storeId: 2,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=300&fit=crop&auto=format",
          price: 3000,
        },
      ],
      3: [
        // 한식당 메뉴
        {
          id: 7,
          store_id: 3,
          name: "김치찌개",
          amount: 8000,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1559847844-d721426d6edc?w=400&h=300&fit=crop&auto=format",
          like_count: 65,
          likeCount: 65,
          sequence: 1,
          // 프론트엔드 호환성
          storeId: 3,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1559847844-d721426d6edc?w=400&h=300&fit=crop&auto=format",
          price: 8000,
        },
        {
          id: 8,
          store_id: 3,
          name: "된장찌개",
          amount: 7000,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=400&h=300&fit=crop&auto=format",
          like_count: 55,
          likeCount: 55,
          sequence: 2,
          // 프론트엔드 호환성
          storeId: 3,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=400&h=300&fit=crop&auto=format",
          price: 7000,
        },
        {
          id: 9,
          store_id: 3,
          name: "비빔밥",
          amount: 9000,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=400&h=300&fit=crop&auto=format",
          like_count: 75,
          likeCount: 75,
          sequence: 3,
          // 프론트엔드 호환성
          storeId: 3,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=400&h=300&fit=crop&auto=format",
          price: 9000,
        },
        {
          id: 20,
          store_id: 3,
          name: "불고기",
          amount: 12000,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop&auto=format",
          like_count: 95,
          likeCount: 95,
          sequence: 4,
          // 프론트엔드 호환성
          storeId: 3,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop&auto=format",
          price: 12000,
        },
        {
          id: 21,
          store_id: 3,
          name: "공기밥",
          amount: 1000,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1586201375761-83865001e26c?w=400&h=300&fit=crop&auto=format",
          like_count: 20,
          likeCount: 20,
          sequence: 5,
          // 프론트엔드 호환성
          storeId: 3,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1586201375761-83865001e26c?w=400&h=300&fit=crop&auto=format",
          price: 1000,
        },
        {
          id: 30,
          store_id: 3,
          name: "갈비탕",
          amount: 13000,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=300&fit=crop&auto=format",
          like_count: 85,
          likeCount: 85,
          sequence: 6,
          // 프론트엔드 호환성
          storeId: 3,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=300&fit=crop&auto=format",
          price: 13000,
          imageUrl:
            "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=300&fit=crop&auto=format",
        },
        {
          id: 31,
          store_id: 3,
          name: "제육볶음",
          amount: 10000,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&h=300&fit=crop&auto=format",
          like_count: 78,
          likeCount: 78,
          sequence: 7,
          // 프론트엔드 호환성
          storeId: 3,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&h=300&fit=crop&auto=format",
          price: 10000,
          imageUrl:
            "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&h=300&fit=crop&auto=format",
        },
        {
          id: 32,
          store_id: 3,
          name: "삼계탕",
          amount: 15000,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=400&h=300&fit=crop&auto=format",
          like_count: 90,
          likeCount: 90,
          sequence: 8,
          // 프론트엔드 호환성
          storeId: 3,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=400&h=300&fit=crop&auto=format",
          price: 15000,
          imageUrl:
            "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=400&h=300&fit=crop&auto=format",
        },
        {
          id: 33,
          store_id: 3,
          name: "김치볶음밥",
          amount: 8500,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=400&h=300&fit=crop&auto=format",
          like_count: 65,
          likeCount: 65,
          sequence: 9,
          // 프론트엔드 호환성
          storeId: 3,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=400&h=300&fit=crop&auto=format",
          price: 8500,
          imageUrl:
            "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=400&h=300&fit=crop&auto=format",
        },
        {
          id: 34,
          store_id: 3,
          name: "순두부찌개",
          amount: 7500,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400&h=300&fit=crop&auto=format",
          like_count: 70,
          likeCount: 70,
          sequence: 10,
          // 프론트엔드 호환성
          storeId: 3,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400&h=300&fit=crop&auto=format",
          price: 7500,
          imageUrl:
            "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400&h=300&fit=crop&auto=format",
        },
        {
          id: 35,
          store_id: 3,
          name: "파전",
          amount: 12000,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1590031905406-f18a426d772d?w=400&h=300&fit=crop&auto=format",
          like_count: 60,
          likeCount: 60,
          sequence: 11,
          // 프론트엔드 호환성
          storeId: 3,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1590031905406-f18a426d772d?w=400&h=300&fit=crop&auto=format",
          price: 12000,
          imageUrl:
            "https://images.unsplash.com/photo-1590031905406-f18a426d772d?w=400&h=300&fit=crop&auto=format",
        },
        {
          id: 36,
          store_id: 3,
          name: "냉면",
          amount: 9000,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1582923443272-6270b7754c5a?w=400&h=300&fit=crop&auto=format",
          like_count: 80,
          likeCount: 80,
          sequence: 12,
          // 프론트엔드 호환성
          storeId: 3,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1582923443272-6270b7754c5a?w=400&h=300&fit=crop&auto=format",
          price: 9000,
          imageUrl:
            "https://images.unsplash.com/photo-1582923443272-6270b7754c5a?w=400&h=300&fit=crop&auto=format",
        },
        {
          id: 37,
          store_id: 3,
          name: "잡채",
          amount: 11000,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&auto=format",
          like_count: 72,
          likeCount: 72,
          sequence: 13,
          // 프론트엔드 호환성
          storeId: 3,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&auto=format",
          price: 11000,
          imageUrl:
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&auto=format",
        },
      ],
      8: [
        // 한식당 서울집 메뉴
        {
          id: 38,
          store_id: 8,
          name: "육개장",
          amount: 9500,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1606850975341-b2e92b3b3226?w=400&h=300&fit=crop&auto=format",
          like_count: 88,
          likeCount: 88,
          sequence: 1,
          storeId: 8,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1606850975341-b2e92b3b3226?w=400&h=300&fit=crop&auto=format",
          price: 9500,
          imageUrl:
            "https://images.unsplash.com/photo-1606850975341-b2e92b3b3226?w=400&h=300&fit=crop&auto=format",
        },
        {
          id: 39,
          store_id: 8,
          name: "된장찌개",
          amount: 7500,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=400&h=300&fit=crop&auto=format",
          like_count: 75,
          likeCount: 75,
          sequence: 2,
          storeId: 8,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=400&h=300&fit=crop&auto=format",
          price: 7500,
          imageUrl:
            "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=400&h=300&fit=crop&auto=format",
        },
        {
          id: 40,
          store_id: 8,
          name: "떡갈비",
          amount: 13500,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop&auto=format",
          like_count: 92,
          likeCount: 92,
          sequence: 3,
          storeId: 8,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop&auto=format",
          price: 13500,
          imageUrl:
            "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop&auto=format",
        },
      ],
      9: [
        // 한식당 정가네 메뉴
        {
          id: 41,
          store_id: 9,
          name: "한정식",
          amount: 18000,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop&auto=format",
          like_count: 95,
          likeCount: 95,
          sequence: 1,
          storeId: 9,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop&auto=format",
          price: 18000,
          imageUrl:
            "https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop&auto=format",
        },
        {
          id: 42,
          store_id: 9,
          name: "갈비찜",
          amount: 16000,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=300&fit=crop&auto=format",
          like_count: 100,
          likeCount: 100,
          sequence: 2,
          storeId: 9,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=300&fit=crop&auto=format",
          price: 16000,
          imageUrl:
            "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=300&fit=crop&auto=format",
        },
        {
          id: 43,
          store_id: 9,
          name: "보쌈",
          amount: 14000,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&auto=format",
          like_count: 85,
          likeCount: 85,
          sequence: 3,
          storeId: 9,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&auto=format",
          price: 14000,
          imageUrl:
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&auto=format",
        },
      ],
      10: [
        // 중화반점 황금성 메뉴
        {
          id: 44,
          store_id: 10,
          name: "탕수육",
          amount: 18000,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&h=300&fit=crop&auto=format",
          like_count: 120,
          likeCount: 120,
          sequence: 1,
          storeId: 10,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&h=300&fit=crop&auto=format",
          price: 18000,
          imageUrl:
            "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&h=300&fit=crop&auto=format",
        },
        {
          id: 45,
          store_id: 10,
          name: "마파두부",
          amount: 14000,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400&h=300&fit=crop&auto=format",
          like_count: 85,
          likeCount: 85,
          sequence: 2,
          storeId: 10,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400&h=300&fit=crop&auto=format",
          price: 14000,
          imageUrl:
            "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400&h=300&fit=crop&auto=format",
        },
        {
          id: 46,
          store_id: 10,
          name: "깐풍기",
          amount: 16000,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop&auto=format",
          like_count: 95,
          likeCount: 95,
          sequence: 3,
          storeId: 10,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop&auto=format",
          price: 16000,
          imageUrl:
            "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop&auto=format",
        },
      ],
      11: [
        // 중화반점 만리장성 메뉴
        {
          id: 47,
          store_id: 11,
          name: "울면",
          amount: 7500,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop&auto=format",
          like_count: 70,
          likeCount: 70,
          sequence: 1,
          storeId: 11,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop&auto=format",
          price: 7500,
          imageUrl:
            "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop&auto=format",
        },
        {
          id: 48,
          store_id: 11,
          name: "양장피",
          amount: 15000,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400&h=300&fit=crop&auto=format",
          like_count: 80,
          likeCount: 80,
          sequence: 2,
          storeId: 11,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400&h=300&fit=crop&auto=format",
          price: 15000,
          imageUrl:
            "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400&h=300&fit=crop&auto=format",
        },
        {
          id: 49,
          store_id: 11,
          name: "고추잡채",
          amount: 13000,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&auto=format",
          like_count: 75,
          likeCount: 75,
          sequence: 3,
          storeId: 11,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&auto=format",
          price: 13000,
          imageUrl:
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&auto=format",
        },
      ],
      12: [
        // 일식집 도쿄 메뉴
        {
          id: 50,
          store_id: 12,
          name: "연어 초밥",
          amount: 22000,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop&auto=format",
          like_count: 110,
          likeCount: 110,
          sequence: 1,
          storeId: 12,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop&auto=format",
          price: 22000,
          imageUrl:
            "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop&auto=format",
        },
        {
          id: 51,
          store_id: 12,
          name: "라멘",
          amount: 12000,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop&auto=format",
          like_count: 95,
          likeCount: 95,
          sequence: 2,
          storeId: 12,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop&auto=format",
          price: 12000,
          imageUrl:
            "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop&auto=format",
        },
        {
          id: 52,
          store_id: 12,
          name: "덴푸라",
          amount: 18000,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=400&h=300&fit=crop&auto=format",
          like_count: 85,
          likeCount: 85,
          sequence: 3,
          storeId: 12,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=400&h=300&fit=crop&auto=format",
          price: 18000,
          imageUrl:
            "https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=400&h=300&fit=crop&auto=format",
        },
      ],
      13: [
        // 일식집 오사카 메뉴
        {
          id: 53,
          store_id: 13,
          name: "모듬 사시미",
          amount: 25000,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=300&fit=crop&auto=format",
          like_count: 130,
          likeCount: 130,
          sequence: 1,
          storeId: 13,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=300&fit=crop&auto=format",
          price: 25000,
          imageUrl:
            "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=300&fit=crop&auto=format",
        },
        {
          id: 54,
          store_id: 13,
          name: "우동",
          amount: 9000,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop&auto=format",
          like_count: 65,
          likeCount: 65,
          sequence: 2,
          storeId: 13,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop&auto=format",
          price: 9000,
          imageUrl:
            "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop&auto=format",
        },
        {
          id: 55,
          store_id: 13,
          name: "치킨 가라아게",
          amount: 14000,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop&auto=format",
          like_count: 90,
          likeCount: 90,
          sequence: 3,
          storeId: 13,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop&auto=format",
          price: 14000,
          imageUrl:
            "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop&auto=format",
        },
      ],
      14: [
        // 카페 블루문 메뉴
        {
          id: 56,
          store_id: 14,
          name: "아메리카노",
          amount: 4500,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop&auto=format",
          like_count: 85,
          likeCount: 85,
          sequence: 1,
          storeId: 14,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop&auto=format",
          price: 4500,
          imageUrl:
            "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop&auto=format",
        },
        {
          id: 57,
          store_id: 14,
          name: "카페라떼",
          amount: 5500,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop&auto=format",
          like_count: 95,
          likeCount: 95,
          sequence: 2,
          storeId: 14,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop&auto=format",
          price: 5500,
          imageUrl:
            "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop&auto=format",
        },
        {
          id: 58,
          store_id: 14,
          name: "초콜릿 케이크",
          amount: 7000,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop&auto=format",
          like_count: 110,
          likeCount: 110,
          sequence: 3,
          storeId: 14,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop&auto=format",
          price: 7000,
          imageUrl:
            "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop&auto=format",
        },
        {
          id: 59,
          store_id: 14,
          name: "크로와상",
          amount: 5000,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1549312185-4c4e3f0b3ae6?w=400&h=300&fit=crop&auto=format",
          like_count: 70,
          likeCount: 70,
          sequence: 4,
          storeId: 14,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1549312185-4c4e3f0b3ae6?w=400&h=300&fit=crop&auto=format",
          price: 5000,
          imageUrl:
            "https://images.unsplash.com/photo-1549312185-4c4e3f0b3ae6?w=400&h=300&fit=crop&auto=format",
        },
      ],
      15: [
        // 카페 그린빈 메뉴
        {
          id: 60,
          store_id: 15,
          name: "에스프레소",
          amount: 3500,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&h=300&fit=crop&auto=format",
          like_count: 50,
          likeCount: 50,
          sequence: 1,
          storeId: 15,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&h=300&fit=crop&auto=format",
          price: 3500,
          imageUrl:
            "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&h=300&fit=crop&auto=format",
        },
        {
          id: 61,
          store_id: 15,
          name: "카푸치노",
          amount: 6000,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop&auto=format",
          like_count: 80,
          likeCount: 80,
          sequence: 2,
          storeId: 15,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop&auto=format",
          price: 6000,
          imageUrl:
            "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop&auto=format",
        },
        {
          id: 62,
          store_id: 15,
          name: "티라미수",
          amount: 8500,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop&auto=format",
          like_count: 120,
          likeCount: 120,
          sequence: 3,
          storeId: 15,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop&auto=format",
          price: 8500,
          imageUrl:
            "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop&auto=format",
        },
        {
          id: 63,
          store_id: 15,
          name: "치즈케이크",
          amount: 7500,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=300&fit=crop&auto=format",
          like_count: 100,
          likeCount: 100,
          sequence: 4,
          storeId: 15,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=300&fit=crop&auto=format",
          price: 7500,
          imageUrl:
            "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=300&fit=crop&auto=format",
        },
      ],
      4: [
        // 중화반점 메뉴
        {
          id: 10,
          store_id: 4,
          name: "짜장면",
          amount: 6000,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop&auto=format",
          like_count: 95,
          likeCount: 95,
          sequence: 1,
          // 프론트엔드 호환성
          storeId: 4,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop&auto=format",
          price: 6000,
        },
        {
          id: 11,
          store_id: 4,
          name: "짬뽕",
          amount: 7000,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop&auto=format",
          like_count: 88,
          likeCount: 88,
          sequence: 2,
          // 프론트엔드 호환성
          storeId: 4,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop&auto=format",
          price: 7000,
        },
        {
          id: 12,
          store_id: 4,
          name: "탕수육 (소)",
          amount: 15000,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop&auto=format",
          like_count: 72,
          likeCount: 72,
          sequence: 3,
          // 프론트엔드 호환성
          storeId: 4,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop&auto=format",
          price: 15000,
        },
        {
          id: 22,
          store_id: 4,
          name: "볶음밥",
          amount: 8000,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop&auto=format",
          like_count: 65,
          likeCount: 65,
          sequence: 4,
          // 프론트엔드 호환성
          storeId: 4,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop&auto=format",
          price: 8000,
        },
        {
          id: 23,
          store_id: 4,
          name: "마파두부",
          amount: 12000,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop&auto=format",
          like_count: 55,
          likeCount: 55,
          sequence: 5,
          // 프론트엔드 호환성
          storeId: 4,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop&auto=format",
          price: 12000,
        },
      ],
      5: [
        // 일식집 메뉴
        {
          id: 13,
          store_id: 5,
          name: "연어 초밥 세트",
          amount: 28000,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=300&fit=crop&auto=format",
          like_count: 150,
          likeCount: 150,
          sequence: 1,
          // 프론트엔드 호환성
          storeId: 5,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=300&fit=crop&auto=format",
          price: 28000,
        },
        {
          id: 14,
          store_id: 5,
          name: "참치 사시미",
          amount: 35000,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop&auto=format",
          like_count: 125,
          likeCount: 125,
          sequence: 2,
          // 프론트엔드 호환성
          storeId: 5,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop&auto=format",
          price: 35000,
        },
        {
          id: 24,
          store_id: 5,
          name: "텐동",
          amount: 15000,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1576466213444-631c98e8cee9?w=400&h=300&fit=crop&auto=format",
          like_count: 85,
          likeCount: 85,
          sequence: 3,
          // 프론트엔드 호환성
          storeId: 5,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1576466213444-631c98e8cee9?w=400&h=300&fit=crop&auto=format",
          price: 15000,
        },
        {
          id: 25,
          store_id: 5,
          name: "규동",
          amount: 12000,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop&auto=format",
          like_count: 95,
          likeCount: 95,
          sequence: 4,
          // 프론트엔드 호환성
          storeId: 5,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop&auto=format",
          price: 12000,
        },
        {
          id: 26,
          store_id: 5,
          name: "우동",
          amount: 9000,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1618841557871-b4664fbf0cb3?w=400&h=300&fit=crop&auto=format",
          like_count: 70,
          likeCount: 70,
          sequence: 5,
          // 프론트엔드 호환성
          storeId: 5,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1618841557871-b4664fbf0cb3?w=400&h=300&fit=crop&auto=format",
          price: 9000,
        },
      ],
      6: [
        // 버거킹 메뉴
        {
          id: 15,
          store_id: 6,
          name: "와퍼",
          amount: 8000,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&auto=format",
          like_count: 80,
          likeCount: 80,
          sequence: 1,
          // 프론트엔드 호환성
          storeId: 6,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&auto=format",
          price: 8000,
        },
        {
          id: 16,
          store_id: 6,
          name: "감자튀김",
          amount: 3000,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop&auto=format",
          like_count: 45,
          likeCount: 45,
          sequence: 2,
          // 프론트엔드 호환성
          storeId: 6,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop&auto=format",
          price: 3000,
        },
      ],
      7: [
        // 카페 메뉴
        {
          id: 17,
          store_id: 7,
          name: "아메리카노",
          amount: 4000,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop&auto=format",
          like_count: 60,
          likeCount: 60,
          sequence: 1,
          // 프론트엔드 호환성
          storeId: 7,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop&auto=format",
          price: 4000,
        },
        {
          id: 18,
          store_id: 7,
          name: "카페라떼",
          amount: 4500,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1549007953-2f2dc0b24019?w=400&h=300&fit=crop&auto=format",
          like_count: 50,
          likeCount: 50,
          sequence: 2,
          // 프론트엔드 호환성
          storeId: 7,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1549007953-2f2dc0b24019?w=400&h=300&fit=crop&auto=format",
          price: 4500,
        },
        {
          id: 19,
          store_id: 7,
          name: "치즈케이크",
          amount: 6000,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop&auto=format",
          like_count: 35,
          likeCount: 35,
          sequence: 3,
          // 프론트엔드 호환성
          storeId: 7,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop&auto=format",
          price: 6000,
        },
        {
          id: 27,
          store_id: 7,
          name: "에스프레소",
          amount: 3500,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&h=300&fit=crop&auto=format",
          like_count: 40,
          likeCount: 40,
          sequence: 4,
          // 프론트엔드 호환성
          storeId: 7,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&h=300&fit=crop&auto=format",
          price: 3500,
        },
        {
          id: 28,
          store_id: 7,
          name: "카푸치노",
          amount: 4500,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop&auto=format",
          like_count: 55,
          likeCount: 55,
          sequence: 5,
          // 프론트엔드 호환성
          storeId: 7,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop&auto=format",
          price: 4500,
        },
        {
          id: 29,
          store_id: 7,
          name: "크로와상",
          amount: 3500,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1549312185-4c4e3f0b3ae6?w=400&h=300&fit=crop&auto=format",
          like_count: 45,
          likeCount: 45,
          sequence: 6,
          // 프론트엔드 호환성
          storeId: 7,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1549312185-4c4e3f0b3ae6?w=400&h=300&fit=crop&auto=format",
          imageUrl:
            "https://images.unsplash.com/photo-1549312185-4c4e3f0b3ae6?w=400&h=300&fit=crop&auto=format",
          price: 3500,
        },
        {
          id: 30,
          store_id: 7,
          name: "블루베리 머핀",
          amount: 4000,
          status: "REGISTERED",
          thumbnail_url:
            "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop&auto=format",
          like_count: 38,
          likeCount: 38,
          sequence: 7,
          // 프론트엔드 호환성
          storeId: 7,
          thumbnailUrl:
            "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop&auto=format",
          price: 4000,
        },
      ],
    };

    // 해당 가게의 메뉴 반환, 없으면 빈 배열 (fallback)
    return mockMenus[storeId] || [];
  },
};
