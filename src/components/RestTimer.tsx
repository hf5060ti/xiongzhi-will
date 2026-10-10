// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
import { useEffect, useMemo, useState } from 'react';
import { BellRing, Pause, Play, Plus, RotateCcw, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { restFor, type RestKind } from '@/lib/training-plan';
import { playFinishChime } from '@/lib/chime';
import {
  defaultRestSeconds,
  fmtDuration,
  REST_KIND_LABEL,
  REST_KIND_NOTE,
  REST_PRESETS,
} from '@/lib/rest-timer';
import { cn } from '@/lib/utils';

/**
 * 组间休息计时器。
 *
 * 为什么需要它：本站反复强调「复合动作休息 3–5 分钟、孤立动作 2–3 分钟」，
 * 计划页与动作卡也一直标注 restFor() 给出的区间——但此前全站没有任何计时工具，
 * 用户在器械区只能凭感觉或切出去开系统秒表。这里把那条原则变成能按一下就开始的工具。
 *
 * 计时口径：以「结束时间戳」而不是每次 tick 累减为准。
 * 手机锁屏、切到别的 App 会让 setInterval 被节流甚至暂停，累减会越走越慢；
 * 存 endsAt 再拿当前时间相减，回到页面时读到的仍是真实剩余时间。
 */

export interface RestTimerProps {
  /** 传入动作名时自动判定复合 / 孤立（走 restFor()），用户仍可手动改 */
  exerciseName?: string;
  className?: string;
}

export function RestTimer({ exerciseName, className }: RestTimerProps) {
  const auto = useMemo(() => (exerciseName ? restFor(exerciseName) : null), [exerciseName]);

  const [kind, setKind] = useState<RestKind>(() => auto?.kind ?? 'compound');
  const [seconds, setSeconds] = useState(() => defaultRestSeconds(auto?.kind ?? 'compound'));
  // endsAt 非空 = 正在跑；为空时 remainingMs 是暂停 / 未开始的剩余量
  const [endsAt, setEndsAt] = useState<number | null>(null);
  const [remainingMs, setRemainingMs] = useState(() => defaultRestSeconds(auto?.kind ?? 'compound') * 1000);
  const [now, setNow] = useState(() => Date.now());
  const [finished, setFinished] = useState(false);

  // 换了动作名就在渲染期同步一次（React 官方的 "adjusting state on prop change" 写法：
  // 比放进 effect 少一轮级联渲染）。调用方也可以直接给 key={exerciseName} 强制重挂载。
  const [lastName, setLastName] = useState(exerciseName);
  if (exerciseName !== lastName) {
    setLastName(exerciseName);
    if (auto) {
      setKind(auto.kind);
      setSeconds(defaultRestSeconds(auto.kind));
      setRemainingMs(defaultRestSeconds(auto.kind) * 1000);
      setEndsAt(null);
      setFinished(false);
    }
  }

  // 只在计时期间起 tick；归零收尾也放在定时器回调里——
  // effect 体内同步 setState 会触发级联渲染，项目 lint 是 --max-warnings=0，不允许。
  useEffect(() => {
    if (endsAt === null) return;
    const id = window.setInterval(() => {
      const t = Date.now();
      setNow(t);
      if (t < endsAt) return;
      window.clearInterval(id);
      setEndsAt(null);
      setRemainingMs(0);
      setFinished(true);
      playFinishChime();
    }, 200);
    return () => window.clearInterval(id);
  }, [endsAt]);

  const running = endsAt !== null;
  const remaining = running ? Math.max(0, endsAt - now) : remainingMs;

  // 计时期间把剩余时间写进标签页标题：锁屏回来或切到别的页面也能一眼看到还剩多久
  const remainingLabel = fmtDuration(remaining);
  useEffect(() => {
    if (endsAt === null) return;
    const prev = document.title;
    return () => {
      document.title = prev;
    };
  }, [endsAt]);
  useEffect(() => {
    if (endsAt === null) return;
    document.title = `${remainingLabel} · 组间休息`;
  }, [endsAt, remainingLabel]);

  const totalMs = seconds * 1000;
  const progress = totalMs > 0 ? Math.min(100, Math.max(0, (1 - remaining / totalMs) * 100)) : 0;
  const presets = REST_PRESETS[kind];

  const changeKind = (k: RestKind) => {
    setKind(k);
    setEndsAt(null);
    setSeconds(defaultRestSeconds(k));
    setRemainingMs(defaultRestSeconds(k) * 1000);
    setFinished(false);
  };

  const pickSeconds = (s: number) => {
    setSeconds(s);
    setEndsAt(null);
    setRemainingMs(s * 1000);
    setFinished(false);
  };

  const start = () => {
    const base = remainingMs > 0 ? remainingMs : seconds * 1000;
    setFinished(false);
    setNow(Date.now());
    setEndsAt(Date.now() + base);
  };

  const pause = () => {
    if (endsAt === null) return;
    setRemainingMs(Math.max(0, endsAt - Date.now()));
    setEndsAt(null);
  };

  const reset = () => {
    setEndsAt(null);
    setRemainingMs(seconds * 1000);
    setFinished(false);
  };

  const add30 = () => {
    setFinished(false);
    if (endsAt !== null) {
      setEndsAt(endsAt + 30_000);
      setNow(Date.now());
    } else {
      setRemainingMs((v) => v + 30_000);
    }
  };

  return (
    <div
      className={cn(
        'rounded-xl border border-white/10 bg-card/60 p-4 backdrop-blur-xl',
        finished && 'border-primary/50 ring-1 ring-primary/30',
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <Timer className="h-5 w-5 text-primary" />
        <h3 className="text-base font-semibold text-foreground">组间休息计时</h3>
        {auto && exerciseName && (
          <span className="truncate rounded bg-primary/10 px-2 py-0.5 text-xs text-primary">
            按「{exerciseName}」判定
          </span>
        )}
      </div>

      {/* 类型切换：自动判定后仍可手动改——restFor() 用动作名正则匹配，边界情况难免判错 */}
      <div className="mt-3 grid grid-cols-2 gap-2">
        {(['compound', 'isolation'] as RestKind[]).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => changeKind(k)}
            aria-pressed={kind === k}
            className={cn(
              'rounded-lg border px-3 py-1.5 text-xs transition-colors',
              kind === k
                ? 'border-primary/50 bg-primary/15 text-primary'
                : 'border-white/10 text-muted-foreground hover:bg-accent hover:text-foreground',
            )}
          >
            {REST_KIND_LABEL[k]} · {k === 'compound' ? '3–5 分' : '2–3 分'}
          </button>
        ))}
      </div>

      <p className="mt-2 type-meta text-muted-foreground">{REST_KIND_NOTE[kind]}</p>

      {/* 倒计时主体 */}
      <div className="mt-3 text-center">
        <p
          className={cn(
            'font-display text-5xl font-bold tabular-nums tracking-tight',
            finished ? 'text-primary' : 'text-foreground',
          )}
        >
          {remainingLabel}
        </p>
        <Progress value={progress} className="mt-3 h-1.5" />
        <p className="mt-2 type-meta text-muted-foreground">
          {finished ? (
            <span className="flex items-center justify-center gap-1 text-primary">
              <BellRing className="h-3.5 w-3.5" />
              休息结束，可以开始下一组
            </span>
          ) : (
            `目标 ${fmtDuration(totalMs)} · 剩余 ${fmtDuration(remaining)}`
          )}
        </p>
      </div>

      {/* 预设时长 */}
      <div className="mt-3 flex gap-2">
        {presets.map((p) => (
          <button
            key={p.sec}
            type="button"
            onClick={() => pickSeconds(p.sec)}
            aria-pressed={seconds === p.sec}
            className={cn(
              'flex-1 rounded-lg border px-2 py-1.5 text-xs transition-colors',
              seconds === p.sec
                ? 'border-primary/50 bg-primary/10 text-primary'
                : 'border-white/10 text-muted-foreground hover:bg-accent hover:text-foreground',
            )}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* 控制区 */}
      <div className="mt-3 flex flex-wrap gap-2">
        <Button
          type="button"
          onClick={running ? pause : start}
          className="flex-1 gap-1.5"
          variant={running ? 'secondary' : 'default'}
        >
          {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {running ? '暂停' : remainingMs < seconds * 1000 && remainingMs > 0 ? '继续' : '开始休息'}
        </Button>
        <Button type="button" onClick={add30} variant="outline" className="gap-1.5">
          <Plus className="h-4 w-4" />
          30 秒
        </Button>
        <Button type="button" onClick={reset} variant="outline" size="icon" aria-label="重置">
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default RestTimer;
