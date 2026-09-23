import { Card, CardContent } from '@/components/ui/card';
import { Wrench, HeartPulse, Utensils, Car, Mountain } from 'lucide-react';

export default function SkillsPage() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <header className="border-b border-border pb-4 sm:pb-5">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          Skills · 技能
        </p>
        <h1 className="mt-1 font-display text-4xl font-extrabold tracking-tight text-foreground">
          能照顾自己，也能照顾别人
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          男人的质感，体现在这些不起眼的生活技能里。
        </p>
      </header>

      <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-3">
        <SkillCard
          icon={<HeartPulse className="h-5 w-5" />}
          title="急救"
          items={[
            '心肺复苏（CPR）——救命的 4 分钟',
            '海姆立克急救法——呛噎时用',
            '止血、包扎、固定骨折',
            '知道什么时候该打 120',
          ]}
        />
        <SkillCard
          icon={<Utensils className="h-5 w-5" />}
          title="料理"
          items={[
            '至少会做 3 道家常菜',
            '会做饭的人，身体不会差到哪去',
            '别靠外卖活着——你的身体不是垃圾桶',
          ]}
        />
        <SkillCard
          icon={<Car className="h-5 w-5" />}
          title="驾驶与修理"
          items={[
            '会开车——这是现代社会的基本能力',
            '换备胎、搭电、检查机油',
            '家里的灯泡、水管、简单电路，自己修',
          ]}
        />
        <SkillCard
          icon={<Mountain className="h-5 w-5" />}
          title="户外与生存"
          items={[
            '徒步——知道怎么看地图、怎么找水源',
            '露营——搭帐篷、生火、煮东西',
            '基础防身——不是打架，是知道怎么跑',
            '带别人出去，你就得负责安全',
          ]}
        />
      </div>
    </div>
  );
}

function SkillCard({ icon, title, items }: { icon: React.ReactNode; title: string; items: string[] }) {
  return (
    <Card className="border-border/50 bg-card/60 backdrop-blur-xl">
      <CardContent className="p-3 sm:p-5">
        <div className="flex items-center gap-1.5">
          <span className="shrink-0 text-primary">{icon}</span>
          <h3 className="font-display text-base font-bold leading-tight text-foreground">{title}</h3>
        </div>
        <ul className="mt-2 space-y-1">
          {items.map((p, i) => (
            <li key={i} className="flex items-start gap-1.5 text-xs leading-snug text-muted-foreground">
              <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-primary" />
              {p}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
