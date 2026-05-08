/* eslint-disable no-restricted-globals */
/* eslint-env serviceworker */

const CACHE_VERSION = "v1.2.1";

const urlsToCache = [
    "./",
    "/plouaf/images/duck/blue.svg",
    "/plouaf/images/duck/green.svg",
    "/plouaf/images/duck/pink.svg",
    "/plouaf/images/duck/red.svg",
    "/plouaf/images/duck/yellow.svg",
    "/plouaf/images/heads-or-tails/heads.svg",
    "/plouaf/images/heads-or-tails/tails.svg",
];

// ─── INSTALL ─────────────────────────────────────────────────────────────────
// FIX 1: Return the cache.addAll() promise so that installation fails loudly
//         if any asset cannot be cached, instead of silently swallowing errors.
self.addEventListener("install", (event) => {
    self.skipWaiting();

    event.waitUntil(
        caches
            .open(CACHE_VERSION)
            .then((cache) => cache.addAll(urlsToCache)) // FIX 1 – return promise
            .catch((err) => console.error(`${CACHE_VERSION} Install failed:`, err)),
    );

    console.log(`${CACHE_VERSION} Install`);
});

// ─── ACTIVATE ────────────────────────────────────────────────────────────────
// FIX 2: Wrap clients.claim() inside event.waitUntil() so the SW is not torn
//         down before the claim promise resolves.
self.addEventListener("activate", (event) => {
    event.waitUntil(
        Promise.all([
            // FIX 2 – clients.claim() now inside waitUntil
            clients.claim(),
            // Delete all caches that don't match the current version
            caches
                .keys()
                .then((keys) =>
                    Promise.all(keys.filter((key) => key !== CACHE_VERSION).map((key) => caches.delete(key))),
                ),
        ]),
    );

    console.log(`${CACHE_VERSION} Active`);
});

// ─── FETCH ───────────────────────────────────────────────────────────────────
self.addEventListener("fetch", (event) => {
    // Ignore non-GET requests – they should never be served from cache.
    if (event.request.method !== "GET") return;

    // FIX 3: Correct protocol check.
    // Original regex  !/^https?:$/i  used a misplaced `$` that made it never
    // match "https:" or "http:" properly (the protocol value from the URL API
    // is e.g. "https:" – the `$` was correctly placed but the overall logic was
    // inverted: the guard was meant to *skip* non-http(s) protocols, so the
    // condition should bail out early when the protocol is NOT http/https).
    const requestURL = new URL(event.request.url);
    if (!/^https?:$/i.test(requestURL.protocol)) return; // skip chrome-extension://, etc.

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // Cache hit – return cached response immediately …
            if (cachedResponse) {
                // FIX 4 (stale-while-revalidate): … but also revalidate in the
                // background so the cache stays fresh for the *next* visit.
                revalidateInBackground(event.request);
                return cachedResponse;
            }

            // Cache miss – fetch from network, cache the result, then return it.
            return fetchAndCache(event.request);
        }),
    );
});

// ─── HELPERS ─────────────────────────────────────────────────────────────────

/**
 * Fetch a request, store a valid response in the cache, and return it.
 * FIX 5: Centralised error handling so network failures surface as proper
 *        errors instead of unhandled promise rejections.
 */
function fetchAndCache(request) {
    return fetch(request)
        .then((response) => {
            if (!response || response.status !== 200 || response.type !== "basic") {
                return response;
            }

            // ✅ Guard: skip caching for non-http(s) URLs (e.g. chrome-extension://)
            const url = new URL(request.url);
            if (!/^https?:$/i.test(url.protocol)) return response;

            const responseToCache = response.clone();
            caches
                .open(CACHE_VERSION)
                .then((cache) => cache.put(request, responseToCache))
                .catch((err) => console.warn("Cache put failed:", err));

            return response;
        })
        .catch((err) => {
            // FIX 5: Log network errors instead of letting them go unhandled.
            console.error("Fetch failed:", err);
            // Return a generic offline response for navigations; for assets,
            // returning undefined is acceptable (browser shows its own error).
            if (request.mode === "navigate") {
                return new Response("Offline – network unavailable.", {
                    status: 503,
                    headers: { "Content-Type": "text/plain" },
                });
            }
            throw err;
        });
}

/**
 * Re-fetch a request silently and update the cache entry.
 * Used for the stale-while-revalidate pattern (FIX 4).
 */
function revalidateInBackground(request) {
    const url = new URL(request.url);
    if (!/^https?:$/i.test(url.protocol)) return;

    fetch(request)
        .then((response) => {
            if (!response || response.status !== 200 || response.type !== "basic") return;
            caches
                .open(CACHE_VERSION)
                .then((cache) => cache.put(request, response))
                .catch((err) => console.warn("Background cache update failed:", err));
        })
        .catch(() => {
            // Background revalidation failures are non-critical – ignore silently.
        });
}
