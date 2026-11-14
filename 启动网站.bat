@echo off
title XiongZhi Will - Local Site
cd /d "D:\雄性意志"

echo ==========================================
echo   XiongZhi Will - Local Site
echo   Starting server, browser will open soon...
echo   Close this window to stop the site.
echo ==========================================

start "" powershell -NoProfile -WindowStyle Hidden -Command "Start-Sleep 2; Start-Process 'http://localhost:4173/'"

npx vite preview --port 4173 --strictPort
