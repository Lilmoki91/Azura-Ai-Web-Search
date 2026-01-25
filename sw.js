const CACHE_NAME = 'azura-ai-cache-v1';
const FILES_TO_CACHE = [
  './',
  './index.html',
  './manifest.json'
];

// install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

// fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(res => {
      return res || fetch(event.request);
    })
  );
});
