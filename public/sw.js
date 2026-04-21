/* eslint-disable no-restricted-globals */
/* eslint-env serviceworker */

const CACHE_VERSION = "v1.0.0";
const urlsToCache = ["./", "./index.html"];

self.addEventListener("install", (event) => {
    self.skipWaiting();

    event.waitUntil(
        caches.open(CACHE_VERSION).then((cache) => {
            return cache.addAll(urlsToCache);
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
    // Use network-first for HTML navigation to avoid stale pages after deployment
    if (event.request.mode === "navigate") {
        event.respondWith(fetch(event.request).catch(() => caches.match("./index.html")));
        return;
    }

    // Cache-first for all other assets (JS, CSS, images, fonts, etc.)
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Cache hit - return response
            if (response) {
                return response;
            }

            return fetch(event.request)
                .then((response) => {
                    // Check if we received a valid response
                    // Allow both basic (same-origin) and cors (cross-origin CDN) responses
                    if (
                        !response ||
                        response.status !== 200 ||
                        (response.type !== "basic" && response.type !== "cors")
                    ) {
                        return response;
                    }

                    const responseToCache = response.clone();

                    caches
                        .open(CACHE_VERSION)
                        .then((cache) => {
                            cache.put(event.request, responseToCache);
                        })
                        .catch((err) => console.warn("Cache put failed:", err));

                    return response;
                })
                .catch(() => caches.match("./offline.html")); // Offline fallback
        }),
    );
});
