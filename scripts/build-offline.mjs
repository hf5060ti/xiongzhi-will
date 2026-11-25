// 构建离线单文件页面：桌面版/index.html
// 供 Electron 打包与「双击即用」两种形态共用。
// 关键点：必须同时设置 SKIP_MIAODA=1，否则妙搭产物整理插件会删掉 dist/client。
import fs from 'node:fs';
import path from 'node:path';

process.env.SKIP_MIAODA = '1';
process.env.DESKTOP_BUILD = '1';

const root = path.resolve(import.meta.dirname, '..');
const { build } = await import('vite');

await build({
  root,
  configFile: path.join(root, 'vite.config.ts'),
  mode: 'production',
});

const src = path.join(root, 'dist', 'client', 'index.html');
if (!fs.existsSync(src)) {
  console.error('[xw] 离线构建未产出 dist/client/index.html');
  process.exit(1);
}

const destDir = path.join(root, '桌面版');
fs.mkdirSync(destDir, { recursive: true });
fs.copyFileSync(src, path.join(destDir, 'index.html'));

// 页面仍引用 manifest 与图标；一并带上，避免 file:// 下 404。
for (const rel of [
  'manifest.webmanifest',
  'images/icon-main-192.png',
  'images/icon-main-512.png',
]) {
  const from = path.join(root, 'dist', 'client', rel);
  const to = path.join(destDir, rel);
  if (!fs.existsSync(from)) continue;
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
}

const html = fs.readFileSync(src, 'utf8');
const externalRefs = [...html.matchAll(/<(?:script|link)[^>]+(?:src|href)="\.\/[^"]+"/g)];
if (externalRefs.length) {
  console.warn(`[xw] 警告：仍有 ${externalRefs.length} 处外部相对资源引用`);
}
const size = (Buffer.byteLength(html, 'utf8') / 1024 / 1024).toFixed(2);
console.log(`[xw] 桌面版/index.html 已更新（${size} MB，自包含）`);
