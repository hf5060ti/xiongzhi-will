import fs from 'node:fs';
import path from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

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

// 桌面离线版（DESKTOP_BUILD）专用：把根模板里的「file:// 引导」整段移除。
// 否则桌面版自身也是用 file:// 双击打开的，会误触发引导、反而看不到应用。
// 用 /*XW_FILE_GUIDE_START*/ ... /*XW_FILE_GUIDE_END*/ 精确切掉这段逻辑，
// 非桌面构建原样保留（线上/开发入口被 file:// 误打开时仍要引导到桌面版）。
function stripFileGuidePlugin(): Plugin {
  return {
    name: 'xw-strip-file-guide',
    apply: 'build',
    enforce: 'pre',
    transformIndexHtml(html) {
      if (process.env.DESKTOP_BUILD !== '1') return html;
      return html.replace(
        /\/\*XW_FILE_GUIDE_START\*\/[\s\S]*?\/\*XW_FILE_GUIDE_END\*\//,
        '',
      );
    },
  };
}

// 桌面离线版：SW 缓存名里的 __XW_BUILD__ 占位符在 CI 里由 deploy.yml 用 commit SHA
// 替换，但桌面版不走 CI，占位符会原样留在 sw.js 里（缓存名变成永久固定的字符串）。
// 桌面版是 file://，src/index.tsx 已跳过 SW 注册，实际不影响使用；这里仍在构建期
// 替换成稳定版本号，避免把未替换的占位符交付出去。
function stampDesktopSwPlugin(): Plugin {
  let outDir = '';
  return {
    name: 'xw-stamp-desktop-sw',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir;
    },
    closeBundle() {
      if (process.env.DESKTOP_BUILD !== '1') return;
      const swPath = path.join(path.resolve(import.meta.dirname, outDir), 'sw.js');
      if (!fs.existsSync(swPath)) return;
      const pkg = JSON.parse(fs.readFileSync(path.resolve(import.meta.dirname, 'package.json'), 'utf8'));
      const stamp = `desktop-${pkg.version}`;
      const before = fs.readFileSync(swPath, 'utf8');
      if (before.includes('__XW_BUILD__')) {
        fs.writeFileSync(swPath, before.replaceAll('__XW_BUILD__', stamp));
        console.log(`[xw-stamp-desktop-sw] sw.js 缓存版本 = ${stamp}`);
      }
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
  plugins: [react(), tailwindcss(), process.env.SKIP_MIAODA ? null : miaodaOutputPlugin(), sparkJsonPlugin(), stripFileGuidePlugin(), stampDesktopSwPlugin(), process.env.DESKTOP_BUILD === '1' ? viteSingleFile() : null].filter(Boolean),
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
    // 桌面离线版标记：file:// 下 history.pushState 会被浏览器拒绝（origin 为 null），
    // 所以桌面版必须用 HashRouter，线上用 BrowserRouter。
    // process.env 在客户端拿不到，只能在构建期注入。
    'import.meta.env.XW_DESKTOP': JSON.stringify(process.env.DESKTOP_BUILD === '1'),
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
    // 桌面离线版（DESKTOP_BUILD=1）：用 vite-plugin-singlefile 把 JS/CSS/图片
    // 全部内联进单个 index.html，双击 file:// 即可运行，无需服务器、无需外部文件。
    // 浏览器在 file:// 下禁止「外链」ESM（CORS），但「内联」的 <script type=module>
    // 可以正常执行；singlefile 插件会正确处理 "</script" 等字面量转义，避免手工内联
    // 时脚本被提前截断。inlineDynamicImports 消除动态 import()，单 bundle 离线可用；
    // assetsInlineLimit 调大把图片也内联为 base64，使桌面版完全自包含。
    // （早期方案用 IIFE 经典脚本，但 Vite 8/rolldown 因 import.meta 不支持 iife，已弃用。）
    ...(process.env.DESKTOP_BUILD === '1'
      ? {
          rollupOptions: {
            output: {
              inlineDynamicImports: true,
            },
          },
          // 单文件离线版：图片也内联为 base64，桌面版/index.html 完全自包含
          assetsInlineLimit: 100000000,
          cssCodeSplit: false,
          chunkSizeWarningLimit: 6000,
        }
      : {}),
  },
}));
