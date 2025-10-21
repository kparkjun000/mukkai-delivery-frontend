# iOS 스킴 문제 해결 스크립트
# PowerShell에서 실행: .\fix-ios-scheme.ps1

Write-Host "🔧 iOS 스킴 문제 해결 시작..." -ForegroundColor Green

# 프로젝트 폴더로 이동
Set-Location "C:\mukkai-delivery-frontend"

Write-Host "📁 프로젝트 폴더로 이동 완료" -ForegroundColor Yellow

# 기존 iOS 폴더 삭제 (있는 경우)
if (Test-Path "ios") {
    Write-Host "🗑️ 기존 iOS 폴더 삭제 중..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force "ios"
}

# Capacitor iOS 플랫폼 재추가
Write-Host "📱 Capacitor iOS 플랫폼 추가 중..." -ForegroundColor Yellow
npx cap add ios

# 웹 앱 빌드
Write-Host "🏗️ 웹 앱 빌드 중..." -ForegroundColor Yellow
npm run build

# iOS로 복사 및 동기화
Write-Host "🔄 iOS 동기화 중..." -ForegroundColor Yellow
npx cap copy ios
npx cap sync ios

Write-Host "✅ iOS 프로젝트 재생성 완료!" -ForegroundColor Green

# EAS Build 재시도
Write-Host "🚀 EAS Build 재시도 중..." -ForegroundColor Green
Write-Host "⏰ 빌드 시간: 약 10-15분 소요" -ForegroundColor Yellow

eas build --platform ios --profile production --clear-cache --non-interactive

Write-Host "🎉 스크립트 실행 완료!" -ForegroundColor Green

Read-Host "Press Enter to exit"
