// 雄性意志 · Electron 主进程
// 仅负责承载已构建好的离线单文件页面（桌面版/index.html），不改动任何业务代码。
const { app, BrowserWindow, shell } = require('electron');
const path = require('node:path');

/** @type {BrowserWindow | null} */
let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1024,
    minHeight: 640,
    title: '雄性意志',
    backgroundColor: '#0a0a0a',
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      spellcheck: false,
      webSecurity: true,
    },
  });

  // 自检模式：XW_DIAG=1 时打印页面加载结果后退出，供 CI/命令行验证。
  if (process.env.XW_DIAG === '1') {
    mainWindow.webContents.once('did-finish-load', async () => {
      try {
        const info = await mainWindow.webContents.executeJavaScript(
          `JSON.stringify({title:document.title,len:document.body.innerText.length,hasRoot:!!document.getElementById('root'),sample:document.body.innerText.slice(0,120)})`,
        );
        console.log('[xw-diag]', info);
      } catch (err) {
        console.error('[xw-diag] failed:', err);
      }
      app.quit();
    });
  }

  // 开发态与打包态路径一致：文件随 app.asar 一起交付，loadFile 可直接读取。
  const entry = path.join(__dirname, '..', '桌面版', 'index.html');
  mainWindow.loadFile(entry).catch((err) => {
    console.error('[xw] 加载离线页面失败:', err);
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow?.show();
    mainWindow?.focus();
  });

  // 外链交给系统浏览器，应用内不跳转。
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:\/\//.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });
  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (/^https?:\/\//.test(url)) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
