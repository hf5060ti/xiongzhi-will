// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
// 应用根组件：路由 + 错误边界 + 启动动画 + 账号系统初始化。
// 路由选择放在这里而不是入口 index.tsx：入口文件不带任何 export，
// 在其中定义组件会让 react-refresh 失效（eslint react-refresh/only-export-components 报错）。
import { useEffect, useState } from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import LoadingScreen from '@/components/LoadingScreen';
import { ErrorFallback } from '@/components/ErrorFallback';
import { handleAuthCallback } from '@/lib/auth';
import { initSyncIfLoggedIn } from '@/lib/sync';
import App from '@/App';

// 线上用 BrowserRouter：URL 是 /library、/plan 这样的真实路径，
// sitemap.xml 才能被搜索引擎正常索引（GitHub Pages 由 404.html 回退到 index.html）。
// 桌面离线版是 file:// 协议，history.pushState 会被浏览器拒绝（origin 为 null），
// 只能继续用 HashRouter；两者由构建期注入的 XW_DESKTOP 区分。
const Router = import.meta.env.XW_DESKTOP ? HashRouter : BrowserRouter;
// basename 只在 BrowserRouter 下有意义；桌面版是 './'，不能用。
const routerBasename = import.meta.env.XW_DESKTOP
  ? undefined
  : import.meta.env.MIAODA_CLIENT_BASE_PATH;

// ── 稳定性兜底：chunk 加载失败 / 未捕获错误时自动刷新一次（防死循环） ──
// 场景：vite HMR 后旧 chunk URL 失效、网络抖动导致 dynamic import 失败、CDN 抽风
// 用 sessionStorage 标记本次刷新已执行过一次，避免刷新死循环
function installCrashRecovery() {
  const KEY = 'xiongzhi-will:crash-recovered';
  const recover = (reason: string) => {
    try {
      if (sessionStorage.getItem(KEY) === '1') {
        // 已经刷新过一次还是挂了，不要再刷，让 ErrorBoundary 显示
        return;
      }
      sessionStorage.setItem(KEY, '1');
      console.warn('[雄性意志] 检测到异常，自动刷新一次：', reason);
      window.location.reload();
    } catch {
      /* 隐私模式 */
    }
  };
  // chunk load 失败：dynamic import() reject 时常见 'Importing a module script failed' / 'Failed to fetch'
  window.addEventListener('unhandledrejection', (e) => {
    const msg = String(e.reason?.message || e.reason || '');
    if (
      /Importing a module|Failed to fetch|Loading chunk|dynamically imported module|error loading dynamically/i.test(msg)
    ) {
      recover('chunk-load: ' + msg);
    }
  });
  // 同步脚本错误
  window.addEventListener('error', (e) => {
    const msg = String(e.message || '');
    if (/Loading chunk|error loading dynamically|Importing a module/i.test(msg)) {
      recover('sync-error: ' + msg);
    }
  });
  // 正常加载成功后清除标记，下次崩溃允许再自动刷新
  window.addEventListener('load', () => {
    try { sessionStorage.removeItem(KEY); } catch { /* ignore */ }
  });
}
installCrashRecovery();

/** 启动加载动画：刷新 / 首次进入时先展示动画，随后淡出进入主界面 */
export function Root() {
  const [splashDone, setSplashDone] = useState(false);
  useEffect(() => {
    // 动画时长缩短到 1.6 秒：视频首帧 poster 已足够建立品牌感，不等完整视频加载
    const t = setTimeout(() => setSplashDone(true), 1600);
    return () => clearTimeout(t);
  }, []);

  // 账号系统初始化：处理 GitHub 登录回调（落地会话 + 拉取云端数据），
  // 以及刷新后恢复已登录会话的同步
  useEffect(() => {
    void handleAuthCallback();
    initSyncIfLoggedIn();
  }, []);

  return (
    <Router basename={routerBasename}>
      <ReactErrorBoundary FallbackComponent={ErrorFallback}>
        <LoadingScreen visible={!splashDone} />
        <App />
      </ReactErrorBoundary>
    </Router>
  );
}
