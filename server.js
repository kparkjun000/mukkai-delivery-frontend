import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createProxyMiddleware } from "http-proxy-middleware";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Parse JSON bodies - API 경로는 제외하고 프록시에서 처리하도록 함
app.use((req, res, next) => {
  if (req.url.startsWith("/open-api") || req.url.startsWith("/api")) {
    // API 요청은 body parsing 건너뛰고 프록시에서 처리
    console.log(
      `⚠️ Skipping body parsing for API request: ${req.method} ${req.url}`
    );
    next();
  } else {
    // 일반 요청만 body parsing 적용
    express.json()(req, res, next);
  }
});
app.use((req, res, next) => {
  if (req.url.startsWith("/open-api") || req.url.startsWith("/api")) {
    next();
  } else {
    express.urlencoded({ extended: true })(req, res, next);
  }
});

// 강력한 CORS 설정 - 모든 요청 허용
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Max-Age", "86400");
  res.setHeader("Access-Control-Allow-Credentials", "false");

  // 모든 OPTIONS 요청 즉시 허용
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  next();
});

// Debug middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);

  // API 요청 특별 로깅
  if (req.url.startsWith("/open-api") || req.url.startsWith("/api")) {
    console.log(`🔍 API Request detected: ${req.method} ${req.url}`);
    console.log(`🔍 Headers:`, JSON.stringify(req.headers, null, 2));
    if (req.body) {
      console.log(`🔍 Body:`, JSON.stringify(req.body, null, 2));
    }
  }

  next();
});

// Add health check endpoint - 구버전 JS의 400 에러 해결
app.get("/health", (req, res) => {
  // 구버전 JS가 기대하는 응답 형식으로 200 OK 반환
  res.status(200).json({
    result: {
      result_code: 0,
      result_message: "OK",
      result_description: "SUCCESS",
    },
    body: {
      status: "healthy",
      timestamp: new Date().toISOString(),
      port: PORT,
      env: process.env.NODE_ENV,
      version: "2.0.0",
    },
  });
});

// API 프록시 설정 - /open-api 경로 그대로 백엔드로 전달
const API_TARGET = "https://mukkai-backend-v2-7340b28f306e.herokuapp.com";

// /open-api와 /api로 시작하는 모든 요청을 백엔드로 프록시
console.log(`🚀 Setting up proxy to: ${API_TARGET}`);

// 조건부 프록시 - API 요청만 백엔드로 전달
app.use((req, res, next) => {
  // API 요청인지 확인
  if (req.url.startsWith("/open-api") || req.url.startsWith("/api")) {
    console.log(`🎯 API request detected: ${req.method} ${req.url}`);

    // 프록시 미들웨어 생성 및 실행
    const proxy = createProxyMiddleware({
      target: API_TARGET,
      changeOrigin: true,
      secure: true,
      logLevel: "debug",
      // pathRewrite 없이 전체 경로 그대로 전달
      onProxyReq: (proxyReq, req, res) => {
        console.log(
          `🔄 Proxying ${req.method} ${req.originalUrl} to ${API_TARGET}${req.originalUrl}`
        );
        console.log(`🔍 Target URL: ${API_TARGET}${req.originalUrl}`);

        // Authorization 헤더 전달
        if (req.headers["authorization-token"]) {
          proxyReq.setHeader(
            "authorization-token",
            req.headers["authorization-token"]
          );
          console.log(`🔑 Added authorization-token header`);
        }

        // Content-Type 헤더가 있으면 전달
        if (req.headers["content-type"]) {
          proxyReq.setHeader("Content-Type", req.headers["content-type"]);
          console.log(`📝 Set Content-Type: ${req.headers["content-type"]}`);
        }
      },
      onProxyRes: (proxyRes, req, res) => {
        console.log(
          `✅ Proxy response: ${proxyRes.statusCode} for ${req.originalUrl}`
        );

        // CORS 헤더 설정
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "*");
        res.setHeader("Access-Control-Allow-Headers", "*");
      },
      onError: (err, req, res) => {
        console.error("❌ Proxy error:", err.message, "for", req.originalUrl);
        if (!res.headersSent) {
          res.status(500).json({
            error: "Proxy error",
            message: err.message,
            url: req.originalUrl,
          });
        }
      },
    });

    // 프록시 실행
    proxy(req, res, next);
  } else {
    // API 요청이 아니면 다음 미들웨어로
    next();
  }
});

// 중복 프록시 설정 제거됨 - 위의 조건부 프록시에서 처리

// 프록시 설정 확인용 테스트 엔드포인트
app.get("/proxy-test", (req, res) => {
  res.json({
    message: "Proxy middleware is working",
    timestamp: new Date().toISOString(),
    proxies: ["/open-api", "/api"],
  });
});

console.log("✅ Proxy middleware setup completed");

// 구버전 JS 파일을 새 JS 파일 내용으로 완전 교체
app.get("/assets/index-BUhxMOPx.js", (req, res) => {
  console.log("🔄 Intercepting old JS file request - serving new JS content");
  const newJsPath = path.join(__dirname, "dist", "assets", "index-Djzh3ivv.js");

  // 강력한 캐시 무효화 헤더
  res.setHeader("Content-Type", "application/javascript; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.setHeader("ETag", 'W/"new-js-' + Date.now() + '"');

  // 새 JS 파일이 존재하면 그 내용을 서빙
  if (fs.existsSync(newJsPath)) {
    console.log("✅ Serving new JS file content from:", newJsPath);
    res.sendFile(newJsPath);
  } else {
    console.log("❌ New JS file not found, redirecting");
    res.redirect(301, "/assets/index-Djzh3ivv.js");
  }
});

// 모든 구버전 에셋 파일들을 새 버전으로 리다이렉트
app.get("/assets/index-BUhxMOPx.*", (req, res) => {
  console.log("🔄 Redirecting old asset request:", req.url);
  const newUrl = req.url.replace("index-BUhxMOPx", "index-Djzh3ivv");
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.redirect(301, newUrl);
});

// Serve static files from the dist directory (프록시보다 먼저 배치)
app.use(
  express.static(path.join(__dirname, "dist"), {
    setHeaders: (res, path) => {
      if (path.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript; charset=utf-8");
      } else if (path.endsWith(".css")) {
        res.setHeader("Content-Type", "text/css; charset=utf-8");
      }
      // 캐시 무효화
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");
    },
  })
);

// Handle React routing, return all requests to React app
app.get("*", (req, res) => {
  const indexPath = path.join(__dirname, "dist", "index.html");
  console.log(`Serving ${req.path} -> ${indexPath}`);

  // 실제 빌드된 index.html을 읽어서 서빙 (캐시 무효화 헤더와 함께)
  if (fs.existsSync(indexPath)) {
    let htmlContent = fs.readFileSync(indexPath, 'utf8');
    
    // 타임스탬프 추가로 캐시 버스팅
    const timestamp = Date.now();
    htmlContent = htmlContent.replace(
      /src="\/assets\/(index-[^"]+\.js)"/g,
      `src="/assets/$1?v=${timestamp}"`
    );
    htmlContent = htmlContent.replace(
      /href="\/assets\/(index-[^"]+\.css)"/g,
      `href="/assets/$1?v=${timestamp}"`
    );
    
    // 강력한 캐시 무효화 헤더
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate, max-age=0");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("ETag", `"${timestamp}"`);
    res.send(htmlContent);
  } else {
    console.error("index.html not found!");
    res.status(404).send("index.html not found");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📁 Serving static files from: ${path.join(__dirname, "dist")}`);
  console.log(`🌍 Accessible at: http://0.0.0.0:${PORT}`);
});
