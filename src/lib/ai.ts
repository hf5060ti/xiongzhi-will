// EXPORTS: ProviderInfo, ChatMessage, fetchProviders, chatStream, pingBackend,
//          BackendOfflineError, getApiBase, getDefaultApiBase, setApiBase,
//          resetApiBase, LOCAL_BACKEND_HINT
// 前端侧调用本地 AI 后台（server/server.js）的唯一入口。
// dev 环境走 vite proxy（/api → 127.0.0.1:8787）；如需直连可设 VITE_API_BASE，
// 或让用户在页面上填写自定义后台地址（存 localStorage，刷新后仍生效）。

export interface ProviderInfo {
  id: string;
  label: string;
  model: string;
  configured: boolean;
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

/** 构建期注入的默认后台地址（留空＝同源 /api，dev 走 vite proxy） */
const DEFAULT_API_BASE = (import.meta.env.VITE_API_BASE || '').replace(/\/+$/, '');
/** 用户自定义后台地址的持久化键 */
const STORAGE_KEY = 'xiongzhi-will:api-base';
/** 本地后台默认监听地址，线上页面连回本机时填这个 */
export const LOCAL_BACKEND_HINT = 'http://127.0.0.1:8787';

/** 规范化用户输入的地址：去空白、去尾部斜杠、缺协议时补 http:// */
export function normalizeApiBase(value: string): string {
  const v = (value || '').trim().replace(/\/+$/, '');
  if (!v) return '';
  if (!/^https?:\/\//i.test(v)) return `http://${v}`;
  return v;
}

/** 构建期默认地址 */
export function getDefaultApiBase(): string {
  return DEFAULT_API_BASE;
}

/** 当前生效的后台地址；空串表示同源（dev 由 vite proxy 转发到 127.0.0.1:8787） */
export function getApiBase(): string {
  try {
    const custom = normalizeApiBase(localStorage.getItem(STORAGE_KEY) || '');
    if (custom) return custom;
  } catch {
    /* 隐私模式等场景读不到 localStorage，退回默认地址 */
  }
  return DEFAULT_API_BASE;
}

/** 写入/清除自定义后台地址，返回规范化后的结果 */
export function setApiBase(value: string): string {
  const v = normalizeApiBase(value);
  try {
    if (v) localStorage.setItem(STORAGE_KEY, v);
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* 存不了也不影响本次会话使用 */
  }
  return v;
}

/** 清除自定义地址，恢复构建期默认值 */
export function resetApiBase(): string {
  return setApiBase('');
}

/** 当前是否使用用户自定义地址 */
export function hasCustomApiBase(): boolean {
  try {
    return Boolean(normalizeApiBase(localStorage.getItem(STORAGE_KEY) || ''));
  } catch {
    return false;
  }
}

/** 当前页面是否运行在本机（本地开发时不需要连后台提示） */
export function isLocalPage(): boolean {
  if (typeof location === 'undefined') return false;
  return /^(localhost|127\.0\.0\.1|\[::1\]|0\.0\.0\.0)$/i.test(location.hostname);
}

/** 「本地后台未连接」——与「后台返回了业务错误」区分开，UI 据此切换到引导态 */
export class BackendOfflineError extends Error {
  /** unreachable：地址后面没有可用的后台；invalid-response：连上了但不是我们的后台 */
  readonly reason: 'unreachable' | 'invalid-response';
  /** 出错时使用的后台地址（空串表示同源） */
  readonly apiBase: string;
  /** 可直接展示给用户的诊断信息 */
  readonly detail: string;

  constructor(reason: 'unreachable' | 'invalid-response', apiBase: string, detail = '') {
    super('本地后台未连接');
    this.name = 'BackendOfflineError';
    this.reason = reason;
    this.apiBase = apiBase;
    this.detail = detail;
  }
}

/** 这些状态码意味着「这个地址后面没有我们的后台」（静态托管 404 / 反代 5xx 等） */
const OFFLINE_STATUS = new Set([404, 405, 500, 501, 502, 503, 504]);

function isAbort(e: unknown): boolean {
  return e instanceof DOMException && e.name === 'AbortError';
}

async function requestRaw(path: string, init?: RequestInit): Promise<Response> {
  const base = getApiBase();
  try {
    return await fetch(`${base}${path}`, init);
  } catch (e) {
    if (isAbort(e)) throw e;
    throw new BackendOfflineError('unreachable', base, '网络请求失败（连接被拒绝或跨域被拦截）');
  }
}

async function readJson(res: Response): Promise<Record<string, unknown> | null> {
  const ct = res.headers.get('content-type') || '';
  if (!ct.includes('json')) {
    // 静态托管会把 404 页面 / index.html 直接返回，后端根本没跑
    throw new BackendOfflineError(
      'invalid-response',
      getApiBase(),
      `返回的不是接口数据（Content-Type: ${ct || '未知'}，HTTP ${res.status}）`,
    );
  }
  try {
    return (await res.json()) as Record<string, unknown>;
  } catch {
    return null;
  }
}

/** 读取后端已配置的模型列表；后台不可达时抛 BackendOfflineError */
export async function fetchProviders(): Promise<ProviderInfo[]> {
  const res = await requestRaw('/api/providers');
  if (OFFLINE_STATUS.has(res.status)) {
    throw new BackendOfflineError('unreachable', getApiBase(), `HTTP ${res.status}`);
  }
  const data = await readJson(res);
  if (!res.ok) {
    const err = data?.error;
    throw new Error(err ? String(err) : `读取模型列表失败：HTTP ${res.status}`);
  }
  return Array.isArray(data?.providers) ? (data.providers as ProviderInfo[]) : [];
}

/** 探测后台是否在线（/api/health），只用于状态判断，不抛错 */
export async function pingBackend(): Promise<boolean> {
  try {
    const res = await requestRaw('/api/health');
    if (!res.ok) return false;
    const data = await readJson(res);
    return Boolean(data?.ok);
  } catch {
    return false;
  }
}

export interface StreamOptions {
  provider: string;
  messages: ChatMessage[];
  signal?: AbortSignal;
  onDelta: (text: string) => void;
}

/** 流式对话：逐段回调增量文本 */
export async function chatStream({ provider, messages, signal, onDelta }: StreamOptions): Promise<void> {
  const res = await requestRaw('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ provider, messages, stream: true }),
    signal,
  });

  if (!res.ok) {
    let msg = `请求失败：HTTP ${res.status}`;
    let parsed = false;
    const ct = res.headers.get('content-type') || '';
    if (ct.includes('json')) {
      try {
        const data = (await res.json()) as Record<string, unknown>;
        parsed = true;
        if (data?.error) {
          msg = data.hint ? `${data.error}（${data.hint}）` : String(data.error);
        } else if (data?.detail) {
          msg = String(data.detail);
        }
      } catch {
        /* 保留默认错误信息 */
      }
    }
    // 后台返回了业务错误 → 照常展示；连不上后台 → 交给「本地后台未连接」引导态
    if (!parsed && OFFLINE_STATUS.has(res.status)) {
      throw new BackendOfflineError('unreachable', getApiBase(), `HTTP ${res.status}`);
    }
    throw new Error(msg);
  }

  if (!res.body) throw new Error('当前浏览器不支持流式响应');

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const blocks = buffer.split('\n\n');
    buffer = blocks.pop() ?? '';

    for (const block of blocks) {
      for (const line of block.split('\n')) {
        const trimmed = line.trim();
        if (!trimmed.startsWith('data:')) continue;
        const payload = trimmed.slice(5).trim();
        if (!payload || payload === '[DONE]') continue;
        try {
          const json = JSON.parse(payload);
          const delta = json?.choices?.[0]?.delta?.content;
          if (typeof delta === 'string' && delta) onDelta(delta);
        } catch {
          /* 忽略跨包截断的分片 */
        }
      }
    }
  }
}
