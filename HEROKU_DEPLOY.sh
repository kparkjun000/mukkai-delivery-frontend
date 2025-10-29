#!/bin/bash

echo "🚀 Mukkai Heroku 배포 스크립트"
echo "======================================"
echo ""

# 현재 브랜치 확인
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo "📍 현재 브랜치: $CURRENT_BRANCH"
echo ""

# Heroku 로그인 상태 확인
echo "🔐 Heroku 로그인 확인 중..."
heroku auth:whoami 2>/dev/null

if [ $? -ne 0 ]; then
    echo ""
    echo "⚠️  Heroku에 로그인되어 있지 않습니다."
    echo "🔑 브라우저가 열리면 Heroku 계정으로 로그인하세요..."
    echo ""
    heroku login
    
    if [ $? -ne 0 ]; then
        echo ""
        echo "❌ Heroku 로그인 실패"
        echo "다시 시도하려면 다음 명령어를 실행하세요:"
        echo "   heroku login"
        exit 1
    fi
fi

echo ""
echo "✅ Heroku 로그인 완료"
echo ""

# Heroku 앱 확인
echo "📦 Heroku 앱 확인 중..."
heroku apps:info mukkai-delivery-fe-0bdb8680ab0d >/dev/null 2>&1

if [ $? -ne 0 ]; then
    echo ""
    echo "⚠️  Heroku 앱을 찾을 수 없습니다."
    echo "Heroku remote를 추가합니다..."
    git remote add heroku https://git.heroku.com/mukkai-delivery-fe-0bdb8680ab0d.git 2>/dev/null
    echo "✅ Heroku remote 추가 완료"
fi

echo ""
echo "🚀 Heroku에 배포 중..."
echo "======================================"
git push heroku master

if [ $? -eq 0 ]; then
    echo ""
    echo "======================================"
    echo "🎉 배포 성공!"
    echo ""
    echo "🌐 앱 URL: https://mukkai-delivery-fe-0bdb8680ab0d.herokuapp.com"
    echo ""
    echo "📝 다음 단계:"
    echo "1. 웹사이트에서 회원 삭제 기능 테스트"
    echo "2. App Store Connect에서 심사팀에 답변"
    echo "3. 재심사 요청"
    echo ""
    echo "======================================"
else
    echo ""
    echo "======================================"
    echo "❌ 배포 실패"
    echo ""
    echo "문제 해결 방법:"
    echo "1. Heroku 로그 확인:"
    echo "   heroku logs --tail --app mukkai-delivery-fe-0bdb8680ab0d"
    echo ""
    echo "2. 다시 배포 시도:"
    echo "   git push heroku master"
    echo ""
    echo "======================================"
    exit 1
fi


