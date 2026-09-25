import {
  Award,
  BookOpen,
  FlaskConical,
  GraduationCap,
  HeartPulse,
  Library,
  Link2,
  ShieldCheck,
  Video,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const SOURCE_ROWS = [
  { mod: '动作百科', from: '动作演示动图（fitness.xingshuwen.com，Gym Visual 素材）', type: '演示素材', ev: '素材', note: '站内同名或最接近动作；无同名时明确标注「近似演示」' },
  { mod: '动作教学视频', from: '谭成义（健身博主公开教学视频）', type: '原话·视频', ev: '原话', note: '跳转原平台观看，版权归原作者，本站仅整理入口' },
  { mod: '动作要点 / 优缺点', from: '通用训练常识与公开健身资料整理', type: '整理', ev: '整理', note: '用于挑选与替换动作时参考，非逐句引用' },
  { mod: '训练计划组次参数', from: 'StrongLifts 5×5 · Push/Pull/Legs · Wendler 5/3/1 · GVT 10×10 · PHUL', type: '经典方案', ev: '文献整理', note: '保留原计划的组次结构与频率逻辑，重量按个人能力取' },
  { mod: '力量换算表', from: '用户提供的卧推 1–10RM 换算表（印刷错误已按相邻行规律修正）+ Epley 公式', type: '公式', ev: '计算', note: '口径统一：1RM = 重量 ×（1 + 次数 ÷ 30）' },
  { mod: '饮食方案', from: '公开健身博主讲解（陈石等）与公开文献', type: '讲解 + 文献', ev: '原话 / AI 章节要点 / 文献整理', note: '每条在饮食讲解页注明证据等级与来源链接' },
  { mod: '食物营养数据', from: '以《中国食物成分表》为口径的公开营养数据 + 用户自定义食物库', type: '数据', ev: '文献整理', note: '熟食与家常菜为熟重估算；包装食品以实物标签为准' },
  { mod: '吸收率 / 食物热效应', from: '公开营养学知识（脂溶性维生素需油脂同餐等）+ 用户给定的 TEF 区间', type: '知识', ev: '整理', note: '脂肪 1–5%、碳水 5–10%、蛋白质 20–25%，默认按 10% 计' },
  { mod: '训练与代谢公式', from: '自然健身公开公式：FFMI · Casey Butt · Martin Berkham · BuiltLean · Alan Aragon · 6 式 BMR · TDEE', type: '公式', ev: '文献整理', note: '全部为估算，误差常见 ±10–15%；优先生理基准（Katch / Cunningham）' },
  { mod: 'AI 教练 / AI 热量估算', from: '用户自行配置的第三方大模型直连（硅基流动，默认 Qwen2.5-7B）', type: 'AI 生成', ev: 'AI', note: 'AI 建议仅供参考，不构成医疗建议；数据只存本地，不上传' },
];

const EVIDENCE_BADGE: Record<string, { cls: string; label: string }> = {
  原话: { cls: 'border-primary/40 bg-primary/10 text-primary', label: '原话' },
  整理: { cls: 'border-border bg-muted/40 text-foreground/80', label: '整理' },
  '文献整理': { cls: 'border-blue-500/40 bg-blue-500/10 text-blue-600 dark:text-blue-400', label: '文献整理' },
  计算: { cls: 'border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-400', label: '计算' },
  素材: { cls: 'border-border bg-muted/40 text-foreground/80', label: '素材' },
  AI: { cls: 'border-purple-500/40 bg-purple-500/10 text-purple-600 dark:text-purple-400', label: 'AI 生成' },
};

export default function SourcesPage() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <header className="border-b border-border pb-4 sm:pb-5">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          Sources · 雄性意志
        </p>
        <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          内容来源与循证
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          本站所有内容都有来源：动作、饮食、公式、数据分别来自哪些公开资料，属于什么证据等级，页面里都写清楚。
          我们不生产"玄学健身"——每个数字都能追溯到出处。
        </p>
      </header>

      {/* 定位声明 */}
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <h2 className="font-display text-xl font-extrabold text-foreground">本站定位</h2>
        </div>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground/85">
          <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />只提供<b>健康、自然</b>的健身与饮食方式：不提供任何极端训练，不推荐任何药物方案。</li>
          <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />请遵守你所在国家 / 地区的法律法规。</li>
          <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />适合人群：面向健康成年人。糖尿病、高血压、心脏病、肝肾疾病、痛风等慢性病患者，孕期 / 哺乳期女性、老年人、大病初愈者，以及任何有关节旧伤或长期服药者，开始训练或调整饮食前请<b>优先遵从医嘱</b>。</li>
          <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />本站不构成医疗建议，也不诊断、治疗、预防任何疾病；本站鼓励"在安全的范围内去运动"，不建议任何人逞强。</li>
        </ul>
      </div>

      {/* 来源总览 */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Library className="h-4 w-4 text-primary" />
            内容来源总览
          </CardTitle>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            证据等级口径与「饮食讲解」页一致：<b>原话</b>（可查原文）、<b>AI 章节要点</b>（平台摘要，非逐句）、
            <b>文献整理</b>（公开学术 / 官方文献）、<b>计算</b>（公式推导）、<b>素材</b>（演示动图等第三方素材）、
            <b>AI 生成</b>（用户自配模型实时产出）。
          </p>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">模块</TableHead>
                <TableHead className="whitespace-nowrap">来源</TableHead>
                <TableHead className="whitespace-nowrap">类型</TableHead>
                <TableHead className="whitespace-nowrap">证据等级</TableHead>
                <TableHead className="whitespace-nowrap">说明</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {SOURCE_ROWS.map((r) => (
                <TableRow key={r.mod}>
                  <TableCell className="whitespace-nowrap font-medium text-foreground">{r.mod}</TableCell>
                  <TableCell className="min-w-[220px] text-xs leading-relaxed text-muted-foreground">{r.from}</TableCell>
                  <TableCell className="whitespace-nowrap text-xs text-muted-foreground">{r.type}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`whitespace-nowrap ${EVIDENCE_BADGE[r.ev]?.cls ?? ''}`}>
                      {r.ev}
                    </Badge>
                  </TableCell>
                  <TableCell className="min-w-[200px] text-xs leading-relaxed text-muted-foreground">{r.note}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 教学与讲解 */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Video className="h-4 w-4 text-primary" />
              动作教学 · 谭成义
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm leading-relaxed text-muted-foreground">
            <p>动作百科与训练页的<b className="text-foreground">名师教学视频</b>链接到健身博主谭成义的公开教学视频，覆盖卧推、深蹲、引体、弯举等常用动作。</p>
            <p>视频在动作详情弹窗内展示，<b>跳转原平台观看</b>，版权归原作者所有；本站仅整理入口，方便你在看文字要点之外，直接对照真实演示。</p>
            <p className="flex items-center gap-1.5 text-xs text-primary">
              <Link2 className="h-3.5 w-3.5" />
              打开任意动作 → 详情弹窗 → 「名师教学视频」
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <BookOpen className="h-4 w-4 text-primary" />
              饮食讲解 · 陈石等
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm leading-relaxed text-muted-foreground">
            <p>「饮食讲解」页的每一条都标注<b className="text-foreground">证据等级</b>与来源链接，多数来自公开博主讲解（含陈石），生酮等条目依据公开学术 / 官方文献。</p>
            <p>内容为公开讲解与公开文献的<b className="text-foreground">原创简要整理</b>，观点归原作者；平台 AI 章节要点一律标注「AI 章节要点 / 未逐句核对」，不作为原话引用。</p>
            <p className="flex items-center gap-1.5 text-xs text-primary">
              <Link2 className="h-3.5 w-3.5" />
              入口：导航「饮食」→「饮食讲解」
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <GraduationCap className="h-4 w-4 text-primary" />
              公式与计算
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm leading-relaxed text-muted-foreground">
            <p>身体数据页内置<b className="text-foreground">自然健身公式库</b>：FFMI 肌肉上限、Casey Butt 骨架模型、Martin Berkham、BuiltLean、Alan Aragon 增肌速率、6 式 BMR、TDEE、食物热效应。</p>
            <p>所有公式均为公开估算方法，误差常见 ±10–15%；自然健身者优先生理基准（Katch-McArdle / Cunningham）。力量换算统一用 Epley 公式。</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <FlaskConical className="h-4 w-4 text-primary" />
              营养数据与 AI
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm leading-relaxed text-muted-foreground">
            <p>食物营养数据以《中国食物成分表》为口径，熟食与家常菜按常见做法<b className="text-foreground">熟重估算</b>，包装食品以实物标签为准。</p>
            <p>AI 教练与 AI 热量估算由你自行配置的第三方大模型直连（默认硅基流动 Qwen2.5-7B），Key 只存在你浏览器本地；AI 输出仅供参考，不构成医疗建议。</p>
          </CardContent>
        </Card>
      </div>

      {/* 信任与边界 */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Award className="h-4 w-4 text-primary" />
            为什么可以信
          </p>
          <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-muted-foreground">
            <li>· 每个数字都能追溯到出处（公开资料 / 公式 / 用户给定）</li>
            <li>· 无法核实的部分明确标注「估算 / 近似 / 未逐句核对」</li>
            <li>· 演示动图没有同名动作时明确标注「近似演示」，不冒充</li>
            <li>· AI 生成内容标注「AI」，且不参与站内热量与计划的计算</li>
          </ul>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <HeartPulse className="h-4 w-4 text-primary" />
            边界与免责
          </p>
          <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-muted-foreground">
            <li>· 本站不构成医疗建议，不诊断、不治疗、不预防任何疾病</li>
            <li>· 数据只存本地浏览器，不上传、不追踪、不做账号</li>
            <li>· 特殊人群（慢性病 / 孕产 / 老年 / 大病初愈）请以医嘱为准</li>
            <li>· 健身是生活的调味剂，别被健身绑架；真正的力量是能面对生活、再站起来</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
