// 桌面版自检：在 Electron 中加载打包后的离线页面，把 DOM 状态写入 dist/desktop/diag.json。
const { app, BrowserWindow } = require('electron');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const entry = path.join(
  root,
  'dist',
  'desktop',
  'win-unpacked',
  'resources',
  'app.asar',
  '桌面版',
  'index.html',
);
const out = path.join(root, 'dist', 'desktop', 'diag.json');

const write = (data) => fs.writeFileSync(out, JSON.stringify(data, null, 2), 'utf8');
write({ stage: 'start', entry, exists: fs.existsSync(entry) });

app.whenReady().then(() => {
  write({ stage: 'ready' });
  const win = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
    },
  });

  win.webContents.once('did-finish-load', async () => {
    try {
      // did-finish-load 只代表文档加载完，React 可能还在渲染 loading 占位。
      // 轮询等待真实内容出现，否则自检会把「正在加载内容…」误判为成功。
      const rendered = await win.webContents.executeJavaScript(`
        new Promise((resolve) => {
          const started = Date.now();
          const check = () => {
            const root = document.getElementById('root');
            if (root && root.innerText.trim().length > 120) return resolve(true);
            if (Date.now() - started > 12000) return resolve(false);
            setTimeout(check, 200);
          };
          check();
        })
      `);
      const info = await win.webContents.executeJavaScript(
        `JSON.stringify({rendered:${String(rendered)},title:document.title,len:document.body.innerText.length,hasRoot:!!document.getElementById('root'),sample:document.body.innerText.slice(0,160)})`,
      );
      fs.writeFileSync(out, info, 'utf8');
    } catch (err) {
      fs.writeFileSync(out, JSON.stringify({ error: String(err) }), 'utf8');
    }
    app.quit();
  });

  win.loadFile(entry).catch((err) => write({ stage: 'load-error', error: String(err) }));
  setTimeout(() => {
    write({ stage: 'timeout', url: win.webContents.getURL() });
    app.quit();
  }, 15000);
});
