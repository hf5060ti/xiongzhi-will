// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
// 每动作个人记录（PR）录入与展示：记录「重量 × 次数」，按 Epley 估算 1RM；
// 以 1RM 为准，只有刷新纪录才覆盖旧值。数据存浏览器本地（lib/exercise-pr.ts）。
import { useState } from 'react';
import { Trophy, Pencil, Trash2, Check } from 'lucide-react';
import { getExercisePR, setExercisePR, clearExercisePR, type ExercisePR } from '@/lib/exercise-pr';

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function ExercisePRBox({ id }: { id: string }) {
  const [pr, setPr] = useState<ExercisePR | null>(() => getExercisePR(id));
  const [editing, setEditing] = useState(false);
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [date, setDate] = useState(today());
  const [flash, setFlash] = useState<string | null>(null);

  const openForm = () => {
    // 预填当前纪录，方便"更新"
    if (pr) {
      setWeight(String(pr.weightKg));
      setReps(String(pr.reps));
      setDate(pr.date);
    } else {
      setWeight('');
      setReps('');
      setDate(today());
    }
    setEditing(true);
  };

  const save = () => {
    const w = parseFloat(weight);
    const r = parseInt(reps, 10);
    if (!Number.isFinite(w) || w <= 0 || !Number.isFinite(r) || r <= 0) {
      setFlash('请填好重量与次数');
      return;
    }
    const next = setExercisePR(id, { weightKg: w, reps: r, date });
    setPr(next);
    setEditing(false);
    setFlash(next.isNewRecord ? `新纪录！估算 1RM ${next.oneRmKg} kg` : '已更新记录');
  };

  const clear = () => {
    clearExercisePR(id);
    setPr(null);
    setEditing(false);
    setFlash('已清除该动作 PR');
  };

  return (
    <div className="rounded-lg border border-border bg-card p-3.5">
      <div className="flex items-center justify-between gap-2">
        <h3 className="flex items-center gap-2 font-display text-base font-bold text-foreground">
          <Trophy className="h-4 w-4 text-primary" />
          个人记录（PR）
        </h3>
        {!editing && (
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={openForm}
              className="inline-flex items-center gap-1 rounded-md border border-primary/40 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
            >
              <Pencil className="h-3 w-3" />
              {pr ? '更新' : '记录'}
            </button>
            {pr && (
              <button
                type="button"
                onClick={clear}
                className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-destructive/50 hover:text-destructive"
              >
                <Trash2 className="h-3 w-3" />
                清除
              </button>
            )}
          </div>
        )}
      </div>

      {flash && (
        <p className="mt-2 flex items-center gap-1 text-xs font-medium text-primary">
          <Check className="h-3 w-3" />
          {flash}
        </p>
      )}

      {!editing && pr ? (
        <div className="mt-2 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-md border border-primary/30 bg-primary/5 p-2">
            <p className="text-[11px] text-muted-foreground">最佳组</p>
            <p className="font-display text-lg font-extrabold text-foreground">
              {pr.weightKg}
              <span className="ml-0.5 text-xs font-bold text-muted-foreground">kg×{pr.reps}</span>
            </p>
          </div>
          <div className="rounded-md border border-border bg-background/40 p-2">
            <p className="text-[11px] text-muted-foreground">估算 1RM</p>
            <p className="font-display text-lg font-extrabold text-primary">{pr.oneRmKg}</p>
          </div>
          <div className="rounded-md border border-border bg-background/40 p-2">
            <p className="text-[11px] text-muted-foreground">达成日期</p>
            <p className="font-display text-base font-bold text-foreground">{pr.date.slice(5)}</p>
          </div>
        </div>
      ) : !editing ? (
        <p className="mt-2 text-xs text-muted-foreground">
          还没有记录。记下你这个动作的最好成绩，之后每次突破都会提示新纪录。
        </p>
      ) : (
        <div className="mt-3 space-y-2.5">
          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">重量 (kg)</label>
              <input
                type="number"
                min={0}
                step="any"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="h-10 w-full rounded-md border border-input bg-background px-2 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="如 100"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">次数</label>
              <input
                type="number"
                min={1}
                step="1"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                className="h-10 w-full rounded-md border border-input bg-background px-2 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="如 5"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">日期</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="h-10 w-full rounded-md border border-input bg-background px-2 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground">
            按 Epley 公式（重量 ×（1 + 次数÷30））估算 1RM；只有新 1RM 高于旧值才会刷新纪录。
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={save}
              className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Check className="h-3 w-3" />
              保存记录
            </button>
            <button
              type="button"
              onClick={() => {
                setEditing(false);
                setFlash(null);
              }}
              className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40"
            >
              取消
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
