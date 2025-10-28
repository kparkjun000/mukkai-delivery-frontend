import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Service Worker를 완전히 제거 (캐시 문제 해결)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for(let registration of registrations) {
      registration.unregister().then(function(boolean) {
        console.log('Service Worker unregistered:', boolean);
      });
    }
  });
  
  // 모든 캐시 삭제
  caches.keys().then(function(names) {
    for (let name of names) {
      caches.delete(name).then(function(deleted) {
        console.log('Cache deleted:', name, deleted);
      });
    }
  });
}
