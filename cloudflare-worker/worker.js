/**
 * 雄性意志 · 云端 AI 代理（Cloudflare Workers）
 *
 * 作用：把硅基流动的 API Key 藏在 Worker secret 里，前端只调这个 Worker。
 * 任何人打开网站都能用，看不到 Key，不会被盗刷。
 *
 * 部署：
 *   1. Cloudflare 控制台 → Workers & Pages → Create Worker
 *   2. 粘贴本文件全部代码
 *   3. Settings → Variables → 加一个 secret：
 *        SILICONFLOW_KEY = sk-你的key
 *   4. 部署后把 Worker 地址填到网站后台地址里
 */

const UPSTREAM = "https://api.siliconflow.cn/v1";
const DEFAULT_MODEL = "Qwen/Qwen2.5-7B-Instruct";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS });
    }

    const url = new URL(request.url);
    const key = env.SILICONFLOW_KEY;

    if (!key) {
      return json({ error: "Worker 未配置 SILICONFLOW_KEY secret" }, 500);
    }

    // 健康检查
    if (url.pathname === "/api/health") {
      return json({ ok: true, service: "xiongzhi-ai-worker" });
    }

    // 模型列表
    if (url.pathname === "/api/providers") {
      return json({
        providers: [
          { id: "siliconflow", label: "Qwen2.5（云端免费）", model: DEFAULT_MODEL, configured: true },
        ],
      });
    }

    // 对话（流式）
    if (url.pathname === "/api/chat" && request.method === "POST") {
      let payload;
      try {
        payload = await request.json();
      } catch {
        return json({ error: "请求体不是合法 JSON" }, 400);
      }

      const messages = Array.isArray(payload.messages) ? payload.messages : [];
      if (!messages.length) return json({ error: "messages 不能为空" }, 400);

      const upstreamBody = {
        model: payload.model || DEFAULT_MODEL,
        messages,
        stream: true,
      };

      const upstream = await fetch(`${UPSTREAM}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify(upstreamBody),
      });

      if (!upstream.ok) {
        const text = await upstream.text().catch(() => "");
        return json(
          { error: `硅基流动返回 HTTP ${upstream.status}`, detail: text.slice(0, 1000) },
          upstream.status,
        );
      }

      // 直接把流式响应透传给前端
      return new Response(upstream.body, {
        headers: {
          "Content-Type": "text/event-stream; charset=utf-8",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
          ...CORS,
        },
      });
    }

    return json({ error: "接口不存在" }, 404);
  },
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...CORS },
  });
}
