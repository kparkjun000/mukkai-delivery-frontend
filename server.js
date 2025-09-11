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

// 구버전 JS 파일 요청을 새 버전으로 리다이렉트
app.get('/assets/index-BUhxMOPx.js', (req, res) => {
  console.log('Redirecting old JS to new version');
  res.redirect(301, '/assets/index-4wFnBNQF.js');
});

// 백엔드 직접 호출을 프록시로 리다이렉트
app.all('https://mukkai-backend-api-f9dc2d5aad02.herokuapp.com/*', (req, res) => {
  const proxyPath = req.url.replace('https://mukkai-backend-api-f9dc2d5aad02.herokuapp.com', '');
  console.log(`Redirecting direct backend call to proxy: ${proxyPath}`);
  res.redirect(302, proxyPath);
});

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  console.log(`Serving ${req.path} -> ${indexPath}`);
  
  // 강제로 새 index.html 내용 전송
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
    <script type="module" crossorigin src="/assets/index-4wFnBNQF.js?v=${Date.now()}"></script>
    <link rel="stylesheet" crossorigin href="/assets/index-D_RYoknR.css?v=${Date.now()}">
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