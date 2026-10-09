/**
 * 雄性意志 · 账号与云同步（Cloudflare Workers）
 *
 * 作用：
 *   - GitHub OAuth 登录（授权码模式）：/login 跳 GitHub，/callback 换 token 后回跳站点
 *   - 会话：HS256 签名 JWT（无状态，secret 存 Worker secret，不落库）
 *   - 数据同步：GET/PUT /api/data，按 GitHub 用户 id 存 KV namespace（整包 JSON）
 *
 * 部署：
 *   1. Cloudflare 控制台 → Workers & Pages → Create Worker → 粘贴本文件
 *   2. 绑定 KV namespace（变量名 USER_DATA），用于存用户数据包
 *   3. Settings → Variables 加 secret：
 *        GITHUB_CLIENT_ID     = 你的 GitHub OAuth App Client ID
 *        GITHUB_CLIENT_SECRET = 你的 GitHub OAuth App Client Secret
 *        JWT_SECRET           = 任意长随机串（会话签名）
 *   4. 部署后把 Worker 地址填到前端 src/lib/auth.ts 的 WORKER_URL
 */

// ── 站点地址（登录成功后回跳）────────────────────────────
const SITE_ORIGIN = 'https://hf5060ti.github.io/xiongzhi-will';
const GITHUB_AUTHORIZE = 'https://github.com/login/oauth/authorize';
const GITHUB_TOKEN = 'https://github.com/login/oauth/access_token';
const GITHUB_USER = 'https://api.github.com/user';

// 只允许本站调用：Worker 用的是 Bearer token（不是 Cookie），收窄来源可避免
// 任意站点拿着用户 token 读写其云端数据
const ALLOWED_ORIGIN = SITE_ORIGIN;
const CORS = {
  'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
  'Access-Control-Allow-Methods': 'GET,POST,PUT,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  Vary: 'Origin',
};

// ── 工具：JSON 响应 ─────────────────────────────────────
function json(data, status = 200, extra = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...CORS, ...extra },
  });
}

// ── JWT：HS256 签名（Web Crypto，无依赖）────────────────
function b64url(bytes) {
  let s = '';
  const a = new Uint8Array(bytes);
  for (let i = 0; i < a.length; i++) s += String.fromCharCode(a[i]);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function b64urlDecode(str) {
  const b = str.replace(/-/g, '+').replace(/_/g, '/');
  const pad = b.length % 4 ? '='.repeat(4 - (b.length % 4)) : '';
  const bin = atob(b + pad);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function hmacSha256(secret, msg) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(msg));
  return new Uint8Array(sig);
}

async function signJwt(secret, payload, ttlSec = 60 * 60 * 24 * 30) {
  const header = b64url(new TextEncoder().encode(JSON.stringify({ alg: 'HS256', typ: 'JWT' })));
  const body = b64url(
    new TextEncoder().encode(JSON.stringify({ ...payload, iat: Math.floor(Date.now() / 1000), exp: Math.floor(Date.now() / 1000) + ttlSec })),
  );
  const sig = b64url(await hmacSha256(secret, `${header}.${body}`));
  return `${header}.${body}.${sig}`;
}

