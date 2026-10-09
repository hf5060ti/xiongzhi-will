// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
/**
 * 等长训练（Isometric Training）
 * - 原理：肌肉持续收缩但关节不产生位移，张力恒定、压力可控
 * - 价值：低压力保肌 / 无器械 / 环境受限可用 / 术后恢复期维持手段
 * - 重点场景：眼部手术后不能加压时，搭配散步温和促进血液循环、保留肌肉
 * - 本页所有内容均为健身参考，术后运动务必先遵医嘱
 */
import { Activity, AlertTriangle, Apple, Armchair, Dumbbell, Footprints, Hand, HeartPulse, Info, Moon, Shield, ShieldCheck, Sparkles, Stethoscope, Tag, Timer, TrendingUp, Wind, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface IsoExercise {
  name: string;
  target: string;
  how: string;
  dose: string;
  note: string;
  icon: typeof Hand;
  group: '下肢' | '核心' | '上肢胸臂' | '肩背' | '腕部握力' | '颈与全身';
}

/** 等长动作库：每个动作只要求「持续张力 + 正常呼吸」，全程不憋气 */
const EXERCISES: IsoExercise[] = [
  // ============ 下肢 ============
  {
    name: '靠墙静蹲',
    target: '大腿前侧 / 臀部',
    how: '背靠墙，双脚与肩同宽、离墙约半步，屈膝下蹲至 90° 左右，后背贴墙保持不动。',
    dose: '30–60 秒 × 3 组，组间休息 30 秒',
    note: '膝盖不超过脚尖；感觉发抖即稍抬高角度。',
    icon: Armchair,
    group: '下肢',
  },
  {
    name: '单腿静蹲（降阶）',
    target: '单腿力量 / 平衡',
    how: '同靠墙静蹲，但一条腿抬起离地，另一条腿单腿支撑保持；手扶墙或椅背辅助平衡。',
    dose: '每腿 20–40 秒 × 2 组',
    note: '力量不够时双腿静蹲；这是术后恢复期很好的下肢渐进起点。',
    icon: Activity,
    group: '下肢',
  },
  {
    name: '静态臀桥',
    target: '臀部 / 腘绳肌',
    how: '仰卧屈膝，脚掌踩地，臀部收紧抬起至肩-髋-膝成直线，保持不动。',
    dose: '30–60 秒 × 3 组',
    note: '全程呼气，不要用腰代偿；这是术后最安全的腿部训练之一。',
    icon: Zap,
    group: '下肢',
  },
  {
    name: '等长腿举',
    target: '股四头 / 核心',
    how: '仰卧屈膝抬腿，双手压住膝盖上方，双腿持续上顶对抗双手，保持静止。',
    dose: '20–30 秒 × 3 组',
    note: '手只做阻力不做推力；颈椎不适可垫薄枕。',
    icon: Dumbbell,
    group: '下肢',
  },
  {
    name: '坐姿髋外展等长',
    target: '臀中肌 / 髋',
    how: '坐姿，膝盖弯曲，双膝间夹一个枕头或拳头，持续向内夹紧保持。',
    dose: '30–45 秒 × 3 组',
    note: '夹紧力以臀部外侧酸胀为准；站姿扶墙也可做同款。',
    icon: Hand,
    group: '下肢',
  },
  {
    name: '站姿提踵等长',
    target: '小腿三头肌',
    how: '站姿踮起脚尖至最高点，前脚掌撑地保持不动；扶墙辅助平衡。',
    dose: '20–40 秒 × 3 组',
    note: '全程呼气；脚踝术后 / 不稳者先做坐姿提踵，减少负重。',
    icon: Footprints,
    group: '下肢',
  },
  {
    name: '脚后跟下压等长（腘绳肌）',
    target: '腘绳肌 / 小腿后侧',
    how: '仰卧屈膝，脚掌踩墙或踩稳，脚跟持续向地面 / 墙面下压发力，保持静止。',
    dose: '20–30 秒 × 3 组',
    note: '发力来自大腿后侧把脚跟往下压，不是膝盖用力。',
    icon: Zap,
    group: '下肢',
  },
  {
    name: '坐姿髋内收等长',
    target: '大腿内侧 / 髋',
    how: '坐姿，双膝间夹枕头 / 拳头，持续向内夹紧保持；也可仰卧夹球。',
    dose: '20–40 秒 × 3 组',
    note: '夹紧力以大腿内侧酸胀为准；配合髋外展等长成对训练更均衡。',
    icon: Hand,
    group: '下肢',
  },
  {
    name: '弓步静蹲',
    target: '臀 / 股四头 / 平衡',
    how: '前弓步姿势站定：前膝 90°、后膝接近地面，身体垂直不动，静态保持。',
    dose: '每侧 20–40 秒 × 2–3 组',
    note: '前膝与脚尖同向，不内扣；这是介于静蹲与弓步之间的稳定进阶。',
    icon: Activity,
    group: '下肢',
  },
  {
    name: '踝泵等长（勾压交替）',
    target: '小腿 / 踝周 / 循环',
    how: '坐姿或卧姿，脚踝发力勾脚背 5 秒、再用力压脚背 5 秒，交替循环。',
    dose: '每组 1 分钟 × 3 组，随时可做',
    note: '术后卧床期最佳「维持循环」动作，零压力、可全天多次。',
    icon: Footprints,
    group: '下肢',
  },
  // ============ 核心 ============
  {
    name: '平板支撑',
    target: '核心 / 肩袖',
    how: '肘撑地，肘在肩正下方，身体从头到脚跟成一条直线，腹部收紧持续发力。',
    dose: '20–45 秒 × 3 组，组间休息 45 秒',
    note: '腰塌或臀抬就结束该组，保持正常呼吸不憋气。',
    icon: Timer,
    group: '核心',
  },
  {
    name: '侧平板支撑',
    target: '腹斜肌 / 肩',
    how: '侧卧，前臂撑地，髋部抬起，身体成直线，另一只手叉腰或向上指。',
    dose: '每侧 15–30 秒 × 2–3 组',
    note: '髋部下沉即结束；平衡困难时可双膝着地降低难度。',
    icon: Activity,
    group: '核心',
  },
  {
    name: '死虫等长',
    target: '深层核心 / 下背',
    how: '仰卧，四肢抬起与地面垂直，腰椎贴地，保持四肢静止悬空。',
    dose: '20–40 秒 × 3 组',
    note: '腰椎离开地面说明核心力竭；屈膝 90° 为降阶。',
    icon: Timer,
    group: '核心',
  },
  {
    name: '空心撑（Hollow Hold）',
    target: '核心 / 髋屈肌',
    how: '仰卧，双臂过头、双腿伸直抬起离地，下背紧贴地面，身体呈"香蕉"弧形保持。',
    dose: '15–30 秒 × 3 组',
    note: '下背离地即结束；腿抬不高就屈膝降阶。',
    icon: Activity,
    group: '核心',
  },
  {
    name: '熊爬静态保持',
    target: '全身 / 核心 / 肩',
    how: '四点支撑：手在肩下、膝在髋下，膝盖离地约 2–3 厘米，背部平直保持不动。',
    dose: '20–45 秒 × 2–3 组',
    note: '肩、髋、膝保持稳定不晃动；手腕不适可改前臂支撑。',
    icon: Wind,
    group: '核心',
  },
  {
    name: 'V 字保持',
    target: '上腹 / 髋屈肌',
    how: '坐姿，身体后倾约 45°，双腿伸直抬起离地，躯干与腿成 V 形，双手前伸保持。',
    dose: '15–30 秒 × 3 组',
    note: '后倾角度可调；先屈膝再伸直进阶，腰酸即结束。',
    icon: Activity,
    group: '核心',
  },
  {
    name: '屈膝空心撑（降阶）',
    target: '下腹 / 核心',
    how: '同空心撑，但膝盖弯曲 90°，小腿平行地面，下背贴地保持。',
    dose: '20–40 秒 × 3 组',
    note: '空心撑做不到时的标准退阶；进阶再把腿伸直。',
    icon: Timer,
    group: '核心',
  },
  {
    name: '门框转体等长',
    target: '腹斜肌 / 抗旋',
    how: '侧对门框站立，双手推框，躯干持续向门框方向旋转发力，保持静止。',
    dose: '每侧 15–25 秒 × 2–3 组',
    note: '发力均匀不晃动，脚不离地；换边对称完成。',
    icon: Hand,
    group: '核心',
  },
  // ============ 上肢胸臂 ============
  {
    name: '等长推墙',
    target: '胸 / 肩 / 三头',
    how: '面对墙站立，双手推墙与胸同高，持续发力压墙，身体不移动。',
    dose: '20–40 秒 × 3 组，力量用 60–70%',
    note: '发力时呼气，避免屏息加压；手部术后改为轻压不发力。',
    icon: Hand,
    group: '上肢胸臂',
  },
  {
    name: '门框胸推',
    target: '胸 / 肩',
    how: '站在门洞中间，双臂屈肘 90° 抵住两侧门框，持续向外推保持。',
    dose: '20–30 秒 × 3 组',
    note: '发力对称均匀，身体保持中正不歪斜。',
    icon: Hand,
    group: '上肢胸臂',
  },
  {
    name: '等长胸推对抗',
    target: '胸 / 内收肌群',
    how: '双手在胸前掌心相对、十指相扣，双臂持续向内夹紧对抗，保持静止。',
    dose: '20–40 秒 × 3 组',
    note: '全程呼气，胸肌有明显绷紧感即可，不用最大力。',
    icon: Zap,
    group: '上肢胸臂',
  },
  {
    name: '等长弯举（毛巾对抗）',
    target: '肱二头肌 / 前臂',
    how: '单手抓毛巾一端，另一端踩在脚下或卡在门缝，屈肘持续对抗毛巾。',
    dose: '20–30 秒 × 3 组，中等用力',
    note: '对抗强度以「能做但吃力」为准，不追求极限。',
    icon: Hand,
    group: '上肢胸臂',
  },
  {
    name: '等长三头下压',
    target: '肱三头肌',
    how: '毛巾卡在门缝，双手握毛巾末端，双臂贴身向下压肘，持续对抗保持。',
    dose: '20–30 秒 × 3 组',
    note: '肘部贴近体侧，不要外展。',
    icon: Dumbbell,
    group: '上肢胸臂',
  },
  {
    name: '过顶等长推',
    target: '肩 / 三头 / 上背',
    how: '站立或坐姿，双臂过顶掌心向上推天花板（或双手互推），肩胛上旋持续发力。',
    dose: '15–30 秒 × 3 组，力量 60%',
    note: '腹部收紧不塌腰；肩峰有挤压感就减力。',
    icon: Dumbbell,
    group: '上肢胸臂',
  },
  {
    name: '等长臂屈伸对抗（二头 vs 三头）',
    target: '肱二头 / 肱三头',
    how: '一手屈肘握拳，另一手抓住手腕向下压，手臂持续向上对抗；再换角色。',
    dose: '每侧 15–25 秒 × 2–3 组',
    note: '对抗强度可调，屈伸各做一轮，两侧对称。',
    icon: Hand,
    group: '上肢胸臂',
  },
  // ============ 肩背 ============
  {
    name: '静态悬垂',
    target: '背 / 握力 / 肩胛',
    how: '双手抓单杠（或门框稳妥横杆），自然悬垂，肩胛微收，不引体、只挂住。',
    dose: '20–40 秒 × 2–3 组',
    note: '双脚离地即可；握不住就踩凳半挂。眼部术后第 1 周建议跳过。',
    icon: Dumbbell,
    group: '肩背',
  },
  {
    name: '等长下拉（毛巾对抗）',
    target: '背 / 肩胛',
    how: '毛巾一端固定在门缝上方，双手握另一端屈肘下拉，肩胛下沉持续对抗。',
    dose: '20–30 秒 × 3 组',
    note: '像在做引体的前半程，背阔肌发力，不是手臂硬拉。',
    icon: Wind,
    group: '肩背',
  },
  {
    name: '等长划船（毛巾拉背）',
    target: '背 / 肩胛',
    how: '坐姿，毛巾绕过脚底，双手握两端屈肘后拉，肩胛夹紧持续对抗。',
    dose: '20–30 秒 × 3 组',
    note: '肩胛骨向内收是重点，不是单纯手臂发力。',
    icon: Wind,
    group: '肩背',
  },
  {
    name: 'L 字保持（肩袖外旋）',
    target: '肩袖 / 三角肌',
    how: '大臂贴身屈肘 90°，前臂水平朝前，双手握拳持续外旋对抗（或用弹力带），保持前臂不晃。',
    dose: '每侧 20–30 秒 × 2–3 组',
    note: '全程小重量高次数感；肩部术后恢复的经典等长动作。',
    icon: Activity,
    group: '肩背',
  },
  {
    name: '靠墙天使',
    target: '上背 / 肩 / 体态',
    how: '背贴墙站立，双臂屈肘贴墙上滑至最高点再缓慢下放，在最高点保持 10 秒。',
    dose: '8–12 次 × 2 组，顶峰保持 10 秒',
    note: '腰背全程贴墙；手臂抬不高就降到能完成的高度。',
    icon: Hand,
    group: '肩背',
  },
  {
    name: '门框肩外展等长',
    target: '三角肌中束 / 肩袖',
    how: '侧对门框，外侧大臂贴侧屈肘 90°，前臂抵住门框持续向外发力推。',
    dose: '每侧 15–25 秒 × 2–3 组',
    note: '肩部放松不耸起；左右对称完成。',
    icon: Activity,
    group: '肩背',
  },
  {
    name: '等长侧平举保持',
    target: '三角肌中束',
    how: '双手各持轻哑铃（或空手），侧平举至肩高，静态保持，手臂不晃动。',
    dose: '20–40 秒 × 2–3 组',
    note: '肩胛下沉、肘微屈；重量宁轻勿重，酸到发抖就结束。',
    icon: Dumbbell,
    group: '肩背',
  },
  {
    name: '肩胛回缩等长',
    target: '菱形肌 / 中下斜方',
    how: '站立，双臂屈肘，肩胛骨持续向后向中间夹紧，双手可握拳互拉增加阻力。',
    dose: '20–30 秒 × 3 组',
    note: '只动肩胛、不动手臂；含胸圆肩人群尤其适合。',
    icon: Wind,
    group: '肩背',
  },
  // ============ 腕部握力 ============
  {
    name: '腕屈伸等长（正反对抗）',
    target: '前臂屈伸肌群',
    how: '一手掌心朝上握拳，另一手压住手腕向下，拳头持续向上对抗；再掌心朝下做反向。',
    dose: '每个方向 15–25 秒 × 2–3 组',
    note: '这是腕力（斗腕）的基础等长；发力均匀不憋气。',
    icon: Hand,
    group: '腕部握力',
  },
  {
    name: '握力等长（捏球 / 卷毛巾）',
    target: '指屈肌 / 握力',
    how: '用力捏握力球 / 卷紧的毛巾，保持最大握力 10 秒再放松，交替手。',
    dose: '每手 10 秒 × 5 次',
    note: '放松阶段充分张开手指，避免前臂持续紧张。',
    icon: Hand,
    group: '腕部握力',
  },
  {
    name: '手指等长（五指对抗）',
    target: '指伸肌 / 指屈肌',
    how: '五指张开，另一只手从指背方向压合，五指持续张开对抗；再反向用指腹对抗合拢。',
    dose: '每方向 10–15 秒 × 3 组',
    note: '术后卧床期最轻量的「维持神经激活」动作之一。',
    icon: Hand,
    group: '腕部握力',
  },
  {
    name: '旋前旋后等长',
    target: '前臂旋前 / 旋后肌群',
    how: '握拳屈肘 90°，另一只手握住拳头施加旋内 / 旋外的力，前臂持续反向对抗保持。',
    dose: '每方向 10–15 秒 × 3 组',
    note: '斗腕翻腕（top roll）与钩手（hook）的关键力量，左右对称。',
    icon: Activity,
    group: '腕部握力',
  },
  // ============ 颈与全身 ============
  {
    name: '颈部等长抗阻',
    target: '颈部深层肌群',
    how: '坐姿或站姿，手放额头向前推，头颈持续向前顶住不动；再换手放脑后向后顶、放两侧向侧顶。',
    dose: '每个方向 10–15 秒 × 3 组',
    note: '轻微用力即可，绝不用爆发力；颈椎术后 / 不适者跳过。',
    icon: Shield,
    group: '颈与全身',
  },
  {
    name: '下颌后收等长',
    target: '深层颈屈肌 / 体态',
    how: '坐姿，下巴水平向后收（双下巴动作），颈后肌肉持续发力保持，头不前倾。',
    dose: '10–15 秒 × 5 次',
    note: '不是低头，是水平后移；长期看屏幕人群的颈部保护动作。',
    icon: Shield,
    group: '颈与全身',
  },
  {
    name: '马步站桩',
    target: '全身 / 大腿 / 核心',
    how: '双脚宽于肩，屈膝沉髋如骑马，上身正直，双手抱拳于腰间，静态保持。',
    dose: '45–90 秒 × 2–3 组',
    note: '传统功法；注意膝盖方向与脚尖一致，不内扣。',
    icon: Activity,
    group: '颈与全身',
  },
  {
    name: '靠墙静站（体态保持）',
    target: '全身 / 体态',
    how: '后脑、肩胛、臀部、脚跟贴墙站立，下巴微收，腹部微收，保持 1 分钟。',
    dose: '1–2 分钟 × 2 组',
    note: '零压力动作，久坐人群的「复位」练习，随时可做。',
    icon: Armchair,
    group: '颈与全身',
  },
  {
    name: '倒立撑等长（墙倒立保持）',
    target: '肩 / 三头 / 全身',
    how: '靠墙倒立，手臂撑地保持静止；仅建议已有倒立基础的训练者。',
    dose: '15–30 秒 × 2–3 组',
    note: '眼部术后、血压问题者禁止（头低于心脏）；初学者先练靠墙肩支撑。',
    icon: Dumbbell,
    group: '颈与全身',
  },
];

/** 眼部手术后恢复阶段：原则是「全程不憋气、头部不高位、强度递进」 */
const STAGES = [
  {
    phase: '阶段一 · 术后 0–3 天',
    tag: '严格避压',
    color: 'text-warning border-warning/30 bg-warning/5',
    items: [
      '以卧床休养为主，禁止任何上强度训练；避免低头、弯腰搬物、揉眼。',
      '可做踝泵（勾脚背 10 秒 × 10 次，促进下肢循环）、深呼吸练习。',
      '手指等长（五指张开对抗合拢）等极轻量动作，意义是「维持神经激活」。',
      '散步暂缓或仅在室内慢走 5–10 分钟，戴好护目镜防风吹。',
    ],
  },
  {
    phase: '阶段二 · 术后 1–2 周',
    tag: '温和启动',
    color: 'text-primary border-primary/25 bg-primary/5',
    items: [
      '开始坐姿 / 卧姿等长入门：静态臀桥、平板支撑短组、等长推墙轻压。',
      '每组时长砍半（如平板 15–20 秒起步），强度以「轻松完成」为准。',
      '搭配散步 15–20 分钟 / 天：温和匀速，心率控制在能轻松说话的强度。',
      '绝对禁止：憋气发力、倒立 / 头低于心脏动作、剧烈晃动、出汗进眼。',
    ],
  },
  {
    phase: '阶段三 · 术后 2–4 周',
    tag: '常规循环',
    color: 'text-success border-success/30 bg-success/5',
    items: [
      '可完成完整等长循环：靠墙静蹲 / 平板 / 侧平板 / 静态臀桥 / 等长推墙，每项 2–3 组。',
      '散步加量至 25–35 分钟 / 天，可分早晚两次；天气好可户外。',
      '全程呼气发力，组间充分休息；出现头晕、眼胀、异物感立即停止。',
      '护目镜 / 墨镜外出常戴，避免阳光直射与灰尘。',
    ],
  },
  {
    phase: '阶段四 · 术后 4 周+',
    tag: '遵医嘱进阶',
    color: 'text-info border-info/30 bg-info/5',
    items: [
      '复查确认后，方可逐步恢复常规抗阻训练；从 50–60% 重量开始。',
      '前 4 周仍避免：剧烈跑跳、倒立、大重量憋气动作、对抗类运动。',
      '等长训练可继续作为「热身激活」与「恢复日」保留项目。',
      '任何阶段：医生说的优先级高于本页一切建议。',
    ],
  },
];

export default function IsometricPage() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-8 px-3 pb-12 pt-4 sm:px-4 sm:pt-6">
      {/* 页头 */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-medium text-primary">
          <Hand className="h-4 w-4" />
          等长训练 · Isometric Training
        </div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          低压力保肌：等长式训练
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          肌肉持续收缩、关节不产生位移——等长训练不依赖器械、不冲击关节，热量消耗低，但能维持神经募集与肌肉量。
          尤其适合术后恢复期、环境条件有限、或暂时不能承受大压力的人；搭配散步，用温和的方式促进血液循环、保住训练成果。
        </p>
      </div>

      {/* 为什么练等长 */}
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { icon: ShieldCheck, t: '低压力', d: '关节零冲击、无离心冲击，眼压 / 血压负荷可控，只要不憋气就非常安全。' },
          { icon: Sparkles, t: '保肌有效', d: '等长收缩同样产生高阈值运动单位募集，维持肌肉量与神经效率，热量低但价值不低。' },
          { icon: Armchair, t: '随处可练', d: '一面墙、一条毛巾、一块地板就能完成全套，宿舍、病床、办公室都行。' },
        ].map(({ icon: Icon, t, d }) => (
          <Card key={t}>
            <CardContent className="p-4">
              <Icon className="mb-2 h-5 w-5 text-primary" />
              <p className="text-sm font-semibold text-foreground">{t}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{d}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 动作库 */}
      <div className="space-y-3">
        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Dumbbell className="h-3.5 w-3.5 text-primary" />
          等长动作库
          <span className="font-normal text-muted-foreground/70">—— 全程正常呼吸，不憋气，是唯一的硬规矩</span>
        </div>
        <div className="space-y-4">
          {(['下肢', '核心', '上肢胸臂', '肩背', '腕部握力', '颈与全身'] as const).map((g) => {
            const items = EXERCISES.filter((e) => e.group === g);
            if (items.length === 0) return null;
            return (
              <div key={g} className="space-y-2">
                <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-primary">
                  <span className="h-px w-4 bg-primary/40" />
                  {g}
                  <span className="font-normal text-muted-foreground/60">{items.length}</span>
                </p>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map(({ name, target, how, dose, note, icon: Icon }) => (
                    <Card key={name} className="hover:border-primary/30">
                      <CardContent className="p-4">
                        <div className="mb-2 flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4 text-primary" />
                            <p className="text-sm font-semibold text-foreground">{name}</p>
                          </div>
                          <Badge variant="secondary" className="text-[10px]">{target}</Badge>
                        </div>
                        <p className="text-xs leading-relaxed text-muted-foreground">{how}</p>
                        <p className="mt-2 flex items-center gap-1 text-[11px] font-medium text-primary">
                          <Timer className="h-3 w-3" />
                          {dose}
                        </p>
                        <p className="mt-1 flex items-start gap-1 text-[11px] leading-relaxed text-muted-foreground">
                          <Info className="mt-0.5 h-3 w-3 shrink-0" />
                          {note}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 眼部手术后恢复方案（核心场景） */}
      <div className="space-y-3">
        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <HeartPulse className="h-3.5 w-3.5 text-primary" />
          眼部手术后恢复方案
          <span className="font-normal text-muted-foreground/70">—— 近视 / 眼科术后无法加压时的保肌路线</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {STAGES.map(({ phase, tag, color, items }) => (
            <Card key={phase} className={color}>
              <CardContent className="space-y-2 p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                    <Tag className="h-4 w-4 text-primary" />
                    {phase}
                  </p>
                  <Badge className="bg-primary/10 text-primary">{tag}</Badge>
                </div>
                <ul className="space-y-1.5">
                  {items.map((it) => (
                    <li key={it} className="flex items-start gap-1.5 text-xs leading-relaxed text-muted-foreground">
                      <Shield className="mt-0.5 h-3 w-3 shrink-0 text-primary/70" />
                      {it}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 搭配散步 */}
      <Card>
        <CardContent className="grid gap-4 p-4 sm:grid-cols-[auto_1fr] sm:items-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/25 bg-primary/5">
            <Footprints className="h-5 w-5 text-primary" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-foreground">散步是等长的最佳搭档</p>
            <p className="text-xs leading-relaxed text-muted-foreground">
              散步本身热量不高，但它温和促进全身血液循环、帮助术后恢复与代谢维持。搭配原则：心率控制在「能轻松说话」的强度；
              术后早期戴护目镜防风吹防异物；从 10–15 分钟起步，每周加 5 分钟；环境允许就户外，全程匀速不追求速度。
              等长训练负责「肌肉」，散步负责「循环与心情」，两者互补。
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 一周安排示例 */}
      <Card>
        <CardContent className="space-y-2 p-4">
          <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
            <TrendingUp className="h-4 w-4 text-primary" />
            恢复期一周安排示例（阶段三可用）
          </p>
          <ul className="space-y-1.5">
            {[
              '周一 / 周三 / 周五：等长循环 15–20 分钟（静蹲 + 平板 + 侧平板 + 臀桥 + 推墙，每项 2–3 组）+ 散步 25 分钟',
              '周二 / 周四：散步 30 分钟 + 睡前静态拉伸 10 分钟',
              '周六：散步 40 分钟（可户外慢走）',
              '周日：完全休息，只做深呼吸与踝泵',
              '全程原则：组间不憋气、强度宁低勿高、不适即停。',
            ].map((it) => (
              <li key={it} className="flex items-start gap-1.5 text-xs leading-relaxed text-muted-foreground">
                <Moon className="mt-0.5 h-3 w-3 shrink-0 text-primary/70" />
                {it}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* 红线清单 */}
      <div className="rounded-lg border border-destructive/25 bg-destructive/5 p-4">
        <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
          <AlertTriangle className="h-4 w-4 text-destructive" />
          红线清单：以下情况立即停止
        </p>
        <ul className="mt-2 space-y-1.5">
          {[
            '任何形式的憋气发力（Valsalva）——会显著升高眼压，术后绝对禁止',
            '头部低于心脏的动作（倒立、深度弯腰负重）',
            '揉眼、剧烈晃动、碰撞、汗水进眼',
            '出现眼胀、眼痛、视物模糊、头晕——停止并联系医生',
            '未经医生复查确认，不进行跑跳、大重量、对抗类训练',
          ].map((it) => (
            <li key={it} className="flex items-start gap-1.5 text-xs leading-relaxed text-muted-foreground">
              <Stethoscope className="mt-0.5 h-3 w-3 shrink-0 text-destructive/80" />
              {it}
            </li>
          ))}
        </ul>
      </div>

      <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
        <Apple className="h-3 w-3" />
        本站所有内容仅供健身参考，不构成医疗建议；术后运动方案请以主治医生意见为准。
      </p>
    </div>
  );
}
