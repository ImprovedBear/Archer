// Service Worker for ToolMan Client Archetype

const CACHE_NAME = 'toolman-client-archetype-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/icon.png',
    '/icon-512.png',
    '/manifest.json'
];

// Install event - cache essential files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cacheName => {
                    return cacheName !== CACHE_NAME;
                }).map(cacheName => {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

// Fetch event - serve from cache first, then network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return the cached response if found
                if (response) {
                    return response;
                }
                
                // Otherwise, fetch from network
                return fetch(event.request)
                    .then(response => {
                        // Don't cache non-GET requests or responses with errors
                        if (event.request.method !== 'GET' || !response || response.status !== 200) {
                            return response;
                        }
                        
                        // Clone the response to cache and return
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                            
                        return response;
                    });
            })
    );
}); 