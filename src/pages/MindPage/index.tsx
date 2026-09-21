import { Card, CardContent } from '@/components/ui/card';
import { Brain, Shield, Clock, Moon, BookOpen, Flame } from 'lucide-react';

export default function MindPage() {
  return (
    <div className="space-y-8">
      <header className="border-b border-border pb-5">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          Mind · 心智
        </p>
        <h1 className="mt-1 font-display text-4xl font-extrabold tracking-tight text-foreground">
          意志的内核
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          练肌肉容易，练心智难。以下是「雄性意志」的心智训练框架。
        </p>
      </header>

      {/* 核心原则 */}
      <div className="grid gap-4 sm:grid-cols-2">
        <MindCard
          icon={<Brain className="h-5 w-5" />}
          title="斯多葛哲学"
          points={[
            '区分你能控制的和不能控制的——只对前者用力',
            '每天预想最坏情况，降低对失败的恐惧',
            '痛苦是判断的结果，不是事件本身',
            '接受现实，然后行动',
          ]}
        />
        <MindCard
          icon={<Flame className="h-5 w-5" />}
          title="延迟满足"
          points={[
            '现在放弃即时快感，换取更大的长期回报',
            '想刷手机？先做 10 分钟该做的事',
            '想吃零食？先喝一杯水，等 10 分钟',
            '肌肉和钱一样，都是延迟满足的复利',
          ]}
        />
        <MindCard
          icon={<Clock className="h-5 w-5" />}
          title="注意力管理"
          points={[
            '手机灰度模式，减少刷手机的冲动',
            '工作时把手机放另一个房间',
            '一次只做一件事，多任务是效率杀手',
            '每天留 30 分钟「无屏幕时间」',
          ]}
        />
        <MindCard
          icon={<Moon className="h-5 w-5" />}
          title="情绪控制"
          points={[
            '愤怒时不做决定，先等 24 小时',
            '写下来——把情绪写在纸上，它就变小了',
            '恐惧是信号，不是指令——它告诉你哪里重要',
            '羞耻感是别人的评价，不是你的价值',
          ]}
        />
        <MindCard
          icon={<BookOpen className="h-5 w-5" />}
          title="日记与复盘"
          points={[
            '每天写 3 件今天做得好的事',
            '每周复盘：什么有效？什么浪费时间？',
            '失败要写下来，不要只记住成功',
            '写日记不是抒情，是给自己的操作系统打补丁',
          ]}
        />
        <MindCard
          icon={<Shield className="h-5 w-5" />}
          title="独处能力"
          points={[
            '每天独处 30 分钟，不带手机',
            '孤独不是惩罚，是和自己对话的时间',
            '能独处的人，关系里才不会卑微',
            '学会和沉默相处，焦虑会少一半',
          ]}
        />
      </div>

      {/* 30 天挑战 */}
      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="p-6">
          <h2 className="font-display text-xl font-bold text-primary">30 天心智挑战</h2>
          <div className="mt-4 space-y-2 text-sm text-foreground/90">
            <p><b>第 1 周：</b>每天早起 15 分钟 + 写 3 件今天做得好的事</p>
            <p><b>第 2 周：</b>手机每天灰度模式 2 小时 + 冥想 10 分钟</p>
            <p><b>第 3 周：</b>拒绝一次不想做的社交 + 独处 30 分钟</p>
            <p><b>第 4 周：</b>回顾 30 天，写下什么改变了、什么没改变</p>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            不需要全做到。做多少算多少。比 30 天前的自己好一点就行。
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function MindCard({ icon, title, points }: { icon: React.ReactNode; title: string; points: string[] }) {
  return (
    <Card className="border-border/50 bg-card/60 backdrop-blur-xl">
      <CardContent className="p-5">
        <div className="flex items-center gap-2">
          <span className="text-primary">{icon}</span>
          <h3 className="font-display text-lg font-bold text-foreground">{title}</h3>
        </div>
        <ul className="mt-3 space-y-1.5">
          {points.map((p, i) => (
            <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
              <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-primary" />
              {p}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
