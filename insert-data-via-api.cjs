// Node.js CommonJS script to insert all mock data to Railway backend
const axios = require('axios');

const API_URL = 'https://web-production-274dd.up.railway.app';

// Store data
const stores = [
  {
    storeName: "맛있는 치킨집",
    address: "서울시 강남구 역삼동 123-45",
    category: "CHICKEN",
    phoneNumber: "02-1234-5678",
    minimumAmount: 15000,
    minimumDeliveryAmount: 3000,
    description: "바삭하고 맛있는 치킨을 제공합니다."
  },
  {
    storeName: "피자나라 치킨공주",
    address: "서울시 서초구 서초동 567-89",
    category: "PIZZA",
    phoneNumber: "02-9876-5432",
    minimumAmount: 20000,
    minimumDeliveryAmount: 3500,
    description: "신선한 재료로 만든 수제 피자"
  },
  {
    storeName: "한식당 고향맛",
    address: "서울시 종로구 종로 789",
    category: "KOREAN",
    phoneNumber: "02-3456-7890",
    minimumAmount: 12000,
    minimumDeliveryAmount: 3500,
    description: "엄마가 해주는 따뜻한 한식"
  },
  {
    storeName: "중화반점",
    address: "서울시 마포구 홍대입구로 321",
    category: "CHINESE",
    phoneNumber: "02-4567-8901",
    minimumAmount: 15000,
    minimumDeliveryAmount: 2000,
    description: "정통 중화요리의 진수"
  },
  {
    storeName: "일식집 스시로",
    address: "서울시 강남구 논현로 456",
    category: "JAPANESE",
    phoneNumber: "02-5678-9012",
    minimumAmount: 25000,
    minimumDeliveryAmount: 4000,
    description: "신선한 회와 초밥 전문점"
  },
  {
    storeName: "버거킹",
    address: "서울시 마포구 홍대입구역 111-22",
    category: "HAMBURGER",
    phoneNumber: "02-5555-1234",
    minimumAmount: 10000,
    minimumDeliveryAmount: 2500,
    description: "프리미엄 햄버거 전문점"
  },
  {
    storeName: "카페 드롭탑",
    address: "서울시 성동구 성수동 654",
    category: "COFFEE",
    phoneNumber: "02-6789-0123",
    minimumAmount: 8000,
    minimumDeliveryAmount: 2000,
    description: "신선한 원두로 내린 커피와 디저트"
  },
  {
    storeName: "한식당 서울집",
    address: "서울시 중구 명동길 123-45",
    category: "KOREAN",
    phoneNumber: "02-7777-8888",
    minimumAmount: 10000,
    minimumDeliveryAmount: 3000,
    description: "전통 한식의 깊은 맛"
  },
  {
    storeName: "한식당 정가네",
    address: "서울시 서초구 반포대로 567",
    category: "KOREAN",
    phoneNumber: "02-9999-0000",
    minimumAmount: 11000,
    minimumDeliveryAmount: 3500,
    description: "집밥 같은 푸근한 한식"
  },
  {
    storeName: "중화반점 황금성",
    address: "서울시 용산구 이태원로 789",
    category: "CHINESE",
    phoneNumber: "02-1111-2222",
    minimumAmount: 12000,
    minimumDeliveryAmount: 2500,
    description: "정통 중화요리 전문점"
  },
  {
    storeName: "중화반점 만리장성",
    address: "서울시 영등포구 여의도동 456",
    category: "CHINESE",
    phoneNumber: "02-3333-4444",
    minimumAmount: 13000,
    minimumDeliveryAmount: 3000,
    description: "깔끔한 중화요리"
  },
  {
    storeName: "일식집 도쿄",
    address: "서울시 서초구 서초대로 321",
    category: "JAPANESE",
    phoneNumber: "02-5555-6666",
    minimumAmount: 20000,
    minimumDeliveryAmount: 4000,
    description: "정통 일본 요리"
  },
  {
    storeName: "일식집 오사카",
    address: "서울시 송파구 올림픽로 654",
    category: "JAPANESE",
    phoneNumber: "02-7777-8888",
    minimumAmount: 18000,
    minimumDeliveryAmount: 3500,
    description: "신선한 회와 초밥"
  },
  {
    storeName: "카페 블루문",
    address: "서울시 마포구 홍대입구역로 123",
    category: "CAFE",
    phoneNumber: "02-9999-0000",
    minimumAmount: 8000,
    minimumDeliveryAmount: 2000,
    description: "향긋한 원두커피와 디저트"
  },
  {
    storeName: "카페 그린빈",
    address: "서울시 강남구 테헤란로 987",
    category: "CAFE",
    phoneNumber: "02-1010-2020",
    minimumAmount: 10000,
    minimumDeliveryAmount: 2500,
    description: "프리미엄 커피와 수제 케이크"
  }
];

