import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createProxyMiddleware } from 'http-proxy-middleware';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS 미들웨어 - 모든 요청에 대해 CORS 허용
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, authorization-token');
  
  // Preflight 요청 처리
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  next();
});

// Debug middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Add health check endpoint - 구버전 JS의 400 에러 해결
app.get('/health', (req, res) => {
  // 구버전 JS가 기대하는 응답 형식으로 200 OK 반환
  res.status(200).json({ 
    result: {
      result_code: 0,
      result_message: "OK",
      result_description: "SUCCESS"
    },
    body: {
      status: 'healthy', 
      timestamp: new Date().toISOString(),
      port: PORT,
      env: process.env.NODE_ENV,
      version: '2.0.0'
    }
  });
});

// Proxy API requests to backend (CORS 문제 해결)
const API_TARGET = 'https://mukkai-backend-api-f9dc2d5aad02.herokuapp.com';

app.use('/api', createProxyMiddleware({
  target: API_TARGET,
  changeOrigin: true,
  secure: true,
  logLevel: 'debug',
  onProxyReq: (proxyReq, req, res) => {
    console.log(`🔗 Proxying API request: ${req.method} ${req.originalUrl} -> ${API_TARGET}${req.url}`);
    // Content-Type 헤더 명시적 설정
    if (req.body && req.method === 'POST') {
      proxyReq.setHeader('Content-Type', 'application/json');
    }
  },
  onProxyRes: (proxyRes, req, res) => {
    console.log(`✅ Proxy response: ${proxyRes.statusCode} ${proxyRes.statusMessage}`);
  },
  onError: (err, req, res) => {
    console.error('❌ Proxy error:', err.message);
    res.status(500).json({ error: 'Proxy error' });
  }
}));

// 간단한 프록시 설정 (문제 해결용)
app.use('/open-api', createProxyMiddleware({
  target: API_TARGET,
  changeOrigin: true,
  secure: true,
  logLevel: 'info',
  onProxyReq: (proxyReq, req, res) => {
    console.log(`🔗 [PROXY] ${req.method} ${req.originalUrl} -> ${API_TARGET}${req.url}`);
  },
  onProxyRes: (proxyRes, req, res) => {
    console.log(`✅ [PROXY] Response: ${proxyRes.statusCode}`);
    // CORS 헤더 강제 추가
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, authorization-token');
  },
  onError: (err, req, res) => {
    console.error('❌ [PROXY] Error:', err.message);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Proxy error' });
    }
  }
}));

// 구버전 JS 파일을 새 JS 파일 내용으로 완전 교체
app.get('/assets/index-BUhxMOPx.js', (req, res) => {
  console.log('🔄 Intercepting old JS file request - serving new JS content');
  const newJsPath = path.join(__dirname, 'dist', 'assets', 'index-4wFnBNQF.js');
  
  // 강력한 캐시 무효화 헤더
  res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('ETag', 'W/"new-js-' + Date.now() + '"');
  
  // 새 JS 파일이 존재하면 그 내용을 서빙
  if (fs.existsSync(newJsPath)) {
    console.log('✅ Serving new JS file content from:', newJsPath);
    res.sendFile(newJsPath);
  } else {
    console.log('❌ New JS file not found, redirecting');
    res.redirect(301, '/assets/index-4wFnBNQF.js');
  }
});

// 모든 구버전 에셋 파일들을 새 버전으로 리다이렉트
app.get('/assets/index-BUhxMOPx.*', (req, res) => {
  console.log('🔄 Redirecting old asset request:', req.url);
  const newUrl = req.url.replace('index-BUhxMOPx', 'index-4wFnBNQF');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.redirect(301, newUrl);
});

// 구버전 JS가 직접 백엔드를 호출할 때 프록시로 처리
app.all('*mukkai-backend-api-f9dc2d5aad02.herokuapp.com*', (req, res, next) => {
  console.log('Direct backend call intercepted:', req.url);
  // health 요청을 로컬로 리다이렉트
  if (req.url.includes('/health')) {
    res.redirect('/health');
  } else if (req.url.includes('/open-api/')) {
    const apiPath = req.url.split('/open-api/')[1];
    res.redirect(`/open-api/${apiPath}`);
  } else {
    next();
  }
});

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  console.log(`Serving ${req.path} -> ${indexPath}`);
  
  // 강제로 새 index.html 내용 전송 - 캐시 버스팅 강화
  const timestamp = Date.now();
  const newIndexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Foodie - 맛있는 음식을 빠르게</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=D2+Coding:wght@400;700&display=swap" rel="stylesheet" />
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-VHEL5W2V27"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      gtag("js", new Date());
      gtag("config", "G-VHEL5W2V27");
    </script>
    <script type="module" crossorigin src="/assets/index-4wFnBNQF.js?v=${timestamp}&bust=${Math.random()}"></script>
    <link rel="stylesheet" crossorigin href="/assets/index-D_RYoknR.css?v=${timestamp}&bust=${Math.random()}">
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`;

  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.send(newIndexHtml);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📁 Serving static files from: ${path.join(__dirname, 'dist')}`);
  console.log(`🌍 Accessible at: http://0.0.0.0:${PORT}`);
});