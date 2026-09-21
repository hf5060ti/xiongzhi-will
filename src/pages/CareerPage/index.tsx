import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, Target, Clock, TrendingUp, FileText } from 'lucide-react';

export default function CareerPage() {
  return (
    <div className="space-y-8">
      <header className="border-b border-border pb-5">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          Career · 事业
        </p>
        <h1 className="mt-1 font-display text-4xl font-extrabold tracking-tight text-foreground">
          能成事，才算真强
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          身体强是基础，能在社会上立足、能赚钱、能承担责任，才是完整的雄性意志。
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <CareerCard
          icon={<Target className="h-5 w-5" />}
          title="目标拆解"
          points={[
            '大目标拆成小目标：10 年后 → 3 年 → 1 年 → 3 个月 → 本周',
            '每周只盯 1–3 件最重要的事（MIT）',
            '目标要可衡量：「变强」不是目标，「卧推 100kg」才是',
            '写下来，不要只存在脑子里',
          ]}
        />
        <CareerCard
          icon={<Clock className="h-5 w-5" />}
          title="时间管理"
          points={[
            '每天先做最难的事（吃青蛙）',
            '25 分钟专注 + 5 分钟休息（番茄工作法）',
            '会议、消息、刷手机——都是时间的小偷',
            '记录一周时间去向，你会吓一跳',
          ]}
        />
        <CareerCard
          icon={<TrendingUp className="h-5 w-5" />}
          title="执行力"
          points={[
            '想 100 次不如做 1 次',
            '完美主义是拖延的借口',
            '先做 60 分版本，再迭代到 90 分',
            '完成比完美重要',
          ]}
        />
        <CareerCard
          icon={<FileText className="h-5 w-5" />}
          title="复盘"
          points={[
            '每周日晚花 30 分钟复盘',
            '问自己：这周做对了什么？做错了什么？下周改什么？',
            '记录下来，3 个月后回头看，成长一目了然',
            '不复盘的努力，大部分是在重复犯错',
          ]}
        />
      </div>

      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="p-6">
          <h2 className="font-display text-xl font-bold text-primary">事业底线</h2>
          <div className="mt-4 space-y-2 text-sm text-foreground/90">
            <p>· 别裸辞——先有下家再走</p>
            <p>· 别和朋友合伙创业，先签好协议</p>
            <p>· 别相信「躺赚」——那都是想赚你钱的人说的</p>
            <p>· 持续学习——你的工资就是你 5 年前的能力定价</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function CareerCard({ icon, title, points }: { icon: React.ReactNode; title: string; points: string[] }) {
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
