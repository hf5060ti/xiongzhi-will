import { Card, CardContent } from '@/components/ui/card';
import { Heart, MessageCircle, Shield, Users } from 'lucide-react';

export default function RelationPage() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <header className="border-b border-border pb-4 sm:pb-5">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          Relation · 关系
        </p>
        <h1 className="mt-1 font-display text-4xl font-extrabold tracking-tight text-foreground">
          尊重，是最好的吸引力
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          雄性意志不是 PUA，不是操控，不是厌女。是尊重、是担当、是负责。
        </p>
      </header>

      <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-3">
        <RelationCard
          icon={<MessageCircle className="h-5 w-5" />}
          title="沟通"
          points={[
            '会听比会说重要——先听懂，再回应',
            '表达需求，不是发泄情绪',
            '有分歧就谈，别冷战',
            '说错了就道歉——这不丢人',
          ]}
        />
        <RelationCard
          icon={<Shield className="h-5 w-5" />}
          title="边界感"
          points={[
            '学会说「不」——不想做的事别勉强',
            '别人的事是别人的事，别过度承担',
            '你的时间和精力，不是免费的',
            '边界清晰的关系，才长久',
          ]}
        />
        <RelationCard
          icon={<Heart className="h-5 w-5" />}
          title="亲密关系"
          points={[
            '尊重对方的选择——她不是你的附属品',
            '同意是双向的，不是你「赢」来的',
            '负责——怀孕了别跑，吵架了别冷暴力',
            '好的关系让两个人都变好，不是互相消耗',
          ]}
        />
        <RelationCard
          icon={<Users className="h-5 w-5" />}
          title="友谊"
          points={[
            '真朋友不需要多——两三个就够',
            '别只在有事时才找人',
            '朋友困难时帮一把，别趁火打劫',
            '酒肉朋友不算朋友',
          ]}
        />
      </div>

      <Card className="border-destructive/30 bg-destructive/5">
        <CardContent className="p-4 sm:p-6">
          <h2 className="font-display text-xl font-bold text-destructive">这些事别做</h2>
          <div className="mt-4 space-y-2 text-sm text-foreground/90">
            <p>· 不 PUA——操控别人不是本事</p>
            <p>· 不冷暴力——有问题就谈</p>
            <p>· 不背叛——一次就够，信用就没了</p>
            <p>· 不物化女性——她是人，不是奖杯</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function RelationCard({ icon, title, points }: { icon: React.ReactNode; title: string; points: string[] }) {
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
