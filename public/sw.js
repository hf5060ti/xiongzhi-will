/* 雄性意志 PWA Service Worker
 *
 * 缓存分两层：
 *   CACHE     主缓存（HTML / JS / CSS / 首屏视频）——每次发版换名，旧缓存自动清掉
 *   IMG_CACHE 第三方动作演示图 —— 跨发版保留，图床抖动/弱网时仍能秒开演示动图
 *
 * 策略：
 *   导航 HTML        network-first（带超时），断网/超时回退缓存 index.html，再兜底离线页
 *   本站静态资源      stale-while-revalidate（先给缓存秒开，后台更新）
 *   第三方动作演示图  cache-first（带超时），命中即秒开，不再受图床波动影响
 *   背景 MP4          cache-first（带超时）；Range 请求直接放行，避免破坏视频分段播放
 *
 * 稳定性红线（这几条是踩过坑的）：
 *   1. respondWith() 里绝不能出现 undefined —— 网络失败时若把 undefined 交给它，
 *      浏览器会直接判该请求失败，JS/CSS 加载不到就是整站白屏。统一返回 504 Response。
 *   2. 旧 chunk 404 时不清空全部缓存、不强制所有标签页 navigate —— 那会造成
 *      「404 → 清缓存 → 刷新 → 还是 404」的刷新风暴，还会顺手删掉动作演示图缓存。
 *      发版后的 chunk 失效由 src/components/Root.tsx 的 crash recovery 处理。
 *   3. install 里 cache.addAll 任何一项失败都会让整个 SW 装不上，必须逐项容错。
 *   4. 缓存版本由 CI 注入 commit SHA（占位符 __XW_BUILD__），不再靠人工 bump。
 */
const BUILD = '__XW_BUILD__';
const CACHE = 'xiongzhi-will-' + BUILD;
const IMG_CACHE = 'xiongzhi-will-img-v1'; // 不要随主缓存版本变化，保住已缓存的演示图
const CORE = ['./', './index.html', './manifest.webmanifest', './images/icon-192.png', './images/icon-512.png'];

const NAV_TIMEOUT = 4500;   // 导航请求：4.5s 拿不到就先用缓存，弱网不再干等
const IMG_TIMEOUT = 8000;   // 第三方图片：8s 超时，尽快触发 <img onError> 切换候选图源
const ASSET_TIMEOUT = 12000;
const IMG_CACHE_MAX = 500;

const IMG_HOSTS = [
  'fitness.xingshuwen.com',          // 动作百科演示图 / 动图
  'fitwill.app',                     // fitwill 静态图
  's3.us-east-005.backblazeb2.com',  // fitwill 演示视频
  'raw.githubusercontent.com',       // 英文动作库原图（国内常被熔断，缓存命中时仍可用）
];

function timeout(ms) {
  return new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), ms));
}

function fetchWithTimeout(req, ms) {
  return Promise.race([fetch(req), timeout(ms)]);
}

/** 所有 respondWith 分支的统一兜底：返回一个「确定失败」的 Response，而不是 undefined */
function unavailable(what) {
  return new Response('', { status: 504, statusText: 'Offline or timeout: ' + what });
}

/** 彻底断网且没有任何缓存时给用户的最小可用页面 */
function offlineShell() {
  return new Response(
    '<!doctype html><html lang="zh-CN"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<title>雄性意志 · 暂时无法连接</title></head>' +
    '<body style="margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;' +
    'background:#0F1110;color:#F5F7F5;font-family:system-ui,\'PingFang SC\',sans-serif;text-align:center">' +
    '<div style="padding:24px;max-width:420px;line-height:1.9">' +
    '<div style="font-size:22px;font-weight:800;letter-spacing:4px">雄性意志</div>' +
    '<p style="font-size:14px;color:#9CA3AF">当前网络不可用，且本机没有已缓存的页面。<br>' +
    '恢复网络后点下面的按钮重试即可，你的训练数据不会被清除。</p>' +
    '<button id="retry" style="margin-top:12px;padding:10px 22px;border:0;border-radius:6px;' +
    'background:#FACC15;color:#111;font-weight:700;cursor:pointer">重新加载</button>' +
    '</div><script>document.getElementById("retry").onclick=function(){location.reload()};</script>' +
    '</body></html>',
    { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } },
  );
}

