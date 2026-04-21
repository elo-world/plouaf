/* eslint-disable no-restricted-globals */
/* eslint-env serviceworker */

const CACHE_VERSION = "v1.0.0";
var urlsToCache = ["./"];

self.addEventListener("install", (event) => {
    self.skipWaiting();

    event.waitUntil(
        caches.open(CACHE_VERSION).then((cache) => {
            cache.addAll(urlsToCache);
        }),
    );

    console.log(`${CACHE_VERSION} Install`);
});

self.addEventListener("activate", (event) => {
    clients.claim();

    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(keys.filter((key) => key !== CACHE_VERSION).map((key) => caches.delete(key)));
        }),
    );

    console.log(`${CACHE_VERSION} Active`);
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Cache hit - return response
            if (response) {
                return response;
            }

            return fetch(event.request).then((response) => {
                // Check if we received a valid response
                if (!response || response.status !== 200 || response.type !== "basic") {
                    return response;
                }

                var responseToCache = response.clone();

                caches.open(CACHE_VERSION).then((cache) => {
                    cache.put(event.request, responseToCache);
                });

                return response;
            });
        }),
    );
});
