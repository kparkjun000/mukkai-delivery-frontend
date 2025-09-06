# Railway 배포 문제 해결 가이드

## 🚨 현재 문제
- 프론트엔드: `https://web-production-274dd.up.railway.app/` - 502 에러
- 백엔드: `https://web-production-dc795.up.railway.app/` - 502 에러

## 🔧 해결 방법

### 1. Railway 대시보드에서 프로젝트 분리

**프론트엔드 프로젝트 (web-production-274dd):**
1. Railway 대시보드에서 프론트엔드 프로젝트 선택
2. Settings -> Environment Variables에서 다음 설정:
   ```
   NODE_VERSION=18
   ```
3. Deploy 설정에서 Root Directory를 `/` (루트)로 설정
4. Build Command: `npm run build`
5. Start Command: `npm run start`

**백엔드 프로젝트 (web-production-dc795):**
1. Railway 대시보드에서 백엔드 프로젝트 선택
2. Settings -> Environment Variables에서 다음 설정:
   ```
   JAVA_VERSION=17
   SPRING_PROFILES_ACTIVE=default
   SPRING_DATASOURCE_DRIVER_CLASS_NAME=org.postgresql.Driver
   SPRING_JPA_PROPERTIES_HIBERNATE_DIALECT=org.hibernate.dialect.PostgreSQLDialect
   ```
3. Deploy 설정에서 Root Directory를 `/api`로 설정
4. Build Command: `mvn clean package -DskipTests`
5. Start Command: `java -jar -Dserver.port=$PORT target/*.jar`

### 2. PostgreSQL 연결 설정

**백엔드 프로젝트에서 PostgreSQL 서비스 추가:**
1. Railway 대시보드에서 "Add Service" -> "Database" -> "PostgreSQL"
2. 자동으로 다음 환경변수들이 생성됩니다:
   - `DATABASE_URL`
   - `PGHOST`
   - `PGPORT`
   - `PGDATABASE`
   - `PGUSER`
   - `PGPASSWORD`

### 3. 수동 재배포

각 프로젝트에서 "Deploy" 버튼을 클릭하여 수동 재배포 실행

## 🔄 대안: 별도 GitHub 저장소 생성

더 깔끔한 해결책은 프론트엔드와 백엔드를 별도 저장소로 분리하는 것입니다:

1. 백엔드용 새 저장소 생성: `mukkai-delivery-backend`
2. `api/` 폴더 내용을 새 저장소로 이동
3. Railway에서 새 저장소 연결

## 📋 배포 후 테스트

배포 완료 후 다음으로 테스트:
```bash
# 프론트엔드 테스트
curl https://web-production-274dd.up.railway.app/

# 백엔드 테스트
curl https://web-production-dc795.up.railway.app/health
```

## 🎯 데이터 삽입 준비

백엔드가 정상 작동하면 다음 명령어로 데이터 삽입:
```bash
node insert-data-via-api.cjs
```

15개 가게와 63개 메뉴 데이터가 자동으로 삽입됩니다!