// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
// 入口只做挂载：不在这里定义任何组件（会让 react-refresh 失效），
// 路由 / 错误边界 / 启动动画都在 src/components/Root.tsx。
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Root } from '@/components/Root';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);

// PWA：仅生产环境注册 service worker，支持添加到主屏幕 + 离线打开
// 桌面离线版是 file:// 协议，注册必然失败且毫无意义，直接跳过（SW 注册原先在 index.html
// 与这里各写了一份，判断条件还不一致，已统一收敛到此处）
const canRegisterSw =
  import.meta.env.PROD &&
  typeof location !== 'undefined' &&
  location.protocol !== 'file:' &&
  'serviceWorker' in navigator;
if (canRegisterSw) {
  window.addEventListener('load', () => {
    // 用 BASE_URL 拼绝对路径：子路由（如 /library、/life/xxx）下 './sw.js'
    // 会被解析成 /xiongzhi-will/library/sw.js，导致注册失败
    navigator.serviceWorker
      .register(`${import.meta.env.BASE_URL}sw.js`, { scope: import.meta.env.BASE_URL })
      .catch(() => {
        /* 注册失败不影响正常使用 */
      });
  });
}
