// EXPORTS: TAN_CHENGYI, CHEN_SHI, type CoachVideo
// 名师视频讲解：动作教学挂谭成义（健身教练，抖音/B站），饮食营养挂陈石（3HFIT/SNC 营养讲师）
// 所有链接均为公开搜索到的视频页链接，点击跳转原平台观看，本站不托管视频文件。
// 免责声明：视频内容版权归原作者所有，仅作学习参考。

export interface CoachVideo {
  /** 标题 */
  title: string;
  /** 平台 */
  platform: 'B站' | '抖音';
  /** 视频链接 */
  url: string;
  /** 适用部位/主题 */
  topic: string;
  /** 说明 */
  note?: string;
}

// ── 谭成义 · 动作教学 ─────────────────────────────
export const TAN_CHENGYI: CoachVideo[] = [
  // 胸部
  { title: '卧推焚决（平板卧推详解）', platform: '抖音', topic: '胸部', url: 'https://www.iesdouyin.com/share/video/7590817018840927497', note: '谭成义卧推教学，讲解非常细致' },
  { title: '胸部训练：杠铃卧推计划', platform: '抖音', topic: '胸部', url: 'https://www.iesdouyin.com/share/video/7622615485516181435', note: '热身组→适应组→力竭组完整流程' },
  { title: '上斜推胸之百家齐鸣', platform: 'B站', topic: '胸部', url: 'https://www.bilibili.com/video/BV1q6NwzaECw/', note: '上斜卧推详解' },
  { title: '上斜推胸之百家齐鸣', platform: '抖音', topic: '胸部', url: 'https://www.iesdouyin.com/share/video/7614489639524601129', note: '上斜卧推呼吸与落点' },
  { title: '哑铃推胸推肩核心重点总结', platform: '抖音', topic: '胸部/肩部', url: 'https://www.iesdouyin.com/share/video/7670171148207130486', note: '凳子角度、脚部摆放、胸肌募集' },
  { title: '胸肩三头焚诀（完整上肢推力）', platform: '抖音', topic: '胸部/肩部/三头', url: 'https://www.iesdouyin.com/share/video/7687592749101581937', note: '练胸+练肩+三头一套完整' },
  { title: '胸部私教跟练第一期', platform: '抖音', topic: '胸部', url: 'https://www.iesdouyin.com/share/video/7685948993150718833', note: '史密斯上斜卧推+跟练' },

  // 肩部
  { title: '蹲日跟练：站姿史密斯实力推', platform: '抖音', topic: '肩部', url: 'https://www.iesdouyin.com/share/video/7599975699831654826', note: '肩+腿训练日动作分解' },
  { title: '三分化训练第三天：肩+腿详细', platform: '抖音', topic: '肩部/腿部', url: 'https://www.iesdouyin.com/share/video/7673105798482759423', note: '站姿实力推+保加利亚蹲重点总结' },

  // 背部
  { title: '第三视角私教课【练背】', platform: 'B站', topic: '背部', url: 'https://www.bilibili.com/video/BV1Bh4y1V7ea', note: '背训私教课' },

  // 腿部
  { title: '私教腿部跟练', platform: '抖音', topic: '腿部', url: 'https://www.iesdouyin.com/share/video/7666798007841651633', note: '泡沫轴热身+动态热身+正式组完整' },
  { title: '私教跟练计划-腿部篇', platform: '抖音', topic: '腿部', url: 'https://www.iesdouyin.com/share/video/7684575471153024290', note: '保加利亚蹲、哑铃硬拉、腿屈伸' },
  { title: '蹲日跟练1.0', platform: '抖音', topic: '腿部/肩部', url: 'https://www.iesdouyin.com/share/video/7599975699831654826', note: '肩+腿训练日' },

  // 计划体系
  { title: '三分化合集（推拉蹲循环）', platform: 'B站', topic: '训练计划', url: 'https://www.bilibili.com/video/BV17ooLBUEqS/', note: '凯圣王-谭成义三分化完整合集' },
  { title: '三分化②——胸肩三头跟练', platform: '抖音', topic: '训练计划', url: 'https://www.iesdouyin.com/share/video/7625479021379194118', note: '三分化第一天：胸肩三头' },
  { title: '三分化③——名词释义', platform: 'B站', topic: '训练计划', url: 'https://www.bilibili.com/video/BV1hCdSBaEvw/', note: 'RM、适应组等名词解释' },
  { title: '新手通用四分化训练第一天', platform: '抖音', topic: '训练计划', url: 'https://www.iesdouyin.com/share/video/7670512673506876243', note: '四分化：胸+三头' },
];