async function trimImageCache() {
  try {
    const c = await caches.open(IMG_CACHE);
    const keys = await c.keys();
    if (keys.length > IMG_CACHE_MAX) {
      await Promise.all(keys.slice(0, keys.length - IMG_CACHE_MAX).map((k) => c.delete(k)));
    }
  } catch (e) { /* 存储配额紧张时静默忽略，不影响图片显示 */ }
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      // 逐项 add：单个图标 404 不该拖垮整个 SW 安装
      await Promise.all(CORE.map((url) => cache.add(url).catch(() => {})));
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      // 只清本站主缓存的旧版本；IMG_CACHE 必须保留，否则每次发版演示图都要重下
      await Promise.all(
        keys
          .filter((k) => k.startsWith('xiongzhi-will-') && k !== CACHE && k !== IMG_CACHE)
          .map((k) => caches.delete(k)),
      );
      await self.clients.claim();
    })(),
  );
});

// 前端「清除缓存并重载」按钮 / 新版本接管用
self.addEventListener('message', (event) => {
  const type = event.data && event.data.type;
  if (type === 'XW_SKIP_WAITING') self.skipWaiting();
  if (type === 'XW_CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k)))),
    );
  }
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  // 视频/音频的 Range 分段请求交给浏览器直连：缓存的完整 200 响应会破坏分段播放
  if (req.headers.has('range')) return;

  const url = new URL(req.url);

  // ── 第三方动作演示素材：cache-first + 超时 ──
  // 首访联网拉取并缓存，之后直接命中缓存秒开；图床挂掉 / 弱网超时时快速失败，
  // 让页面 <img onError> 及时切到候选图源或占位，而不是一直转圈。
  const isImageReq =
    req.destination === 'image' || /\.(png|jpe?g|gif|webp|avif|svg)(\?|$)/i.test(url.pathname);
  if (isImageReq && IMG_HOSTS.some((h) => url.hostname === h || url.hostname.endsWith('.' + h))) {
    event.respondWith(
      (async () => {
        const c = await caches.open(IMG_CACHE);
        const cached = await c.match(req);
        if (cached) return cached;
        try {
          const res = await fetchWithTimeout(req, IMG_TIMEOUT);
          if (res && (res.ok || res.type === 'opaque')) {
            c.put(req, res.clone()).then(trimImageCache).catch(() => {});
          }
          return res || unavailable('image');
        } catch (e) {
          return unavailable('image');
        }
      })(),
    );
    return;
  }

  if (url.origin !== self.location.origin) return;

  // ── 导航请求：network-first + 超时 + 离线兜底 ──
  if (req.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const res = await fetchWithTimeout(req, NAV_TIMEOUT);
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put('./index.html', copy)).catch(() => {});
            return res;
          }
          // 5xx / 404 也算「这次没拿到可用页面」，优先用上次缓存的站点壳
          return (await caches.match('./index.html')) || res || offlineShell();
        } catch (e) {
          return (await caches.match('./index.html')) || offlineShell();
        }
      })(),
    );
    return;
  }

  // ── 背景 / 加载视频：cache-first（文件几乎不变）──
  if (/\/images\/.*\.mp4$/.test(url.pathname)) {
    event.respondWith(
      (async () => {
        const cached = await caches.match(req);
        if (cached) return cached;
        try {
          const res = await fetchWithTimeout(req, ASSET_TIMEOUT);
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
          }
          return res || unavailable('video');
        } catch (e) {
          return unavailable('video');
        }
      })(),
    );
    return;
  }

  // ── 本站 JS/CSS/静态资源：stale-while-revalidate ──
  event.respondWith(
    (async () => {
      const cached = await caches.match(req);
      if (cached) {
        // 后台更新，失败静默忽略；不打断用户当前这次加载
        fetch(req)
          .then((res) => {
            if (res && res.ok && res.type === 'basic') {
              return caches.open(CACHE).then((c) => c.put(req, res.clone()));
            }
          })
          .catch(() => {});
        return cached;
      }
      try {
        const res = await fetchWithTimeout(req, ASSET_TIMEOUT);
        if (res && res.ok && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        }
        // 旧 hash chunk 404 = 发版了。这里刻意「不清缓存、不强制刷新」：
        // 由 Root.tsx 的 crash recovery 做一次受保护的刷新，避免刷新风暴。
        return res || unavailable('asset');
      } catch (e) {
        return unavailable('asset');
      }
    })(),
  );
});
