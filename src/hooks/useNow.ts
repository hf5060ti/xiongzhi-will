// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
import { useEffect, useState } from 'react';

/**
 * 当前时间戳（毫秒）。
 *
 * 渲染期直接调用 Date.now() 是不纯的：同一次渲染重放会得到不同结果，
 * React 的 purity 规则（react-hooks/purity）会直接报错。
 * 这里把「现在」收敛成一个 state：首次渲染取一次，之后按 intervalMs 刷新，
 * 同一轮渲染里所有用到时间的地方口径一致（比如「距上次备份几天」「几天前训练」）。
 */
export function useNow(intervalMs = 60_000): number {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), intervalMs);
    return () => window.clearInterval(timer);
  }, [intervalMs]);
  return now;
}
