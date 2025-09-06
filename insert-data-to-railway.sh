#!/bin/bash

# Railway Backend API URL
API_URL="https://web-production-274dd.up.railway.app"

echo "Starting data insertion to Railway backend..."

# Store 데이터 삽입
echo "Inserting store data..."

# 1. 맛있는 치킨집
curl -X POST "$API_URL/api/store/register" \
  -H "Content-Type: application/json" \
  -d '{
    "storeName": "맛있는 치킨집",
    "address": "서울시 강남구 역삼동 123-45",
    "category": "CHICKEN",
    "phoneNumber": "02-1234-5678",
    "minimumAmount": 15000,
    "minimumDeliveryAmount": 3000
  }'

# 2. 피자나라 치킨공주
curl -X POST "$API_URL/api/store/register" \
  -H "Content-Type: application/json" \
  -d '{
    "storeName": "피자나라 치킨공주",
    "address": "서울시 서초구 서초동 567-89",
    "category": "PIZZA",
    "phoneNumber": "02-9876-5432",
    "minimumAmount": 20000,
    "minimumDeliveryAmount": 3500
  }'

# 3. 한식당 고향맛
curl -X POST "$API_URL/api/store/register" \
  -H "Content-Type: application/json" \
  -d '{
    "storeName": "한식당 고향맛",
    "address": "서울시 종로구 종로 789",
    "category": "KOREAN",
    "phoneNumber": "02-3456-7890",
    "minimumAmount": 12000,
    "minimumDeliveryAmount": 3500
  }'

# 4. 중화반점
curl -X POST "$API_URL/api/store/register" \
  -H "Content-Type: application/json" \
  -d '{
    "storeName": "중화반점",
    "address": "서울시 마포구 홍대입구로 321",
    "category": "CHINESE",
    "phoneNumber": "02-4567-8901",
    "minimumAmount": 15000,
    "minimumDeliveryAmount": 2000
  }'

# 5. 일식집 스시로
curl -X POST "$API_URL/api/store/register" \
  -H "Content-Type: application/json" \
  -d '{
    "storeName": "일식집 스시로",
    "address": "서울시 강남구 논현로 456",
    "category": "JAPANESE",
    "phoneNumber": "02-5678-9012",
    "minimumAmount": 25000,
    "minimumDeliveryAmount": 4000
  }'

echo "Store data insertion completed!"

# Menu 데이터 삽입
echo "Inserting menu data..."

# 맛있는 치킨집 메뉴
curl -X POST "$API_URL/api/store-menu/register" \
  -H "Content-Type: application/json" \
  -d '{
    "storeId": 1,
    "name": "후라이드 치킨",
    "amount": 18000,
    "thumbnailUrl": "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop&auto=format"
  }'

curl -X POST "$API_URL/api/store-menu/register" \
  -H "Content-Type: application/json" \
  -d '{
    "storeId": 1,
    "name": "양념 치킨",
    "amount": 19000,
    "thumbnailUrl": "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=400&h=300&fit=crop&auto=format"
  }'

# 피자나라 치킨공주 메뉴
curl -X POST "$API_URL/api/store-menu/register" \
  -H "Content-Type: application/json" \
  -d '{
    "storeId": 2,
    "name": "마르게리타 피자",
    "amount": 22000,
    "thumbnailUrl": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&auto=format"
  }'

curl -X POST "$API_URL/api/store-menu/register" \
  -H "Content-Type: application/json" \
  -d '{
    "storeId": 2,
    "name": "페퍼로니 피자",
    "amount": 25000,
    "thumbnailUrl": "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=300&fit=crop&auto=format"
  }'

echo "Menu data insertion completed!"
echo "All data has been inserted successfully!"