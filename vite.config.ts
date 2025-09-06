import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath, URL } from 'node:url';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  define: {
    'import.meta.env.VITE_API_BASE_URL': JSON.stringify(
      process.env.NODE_ENV === 'production' 
        ? 'https://mukkai-delivery-backend-42373e2df9be.herokuapp.com'
        : ''
    ),
  },
  server: {
    host: true, // Railway 배포를 위해 외부 호스트 허용
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
      },
      "/open-api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
      },
      "/store-api": {
        target: "http://localhost:8081",
        changeOrigin: true,
        secure: false,
      },
      "/store-open-api": {
        target: "http://localhost:8081",
        changeOrigin: true,
        secure: false,
      },
      "/sse": {
        target: "http://localhost:8081",
        changeOrigin: true,
        secure: false,
        ws: true, // WebSocket 및 SSE 지원
      },
    },
  },
  preview: {
    host: true, // Railway 배포를 위해 외부 호스트 허용
    port: 4173,
    allowedHosts: ['web-production-274dd.up.railway.app'], // Railway 호스트 허용
  },
});
