// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
// 应用根组件：路由 + 错误边界 + 账号系统初始化（启动动画已移除，直接进入主界面）。
// 路由选择放在这里而不是入口 index.tsx：入口文件不带任何 export，
// 在其中定义组件会让 react-refresh 失效（eslint react-refresh/only-export-components 报错）。
import { useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '@/components/ErrorFallback';
import { handleAuthCallback } from '@/lib/auth';
import { initSyncIfLoggedIn } from '@/lib/sync';
import App from '@/App';

// 线上与桌面统一使用 HashRouter：
// 桌面版是 file:// 协议，history.pushState 会被浏览器拒绝（origin 为 null）；
// 线上部署在 GitHub Pages / Gitee Pages 等静态托管时，子路由刷新服务端不会回退到
// index.html（尤其 Gitee Pages 直接 404），BrowserRouter 会失效。HashRouter 把路由
// 放进 # 之后，刷新永远只请求站点根，彻底规避该问题，且对本地双击打开同样兼容。
const Router = HashRouter;

// ── 稳定性兜底：chunk 加载失败 / 未捕获错误时自动刷新一次（防死循环） ──
// 场景：发版后旧 hash chunk 失效、网络抖动导致 dynamic import 失败、静态托管把
// 404 回退成 index.html 让浏览器把 HTML 当 JS 解析（"Unexpected token '<'"）。
//
// 这里原先在 window 'load' 时无条件清掉保护标记 —— 但 load 只代表 HTML 与初始资源
// 下载完，React 之后照样可能崩；于是「刷新 → load 清标记 → 又崩 → 再刷新」会无限循环，
// 用户看到的就是页面一直闪、永远打不开。改成时间戳冷却 + 只在 React 真正挂载稳定后解除。
const RECOVERY_KEY = 'xiongzhi-will:crash-recovery-at';
const RECOVERY_COOLDOWN = 60 * 1000;
const CHUNK_ERROR = /Importing a module|Failed to fetch|Loading chunk|dynamically imported module|error loading dynamically|Unexpected token/i;
let recoveredThisLoad = false;

function installCrashRecovery() {
  const recover = (reason: string) => {
    try {
      const last = Number(sessionStorage.getItem(RECOVERY_KEY) || 0);
      // 60 秒内已自动刷新过一次，就不再刷：交给 ErrorBoundary 显示可读的错误页，
      // 由用户手动点「刷新重试」。持续坏掉的资源不会再造成无限刷新。
      if (Date.now() - last < RECOVERY_COOLDOWN) return;
      sessionStorage.setItem(RECOVERY_KEY, String(Date.now()));
      recoveredThisLoad = true;
      console.warn('[雄性意志] 检测到资源加载异常，自动刷新一次：', reason);
      window.location.reload();
    } catch {
      /* 隐私模式 / 禁用存储：静默降级为不自动刷新 */
    }
  };
  window.addEventListener('unhandledrejection', (e) => {
    const msg = String(e.reason?.message || e.reason || '');
    if (CHUNK_ERROR.test(msg)) recover('chunk-load: ' + msg);
  });
  window.addEventListener('error', (e) => {
    const msg = String(e.message || '');
    if (CHUNK_ERROR.test(msg)) recover('sync-error: ' + msg);
  });
}
installCrashRecovery();

/** React 挂载并稳定运行 3 秒后才解除保护；本页刚做过自动恢复时一律不解除 */
function markAppHealthy() {
  if (recoveredThisLoad) return;
  try { sessionStorage.removeItem(RECOVERY_KEY); } catch { /* ignore */ }
}

/** 启动：不再有全屏入场动画，直接进入主界面（背景视频本身承担开场氛围） */
export function Root() {
  useEffect(() => {
    // 只有组件真的挂载并稳定运行后才算「这次加载成功」
    const healthy = setTimeout(markAppHealthy, 3000);
    return () => { clearTimeout(healthy); };
  }, []);

  // 账号系统初始化：处理 GitHub 登录回调（落地会话 + 拉取云端数据），
  // 以及刷新后恢复已登录会话的同步
  useEffect(() => {
    void handleAuthCallback();
    initSyncIfLoggedIn();
  }, []);

  return (
    <Router>
      <ReactErrorBoundary FallbackComponent={ErrorFallback}>
        <App />
      </ReactErrorBoundary>
    </Router>
  );
}