// Menu data by store
const menus = {
  1: [ // 맛있는 치킨집
    { name: "후라이드 치킨", amount: 18000, thumbnailUrl: "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop&auto=format" },
    { name: "양념 치킨", amount: 19000, thumbnailUrl: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=400&h=300&fit=crop&auto=format" },
    { name: "치킨 무 세트", amount: 3000, thumbnailUrl: "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop&auto=format" }
  ],
  2: [ // 피자나라 치킨공주
    { name: "마르게리타 피자", amount: 22000, thumbnailUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&auto=format" },
    { name: "페퍼로니 피자", amount: 25000, thumbnailUrl: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop&auto=format" },
    { name: "콜라 (1.25L)", amount: 3000, thumbnailUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=300&fit=crop&auto=format" }
  ],
  3: [ // 한식당 고향맛
    { name: "김치찌개", amount: 8000, thumbnailUrl: "https://images.unsplash.com/photo-1559847844-d721426d6edc?w=400&h=300&fit=crop&auto=format" },
    { name: "된장찌개", amount: 7000, thumbnailUrl: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=400&h=300&fit=crop&auto=format" },
    { name: "비빔밥", amount: 9000, thumbnailUrl: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=400&h=300&fit=crop&auto=format" },
    { name: "불고기", amount: 12000, thumbnailUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop&auto=format" },
    { name: "공기밥", amount: 1000, thumbnailUrl: "https://images.unsplash.com/photo-1586201375761-83865001e26c?w=400&h=300&fit=crop&auto=format" },
    { name: "갈비탕", amount: 13000, thumbnailUrl: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=300&fit=crop&auto=format" },
    { name: "제육볶음", amount: 10000, thumbnailUrl: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&h=300&fit=crop&auto=format" },
    { name: "삼계탕", amount: 15000, thumbnailUrl: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=400&h=300&fit=crop&auto=format" },
    { name: "김치볶음밥", amount: 8500, thumbnailUrl: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=400&h=300&fit=crop&auto=format" },
    { name: "순두부찌개", amount: 7500, thumbnailUrl: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400&h=300&fit=crop&auto=format" }
  ],
  4: [ // 중화반점
    { name: "짜장면", amount: 6000, thumbnailUrl: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop&auto=format" },
    { name: "짬뽕", amount: 7000, thumbnailUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop&auto=format" },
    { name: "탕수육 (소)", amount: 15000, thumbnailUrl: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop&auto=format" },
    { name: "볶음밥", amount: 8000, thumbnailUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop&auto=format" },
    { name: "마파두부", amount: 12000, thumbnailUrl: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop&auto=format" }
  ],
  5: [ // 일식집 스시로
    { name: "연어 초밥 세트", amount: 28000, thumbnailUrl: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=300&fit=crop&auto=format" },
    { name: "참치 사시미", amount: 35000, thumbnailUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop&auto=format" },
    { name: "텐동", amount: 15000, thumbnailUrl: "https://images.unsplash.com/photo-1576466213444-631c98e8cee9?w=400&h=300&fit=crop&auto=format" },
    { name: "규동", amount: 12000, thumbnailUrl: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop&auto=format" },
    { name: "우동", amount: 9000, thumbnailUrl: "https://images.unsplash.com/photo-1618841557871-b4664fbf0cb3?w=400&h=300&fit=crop&auto=format" }
  ],
  6: [ // 버거킹
    { name: "와퍼", amount: 8000, thumbnailUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&auto=format" },
    { name: "감자튀김", amount: 3000, thumbnailUrl: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop&auto=format" }
  ],
  7: [ // 카페 드롭탑
    { name: "아메리카노", amount: 4000, thumbnailUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop&auto=format" },
    { name: "카페라떼", amount: 4500, thumbnailUrl: "https://images.unsplash.com/photo-1549007953-2f2dc0b24019?w=400&h=300&fit=crop&auto=format" },
    { name: "치즈케이크", amount: 6000, thumbnailUrl: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop&auto=format" },
    { name: "에스프레소", amount: 3500, thumbnailUrl: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&h=300&fit=crop&auto=format" },
    { name: "카푸치노", amount: 4500, thumbnailUrl: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop&auto=format" }
  ]
};

async function testBackendConnection() {
  console.log('Testing backend connection...');
  try {
    // 일단 간단한 curl 테스트로 확인
    const axios = require('axios');
    const response = await axios.get(`${API_URL}/api/store/search`, {
      timeout: 10000
    });
    console.log('✓ Backend is accessible');
    return true;
  } catch (error) {
    console.log('✗ Backend connection failed:', error.message);
    console.log('Trying to insert data anyway...\n');
    return false;
  }
}

async function insertStores() {
  console.log('Starting to insert stores...');
  const storeIds = [];
  
  // 먼저 간단한 테스트를 해보자
  console.log('Testing with first store...');
  try {
    const response = await axios.post(`${API_URL}/api/store/register`, stores[0], {
      headers: { 'Content-Type': 'application/json' },
      timeout: 30000
    });
    console.log(`✓ Successfully inserted first store: ${stores[0].storeName}`);
    console.log('Response:', response.data);
  } catch (error) {
    console.error(`✗ Failed to insert first store:`, error.response?.data || error.message);
    console.error('Error details:', error.code, error.status);
    return [];
  }
  
  // 나머지 store들도 삽입
  for (let i = 1; i < stores.length; i++) {
    const store = stores[i];
    try {
      const response = await axios.post(`${API_URL}/api/store/register`, store, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 30000
      });
      console.log(`✓ Inserted store: ${store.storeName}`);
      storeIds.push(response.data.body?.id);
    } catch (error) {
      console.error(`✗ Failed to insert store ${store.storeName}:`, error.response?.data || error.message);
    }
  }
  
  return storeIds;
}

async function main() {
  console.log('=== Railway Backend Data Insertion Script ===\n');
  
  try {
    // 백엔드 연결 테스트
    await testBackendConnection();
    
    // 데이터 삽입 시작
    const storeIds = await insertStores();
    
    console.log('\n=== Insertion attempt completed! ===');
    console.log(`Attempted to insert ${stores.length} stores`);
    
  } catch (error) {
    console.error('Error during data insertion:', error.message);
  }
}

// Run the script
main();