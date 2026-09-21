// EXPORTS: ProviderInfo, ChatMessage, fetchProviders, chatStream
// 前端侧调用本地 AI 后台（server/server.js）的唯一入口。
// dev 环境走 vite proxy（/api → 127.0.0.1:8787）；如需直连可设 VITE_API_BASE。

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

const API_BASE = (import.meta.env.VITE_API_BASE || '').replace(/\/$/, '');

/** 读取后端已配置的模型列表 */
export async function fetchProviders(): Promise<ProviderInfo[]> {
  const res = await fetch(`${API_BASE}/api/providers`);
  if (!res.ok) throw new Error(`读取模型列表失败：HTTP ${res.status}`);
  const data = await res.json();
  return Array.isArray(data.providers) ? (data.providers as ProviderInfo[]) : [];
}

export interface StreamOptions {
  provider: string;
  messages: ChatMessage[];
  signal?: AbortSignal;
  onDelta: (text: string) => void;
}

/** 流式对话：逐段回调增量文本 */
export async function chatStream({ provider, messages, signal, onDelta }: StreamOptions): Promise<void> {
  const res = await fetch(`${API_BASE}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ provider, messages, stream: true }),
    signal,
  });

  if (!res.ok) {
    let msg = `请求失败：HTTP ${res.status}`;
    try {
      const data = await res.json();
      if (data?.error) {
        msg = data.hint ? `${data.error}（${data.hint}）` : String(data.error);
      } else if (data?.detail) {
        msg = String(data.detail);
      }
    } catch {
      /* 保留默认错误信息 */
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
