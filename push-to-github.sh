#!/bin/bash
# GitHub 푸시 스크립트

echo "GitHub에 푸시 중..."
git push https://github.com/kparkjun000/mukkai-delivery-frontend.git master

echo ""
echo "푸시 완료!"
echo ""
echo "다음 단계:"
echo "1. Heroku 웹 대시보드 열기: https://dashboard.heroku.com/apps/mukkai-delivery-fe-0bdb8680ab0d"
echo "2. Deploy 탭 클릭"
echo "3. GitHub 연동되어 있으면 'Deploy Branch' 클릭"
echo "4. 또는 'Enable Automatic Deploys' 설정"
