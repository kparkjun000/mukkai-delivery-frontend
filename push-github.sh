#!/bin/bash
# GitHub 푸시 스크립트

echo "=========================================="
echo "🚀 GitHub에 푸시 시작"
echo "=========================================="
echo ""

cd /Users/junho/Downloads/mukkai-delivery-frontend

echo "로컬 커밋 목록:"
git log --oneline -5
echo ""

echo "=========================================="
echo "⚠️ 이제 수동으로 푸시하세요:"
echo "=========================================="
echo ""
echo "방법 1 (터미널):"
echo "  cd /Users/junho/Downloads/mukkai-delivery-frontend"
echo "  git push origin master"
echo ""
echo "방법 2 (GitHub Desktop):"
echo "  1. GitHub Desktop 열기"
echo "  2. mukkai-delivery-frontend 프로젝트 선택"
echo "  3. 'Push origin' 버튼 클릭"
echo ""
echo "방법 3 (Personal Access Token):"
echo "  1. https://github.com/settings/tokens"
echo "  2. 'Generate new token (classic)' 클릭"
echo "  3. repo 권한 선택"
echo "  4. 터미널에서 git push 실행 시 비밀번호 대신 토큰 입력"
echo ""
echo "=========================================="
echo "푸시 후 자동 배포 상태 확인:"
echo "=========================================="
echo ""
echo "Heroku Deploy 탭:"
echo "  https://dashboard.heroku.com/apps/mukkai-delivery-fe-0bdb8680ab0d/deploy/github"
echo ""
echo "GitHub Actions (있다면):"
echo "  https://github.com/kparkjun000/mukkai-delivery-frontend/actions"
echo ""


