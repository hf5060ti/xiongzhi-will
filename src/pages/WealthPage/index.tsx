import { Card, CardContent } from '@/components/ui/card';
import { Coins, PiggyBank, Shield, AlertTriangle } from 'lucide-react';

export default function WealthPage() {
  return (
    <div className="space-y-8">
      <header className="border-b border-border pb-5">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          Wealth · 财富
        </p>
        <h1 className="mt-1 font-display text-4xl font-extrabold tracking-tight text-foreground">
          经济独立，才有人格独立
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          不是拜金，而是——有钱，才有选择的自由；有存款，才敢说真话。
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <WealthCard
          icon={<PiggyBank className="h-5 w-5" />}
          title="存钱"
          points={[
            '先存后花：工资到账先转 10–20% 到另一个账户',
            '记账 3 个月——你会发现钱都花在看不见的地方',
            '3 个月生活费的应急金，是底线',
            '能不花的钱，一分都是赢',
          ]}
        />
        <WealthCard
          icon={<Shield className="h-5 w-5" />}
          title="消费观"
          points={[
            '买前等 48 小时——冲动消费 80% 会消失',
            '买贵的不如买对的——一件穿 10 年的大衣比 10 件便宜货值',
            '别为「面子」花钱——那是给别人看的',
            '免费的东西最贵——你的注意力就是钱',
          ]}
        />
        <WealthCard
          icon={<Coins className="h-5 w-5" />}
          title="投资基础"
          points={[
            '不懂的东西别碰——股票、币、NFT 都一样',
            '指数基金定投是普通人最稳的路',
            '别加杠杆——加杠杆的人最后都爆了仓',
            '先存够钱，再谈投资',
          ]}
        />
        <WealthCard
          icon={<AlertTriangle className="h-5 w-5" />}
          title="反诈骗"
          points={[
            '「低风险高回报」= 骗局',
            '「内部消息」= 想赚你钱',
            '让你转账的客服 = 骗子',
            '让你下载 APP 的警察 = 骗子',
            '拿不准的，先问家人，别自己决定',
          ]}
        />
      </div>

      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="p-6">
          <h2 className="font-display text-xl font-bold text-primary">财富底线</h2>
          <div className="mt-4 space-y-2 text-sm text-foreground/90">
            <p>· 别借高利贷——那是深渊</p>
            <p>· 别给别人担保——你不知道他什么时候跑路</p>
            <p>· 别碰赌——久赌必输，这是数学规律</p>
            <p>· 别超前消费——花呗、信用卡分期，都是在出卖你的未来</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function WealthCard({ icon, title, points }: { icon: React.ReactNode; title: string; points: string[] }) {
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
