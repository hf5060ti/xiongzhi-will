// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
/**
 * 动作教学要点库
 * 按动作名关键词匹配，覆盖高频核心动作；匹配不到时详情页只显示通用安全提示。
 * 要点写"为什么"而不是"别怎样"——让用户照着练能理解原理。
 */
export interface ExerciseGuidance {
  /** 命中关键词（中文名片段，命中任一即适用） */
  match: string[];
  /** 动作要点（3–5 条） */
  cues: string[];
  /** 常见错误及后果（2–3 条，写清伤在哪） */
  mistakes: { mistake: string; consequence: string }[];
  /** 退阶（做不了时怎么做） */
  regress: string;
  /** 进阶（做轻松后怎么加难） */
  progress: string;
  /** 自然训练者建议容量备注 */
  volumeNote?: string;
}

export const EXERCISE_GUIDANCE: ExerciseGuidance[] = [
  {
    match: ['平板卧推', '杠铃卧推', '卧推'],
    cues: [
      '起桥但不顶腰过度：肩胛骨后缩下沉，像把肩胛骨塞进裤兜，胸椎保持中立',
      '杠铃下放至乳头一线，小臂垂直地面；推起时路径略向头侧斜线，不是直上直下',
      '脚踩实地面，下肢绷紧——卧推是全身发力，脚散了力量就泄',
      '握距：前臂在最低点垂直地面为宜，过宽伤肩、过宽三头参与少',
    ],
    mistakes: [
      { mistake: '下放时肩胛骨松掉、耸肩', consequence: '肩前束代偿，长期撞肩峰致肩前痛' },
      { mistake: '杠铃弹胸借力做卧推', consequence: '胸肌张力被卸掉，还会增加胸椎挤压伤风险' },
    ],
    regress: '哑铃卧推（活动度更自由、重量更小）或固定器械推胸',
    progress: '暂停卧推（最低点停 2 秒）、弹力带卧推、锁链卧推',
    volumeNote: '自然训练者每周胸部直接容量 10–20 组即可，堆组不生长只恢复',
  },
  {
    match: ['上斜卧推', '上斜哑铃'],
    cues: [
      '斜板角度 30–45 度：超过 45 度三角肌前束抢戏，上胸刺激反而下降',
      '杠铃触锁骨下沿，不是锁骨本身——那是撞脖子',
      '肩胛骨保持后缩，别为了推起把肩往前送',
    ],
    mistakes: [
      { mistake: '角度调太陡（>60°）', consequence: '变成肩推，上胸没练到肩先酸' },
    ],
    regress: '上斜哑铃飞鸟（轻重量找上胸收缩感）',
    progress: '窄距上斜卧推、离心放慢 4 秒下放',
  },
  {
    match: ['引体', '引体向上', 'pull up', 'pull-up', 'chin up', 'chin-up'],
    cues: [
      '先沉肩再拉起：想象把肩膀从耳朵里推开，背阔肌先启动而不是手臂硬拽',
      '下巴过杠就行，不必拉到胸口贴杠——后者对胸椎灵活度要求高，普通人容易代偿',
      '下放要伸直手臂但别松肩胛，全程控制',
    ],
    mistakes: [
      { mistake: '靠甩腿、摆身体借力', consequence: '变成动态拉伸，背阔刺激归零还伤腰' },
      { mistake: '下放不直臂', consequence: '背阔肌拉伸位缺失，训练量打折' },
    ],
    regress: '弹力带辅助引体、澳式引体（斜杆身体后仰拉）',
    progress: '负重引体（腰间挂片）、慢速离心（5 秒下放）',
  },
  {
    match: ['高位下拉', '下拉'],
    cues: [
      '想象用肘尖去找裤兜，不是用手把杠拽下来——背阔发力感立刻清晰',
      '身体微微后倾 10 度，别后仰成划船',
      '杠拉到上胸（锁骨下），不要拉到肚子',
    ],
    mistakes: [
      { mistake: '后仰过大靠腰甩', consequence: '腰椎反复屈伸，椎间盘压力累积' },
    ],
    regress: '窄握对握下拉（对握把手对肩膀更友好）',
    progress: '负重下拉、单臂下拉（矫正左右不平衡）',
  },
  {
    match: ['杠铃划船', '划船'],
    cues: [
      '髋铰链：屁股向后推至上半身约 45 度，背挺直不圆腰',
      '杠贴腿上行，划到下腹部，肘贴身两侧向后夹',
      '先收缩肩胛骨再拉杠，顺序反了全是手臂劲',
    ],
    mistakes: [
      { mistake: '圆腰弓背拉重', consequence: '腰椎剪切力暴增，是下背伤头号动作' },
      { mistake: '拉到胸口过高', consequence: '上斜方肌代偿，脖子变厚背没宽' },
    ],
    regress: '单臂哑铃划船（另一只手撑凳，腰背压力小）',
    progress: '暂停划船（顶点停 1–2 秒）、T 杠划船',
  },
  {
    match: ['深蹲', '杠铃深蹲', 'back squat'],
    cues: [
      '膝始终对准脚尖方向，别内扣——内扣时胫骨内旋，ACL 承受剪切力',
      '下蹲到大腿至少与地面平行，想象屁股往后坐进椅子',
      '核心绷紧如准备挨一拳，气息吸满腹腔再下蹲',
      '膝盖可以过脚尖，那是正常力学结构，别被"不要过脚尖"的老说法捆住',
    ],
    mistakes: [
      { mistake: '膝盖内扣', consequence: '前交叉韧带剪切力增加，长期是 ACL 损伤高危动作' },
      { mistake: '蹲下去屁股眨眼（骨盆后倾）', consequence: '腰椎从中立位折屈，椎间盘后移受压' },
    ],
    regress: '高脚杯深蹲（抱一个壶铃在胸前，自动逼你挺胸）',
    progress: '暂停深蹲（底部停 2 秒）、前蹲',
    volumeNote: '深蹲是主项，每周直接容量 6–10 组大重量足够，多了反而抑制恢复',
  },
  {
    match: ['硬拉', '罗马尼亚硬拉', 'romanian deadlift', 'deadlift'],
    cues: [
      '启动前吸气憋住（瓦式呼吸），背中立杠贴腿——这是硬拉的全部秘密',
      '屁股和肩膀同时离地，别先抬屁股（那变成撅臀硬拉，腰受力暴增）',
      '锁直膝盖就行，不要过度后仰顶髋——那是腰不是臀',
    ],
    mistakes: [
      { mistake: '圆腰拉重', consequence: '腰椎屈曲状态下负重，是椎间盘突出的典型诱因' },
      { mistake: '离地后过度后仰顶髋', consequence: '腰椎超伸，骶骨区域长期疼痛' },
    ],
    regress: '哑铃硬拉（重量小、轨迹短，容易找背中立感）',
    progress: '相扑硬拉、暂停硬拉（离地停 2 秒）',
  },
  {
    match: ['实力推', '肩推', '推举', '哑铃推举', '杠铃推举'],
    cues: [
      '肋骨下沉别翻起来，核心绷紧——推举最常见的毛病就是挺腰顶肋骨借力',
      '杠沿面部垂直轨迹推，过头顶时正好在耳垂上方，不是在额头前',
      '到站直就锁肘，别过度后仰',
    ],
    mistakes: [
      { mistake: '顶肋骨、过度挺腰', consequence: '腰椎超伸反复挤压，长期下背痛' },
    ],
    regress: '坐姿肩推（靠背撑住，腰压力小）',
    progress: '站姿哑铃推举（需要更多核心稳定）',
  },
  {
    match: ['侧平举'],
    cues: [
      '小重量！这个动作 5kg 做错比 15kg 做对还累——用三角肌中束惯性甩是最常见错误',
      '肘微屈固定角度，想象用肘尖去碰两侧墙，手只是挂着',
      '抬到与肩同高就行，再高斜方肌接管',
    ],
    mistakes: [
      { mistake: '甩大重量、耸肩抬', consequence: '斜方肌上束肥大，脖子视觉变短' },
    ],
    regress: '绳索侧平举（持续张力，借力更难）',
    progress: '慢速离心 4 秒下放',
  },
  {
    match: ['弯举', '杠铃弯举', '哑铃弯举', '锤式'],
    cues: [
      '上臂贴身固定，动的只有肘关节——上臂往前飘就全变成肩屈',
      '顶峰收缩停半秒，比多做两个值',
    ],
    mistakes: [
      { mistake: '身体前后晃借力', consequence: '二头没力，腰椎和三角肌前束代偿' },
    ],
    regress: '牧师凳弯举（凳托把上臂固定，想借力都借不了）',
    progress: '离心 4 秒下放、上斜弯举（拉长位张力）',
  },
  {
    match: ['下压', '绳索下压', '臂屈伸'],
    cues: [
      '大臂夹紧身体两侧固定，只动前臂——大臂晃出去就变推',
      '到底完全伸直前加一个腕下压，三头长头收缩感最强',
    ],
    mistakes: [
      { mistake: '大臂前后晃', consequence: '变成肩伸展，三头刺激大打折扣' },
    ],
    regress: '哑铃过头臂屈伸（单臂轻重量找长头拉伸感）',
    progress: '窄距卧推（复合上重量）',
  },
  {
    match: ['悬垂举腿', '举腿'],
    cues: [
      '先卷骨盆再抬腿：想象肚脐往脊柱收，不是把腿甩起来',
      '骨盆后倾把屁股拉离杠，下腹才有收缩感',
    ],
    mistakes: [
      { mistake: '摆腿靠惯性甩起', consequence: '髂腰肌酸痛，腹肌全程没参与' },
    ],
    regress: '悬垂屈膝举腿（屈髋降低力矩）、仰卧举腿',
    progress: '负重举腿（脚踝夹片）',
  },
  {
    match: ['俯卧撑', 'push-up'],
    cues: [
      '身体从头到脚一条线，屁股别塌也别撅',
      '手略宽于肩，下放至胸离一拳距离，推起夹胸',
    ],
    mistakes: [
      { mistake: '塌腰做', consequence: '腰椎超伸，核心散掉动作质量归零' },
    ],
    regress: '上斜俯卧撑（手撑台阶，重量变小）',
    progress: '下斜俯卧撑（脚垫高）、负重俯卧撑',
  },
  {
    match: ['平板支撑', 'plank'],
    cues: [
      '肚脐往内收、屁股别抬太高也别塌，正常呼吸别憋气',
      '质量比时间重要：30 秒标准 > 3 分钟塌腰',
    ],
    mistakes: [
      { mistake: '塌腰撅屁股硬撑时间', consequence: '腰椎超伸，练完下背酸不是核心酸' },
    ],
    regress: '膝盖着地平板支撑',
    progress: '侧平板、平板抬对侧手脚',
  },
  {
    match: ['箭步蹲', '分腿蹲', '保加利亚', 'lunge', 'Lunge'],
    cues: [
      '前脚全脚掌踩实，重心落在前脚脚跟，后脚只是轻点支撑',
      '下蹲时前侧大腿尽量平行地面，膝盖对准第二脚趾别内扣',
      '躯干略微前倾保持重心稳，别后仰把压力甩到腰',
    ],
    mistakes: [
      { mistake: '前膝内扣', consequence: 'ACL 剪切力上升，长期是伤膝高危动作' },
      { mistake: '步幅过大、重心掉太低', consequence: '前髋被过度拉伸，起身乏力还左右晃' },
    ],
    regress: '高脚杯分腿蹲（抱一个壶铃，自动逼你挺胸、重心更稳）',
    progress: '保加利亚分腿蹲（后脚垫高，单侧刺激更强）',
  },
  {
    match: ['臀推', 'hip thrust', 'Hip Thrust', '臀冲'],
    cues: [
      '上背靠凳、杠铃压髋，下巴微收眼睛看正前方',
      '用脚跟蹬地顶髋，到顶时骨盆后倾夹紧臀——是用臀不是用腰顶',
      '顶端停顿 1 秒再下放，全程臀主导',
    ],
    mistakes: [
      { mistake: '用腰顶髋而非臀夹紧', consequence: '腰椎超伸，练完腰比臀酸' },
      { mistake: '脚距过宽、大腿外八', consequence: '内收肌代偿，臀刺激大打折扣' },
    ],
    regress: '臀桥（无负重，先找臀收缩感）',
    progress: '单腿臀推、垫高脚位臀推',
  },
  {
    match: ['腿举', 'leg press', 'Leg Press'],
    cues: [
      '双脚与肩同宽踩踏板中上部，膝盖对准脚尖方向',
      '下放到大腿接近胸口但腰不离垫——别塌腰',
      '用脚跟蹬出，锁膝别过伸',
    ],
    mistakes: [
      { mistake: '下放时腰离开靠垫拱起', consequence: '腰椎悬空承受重量，极易受伤' },
      { mistake: '双脚放得太高', consequence: '压力移到臀部而非股四头，练歪了' },
    ],
    regress: '单腿腿举（重量小、控制更容易）',
    progress: '窄距腿举（更多股四头）、暂停腿举',
  },
  {
    match: ['卷腹', 'crunch', 'Crunch'],
    cues: [
      '下巴微收，用腹把肩胛骨下角离开地面——不是用脖子拽',
      '下背始终贴地，起来一寸就够，别整根坐起',
      '呼气收腹、慢起慢落',
    ],
    mistakes: [
      { mistake: '双手抱头硬拽脖子', consequence: '颈椎受压，练完脖子比肚子酸' },
      { mistake: '起来过高变成仰卧起坐', consequence: '髋屈肌代偿，腹肌没练到' },
    ],
    regress: '死虫式（仰躺对侧手脚，零风险找核心）',
    progress: '悬垂举腿、负重卷腹',
  },
  {
    match: ['双杠', '臂屈伸', 'dips', 'Dips'],
    cues: [
      '身体略前倾练胸、竖直练三头，先定目标再下',
      '下放至大臂平行地面即可，别砸肩膀',
      '手肘贴近身体别外撇',
    ],
    mistakes: [
      { mistake: '下放过深、肩膀前移', consequence: '肩关节前囊受压，长期肩痛' },
      { mistake: '含胸耸肩', consequence: '肩胛不稳，重量压在肩峰上' },
    ],
    regress: '凳上臂屈伸（脚跟着地减负）、弹力带辅助',
    progress: '负重双杠臂屈伸（腰间挂片）',
  },
  {
    match: ['提踵', 'calf', 'Calf', '小腿'],
    cues: [
      '站台阶边缘，脚后跟落到最低再踮到最高，全程满幅度',
      '顶端停顿 1 秒挤一下小腿，别借惯性弹',
      '膝盖锁定不弯',
    ],
    mistakes: [
      { mistake: '幅度只做一半', consequence: '腓肠肌只练到中段，生长刺激不足' },
      { mistake: '借惯性快速弹', consequence: '肌腱承受冲击，易小腿抽筋' },
    ],
    regress: '坐姿提踵（孤立比目鱼肌）',
    progress: '单腿提踵、负重提踵',
  },
  {
    match: ['腿屈伸', 'leg extension', 'Leg Extension'],
    cues: [
      '坐姿脚背勾住滚垫，小腿垂直地面起',
      '顶峰收缩停 1 秒再慢放，别让重量砸下去',
      '核心绷住、背贴椅',
    ],
    mistakes: [
      { mistake: '用惯性甩起', consequence: '髌腱受冲击，膝盖咔咔响' },
      { mistake: '放得太快、重量砸腿', consequence: '股四头离心被跳过，还伤髌骨' },
    ],
    regress: '箭步蹲（复合动作，关节更友好）',
    progress: '单腿腿屈伸、离心放慢 4 秒',
  },
  {
    match: ['腿弯举', 'leg curl', 'Leg Curl', '腘绳'],
    cues: [
      '俯卧滚垫贴住脚跟，骨盆贴垫别翘',
      '用脚跟把滚垫勾向臀部，顶峰夹一下腘绳',
      '慢放别让重量弹回',
    ],
    mistakes: [
      { mistake: '骨盆离垫、撅屁股借力', consequence: '腰椎承压，腘绳没孤立' },
      { mistake: '幅度不足只动小腿', consequence: '近端腘绳没激活，练了个寂寞' },
    ],
    regress: '罗马尼亚硬拉（髋铰链练腘绳整体）',
    progress: '站姿单腿弯举、离心 4 秒',
  },
  {
    match: ['俄罗斯转体', 'russian twist', 'Russian Twist'],
    cues: [
      '上半身后倾约 45 度，核心绷紧像被人要打肚子',
      '用腹带动肩转，手或药球划弧线到体侧',
      '脚可离地加大难度，但腰要稳',
    ],
    mistakes: [
      { mistake: '靠甩手臂带动转身', consequence: '腹斜肌没发力，还扭到腰' },
      { mistake: '后仰过度失去张力', consequence: '竖脊肌代偿，核心刺激归零' },
    ],
    regress: '死虫式、平板支撑（先练基础稳定）',
    progress: '负重俄罗斯转体（抱药球）、悬垂举腿',
  },
];

/** 按动作名查找教学要点 */
export function findGuidance(nameCn: string, nameEn: string): ExerciseGuidance | null {
  const text = `${nameCn}||${nameEn}`.toLowerCase();
  for (const g of EXERCISE_GUIDANCE) {
    if (g.match.some((kw) => text.includes(kw.toLowerCase()))) return g;
  }
  return null;
}
