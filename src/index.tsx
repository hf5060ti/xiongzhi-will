// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '@/components/ErrorFallback';
import LoadingScreen from '@/components/LoadingScreen';
import { handleAuthCallback } from '@/lib/auth';
import { initSyncIfLoggedIn } from '@/lib/sync';
import App from './App';
import './index.css';

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

// 启动加载动画：刷新 / 首次进入时先展示动画，随后淡出进入主界面
function Root() {
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
    <>
      <LoadingScreen visible={!splashDone} />
      <App />
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <ReactErrorBoundary FallbackComponent={ErrorFallback}>
        <Root />
      </ReactErrorBoundary>
    </HashRouter>
  </StrictMode>,
);

// PWA：仅生产环境注册 service worker，支持添加到主屏幕 + 离线打开
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js', { scope: './' }).catch(() => {
      /* 注册失败不影响正常使用 */
    });
  });
}
