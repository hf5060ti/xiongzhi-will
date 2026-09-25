/**
 * 雄心意志 · 本地 AI 后台服务（零依赖，Node 原生 http）
 *
 * 作用：把两路 OpenAI 兼容接口统一代理给前端，前端只认 provider 名字。
 *   - doubao：豆包（火山方舟，OpenAI 兼容）
 *   - marvis：另一路模型（任意 OpenAI 兼容接口，base_url / model 自己填）
 *
 * 启动：node server/server.js
 * 配置：编辑 server/.env（参考同目录 .env.example），改完重启服务即可。
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── .env 读取（不依赖第三方库）──────────────────────────────
function readEnvFile(file) {
  const out = {};
  try {
    for (const raw of fs.readFileSync(file, 'utf-8').split(/\r?\n/)) {
      const line = raw.trim();
      if (!line || line.startsWith('#')) continue;
      const eq = line.indexOf('=');
      if (eq < 0) continue;
      const key = line.slice(0, eq).trim();
      let val = line.slice(eq + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (key) out[key] = val;
    }
  } catch {
    /* 没有 .env 时静默，靠下方默认值兜底 */
  }
  return out;
}

const env = { ...readEnvFile(path.join(__dirname, '.env')), ...process.env };
const PORT = Number(env.PORT || 8787);

const PROVIDERS = {
  doubao: {
    id: 'doubao',
    label: '豆包',
    baseUrl: (env.DOUBAO_BASE_URL || 'https://ark.cn-beijing.volces.com/api/v3').replace(/\/+$/, ''),
    apiKey: env.DOUBAO_API_KEY || '',
    model: env.DOUBAO_MODEL || '',
  },
  marvis: {
    id: 'marvis',
    label: 'Marvis',
    baseUrl: (env.MARVIS_BASE_URL || '').replace(/\/+$/, ''),
    apiKey: env.MARVIS_API_KEY || '',
    model: env.MARVIS_MODEL || '',
  },
  ollama: {
    id: 'ollama',
    label: 'Ollama（本机）',
    baseUrl: (env.OLLAMA_BASE_URL || 'http://127.0.0.1:11434/v1').replace(/\/+$/, ''),
    apiKey: env.OLLAMA_API_KEY || 'ollama',
    model: env.OLLAMA_MODEL || 'qwen2.5:7b',
  },
};

const isReady = (p) => Boolean(p.baseUrl && p.apiKey && p.model);
const publicProvider = (p) => ({
  id: p.id,
  label: p.label,
  model: p.model,
  configured: isReady(p),
});

function json(res, status, data) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-store',
  });
  res.end(JSON.stringify(data));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on('data', (c) => {
      size += c.length;
      if (size > 2 * 1024 * 1024) {
        reject(new Error('请求体过大'));
        req.destroy();
        return;
      }
      chunks.push(c);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
    req.on('error', reject);
  });
}

async function handleChat(req, res) {
  let payload;
  try {
    payload = JSON.parse((await readBody(req)) || '{}');
  } catch {
    return json(res, 400, { error: '请求体不是合法 JSON' });
  }

  const provider = PROVIDERS[payload.provider];
  if (!provider) return json(res, 400, { error: `未知的 provider：${payload.provider}` });
  if (!isReady(provider)) {
    return json(res, 503, {
      error: `${provider.label} 尚未配置完成`,
      hint: '请编辑 server/.env，填写 BASE_URL / API_KEY / MODEL 后重启服务',
    });
  }

  const messages = Array.isArray(payload.messages) ? payload.messages : [];
  if (!messages.length) return json(res, 400, { error: 'messages 不能为空' });

  const stream = Boolean(payload.stream);
  const upstreamBody = { model: provider.model, messages, stream };
  if (typeof payload.temperature === 'number') upstreamBody.temperature = payload.temperature;
  if (typeof payload.max_tokens === 'number') upstreamBody.max_tokens = payload.max_tokens;

  let upstream;
  try {
    upstream = await fetch(`${provider.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${provider.apiKey}`,
      },
      body: JSON.stringify(upstreamBody),
    });
  } catch (e) {
    return json(res, 502, { error: `调用 ${provider.label} 失败`, detail: String(e && e.message) });
  }

  if (!upstream.ok) {
    const text = await upstream.text().catch(() => '');
    return json(res, upstream.status, {
      error: `${provider.label} 返回 HTTP ${upstream.status}`,
      detail: text.slice(0, 2000),
    });
  }

  if (!stream) {
    const data = await upstream.json().catch(() => null);
    return json(res, 200, data || { error: '上游返回内容无法解析' });
  }

  res.writeHead(200, {
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
    'Access-Control-Allow-Origin': '*',
  });
  const reader = upstream.body.getReader();
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(Buffer.from(value));
    }
  } catch {
    /* 客户端提前断开，忽略 */
  }
  res.end();
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || '127.0.0.1'}`);

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    return res.end();
  }

  if (url.pathname === '/api/health') {
    return json(res, 200, { ok: true, service: 'xiongzhi-will-backend', port: PORT });
  }
  if (url.pathname === '/api/providers' && req.method === 'GET') {
    return json(res, 200, { providers: Object.values(PROVIDERS).map(publicProvider) });
  }
  if (url.pathname === '/api/chat' && req.method === 'POST') {
    return handleChat(req, res);
  }
  return json(res, 404, { error: '接口不存在' });
});

server.listen(PORT, '127.0.0.1', () => {
  const ready = Object.values(PROVIDERS).filter(isReady).map((p) => p.label);
  console.log(`[雄心意志] 本地 AI 后台已启动：http://127.0.0.1:${PORT}`);
  console.log(
    `[雄心意志] 已就绪模型：${ready.length ? ready.join('、') : '暂无（请在 server/.env 填写 API Key）'}`,
  );
});
