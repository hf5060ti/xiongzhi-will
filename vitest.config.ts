// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
// 测试配置：只跑 src 下的单元测试（纯计算逻辑，不需要浏览器环境）。
// 单独建配置而不复用 vite.config.ts，避免加载构建插件（miaoda 产物整理 / dev server 中间件）。
import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
    },
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
