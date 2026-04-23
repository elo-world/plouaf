/* eslint-disable no-restricted-globals */
/* eslint-env serviceworker */

const CACHE_NAME = "plouaf.v1.0.0";

// All static assets to pre-cache at install time
const PRECACHE_URLS = [
    "/plouaf/",
    "/plouaf/index.html",
    "/plouaf/manifest.json",
    "/plouaf/images/icons/website/favicon.ico",
    "/plouaf/images/icons/website/apple-touch-icon.png",
    "/plouaf/images/logo/typo.svg",
    "/plouaf/images/menu/random-draw.svg",
    "/plouaf/images/menu/heads-or-tails.svg",
    "/plouaf/images/menu/die.svg",
    "/plouaf/images/menu/random-number-generator.svg",
];

// ─── Install ───────────────────────────────────────────────────────────────
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then((cache) => cache.addAll(PRECACHE_URLS))
            // Activate immediately without waiting for old tabs to close
            .then(() => self.skipWaiting()),
    );
});

// ─── Activate ──────────────────────────────────────────────────────────────
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches
            .keys()
            .then((cacheNames) =>
                Promise.all(
                    cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name)),
                ),
            )
            // Take control of all open clients immediately
            .then(() => self.clients.claim()),
    );
});

// ─── Fetch ─────────────────────────────────────────────────────────────────
self.addEventListener("fetch", (event) => {
    const url = new URL(event.request.url);

    // Only handle same-origin requests
    if (url.origin !== self.location.origin) return;

    // Strategy: Cache-first for static assets, Network-first for everything else
    if (isStaticAsset(url.pathname)) {
        event.respondWith(cacheFirst(event.request));
    } else {
        // For navigation requests (HTML), always serve index.html
        // Hash Router handles the routing client-side, so this is safe
        event.respondWith(networkFirstWithFallback(event.request));
    }
});

// ─── Helpers ───────────────────────────────────────────────────────────────

/**
 * Returns true for file extensions that should be served cache-first.
 */
function isStaticAsset(pathname) {
    return /\.(js|css|png|jpg|jpeg|gif|svg|ico|woff2?|ttf|eot|webp|avif)$/i.test(pathname);
}

/**
 * Cache-first: serve from cache, fall back to network and update cache.
 */
async function cacheFirst(request) {
    const cached = await caches.match(request);
    if (cached) return cached;

    const response = await fetch(request);
    if (response.ok) {
        const cache = await caches.open(CACHE_NAME);
        cache.put(request, response.clone());
    }
    return response;
}

/**
 * Network-first: try network, fall back to cache.
 * For HTML navigation, always fall back to /plouaf/index.html so the
 * Hash Router can take over client-side.
 */
async function networkFirstWithFallback(request) {
    try {
        const response = await fetch(request);
        if (response.ok) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, response.clone());
        }
        return response;
    } catch {
        const cached = await caches.match(request);
        if (cached) return cached;

        // Last resort for navigation: return the app shell
        if (request.mode === "navigate") {
            const fallback = await caches.match("/plouaf/index.html");
            if (fallback) return fallback;
        }

        return new Response("Offline — plouaf! is not available right now.", {
            status: 503,
            headers: { "Content-Type": "text/plain" },
        });
    }
}