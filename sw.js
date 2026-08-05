// ══════════════════════════════════════════════════════
// YOUR TUBE SHORTS — SERVICE WORKER (disabled)
//
// Video/asset caching was removed — it was a suspected contributor to
// playback lag/jank. This file now only exists to clean up any cache
// storage and service-worker registration left behind by the OLD version
// of this file on devices that already installed it, then gets out of
// the way entirely (no fetch interception, nothing cached going forward).
// ══════════════════════════════════════════════════════

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      // Wipe any caches a previous version of this service worker created.
      const keys = await caches.keys();
      await Promise.all(keys.map(k => caches.delete(k)));
      // Take control immediately, then unregister so the browser stops
      // routing requests through a service worker at all.
      await self.clients.claim();
      await self.registration.unregister();
    })()
  );
});

// No fetch handler — every request goes straight to the network as if no
// service worker were installed.
