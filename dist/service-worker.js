/* eslint-disable no-restricted-globals */

// Service Worker를 비활성화하고 기존 캐시를 삭제
self.addEventListener('install', (event) => {
  // 즉시 활성화
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    // 모든 캐시 삭제
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          console.log('Deleting cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(() => {
      // 모든 클라이언트를 즉시 제어
      return self.clients.claim();
    })
  );
});

// 모든 fetch 요청은 네트워크로 (캐시 사용 안 함)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      // 네트워크 실패 시에만 에러
      return new Response('Network error', { status: 503 });
    })
  );
});
