/* eslint-disable no-restricted-globals */

// This service worker is based on the CRA PWA template.
// Workbox is injected automatically by CRA at build time via workbox-webpack-plugin.
// The self.__WB_MANIFEST placeholder is replaced with the real precache manifest.

import { clientsClaim } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute, createHandlerBoundToURL } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";

clientsClaim();

// Precache all build assets (JS, CSS, images, etc.)
// CRA replaces self.__WB_MANIFEST with the real manifest at build time.
precacheAndRoute(self.__WB_MANIFEST);

// ─── App Shell (index.html) ────────────────────────────────────────────────
// Since you use HashRouter, ALL navigation requests should return index.html.
// The hash fragment (#/route) is handled entirely client-side.
const fileExtensionRegexp = new RegExp("/[^/?]+\\.[^/]+$");

registerRoute(
    ({ request, url }) => {
        if (request.mode !== "navigate") return false;
        if (url.pathname.startsWith("/_")) return false;
        if (url.pathname.match(fileExtensionRegexp)) return false;
        return true;
    },
    createHandlerBoundToURL(process.env.PUBLIC_URL + "/index.html"),
);

// ─── Runtime caching: same-origin assets not in precache ──────────────────
registerRoute(
    ({ url }) =>
        url.origin === self.location.origin &&
        (url.pathname.endsWith(".png") ||
            url.pathname.endsWith(".jpg") ||
            url.pathname.endsWith(".svg") ||
            url.pathname.endsWith(".webp")),
    new StaleWhileRevalidate({
        cacheName: "plouaf-images",
        plugins: [new ExpirationPlugin({ maxEntries: 50 })],
    }),
);

// ─── Update on reload ─────────────────────────────────────────────────────
// When skipWaiting() is called (e.g. from a "New version available" banner),
// the new SW activates immediately.
self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
        self.skipWaiting();
    }
});
