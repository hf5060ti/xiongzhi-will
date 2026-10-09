// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly MIAODA_CLIENT_BASE_PATH: string;
  /** 桌面离线版（file:// 双击打开）构建标记：true 时路由走 HashRouter */
  readonly XW_DESKTOP: boolean;
}
