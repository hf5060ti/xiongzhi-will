@echo off
chcp 65001 >nul
title 雄性意志 - 本地服务
cd /d D:\雄性意志
echo 正在启动雄性意志本地服务...
echo 服务地址: http://localhost:26666/
echo 关闭本窗口即可停止服务。
echo.
start "雄性意志 - dev server" cmd /c "npm run dev -- --port 26666"
timeout /t 5 /nobreak >nul
start "" "http://localhost:26666/"
