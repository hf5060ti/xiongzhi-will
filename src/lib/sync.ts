// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
// 云端同步：登录后把本地数据（fitness-goal-app:* + recovery 日志 + 收藏）推送到 Cloudflare KV，
// 本地任何写入防抖上传；登录回调时先上传再下载，保证多设备数据一致、不丢。
import { exportAllData, importAllData } from '@/lib/store';
import { getToken, isLoggedIn, WORKER_URL } from '@/lib/auth';

/** 同步数据包结构：与 store.ts 导出格式一致，另含本地非 NS 前缀的附加键 */
interface SyncData {
  version: number;
  exportedAt: string;
  data: Record<string, unknown>;
}

/** 附加键（不走 fitness-goal-app: 前缀，但属于用户数据，一并同步） */
const EXTRA_KEYS = ['xiongzhi-will:recovery-log', 'xiongzhi-collect-items'];

const STORE_EVENT = 'xy-store-write';
const FLUSH_DELAY_MS = 3000;
const TICK_MS = 30_000;

let started = false;
let dirty = false;
let flushTimer: ReturnType<typeof setTimeout> | null = null;
let tickTimer: ReturnType<typeof setInterval> | null = null;
let syncing = false;

// ── 数据收集 / 落地 ──────────────────────────────────────
function gatherSyncData(): SyncData {
  const base = JSON.parse(exportAllData()) as SyncData;
  for (const key of EXTRA_KEYS) {
    try {
      const raw = localStorage.getItem(key);
      if (raw != null) {
        try {
          base.data[key] = JSON.parse(raw);
        } catch {
          base.data[key] = raw;
        }
      }
    } catch {
      /* ignore */
    }
  }
  base.exportedAt = new Date().toISOString();
  return base;
}

function applySyncData(payload: SyncData): { count: number } {
  // 主体（fitness-goal-app:*）走 store 的导入（含版本兼容处理）
  const res = importAllData(JSON.stringify(payload));
  // 附加键直接写回
  for (const key of EXTRA_KEYS) {
    if (key in payload.data) {
      try {
        localStorage.setItem(key, JSON.stringify(payload.data[key]));
      } catch {
        /* ignore */
      }
    }
  }
  return { count: res.count };
}

// ── 上传 / 下载 ──────────────────────────────────────────
export async function uploadNow(): Promise<boolean> {
  const token = getToken();
  if (!token || !isLoggedIn()) return false;
  const payload = gatherSyncData();
  try {
    const res = await fetch(`${WORKER_URL}/api/data`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ data: payload }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function downloadNow(): Promise<boolean> {
  const token = getToken();
  if (!token || !isLoggedIn()) return false;
  try {
    const res = await fetch(`${WORKER_URL}/api/data`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return false;
    const body = (await res.json()) as { data: SyncData | null };
    if (!body.data) return false;
    applySyncData(body.data);
    return true;
  } catch {
    return false;
  }
}

// ── 防抖上传 ─────────────────────────────────────────────
function scheduleFlush() {
  if (!dirty) return;
  if (flushTimer) clearTimeout(flushTimer);
  flushTimer = setTimeout(() => {
    flushTimer = null;
    void flushSync();
  }, FLUSH_DELAY_MS);
}

/** 立即尝试把本地数据推云端（登录回调 / 路由切换 / 定时器触发） */
export async function flushSync(): Promise<boolean> {
  if (syncing) return false;
  if (!isLoggedIn()) return false;
  syncing = true;
  try {
    const ok = await uploadNow();
    if (ok) dirty = false;
    return ok;
  } finally {
    syncing = false;
  }
}

function markDirty() {
  dirty = true;
  scheduleFlush();
}

function onRouteChange() {
  // 路由切换说明用户刚改完某页数据（recovery / collect 等不走 store.write 的键），
  // 此时强制刷一次，避免拖太久
  if (dirty) {
    dirty = false;
    void flushSync();
  }
}

// ── 启停 ─────────────────────────────────────────────────
export function startSync() {
  if (started) return;
  started = true;
  window.addEventListener(STORE_EVENT, markDirty);
  window.addEventListener('xy-route-change', onRouteChange);
  tickTimer = setInterval(() => {
    if (dirty) void flushSync();
  }, TICK_MS);
}

export function stopSync() {
  if (!started) return;
  started = false;
  window.removeEventListener(STORE_EVENT, markDirty);
  window.removeEventListener('xy-route-change', onRouteChange);
  if (tickTimer) clearInterval(tickTimer);
  tickTimer = null;
  if (flushTimer) clearTimeout(flushTimer);
  flushTimer = null;
  dirty = false;
}

// 登录会话已存在（页面刷新等场景）则自动恢复同步
export function initSyncIfLoggedIn() {
  if (isLoggedIn()) startSync();
}
