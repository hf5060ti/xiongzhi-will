import { Card, CardContent } from '@/components/ui/card';
import { Heart, ShieldAlert } from 'lucide-react';

export default function SpecialNeedsGuide() {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <Heart className="h-5 w-5 text-primary" />
        <h2 className="font-display text-2xl font-bold tracking-wide text-foreground">
          特殊人群运动推荐
        </h2>
      </div>
      <p className="text-sm text-muted-foreground">
        不管身体状况如何，都有适合你的运动方式。
      </p>

      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 sm:grid-cols-2">
        <SpecialCard
          title="下肢不便 / 轮椅使用者"
          suitable="轮椅俯卧撑、墙上俯卧撑、哑铃划船、坐姿哑铃推胸、弹力带下拉"
          avoid="深蹲、硬拉、箭步蹲等下肢负重动作"
        />
        <SpecialCard
          title="上肢不便 / 单侧手臂缺失"
          suitable="单臂哑铃划船、单臂推胸、侧平板、臀桥、单腿硬拉"
          avoid="双手对称负重动作（杠铃卧推/划船）"
        />
        <SpecialCard
          title="腰伤 / 椎间盘问题"
          suitable="平板支撑、死虫、鸟狗、臀桥、侧平板"
          avoid="深蹲、硬拉、坐姿推举等脊柱负重动作"
        />
        <SpecialCard
          title="肩伤 / 肩袖问题"
          suitable="俯身哑铃飞鸟（轻重量）、弹力带外旋、面拉、卧推（窄握）"
          avoid="颈后推举、侧平举过肩、倒立撑"
        />
        <SpecialCard
          title="膝盖问题"
          suitable="臀桥、腿弯举、腿屈伸（轻重量）、骑车、游泳"
          avoid="深蹲、箭步蹲、跳跃类动作"
        />
        <SpecialCard
          title="心脏病 / 高血压"
          suitable="快走、游泳、骑车（低强度）、太极拳"
          avoid="大重量力量训练、高强度间歇训练（HIIT）"
        />
        <SpecialCard
          title="糖尿病"
          suitable="快走、游泳、骑车、轻重量力量训练"
          avoid="空腹高强度运动（防低血糖）"
        />
        <SpecialCard
          title="孕妇 / 产后"
          suitable="散步、游泳、产前瑜伽、轻重量训练"
          avoid="仰卧动作（孕中晚期）、高强度跳跃"
        />
        <SpecialCard
          title="老年人"
          suitable="坐姿训练、弹力带、太极拳、散步"
          avoid="大重量负重、快速爆发动作"
        />
      </div>

      <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-center">
        <p className="font-display text-lg font-bold italic text-primary">
          「上帝只是嫉妒完整的你，害怕完整的你。」
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          身体的残缺不是限制——它只是让你用另一种方式变强。
        </p>
      </div>

      <p className="flex items-start gap-2 rounded-xl border border-warning/40 bg-warning/5 p-3 text-[11px] leading-relaxed text-muted-foreground">
        <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warning" />
        <span>
          以上为通用建议。具体训练方案请咨询医生、物理治疗师或康复教练。有伤病时，先治伤再训练。
        </span>
      </p>
    </section>
  );
}

function SpecialCard({ title, suitable, avoid }: { title: string; suitable: string; avoid: string }) {
  return (
    <Card className="border-border/50 bg-card/60 backdrop-blur-xl">
      <CardContent className="p-4">
        <h3 className="font-display text-base font-bold text-foreground">{title}</h3>
        <p className="mt-2 text-xs leading-relaxed text-foreground/90">
          <b className="text-primary">推荐：</b>{suitable}
        </p>
        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
          <b className="text-warning">避免：</b>{avoid}
        </p>
      </CardContent>
    </Card>
  );
}
