# Mukkai Delivery iOS 자동 빌드 스크립트
# PowerShell에서 실행: .\auto-ios-build.ps1

Write-Host "🚀 Mukkai Delivery iOS 자동 빌드 시작..." -ForegroundColor Green

# 프로젝트 폴더로 이동
Set-Location "C:\mukkai-delivery-frontend"

Write-Host "📁 프로젝트 폴더로 이동 완료" -ForegroundColor Yellow

# Expo CLI 최신 버전 설치
Write-Host "📦 Expo CLI 설치 중..." -ForegroundColor Yellow
npm install -g @expo/cli@latest

# EAS CLI 최신 버전 설치
Write-Host "📦 EAS CLI 설치 중..." -ForegroundColor Yellow
npm install -g eas-cli@latest

# 프로젝트 의존성 설치
Write-Host "📦 프로젝트 의존성 설치 중..." -ForegroundColor Yellow
npm install

Write-Host "🔑 Expo 로그인이 필요합니다. 브라우저가 열리면 로그인해주세요." -ForegroundColor Cyan
npx expo login

Write-Host "🏗️ iOS 빌드 시작 (자동 코드 사이닝 포함)..." -ForegroundColor Green
Write-Host "⏰ 빌드 시간: 약 10-15분 소요" -ForegroundColor Yellow

# EAS Build 실행 (자동으로 서명된 IPA 생성)
eas build --platform ios --profile production --clear-cache --non-interactive

Write-Host "✅ 빌드 완료! EAS 대시보드에서 결과를 확인하세요." -ForegroundColor Green
Write-Host "🌐 https://expo.dev/accounts/[your-username]/projects/mukkai-delivery/builds" -ForegroundColor Cyan

# 빌드 상태 확인
Write-Host "📊 빌드 상태 확인 중..." -ForegroundColor Yellow
eas build:list --platform ios --limit 1

Write-Host "🎉 스크립트 실행 완료!" -ForegroundColor Green
Write-Host "📱 빌드가 성공하면 자동으로 App Store Connect에 업로드됩니다." -ForegroundColor Cyan

Read-Host "Press Enter to exit"
