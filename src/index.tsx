import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '@/components/ErrorFallback';
import LoadingScreen from '@/components/LoadingScreen';
import App from './App';
import './index.css';

// 启动加载动画：刷新 / 首次进入时先展示动画，随后淡出进入主界面
function Root() {
  const [splashDone, setSplashDone] = useState(false);
  useEffect(() => {
    // 动画时长（视频循环 + 品牌字）+ 淡出过渡窗口
    const t = setTimeout(() => setSplashDone(true), 2900);
    return () => clearTimeout(t);
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
    <BrowserRouter basename={import.meta.env.MIAODA_CLIENT_BASE_PATH || '/'}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Root />
      </ErrorBoundary>
    </BrowserRouter>
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
