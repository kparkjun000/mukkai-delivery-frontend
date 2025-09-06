# Railway 백엔드 재배포 가이드

## 자동 재배포 방법 (추천)

### 1. Git Push를 통한 자동 배포
```bash
# 변경사항 커밋 및 푸시
git add .
git commit -m "Update backend configuration for PostgreSQL"
git push origin main
```

### 2. Railway CLI를 통한 배포 (Railway CLI 설치된 경우)
```bash
# Railway 프로젝트로 이동
cd api/

# Railway에 배포
railway deploy
```

## 수동 재배포 방법

### Railway 대시보드에서:
1. https://railway.app 로그인
2. 백엔드 프로젝트 선택
3. "Deployments" 탭으로 이동
4. "Deploy" 버튼 클릭 또는 "Redeploy" 클릭

## 환경변수 설정 확인

Railway 대시보드에서 다음 환경변수들이 설정되었는지 확인하세요:

### PostgreSQL 환경변수:
- `DATABASE_URL` - Railway PostgreSQL이 자동 제공
- `PGHOST` - PostgreSQL 호스트
- `PGPORT` - PostgreSQL 포트 (보통 5432)
- `PGDATABASE` - 데이터베이스 이름
- `PGUSER` - PostgreSQL 사용자명
- `PGPASSWORD` - PostgreSQL 비밀번호

### 애플리케이션 환경변수:
- `SPRING_PROFILES_ACTIVE=railway`
- `PORT` - Railway에서 자동 설정
- `SPRING_DATASOURCE_DRIVER_CLASS_NAME=org.postgresql.Driver`
- `SPRING_JPA_PROPERTIES_HIBERNATE_DIALECT=org.hibernate.dialect.PostgreSQLDialect`

## 배포 후 확인사항

1. **백엔드 상태 확인:**
   ```bash
   curl https://web-production-dc795.up.railway.app/actuator/health
   ```

2. **API 엔드포인트 확인:**
   ```bash
   curl https://web-production-dc795.up.railway.app/api/store/search
   ```

3. **로그 확인:**
   - Railway 대시보드의 "Logs" 탭에서 에러 메시지 확인

## 문제 해결

### PostgreSQL 연결 실패 시:
1. Railway PostgreSQL 서비스가 활성화되어 있는지 확인
2. 환경변수 `DATABASE_URL`이 올바르게 설정되었는지 확인
3. PostgreSQL 드라이버가 포함되어 있는지 확인 (pom.xml 또는 build.gradle)

### 502 Bad Gateway 에러 시:
1. 애플리케이션이 올바른 포트에서 실행되고 있는지 확인
2. `server.port=${PORT:8080}` 설정 확인
3. 메모리 제한이나 타임아웃 문제 확인

## 배포 트리거

만약 자동 배포가 되지 않는다면, 빈 커밋으로 배포를 트리거할 수 있습니다:
```bash
git commit --allow-empty -m "Trigger Railway deployment"
git push origin main
```