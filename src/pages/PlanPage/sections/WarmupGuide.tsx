// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache-2.0
// 热身模板：融合谭成义动态热身法 + 凯圣王渐进激活法
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, Flame } from 'lucide-react';
import { WARMUP_GENERAL, DAY_ACTIVATION, getFirstSetWarmup } from '@/lib/warmup';
import { cn } from '@/lib/utils';

export default function WarmupGuide() {
  const [open, setOpen] = useState(false);
  const [dayType, setDayType] = useState<'push' | 'pull' | 'legs'>('push');
  const [workingWeight, setWorkingWeight] = useState(60);

  const firstSetSteps = getFirstSetWarmup('卧推', workingWeight);

  return (
    <Card className="border-primary/20">
      <CardHeader className="cursor-pointer pb-3" onClick={() => setOpen(!open)}>
        <CardTitle className="flex items-center justify-between text-base">
          <span className="flex items-center gap-2">
            <Flame className="h-4 w-4 text-primary" />
            热身模板（谭成义 + 凯圣王法）
          </span>
          <ChevronDown className={cn('h-4 w-4 transition-transform', open && 'rotate-180')} />
        </CardTitle>
      </CardHeader>

      {open && (
        <CardContent className="space-y-6">
          {/* 通用热身 */}
          <div>
            <p className="mb-2 text-xs font-semibold text-muted-foreground">第一阶段：通用升温（5-8分钟）</p>
            <div className="space-y-1.5">
              {WARMUP_GENERAL.map((step) => (
                <div key={step.order} className="rounded-md border border-border/50 bg-muted/20 px-3 py-2 text-xs">
                  <div className="flex justify-between">
                    <b className="text-foreground">{step.order}. {step.name}</b>
                    <span className="text-primary">{step.detail}</span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{step.cue}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 分化日激活 */}
          <div>
            <p className="mb-2 text-xs font-semibold text-muted-foreground">第二阶段：分化日针对性激活</p>
            <div className="mb-2 flex gap-1">
              {(['push', 'pull', 'legs'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setDayType(t)}
                  className={cn(
                    'rounded-md px-3 py-1 text-xs transition-colors',
                    dayType === t
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80',
                  )}
                >
                  {t === 'push' ? '推日' : t === 'pull' ? '拉日' : '腿日'}
                </button>
              ))}
            </div>
            <div className="space-y-1.5">
              {DAY_ACTIVATION[dayType].map((step) => (
                <div key={step.order} className="rounded-md border border-border/50 bg-muted/20 px-3 py-2 text-xs">
                  <div className="flex justify-between">
                    <b className="text-foreground">{step.name}</b>
                    <span className="text-primary">{step.detail}</span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{step.cue}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 第一个动作递增组 */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-semibold text-muted-foreground">第三阶段：第一个正式动作递增组</p>
              <label className="flex items-center gap-1 text-[11px] text-muted-foreground">
                工作重量
                <input
                  type="number"
                  value={workingWeight}
                  onChange={(e) => setWorkingWeight(Number(e.target.value) || 0)}
                  className="h-6 w-16 rounded border border-border bg-background px-1 text-xs"
                />
                kg
              </label>
            </div>
            <div className="space-y-1.5">
              {firstSetSteps.map((step) => (
                <div key={step.order} className="rounded-md border border-primary/20 bg-primary/5 px-3 py-2 text-xs">
                  <div className="flex justify-between">
                    <b className="text-foreground">{step.order}. {step.name}</b>
                    <span className="text-primary">{step.detail}</span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{step.cue}</p>
                </div>
              ))}
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
              凯圣王原则：第一个动作充分热身（4-5组递增），后续动作轻重量过渡即可，不要每次都从头热。
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