// ── 陈石 · 营养讲解 ─────────────────────────────
export const CHEN_SHI: CoachVideo[] = [
  { title: '蛋白质吃多了不长肌肉（过量危害）', platform: '抖音', topic: '蛋白质', url: 'https://www.iesdouyin.com/share/video/7634519285527842098', note: '脱氨基、肝肾负担、尿素' },
  { title: '碳、蛋、脂三大营养素可互相转化', platform: '抖音', topic: '宏量营养', url: 'https://www.iesdouyin.com/share/video/7601516521424260367', note: '蛋白质吃多了一样胖' },
  { title: '增肌要吃多少蛋白质？2.0g/kg 即上限', platform: '抖音', topic: '蛋白质', url: 'https://www.iesdouyin.com/share/video/7592587735262089114', note: '研究显示 2.0g/kg 达增肌上限，多吃无益' },
  { title: '增肌的正确策略（氮平衡）', platform: '抖音', topic: '增肌', url: 'https://www.iesdouyin.com/share/video/7637897137834351507', note: '抗阻力训练+渐进式是防止掉氮最有效手段' },
  { title: '什么时候会掉肌肉？（肝糖原）', platform: '抖音', topic: '蛋白质/碳水', url: 'https://www.iesdouyin.com/share/video/7600431660072974246', note: '碳水保护蛋白质，吃够碳水才不掉肌肉' },
  { title: '掉肌肉的元凶', platform: '抖音', topic: '蛋白质/碳水', url: 'https://www.iesdouyin.com/share/video/7614882028617802442', note: '肝糖原不足才掉肌肉' },
  { title: '训练者性价比最高的补碳方式', platform: '抖音', topic: '碳水', url: 'https://www.iesdouyin.com/share/video/7517201444924083495', note: '高强度运动每小时补 60g 碳水' },
  { title: '减脂的核心误区（碳水认知）', platform: '抖音', topic: '减脂', url: 'https://www.iesdouyin.com/share/video/7596701107246615854', note: '大众对碳水认知大多错误' },
  { title: '瘦胖子饮食训练通用计划', platform: '抖音', topic: '减脂/增肌', url: 'https://www.iesdouyin.com/share/video/7643747446070510961', note: '快碳慢碳分配+动物蛋白优先' },
  { title: '小基数女生怎么减脂', platform: '抖音', topic: '减脂', url: 'https://www.iesdouyin.com/share/video/7621865791420336817', note: '蛋白 1.6g/kg+碳水 3g/kg' },
  { title: '维生素与矿物质详解（蹭饭四）', platform: '抖音', topic: '维生素', url: 'https://www.iesdouyin.com/share/video/7490841932227185961', note: '矿物质重要性、补剂使用、极端饮食' },
  { title: '长期吃低脂餐小心缺维生素', platform: '抖音', topic: '维生素', url: 'https://www.iesdouyin.com/share/video/7583639863560375615', note: '必需维生素、脂溶性维生素' },
  { title: '慢性炎症（抗炎饮食）', platform: '抖音', topic: '饮食健康', url: 'https://www.iesdouyin.com/share/video/7513061749509557540', note: '白米饭配蔬菜、少油烟、戒烟酒' },
  { title: '肌肉不是那么好掉的（别焦虑）', platform: '抖音', topic: '蛋白质', url: 'https://www.iesdouyin.com/share/video/7568474937833311498', note: '静息状态 90% 能量来自碳水脂肪' },
];
