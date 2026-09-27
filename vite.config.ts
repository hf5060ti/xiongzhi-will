import fs from 'node:fs';
import path from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// ── 妙搭部署协议（参考《妙搭应用构建产物规范》）─────────────────────────
// 构建期环境变量（托管构建时由部署链路自动注入；本地开发不需要，缺省回退）：
//   MIAODA_CLIENT_BASE_PATH     应用路由根目录，如 /app/app_xxx
//   MIAODA_RESOURCE_CDN_PREFIX  JS/CSS 静态资源 CDN 前缀
const basePath = process.env.MIAODA_CLIENT_BASE_PATH || './';
const cdnPrefix = process.env.MIAODA_RESOURCE_CDN_PREFIX;

// 路由 basename 与资源前缀解耦：资源前缀缺省 './' 可相对解析，
// 但 basename 缺省必须是 '/'——'./' 会被 react-router 归一化为 '/./'，
// stripBasename 判定 URL 不匹配 → Router 渲染为空（整站白屏）
const routerBasePath = process.env.MIAODA_CLIENT_BASE_PATH || '/';

// 产物分层：vite 原生产物（dist/client，中间产物，整理后删除）→ 妙搭托管产物结构：
//   dist/output/           index.html + public 同源资源 + routes.json（走应用权限校验）
//   dist/output_resource/  assets JS/CSS（推 CDN，公开）
function miaodaOutputPlugin(): Plugin {
  return {
    name: 'miaoda-output',
    apply: 'build',
    // closeBundle 在 vite 全部写盘后执行，此时可安全整理并清理中间产物
    closeBundle() {
      const dist = path.resolve(import.meta.dirname, 'dist');
      const client = path.join(dist, 'client');
      const output = path.join(dist, 'output');
      const outputResource = path.join(dist, 'output_resource');

      fs.rmSync(output, { recursive: true, force: true });
      fs.rmSync(outputResource, { recursive: true, force: true });
      fs.mkdirSync(output, { recursive: true });

      // assets 之外的所有产物（index.html + public/ 平铺文件）→ 同源 output/
      for (const entry of fs.readdirSync(client)) {
        if (entry === 'assets') continue;
        fs.cpSync(path.join(client, entry), path.join(output, entry), {
          recursive: true,
        });
      }
      // assets → CDN 桶
      const assets = path.join(client, 'assets');
      if (fs.existsSync(assets)) {
        fs.cpSync(assets, path.join(outputResource, 'assets'), {
          recursive: true,
        });
      }
      // routes.json：扫描 src 内 <Route path> 生成路由枚举（TNS 按此遍历送审）；
      // SPA 场景各路由均由 index.html 服务
      const routes = collectRoutePaths(
        path.resolve(import.meta.dirname, 'src'),
      ).map((p) => ({ path: p, file: 'index.html' }));
      fs.writeFileSync(
        path.join(output, 'routes.json'),
        JSON.stringify(routes, null, 2) + '\n',
      );
      // 清理中间产物，dist 只保留部署分层
      fs.rmSync(client, { recursive: true, force: true });
    },
  };
}

// 本地开发自描述端点（协议 v0.4）：GET /spark.json 原样返回项目根声明文件，
// 供消费方（豆包客户端/Agent）识别妙搭托管协议应用；仅 dev server，线上不暴露
function sparkJsonPlugin(): Plugin {
  return {
    name: 'spark-json-endpoint',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/spark.json', (_req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Cache-Control', 'no-store');
        res.end(
          fs.readFileSync(path.resolve(import.meta.dirname, 'spark.json')),
        );
      });
    },
  };
}

// 收集 <Route path="..."> 声明的路由；index 路由计为 "/"，通配 "*" 不进枚举
function collectRoutePaths(srcDir: string): string[] {
  const paths = new Set<string>(['/']);
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(p);
      } else if (/\.(tsx|jsx|ts|js)$/.test(entry.name)) {
        const code = fs.readFileSync(p, 'utf-8');
        for (const m of code.matchAll(/<Route[^>]*\bpath=["']([^"']+)["']/g)) {
          const route = m[1];
          if (route.includes('*')) continue;
          paths.add(route.startsWith('/') ? route : `/${route}`);
        }
      }
    }
  };
  walk(srcDir);
  return [...paths];
}

export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss(), process.env.SKIP_MIAODA ? null : miaodaOutputPlugin(), sparkJsonPlugin()].filter(Boolean),
  // 生产构建：JS/CSS 引用带 CDN 前缀（无 CDN 时退回 base path）；dev 恒为 /
  base: command === 'build' ? cdnPrefix || basePath : '/',
  define: {
    // 路由 basename 单独注入，缺省 '/'（不再回落 './'）；
    // 缺省 './' 会让 React Router 无法匹配任何路由（整站白屏）
    // 桌面离线版（DESKTOP_BUILD）：BASE 用于拼接本地资源（视频/图片），
    // 必须为 './' 才能在 file:// 协议下相对解析到同目录资源；路由走 HashRouter，
    // 不依赖 BASE，因此桌面版单独用 './' 是安全的。
    'import.meta.env.MIAODA_CLIENT_BASE_PATH': JSON.stringify(
      command === 'serve'
        ? '/'
        : process.env.DESKTOP_BUILD === '1'
          ? './'
          : routerBasePath,
    ),
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
    },
  },
  // 本地开发：把 /api 转发到本地 AI 后台服务（server/server.js，默认 8787）
  server: {
    port: 26666,
    proxy: {
      '/api': {
        target: process.env.API_PROXY_TARGET || 'http://127.0.0.1:8787',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist/client',
    // 桌面离线版（DESKTOP_BUILD=1）：把所有懒加载页面内联进主 bundle。
    // 浏览器在 file:// 协议下禁止动态 import()（CORS 安全限制），
    // 双击本地 index.html 时 React.lazy 的页面 chunk 会永远加载失败、卡在转圈。
    // 单 bundle 后双击直接可用；线上 GitHub Pages 走 HTTP，保持代码分割不影响。
    // 产物格式用 IIFE：桌面版以经典 <script src> 外部引用加载（file:// 下不受
    // module script 的 CORS 限制），且外部 JS 不会被 HTML 解析器扫描，
    // 彻底规避内联 module script 中 "</script" 字面量提前截断脚本的问题。
    ...(process.env.DESKTOP_BUILD === '1'
      ? {
          rollupOptions: {
            output: {
              inlineDynamicImports: true,
              format: 'iife',
            },
          },
          chunkSizeWarningLimit: 6000,
        }
      : {}),
  },
}));
