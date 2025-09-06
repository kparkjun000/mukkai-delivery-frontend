-- Railway PostgreSQL Database Insert Script
-- 가게(Store) 데이터 삽입

INSERT INTO store (id, store_name, address, status, category, star, thumbnail_url, minimum_amount, minimum_delivery_amount, phone_number, delivery_time, is_open, description) VALUES
(1, '맛있는 치킨집', '서울시 강남구 역삼동 123-45', 'REGISTERED', 'CHICKEN', 4.5, 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop&auto=format', 15000, 3000, '02-1234-5678', '30-40분', true, '바삭하고 맛있는 치킨을 제공합니다.'),
(2, '피자나라 치킨공주', '서울시 서초구 서초동 567-89', 'REGISTERED', 'PIZZA', 4.2, 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&auto=format', 20000, 3500, '02-9876-5432', '25-35분', true, '신선한 재료로 만든 수제 피자'),
(3, '한식당 고향맛', '서울시 종로구 종로 789', 'REGISTERED', 'KOREAN', 4.3, 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=400&h=300&fit=crop&auto=format', 12000, 3500, '02-3456-7890', '35-45분', true, '엄마가 해주는 따뜻한 한식'),
(4, '중화반점', '서울시 마포구 홍대입구로 321', 'REGISTERED', 'CHINESE', 4.2, 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400&h=300&fit=crop&auto=format', 15000, 2000, '02-4567-8901', '20-30분', true, '정통 중화요리의 진수'),
(5, '일식집 스시로', '서울시 강남구 논현로 456', 'REGISTERED', 'JAPANESE', 4.6, 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=300&fit=crop&auto=format', 25000, 4000, '02-5678-9012', '40-50분', true, '신선한 회와 초밥 전문점'),
(6, '버거킹', '서울시 마포구 홍대입구역 111-22', 'UNREGISTERED', 'HAMBURGER', 4.0, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&auto=format', 10000, 2500, '02-5555-1234', '20-30분', false, '프리미엄 햄버거 전문점'),
(7, '카페 드롭탑', '서울시 성동구 성수동 654', 'REGISTERED', 'COFFEE', 4.4, 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop&auto=format', 8000, 2000, '02-6789-0123', '15-25분', true, '신선한 원두로 내린 커피와 디저트'),
(8, '한식당 서울집', '서울시 중구 명동길 123-45', 'REGISTERED', 'KOREAN', 4.4, 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=300&fit=crop&auto=format', 10000, 3000, '02-7777-8888', '30-40분', true, '전통 한식의 깊은 맛'),
(9, '한식당 정가네', '서울시 서초구 반포대로 567', 'REGISTERED', 'KOREAN', 4.5, 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=300&fit=crop&auto=format', 11000, 3500, '02-9999-0000', '25-35분', true, '집밥 같은 푸근한 한식'),
(10, '중화반점 황금성', '서울시 용산구 이태원로 789', 'REGISTERED', 'CHINESE', 4.3, 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop&auto=format', 12000, 2500, '02-1111-2222', '25-35분', true, '정통 중화요리 전문점'),
(11, '중화반점 만리장성', '서울시 영등포구 여의도동 456', 'REGISTERED', 'CHINESE', 4.1, 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400&h=300&fit=crop&auto=format', 13000, 3000, '02-3333-4444', '30-40분', true, '깔끔한 중화요리'),
(12, '일식집 도쿄', '서울시 서초구 서초대로 321', 'REGISTERED', 'JAPANESE', 4.7, 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop&auto=format', 20000, 4000, '02-5555-6666', '40-50분', true, '정통 일본 요리'),
(13, '일식집 오사카', '서울시 송파구 올림픽로 654', 'REGISTERED', 'JAPANESE', 4.4, 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=300&fit=crop&auto=format', 18000, 3500, '02-7777-8888', '35-45분', true, '신선한 회와 초밥'),
(14, '카페 블루문', '서울시 마포구 홍대입구역로 123', 'REGISTERED', 'CAFE', 4.5, 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop&auto=format', 8000, 2000, '02-9999-0000', '15-25분', true, '향긋한 원두커피와 디저트'),
(15, '카페 그린빈', '서울시 강남구 테헤란로 987', 'REGISTERED', 'CAFE', 4.2, 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop&auto=format', 10000, 2500, '02-1010-2020', '20-30분', true, '프리미엄 커피와 수제 케이크')
ON CONFLICT (id) DO NOTHING;

-- 메뉴(Menu) 데이터 삽입
INSERT INTO store_menu (id, store_id, name, amount, status, thumbnail_url, like_count, sequence) VALUES
-- 맛있는 치킨집 메뉴
(1, 1, '후라이드 치킨', 18000, 'REGISTERED', 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop&auto=format', 120, 1),
(2, 1, '양념 치킨', 19000, 'REGISTERED', 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=400&h=300&fit=crop&auto=format', 98, 2),
(3, 1, '치킨 무 세트', 3000, 'REGISTERED', 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop&auto=format', 45, 3),

-- 피자나라 치킨공주 메뉴
(4, 2, '마르게리타 피자', 22000, 'REGISTERED', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&auto=format', 85, 1),
(5, 2, '페퍼로니 피자', 25000, 'REGISTERED', 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop&auto=format', 110, 2),
(6, 2, '콜라 (1.25L)', 3000, 'REGISTERED', 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=300&fit=crop&auto=format', 30, 3),

-- 한식당 고향맛 메뉴
(7, 3, '김치찌개', 8000, 'REGISTERED', 'https://images.unsplash.com/photo-1559847844-d721426d6edc?w=400&h=300&fit=crop&auto=format', 65, 1),
(8, 3, '된장찌개', 7000, 'REGISTERED', 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=400&h=300&fit=crop&auto=format', 55, 2),
(9, 3, '비빔밥', 9000, 'REGISTERED', 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=400&h=300&fit=crop&auto=format', 75, 3),
(20, 3, '불고기', 12000, 'REGISTERED', 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop&auto=format', 95, 4),
(21, 3, '공기밥', 1000, 'REGISTERED', 'https://images.unsplash.com/photo-1586201375761-83865001e26c?w=400&h=300&fit=crop&auto=format', 20, 5),

-- 중화반점 메뉴
(10, 4, '짜장면', 6000, 'REGISTERED', 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop&auto=format', 95, 1),
(11, 4, '짬뽕', 7000, 'REGISTERED', 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop&auto=format', 88, 2),
(12, 4, '탕수육 (소)', 15000, 'REGISTERED', 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop&auto=format', 72, 3),

-- 일식집 스시로 메뉴
(13, 5, '연어 초밥 세트', 28000, 'REGISTERED', 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=300&fit=crop&auto=format', 150, 1),
(14, 5, '참치 사시미', 35000, 'REGISTERED', 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop&auto=format', 125, 2),
(24, 5, '텐동', 15000, 'REGISTERED', 'https://images.unsplash.com/photo-1576466213444-631c98e8cee9?w=400&h=300&fit=crop&auto=format', 85, 3),

-- 버거킹 메뉴
(15, 6, '와퍼', 8000, 'REGISTERED', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&auto=format', 80, 1),
(16, 6, '감자튀김', 3000, 'REGISTERED', 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop&auto=format', 45, 2),

-- 카페 드롭탑 메뉴
(17, 7, '아메리카노', 4000, 'REGISTERED', 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop&auto=format', 60, 1),
(18, 7, '카페라떼', 4500, 'REGISTERED', 'https://images.unsplash.com/photo-1549007953-2f2dc0b24019?w=400&h=300&fit=crop&auto=format', 50, 2),
(19, 7, '치즈케이크', 6000, 'REGISTERED', 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop&auto=format', 35, 3)
ON CONFLICT (id) DO NOTHING;

-- 시퀀스 재설정 (PostgreSQL 전용)
SELECT setval('store_id_seq', COALESCE((SELECT MAX(id) + 1 FROM store), 1), false);
SELECT setval('store_menu_id_seq', COALESCE((SELECT MAX(id) + 1 FROM store_menu), 1), false);