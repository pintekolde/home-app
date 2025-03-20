const CACHE_NAME = 'home-app-v1';
const urlsToCache = [
  '.',
  './index.html',
  './static/js/main.d5a254ca.js',
  './static/css/main.css',
  './manifest.json',
  './logo192.png',
  './logo512.png',
  './favicon.ico',
  './static/js/main.d5a254ca.js.map',
  './static/js/main.d5a254ca.js.LICENSE.txt'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then(response => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            return response;
          })
          .catch(error => {
            console.error('Fetch failed:', error);
            return new Response('Network error', { status: 503 });
          });
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
}); 