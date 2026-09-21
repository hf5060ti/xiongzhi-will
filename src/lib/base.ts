// EXPORTS: BASE
// 应用根路径前缀：dev 下为空，发布后为 /app/app_xxx。手写路径一律用它拼接。
export const BASE = (import.meta.env.MIAODA_CLIENT_BASE_PATH || '').replace(/\/$/, '') + '/';
