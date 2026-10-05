/* 雄性意志 PWA Service Worker
 * 策略：
 *   - 导航请求 network-first（离线回退缓存 index.html）
 *   - 静态资源 stale-while-revalidate（先给缓存秒开，后台更新；新版本部署后下次访问自动生效）
 *   - JS/CSS chunk 如果 404（发版后旧 hash 失效），自动清缓存并刷新
 * 缓存名带版本，发版时 bump 即清旧缓存。
 */
const CACHE = 'xiongzhi-will-v3';
const CORE = ['./', './index.html', './manifest.webmanifest', './images/icon-192.png', './images/icon-512.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(CORE)).then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))),
    ).then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // 导航请求：network-first，离线时回退缓存的 index.html
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put('./index.html', copy));
          return res;
        })
        .catch(() => caches.match(req).then((hit) => hit || caches.match('./index.html'))),
    );
    return;
  }

  // 背景/加载视频：cache-first（文件几乎不变，避免每次后台校验浪费流量；发版 bump 缓存名后自动更新）
  if (/\/images\/.*\.mp4$/.test(url.pathname)) {
    event.respondWith(
      caches.match(req).then((cached) => {
        if (cached) return cached;
        return fetch(req)
          .then((res) => {
            if (res && res.ok) {
              const copy = res.clone();
              caches.open(CACHE).then((c) => c.put(req, copy));
            }
            return res;
          })
          .catch(() => cached);
      }),
    );
    return;
  }

  // 静态资源：stale-while-revalidate
  // 先返回缓存（秒开），同时后台拉新的更新缓存；下次访问就是新的
  event.respondWith(
    caches.match(req).then((cached) => {
      const networkFetch = fetch(req)
        .then((res) => {
          if (res && res.ok && res.type === 'basic') {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);
      // 关键：如果缓存没有且网络 404（发版后旧 chunk 失效），清全部缓存
      if (!cached) {
        return networkFetch.then((res) => {
          if (res && res.status === 404) {
            // 旧 chunk 404 = 发版了，清缓存让下次拿全新 index.html
            caches.keys().then((keys) =>
              Promise.all(keys.map((k) => caches.delete(k))),
            ).then(() => self.clients.matchAll().then((clients) =>
              clients.forEach((c) => c.navigate(c.url)),
            ));
          }
          return res;
        });
      }
      return cached || networkFetch;
    }),
  );
});
