// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
// GitHub OAuth 登录 + 会话管理。
// 部署 Cloudflare Worker（cloudflare-worker/auth-worker.js）后，把 Worker 地址填到 WORKER_URL。
import { startSync, stopSync, flushSync } from '@/lib/sync';

// ⚠️ 部署 Worker 后改成实际地址，例如 'https://xiongzhi-auth.你的子域.workers.dev'
// Worker 已部署到 Cloudflare，但 *.workers.dev 在国内被墙，登录暂不开放跳转；
// 数据全部存浏览器本地，不影响使用。以后国内可访问时把 ENABLE_LOGIN 改回 true。
export const WORKER_URL = 'https://xiongzhi-auth.3163599272.workers.dev';
const ENABLE_LOGIN = false;

/** 登录入口是否对外开放：云同步后端对国内可访问之前，UI 不显示登录按钮 */
export function isLoginEnabled(): boolean {
  return ENABLE_LOGIN;
}

const TOKEN_KEY = 'xiongzhi-will:auth-token';
const USER_KEY = 'xiongzhi-will:auth-user';

export interface AuthUser {
  uid: string;
  login: string;
  name: string;
  avatar: string;
}

export function getToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function getUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

/** 已登录判断 */
export function isLoggedIn(): boolean {
  return Boolean(getToken() && getUser());
}

export function clearSession() {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  } catch {
    /* ignore */
  }
}

/** 发起 GitHub 登录：跳转 Worker /login，完成后 Worker 回跳站点并带 token */
export function loginWithGithub() {
  if (!ENABLE_LOGIN) {
    // 国内访问 workers.dev 不稳定，先不跳转死链，给用户明确提示
    import('sonner').then(({ toast }) => {
      toast.info('账号云同步即将上线', {
        description: '当前所有训练记录、身体数据都保存在你自己的浏览器本地，不登录也能正常使用全部功能。云同步等国内可访问的后端部署好后再开放。',
        duration: 6000,
      });
    });
    return;
  }
  window.location.href = `${WORKER_URL}/login`;
}

/** 退出登录（仅清本地会话；云端数据保留，下次登录自动取回） */
export function logout() {
  clearSession();
  stopSync();
  window.dispatchEvent(new CustomEvent('xy-auth-change'));
}

/**
 * 处理登录回调：Worker 回跳到站点根并带上 ?token=xxx（线上是 BrowserRouter，
 * token 走普通查询串；桌面离线版用 HashRouter 时 Worker 不会介入，不受影响）。
 * 落地会话、拉取用户信息、清理 URL、启动同步。返回 true 表示已处理回调。
 */
export async function handleAuthCallback(): Promise<boolean> {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  if (!token) return false;

  // 落地会话
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch {
    /* ignore */
  }

  // 拉用户信息
  try {
    const res = await fetch(`${WORKER_URL}/api/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const user = (await res.json()) as AuthUser;
      try {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
      } catch {
        /* ignore */
      }
    }
  } catch {
    /* Worker 暂时不可用：会话已保存，同步稍后重试 */
  }

  // 清掉 URL 里的 token，避免刷新后重复处理 / 泄露在地址栏（保留部署子路径，如 /xiongzhi-will/）
  window.history.replaceState(null, '', window.location.pathname);

  // 开始同步（先上传本地再拉云端，保证不丢数据）
  startSync();
  void flushSync();

  // 通知 UI（Layout 登录区）刷新状态
  window.dispatchEvent(new CustomEvent('xy-auth-change'));

  return true;
}