async function verifyJwt(secret, token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [header, body, sig] = parts;
    const expect = b64url(await hmacSha256(secret, `${header}.${body}`));
    if (expect !== sig) return null;
    const payload = JSON.parse(new TextDecoder().decode(b64urlDecode(body)));
    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

function getBearer(request) {
  const h = request.headers.get('Authorization') || '';
  const m = h.match(/^Bearer\s+(.+)$/i);
  return m ? m[1].trim() : null;
}

/** 读取请求 Cookie */
function readCookie(request, name) {
  const jar = request.headers.get('Cookie') || '';
  for (const part of jar.split(';')) {
    const [k, v] = part.trim().split('=');
    if (k === name) return decodeURIComponent(v || '');
  }
  return null;
}

// ── 路由 ───────────────────────────────────────────────
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // CORS 预检
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS });
    }

    const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, JWT_SECRET } = env;
    if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET || !JWT_SECRET) {
      return json({ error: 'Worker 未配置 GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET / JWT_SECRET' }, 500);
    }

    // 健康检查
    if (url.pathname === '/api/health') {
      return json({ ok: true, service: 'xiongzhi-auth-worker' });
    }

    // ── 登录：跳转 GitHub 授权 ──
    // state 写进 Cookie（HttpOnly + SameSite=Lax），回调时比对，
    // 防止攻击者把自己的授权码塞给受害者（登录 CSRF）
    if (url.pathname === '/login') {
      const state = crypto.randomUUID();
      const redirect = `${url.origin}/callback`;
      const authUrl = `${GITHUB_AUTHORIZE}?client_id=${encodeURIComponent(GITHUB_CLIENT_ID)}&redirect_uri=${encodeURIComponent(redirect)}&scope=read:user&state=${state}`;
      return new Response(null, {
        status: 302,
        headers: {
          Location: authUrl,
          'Set-Cookie': `gh_oauth_state=${state}; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=600`,
        },
      });
    }

    // ── 回调：换 token → 取用户 → 签发 JWT → 回跳站点 ──
    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      if (!code) return json({ error: '缺少 code' }, 400);

      // 校验 state：与 /login 写入的 Cookie 必须一致
      const state = url.searchParams.get('state') || '';
      const cookieState = readCookie(request, 'gh_oauth_state');
      if (!state || !cookieState || state !== cookieState) {
        return json({ error: 'state 校验失败，请重新登录' }, 403);
      }

      const tokenRes = await fetch(GITHUB_TOKEN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          client_id: GITHUB_CLIENT_ID,
          client_secret: GITHUB_CLIENT_SECRET,
          code,
        }),
      });
      if (!tokenRes.ok) {
        return json({ error: `GitHub token 换取失败 HTTP ${tokenRes.status}` }, 502);
      }
      const tokenData = await tokenRes.json();
      const accessToken = tokenData.access_token;
      if (!accessToken) return json({ error: 'GitHub 未返回 access_token' }, 502);

      const userRes = await fetch(GITHUB_USER, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!userRes.ok) return json({ error: `GitHub 用户获取失败 HTTP ${userRes.status}` }, 502);
      const user = await userRes.json();

      const jwt = await signJwt(JWT_SECRET, {
        uid: String(user.id),
        login: user.login,
        name: user.name || user.login,
        avatar: user.avatar_url || '',
      });

      // 回跳站点根路径，token 放查询串里（不进服务器日志/历史，前端读完立即从地址栏清掉）
      return Response.redirect(`${SITE_ORIGIN}/?token=${encodeURIComponent(jwt)}`, 302);
    }

    // ── 会话校验中间件 ──
    const token = getBearer(request);
    const session = token ? await verifyJwt(JWT_SECRET, token) : null;

    // ── 当前用户信息 ──
    if (url.pathname === '/api/me') {
      if (!session) return json({ error: '未登录' }, 401);
      return json({
        uid: session.uid,
        login: session.login,
        name: session.name,
        avatar: session.avatar,
      });
    }

    // ── 数据：读取 ──
    if (url.pathname === '/api/data' && request.method === 'GET') {
      if (!session) return json({ error: '未登录' }, 401);
      const raw = await env.USER_DATA.get(`user:${session.uid}`);
      if (!raw) return json({ data: null });
      return json({ data: JSON.parse(raw) });
    }

    // ── 数据：写入 ──
    if (url.pathname === '/api/data' && request.method === 'PUT') {
      if (!session) return json({ error: '未登录' }, 401);
      let payload;
      try {
        payload = await request.json();
      } catch {
        return json({ error: '请求体不是合法 JSON' }, 400);
      }
      if (typeof payload.data !== 'object' || payload.data === null) {
        return json({ error: '缺少 data 字段' }, 400);
      }
      await env.USER_DATA.put(`user:${session.uid}`, JSON.stringify(payload.data), {
        expirationTtl: 60 * 60 * 24 * 365,
      });
      return json({ ok: true });
    }

    return json({ error: '接口不存在' }, 404);
  },
};
