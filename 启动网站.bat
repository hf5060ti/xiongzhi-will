@echo off
chcp 65001 >nul
setlocal
set "PATH=D:\nodejs;%PATH%"
cd /d "%~dp0"

echo ============================================
echo   雄心意志 · 本地启动
echo ============================================
echo.

echo [1/2] 启动本地 AI 后台服务（127.0.0.1:8787）...
start "雄心意志-后台服务" cmd /k "D:\nodejs\node.exe server\server.js"

echo [2/2] 启动网站开发服务（http://localhost:26666）...
start "雄心意志-网站" cmd /k "D:\nodejs\npm.cmd run dev"

echo.
echo 稍等几秒，浏览器会自动打开 http://localhost:26666
echo 两个黑色命令行窗口 = 两个服务，全部关掉即停止。
echo.
timeout /t 6 >nul
start "" http://localhost:26666
pause
