// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Apache License 2.0
// ============================================================================
// fitwill 动作数据（动作百科 / #/library 追加收录）
// 来源说明：
//   · 动作名 / 身体部位 / 器械 / 目标肌群 等「事实数据」整理自 fitwill.app 公开资料；
//   · 「tip 动作要点」为本站基于原始锻炼说明改写压缩后自写，非原文照搬；
//   · 演示静态图(image) / 演示视频(video) 来自 fitwill（fitwill.app / S3）；
//   · 演示动图(gif) 复用自动作百科素材站（fitness.xingshuwen.com）同名动作。
//
// 去重统计（build-fitwill.js 输出）：
//   · fitwill-details 原始 1220 条
//   · 内部按归一化中文名去重剔除 17 条（同名保留有 video 者）
//   · slug 级内部去重剔除 94 条（同一 fitwill 动作挂多个中文标题，保留有 video / 无版本后缀 / 靠前者）
//   · 与现有动作库（exercises-ext + 动作百科素材站 + free-exercise-db + NAME_CN）归一化去重剔除 209 条
//   · 变式折叠（剥离 单臂/窄距/反握/架高/上斜… 前缀后基础名已在库内）剔除 25 条
//   · 最终收录 875 条
// ============================================================================

export interface FitwillExercise {
  id: string;            // fw-<fitwill id>，与现有库 id 防冲突
  name: string;          // 英文 slug，供搜索
  nameZh: string;        // 中文名
  bodyPart: string;      // fitwill 原始中文部位
  equipment: string;     // 映射后的标准器械 key
  equipmentCn: string;   // fitwill 原始中文器械
  primaryMuscles: string[];   // 映射后的标准肌群 key
  secondaryMuscles: string[];
  category: string;
  image: string;         // fitwill 静态图 /api/image
  video?: string;        // fitwill S3 mp4
  gif?: string;          // 素材站同名动图
  tip: string;           // 本站自写要点
  source: string;
}

export const FITWILL_EXERCISES: FitwillExercise[] = 
[
  {
    "id": "fw-10878",
    "name": "weighted-plate-crunch-hands-overhead-version-2",
    "nameZh": "双手过头负重杠铃片卷腹（版本2）",
    "bodyPart": "核心",
    "equipment": "other",
    "equipmentCn": "负重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10878?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10878.mp4",
    "tip": "整套动作里始终双脚踩稳、膝盖不动，别让腿部参与代偿卷腹",
    "source": "fitwill"
  },
  {
    "id": "fw-10871",
    "name": "weighted-plate-crunch-hands-overhead",
    "nameZh": "双手过顶负重杠铃片卷腹",
    "bodyPart": "核心",
    "equipment": "other",
    "equipmentCn": "负重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10871?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10871.mp4",
    "tip": "不要猛拉头部",
    "source": "fitwill"
  },
  {
    "id": "fw-8780",
    "name": "leg-up-crunch-bottle-pass",
    "nameZh": "举腿卷腹水瓶传递",
    "bodyPart": "核心",
    "equipment": "other",
    "equipmentCn": "其他",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8780?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8780.mp4",
    "tip": "整套动作里始终平稳呼吸：卷腹和传递时向心收缩时吐气，下放时回位时吸气，绝不憋气",
    "source": "fitwill"
  },
  {
    "id": "fw-0600",
    "name": "lever-seated-leg-raise-crunch-plate-loaded",
    "nameZh": "杠杆坐姿举腿卷腹（杠铃片负重）",
    "bodyPart": "腰部",
    "equipment": "machine",
    "equipmentCn": "杠杆器械",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0600?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0600.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-4330",
    "name": "reverse-crunch-kick",
    "nameZh": "反向卷腹踢腿",
    "bodyPart": "腰部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4330?w=1024&h=576",
    "tip": "保持呼吸平稳，踢腿时向心收缩时吐气，膝盖收回时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-10403",
    "name": "dumbbell-twisting-crunch-with-legs-supported",
    "nameZh": "双腿支撑哑铃转体卷腹",
    "bodyPart": "核心",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10403?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10403.mp4",
    "tip": "不要用手把头往前拽；向上转体时用力向心收缩时吐气",
    "source": "fitwill"
  },
  {
    "id": "fw-8527",
    "name": "dumbbell-single-leg-standing-shoulder-press",
    "nameZh": "哑铃单腿站姿肩上推举",
    "bodyPart": "肩部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8527?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8527.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-3886",
    "name": "dumbbell-complex-push-up-row-clean-and-press",
    "nameZh": "哑铃复合动作：俯卧撑、划船、翻铃与推举",
    "bodyPart": "其他",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3886?w=1024&h=576",
    "tip": "在平板支撑时，收下颚，颈部保持伸展",
    "source": "fitwill"
  },
  {
    "id": "fw-5884",
    "name": "dumbbell-curl-press-extension",
    "nameZh": "哑铃弯举推举臂屈伸",
    "bodyPart": "上臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/5884?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/5884.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-11563",
    "name": "dumbbell-standing-back-wrist-curl",
    "nameZh": "哑铃站姿背后腕弯举",
    "bodyPart": "前臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "forearms"
    ],
    "secondaryMuscles": [],
    "category": "armwrest",
    "image": "https://fitwill.app/api/image/11563?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11563.mp4",
    "tip": "向上弯举时向心收缩时吐气,下放时回位时吸气；整套动作里始终肩膀沉重放松",
    "source": "fitwill"
  },
  {
    "id": "fw-10121",
    "name": "lever-seated-single-leg-calf-raise-plate-loaded",
    "nameZh": "坐姿单腿提踵机（杠铃片配重）",
    "bodyPart": "小腿",
    "equipment": "machine",
    "equipmentCn": "杠杆器械",
    "primaryMuscles": [
      "calves"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10121?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10121.mp4",
    "tip": "脚跟向上顶时向心收缩时吐气，下放回位时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-10683",
    "name": "seated-circle-leg-crunch",
    "nameZh": "坐姿画圈举腿卷腹",
    "bodyPart": "核心",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10683?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10683.mp4",
    "tip": "画圈要保持缓慢、直径均匀",
    "source": "fitwill"
  },
  {
    "id": "fw-10395",
    "name": "dumbbell-twisting-crunch-legs-on-bench",
    "nameZh": "小腿搁凳哑铃转体卷腹",
    "bodyPart": "核心",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10395?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10395.mp4",
    "tip": "整套动作里始终髋部和下背部平贴地面",
    "source": "fitwill"
  },
  {
    "id": "fw-2152",
    "name": "resistance-band-front-plank-with-kicked-leg",
    "nameZh": "弹力带前平板支撑后踢腿",
    "bodyPart": "臀部",
    "equipment": "bands",
    "equipmentCn": "阻力带",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/2152?w=1024&h=576",
    "tip": "在每次重复前收紧核心；别让过快完成离心阶段",
    "source": "fitwill"
  },
  {
    "id": "fw-3789",
    "name": "resistance-band-single-stiff-leg-deadlift-with-single-arm-row",
    "nameZh": "弹力带单腿直腿硬拉加单臂划船",
    "bodyPart": "臀部",
    "equipment": "bands",
    "equipmentCn": "阻力带",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3789?w=1024&h=576",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-4414",
    "name": "barbell-bench-press-with-band-suspended-kettlebell",
    "nameZh": "弹力带悬挂壶铃杠铃卧推",
    "bodyPart": "胸部",
    "equipment": "barbell",
    "equipmentCn": "杠铃",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4414?w=1024&h=576",
    "tip": "不要让杠铃在胸部反弹",
    "source": "fitwill"
  },
  {
    "id": "fw-2974",
    "name": "lever-one-arm-chest-press-plate-loaded",
    "nameZh": "杠杆单臂胸部推举（杠铃片加载）",
    "bodyPart": "胸部",
    "equipment": "machine",
    "equipmentCn": "杠杆器械",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/2974?w=1024&h=576",
    "tip": "有控制地回落把手，直到手肘回到负荷预备姿势，并保持胸部受控",
    "source": "fitwill"
  },
  {
    "id": "fw-5576",
    "name": "lever-one-arm-incline-chest-press-plate-loaded",
    "nameZh": "杠杆单臂上斜胸部推举（杠铃片加载）",
    "bodyPart": "胸部",
    "equipment": "machine",
    "equipmentCn": "杠杆器械",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/5576?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/5576.mp4",
    "tip": "保持手腕和小臂垂直对齐",
    "source": "fitwill"
  },
  {
    "id": "fw-4371",
    "name": "lever-incline-one-arm-chest-press-plate-loaded",
    "nameZh": "杠杆式上斜单臂胸部推举（杠铃片加载）",
    "bodyPart": "胸部",
    "equipment": "machine",
    "equipmentCn": "杠杆器械",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4371?w=1024&h=576",
    "tip": "推举时向心收缩时吐气，回到预备姿势时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-3101",
    "name": "lever-military-press-plate-loaded",
    "nameZh": "杠杆式器械推举（杠铃片配重）",
    "bodyPart": "肩部",
    "equipment": "machine",
    "equipmentCn": "杠杆器械",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3101?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3101.mp4",
    "tip": "保持器械轨迹受控，别让手柄上升时下背部拱起；推举时向心收缩时吐气，回位时回位时吸气，按计划次数重复",
    "source": "fitwill"
  },
  {
    "id": "fw-4174",
    "name": "lever-reverse-shoulder-press-plate-loaded",
    "nameZh": "杠杆式反向肩部推举（杠铃片加载）",
    "bodyPart": "肩部",
    "equipment": "machine",
    "equipmentCn": "杠杆器械",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4174?w=1024&h=576",
    "tip": "推举时向心收缩时吐气，保持肩膀下沉，肩膀下沉",
    "source": "fitwill"
  },
  {
    "id": "fw-10763",
    "name": "lever-seated-single-leg-curl-plate-loaded",
    "nameZh": "杠杆式坐姿单腿弯举（杠铃片负重）",
    "bodyPart": "腿部",
    "equipment": "machine",
    "equipmentCn": "杠杆器械",
    "primaryMuscles": [
      "hamstrings"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10763?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10763.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-8604",
    "name": "lever-seated-leg-curl-plate-loaded",
    "nameZh": "杠杆式坐姿腿弯举（杠铃片负重）",
    "bodyPart": "大腿",
    "equipment": "machine",
    "equipmentCn": "杠杆器械",
    "primaryMuscles": [
      "hamstrings"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8604?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8604.mp4",
    "tip": "大重量时别让在顶端把腿完全伸直",
    "source": "fitwill"
  },
  {
    "id": "fw-3609",
    "name": "lever-kneeling-leg-curl-plate-loaded",
    "nameZh": "杠杆跪姿腿弯举（杠铃片配重）",
    "bodyPart": "大腿",
    "equipment": "machine",
    "equipmentCn": "杠杆器械",
    "primaryMuscles": [
      "hamstrings"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3609?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3609.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-5883",
    "name": "barbell-curl-press-extension",
    "nameZh": "杠铃弯举推举臂屈伸",
    "bodyPart": "上臂",
    "equipment": "barbell",
    "equipmentCn": "杠铃",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/5883?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/5883.mp4",
    "tip": "不要将弯举变成髋部晃动",
    "source": "fitwill"
  },
  {
    "id": "fw-10080",
    "name": "weighted-plate-lying-side-oblique-crunch",
    "nameZh": "杠铃片侧卧侧腹卷腹",
    "bodyPart": "核心",
    "equipment": "other",
    "equipmentCn": "负重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10080?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10080.mp4",
    "tip": "保持杠铃片紧贴上胸部；两次重复之间别让完全放松",
    "source": "fitwill"
  },
  {
    "id": "fw-2481",
    "name": "barbell-standing-back-wrist-curl",
    "nameZh": "杠铃站姿背后腕弯举",
    "bodyPart": "前臂",
    "equipment": "barbell",
    "equipmentCn": "杠铃",
    "primaryMuscles": [
      "forearms"
    ],
    "secondaryMuscles": [],
    "category": "armwrest",
    "image": "https://fitwill.app/api/image/2481?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/2481.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-9776",
    "name": "standing-chest-push-hip-extension-kickback",
    "nameZh": "站姿胸前推髋伸展后踢腿",
    "bodyPart": "臀肌",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9776?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9776.mp4",
    "tip": "向后踢并前推时向心收缩时吐气，每次重复回到预备姿势时回位时吸气；整套动作里始终两侧髋部朝向正前方",
    "source": "fitwill"
  },
  {
    "id": "fw-11561",
    "name": "ez-barbell-standing-back-wrist-curl",
    "nameZh": "站姿EZ杠铃背后腕弯举",
    "bodyPart": "前臂",
    "equipment": "e-z curl bar",
    "equipmentCn": "EZ 杠铃",
    "primaryMuscles": [
      "forearms"
    ],
    "secondaryMuscles": [],
    "category": "armwrest",
    "image": "https://fitwill.app/api/image/11561?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11561.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-7979",
    "name": "cable-single-leg-tuck-reverse-crunch",
    "nameZh": "绳索单腿收膝反向卷腹",
    "bodyPart": "核心",
    "equipment": "cable",
    "equipmentCn": "拉力器",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7979?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7979.mp4",
    "tip": "收紧核心，下背部压向地面；整套动作里始终把手固定在头后",
    "source": "fitwill"
  },
  {
    "id": "fw-3987",
    "name": "barbell-incline-wrist-curl-with-chest-support",
    "nameZh": "胸部支撑杠铃斜板腕弯举",
    "bodyPart": "前臂",
    "equipment": "barbell",
    "equipmentCn": "杠铃",
    "primaryMuscles": [
      "forearms"
    ],
    "secondaryMuscles": [],
    "category": "armwrest",
    "image": "https://fitwill.app/api/image/3987?w=1024&h=576",
    "tip": "保持上臂垂直且静止",
    "source": "fitwill"
  },
  {
    "id": "fw-10416",
    "name": "cable-squat-side-leg-kick",
    "nameZh": "绳索深蹲侧踢腿",
    "bodyPart": "臀肌",
    "equipment": "cable",
    "equipmentCn": "拉力器",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10416?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10416.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-10844",
    "name": "weighted-plate-thoracic-opener-on-medicine-ball",
    "nameZh": "药球负重杠铃片胸椎打开",
    "bodyPart": "胸部",
    "equipment": "medicine ball",
    "equipmentCn": "药球",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10844?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10844.mp4",
    "tip": "整套动作里始终稳定的呼吸：杠铃片后放时回位时吸气，回拉时向心收缩时吐气，缓慢重复8到12次；保持骨盆水平，臀部轻微向心收缩",
    "source": "fitwill"
  },
  {
    "id": "fw-10710",
    "name": "weighted-plate-lying-crunch",
    "nameZh": "负重杠铃片仰卧卷腹",
    "bodyPart": "腰部",
    "equipment": "other",
    "equipmentCn": "负重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10710?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10710.mp4",
    "tip": "不要用力把头往前拽；过度固定会让髋屈肌接管向心收缩，减少腹肌的工作量",
    "source": "fitwill"
  },
  {
    "id": "fw-10431",
    "name": "weighted-plate-lying-bench-side-oblique-crunch",
    "nameZh": "负重杠铃片平凳侧卧腹斜肌卷腹",
    "bodyPart": "核心",
    "equipment": "other",
    "equipmentCn": "平凳",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10431?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10431.mp4",
    "tip": "在顶端用力收紧腹斜肌,停顿一拍再下放；不要让杠铃片离开胸口",
    "source": "fitwill"
  },
  {
    "id": "fw-7573",
    "name": "crossed-legs-hip-stretch",
    "nameZh": "交叉双腿髋部拉伸",
    "bodyPart": "臀部",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/7573?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7573.mp4",
    "tip": "前屈时保持脊柱拉长；不要用手把膝盖往下压",
    "source": "fitwill"
  },
  {
    "id": "fw-2099",
    "name": "recumbent-hip-external-rotator-and-hip-extensor-stretch-crossed-leg",
    "nameZh": "仰卧交叉腿髋外旋肌与伸肌拉伸",
    "bodyPart": "臀部",
    "equipment": "other",
    "equipmentCn": "其他",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/2099?w=1024&h=576",
    "tip": "保持终点位置，不要弹动；让交叉腿的膝盖自然打开",
    "source": "fitwill"
  },
  {
    "id": "fw-9657",
    "name": "lying-legs-extension-toes-flexion",
    "nameZh": "仰卧伸腿勾脚卷腹",
    "bodyPart": "核心",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9657?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9657.mp4",
    "tip": "整个过程保持动作流畅,别让骨盆出现任何摆动或弹跳；在顶端位置整套动作里始终脚尖主动勾起",
    "source": "fitwill"
  },
  {
    "id": "fw-10450",
    "name": "lying-side-straight-legs-reverse-crunch",
    "nameZh": "仰卧侧向直腿反向卷腹",
    "bodyPart": "核心",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10450?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10450.mp4",
    "tip": "回落时别让让下背部砸在垫上弹起；臀部抬起时用力向心收缩时吐气",
    "source": "fitwill"
  },
  {
    "id": "fw-8564",
    "name": "lying-leg-over-knee-hip-twist-stretch",
    "nameZh": "仰卧单腿搭膝髋部扭转拉伸",
    "bodyPart": "臀部",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/8564?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8564.mp4",
    "tip": "不要用手按压上方的膝盖",
    "source": "fitwill"
  },
  {
    "id": "fw-3478",
    "name": "lying-leg-tuck-hip-twist-to-left-stretch",
    "nameZh": "仰卧屈腿左侧髋部扭转拉伸",
    "bodyPart": "胸部",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/3478?w=1024&h=576",
    "tip": "让向心收缩时吐气加深扭转",
    "source": "fitwill"
  },
  {
    "id": "fw-3602",
    "name": "dumbbell-lying-supine-curl",
    "nameZh": "仰卧哑铃腕弯举",
    "bodyPart": "前臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "forearms"
    ],
    "secondaryMuscles": [],
    "category": "armwrest",
    "image": "https://fitwill.app/api/image/3602?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3602.mp4",
    "tip": "向上弯举时向心收缩时吐气，放下回到预备姿势时回位时吸气；保持上臂紧贴长凳",
    "source": "fitwill"
  },
  {
    "id": "fw-3280",
    "name": "floor-twisting-crunch-feet-on-bench",
    "nameZh": "仰卧搁腿转体卷腹",
    "bodyPart": "腰部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3280?w=1024&h=576",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-2201",
    "name": "roll-recumbent-hip-external-rotator-and-hip-extensor-stretch-crossed-leg",
    "nameZh": "仰卧泡沫轴髋外旋肌与伸肌拉伸（交叉腿）",
    "bodyPart": "臀部",
    "equipment": "foam roll",
    "equipmentCn": "泡沫轴",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/2201?w=1024&h=576",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-7737",
    "name": "lying-straight-leg-reverse-crunch",
    "nameZh": "仰卧直腿反向卷腹",
    "bodyPart": "核心",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7737?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7737.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-3474",
    "name": "lying-leg-tuck-hip-stretch-wth-overhead-hands",
    "nameZh": "仰卧腿部收缩髋部拉伸（双手过顶）",
    "bodyPart": "背部",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/3474?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3474.mp4",
    "tip": "后侧臀部应保持活跃",
    "source": "fitwill"
  },
  {
    "id": "fw-5032",
    "name": "leg-raise-oblique-crunch",
    "nameZh": "侧卧抬腿卷腹",
    "bodyPart": "腰部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/5032?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/5032.mp4",
    "tip": "保持骨盆垂直，别让向后翻转或让肩部塌陷；不要用上侧手拉扯头部",
    "source": "fitwill"
  },
  {
    "id": "fw-3331",
    "name": "oblique-crunches-with-straight-leg-lift",
    "nameZh": "侧卧直腿卷腹",
    "bodyPart": "腰部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3331?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3331.mp4",
    "tip": "让侧腰主动向心收缩抬起",
    "source": "fitwill"
  },
  {
    "id": "fw-9155",
    "name": "side-hands-standing-crunch",
    "nameZh": "侧手贴腿站姿卷腹",
    "bodyPart": "核心",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9155?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9155.mp4",
    "tip": "双手保持放松；向下卷腹的过程中用力向心收缩时吐气",
    "source": "fitwill"
  },
  {
    "id": "fw-4159",
    "name": "kick-through-push-up",
    "nameZh": "俯卧撑侧踢腿",
    "bodyPart": "爆发力训练",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "cardio"
    ],
    "secondaryMuscles": [],
    "category": "plyometrics",
    "image": "https://fitwill.app/api/image/4159?w=1024&h=576",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-2897",
    "name": "front-plank-with-arm-and-leg-lift-push-up-position",
    "nameZh": "俯卧撑姿势前平板支撑加手臂与腿部抬起",
    "bodyPart": "腰部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/2897?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/2897.mp4",
    "tip": "在每次重复前收紧核心；别让仓促完成离心阶段",
    "source": "fitwill"
  },
  {
    "id": "fw-3652",
    "name": "trap-bar-split-stance-rdl",
    "nameZh": "六角杠铃分腿罗马尼亚硬拉",
    "bodyPart": "臀部",
    "equipment": "barbell",
    "equipmentCn": "陷阱杠",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3652?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3652.mp4",
    "tip": "下放时回位时吸气，起身站立时向心收缩时吐气；将后腿仅视为平衡支撑",
    "source": "fitwill"
  },
  {
    "id": "fw-4842",
    "name": "trap-bar-banded-deadlift",
    "nameZh": "六角杠铃弹力带硬拉",
    "bodyPart": "臀部",
    "equipment": "barbell",
    "equipmentCn": "陷阱杠",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4842?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4842.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-10865",
    "name": "dumbbell-single-leg-romanian-deadlift-on-bench",
    "nameZh": "凳上单腿哑铃罗马尼亚硬拉",
    "bodyPart": "臀肌",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "hamstrings"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10865?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10865.mp4",
    "tip": "俯身下放时用口向心收缩时吐气，起身向心收缩时用鼻回位时吸气，整套动作里始终呼吸平稳；保持髋部朝向正前方",
    "source": "fitwill"
  },
  {
    "id": "fw-3583",
    "name": "single-leg-bridge-with-hip-flexion",
    "nameZh": "单腿屈髋臀桥",
    "bodyPart": "臀部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3583?w=1024&h=576",
    "tip": "保持肋骨与骨盆对齐",
    "source": "fitwill"
  },
  {
    "id": "fw-4331",
    "name": "crunch-single-leg-lift",
    "nameZh": "单腿抬起卷腹",
    "bodyPart": "腰部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4331?w=1024&h=576",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-3514",
    "name": "single-leg-sliding-floor-bridge-curl-on-towel",
    "nameZh": "单腿毛巾滑动臀桥弯举",
    "bodyPart": "臀部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3514?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3514.mp4",
    "tip": "在弯举的最高点收紧臀部，不要拱起下背部",
    "source": "fitwill"
  },
  {
    "id": "fw-4791",
    "name": "single-leg-glute-bridge-arms-on-chest",
    "nameZh": "单腿臀桥（双臂交叉胸前）",
    "bodyPart": "臀部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4791?w=1024&h=576",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-3475",
    "name": "lying-leg-tuck-hip-back-stretch",
    "nameZh": "卧姿屈腿髋部后伸拉伸",
    "bodyPart": "背部",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/3475?w=1024&h=576",
    "tip": "保持动作平稳，别让在末端位置弹动",
    "source": "fitwill"
  },
  {
    "id": "fw-9883",
    "name": "lying-bench-crunch-with-leg-adduction",
    "nameZh": "卧姿凳上卷腹配合腿部内收",
    "bodyPart": "核心",
    "equipment": "other",
    "equipmentCn": "平凳",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9883?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9883.mp4",
    "tip": "上升阶段用力向心收缩时吐气,帮助腹肌充分收缩,并别让在顶端停顿时憋气",
    "source": "fitwill"
  },
  {
    "id": "fw-3472",
    "name": "lying-leg-tuck-hip-stretch",
    "nameZh": "卧姿屈腿髋部拉伸",
    "bodyPart": "臀部",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/3472?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3472.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-0268",
    "name": "crunch-leg-raise",
    "nameZh": "卷腹抬腿",
    "bodyPart": "腰部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0268?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0268.mp4",
    "tip": "收紧腹部，保持颈部放松；在受控状态下有控制地回落，不要直接掉落",
    "source": "fitwill"
  },
  {
    "id": "fw-2344",
    "name": "crunch-back-wrong-right",
    "nameZh": "卷腹 - 背部（错误-正确）",
    "bodyPart": "腰部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/2344?w=1024&h=576",
    "tip": "在每次重复前收紧核心；别让仓促完成离心阶段",
    "source": "fitwill"
  },
  {
    "id": "fw-8910",
    "name": "alternate-leg-lift-double-hands-crunch",
    "nameZh": "双手上举交替抬腿卷腹",
    "bodyPart": "核心",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8910?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8910.mp4",
    "tip": "放腿复位时回位时吸气,每次提膝向上时向心收缩时吐气；不要急着放回",
    "source": "fitwill"
  },
  {
    "id": "fw-4787",
    "name": "side-crunch-with-hands-on-chest",
    "nameZh": "双手抱胸侧卷腹",
    "bodyPart": "腰部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4787?w=1024&h=576",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-10879",
    "name": "weighted-dumbbell-crunch-hands-overhead",
    "nameZh": "双手过头哑铃负重卷腹",
    "bodyPart": "核心",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10879?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10879.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-7980",
    "name": "hanging-oblique-knee-raise-on-parallel-bars",
    "nameZh": "双杠悬垂侧腹屈膝举腿",
    "bodyPart": "核心",
    "equipment": "machine",
    "equipmentCn": "辅助抬腿站",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7980?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7980.mp4",
    "tip": "让双腿并拢悬垂，膝盖略松；在顶端收紧腰侧一拍，然后再开始下放",
    "source": "fitwill"
  },
  {
    "id": "fw-8232",
    "name": "reverse-crunch-leg-drop",
    "nameZh": "反向卷腹落腿",
    "bodyPart": "核心",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8232?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8232.mp4",
    "tip": "收膝卷起时向心收缩时吐气；伸腿下放时缓慢回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-8462",
    "name": "backkick-triceps-extension",
    "nameZh": "后踢腿肱三头肌臂屈伸",
    "bodyPart": "上臂",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "triceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8462?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8462.mp4",
    "tip": "手臂伸直时别让耸肩；目视正前方,别仰脖子看手",
    "source": "fitwill"
  },
  {
    "id": "fw-10972",
    "name": "dumbbell-incline-stretch-curl",
    "nameZh": "哑铃上斜拉伸弯举",
    "bodyPart": "上臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/10972?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10972.mp4",
    "tip": "向上弯举时向心收缩时吐气，放下重量时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-8799",
    "name": "lever-single-leg-deadlift-on-hack-squat-machine",
    "nameZh": "哈克深蹲机杠杆式单腿硬拉",
    "bodyPart": "腿部",
    "equipment": "machine",
    "equipmentCn": "杠杆器械",
    "primaryMuscles": [
      "hamstrings"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8799?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8799.mp4",
    "tip": "俯身下放时有控制地向心收缩时吐气，回到站立时回位时吸气；站立腿保持膝盖略松，但不要把动作变成深蹲",
    "source": "fitwill"
  },
  {
    "id": "fw-11438",
    "name": "dumbbell-incline-shoulders-press",
    "nameZh": "哑铃上斜肩推举",
    "bodyPart": "肩部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/11438?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11438.mp4",
    "tip": "手腕位置应保持中立",
    "source": "fitwill"
  },
  {
    "id": "fw-4733",
    "name": "dumbbell-decline-lying-leg-curl",
    "nameZh": "哑铃下斜俯卧腿弯举",
    "bodyPart": "大腿",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4733?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4733.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-9693",
    "name": "dumbbell-alternating-arm-thruster",
    "nameZh": "哑铃交替单臂深蹲推举",
    "bodyPart": "全身",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9693?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9693.mp4",
    "tip": "向上蹬起并推举时向心收缩时吐气；下蹲和把哑铃收回时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-10186",
    "name": "dumbbell-pullover-to-press-bridge",
    "nameZh": "哑铃仰卧上拉接臀桥推举",
    "bodyPart": "胸部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10186?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10186.mp4",
    "tip": "向上推举哑铃至锁定时向心收缩时吐气，向头顶扫回时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-11070",
    "name": "dumbbell-lying-bench-pullover-leg-raise",
    "nameZh": "哑铃仰卧平凳上拉举腿",
    "bodyPart": "核心",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/11070?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11070.mp4",
    "tip": "抬腿时向心收缩时吐气，放腿时缓慢回位时吸气，整套动作里始终肋骨下压",
    "source": "fitwill"
  },
  {
    "id": "fw-7471",
    "name": "dumbbell-side-plank-row",
    "nameZh": "哑铃侧平板支撑划船",
    "bodyPart": "核心",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7471?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7471.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-1550",
    "name": "dumbbell-bench-one-leg-squat",
    "nameZh": "哑铃凳上单腿深蹲",
    "bodyPart": "大腿",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/1550?w=1024&h=576",
    "tip": "保持哑铃在身体两侧平稳",
    "source": "fitwill"
  },
  {
    "id": "fw-6136",
    "name": "dumbbell-bent-over-scapula-row",
    "nameZh": "哑铃俯身肩胛划船",
    "bodyPart": "背部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "traps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/6136?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/6136.mp4",
    "tip": "追求平滑的顶点收紧，而不是猛烈的抽动",
    "source": "fitwill"
  },
  {
    "id": "fw-1556",
    "name": "dumbbell-stiff-leg-deadlift-on-bench",
    "nameZh": "哑铃凳上直腿硬拉",
    "bodyPart": "臀部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/1556?w=1024&h=576",
    "tip": "膝盖只需微屈",
    "source": "fitwill"
  },
  {
    "id": "fw-7474",
    "name": "dumbbell-split-stance-bent-over-row",
    "nameZh": "哑铃分腿站姿俯身划船",
    "bodyPart": "背部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7474?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7474.mp4",
    "tip": "拉起时向心收缩时吐气，下放时回位时吸气，保持稳定的节奏，别全程憋气",
    "source": "fitwill"
  },
  {
    "id": "fw-7479",
    "name": "dumbbell-split-stance-sigle-arm-overhead-press",
    "nameZh": "哑铃分腿站姿单臂过头推举",
    "bodyPart": "肩部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7479?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7479.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-7478",
    "name": "dumbbell-split-stance-biceps-curl",
    "nameZh": "哑铃分腿站姿弯举",
    "bodyPart": "上臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7478?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7478.mp4",
    "tip": "上举哑铃时向心收缩时吐气,下放时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-11075",
    "name": "dumbbell-single-leg-calf-raise-off-step",
    "nameZh": "哑铃单腿台阶提踵",
    "bodyPart": "小腿",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "calves"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/11075?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11075.mp4",
    "tip": "疲劳时不要让膝盖弯曲",
    "source": "fitwill"
  },
  {
    "id": "fw-10647",
    "name": "dumbbell-front-raise-shoulders-press-combo",
    "nameZh": "哑铃前平举加肩上推举组合",
    "bodyPart": "肩部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10647?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10647.mp4",
    "tip": "抬起和推举时向心收缩时吐气，在两个下放阶段缓慢回位时吸气；不要让哑铃在头顶相碰",
    "source": "fitwill"
  },
  {
    "id": "fw-0409",
    "name": "dumbbell-single-leg-calf-raise-l",
    "nameZh": "哑铃单腿提踵（左）",
    "bodyPart": "小腿",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "calves"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0409?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0409.mp4",
    "tip": "在顶部稍作停留，收紧小腿肌肉，然后有控制地回位",
    "source": "fitwill"
  },
  {
    "id": "fw-7567",
    "name": "dumbbell-single-stiff-leg-deadlift",
    "nameZh": "哑铃单腿直腿硬拉",
    "bodyPart": "臀肌",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "hamstrings"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7567?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7567.mp4",
    "tip": "保持髋部朝正前方",
    "source": "fitwill"
  },
  {
    "id": "fw-1178",
    "name": "dumbbell-standing-single-leg-calf-raise",
    "nameZh": "哑铃单腿站姿提踵",
    "bodyPart": "小腿",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "calves"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/1178?w=1024&h=576",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-9754",
    "name": "dumbbell-single-leg-romanian-deadlift-leg-raise",
    "nameZh": "哑铃单腿罗马尼亚硬拉抬腿",
    "bodyPart": "腿部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "hamstrings"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9754?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9754.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-9752",
    "name": "dumbbell-single-leg-romanian-deadlift",
    "nameZh": "哑铃单腿罗马尼亚硬拉",
    "bodyPart": "腿部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "hamstrings"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9752?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9752.mp4",
    "tip": "下放铰链时在控制下向心收缩时吐气，在底部回位时吸气，向上站起时再次向心收缩时吐气；不要追求幅度",
    "source": "fitwill"
  },
  {
    "id": "fw-4291",
    "name": "dumbbell-single-leg-glute-bridge",
    "nameZh": "哑铃单腿臀桥",
    "bodyPart": "臀部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4291?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4291.mp4",
    "tip": "每次重复动作时，下降回位时吸气，向上桥接时向心收缩时吐气；悬空腿应保持伸直且静止",
    "source": "fitwill"
  },
  {
    "id": "fw-11029",
    "name": "dumbbell-single-leg-kas-glute-bridge",
    "nameZh": "哑铃单腿Kas臀桥",
    "bodyPart": "臀肌",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/11029?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11029.mp4",
    "tip": "下放臀部时回位时吸气，通过工作腿向上向心收缩时向心收缩时吐气",
    "source": "fitwill"
  },
  {
    "id": "fw-2686",
    "name": "dumbbell-one-arm-wrist-curl-forearm",
    "nameZh": "哑铃单臂腕弯举 _前臂",
    "bodyPart": "前臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "forearms"
    ],
    "secondaryMuscles": [],
    "category": "armwrest",
    "image": "https://fitwill.app/api/image/2686?w=1024&h=576",
    "tip": "向上弯举时向心收缩时吐气，下放时回位时吸气；保持前臂紧贴大腿",
    "source": "fitwill"
  },
  {
    "id": "fw-4624",
    "name": "dumbbell-crunch-up",
    "nameZh": "哑铃卷腹上举",
    "bodyPart": "腰部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4624?w=1024&h=576",
    "tip": "保持双腿垂直；不要追求肩膀的高度",
    "source": "fitwill"
  },
  {
    "id": "fw-4629",
    "name": "dumbbell-renegade-row-to-squat",
    "nameZh": "哑铃反向划船接深蹲",
    "bodyPart": "背部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4629?w=1024&h=576",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-7647",
    "name": "dumbbell-ipsilateral-single-leg-stiff-leg-deadlift",
    "nameZh": "哑铃同侧单腿直腿硬拉",
    "bodyPart": "腿部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "hamstrings"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7647?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7647.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-7653",
    "name": "dumbbell-ipsilateral-glute-bridge-single-arm-chest",
    "nameZh": "哑铃同侧臀桥单臂推胸",
    "bodyPart": "臀肌",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7653?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7653.mp4",
    "tip": "顶起臀桥并推起时向心收缩时吐气，下放重量和髋部时回位时吸气；不要让手肘外展到九十度",
    "source": "fitwill"
  },
  {
    "id": "fw-10096",
    "name": "dumbbell-rear-lunge-to-single-arm-shoulders-press",
    "nameZh": "哑铃后撤箭步蹲接单臂肩上推举",
    "bodyPart": "腿部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10096?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10096.mp4",
    "tip": "从蹲位向心收缩站起并向上推举哑铃时向心收缩时吐气",
    "source": "fitwill"
  },
  {
    "id": "fw-0397",
    "name": "dumbbell-seated-neutral-wrist-curl",
    "nameZh": "哑铃坐姿中立位腕弯举",
    "bodyPart": "前臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [],
    "category": "armwrest",
    "image": "https://fitwill.app/api/image/0397?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0397.mp4",
    "tip": "保持肩膀放松",
    "source": "fitwill"
  },
  {
    "id": "fw-6802",
    "name": "dumbbell-seated-military-hold-alternate-leg-raise-on-floor",
    "nameZh": "哑铃坐姿军事推举保持交替抬腿（地面）",
    "bodyPart": "腰部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/6802?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/6802.mp4",
    "tip": "保持较小的后倾角度；不要让脚摆动",
    "source": "fitwill"
  },
  {
    "id": "fw-0401",
    "name": "dumbbell-seated-palms-up-wrist-curl",
    "nameZh": "哑铃坐姿掌心向上腕弯举",
    "bodyPart": "前臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "forearms"
    ],
    "secondaryMuscles": [],
    "category": "armwrest",
    "image": "https://fitwill.app/api/image/0401?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0401.mp4",
    "tip": "有控制地回落哑铃，直到手腕再次伸展；将手腕置于膝盖外侧",
    "source": "fitwill"
  },
  {
    "id": "fw-6801",
    "name": "dumbbell-seated-military-press-in-out-leg-raise-on-floor",
    "nameZh": "哑铃坐姿推举配合地板收腿",
    "bodyPart": "腰部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/6801?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/6801.mp4",
    "tip": "推举和收腿时向心收缩时吐气，放下和伸展时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-4628",
    "name": "dumbbell-seated-tuck-twisting-crunch-on-floor",
    "nameZh": "哑铃坐姿收腹转体卷腹",
    "bodyPart": "腰部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4628?w=1024&h=576",
    "tip": "在扭转的顶点收紧腹肌，并保持收腹姿势紧凑；让肋骨带动扭转",
    "source": "fitwill"
  },
  {
    "id": "fw-4626",
    "name": "dumbbell-seated-tuck-crunch-on-floor",
    "nameZh": "哑铃坐姿收腹卷腹（地面）",
    "bodyPart": "腰部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4626?w=1024&h=576",
    "tip": "保持动作紧凑",
    "source": "fitwill"
  },
  {
    "id": "fw-4908",
    "name": "dumbbell-over-bench-reverse-wrist-curl-with-mat",
    "nameZh": "哑铃垫上俯卧腕弯举",
    "bodyPart": "前臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "forearms"
    ],
    "secondaryMuscles": [],
    "category": "armwrest",
    "image": "https://fitwill.app/api/image/4908?w=1024&h=576",
    "tip": "在动作顶点稍作收紧，同时保持前臂在垫上不动；重复预定的次数，抬起时向心收缩时吐气，回位时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-8329",
    "name": "dumbbell-overhead-crunch-on-stability-ball",
    "nameZh": "哑铃头顶卷腹（瑞士球上）",
    "bodyPart": "腰部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8329?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8329.mp4",
    "tip": "保持掌心相对；缓慢地把身体放到球上",
    "source": "fitwill"
  },
  {
    "id": "fw-7652",
    "name": "dumbbell-contralateral-glute-bridge-single-arm-che",
    "nameZh": "哑铃对侧臀桥单臂卧推",
    "bodyPart": "臀肌",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7652?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7652.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-2630",
    "name": "dumbbell-over-bench-reverse-wrist-curl",
    "nameZh": "哑铃平凳反向腕弯举",
    "bodyPart": "前臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "forearms"
    ],
    "secondaryMuscles": [],
    "category": "armwrest",
    "image": "https://fitwill.app/api/image/2630?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/2630.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-9341",
    "name": "dumbbell-plank-pass-through-push-up",
    "nameZh": "哑铃平板支撑传递俯卧撑",
    "bodyPart": "核心",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9341?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9341.mp4",
    "tip": "传递哑铃时向心收缩时吐气，下放俯卧撑时回位时吸气，推起时向心收缩时吐气",
    "source": "fitwill"
  },
  {
    "id": "fw-7476",
    "name": "dumbbell-plank-row",
    "nameZh": "哑铃平板支撑划船",
    "bodyPart": "背部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7476?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7476.mp4",
    "tip": "拉起哑铃时向心收缩时吐气，放下时回位时吸气，整组保持平稳呼吸，别全程憋气做完；不要急着做底部的动作",
    "source": "fitwill"
  },
  {
    "id": "fw-3347",
    "name": "dumbbell-curl-to-press",
    "nameZh": "哑铃弯举推举",
    "bodyPart": "肩部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3347?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3347.mp4",
    "tip": "弯举和推举时向心收缩时吐气，放下哑铃时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-10400",
    "name": "dumbbell-banded-single-leg-hip-thrust",
    "nameZh": "哑铃弹力带单腿臀推",
    "bodyPart": "臀肌",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10400?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10400.mp4",
    "tip": "保持全脚掌贴地，用脚跟向心收缩",
    "source": "fitwill"
  },
  {
    "id": "fw-11445",
    "name": "dumbbell-banded-goblet-squat",
    "nameZh": "哑铃弹力带高脚杯深蹲",
    "bodyPart": "腿部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/11445?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11445.mp4",
    "tip": "全程让哑铃贴住胸口",
    "source": "fitwill"
  },
  {
    "id": "fw-3707",
    "name": "dumbbell-press-squat",
    "nameZh": "哑铃推举深蹲",
    "bodyPart": "胸部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3707?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3707.mp4",
    "tip": "当手臂伸展时，意念集中在肋骨叠放在骨盆上方",
    "source": "fitwill"
  },
  {
    "id": "fw-6800",
    "name": "dumbbell-military-press-russian-twist-with-legs-floor-off",
    "nameZh": "哑铃推举俄罗斯转体（双腿离地）",
    "bodyPart": "腰部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/6800?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/6800.mp4",
    "tip": "确保动作整套动作里始终规范",
    "source": "fitwill"
  },
  {
    "id": "fw-0369",
    "name": "dumbbell-over-bench-wrist-curl",
    "nameZh": "哑铃搁凳腕弯举",
    "bodyPart": "前臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "forearms"
    ],
    "secondaryMuscles": [],
    "category": "armwrest",
    "image": "https://fitwill.app/api/image/0369?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0369.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-4563",
    "name": "dumbbell-squat-hold-calf-raise",
    "nameZh": "哑铃深蹲保持提踵",
    "bodyPart": "小腿",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "calves"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4563?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4563.mp4",
    "tip": "保持在较小的深蹲范围内；在最高点关节别完全锁死膝盖",
    "source": "fitwill"
  },
  {
    "id": "fw-7329",
    "name": "dumbbell-jefferson-curl",
    "nameZh": "哑铃杰斐逊卷腹",
    "bodyPart": "臀部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7329?w=1024&h=576",
    "tip": "回位时吸气并收紧躯干，然后收下颚，开始前屈；关节别完全锁死膝盖",
    "source": "fitwill"
  },
  {
    "id": "fw-4736",
    "name": "dumbbell-deep-push-up-and-renegade-row",
    "nameZh": "哑铃深层俯卧撑加反向划船",
    "bodyPart": "胸部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4736?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4736.mp4",
    "tip": "在开始第一次重复之前，夹紧臀肌，下压肋骨，保持颈部中立",
    "source": "fitwill"
  },
  {
    "id": "fw-11487",
    "name": "dumbbell-squat-to-overhead-press",
    "nameZh": "哑铃深蹲推举",
    "bodyPart": "肩部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/11487?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11487.mp4",
    "tip": "站起和推举时用力向心收缩时吐气，在顶端或下蹲时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-10185",
    "name": "dumbbell-bear-plank-alternating-row",
    "nameZh": "哑铃熊式平板支撑交替划船",
    "bodyPart": "背部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10185?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10185.mp4",
    "tip": "整套动作里始终平稳呼吸：拉起哑铃时向心收缩时吐气，放下时回位时吸气，别让连续几次动作都憋气；悬空才是迫使核心真正向心收缩的关键",
    "source": "fitwill"
  },
  {
    "id": "fw-4248",
    "name": "dumbbell-straight-arm-crunch",
    "nameZh": "哑铃直臂卷腹",
    "bodyPart": "腰部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4248?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4248.mp4",
    "tip": "不要将其向脸部摆动；髋部应保持在地面上不动",
    "source": "fitwill"
  },
  {
    "id": "fw-0435",
    "name": "dumbbell-sumo-squat-back-on-stability-ball-wall",
    "nameZh": "哑铃相扑深蹲（背靠墙面健身球）",
    "bodyPart": "大腿",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0435?w=1024&h=576",
    "tip": "通过脚后跟和脚掌中部向心收缩站起，回到顶部时夹紧臀肌",
    "source": "fitwill"
  },
  {
    "id": "fw-5232",
    "name": "dumbbell-deadlift-bent-over-row",
    "nameZh": "哑铃硬拉俯身划船",
    "bodyPart": "背部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/5232?w=1024&h=576",
    "tip": "在动作顶点收紧肩胛骨，肩膀下沉",
    "source": "fitwill"
  },
  {
    "id": "fw-11200",
    "name": "dumbbell-standing-side-leg-kick",
    "nameZh": "哑铃站姿侧踢腿",
    "bodyPart": "臀部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/11200?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11200.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-3713",
    "name": "dumbbell-standing-single-leg-calf-raise-right-side",
    "nameZh": "哑铃站姿单腿提踵（右侧）",
    "bodyPart": "小腿",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "calves"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3713?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3713.mp4",
    "tip": "保持右脚跟垂直上下移动；不要让哑铃晃动",
    "source": "fitwill"
  },
  {
    "id": "fw-6362",
    "name": "dumbbell-standing-wrist-reverse-curl",
    "nameZh": "哑铃站姿反向腕弯举",
    "bodyPart": "前臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "forearms"
    ],
    "secondaryMuscles": [],
    "category": "armwrest",
    "image": "https://fitwill.app/api/image/6362?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/6362.mp4",
    "tip": "保持肘部内收",
    "source": "fitwill"
  },
  {
    "id": "fw-8649",
    "name": "dumbbell-standing-shoulder-press-to-pec-dec",
    "nameZh": "哑铃站姿肩上推举至蝴蝶机轨迹",
    "bodyPart": "肩部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8649?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8649.mp4",
    "tip": "向上向外推起时向心收缩时吐气，沿弧线下放哑铃时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-11562",
    "name": "dumbbell-standing-wrist-curl",
    "nameZh": "哑铃站姿腕弯举",
    "bodyPart": "前臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "forearms"
    ],
    "secondaryMuscles": [],
    "category": "armwrest",
    "image": "https://fitwill.app/api/image/11562?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11562.mp4",
    "tip": "整组训练别全程憋气",
    "source": "fitwill"
  },
  {
    "id": "fw-10157",
    "name": "dumbbell-around-hip-hand-to-hand-single-leg-balan",
    "nameZh": "哑铃绕髋手递手单腿平衡",
    "bodyPart": "核心",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10157?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10157.mp4",
    "tip": "每次传递过程中平稳向心收缩时吐气；当哑铃经过身后时，别让憋气",
    "source": "fitwill"
  },
  {
    "id": "fw-7472",
    "name": "dumbbell-romanian-deadlift-to-bent-over-row",
    "nameZh": "哑铃罗马尼亚硬拉接俯身划船",
    "bodyPart": "背部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "hamstrings"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7472?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7472.mp4",
    "tip": "划船时和站起时向心收缩时吐气；在顶点回位时吸气，再开始下一次重复",
    "source": "fitwill"
  },
  {
    "id": "fw-4749",
    "name": "dumbbell-rdl-and-bent-over-row",
    "nameZh": "哑铃罗马尼亚硬拉加俯身划船",
    "bodyPart": "背部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4749?w=1024&h=576",
    "tip": "划船或站起时向心收缩时吐气，向下铰链时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-9484",
    "name": "dumbbell-romanian-deadlift-to-squat",
    "nameZh": "哑铃罗马尼亚硬拉接深蹲",
    "bodyPart": "腿部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "hamstrings"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9484?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9484.mp4",
    "tip": "不需要让哑铃碰到地面",
    "source": "fitwill"
  },
  {
    "id": "fw-4822",
    "name": "dumbbell-rdl-to-jump-shrug",
    "nameZh": "哑铃罗马尼亚硬拉接跳跃耸肩",
    "bodyPart": "背部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "hamstrings"
    ],
    "secondaryMuscles": [],
    "category": "plyometrics",
    "image": "https://fitwill.app/api/image/4822?w=1024&h=576",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-1445",
    "name": "dumbbell-rdl-stretch-isometric",
    "nameZh": "哑铃罗马尼亚硬拉等长拉伸",
    "bodyPart": "臀部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/1445?w=1024&h=576",
    "tip": "让哑铃垂直悬挂，别晃身子、扭转或远离你站立的腿；保持重量靠近小腿",
    "source": "fitwill"
  },
  {
    "id": "fw-1611",
    "name": "dumbbell-behind-back-finger-curl",
    "nameZh": "哑铃背后手指弯举",
    "bodyPart": "前臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "forearms"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/1611?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/1611.mp4",
    "tip": "在手指弯举的顶点收紧片刻，然后反向进行动作；重复计划的次数，弯举时向心收缩时吐气，下放时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-6161",
    "name": "dumbbell-hamstring-curl",
    "nameZh": "哑铃腿弯举",
    "bodyPart": "大腿",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "hamstrings"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/6161?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/6161.mp4",
    "tip": "保持髋部紧贴凳面；让膝盖活动，而不是脊柱",
    "source": "fitwill"
  },
  {
    "id": "fw-7470",
    "name": "dumbbell-glute-bridge-skull-crusher",
    "nameZh": "哑铃臀桥仰卧臂屈伸",
    "bodyPart": "上臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "triceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7470?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7470.mp4",
    "tip": "让颈部在垫子上保持放松",
    "source": "fitwill"
  },
  {
    "id": "fw-7994",
    "name": "dumbbell-glute-bridge-chest-press",
    "nameZh": "哑铃臀桥卧推",
    "bodyPart": "胸部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7994?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7994.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-7651",
    "name": "dumbbell-glute-bridge-single-arm-chest-press",
    "nameZh": "哑铃臀桥单臂胸推",
    "bodyPart": "臀肌",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7651?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7651.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-11017",
    "name": "dumbbell-kneeling-single-arm-shoulder-press",
    "nameZh": "哑铃跪姿单臂肩推举",
    "bodyPart": "肩部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/11017?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11017.mp4",
    "tip": "上推时向心收缩时吐气，下放时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-10081",
    "name": "dumbbell-twisting-crunch",
    "nameZh": "哑铃转体卷腹",
    "bodyPart": "核心",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10081?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10081.mp4",
    "tip": "起身时向心收缩时吐气，回落时回位时吸气，动作中途别全程憋气；意念集中在让肋笼朝膝盖方向转动",
    "source": "fitwill"
  },
  {
    "id": "fw-11058",
    "name": "dumbbell-hip-supported-romanian-deadlift",
    "nameZh": "哑铃髋部支撑罗马尼亚硬拉",
    "bodyPart": "腿部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "hamstrings"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/11058?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11058.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-4738",
    "name": "dumbbell-goblet-squat-and-biceps-curl",
    "nameZh": "哑铃高脚杯深蹲加二头肌弯举",
    "bodyPart": "大腿",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4738?w=1024&h=576",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-7469",
    "name": "dumbbell-goblet-squat-with-calf-raise",
    "nameZh": "哑铃高脚杯深蹲加提踵",
    "bodyPart": "腿部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7469?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7469.mp4",
    "tip": "整个训练过程中，下蹲时回位时吸气，站起并踮起脚尖时向心收缩时吐气",
    "source": "fitwill"
  },
  {
    "id": "fw-2276",
    "name": "lever-lying-crunch",
    "nameZh": "器械仰卧卷腹",
    "bodyPart": "腰部",
    "equipment": "other",
    "equipmentCn": "其他",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/2276?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/2276.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-10037",
    "name": "dumbbell-bosu-ball-single-leg-deadlift",
    "nameZh": "哑铃BOSU球单腿硬拉",
    "bodyPart": "臀肌",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "hamstrings"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10037?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10037.mp4",
    "tip": "下放时向心收缩时吐气，回到顶部时回位时吸气；别让在最低点弓起下背部",
    "source": "fitwill"
  },
  {
    "id": "fw-4427",
    "name": "lever-lying-single-leg-curl",
    "nameZh": "器械俯卧单腿弯举",
    "bodyPart": "大腿",
    "equipment": "other",
    "equipmentCn": "其他",
    "primaryMuscles": [
      "hamstrings"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4427?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4427.mp4",
    "tip": "保持非工作腿伸直且静止",
    "source": "fitwill"
  },
  {
    "id": "fw-2223",
    "name": "lever-lying-leg-curl",
    "nameZh": "器械俯卧腿弯举",
    "bodyPart": "大腿",
    "equipment": "other",
    "equipmentCn": "其他",
    "primaryMuscles": [
      "hamstrings"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/2223?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/2223.mp4",
    "tip": "保持骨盆紧贴长凳",
    "source": "fitwill"
  },
  {
    "id": "fw-1579",
    "name": "sled-one-leg-hack-squat",
    "nameZh": "器械单腿哈克深蹲",
    "bodyPart": "大腿",
    "equipment": "other",
    "equipmentCn": "雪橇机",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/1579?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/1579.mp4",
    "tip": "保持非工作腿静止；不要在底部利用惯性反弹",
    "source": "fitwill"
  },
  {
    "id": "fw-2345",
    "name": "sled-hack-squat-legs-wrong-right",
    "nameZh": "器械哈克深蹲腿部（错误-正确）",
    "bodyPart": "大腿",
    "equipment": "other",
    "equipmentCn": "雪橇机",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/2345?w=1024&h=576",
    "tip": "别让过快完成离心阶段；在用力阶段向心收缩时吐气",
    "source": "fitwill"
  },
  {
    "id": "fw-1586",
    "name": "lever-seated-one-leg-curl-right-side",
    "nameZh": "器械坐姿单腿弯举（右侧）",
    "bodyPart": "大腿",
    "equipment": "machine",
    "equipmentCn": "杠杆器械",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/1586?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/1586.mp4",
    "tip": "不要猛地完全伸展",
    "source": "fitwill"
  },
  {
    "id": "fw-10076",
    "name": "lever-standing-single-leg-calf-raise",
    "nameZh": "器械站姿单腿提踵",
    "bodyPart": "小腿",
    "equipment": "machine",
    "equipmentCn": "杠杆器械",
    "primaryMuscles": [
      "calves"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10076?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10076.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-10113",
    "name": "lever-isometric-squat-hip-abduction",
    "nameZh": "器械等长深蹲髋外展",
    "bodyPart": "臀部",
    "equipment": "machine",
    "equipmentCn": "杠杆器械",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10113?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10113.mp4",
    "tip": "起始重量比你意念集中在的要轻",
    "source": "fitwill"
  },
  {
    "id": "fw-11226",
    "name": "seated-single-leg-hugging-knee-flexion",
    "nameZh": "坐姿单腿抱膝屈髋拉伸",
    "bodyPart": "臀部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/11226?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11226.mp4",
    "tip": "别让屈膝侧的臀部从地面抬起",
    "source": "fitwill"
  },
  {
    "id": "fw-9338",
    "name": "sitting-floor-side-to-side-leg-raise-in-out-crunch",
    "nameZh": "坐姿地板左右摆腿内外卷腹",
    "bodyPart": "核心",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9338?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9338.mp4",
    "tip": "不要用手臂把膝盖拽进来",
    "source": "fitwill"
  },
  {
    "id": "fw-3978",
    "name": "seated-side-to-side-leg-raise-crunch-on-floor",
    "nameZh": "坐姿地面左右抬腿卷腹",
    "bodyPart": "腰部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3978?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3978.mp4",
    "tip": "在摆动最困难的部分向心收缩时吐气，并在经过中心位置时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-10463",
    "name": "seated-squeeze-shoulder-blades-chest-stretch-on-a",
    "nameZh": "坐姿夹肩胛骨胸部拉伸（椅子版）",
    "bodyPart": "胸部",
    "equipment": "other",
    "equipmentCn": "长凳或座位",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/10463?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10463.mp4",
    "tip": "不要靠塌腰来加深拉伸",
    "source": "fitwill"
  },
  {
    "id": "fw-9174",
    "name": "sitting-hands-behind-chest-stretch-on-a-chair",
    "nameZh": "坐姿椅上双手背后胸部拉伸",
    "bodyPart": "胸部",
    "equipment": "other",
    "equipmentCn": "长凳或座位",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/9174?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9174.mp4",
    "tip": "应收紧核心，从胸骨向上提；保持颈部延展、目光平视",
    "source": "fitwill"
  },
  {
    "id": "fw-5553",
    "name": "cable-seated-lats-focused-row",
    "nameZh": "坐姿绳索背阔肌划船",
    "bodyPart": "背部",
    "equipment": "cable",
    "equipmentCn": "拉力器",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/5553?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/5553.mp4",
    "tip": "在划船动作末端收紧背阔肌，肩膀下沉或让肘部向外张开；保持把手轨迹较低",
    "source": "fitwill"
  },
  {
    "id": "fw-1919",
    "name": "seated-hip-stretch-with-opposite-leg-from-behind",
    "nameZh": "坐姿髋部拉伸（后侧腿折叠）",
    "bodyPart": "臀部",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/1919?w=1024&h=576",
    "tip": "不要用力拉脚",
    "source": "fitwill"
  },
  {
    "id": "fw-11008",
    "name": "seated-back-hugs-chest-stretch-on-a-chair",
    "nameZh": "坐姿背后环抱胸部拉伸（椅上）",
    "bodyPart": "胸部",
    "equipment": "other",
    "equipmentCn": "长凳或座位",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/11008?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11008.mp4",
    "tip": "整套动作里始终躯干直立；别让肋骨向上外翻",
    "source": "fitwill"
  },
  {
    "id": "fw-4022",
    "name": "seated-8-leg-crunch",
    "nameZh": "坐姿“8”字腿卷腹",
    "bodyPart": "腰部",
    "equipment": "other",
    "equipmentCn": "其他",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4022?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4022.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-7467",
    "name": "kettlebell-leg-raise",
    "nameZh": "壶铃举腿",
    "bodyPart": "核心",
    "equipment": "kettlebells",
    "equipmentCn": "壶铃",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7467?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7467.mp4",
    "tip": "双腿上举时向心收缩时吐气，下放时回位时吸气；意念集中在用髋部向心收缩，而不是只用双脚",
    "source": "fitwill"
  },
  {
    "id": "fw-11076",
    "name": "kettlebell-single-leg-calf-raise-off-step",
    "nameZh": "壶铃单腿台阶提踵",
    "bodyPart": "小腿",
    "equipment": "kettlebells",
    "equipmentCn": "壶铃",
    "primaryMuscles": [
      "calves"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/11076?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11076.mp4",
    "tip": "不要把体重靠向墙壁；别让在拉伸最低点出现弹跳",
    "source": "fitwill"
  },
  {
    "id": "fw-10561",
    "name": "kettlebell-single-leg-deadlift-pass",
    "nameZh": "壶铃单腿硬拉换手",
    "bodyPart": "臀肌",
    "equipment": "kettlebells",
    "equipmentCn": "壶铃",
    "primaryMuscles": [
      "hamstrings"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10561?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10561.mp4",
    "tip": "屈髋向下和换手时向心收缩时吐气，在最低点回位时吸气，起身向心收缩时再次向心收缩时吐气",
    "source": "fitwill"
  },
  {
    "id": "fw-4518",
    "name": "kettlebell-single-arm-thruster",
    "nameZh": "壶铃单臂推举深蹲",
    "bodyPart": "举重",
    "equipment": "kettlebells",
    "equipmentCn": "壶铃",
    "primaryMuscles": [
      "traps"
    ],
    "secondaryMuscles": [],
    "category": "olympic weightlifting",
    "image": "https://fitwill.app/api/image/4518?w=1024&h=576",
    "tip": "在架位时，让壶铃紧贴前臂；不要通过过早的手臂向心收缩将动作变成借力推举",
    "source": "fitwill"
  },
  {
    "id": "fw-11688",
    "name": "kettlebell-seated-reverse-wrist-curl",
    "nameZh": "壶铃坐姿反向腕弯举",
    "bodyPart": "前臂",
    "equipment": "kettlebells",
    "equipmentCn": "壶铃",
    "primaryMuscles": [
      "forearms"
    ],
    "secondaryMuscles": [],
    "category": "armwrest",
    "image": "https://fitwill.app/api/image/11688?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11688.mp4",
    "tip": "手指握壶柄保持适度放松",
    "source": "fitwill"
  },
  {
    "id": "fw-3522",
    "name": "kettlebell-single-leg-glute-bridge-pullover",
    "nameZh": "壶铃单腿臀桥上拉",
    "bodyPart": "背部",
    "equipment": "kettlebells",
    "equipmentCn": "壶铃",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3522?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3522.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-9840",
    "name": "kettlebell-single-arm-squat-bilateral",
    "nameZh": "壶铃单臂深蹲（双腿）",
    "bodyPart": "腿部",
    "equipment": "kettlebells",
    "equipmentCn": "壶铃",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9840?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9840.mp4",
    "tip": "全脚掌向心收缩站直，躯干保持垂直，别让向远离壶铃的一侧倾斜",
    "source": "fitwill"
  },
  {
    "id": "fw-8328",
    "name": "kettlebell-overhead-crunch-on-stability-ball",
    "nameZh": "壶铃头上卷腹（瑞士球上）",
    "bodyPart": "腰部",
    "equipment": "kettlebells",
    "equipmentCn": "壶铃",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8328?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8328.mp4",
    "tip": "保持肘部微屈",
    "source": "fitwill"
  },
  {
    "id": "fw-3734",
    "name": "kettlebell-kickstand-one-leg-deadlift",
    "nameZh": "壶铃支撑单腿硬拉",
    "bodyPart": "臀部",
    "equipment": "kettlebells",
    "equipmentCn": "壶铃",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3734?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3734.mp4",
    "tip": "保持前脚平放，后腿放松；保持壶铃靠近大腿和胫骨",
    "source": "fitwill"
  },
  {
    "id": "fw-3580",
    "name": "kettlebell-deep-push-up",
    "nameZh": "壶铃深蹲俯卧撑",
    "bodyPart": "胸部",
    "equipment": "kettlebells",
    "equipmentCn": "壶铃",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3580?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3580.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-11598",
    "name": "kettlebell-squat-to-overhead-press",
    "nameZh": "壶铃深蹲推举",
    "bodyPart": "肩部",
    "equipment": "kettlebells",
    "equipmentCn": "壶铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/11598?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11598.mp4",
    "tip": "在每次重复的底部或顶部回位时吸气，然后在推举时用力向心收缩时吐气；每次重复前，意念集中在手臂稍稍向内夹紧肋骨",
    "source": "fitwill"
  },
  {
    "id": "fw-11693",
    "name": "kettlebell-stiff-leg-deadlift",
    "nameZh": "壶铃直腿硬拉",
    "bodyPart": "腿部",
    "equipment": "kettlebells",
    "equipmentCn": "壶铃",
    "primaryMuscles": [
      "hamstrings"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/11693?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11693.mp4",
    "tip": "保持膝盖角度不变",
    "source": "fitwill"
  },
  {
    "id": "fw-9485",
    "name": "kettlebell-romanian-deadlift-to-squat",
    "nameZh": "壶铃罗马尼亚硬拉接深蹲",
    "bodyPart": "臀肌",
    "equipment": "kettlebells",
    "equipmentCn": "壶铃",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9485?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9485.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-11240",
    "name": "kettlebell-shoulder-to-shoulder-press",
    "nameZh": "壶铃肩对肩推举",
    "bodyPart": "肩部",
    "equipment": "kettlebells",
    "equipmentCn": "壶铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/11240?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11240.mp4",
    "tip": "保持弧线紧凑；意念集中在壶铃刚好滚过你的锁骨线",
    "source": "fitwill"
  },
  {
    "id": "fw-5862",
    "name": "kettlebell-wrist-curl",
    "nameZh": "壶铃腕弯举",
    "bodyPart": "前臂",
    "equipment": "kettlebells",
    "equipmentCn": "壶铃",
    "primaryMuscles": [
      "forearms"
    ],
    "secondaryMuscles": [],
    "category": "armwrest",
    "image": "https://fitwill.app/api/image/5862?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/5862.mp4",
    "tip": "不要让肘部离开大腿",
    "source": "fitwill"
  },
  {
    "id": "fw-3330",
    "name": "oblique-crunches-with-bent-knee-leg-lift",
    "nameZh": "屈膝抬腿侧腹卷腹",
    "bodyPart": "腰部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3330?w=1024&h=576",
    "tip": "侧腰收缩时向心收缩时吐气，缓慢回到地面时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-8032",
    "name": "inner-thigh-tap-to-chest-open",
    "nameZh": "大腿内侧触碰接挺胸开肩",
    "bodyPart": "大腿",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8032?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8032.mp4",
    "tip": "别让在顶端锁死膝盖",
    "source": "fitwill"
  },
  {
    "id": "fw-0482",
    "name": "hip-crunch-with-knees-bent",
    "nameZh": "屈膝髋部卷腹",
    "bodyPart": "腰部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0482?w=1024&h=576",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-2961",
    "name": "plank-push-up-row",
    "nameZh": "平板支撑俯卧撑划船",
    "bodyPart": "爆发力训练",
    "equipment": "other",
    "equipmentCn": "其他",
    "primaryMuscles": [
      "cardio"
    ],
    "secondaryMuscles": [],
    "category": "plyometrics",
    "image": "https://fitwill.app/api/image/2961?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/2961.mp4",
    "tip": "保持肋骨叠放在骨盆上方",
    "source": "fitwill"
  },
  {
    "id": "fw-8138",
    "name": "plank-scapular-push-up",
    "nameZh": "平板支撑肩胛俯卧撑",
    "bodyPart": "肩部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8138?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8138.mp4",
    "tip": "不要追求大幅度",
    "source": "fitwill"
  },
  {
    "id": "fw-4083",
    "name": "band-upper-crunch",
    "nameZh": "弹力带上腹卷腹",
    "bodyPart": "腰部",
    "equipment": "bands",
    "equipmentCn": "阻力带",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4083?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4083.mp4",
    "tip": "不要用手臂拉扯弹力带",
    "source": "fitwill"
  },
  {
    "id": "fw-4076",
    "name": "band-cross-body-one-arm-chest-press",
    "nameZh": "弹力带交叉单臂胸部推举",
    "bodyPart": "胸部",
    "equipment": "bands",
    "equipmentCn": "弹力带",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4076?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4076.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-4088",
    "name": "band-cross-chest-biceps-curl",
    "nameZh": "弹力带交叉胸前二头肌弯举",
    "bodyPart": "上臂",
    "equipment": "bands",
    "equipmentCn": "阻力带",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4088?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4088.mp4",
    "tip": "在顶部短暂收紧二头肌，肩膀下沉，保持颈部伸展，肩部下沉；重复预定次数，弯举时向心收缩时吐气，手柄回程时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-3324",
    "name": "band-alternate-incline-chest-press-with-twist",
    "nameZh": "弹力带交替上斜胸部推举加转体",
    "bodyPart": "胸部",
    "equipment": "bands",
    "equipmentCn": "弹力带",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3324?w=1024&h=576",
    "tip": "不要让转体来自下背部",
    "source": "fitwill"
  },
  {
    "id": "fw-10184",
    "name": "resistance-band-alternating-split-stance-pallof-p",
    "nameZh": "弹力带交替分腿站姿帕洛夫推举",
    "bodyPart": "核心",
    "equipment": "bands",
    "equipmentCn": "阻力带",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10184?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10184.mp4",
    "tip": "双手整套动作里始终在胸骨高度；让胸腔叠在骨盆正上方",
    "source": "fitwill"
  },
  {
    "id": "fw-2166",
    "name": "resistance-band-supine-hip-bridge-march",
    "nameZh": "弹力带仰卧臀桥交替抬腿",
    "bodyPart": "臀部",
    "equipment": "bands",
    "equipmentCn": "阻力带",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/2166?w=1024&h=576",
    "tip": "保持骨盆与地面平行",
    "source": "fitwill"
  },
  {
    "id": "fw-4074",
    "name": "band-low-chest-press",
    "nameZh": "弹力带低位胸部推举",
    "bodyPart": "胸部",
    "equipment": "bands",
    "equipmentCn": "弹力带",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4074?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4074.mp4",
    "tip": "推举结束时收紧胸肌，肩膀下沉，也不要将肘部完全锁死",
    "source": "fitwill"
  },
  {
    "id": "fw-3793",
    "name": "resistance-band-split-jump-with-single-arm-row",
    "nameZh": "弹力带分腿跳加单臂划船",
    "bodyPart": "爆发力训练",
    "equipment": "bands",
    "equipmentCn": "阻力带",
    "primaryMuscles": [
      "cardio"
    ],
    "secondaryMuscles": [],
    "category": "plyometrics",
    "image": "https://fitwill.app/api/image/3793?w=1024&h=576",
    "tip": "轻柔落地，膝盖略松，重心位于双脚之间；将肩胛骨向后向下收紧，不要扭转躯干或耸肩",
    "source": "fitwill"
  },
  {
    "id": "fw-9306",
    "name": "resistance-band-lying-single-leg-curl",
    "nameZh": "弹力带俯卧单腿弯举",
    "bodyPart": "大腿",
    "equipment": "bands",
    "equipmentCn": "阻力带",
    "primaryMuscles": [
      "hamstrings"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9306?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9306.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-3781",
    "name": "band-split-jump-with-single-arm-row",
    "nameZh": "弹力带分腿跳单臂划船",
    "bodyPart": "背部",
    "equipment": "bands",
    "equipmentCn": "弹力带",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "plyometrics",
    "image": "https://fitwill.app/api/image/3781?w=1024&h=576",
    "tip": "划船时向心收缩时吐气，回位时回位时吸气，按计划次数重复",
    "source": "fitwill"
  },
  {
    "id": "fw-0919",
    "name": "band-single-stiff-leg-deadlift",
    "nameZh": "弹力带单腿直腿硬拉",
    "bodyPart": "臀部",
    "equipment": "bands",
    "equipmentCn": "弹力带",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0919?w=1024&h=576",
    "tip": "按计划次数重复，站起时向心收缩时吐气，下放时回位时吸气；支撑膝保持微屈",
    "source": "fitwill"
  },
  {
    "id": "fw-8107",
    "name": "band-single-arm-shoulder-press",
    "nameZh": "弹力带单臂肩上推举",
    "bodyPart": "肩部",
    "equipment": "bands",
    "equipmentCn": "阻力带",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8107?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8107.mp4",
    "tip": "向上推时向心收缩时吐气，下放把手时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-3974",
    "name": "band-two-legs-calf-raise-band-under-both-legs-version-2",
    "nameZh": "弹力带双腿提踵（双脚踩带版）版本 2",
    "bodyPart": "小腿",
    "equipment": "bands",
    "equipmentCn": "弹力带",
    "primaryMuscles": [
      "calves"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3974?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3974.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-6419",
    "name": "resistance-band-reverse-crunch-version-2",
    "nameZh": "弹力带反向卷腹（版本 2）",
    "bodyPart": "腰部",
    "equipment": "bands",
    "equipmentCn": "阻力带",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/6419?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/6419.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-4184",
    "name": "dumbbell-banded-bench-press",
    "nameZh": "弹力带哑铃卧推",
    "bodyPart": "胸部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4184?w=1024&h=576",
    "tip": "保持上背部紧贴长凳",
    "source": "fitwill"
  },
  {
    "id": "fw-3508",
    "name": "resistance-band-seated-single-leg-curl",
    "nameZh": "弹力带坐姿单腿弯举",
    "bodyPart": "大腿",
    "equipment": "bands",
    "equipmentCn": "阻力带",
    "primaryMuscles": [
      "hamstrings"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3508?w=1024&h=576",
    "tip": "脚后跟弯举时向心收缩时吐气，腿部伸展回位时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-10335",
    "name": "resistance-band-seated-calf-stretch",
    "nameZh": "弹力带坐姿小腿拉伸",
    "bodyPart": "小腿",
    "equipment": "bands",
    "equipmentCn": "阻力带",
    "primaryMuscles": [
      "calves"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/10335?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10335.mp4",
    "tip": "保持下背部延展",
    "source": "fitwill"
  },
  {
    "id": "fw-2162",
    "name": "resistance-band-plank-march",
    "nameZh": "弹力带平板支撑交替抬腿",
    "bodyPart": "大腿",
    "equipment": "bands",
    "equipmentCn": "阻力带",
    "primaryMuscles": [
      "hamstrings"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/2162?w=1024&h=576",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-10728",
    "name": "band-curl-to-press",
    "nameZh": "弹力带弯举接推举",
    "bodyPart": "手臂",
    "equipment": "bands",
    "equipmentCn": "阻力带",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10728?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10728.mp4",
    "tip": "弯举和推举时向心收缩时吐气，下放推举和弯举回到预备姿势时回位时吸气；弯举整套动作里始终手腕中立",
    "source": "fitwill"
  },
  {
    "id": "fw-3524",
    "name": "band-horizontal-pallof-press-with-resistance-band-squat",
    "nameZh": "弹力带水平帕洛夫推举加弹力带深蹲",
    "bodyPart": "臀部",
    "equipment": "bands",
    "equipmentCn": "阻力带",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3524?w=1024&h=576",
    "tip": "通过脚掌中部向心收缩站起，整套动作里始终推举动作稳定；保持弹力带线路水平",
    "source": "fitwill"
  },
  {
    "id": "fw-4683",
    "name": "bar-band-squat",
    "nameZh": "弹力带杠铃深蹲",
    "bodyPart": "大腿",
    "equipment": "bands",
    "equipmentCn": "弹力带",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4683?w=1024&h=576",
    "tip": "保持全脚掌着地；过早向心收缩时吐气可能会导致胸部塌陷",
    "source": "fitwill"
  },
  {
    "id": "fw-3786",
    "name": "resistance-band-squat-with-single-arm-row",
    "nameZh": "弹力带深蹲加单臂划船",
    "bodyPart": "大腿",
    "equipment": "bands",
    "equipmentCn": "阻力带",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3786?w=1024&h=576",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-3770",
    "name": "band-squat-with-single-arm-row",
    "nameZh": "弹力带深蹲单臂划船",
    "bodyPart": "背部",
    "equipment": "bands",
    "equipmentCn": "弹力带",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3770?w=1024&h=576",
    "tip": "不要让躯干向固定点扭转；胸廓应保持对齐，不要外翻",
    "source": "fitwill"
  },
  {
    "id": "fw-11727",
    "name": "band-squat-to-overhead-press",
    "nameZh": "弹力带深蹲接过头推举",
    "bodyPart": "大腿",
    "equipment": "bands",
    "equipmentCn": "阻力带",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/11727?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11727.mp4",
    "tip": "站起和推举时向心收缩时吐气，下蹲时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-1846",
    "name": "band-warm-up-shoulder-stretch",
    "nameZh": "弹力带热身肩部拉伸",
    "bodyPart": "胸部",
    "equipment": "bands",
    "equipmentCn": "弹力带",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/1846?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/1846.mp4",
    "tip": "向心收缩时吐气并受控地将双手放回预备姿势，然后重复所需的次数",
    "source": "fitwill"
  },
  {
    "id": "fw-3845",
    "name": "band-straight-back-seated-row",
    "nameZh": "弹力带直背坐姿划船",
    "bodyPart": "背部",
    "equipment": "bands",
    "equipmentCn": "弹力带",
    "primaryMuscles": [
      "traps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3845?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3845.mp4",
    "tip": "保持脚后跟抵住弹力带，别让躯干晃动以完成拉动",
    "source": "fitwill"
  },
  {
    "id": "fw-0930",
    "name": "band-straight-back-standing-row",
    "nameZh": "弹力带直背站姿划船",
    "bodyPart": "背部",
    "equipment": "bands",
    "equipmentCn": "弹力带",
    "primaryMuscles": [
      "traps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0930?w=1024&h=576",
    "tip": "顶部肩膀下沉",
    "source": "fitwill"
  },
  {
    "id": "fw-3771",
    "name": "band-deadlift-with-single-arm-row",
    "nameZh": "弹力带硬拉加单臂划船",
    "bodyPart": "背部",
    "equipment": "bands",
    "equipmentCn": "弹力带",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3771?w=1024&h=576",
    "tip": "让髋部启动动作；站立和划船时向心收缩时吐气，在受控铰链回位时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-4079",
    "name": "band-standing-alternate-chest-press",
    "nameZh": "弹力带站姿交替胸部推举",
    "bodyPart": "胸部",
    "equipment": "bands",
    "equipmentCn": "阻力带",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4079?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4079.mp4",
    "tip": "在伸展位置稍作停顿，肩膀下沉或身体前倾；保持肩胛骨稳定",
    "source": "fitwill"
  },
  {
    "id": "fw-10820",
    "name": "resistance-band-standing-balance-bent-leg-hip-abd",
    "nameZh": "弹力带站姿平衡屈腿髋外展",
    "bodyPart": "臀部",
    "equipment": "bands",
    "equipmentCn": "阻力带",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10820?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10820.mp4",
    "tip": "抬腿向外时向心收缩时吐气，收腿回位时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-5608",
    "name": "band-standing-chest-press-version-2",
    "nameZh": "弹力带站姿胸部推举（版本 2）",
    "bodyPart": "胸部",
    "equipment": "bands",
    "equipmentCn": "弹力带",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/5608?w=1024&h=576",
    "tip": "推举时向心收缩时吐气，控制回程时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-5203",
    "name": "resistance-band-standing-ab-crunch",
    "nameZh": "弹力带站姿腹部卷腹",
    "bodyPart": "腰部",
    "equipment": "bands",
    "equipmentCn": "阻力带",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/5203?w=1024&h=576",
    "tip": "将肋骨向下收向骨盆，膝盖略松，保持颈部伸展，收下颚；向下卷腹时向心收缩时吐气，回到站立姿势时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-11059",
    "name": "resistance-band-kneeling-leg-kickback-on-bench",
    "nameZh": "弹力带跪姿凳上后踢腿",
    "bodyPart": "臀肌",
    "equipment": "bands",
    "equipmentCn": "阻力带",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/11059?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11059.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-8472",
    "name": "resistance-band-kneeling-wrist-flexion-curl",
    "nameZh": "弹力带跪姿屈腕弯举",
    "bodyPart": "前臂",
    "equipment": "bands",
    "equipmentCn": "阻力带",
    "primaryMuscles": [
      "forearms"
    ],
    "secondaryMuscles": [],
    "category": "armwrest",
    "image": "https://fitwill.app/api/image/8472?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8472.mp4",
    "tip": "在顶点稍作停顿，收紧前臂掌侧的肌肉；保持双肩端正对准平凳",
    "source": "fitwill"
  },
  {
    "id": "fw-5206",
    "name": "resistance-band-kneeling-ab-crunch-version-2",
    "nameZh": "弹力带跪姿腹肌卷腹（版本 2）",
    "bodyPart": "腰部",
    "equipment": "bands",
    "equipmentCn": "阻力带",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/5206?w=1024&h=576",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-5202",
    "name": "resistance-band-kneeling-ab-crunch",
    "nameZh": "弹力带跪姿腹部卷腹",
    "bodyPart": "腰部",
    "equipment": "bands",
    "equipmentCn": "阻力带",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/5202?w=1024&h=576",
    "tip": "保持双手靠近头部，别让用手臂拉动弹力带；让弹力带缓慢地将你拉回",
    "source": "fitwill"
  },
  {
    "id": "fw-4985",
    "name": "band-assisted-floor-glute-ham-raise",
    "nameZh": "弹力带辅助地面臀腿弯举",
    "bodyPart": "大腿",
    "equipment": "bands",
    "equipmentCn": "弹力带",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4985?w=1024&h=576",
    "tip": "意念集中在保持从膝盖到头部的直线；仅在底部让双手触地",
    "source": "fitwill"
  },
  {
    "id": "fw-4204",
    "name": "resistance-band-assisted-nordic-hamstring-curl",
    "nameZh": "弹力带辅助北欧腿弯举",
    "bodyPart": "臀部",
    "equipment": "barbell",
    "equipmentCn": "杠铃",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4204?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4204.mp4",
    "tip": "保持髋部伸展",
    "source": "fitwill"
  },
  {
    "id": "fw-3772",
    "name": "band-high-knee-lunge-with-single-arm-row",
    "nameZh": "弹力带高抬腿弓步单臂划船",
    "bodyPart": "背部",
    "equipment": "bands",
    "equipmentCn": "弹力带",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3772?w=1024&h=576",
    "tip": "在划船和站起时向心收缩时吐气，在回到分腿姿势时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-10651",
    "name": "band-standing-on-bosu-ball-single-leg-abduction",
    "nameZh": "弹力带Bosu球单腿站姿髋外展",
    "bodyPart": "臀肌",
    "equipment": "bands",
    "equipmentCn": "阻力带",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10651?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10651.mp4",
    "tip": "让工作腿的脚尖保持朝前；跟随动作呼吸，别全程憋气",
    "source": "fitwill"
  },
  {
    "id": "fw-1506",
    "name": "band-ez-barbell-close-grip-curl",
    "nameZh": "弹力带EZ曲柄杠铃窄握弯举",
    "bodyPart": "上臂",
    "equipment": "bands",
    "equipmentCn": "弹力带",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/1506?w=1024&h=576",
    "tip": "肩膀应保持放松",
    "source": "fitwill"
  },
  {
    "id": "fw-8749",
    "name": "bodyweight-romanian-deadlift-biceps-curl-kickback",
    "nameZh": "徒手罗马尼亚硬拉弯举臂屈伸",
    "bodyPart": "上臂",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8749?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8749.mp4",
    "tip": "弯举和向后伸展时向心收缩时吐气，手臂回位到预备姿势时回位时吸气；一秒弯举加两秒回位，才能让徒手版本真正有效",
    "source": "fitwill"
  },
  {
    "id": "fw-3185",
    "name": "barbell-bench-press-with-hanging-band-technique",
    "nameZh": "悬挂弹力带杠铃卧推",
    "bodyPart": "胸部",
    "equipment": "barbell",
    "equipmentCn": "杠铃",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3185?w=1024&h=576",
    "tip": "保持手腕位于肘部上方",
    "source": "fitwill"
  },
  {
    "id": "fw-3186",
    "name": "barbell-military-press-with-hanging-band-technique",
    "nameZh": "悬挂弹力带杠铃推举",
    "bodyPart": "肩部",
    "equipment": "barbell",
    "equipmentCn": "杠铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3186?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3186.mp4",
    "tip": "在开始第一次重复前，夹紧臀肌，收紧核心，并保持肋骨下压；在前架位置保持前臂垂直",
    "source": "fitwill"
  },
  {
    "id": "fw-1126",
    "name": "suspension-one-leg-chest-press",
    "nameZh": "悬挂单腿胸部推举",
    "bodyPart": "胸部",
    "equipment": "other",
    "equipmentCn": "悬挂",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/1126?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/1126.mp4",
    "tip": "保持两个手柄水平对齐",
    "source": "fitwill"
  },
  {
    "id": "fw-4095",
    "name": "crunch-with-leg-lift",
    "nameZh": "抬腿卷腹",
    "bodyPart": "腰部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4095?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4095.mp4",
    "tip": "保持双腿静止；卷起时向心收缩时吐气，放下时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-1102",
    "name": "suspension-straight-hip-leg-curl",
    "nameZh": "悬挂直腿臀桥腿弯举",
    "bodyPart": "大腿",
    "equipment": "other",
    "equipmentCn": "悬挂",
    "primaryMuscles": [
      "hamstrings"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/1102?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/1102.mp4",
    "tip": "弯举时不要让肋骨外翻",
    "source": "fitwill"
  },
  {
    "id": "fw-5514",
    "name": "twist-crunch-legs-up",
    "nameZh": "抬腿扭转卷腹",
    "bodyPart": "腰部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/5514?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/5514.mp4",
    "tip": "在顶部保持短暂的收紧，肋骨旋转，腹肌完全收缩；保持动作小而干脆",
    "source": "fitwill"
  },
  {
    "id": "fw-0819",
    "name": "twist-crunch-leg-up",
    "nameZh": "抬腿转体卷腹",
    "bodyPart": "腰部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0819?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0819.mp4",
    "tip": "保持抬起幅度小且受控",
    "source": "fitwill"
  },
  {
    "id": "fw-1953",
    "name": "supported-one-leg-standing-hip-flexor-and-knee-extensor-stretch",
    "nameZh": "支撑单腿站立髋屈肌与膝伸肌拉伸",
    "bodyPart": "大腿",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/1953?w=1024&h=576",
    "tip": "支撑手保持轻扶",
    "source": "fitwill"
  },
  {
    "id": "fw-10786",
    "name": "lever-low-row-plate-loaded",
    "nameZh": "杠杆低位划船（杠铃片负重）",
    "bodyPart": "上背部",
    "equipment": "machine",
    "equipmentCn": "杠杆器械",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10786?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10786.mp4",
    "tip": "后拉时向心收缩时吐气，手臂向前伸展时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-3097",
    "name": "lever-bent-over-row-plate-loaded",
    "nameZh": "杠杆俯身划船（杠铃片负重）",
    "bodyPart": "背部",
    "equipment": "machine",
    "equipmentCn": "杠杆器械",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3097?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3097.mp4",
    "tip": "膝盖略松，让手臂自然下垂指向把手；在顶点稍作停顿并收紧肩胛骨，肩膀下沉或向后仰",
    "source": "fitwill"
  },
  {
    "id": "fw-4899",
    "name": "lever-bent-over-wide-row-plate-loaded",
    "nameZh": "杠杆俯身宽距划船（杠铃片负重）",
    "bodyPart": "背部",
    "equipment": "machine",
    "equipmentCn": "杠杆器械",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4899?w=1024&h=576",
    "tip": "保持躯干角度稳定",
    "source": "fitwill"
  },
  {
    "id": "fw-4215",
    "name": "lever-one-arm-low-row-plate-loaded",
    "nameZh": "杠杆单臂低位划船（杠铃片负重）",
    "bodyPart": "背部",
    "equipment": "machine",
    "equipmentCn": "杠杆器械",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4215?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4215.mp4",
    "tip": "划船时向心收缩时吐气，回到预备姿势时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-0589",
    "name": "lever-one-arm-bent-over-row-plate-loaded",
    "nameZh": "杠杆单臂俯身划船（杠铃片负重）",
    "bodyPart": "背部",
    "equipment": "barbell",
    "equipmentCn": "杠铃",
    "primaryMuscles": [
      "traps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0589?w=1024&h=576",
    "tip": "意念集中在将肘部拉向后口袋",
    "source": "fitwill"
  },
  {
    "id": "fw-9862",
    "name": "lever-single-arm-preacher-curl-plate-loaded",
    "nameZh": "杠杆单臂托臂弯举（杠铃片配重）",
    "bodyPart": "上臂",
    "equipment": "machine",
    "equipmentCn": "杠杆器械",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9862?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9862.mp4",
    "tip": "别让在拉长位置反弹借力",
    "source": "fitwill"
  },
  {
    "id": "fw-0590",
    "name": "lever-one-arm-shoulder-press-plate-loaded",
    "nameZh": "杠杆单臂肩推（杠铃片加载）",
    "bodyPart": "肩部",
    "equipment": "machine",
    "equipmentCn": "杠杆器械",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0590?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0590.mp4",
    "tip": "保持手腕叠放在肘部上方",
    "source": "fitwill"
  },
  {
    "id": "fw-1041",
    "name": "lever-lying-chest-press-plate-loaded",
    "nameZh": "杠杆卧式推胸（杠铃片负重）",
    "bodyPart": "胸部",
    "equipment": "machine",
    "equipmentCn": "杠杆器械",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/1041?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/1041.mp4",
    "tip": "保持肘部轨迹自然；在放下阶段回位时吸气，在向上推起手柄时向心收缩时吐气",
    "source": "fitwill"
  },
  {
    "id": "fw-8805",
    "name": "lever-single-arm-shoulder-press-plate-loaded-ve",
    "nameZh": "杠杆单臂肩推（杠铃片配重）(Ve)",
    "bodyPart": "肩部",
    "equipment": "machine",
    "equipmentCn": "杠杆器械",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8805?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8805.mp4",
    "tip": "由于杠杆臂会放大惯性，别让在底部反弹借力",
    "source": "fitwill"
  },
  {
    "id": "fw-11524",
    "name": "lever-seated-row-plate-loaded",
    "nameZh": "杠杆坐姿划船（杠铃片配重）",
    "bodyPart": "上背部",
    "equipment": "machine",
    "equipmentCn": "杠杆器械",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/11524?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11524.mp4",
    "tip": "拉回握把时向心收缩时吐气，回到拉伸位置时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-8846",
    "name": "lever-lying-decline-chest-press-plate-loaded",
    "nameZh": "杠杆式下斜卧推（杠铃片负载）",
    "bodyPart": "胸部",
    "equipment": "machine",
    "equipmentCn": "杠杆器械",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8846?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8846.mp4",
    "tip": "上推时向心收缩时吐气，下放重量时缓慢回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-10952",
    "name": "lever-lying-leg-curl-calf-raise",
    "nameZh": "杠杆式卧姿腿弯举提踵",
    "bodyPart": "小腿",
    "equipment": "machine",
    "equipmentCn": "杠杆器械",
    "primaryMuscles": [
      "calves"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10952?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10952.mp4",
    "tip": "向上蹬起时向心收缩时吐气,下放时回位时吸气；不要让脚跟在底部猛砸",
    "source": "fitwill"
  },
  {
    "id": "fw-11209",
    "name": "lever-seated-row-plate-loaded-version-3",
    "nameZh": "杠杆式坐姿划船（杠铃片配重）（版本 3）",
    "bodyPart": "上背部",
    "equipment": "machine",
    "equipmentCn": "杠杆器械",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/11209?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11209.mp4",
    "tip": "拉回把手时向心收缩时吐气，把手向前回位时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-4378",
    "name": "lever-reverse-grip-high-row-plate-loaded",
    "nameZh": "杠杆式反握高位划船（杠铃片负重）",
    "bodyPart": "背部",
    "equipment": "machine",
    "equipmentCn": "杠杆器械",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4378?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4378.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-11056",
    "name": "lever-seated-scapular-retraction-plate-loaded",
    "nameZh": "杠杆式坐姿肩胛后缩（杠铃片配重）",
    "bodyPart": "上背部",
    "equipment": "machine",
    "equipmentCn": "杠杆器械",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/11056?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11056.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-11028",
    "name": "lever-standing-calf-raise-plate-loaded",
    "nameZh": "杠杆式站立提踵（杠铃片负重）",
    "bodyPart": "小腿",
    "equipment": "machine",
    "equipmentCn": "杠杆器械",
    "primaryMuscles": [
      "calves"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/11028?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11028.mp4",
    "tip": "向上踮起时向心收缩时吐气，脚跟下降进入拉伸时回位时吸气；保持肋骨下沉、腰腹绷紧",
    "source": "fitwill"
  },
  {
    "id": "fw-8710",
    "name": "lever-leg-extension-plate-loaded",
    "nameZh": "杠杆式腿屈伸（杠铃片负重）",
    "bodyPart": "大腿",
    "equipment": "machine",
    "equipmentCn": "杠杆器械",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8710?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8710.mp4",
    "tip": "在顶点让脚尖略微上勾；别让在底部完全放松休息",
    "source": "fitwill"
  },
  {
    "id": "fw-0581",
    "name": "lever-high-row-plate-loaded",
    "nameZh": "杠杆式高位划船（杠铃片加载）",
    "bodyPart": "背部",
    "equipment": "machine",
    "equipmentCn": "杠杆器械",
    "primaryMuscles": [
      "traps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0581?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0581.mp4",
    "tip": "保持胸部紧贴垫子",
    "source": "fitwill"
  },
  {
    "id": "fw-0603",
    "name": "lever-shoulder-press-plate-loaded",
    "nameZh": "杠杆式肩推（杠铃片加载）",
    "bodyPart": "肩部",
    "equipment": "machine",
    "equipmentCn": "杠杆器械",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0603?w=1024&h=576",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-0606",
    "name": "lever-t-bar-row-plate-loaded",
    "nameZh": "杠杆式T杠划船（杠铃片负重）",
    "bodyPart": "背部",
    "equipment": "machine",
    "equipmentCn": "杠杆器械",
    "primaryMuscles": [
      "traps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0606?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0606.mp4",
    "tip": "在动作顶点收紧肩胛骨，不要向后过度倾斜；划船时向心收缩时吐气，重量回到预备姿势时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-3200",
    "name": "lever-bent-over-row-with-v-bar-plate-loaded",
    "nameZh": "杠杆式V型把手俯身划船（杠铃片负重）",
    "bodyPart": "背部",
    "equipment": "machine",
    "equipmentCn": "杠杆器械",
    "primaryMuscles": [
      "traps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3200?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3200.mp4",
    "tip": "下放时回位时吸气，划船时向心收缩时吐气；保持铰链姿势固定",
    "source": "fitwill"
  },
  {
    "id": "fw-8715",
    "name": "lever-squat-plate-loaded",
    "nameZh": "杠杆深蹲(杠铃片负重)",
    "bodyPart": "大腿",
    "equipment": "machine",
    "equipmentCn": "杠杆器械",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8715?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8715.mp4",
    "tip": "不要让膝盖内扣；别让在弧线底部猛撞止位",
    "source": "fitwill"
  },
  {
    "id": "fw-2660",
    "name": "lever-preacher-curl-plate-loaded",
    "nameZh": "杠杆牧师凳弯举（杠铃片负重）",
    "bodyPart": "上臂",
    "equipment": "machine",
    "equipmentCn": "杠杆器械",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/2660?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/2660.mp4",
    "tip": "不要用肩膀去追逐顶部",
    "source": "fitwill"
  },
  {
    "id": "fw-0604",
    "name": "lever-shrug-plate-loaded",
    "nameZh": "杠杆耸肩（杠铃片负重）",
    "bodyPart": "背部",
    "equipment": "machine",
    "equipmentCn": "杠杆器械",
    "primaryMuscles": [
      "traps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0604?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0604.mp4",
    "tip": "不要画圈滚动肩膀",
    "source": "fitwill"
  },
  {
    "id": "fw-3102",
    "name": "lever-narrow-grip-seated-row-plate-loaded",
    "nameZh": "杠杆窄握坐姿划船（杠铃片负重）",
    "bodyPart": "背部",
    "equipment": "machine",
    "equipmentCn": "杠杆器械",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3102?w=1024&h=576",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-8712",
    "name": "lever-romanian-deadlift-plate-loaded",
    "nameZh": "杠杆罗马尼亚硬拉（杠铃片配重）",
    "bodyPart": "臀肌",
    "equipment": "machine",
    "equipmentCn": "杠杆器械",
    "primaryMuscles": [
      "hamstrings"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8712?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8712.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-10067",
    "name": "lever-shoulder-press-plate-loaded-version-3",
    "nameZh": "杠杆肩推（杠铃片配重）（版本 3）",
    "bodyPart": "肩部",
    "equipment": "machine",
    "equipmentCn": "杠杆器械",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10067?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10067.mp4",
    "tip": "推起时向心收缩时吐气，放下握把时回位时吸气；保持头部中立、目视前方",
    "source": "fitwill"
  },
  {
    "id": "fw-10821",
    "name": "barbell-incline-shoulders-press-inside-squat-cag",
    "nameZh": "杠铃上斜肩推（深蹲架内）",
    "bodyPart": "肩部",
    "equipment": "barbell",
    "equipmentCn": "杠铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10821?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10821.mp4",
    "tip": "推过动作最难的那一段时向心收缩时吐气，杠铃回落时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-0097",
    "name": "barbell-side-split-squat-version-2",
    "nameZh": "杠铃侧向分腿深蹲 2版",
    "bodyPart": "臀肌",
    "equipment": "barbell",
    "equipmentCn": "杠铃",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0097?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0097.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-10371",
    "name": "barbell-side-hip-rollout",
    "nameZh": "杠铃侧髋健腹轮",
    "bodyPart": "核心",
    "equipment": "barbell",
    "equipmentCn": "杠铃",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10371?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10371.mp4",
    "tip": "别让杠铃左右漂移；让髋部跟手臂一起移动",
    "source": "fitwill"
  },
  {
    "id": "fw-9694",
    "name": "barbell-half-kneeling-shoulders-press",
    "nameZh": "杠铃半跪姿肩部推举",
    "bodyPart": "肩部",
    "equipment": "barbell",
    "equipmentCn": "杠铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9694?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9694.mp4",
    "tip": "推举时全身保持安静",
    "source": "fitwill"
  },
  {
    "id": "fw-10047",
    "name": "barbell-split-stance-rdl",
    "nameZh": "杠铃分腿站姿罗马尼亚硬拉",
    "bodyPart": "大腿",
    "equipment": "barbell",
    "equipmentCn": "杠铃",
    "primaryMuscles": [
      "hamstrings"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10047?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10047.mp4",
    "tip": "两侧髋部朝向正前方，别让后侧髋部朝后脚方向打开；不要一味追求深度",
    "source": "fitwill"
  },
  {
    "id": "fw-0068",
    "name": "barbell-one-leg-squat",
    "nameZh": "杠铃单腿深蹲",
    "bodyPart": "腿部",
    "equipment": "barbell",
    "equipmentCn": "杠铃",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0068?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0068.mp4",
    "tip": "别让过度依赖后腿向心收缩",
    "source": "fitwill"
  },
  {
    "id": "fw-10169",
    "name": "barbell-standing-single-leg-calf-raise",
    "nameZh": "杠铃单腿站姿提踵",
    "bodyPart": "小腿",
    "equipment": "barbell",
    "equipmentCn": "杠铃",
    "primaryMuscles": [
      "calves"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10169?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10169.mp4",
    "tip": "工作腿的膝盖要伸直但关节别完全锁死",
    "source": "fitwill"
  },
  {
    "id": "fw-1497",
    "name": "barbell-reverse-band-bench-press",
    "nameZh": "杠铃反向弹力带卧推",
    "bodyPart": "上臂",
    "equipment": "bands",
    "equipmentCn": "弹力带",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/1497?w=1024&h=576",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-2683",
    "name": "barbell-reverse-wrist-curl-version-2",
    "nameZh": "杠铃反向腕弯举版本 2",
    "bodyPart": "前臂",
    "equipment": "barbell",
    "equipmentCn": "杠铃",
    "primaryMuscles": [
      "forearms"
    ],
    "secondaryMuscles": [],
    "category": "armwrest",
    "image": "https://fitwill.app/api/image/2683?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/2683.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-3328",
    "name": "barbell-complex-stiff-leg-deadlift-clean-step",
    "nameZh": "杠铃复合动作：直腿硬拉接翻铃上台阶",
    "bodyPart": "臀部",
    "equipment": "barbell",
    "equipmentCn": "杠铃",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3328?w=1024&h=576",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-1544",
    "name": "barbell-wide-stance-stiff-leg-deadlift",
    "nameZh": "杠铃宽站距直腿硬拉",
    "bodyPart": "臀部",
    "equipment": "barbell",
    "equipmentCn": "杠铃",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/1544?w=1024&h=576",
    "tip": "让膝盖保持微屈",
    "source": "fitwill"
  },
  {
    "id": "fw-10603",
    "name": "barbell-bent-over-flexion-row",
    "nameZh": "杠铃屈髋俯身划船",
    "bodyPart": "背部",
    "equipment": "barbell",
    "equipmentCn": "杠铃",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10603?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10603.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-9932",
    "name": "barbell-banded-weighted-plate-bench-press",
    "nameZh": "杠铃弹力带杠片卧推",
    "bodyPart": "胸部",
    "equipment": "barbell",
    "equipmentCn": "杠铃",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9932?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9932.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-7620",
    "name": "barbell-banded-bench-press",
    "nameZh": "杠铃弹力带卧推",
    "bodyPart": "胸部",
    "equipment": "barbell",
    "equipmentCn": "杠铃",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7620?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7620.mp4",
    "tip": "随着疲劳出现,别让把肘部完全向两侧打开；向上向心收缩时不要让臀部离开卧推凳",
    "source": "fitwill"
  },
  {
    "id": "fw-4203",
    "name": "barbell-banded-sumo-deadlift",
    "nameZh": "杠铃弹力带相扑硬拉",
    "bodyPart": "肩部",
    "equipment": "barbell",
    "equipmentCn": "杠铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4203?w=1024&h=576",
    "tip": "膝盖应随脚尖方向打开",
    "source": "fitwill"
  },
  {
    "id": "fw-3530",
    "name": "barbell-banded-squat",
    "nameZh": "杠铃弹力带深蹲",
    "bodyPart": "臀部",
    "equipment": "barbell",
    "equipmentCn": "杠铃",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3530?w=1024&h=576",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-4061",
    "name": "barbell-banded-bench-squat",
    "nameZh": "杠铃弹力带箱式深蹲",
    "bodyPart": "大腿",
    "equipment": "barbell",
    "equipmentCn": "杠铃",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4061?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4061.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-4173",
    "name": "barbell-banded-romanian-deadlift",
    "nameZh": "杠铃弹力带罗马尼亚硬拉",
    "bodyPart": "臀部",
    "equipment": "barbell",
    "equipmentCn": "杠铃",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4173?w=1024&h=576",
    "tip": "在顶部夹紧臀肌站直，不要后仰或耸肩；保持杠铃贴近大腿和胫骨",
    "source": "fitwill"
  },
  {
    "id": "fw-4841",
    "name": "barbell-band-assisted-deadlift",
    "nameZh": "杠铃弹力带辅助硬拉",
    "bodyPart": "臀部",
    "equipment": "barbell",
    "equipmentCn": "杠铃",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4841?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4841.mp4",
    "tip": "保持杠铃擦着胫骨和大腿；不要过早猛地伸展髋部",
    "source": "fitwill"
  },
  {
    "id": "fw-4686",
    "name": "bar-band-standing-behind-head-military-press",
    "nameZh": "杠铃弹力带颈后推举",
    "bodyPart": "肩部",
    "equipment": "bands",
    "equipmentCn": "弹力带",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4686?w=1024&h=576",
    "tip": "重置肩部位置，回位时吸气，并重复计划的次数；不要将推举变成站姿后弯",
    "source": "fitwill"
  },
  {
    "id": "fw-4011",
    "name": "cable-bent-over-row-with-bar",
    "nameZh": "杠铃杆绳索俯身划船",
    "bodyPart": "背部",
    "equipment": "cable",
    "equipmentCn": "拉力器",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4011?w=1024&h=576",
    "tip": "在顶部短暂收紧肩胛骨，不要站起来或耸肩；保持躯干角度固定",
    "source": "fitwill"
  },
  {
    "id": "fw-1541",
    "name": "barbell-squat-to-upright-row",
    "nameZh": "杠铃深蹲接直立划船",
    "bodyPart": "大腿",
    "equipment": "barbell",
    "equipmentCn": "杠铃",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/1541?w=1024&h=576",
    "tip": "保持杠铃贴近大腿和胫骨",
    "source": "fitwill"
  },
  {
    "id": "fw-3860",
    "name": "weighted-plate-bent-over-row",
    "nameZh": "杠铃片俯身划船",
    "bodyPart": "背部",
    "equipment": "other",
    "equipmentCn": "负重",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3860?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3860.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-2361",
    "name": "barbell-squat-hips-wrong-right",
    "nameZh": "杠铃深蹲髋部错误与正确对比",
    "bodyPart": "臀部",
    "equipment": "barbell",
    "equipmentCn": "杠铃",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/2361?w=1024&h=576",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-9808",
    "name": "weighted-plate-bench-press",
    "nameZh": "杠铃片卧推",
    "bodyPart": "胸部",
    "equipment": "other",
    "equipmentCn": "负重",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9808?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9808.mp4",
    "tip": "上推时向心收缩时吐气，下放时回位时吸气；通过双脚向地面向心收缩有助于稳定胸廓，别让动作变成以肩部为主导",
    "source": "fitwill"
  },
  {
    "id": "fw-11243",
    "name": "lever-stack-seated-single-arm-shoulders-press",
    "nameZh": "杠铃片杠杆坐姿单臂推肩",
    "bodyPart": "肩部",
    "equipment": "machine",
    "equipmentCn": "杠杆器械",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/11243?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11243.mp4",
    "tip": "向上推时向心收缩时吐气，向下放回预备姿势时回位时吸气；整套动作里始终背部贴住靠垫",
    "source": "fitwill"
  },
  {
    "id": "fw-6698",
    "name": "weighted-plate-standing-biceps-curl",
    "nameZh": "杠铃片站姿二头肌弯举",
    "bodyPart": "前臂",
    "equipment": "other",
    "equipmentCn": "负重",
    "primaryMuscles": [
      "forearms"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/6698?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/6698.mp4",
    "tip": "保持肩膀稳定",
    "source": "fitwill"
  },
  {
    "id": "fw-10189",
    "name": "weighted-plate-deadlift-rear-lunge-with-overhead",
    "nameZh": "杠铃片过头负重硬拉后撤箭步蹲",
    "bodyPart": "肩部",
    "equipment": "other",
    "equipmentCn": "负重",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10189?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10189.mp4",
    "tip": "从箭步蹲向心收缩站起时向心收缩时吐气；拿片时膝盖保持微弯",
    "source": "fitwill"
  },
  {
    "id": "fw-0116",
    "name": "barbell-straight-leg-deadlift",
    "nameZh": "杠铃直腿硬拉",
    "bodyPart": "腿部",
    "equipment": "barbell",
    "equipmentCn": "杠铃",
    "primaryMuscles": [
      "hamstrings"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0116?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0116.mp4",
    "tip": "站直身体并夹紧臀肌，不要向后倾斜；不要在底部利用杠铃反弹",
    "source": "fitwill"
  },
  {
    "id": "fw-1542",
    "name": "barbell-stiff-leg-deadlift-on-bench",
    "nameZh": "杠铃站姿凳上直腿硬拉",
    "bodyPart": "臀部",
    "equipment": "barbell",
    "equipmentCn": "杠铃",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/1542?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/1542.mp4",
    "tip": "双脚完全踩在凳面上，别让向边缘偏移，以免平衡不稳",
    "source": "fitwill"
  },
  {
    "id": "fw-6263",
    "name": "barbell-standing-wrist-reverse-curl",
    "nameZh": "杠铃站姿反向腕弯举",
    "bodyPart": "前臂",
    "equipment": "barbell",
    "equipmentCn": "杠铃",
    "primaryMuscles": [
      "forearms"
    ],
    "secondaryMuscles": [],
    "category": "armwrest",
    "image": "https://fitwill.app/api/image/6263?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/6263.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-11555",
    "name": "barbell-standing-wrist-curl",
    "nameZh": "杠铃站姿腕弯举",
    "bodyPart": "前臂",
    "equipment": "barbell",
    "equipmentCn": "杠铃",
    "primaryMuscles": [
      "forearms"
    ],
    "secondaryMuscles": [],
    "category": "armwrest",
    "image": "https://fitwill.app/api/image/11555?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11555.mp4",
    "tip": "保持动作只发生在手腕",
    "source": "fitwill"
  },
  {
    "id": "fw-7482",
    "name": "barbell-romanian-deadlift-to-row",
    "nameZh": "杠铃罗马尼亚硬拉接划船",
    "bodyPart": "背部",
    "equipment": "barbell",
    "equipmentCn": "杠铃",
    "primaryMuscles": [
      "hamstrings"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7482?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7482.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-5632",
    "name": "barbell-shoulder-grip-upright-row",
    "nameZh": "杠铃肩宽握距直立划船",
    "bodyPart": "肩部",
    "equipment": "barbell",
    "equipmentCn": "杠铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/5632?w=1024&h=576",
    "tip": "保持握距在肩宽左右；在肩部感到收紧前停止拉举",
    "source": "fitwill"
  },
  {
    "id": "fw-1610",
    "name": "barbell-behind-back-finger-curl",
    "nameZh": "杠铃背后手指弯举",
    "bodyPart": "前臂",
    "equipment": "barbell",
    "equipmentCn": "杠铃",
    "primaryMuscles": [
      "forearms"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/1610?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/1610.mp4",
    "tip": "在动作顶点收紧肌肉，不要弯曲肘部或耸肩；保持呼吸平稳，向上弯举时向心收缩时吐气，向下回位时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-11341",
    "name": "barbell-back-wide-shrug",
    "nameZh": "杠铃背后宽握耸肩",
    "bodyPart": "上背部",
    "equipment": "barbell",
    "equipmentCn": "杠铃",
    "primaryMuscles": [
      "traps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/11341?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11341.mp4",
    "tip": "轻微收紧核心,别让重量把躯干向后拉；减轻重量,更用力收紧腹肌",
    "source": "fitwill"
  },
  {
    "id": "fw-5663",
    "name": "barbell-behind-the-back-deadlift",
    "nameZh": "杠铃背后硬拉",
    "bodyPart": "臀部",
    "equipment": "barbell",
    "equipmentCn": "杠铃",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/5663?w=1024&h=576",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-3730",
    "name": "barbell-behind-the-back-shrug",
    "nameZh": "杠铃背后耸肩",
    "bodyPart": "背部",
    "equipment": "barbell",
    "equipmentCn": "杠铃",
    "primaryMuscles": [
      "traps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3730?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3730.mp4",
    "tip": "保持杠铃靠近腿部后侧；不要弯曲肘部来完成动作",
    "source": "fitwill"
  },
  {
    "id": "fw-0125",
    "name": "barbell-wrist-curl-version-2",
    "nameZh": "杠铃腕弯举版本 2",
    "bodyPart": "前臂",
    "equipment": "barbell",
    "equipmentCn": "杠铃",
    "primaryMuscles": [
      "forearms"
    ],
    "secondaryMuscles": [],
    "category": "armwrest",
    "image": "https://fitwill.app/api/image/0125?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0125.mp4",
    "tip": "让手腕轻微伸展，使杠铃回落至舒适的拉伸位置；在顶部稍作停顿，收紧前臂内侧肌肉",
    "source": "fitwill"
  },
  {
    "id": "fw-10492",
    "name": "seated-straight-leg-crunch-on-chair",
    "nameZh": "椅上坐姿直腿卷腹",
    "bodyPart": "核心",
    "equipment": "other",
    "equipmentCn": "长凳或座位",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10492?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10492.mp4",
    "tip": "不要用手指拉扯后脑；保持手肘打开、胸腔展开",
    "source": "fitwill"
  },
  {
    "id": "fw-2811",
    "name": "barbell-leg-twist-press",
    "nameZh": "杠铃腿部扭转推举",
    "bodyPart": "其他",
    "equipment": "barbell",
    "equipmentCn": "杠铃",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/2811?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/2811.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-10480",
    "name": "seated-curl-to-shoulders-press-on-chair",
    "nameZh": "椅子坐姿弯举接肩上推举",
    "bodyPart": "肩部",
    "equipment": "other",
    "equipmentCn": "长凳或座位",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10480?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10480.mp4",
    "tip": "保持手腕中立、拳头放松",
    "source": "fitwill"
  },
  {
    "id": "fw-1980",
    "name": "across-chest-shoulder-stretch",
    "nameZh": "横向胸前肩部拉伸",
    "bodyPart": "肩部",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/1980?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/1980.mp4",
    "tip": "保持拉伸侧的肩膀下沉，肩膀下沉向耳朵靠拢；保持该姿势并缓慢向心收缩时吐气，让肩部在拉伸中放松",
    "source": "fitwill"
  },
  {
    "id": "fw-9150",
    "name": "sitting-dip-and-leg-raise-on-a-chair",
    "nameZh": "椅子坐姿臂屈伸加举腿",
    "bodyPart": "手臂",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "triceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9150?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9150.mp4",
    "tip": "不要在底部弹起",
    "source": "fitwill"
  },
  {
    "id": "fw-10932",
    "name": "shoulder-stretch-behind-the-back-with-towel",
    "nameZh": "毛巾背后肩部拉伸",
    "bodyPart": "肩部",
    "equipment": "other",
    "equipmentCn": "毛巾",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/10932?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10932.mp4",
    "tip": "下方手的手腕保持放松",
    "source": "fitwill"
  },
  {
    "id": "fw-3567",
    "name": "roll-recumbent-hip-external-rotator-and-hip-extensor-stretch-crossedleg",
    "nameZh": "泡沫轴仰卧髋外旋及髋伸肌拉伸（交叉腿）",
    "bodyPart": "臀部",
    "equipment": "foam roll",
    "equipmentCn": "泡沫轴",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/3567?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3567.mp4",
    "tip": "保持交叉的脚放松；在沉入更深位置时缓慢向心收缩时吐气",
    "source": "fitwill"
  },
  {
    "id": "fw-8344",
    "name": "weighted-plate-side-twist-from-squat",
    "nameZh": "深蹲位负重杠铃片转体",
    "bodyPart": "核心",
    "equipment": "other",
    "equipmentCn": "负重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8344?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8344.mp4",
    "tip": "杠铃片扫过身体中线时向心收缩时吐气，向弧线外侧移动时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-10545",
    "name": "squat-to-kickback",
    "nameZh": "深蹲后踢腿",
    "bodyPart": "臀肌",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10545?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10545.mp4",
    "tip": "不要靠摆动腿部借力",
    "source": "fitwill"
  },
  {
    "id": "fw-1045",
    "name": "barbell-seated-military-press-inside-squat-cage",
    "nameZh": "深蹲架内杠铃坐姿推举",
    "bodyPart": "肩部",
    "equipment": "barbell",
    "equipmentCn": "杠铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/1045?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/1045.mp4",
    "tip": "推举时保持肋骨下压",
    "source": "fitwill"
  },
  {
    "id": "fw-3606",
    "name": "leg-extension-crunch-with-stability-ball",
    "nameZh": "瑞士球腿部伸展卷腹",
    "bodyPart": "大腿",
    "equipment": "exercise ball",
    "equipmentCn": "健身球",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3606?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3606.mp4",
    "tip": "在动作最困难的部分向心收缩时吐气，以帮助躯干保持支撑",
    "source": "fitwill"
  },
  {
    "id": "fw-9047",
    "name": "straight-hip-single-leg-curl-on-stability-ball",
    "nameZh": "瑞士球直髋单腿弯举",
    "bodyPart": "腿部",
    "equipment": "exercise ball",
    "equipmentCn": "健身球",
    "primaryMuscles": [
      "hamstrings"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9047?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9047.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-0269",
    "name": "crunch-legs-on-stability-ball",
    "nameZh": "瑞士球腿部卷腹",
    "bodyPart": "腰部",
    "equipment": "exercise ball",
    "equipmentCn": "健身球",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0269?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0269.mp4",
    "tip": "收紧腹部，保持颈部放松；整套动作里始终下背部舒适",
    "source": "fitwill"
  },
  {
    "id": "fw-9010",
    "name": "medicine-ball-crunch-on-stability-ball",
    "nameZh": "瑞士球药球卷腹",
    "bodyPart": "核心",
    "equipment": "medicine ball",
    "equipmentCn": "药球",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9010?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9010.mp4",
    "tip": "整套动作里始终臀肌收紧",
    "source": "fitwill"
  },
  {
    "id": "fw-9199",
    "name": "dumbbell-triceps-extension-in-cross-legged-positio",
    "nameZh": "盘腿坐姿哑铃颈后臂屈伸",
    "bodyPart": "上臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "triceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9199?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9199.mp4",
    "tip": "轻微夹紧臀肌，绷紧腹壁，让躯干保持直立，别让下背弓起；向上推起时向心收缩时吐气，向头后下放重量时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-0273",
    "name": "crunch-straight-leg-up",
    "nameZh": "直腿卷腹",
    "bodyPart": "腰部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0273?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0273.mp4",
    "tip": "收紧腹部并保持颈部放松；有控制地回位，不要直接回落",
    "source": "fitwill"
  },
  {
    "id": "fw-8520",
    "name": "standing-side-leg-raise-crunch",
    "nameZh": "站姿侧抬腿卷腹",
    "bodyPart": "核心",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8520?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8520.mp4",
    "tip": "不要拉扯颈部；支撑腿的膝盖保持微屈",
    "source": "fitwill"
  },
  {
    "id": "fw-4574",
    "name": "dumbbell-standing-biceps-curl-to-shoulder-press",
    "nameZh": "站姿哑铃二头肌弯举接推举",
    "bodyPart": "肩部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4574?w=1024&h=576",
    "tip": "不要利用髋部向心收缩来向上甩动重量",
    "source": "fitwill"
  },
  {
    "id": "fw-9682",
    "name": "standing-hands-behind-chest-stretch",
    "nameZh": "站姿双手背后胸部拉伸",
    "bodyPart": "胸部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/9682?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9682.mp4",
    "tip": "别让膝盖锁死",
    "source": "fitwill"
  },
  {
    "id": "fw-6964",
    "name": "dumbbell-standing-t-spine-press",
    "nameZh": "站姿哑铃胸椎推举",
    "bodyPart": "背部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/6964?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/6964.mp4",
    "tip": "推举时向心收缩时吐气，别让下背部拱起或肋骨上顶；有控制地回落哑铃，耗时两到三秒",
    "source": "fitwill"
  },
  {
    "id": "fw-0920",
    "name": "band-standing-chest-press",
    "nameZh": "站姿弹力带胸部推举",
    "bodyPart": "胸部",
    "equipment": "bands",
    "equipmentCn": "弹力带",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0920?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0920.mp4",
    "tip": "向前推时向心收缩时吐气，把手收回胸前时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-1946",
    "name": "standing-leg-tuck-hip-stretch",
    "nameZh": "站姿屈腿髋部拉伸",
    "bodyPart": "臀部",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/1946?w=1024&h=576",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-4317",
    "name": "standing-hamstring-and-calf-stretch-with-starp",
    "nameZh": "站姿弹力带腘绳肌与小腿拉伸",
    "bodyPart": "大腿",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/4317?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4317.mp4",
    "tip": "在末端位置缓慢向心收缩时吐气，并保持规定的时间；保持髋部朝前",
    "source": "fitwill"
  },
  {
    "id": "fw-1896",
    "name": "standing-raised-leg-hip-adductor-stretch",
    "nameZh": "站姿抬腿髋内收肌拉伸",
    "bodyPart": "臀部",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/1896?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/1896.mp4",
    "tip": "让向心收缩时吐气缓慢而长；这通常会将拉伸变成扭转",
    "source": "fitwill"
  },
  {
    "id": "fw-1225",
    "name": "standing-plate-presses",
    "nameZh": "站姿杠铃片推举",
    "bodyPart": "肩部",
    "equipment": "other",
    "equipmentCn": "负重",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/1225?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/1225.mp4",
    "tip": "躯干应保持堆叠且静止；当杠铃片远离胸部时向心收缩时吐气，在受控回程时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-6360",
    "name": "cable-standing-wrist-curl",
    "nameZh": "站姿绳索腕弯举",
    "bodyPart": "前臂",
    "equipment": "cable",
    "equipmentCn": "拉力器",
    "primaryMuscles": [
      "forearms"
    ],
    "secondaryMuscles": [],
    "category": "armwrest",
    "image": "https://fitwill.app/api/image/6360?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/6360.mp4",
    "tip": "在顶点保持一秒的收紧感，有助于感受前臂屈肌的向心收缩；有控制地回落横杆",
    "source": "fitwill"
  },
  {
    "id": "fw-1879",
    "name": "standing-leg-resting-hip-stretch",
    "nameZh": "站姿腿部支撑髋部拉伸",
    "bodyPart": "臀部",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/1879?w=1024&h=576",
    "tip": "仅将椅子用于平衡；在进入姿势时向心收缩时吐气，底部不要弹动",
    "source": "fitwill"
  },
  {
    "id": "fw-6363",
    "name": "cable-standing-wrist-reverse-curl",
    "nameZh": "站姿绳索腕部反向弯举",
    "bodyPart": "前臂",
    "equipment": "cable",
    "equipmentCn": "拉力器",
    "primaryMuscles": [
      "forearms"
    ],
    "secondaryMuscles": [],
    "category": "armwrest",
    "image": "https://fitwill.app/api/image/6363?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/6363.mp4",
    "tip": "在顶部稍作停顿，肩膀下沉或摆动；保持肘部固定在躯干旁",
    "source": "fitwill"
  },
  {
    "id": "fw-9073",
    "name": "standing-hip-extension-to-leg-lift",
    "nameZh": "站姿髋部伸展接举腿",
    "bodyPart": "臀肌",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9073?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9073.mp4",
    "tip": "腿在每次摆动和抬起时向心收缩时吐气，在受控制的下放阶段回位时吸气；别让用快速甩动的惯性",
    "source": "fitwill"
  },
  {
    "id": "fw-0148",
    "name": "cable-alternate-shoulder-press",
    "nameZh": "绳索交替肩部推举",
    "bodyPart": "肩部",
    "equipment": "cable",
    "equipmentCn": "拉力器",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0148?w=1024&h=576",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-9804",
    "name": "cable-lying-single-leg-curl",
    "nameZh": "绳索仰卧单腿弯举",
    "bodyPart": "大腿",
    "equipment": "cable",
    "equipmentCn": "拉力器",
    "primaryMuscles": [
      "hamstrings"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9804?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9804.mp4",
    "tip": "保持大腿本身稳定且垂直；脚跟下弯时向心收缩时吐气，向上伸直时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-8875",
    "name": "cable-lying-single-leg-hip-flexion",
    "nameZh": "绳索仰卧单腿屈髋",
    "bodyPart": "臀部",
    "equipment": "cable",
    "equipmentCn": "拉力器",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8875?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8875.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-8876",
    "name": "cable-lying-hip-flexion-reverse-squat",
    "nameZh": "绳索仰卧屈髋(反向深蹲)",
    "bodyPart": "臀部",
    "equipment": "cable",
    "equipmentCn": "拉力器",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8876?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8876.mp4",
    "tip": "膝盖拉近时向心收缩时吐气,放回起点时回位时吸气；保持上背和手臂贴地,让向心收缩集中在髋部",
    "source": "fitwill"
  },
  {
    "id": "fw-5814",
    "name": "cable-low-chest-press",
    "nameZh": "绳索低位胸部推举",
    "bodyPart": "胸部",
    "equipment": "cable",
    "equipmentCn": "拉力器",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/5814?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/5814.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-11471",
    "name": "cable-lying-bench-single-leg-curl",
    "nameZh": "绳索仰卧平凳单腿弯举",
    "bodyPart": "大腿",
    "equipment": "cable",
    "equipmentCn": "拉力器",
    "primaryMuscles": [
      "hamstrings"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/11471?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11471.mp4",
    "tip": "弯举上抬时向心收缩时吐气,下放时回位时吸气；别让绷脚尖,那会把向心收缩转移到小腿",
    "source": "fitwill"
  },
  {
    "id": "fw-10860",
    "name": "cable-side-leg-kick-from-back",
    "nameZh": "绳索侧踢腿（后方起始）",
    "bodyPart": "臀肌",
    "equipment": "cable",
    "equipmentCn": "拉力器",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10860?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10860.mp4",
    "tip": "向外踢出时向心收缩时吐气，腿收回身后时回位时吸气；不要让支撑腿膝盖向内扣",
    "source": "fitwill"
  },
  {
    "id": "fw-4106",
    "name": "cable-split-stance-horizontal-pallof-press",
    "nameZh": "绳索分腿姿势水平帕洛夫推举",
    "bodyPart": "腰部",
    "equipment": "cable",
    "equipmentCn": "拉力器",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4106?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4106.mp4",
    "tip": "将滑轮设置在胸骨高度；推举时向心收缩时吐气，有助于防止肋骨架外翻",
    "source": "fitwill"
  },
  {
    "id": "fw-11275",
    "name": "cable-side-plank-row-version-3",
    "nameZh": "绳索侧平板支撑划船（版本 3）",
    "bodyPart": "背部",
    "equipment": "cable",
    "equipmentCn": "拉力器",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/11275?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11275.mp4",
    "tip": "拉回把手时向心收缩时吐气，放回时回位时吸气，全程平稳呼吸，别全程憋气完成整组",
    "source": "fitwill"
  },
  {
    "id": "fw-7564",
    "name": "cable-split-stance-single-arm-row",
    "nameZh": "绳索分腿站姿单臂划船",
    "bodyPart": "上背部",
    "equipment": "cable",
    "equipmentCn": "拉力器",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7564?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7564.mp4",
    "tip": "拉回把手时向心收缩时吐气，手臂回到伸直位置时回位时吸气；在拉到顶端时不要耸起向心收缩侧肩膀",
    "source": "fitwill"
  },
  {
    "id": "fw-6512",
    "name": "cable-single-arm-low-scapular-row",
    "nameZh": "绳索单臂低位肩胛划船",
    "bodyPart": "背部",
    "equipment": "cable",
    "equipmentCn": "拉力器",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/6512?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/6512.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-6511",
    "name": "cable-single-arm-high-scapular-row",
    "nameZh": "绳索单臂高位肩胛划船",
    "bodyPart": "背部",
    "equipment": "cable",
    "equipmentCn": "拉力器",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/6511?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/6511.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-4163",
    "name": "cable-one-arm-wrist-curl",
    "nameZh": "绳索单臂腕弯举",
    "bodyPart": "前臂",
    "equipment": "cable",
    "equipmentCn": "拉力器",
    "primaryMuscles": [
      "forearms"
    ],
    "secondaryMuscles": [],
    "category": "armwrest",
    "image": "https://fitwill.app/api/image/4163?w=1024&h=576",
    "tip": "不要将其变成肘部弯举",
    "source": "fitwill"
  },
  {
    "id": "fw-4197",
    "name": "cable-pallof-press-with-glute-bridge",
    "nameZh": "绳索帕洛夫推举结合臀桥",
    "bodyPart": "腰部",
    "equipment": "cable",
    "equipmentCn": "拉力器",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4197?w=1024&h=576",
    "tip": "推举时向心收缩时吐气，收回时回位时吸气，保持呼吸平稳自然",
    "source": "fitwill"
  },
  {
    "id": "fw-2886",
    "name": "cable-hanging-leg-raise",
    "nameZh": "绳索悬垂举腿",
    "bodyPart": "腰部",
    "equipment": "cable",
    "equipmentCn": "拉力器",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/2886?w=1024&h=576",
    "tip": "在每次重复前收紧核心；保持每次重复的呼吸一致",
    "source": "fitwill"
  },
  {
    "id": "fw-1800",
    "name": "cable-suspension-back-stretch",
    "nameZh": "绳索悬挂背部拉伸",
    "bodyPart": "背部",
    "equipment": "cable",
    "equipmentCn": "拉力器",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/1800?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/1800.mp4",
    "tip": "保持肘部柔和但伸长；不要向耳朵方向耸肩",
    "source": "fitwill"
  },
  {
    "id": "fw-7811",
    "name": "cable-supported-single-leg-hamstrings-concentratio",
    "nameZh": "绳索支撑单腿腘绳肌集中弯举",
    "bodyPart": "腿部",
    "equipment": "cable",
    "equipmentCn": "拉力器",
    "primaryMuscles": [
      "hamstrings"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7811?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7811.mp4",
    "tip": "髋部保持正对凳子",
    "source": "fitwill"
  },
  {
    "id": "fw-2324",
    "name": "cable-straight-legs-pull-through-with-rope",
    "nameZh": "绳索直腿拉力器拉伸",
    "bodyPart": "臀部",
    "equipment": "cable",
    "equipmentCn": "拉力器",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/2324?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/2324.mp4",
    "tip": "整套动作里始终膝盖略松；当身体站直且臀部收紧时停止上升阶段",
    "source": "fitwill"
  },
  {
    "id": "fw-8339",
    "name": "cable-straight-leg-diagonal-kickback",
    "nameZh": "绳索直腿斜向后踢腿",
    "bodyPart": "臀肌",
    "equipment": "other",
    "equipmentCn": "踝带",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8339?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8339.mp4",
    "tip": "不要追求抬腿高度",
    "source": "fitwill"
  },
  {
    "id": "fw-11272",
    "name": "cable-standing-biceps-curl-to-arnold-press",
    "nameZh": "绳索站姿弯举接阿诺德推举",
    "bodyPart": "肩部",
    "equipment": "cable",
    "equipmentCn": "拉力器",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/11272?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11272.mp4",
    "tip": "弯举和推起时向心收缩时吐气，下放和反向旋转时回位时吸气；保持头部中立，别让下巴朝手柄方向探出去",
    "source": "fitwill"
  },
  {
    "id": "fw-2744",
    "name": "cable-standing-hip-thrust",
    "nameZh": "绳索站姿髋部推举",
    "bodyPart": "臀部",
    "equipment": "machine",
    "equipmentCn": "杠杆器械",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/2744?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/2744.mp4",
    "tip": "站直并夹紧臀肌，膝盖伸直但关节别完全锁死，同时保持绳索受控；保持把手靠近身体中心线",
    "source": "fitwill"
  },
  {
    "id": "fw-9792",
    "name": "cable-behind-the-back-tricep-dip",
    "nameZh": "绳索背后肱三头臂屈伸",
    "bodyPart": "上臂",
    "equipment": "cable",
    "equipmentCn": "拉力器",
    "primaryMuscles": [
      "triceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9792?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9792.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-2088",
    "name": "shoulder-stretch-with-towel-behind-the-back",
    "nameZh": "背后毛巾肩部拉伸",
    "bodyPart": "上臂",
    "equipment": "other",
    "equipmentCn": "其他",
    "primaryMuscles": [
      "triceps"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/2088?w=1024&h=576",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-7866",
    "name": "shoulder-stretch-behind-the-back",
    "nameZh": "背后肩部拉伸",
    "bodyPart": "肩部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/7866?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7866.mp4",
    "tip": "别让把上方的肩膀耸向耳朵；加深拉伸时缓慢向心收缩时吐气",
    "source": "fitwill"
  },
  {
    "id": "fw-9426",
    "name": "back-hugs-chest-stretch",
    "nameZh": "背后环抱式胸部拉伸",
    "bodyPart": "胸部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/9426?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9426.mp4",
    "tip": "头部保持不动；手臂上抬时向心收缩时吐气",
    "source": "fitwill"
  },
  {
    "id": "fw-8663",
    "name": "cable-incline-y-raise-wrist-straps-with-back-suppo",
    "nameZh": "背部支撑腕带绳索上斜Y字提拉",
    "bodyPart": "肩部",
    "equipment": "cable",
    "equipmentCn": "拉力器",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "armwrest",
    "image": "https://fitwill.app/api/image/8663?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8663.mp4",
    "tip": "在顶端位置停顿一拍，肩膀下沉让肩膀靠近耳朵",
    "source": "fitwill"
  },
  {
    "id": "fw-7887",
    "name": "lat-shoulder-stretch-into-shoulder-shrug",
    "nameZh": "背阔肌肩部拉伸接耸肩",
    "bodyPart": "肩部",
    "equipment": "other",
    "equipmentCn": "长凳",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/7887?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7887.mp4",
    "tip": "整套动作里始终稳定的呼吸；肩膀下沉时向心收缩时吐气，让每次向心收缩时吐气帮助你再下沉一点点",
    "source": "fitwill"
  },
  {
    "id": "fw-7597",
    "name": "cable-high-row-with-chest-support",
    "nameZh": "胸前支撑绳索高位划船",
    "bodyPart": "上背部",
    "equipment": "cable",
    "equipmentCn": "拉力器",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7597?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7597.mp4",
    "tip": "拉回把手时向心收缩时吐气，有控制地伸展回去时回位时吸气；整套动作里始终手腕中立",
    "source": "fitwill"
  },
  {
    "id": "fw-6146",
    "name": "dumbbell-bent-over-row-against-wall",
    "nameZh": "背靠墙哑铃俯身划船",
    "bodyPart": "背部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/6146?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/6146.mp4",
    "tip": "在动作顶部收紧肩胛骨向后向下，肩膀下沉、扭转或让胸部抬起",
    "source": "fitwill"
  },
  {
    "id": "fw-7587",
    "name": "cable-single-arm-high-row-with-chest-support",
    "nameZh": "胸垫支撑单臂绳索高位划船",
    "bodyPart": "上背部",
    "equipment": "cable",
    "equipmentCn": "拉力器",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7587?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7587.mp4",
    "tip": "拉动时向心收缩时吐气，手臂回到预备姿势时回位时吸气；每次顶点都要让肩胛骨充分前伸",
    "source": "fitwill"
  },
  {
    "id": "fw-9699",
    "name": "dumbbell-single-arm-row-with-chest-supported",
    "nameZh": "胸部支撑单臂哑铃划船",
    "bodyPart": "背部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9699?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9699.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-2340",
    "name": "chest-bench-press-shoulders-wrong-right",
    "nameZh": "胸部卧推肩部 错误-正确示范",
    "bodyPart": "胸部",
    "equipment": "barbell",
    "equipmentCn": "杠铃",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/2340?w=1024&h=576",
    "tip": "防止肘部过度外展，别让杠铃向颈部或脸部偏移",
    "source": "fitwill"
  },
  {
    "id": "fw-3963",
    "name": "dumbbell-single-spider-curl-with-chest-support",
    "nameZh": "胸部支撑单臂哑铃蜘蛛弯举",
    "bodyPart": "上臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3963?w=1024&h=576",
    "tip": "保持上臂静止；保持胸部紧贴靠垫",
    "source": "fitwill"
  },
  {
    "id": "fw-5661",
    "name": "dumbbell-bent-over-row-with-chest-support",
    "nameZh": "胸部支撑哑铃俯身划船",
    "bodyPart": "背部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/5661?w=1024&h=576",
    "tip": "保持臀部紧贴长凳支撑",
    "source": "fitwill"
  },
  {
    "id": "fw-3988",
    "name": "barbell-incline-reverse-grip-spider-curl-with-chest-support",
    "nameZh": "胸部支撑杠铃上斜反握蜘蛛弯举",
    "bodyPart": "前臂",
    "equipment": "barbell",
    "equipmentCn": "杠铃",
    "primaryMuscles": [
      "forearms"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3988?w=1024&h=576",
    "tip": "在每次重复前收紧核心；别让仓促完成离心阶段",
    "source": "fitwill"
  },
  {
    "id": "fw-9332",
    "name": "leg-under-and-above-shoulders-bridge-pose",
    "nameZh": "腿在肩下及肩上臀桥式",
    "bodyPart": "臀肌",
    "equipment": "exercise ball",
    "equipmentCn": "健身球",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9332?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9332.mp4",
    "tip": "不要用手推地面",
    "source": "fitwill"
  },
  {
    "id": "fw-1693",
    "name": "medicine-ball-single-leg-deadlift",
    "nameZh": "药球单腿硬拉",
    "bodyPart": "臀部",
    "equipment": "medicine ball",
    "equipmentCn": "药球",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/1693?w=1024&h=576",
    "tip": "在每次重复前收紧核心；保持每次重复的呼吸一致",
    "source": "fitwill"
  },
  {
    "id": "fw-4253",
    "name": "medicine-ball-crunch",
    "nameZh": "药球卷腹",
    "bodyPart": "腰部",
    "equipment": "medicine ball",
    "equipmentCn": "药球",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4253?w=1024&h=576",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-11701",
    "name": "medicine-ball-thruster",
    "nameZh": "药球深蹲推举",
    "bodyPart": "全身",
    "equipment": "medicine ball",
    "equipmentCn": "药球",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/11701?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11701.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-11621",
    "name": "medicine-ball-squat-to-overhead-press",
    "nameZh": "药球深蹲过头推举",
    "bodyPart": "全身",
    "equipment": "medicine ball",
    "equipmentCn": "药球",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/11621?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11621.mp4",
    "tip": "蹬地起立推举时用力向心收缩时吐气,放球下蹲时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-10079",
    "name": "medicine-ball-oblique-crunch",
    "nameZh": "药球腹斜肌卷腹",
    "bodyPart": "核心",
    "equipment": "medicine ball",
    "equipmentCn": "药球",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10079?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10079.mp4",
    "tip": "髋部、下背部和双脚整套动作里始终贴紧地面",
    "source": "fitwill"
  },
  {
    "id": "fw-9797",
    "name": "medicine-ball-kneeling-donkey-kick",
    "nameZh": "药球跪姿驴踢腿",
    "bodyPart": "臀肌",
    "equipment": "medicine ball",
    "equipmentCn": "药球",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9797?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9797.mp4",
    "tip": "用支撑手臂把地板推离，别让肩膀下沉；不要靠甩腿借力",
    "source": "fitwill"
  },
  {
    "id": "fw-8017",
    "name": "weighted-kettlebell-glute-single-leg-bridge-from-b",
    "nameZh": "负重壶铃臀肌单腿臀桥（B位起始）",
    "bodyPart": "臀肌",
    "equipment": "kettlebells",
    "equipmentCn": "壶铃",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8017?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8017.mp4",
    "tip": "抬起的腿保持放松",
    "source": "fitwill"
  },
  {
    "id": "fw-10097",
    "name": "weighted-plate-side-up-squat",
    "nameZh": "负重杠铃片侧上举深蹲",
    "bodyPart": "腿部",
    "equipment": "other",
    "equipmentCn": "负重",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10097?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10097.mp4",
    "tip": "在开始向上向心收缩前先收紧核心；向上向心收缩并举起杠铃片时向心收缩时吐气",
    "source": "fitwill"
  },
  {
    "id": "fw-10636",
    "name": "weighted-plate-pinch-curl",
    "nameZh": "负重杠铃片捏握弯举",
    "bodyPart": "前臂",
    "equipment": "other",
    "equipmentCn": "负重",
    "primaryMuscles": [
      "forearms"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10636?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10636.mp4",
    "tip": "缓慢将杠铃片下放回体侧预备姿势，回落时回位时吸气，并在整个回落过程中保持捏紧",
    "source": "fitwill"
  },
  {
    "id": "fw-3876",
    "name": "weighted-squat-jump-with-plate",
    "nameZh": "负重杠铃片深蹲跳",
    "bodyPart": "大腿",
    "equipment": "other",
    "equipmentCn": "负重",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "plyometrics",
    "image": "https://fitwill.app/api/image/3876?w=1024&h=576",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-6559",
    "name": "weighted-plate-tibialis-anterior-curl",
    "nameZh": "负重杠铃片胫骨前肌弯举",
    "bodyPart": "小腿",
    "equipment": "other",
    "equipmentCn": "负重",
    "primaryMuscles": [
      "calves"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/6559?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/6559.mp4",
    "tip": "如果膝盖开始参与向心收缩，说明重量太重了",
    "source": "fitwill"
  },
  {
    "id": "fw-8823",
    "name": "weighted-plate-stagged-stance-romanian-deadlift",
    "nameZh": "负重杠铃片错步罗马尼亚硬拉",
    "bodyPart": "臀肌",
    "equipment": "other",
    "equipmentCn": "负重",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8823?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8823.mp4",
    "tip": "不要让前膝向内扣；保持前膝弯曲角度恒定",
    "source": "fitwill"
  },
  {
    "id": "fw-4101",
    "name": "weighted-straight-leg-toe-touch-crunch",
    "nameZh": "负重直腿触脚尖卷腹",
    "bodyPart": "腰部",
    "equipment": "other",
    "equipmentCn": "负重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4101?w=1024&h=576",
    "tip": "保持收下颚，这样颈部就不会主导动作；向上伸展时向心收缩时吐气，回到地面时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-10580",
    "name": "weighted-squat-side-leg-kick",
    "nameZh": "负重深蹲侧踢腿",
    "bodyPart": "臀肌",
    "equipment": "other",
    "equipmentCn": "踝带",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10580?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10580.mp4",
    "tip": "下蹲时注意站立腿的膝盖；不要把踢出的腿完全锁直",
    "source": "fitwill"
  },
  {
    "id": "fw-0836",
    "name": "weighted-leg-extension-crunch",
    "nameZh": "负重腿部伸展卷腹",
    "bodyPart": "腰部",
    "equipment": "exercise ball",
    "equipmentCn": "健身球",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0836?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0836.mp4",
    "tip": "不要猛拉头部",
    "source": "fitwill"
  },
  {
    "id": "fw-3236",
    "name": "resistance-band-hip-thrusts-on-knees",
    "nameZh": "跪姿弹力带髋部推举",
    "bodyPart": "臀部",
    "equipment": "bands",
    "equipmentCn": "阻力带",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3236?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3236.mp4",
    "tip": "保持弹力带在骨盆低位；髋部向前移动时向心收缩时吐气，回到预备姿势并重新对齐躯干时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-9623",
    "name": "superman-lat-pulldown-and-leg-raise",
    "nameZh": "超人式背阔肌下拉举腿",
    "bodyPart": "背部",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9623?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9623.mp4",
    "tip": "保持收下颚，眼睛看向垫子；抬升和下拉时向心收缩时吐气，回落到垫子时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-0193",
    "name": "kneeling-cable-one-arm-straight-back-high-row",
    "nameZh": "跪姿绳索单臂直背高位划船",
    "bodyPart": "背部",
    "equipment": "cable",
    "equipmentCn": "拉力器",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0193?w=1024&h=576",
    "tip": "在收紧处稍作停顿，肩膀下沉或扭转身体；保持肘部驱动动作",
    "source": "fitwill"
  },
  {
    "id": "fw-5821",
    "name": "cable-kneeling-shoulder-90-degrees-external-rotation-press",
    "nameZh": "跪姿绳索肩部90度外旋推举",
    "bodyPart": "背部",
    "equipment": "cable",
    "equipmentCn": "拉力器",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/5821?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/5821.mp4",
    "tip": "保持滑轮靠近肩部高度",
    "source": "fitwill"
  },
  {
    "id": "fw-8989",
    "name": "kneeling-torso-rotation-chest-and-shoulder-stretch",
    "nameZh": "跪姿躯干旋转胸部与肩部拉伸",
    "bodyPart": "胸部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/8989?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8989.mp4",
    "tip": "向外旋转打开时向心收缩时吐气，回到中间时回位时吸气，整套动作里始终呼吸缓慢而连贯；轻微收紧核心，意念集中在骨盆被粘在膝盖正上方",
    "source": "fitwill"
  },
  {
    "id": "fw-2751",
    "name": "kettlebell-dumbbell-sumo-squat-off-stepbox",
    "nameZh": "踏板壶铃/哑铃相扑深蹲",
    "bodyPart": "臀部",
    "equipment": "kettlebells",
    "equipmentCn": "壶铃",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/2751?w=1024&h=576",
    "tip": "保持壶铃在骨盆下方居中",
    "source": "fitwill"
  },
  {
    "id": "fw-2836",
    "name": "cable-stiff-leg-deadlift-from-stepbox",
    "nameZh": "踏板绳索直腿硬拉",
    "bodyPart": "臀部",
    "equipment": "cable",
    "equipmentCn": "拉力器",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/2836?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/2836.mp4",
    "tip": "最后夹紧臀肌，不要向后倾斜或耸肩；在顶部短暂收紧即可",
    "source": "fitwill"
  },
  {
    "id": "fw-2750",
    "name": "dumbbell-single-leg-deadlift-with-wall-support",
    "nameZh": "靠墙支撑哑铃单腿硬拉",
    "bodyPart": "臀部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/2750?w=1024&h=576",
    "tip": "在每次重复前收紧核心；保持每次重复的呼吸一致",
    "source": "fitwill"
  },
  {
    "id": "fw-1931",
    "name": "hip-and-knee-flexion-squatting-stretch",
    "nameZh": "髋膝屈曲深蹲拉伸",
    "bodyPart": "臀部",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/1931?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/1931.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-11276",
    "name": "cable-prone-single-leg-curl-version-3",
    "nameZh": "龙门架绳索俯卧单腿弯举（版本 3）",
    "bodyPart": "大腿",
    "equipment": "cable",
    "equipmentCn": "拉力器",
    "primaryMuscles": [
      "hamstrings"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/11276?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11276.mp4",
    "tip": "每次下放到底时别让用力锁死膝盖",
    "source": "fitwill"
  },
  {
    "id": "fw-0221",
    "name": "cable-side-bend-crunch-bosu-ball",
    "nameZh": "BOSU球绳索侧弯卷腹",
    "bodyPart": "腰部",
    "equipment": "cable",
    "equipmentCn": "拉力器",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0221?w=1024&h=576",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-6361",
    "name": "ez-barbell-standing-wrist-reverse-curl",
    "nameZh": "EZ杠铃站姿反向腕弯举",
    "bodyPart": "前臂",
    "equipment": "e-z curl bar",
    "equipmentCn": "EZ 杠铃",
    "primaryMuscles": [
      "forearms"
    ],
    "secondaryMuscles": [],
    "category": "armwrest",
    "image": "https://fitwill.app/api/image/6361?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/6361.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-6358",
    "name": "ez-barbell-standing-wrist-curl",
    "nameZh": "EZ曲柄杠铃站姿腕弯举",
    "bodyPart": "前臂",
    "equipment": "e-z curl bar",
    "equipmentCn": "EZ 杠铃",
    "primaryMuscles": [
      "forearms"
    ],
    "secondaryMuscles": [],
    "category": "armwrest",
    "image": "https://fitwill.app/api/image/6358?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/6358.mp4",
    "tip": "有控制地回落杠铃，直到手腕回到拉伸的预备姿势；不要让肘部向前滑动",
    "source": "fitwill"
  },
  {
    "id": "fw-4068",
    "name": "barbell-bench-press-with-3-board",
    "nameZh": "三块木板杠铃卧推",
    "bodyPart": "胸部",
    "equipment": "barbell",
    "equipmentCn": "杠铃",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4068?w=1024&h=576",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-1983",
    "name": "reaching-up-shoulder-stretch",
    "nameZh": "上伸肩部拉伸",
    "bodyPart": "背部",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/1983?w=1024&h=576",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-4768",
    "name": "incline-alternate-flutter-kicks",
    "nameZh": "上斜交替踢腿",
    "bodyPart": "臀部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4768?w=1024&h=576",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-9698",
    "name": "dumbbell-row-with-chest-supported",
    "nameZh": "上斜凳俯卧哑铃划船",
    "bodyPart": "背部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9698?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9698.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-3682",
    "name": "dumbbell-incline-alternate-bicep-curl",
    "nameZh": "上斜哑铃交替弯举",
    "bodyPart": "上臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3682?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3682.mp4",
    "tip": "保持上臂固定，别让哑铃上升时肘部向前移动；顶部肩膀下沉",
    "source": "fitwill"
  },
  {
    "id": "fw-0322",
    "name": "dumbbell-incline-inner-biceps-curl",
    "nameZh": "上斜哑铃内侧二头肌弯举",
    "bodyPart": "上臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0322?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0322.mp4",
    "tip": "在顶部附近短暂保持，肩膀下沉或让肘部向前偏移；别让进入疼痛的底部范围",
    "source": "fitwill"
  },
  {
    "id": "fw-6218",
    "name": "dumbbell-incline-twist-press",
    "nameZh": "上斜哑铃旋转推举",
    "bodyPart": "胸部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/6218?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/6218.mp4",
    "tip": "保持呼吸平稳，推举时向心收缩时吐气，下放时回位时吸气；推举时让旋转自然发生",
    "source": "fitwill"
  },
  {
    "id": "fw-3938",
    "name": "dumbbell-incline-shrug",
    "nameZh": "上斜哑铃耸肩",
    "bodyPart": "背部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "traps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3938?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3938.mp4",
    "tip": "保持肘部伸直",
    "source": "fitwill"
  },
  {
    "id": "fw-0320",
    "name": "dumbbell-incline-hammer-curl",
    "nameZh": "上斜哑铃锤式弯举",
    "bodyPart": "上臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0320?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0320.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-0321",
    "name": "dumbbell-incline-hammer-press",
    "nameZh": "上斜哑铃锤式推举",
    "bodyPart": "胸部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0321?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0321.mp4",
    "tip": "保持哑铃水平，别让一侧领先于另一侧",
    "source": "fitwill"
  },
  {
    "id": "fw-1845",
    "name": "decline-bent-leg-reverse-crunch",
    "nameZh": "下斜屈膝反向卷腹",
    "bodyPart": "腰部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/1845?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/1845.mp4",
    "tip": "髋部卷起时向心收缩时吐气",
    "source": "fitwill"
  },
  {
    "id": "fw-3438",
    "name": "decline-leg-hip-raise",
    "nameZh": "下斜腿部髋部抬升",
    "bodyPart": "臀部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3438?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3438.mp4",
    "tip": "意念集中在将骨盆向肋骨方向卷曲；髋部卷起时向心收缩时吐气，双腿受控下降时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-8183",
    "name": "downward-dog-crunch",
    "nameZh": "下犬式卷腹",
    "bodyPart": "核心",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8183?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8183.mp4",
    "tip": "全程稳住节奏；提膝时用力向心收缩时吐气，回位时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-10811",
    "name": "leg-raise-dragon-flag",
    "nameZh": "举腿龙旗",
    "bodyPart": "核心",
    "equipment": "other",
    "equipmentCn": "平凳",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10811?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10811.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-7855",
    "name": "lower-ab-swipe",
    "nameZh": "下腹划扫卷腹",
    "bodyPart": "核心",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7855?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7855.mp4",
    "tip": "组间不要让双脚落地；整组过程中保持头部贴地",
    "source": "fitwill"
  },
  {
    "id": "fw-1793",
    "name": "cross-over-shoulder-stretch",
    "nameZh": "交叉肩部拉伸",
    "bodyPart": "背部",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/1793?w=1024&h=576",
    "tip": "别让强行拉伸至无痛范围之外；保持动作缓慢且深思熟虑",
    "source": "fitwill"
  },
  {
    "id": "fw-0265",
    "name": "crossover-kneeling-hip-flexor-stretch",
    "nameZh": "交叉跪姿髋屈肌拉伸",
    "bodyPart": "臀部",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/0265?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0265.mp4",
    "tip": "收紧跪地一侧的臀肌；保持姿势并平稳呼吸",
    "source": "fitwill"
  },
  {
    "id": "fw-0263",
    "name": "cross-body-twisting-crunch",
    "nameZh": "交叉转体卷腹",
    "bodyPart": "腰部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0263?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0263.mp4",
    "tip": "收紧腹部并保持颈部放松；在受控状态下回位，不要直接回落",
    "source": "fitwill"
  },
  {
    "id": "fw-4354",
    "name": "alternate-oblique-crunches",
    "nameZh": "交替侧腹卷腹",
    "bodyPart": "腰部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4354?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4354.mp4",
    "tip": "保持卷腹幅度较小；不要让膝盖向胸部靠拢",
    "source": "fitwill"
  },
  {
    "id": "fw-7432",
    "name": "alternate-single-leg-glute-bridge",
    "nameZh": "交替单腿臀桥",
    "bodyPart": "臀肌",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7432?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7432.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-8866",
    "name": "alternate-butt-kick-to-knee-thrust",
    "nameZh": "交替后踢腿接提膝",
    "bodyPart": "腿部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8866?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8866.mp4",
    "tip": "每次提膝向上时向心收缩时吐气,脚落下时回位时吸气,整套动作里始终呼吸平稳；整套动作里始终躯干挺直",
    "source": "fitwill"
  },
  {
    "id": "fw-8985",
    "name": "alternate-forward-kick",
    "nameZh": "交替前踢腿",
    "bodyPart": "臀部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8985?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8985.mp4",
    "tip": "腿抬起时向心收缩时吐气，放回时回位时吸气；整套动作里始终躯干直立",
    "source": "fitwill"
  },
  {
    "id": "fw-9061",
    "name": "switching-shoulder-rotation-stretch",
    "nameZh": "交替肩部旋转拉伸",
    "bodyPart": "肩部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/9061?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9061.mp4",
    "tip": "整套动作里始终平稳呼吸，手掌向上扫时回位时吸气，向下旋转时向心收缩时吐气，别让憋气；整套动作里始终工作侧手臂在肩部高度",
    "source": "fitwill"
  },
  {
    "id": "fw-4437",
    "name": "alternating-hamstring-curl-with-punche",
    "nameZh": "交替腿后侧弯举加出拳",
    "bodyPart": "爆发力训练",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "cardio"
    ],
    "secondaryMuscles": [],
    "category": "plyometrics",
    "image": "https://fitwill.app/api/image/4437?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4437.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-7496",
    "name": "alternate-frog-crunch",
    "nameZh": "交替蛙式卷腹",
    "bodyPart": "核心",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7496?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7496.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-7431",
    "name": "alternate-donkey-kick",
    "nameZh": "交替驴踢腿",
    "bodyPart": "臀肌",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7431?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7431.mp4",
    "tip": "每条腿抬起时向心收缩时吐气，回落时回位时吸气，保持呼吸平稳，别全程憋气；整套动作里始终工作膝弯曲约九十度",
    "source": "fitwill"
  },
  {
    "id": "fw-8263",
    "name": "alternating-hip-flexor-hamstring-stretch",
    "nameZh": "交替髋屈肌腘绳肌拉伸",
    "bodyPart": "臀部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/8263?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8263.mp4",
    "tip": "保持20到30秒，呼吸平稳；保持20到30秒",
    "source": "fitwill"
  },
  {
    "id": "fw-3243",
    "name": "lying-lower-back-stretch",
    "nameZh": "仰卧下背部拉伸",
    "bodyPart": "背部",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/3243?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3243.mp4",
    "tip": "保持肩膀沉在垫子上；将双手作为引导而非杠杆",
    "source": "fitwill"
  },
  {
    "id": "fw-8933",
    "name": "alternate-v-feet-raises",
    "nameZh": "交替V形举腿",
    "bodyPart": "核心",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8933?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8933.mp4",
    "tip": "每次抬腿时向心收缩时吐气，回落时回位时吸气，保持呼吸平稳，别全程憋气；抬起的腿保持伸直但关节别完全锁死",
    "source": "fitwill"
  },
  {
    "id": "fw-9887",
    "name": "lying-alternating-crunch-and-twist",
    "nameZh": "仰卧交替卷腹转体",
    "bodyPart": "核心",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9887?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9887.mp4",
    "tip": "手肘不需要碰到膝盖；回位时吸气,缓慢放回预备姿势,别让头部和肩膀重重砸下",
    "source": "fitwill"
  },
  {
    "id": "fw-10103",
    "name": "lying-alternate-bent-leg-raise",
    "nameZh": "仰卧交替屈膝举腿",
    "bodyPart": "核心",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10103?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10103.mp4",
    "tip": "每次膝盖向上提时向心收缩时吐气，向下放时回位时吸气；保持连续呼吸，别全程憋气",
    "source": "fitwill"
  },
  {
    "id": "fw-7376",
    "name": "lying-side-reverse-crunch",
    "nameZh": "仰卧侧向反向卷腹",
    "bodyPart": "核心",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7376?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7376.mp4",
    "tip": "双手只用于保持平衡；保持对角线路径的准确",
    "source": "fitwill"
  },
  {
    "id": "fw-10520",
    "name": "lying-woodchopper-crunch",
    "nameZh": "仰卧伐木式卷腹",
    "bodyPart": "核心",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10520?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10520.mp4",
    "tip": "不要让下巴使劲贴近胸口；起身时用力向心收缩时吐气",
    "source": "fitwill"
  },
  {
    "id": "fw-9024",
    "name": "lying-abdominal-scissors-crunch",
    "nameZh": "仰卧剪刀式卷腹",
    "bodyPart": "核心",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9024?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9024.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-3831",
    "name": "lying-single-legs-reverse-biceps-curl-with-towel",
    "nameZh": "仰卧单腿毛巾反向二头肌弯举",
    "bodyPart": "上臂",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3831?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3831.mp4",
    "tip": "仰卧在垫子上，将毛巾绕在向心收缩腿的脚上；在顶端稍作停顿，肩膀下沉或让手腕向后折叠",
    "source": "fitwill"
  },
  {
    "id": "fw-8525",
    "name": "lying-half-butterfly-raise",
    "nameZh": "仰卧半蝴蝶式举腿",
    "bodyPart": "臀部",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8525?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8525.mp4",
    "tip": "抬膝时向心收缩时吐气，回落时回位时吸气，保持呼吸连续，别全程憋气；不要强行把膝盖开得更大",
    "source": "fitwill"
  },
  {
    "id": "fw-10913",
    "name": "lying-single-leg-raise",
    "nameZh": "仰卧单腿举腿",
    "bodyPart": "核心",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10913?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10913.mp4",
    "tip": "每次开始前先把膝盖锁直",
    "source": "fitwill"
  },
  {
    "id": "fw-1776",
    "name": "lying-single-straight-leg-hip-extension",
    "nameZh": "仰卧单腿直腿髋伸",
    "bodyPart": "大腿",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/1776?w=1024&h=576",
    "tip": "在每次重复前收紧核心；别让过快完成离心阶段",
    "source": "fitwill"
  },
  {
    "id": "fw-8976",
    "name": "lying-frog-crunch-feet-together",
    "nameZh": "仰卧双脚并拢蛙式卷腹",
    "bodyPart": "核心",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8976?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8976.mp4",
    "tip": "髋部抬起的瞬间用力向心收缩时吐气",
    "source": "fitwill"
  },
  {
    "id": "fw-3752",
    "name": "lying-double-legs-biceps-curl-with-towel",
    "nameZh": "仰卧双腿毛巾二头肌弯举",
    "bodyPart": "上臂",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3752?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3752.mp4",
    "tip": "向上弯举时向心收缩时吐气，下放时回位时吸气；保持手腕与前臂成一直线",
    "source": "fitwill"
  },
  {
    "id": "fw-3830",
    "name": "lying-double-legs-hammer-curl-with-towel",
    "nameZh": "仰卧双腿毛巾锤式弯举",
    "bodyPart": "上臂",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3830?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3830.mp4",
    "tip": "整套动作里始终中立握法；不要让肘部向外张开",
    "source": "fitwill"
  },
  {
    "id": "fw-9296",
    "name": "lying-floor-quarter-twisting-crunch",
    "nameZh": "仰卧地面四分之一转体卷腹",
    "bodyPart": "核心",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9296?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9296.mp4",
    "tip": "在最高点停顿一拍，收紧腹肌和转体一侧的腹斜肌",
    "source": "fitwill"
  },
  {
    "id": "fw-0617",
    "name": "lying-hip-leg-raise-on-floor",
    "nameZh": "仰卧地面髋部抬腿",
    "bodyPart": "臀部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0617?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0617.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-4929",
    "name": "lying-calf-stretch",
    "nameZh": "仰卧小腿拉伸",
    "bodyPart": "小腿",
    "equipment": "other",
    "equipmentCn": "其他",
    "primaryMuscles": [
      "calves"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/4929?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4929.mp4",
    "tip": "膝盖伸直时侧重于腓肠肌",
    "source": "fitwill"
  },
  {
    "id": "fw-3242",
    "name": "lying-lower-back-stretch-bent-knee",
    "nameZh": "仰卧屈膝下背部拉伸",
    "bodyPart": "背部",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/3242?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3242.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-3477",
    "name": "lying-leg-tuck-hip-back-to-right-stretch",
    "nameZh": "仰卧屈膝向右后方髋部拉伸",
    "bodyPart": "背部",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/3477?w=1024&h=576",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-3476",
    "name": "lying-leg-tuck-hip-twist-stretch",
    "nameZh": "仰卧屈膝髋部扭转拉伸",
    "bodyPart": "胸部",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/3476?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3476.mp4",
    "tip": "保持对侧肩膀紧贴垫子；不要强行将膝盖拉过身体",
    "source": "fitwill"
  },
  {
    "id": "fw-7853",
    "name": "lying-raised-shoulders-windshield-wiper-leg-extens",
    "nameZh": "仰卧抬肩雨刷式伸腿",
    "bodyPart": "核心",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7853?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7853.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-11010",
    "name": "hip-lift-low-back-off-floor",
    "nameZh": "仰卧提髋下背离地",
    "bodyPart": "核心",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/11010?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11010.mp4",
    "tip": "整套动作里始终双腿垂直；绝不要用手把髋部向上推",
    "source": "fitwill"
  },
  {
    "id": "fw-10127",
    "name": "lying-supine-isometric-single-leg-hamstring-curl",
    "nameZh": "仰卧等长单腿腘绳肌弯举",
    "bodyPart": "大腿",
    "equipment": "exercise ball",
    "equipmentCn": "健身球",
    "primaryMuscles": [
      "hamstrings"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10127?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10127.mp4",
    "tip": "别全程憋气或过度用力下压；不要瞬间加到全力",
    "source": "fitwill"
  },
  {
    "id": "fw-2396",
    "name": "cable-lying-biceps-curl-version-2",
    "nameZh": "仰卧绳索二头肌弯举（版本 2）",
    "bodyPart": "上臂",
    "equipment": "cable",
    "equipmentCn": "拉力器",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/2396?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/2396.mp4",
    "tip": "保持手腕中立，弯举时向心收缩时吐气，回位时回位时吸气并保持控制",
    "source": "fitwill"
  },
  {
    "id": "fw-4224",
    "name": "cable-lying-pallof-press",
    "nameZh": "仰卧绳索帕洛夫推举",
    "bodyPart": "腰部",
    "equipment": "cable",
    "equipmentCn": "拉力器",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4224?w=1024&h=576",
    "tip": "推举时向心收缩时吐气，返回时回位时吸气，整套动作里始终绳索处于张力状态；不要让肘部向外张开",
    "source": "fitwill"
  },
  {
    "id": "fw-4350",
    "name": "cable-lying-regular-grip-curl",
    "nameZh": "仰卧绳索正握弯举",
    "bodyPart": "上臂",
    "equipment": "cable",
    "equipmentCn": "拉力器",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4350?w=1024&h=576",
    "tip": "缓慢将手柄放回预备姿势，同时保持绳索张力；保持手腕与前臂对齐",
    "source": "fitwill"
  },
  {
    "id": "fw-0183",
    "name": "cable-lying-curl",
    "nameZh": "仰卧绳索弯举",
    "bodyPart": "手臂",
    "equipment": "cable",
    "equipmentCn": "拉力器",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0183?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0183.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-4226",
    "name": "cable-lying-shrug",
    "nameZh": "仰卧绳索耸肩",
    "bodyPart": "肩部",
    "equipment": "cable",
    "equipmentCn": "拉力器",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4226?w=1024&h=576",
    "tip": "保持躯干固定在平凳上",
    "source": "fitwill"
  },
  {
    "id": "fw-3539",
    "name": "lying-t-spine-mobility-stretching",
    "nameZh": "仰卧胸椎灵活性拉伸",
    "bodyPart": "臀部",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/3539?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3539.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-8566",
    "name": "lying-sole-to-sole-groin-stretch",
    "nameZh": "仰卧脚底相对腹股沟拉伸",
    "bodyPart": "大腿",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/8566?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8566.mp4",
    "tip": "不要用手或肘下压膝盖",
    "source": "fitwill"
  },
  {
    "id": "fw-6752",
    "name": "lying-rectus-abdominis-activation-crunch",
    "nameZh": "仰卧腹直肌激活卷腹",
    "bodyPart": "腰部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/6752?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/6752.mp4",
    "tip": "在顶部暂停片刻进行收紧，不要拉扯颈部或晃动躯干；意念集中在将肋骨向骨盆方向卷曲",
    "source": "fitwill"
  },
  {
    "id": "fw-5250",
    "name": "lying-bicycle-crunch",
    "nameZh": "仰卧自行车卷腹",
    "bodyPart": "腰部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/5250?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/5250.mp4",
    "tip": "扭转时向心收缩时吐气，通过动作中心时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-7735",
    "name": "lying-butterfly-crunch",
    "nameZh": "仰卧蝴蝶式卷腹",
    "bodyPart": "核心",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7735?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7735.mp4",
    "tip": "让指尖轻放在头骨上,意念集中在用胸骨向上提起；保持双脚脚掌紧贴",
    "source": "fitwill"
  },
  {
    "id": "fw-1939",
    "name": "recumbent-hip-external-rotator-and-hip-extensor-stretch",
    "nameZh": "仰卧髋外旋肌与髋伸肌拉伸",
    "bodyPart": "臀部",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/1939?w=1024&h=576",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-1932",
    "name": "assisted-lying-hip-stretch-in-supine-position",
    "nameZh": "仰卧辅助髋部拉伸",
    "bodyPart": "臀部",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/1932?w=1024&h=576",
    "tip": "让同伴逐渐增加压力",
    "source": "fitwill"
  },
  {
    "id": "fw-0616",
    "name": "lying-hip-flexor-stretch",
    "nameZh": "仰卧髋屈肌拉伸",
    "bodyPart": "臀部",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/0616?w=1024&h=576",
    "tip": "保持拉伸平稳静止，别晃身子膝盖靠近胸部",
    "source": "fitwill"
  },
  {
    "id": "fw-7442",
    "name": "low-plank-leg-raise",
    "nameZh": "低位平板支撑抬腿",
    "bodyPart": "核心",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7442?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7442.mp4",
    "tip": "让支撑脚的脚趾轻轻抓地",
    "source": "fitwill"
  },
  {
    "id": "fw-9799",
    "name": "low-lunge-tip-toe-hands-hips-position",
    "nameZh": "低弓步提踵（双手叉髋式）",
    "bodyPart": "小腿",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "calves"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9799?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9799.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-9798",
    "name": "low-lunge-tip-toe-hands-chest-position",
    "nameZh": "低位弓步提踵（双手胸前合十）",
    "bodyPart": "小腿",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "calves"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9798?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9798.mp4",
    "tip": "踮脚上蹬时向心收缩时吐气，放下脚跟时回位时吸气，整套动作里始终呼吸平稳",
    "source": "fitwill"
  },
  {
    "id": "fw-0719",
    "name": "side-stretch-crunch",
    "nameZh": "侧卧伸展卷腹",
    "bodyPart": "腰部",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0719?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0719.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-0708",
    "name": "side-crunch",
    "nameZh": "侧卧卷腹",
    "bodyPart": "腰部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0708?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0708.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-4884",
    "name": "side-lying-outward-knee-kick",
    "nameZh": "侧卧外展踢腿",
    "bodyPart": "臀部",
    "equipment": "other",
    "equipmentCn": "其他",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4884?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4884.mp4",
    "tip": "保持髋部垂直堆叠；在膝盖打开和开始抬腿时向心收缩时吐气，在受控返回时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-4990",
    "name": "knee-tuck-oblique-crunch",
    "nameZh": "侧卧屈膝卷腹",
    "bodyPart": "腰部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4990?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4990.mp4",
    "tip": "不要用上方手猛拉头部",
    "source": "fitwill"
  },
  {
    "id": "fw-1577",
    "name": "lying-hip-flexor",
    "nameZh": "侧卧髋屈肌拉伸",
    "bodyPart": "大腿",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/1577?w=1024&h=576",
    "tip": "缓慢呼吸，保持拉伸姿势，别晃身子；保持上侧膝盖基本朝下",
    "source": "fitwill"
  },
  {
    "id": "fw-8289",
    "name": "side-lying-chest-stretch",
    "nameZh": "侧卧胸部拉伸",
    "bodyPart": "胸部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/8289?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8289.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-0707",
    "name": "side-crunch-version-2",
    "nameZh": "侧卷腹版本 2",
    "bodyPart": "腰部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0707?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0707.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-4788",
    "name": "side-split-squat",
    "nameZh": "侧向分腿深蹲",
    "bodyPart": "大腿",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4788?w=1024&h=576",
    "tip": "不要在底部利用惯性反弹",
    "source": "fitwill"
  },
  {
    "id": "fw-0721",
    "name": "side-wrist-pull-stretch",
    "nameZh": "侧向手腕拉伸",
    "bodyPart": "前臂",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "forearms"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/0721?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0721.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-7827",
    "name": "lateral-shuffle-crunches",
    "nameZh": "侧向滑步卷腹",
    "bodyPart": "核心",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7827?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7827.mp4",
    "tip": "在最高点短暂收紧卷腹，感受腰侧的收缩；意念集中在把下肋往髋骨方向带过去",
    "source": "fitwill"
  },
  {
    "id": "fw-7753",
    "name": "side-plank-raise",
    "nameZh": "侧平板支撑抬髋",
    "bodyPart": "核心",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7753?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7753.mp4",
    "tip": "上抬髋部时向心收缩时吐气，下放时回位时吸气，保持呼吸平稳，别全程憋气；不要用上侧的手拉扯头部",
    "source": "fitwill"
  },
  {
    "id": "fw-1802",
    "name": "side-lat-stretch",
    "nameZh": "侧向背阔肌拉伸",
    "bodyPart": "背部",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/1802?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/1802.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-4334",
    "name": "side-plank-oblique-crunch",
    "nameZh": "侧支撑卷腹",
    "bodyPart": "腰部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4334?w=1024&h=576",
    "tip": "不要让颈部主导动作",
    "source": "fitwill"
  },
  {
    "id": "fw-3503",
    "name": "elbow-to-knee-side-plank-crunches",
    "nameZh": "侧支撑肘膝卷腹",
    "bodyPart": "腰部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3503?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3503.mp4",
    "tip": "不要用上侧手猛拉头部",
    "source": "fitwill"
  },
  {
    "id": "fw-1495",
    "name": "oblique-crunch-version-2",
    "nameZh": "侧腹卷腹 2.0",
    "bodyPart": "腰部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/1495?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/1495.mp4",
    "tip": "保持脑后的支撑手轻盈；肋骨闭合时向心收缩时吐气，下放时回位时吸气，以保持动作平稳",
    "source": "fitwill"
  },
  {
    "id": "fw-3936",
    "name": "elbow-to-knee-side-plank-crunch",
    "nameZh": "侧支撑肘膝相触卷腹",
    "bodyPart": "腰部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3936?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3936.mp4",
    "tip": "保持肘部在肩部正下方",
    "source": "fitwill"
  },
  {
    "id": "fw-6022",
    "name": "lying-alternate-frog-kick",
    "nameZh": "俯卧交替蛙式踢腿",
    "bodyPart": "臀部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/6022?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/6022.mp4",
    "tip": "保持颈部放松，每次抬腿时向心收缩时吐气，放下腿时回位时吸气；保持抬腿幅度较小",
    "source": "fitwill"
  },
  {
    "id": "fw-1179",
    "name": "flutter-kicks-version-2",
    "nameZh": "俯卧交替踢腿（版本 2）",
    "bodyPart": "臀部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/1179?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/1179.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-4779",
    "name": "reverse-flutter-kick-on-floor-hand-under-head",
    "nameZh": "俯卧反向交替踢腿（手垫额头）",
    "bodyPart": "臀部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4779?w=1024&h=576",
    "tip": "保持踢腿幅度较小",
    "source": "fitwill"
  },
  {
    "id": "fw-4125",
    "name": "dumbbell-face-down-lying-shoulder-press",
    "nameZh": "俯卧哑铃推举",
    "bodyPart": "肩部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4125?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4125.mp4",
    "tip": "开始时重量要比你意念集中在的轻；保持额头和颈部放松",
    "source": "fitwill"
  },
  {
    "id": "fw-2895",
    "name": "front-plank-with-arm-lift-push-up-position",
    "nameZh": "俯卧撑姿势前平板支撑抬臂",
    "bodyPart": "腰部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/2895?w=1024&h=576",
    "tip": "在每次重复前收紧核心；保持每次重复呼吸一致",
    "source": "fitwill"
  },
  {
    "id": "fw-4961",
    "name": "dumbbell-prone-triceps-kickback",
    "nameZh": "俯卧哑铃臂屈伸",
    "bodyPart": "上臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "triceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4961?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4961.mp4",
    "tip": "哑铃移动时保持上臂静止；在顶部收紧肱三头肌并稍作停顿，肩膀下沉或拱起下背部",
    "source": "fitwill"
  },
  {
    "id": "fw-8627",
    "name": "push-up-plank-jack-burpee",
    "nameZh": "俯卧撑平板开合跳波比",
    "bodyPart": "全身",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "cardio",
    "image": "https://fitwill.app/api/image/8627?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8627.mp4",
    "tip": "用前脚掌轻柔落地，膝盖略松，然后立即衔接下一次动作",
    "source": "fitwill"
  },
  {
    "id": "fw-6537",
    "name": "push-up-pull",
    "nameZh": "俯卧撑拉伸",
    "bodyPart": "胸部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/6537?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/6537.mp4",
    "tip": "推起和拉伸时向心收缩时吐气，下沉和触碰时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-5378",
    "name": "roll-front-shoulder-and-chest-lying-on-floor",
    "nameZh": "俯卧泡沫轴滚压前肩与胸部",
    "bodyPart": "胸部",
    "equipment": "foam roll",
    "equipmentCn": "滚轴",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/5378?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/5378.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-3209",
    "name": "lying-back-extension-with-press",
    "nameZh": "俯卧背部伸展加推举",
    "bodyPart": "臀部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3209?w=1024&h=576",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-9038",
    "name": "lying-lat-row",
    "nameZh": "俯卧背阔划船",
    "bodyPart": "背部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9038?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9038.mp4",
    "tip": "手肘向下向后拉时向心收缩时吐气，手臂伸回头顶时回位时吸气；不要让下巴朝天花板抬起",
    "source": "fitwill"
  },
  {
    "id": "fw-6023",
    "name": "lying-frog-kick",
    "nameZh": "俯卧蛙式踢腿",
    "bodyPart": "臀部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/6023?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/6023.mp4",
    "tip": "最高点应该感觉到臀部收紧，而不是腘绳肌抽筋或腰部收紧",
    "source": "fitwill"
  },
  {
    "id": "fw-1790",
    "name": "assisted-pulling-arms-in-prone-position-chest-stretch",
    "nameZh": "俯卧辅助拉伸手臂胸部拉伸",
    "bodyPart": "胸部",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/1790?w=1024&h=576",
    "tip": "助手应缓慢增加活动范围",
    "source": "fitwill"
  },
  {
    "id": "fw-1055",
    "name": "lying-prone-abdominal-stretch",
    "nameZh": "俯卧腹部拉伸",
    "bodyPart": "腰部",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/1055?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/1055.mp4",
    "tip": "保持骨盆前侧贴在垫子上",
    "source": "fitwill"
  },
  {
    "id": "fw-8546",
    "name": "lying-prone-y-to-t-to-w",
    "nameZh": "俯卧Y-T-W肩背训练",
    "bodyPart": "上背部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "traps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8546?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8546.mp4",
    "tip": "全程平稳呼吸,抬起时向心收缩时吐气,手臂回落时回位时吸气,任何时候都别全程憋气；注意Y形阶段肩膀下沉",
    "source": "fitwill"
  },
  {
    "id": "fw-2343",
    "name": "bent-over-row-back-wrong-right",
    "nameZh": "俯身划船背部错误与正确示范",
    "bodyPart": "背部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/2343?w=1024&h=576",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-9895",
    "name": "bent-over-single-arm-wrist-flexors-stretch",
    "nameZh": "俯身单臂腕屈肌拉伸",
    "bodyPart": "前臂",
    "equipment": "other",
    "equipmentCn": "平凳",
    "primaryMuscles": [
      "forearms"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/9895?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9895.mp4",
    "tip": "别让在末端范围弹动",
    "source": "fitwill"
  },
  {
    "id": "fw-8896",
    "name": "bent-over-back-extension-scapular-adduction",
    "nameZh": "俯身背部伸展肩胛内收",
    "bodyPart": "下背部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8896?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8896.mp4",
    "tip": "不要弓着背进入前屈然后整套动作里始终弓背",
    "source": "fitwill"
  },
  {
    "id": "fw-9805",
    "name": "inversion-bench-crunch",
    "nameZh": "倒挂板卷腹",
    "bodyPart": "核心",
    "equipment": "other",
    "equipmentCn": "其他",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9805?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9805.mp4",
    "tip": "一开始不要加额外负重",
    "source": "fitwill"
  },
  {
    "id": "fw-8503",
    "name": "offset-leg-push-up",
    "nameZh": "偏移抬腿俯卧撑",
    "bodyPart": "胸部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8503?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8503.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-10962",
    "name": "ab-roller-crunch",
    "nameZh": "健腹架卷腹",
    "bodyPart": "核心",
    "equipment": "other",
    "equipmentCn": "其他",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10962?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10962.mp4",
    "tip": "让头部沉沉地靠在垫子上",
    "source": "fitwill"
  },
  {
    "id": "fw-1340",
    "name": "exercise-ball-lower-back-prone-stretch",
    "nameZh": "健身球俯卧下背部拉伸",
    "bodyPart": "背部",
    "equipment": "exercise ball",
    "equipmentCn": "健身球",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/1340?w=1024&h=576",
    "tip": "指尖保持轻微的伸展感",
    "source": "fitwill"
  },
  {
    "id": "fw-9814",
    "name": "dumbbell-hammer-press-on-exercise-ball",
    "nameZh": "健身球哑铃锤式推举",
    "bodyPart": "胸部",
    "equipment": "exercise ball",
    "equipmentCn": "健身球",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9814?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9814.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-1681",
    "name": "dumbbell-two-arm-seated-hammer-curl-on-exercise-ball",
    "nameZh": "健身球坐姿双臂哑铃锤式弯举",
    "bodyPart": "前臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "forearms"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/1681?w=1024&h=576",
    "tip": "在最高点附近进行短暂收紧，不要后仰或耸肩；保持肘部靠近身体两侧",
    "source": "fitwill"
  },
  {
    "id": "fw-3690",
    "name": "dumbbell-seated-on-exercise-ball-shoulder-press",
    "nameZh": "健身球坐姿哑铃推举",
    "bodyPart": "肩部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3690?w=1024&h=576",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-2469",
    "name": "exercise-ball-frog-crunch",
    "nameZh": "健身球青蛙式卷腹",
    "bodyPart": "腰部",
    "equipment": "exercise ball",
    "equipmentCn": "健身球",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/2469?w=1024&h=576",
    "tip": "卷腹时，双腿持续收紧健身球，使其保持在原位",
    "source": "fitwill"
  },
  {
    "id": "fw-5036",
    "name": "exercise-ball-leg-curl",
    "nameZh": "健身球腿弯举",
    "bodyPart": "大腿",
    "equipment": "exercise ball",
    "equipmentCn": "健身球",
    "primaryMuscles": [
      "hamstrings"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/5036?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/5036.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-4104",
    "name": "trap-bar-bent-over-row",
    "nameZh": "六角杠铃俯身划船",
    "bodyPart": "背部",
    "equipment": "barbell",
    "equipmentCn": "陷阱杠",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4104?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4104.mp4",
    "tip": "保持躯干角度固定",
    "source": "fitwill"
  },
  {
    "id": "fw-8481",
    "name": "air-pillow-crunch",
    "nameZh": "充气枕卷腹",
    "bodyPart": "核心",
    "equipment": "other",
    "equipmentCn": "其他",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8481?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8481.mp4",
    "tip": "整套动作里始终平稳呼吸：卷起时向心收缩时吐气，控制下放时回位时吸气；不要用手拉扯头部",
    "source": "fitwill"
  },
  {
    "id": "fw-5304",
    "name": "trap-bar-squat",
    "nameZh": "六角杠铃深蹲",
    "bodyPart": "大腿",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/5304?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/5304.mp4",
    "tip": "让膝盖向前移动",
    "source": "fitwill"
  },
  {
    "id": "fw-4105",
    "name": "trap-bar-deadlift-from-deficit",
    "nameZh": "六角杠铃垫高硬拉",
    "bodyPart": "臀部",
    "equipment": "barbell",
    "equipmentCn": "陷阱杠",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4105?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4105.mp4",
    "tip": "意念集中在推开平台而不是猛拉把手",
    "source": "fitwill"
  },
  {
    "id": "fw-4103",
    "name": "trap-bar-standing-shrug",
    "nameZh": "六角杠铃站姿耸肩",
    "bodyPart": "背部",
    "equipment": "barbell",
    "equipmentCn": "陷阱杠",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4103?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4103.mp4",
    "tip": "不要在顶部转动肩膀",
    "source": "fitwill"
  },
  {
    "id": "fw-7287",
    "name": "trap-bar-overhead-press",
    "nameZh": "六角杠铃过顶推举",
    "bodyPart": "肩部",
    "equipment": "barbell",
    "equipmentCn": "陷阱杠",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7287?w=1024&h=576",
    "tip": "在开始推举前，收紧核心，收紧臀部，并保持肋骨下压；将肋骨外翻视为警告信号",
    "source": "fitwill"
  },
  {
    "id": "fw-8016",
    "name": "glute-single-leg-bridge-from-bench",
    "nameZh": "凳上单腿臀桥",
    "bodyPart": "臀肌",
    "equipment": "other",
    "equipmentCn": "平凳",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8016?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8016.mp4",
    "tip": "向上蹬起时向心收缩时吐气，下放时回位时吸气，别让整组动作都憋着气",
    "source": "fitwill"
  },
  {
    "id": "fw-10819",
    "name": "split-stance-single-leg-calf-raise",
    "nameZh": "分腿站姿单腿提踵",
    "bodyPart": "小腿",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "calves"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10819?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10819.mp4",
    "tip": "前脚掌保持完全贴平；用前脚掌撑起时向心收缩时吐气，脚跟回落时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-8111",
    "name": "inverse-leg-curl-with-bench-pads",
    "nameZh": "凳垫反向腿弯举",
    "bodyPart": "腿部",
    "equipment": "other",
    "equipmentCn": "长凳",
    "primaryMuscles": [
      "hamstrings"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8111?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8111.mp4",
    "tip": "不要让动作变成自由落体",
    "source": "fitwill"
  },
  {
    "id": "fw-7645",
    "name": "split-jump-twist-row",
    "nameZh": "分腿跳转体划船",
    "bodyPart": "腿部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "plyometrics",
    "image": "https://fitwill.app/api/image/7645?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7645.mp4",
    "tip": "起跳时向心收缩时吐气，而不是落地时向心收缩时吐气",
    "source": "fitwill"
  },
  {
    "id": "fw-8960",
    "name": "split-squat-heel-raise",
    "nameZh": "分腿蹲提踵",
    "bodyPart": "腿部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8960?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8960.mp4",
    "tip": "保持体重分布稳定",
    "source": "fitwill"
  },
  {
    "id": "fw-1903",
    "name": "hip-abduction-with-flexion-in-front-stretch",
    "nameZh": "前屈外展髋部拉伸",
    "bodyPart": "臀部",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/1903?w=1024&h=576",
    "tip": "保持骨盆主要指向前方；在每次保持的底部尝试长向心收缩时吐气",
    "source": "fitwill"
  },
  {
    "id": "fw-1794",
    "name": "reach-forward-upper-back-stretch",
    "nameZh": "前伸上背部拉伸",
    "bodyPart": "背部",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/1794?w=1024&h=576",
    "tip": "别让强行拉伸至无痛范围之外；保持动作缓慢且刻意",
    "source": "fitwill"
  },
  {
    "id": "fw-8952",
    "name": "forward-bend-back-stretch",
    "nameZh": "前屈背部拉伸",
    "bodyPart": "背部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/8952?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8952.mp4",
    "tip": "别让在最底部锁死膝盖；让重力来抬起手臂",
    "source": "fitwill"
  },
  {
    "id": "fw-2896",
    "name": "front-plank-with-arm-and-leg-lift",
    "nameZh": "前平板支撑加手臂与腿部抬起",
    "bodyPart": "腰部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/2896?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/2896.mp4",
    "tip": "在每次重复前收紧核心；保持每次重复的呼吸一致",
    "source": "fitwill"
  },
  {
    "id": "fw-2890",
    "name": "front-plank-to-push-up",
    "nameZh": "前平板支撑转俯卧撑",
    "bodyPart": "腰部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/2890?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/2890.mp4",
    "tip": "保持推举平稳",
    "source": "fitwill"
  },
  {
    "id": "fw-2898",
    "name": "front-plank-with-leg-lift",
    "nameZh": "前平板支撑抬腿",
    "bodyPart": "腰部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/2898?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/2898.mp4",
    "tip": "别让锁死肘部或耸肩",
    "source": "fitwill"
  },
  {
    "id": "fw-7784",
    "name": "dumbbell-split-squat-front-foot-elevanted",
    "nameZh": "前脚垫高哑铃分腿蹲",
    "bodyPart": "腿部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7784?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7784.mp4",
    "tip": "每次下蹲时回位时吸气，向上站起时向心收缩时吐气；不要在拉伸位借力弹起",
    "source": "fitwill"
  },
  {
    "id": "fw-11034",
    "name": "kettlebell-split-squat-front-foot-elevanted",
    "nameZh": "前脚垫高壶铃分腿蹲",
    "bodyPart": "腿部",
    "equipment": "kettlebells",
    "equipmentCn": "壶铃",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/11034?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11034.mp4",
    "tip": "轻轻把肩胛骨下沉后收，别让壶铃把你前后拉扯；不要让后膝重重砸向地面",
    "source": "fitwill"
  },
  {
    "id": "fw-6013",
    "name": "front-leg-kick",
    "nameZh": "前踢腿",
    "bodyPart": "爆发力训练",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "cardio"
    ],
    "secondaryMuscles": [],
    "category": "plyometrics",
    "image": "https://fitwill.app/api/image/6013?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/6013.mp4",
    "tip": "保持支撑膝盖略松但不要过度弯曲；不要将膝盖猛然锁死",
    "source": "fitwill"
  },
  {
    "id": "fw-10957",
    "name": "forearms-plank-with-shoulder-protraction",
    "nameZh": "前臂平板支撑肩胛前伸",
    "bodyPart": "核心",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10957?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10957.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-7845",
    "name": "half-plyo-squat-core-shift",
    "nameZh": "半程弹跳深蹲转髋",
    "bodyPart": "爆发力训练",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "plyometrics",
    "image": "https://fitwill.app/api/image/7845?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7845.mp4",
    "tip": "整套动作里始终头部和胸口朝前",
    "source": "fitwill"
  },
  {
    "id": "fw-8299",
    "name": "cable-half-kneeling-single-arm-row-version-2",
    "nameZh": "半跪绳索单臂划船（版本 2）",
    "bodyPart": "背部",
    "equipment": "cable",
    "equipmentCn": "拉力器手柄",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8299?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8299.mp4",
    "tip": "拉动把手时向心收缩时吐气，控制回放时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-6761",
    "name": "half-pigeon-hip-stretch",
    "nameZh": "半鸽式髋部拉伸",
    "bodyPart": "臀部",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/6761?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/6761.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-2935",
    "name": "half-kneeling-pvc-pec-mobilization-stretch",
    "nameZh": "半跪姿PVC管胸肌松动拉伸",
    "bodyPart": "胸部",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/2935?w=1024&h=576",
    "tip": "受控地将PVC管带回预备姿势，返回时保持肋骨不外翻",
    "source": "fitwill"
  },
  {
    "id": "fw-4070",
    "name": "barbell-bench-press-with-1-board",
    "nameZh": "单板杠铃卧推",
    "bodyPart": "胸部",
    "equipment": "barbell",
    "equipmentCn": "杠铃",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4070?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4070.mp4",
    "tip": "不要从木板上弹起；下放前回位时吸气，在木板上绷紧腰腹稳住躯干，推起通过粘滞点时向心收缩时吐气",
    "source": "fitwill"
  },
  {
    "id": "fw-1925",
    "name": "single-heel-drop-calf-stretch",
    "nameZh": "单脚后跟下沉小腿拉伸",
    "bodyPart": "小腿",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "calves"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/1925?w=1024&h=576",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-10924",
    "name": "chest-dip-on-pull-up-bar",
    "nameZh": "单杠架胸肌臂屈伸",
    "bodyPart": "胸部",
    "equipment": "other",
    "equipmentCn": "引体向上杠",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10924?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10924.mp4",
    "tip": "整套动作里始终躯干前倾角度不变",
    "source": "fitwill"
  },
  {
    "id": "fw-4690",
    "name": "leg-over-knee-glute-bridge",
    "nameZh": "单腿交叉臀桥",
    "bodyPart": "臀部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4690?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4690.mp4",
    "tip": "别让让交叉的膝盖向外漂移",
    "source": "fitwill"
  },
  {
    "id": "fw-3493",
    "name": "single-leg-low-box-squat",
    "nameZh": "单腿低箱深蹲",
    "bodyPart": "臀部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3493?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3493.mp4",
    "tip": "最后夹紧臀肌并伸直髋关节和膝关节，但关节别完全锁死",
    "source": "fitwill"
  },
  {
    "id": "fw-6001",
    "name": "single-straight-leg-glute-bridge-hold-left-side",
    "nameZh": "单腿伸直臀桥保持（左侧）",
    "bodyPart": "臀部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/6001?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/6001.mp4",
    "tip": "保持伸直的腿长且静止；保持骨盆水平",
    "source": "fitwill"
  },
  {
    "id": "fw-4790",
    "name": "single-leg-bench-squat",
    "nameZh": "单腿凳上深蹲",
    "bodyPart": "大腿",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4790?w=1024&h=576",
    "tip": "不要重重地坐在座椅上；保持双臂平直且静止",
    "source": "fitwill"
  },
  {
    "id": "fw-2473",
    "name": "glute-bridge-one-leg-on-bench",
    "nameZh": "单腿凳上臀桥",
    "bodyPart": "臀部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/2473?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/2473.mp4",
    "tip": "在顶部用力收紧臀部，不要过度拱起下背部；保持悬空的腿弯曲并抬起",
    "source": "fitwill"
  },
  {
    "id": "fw-5052",
    "name": "single-leg-calf-raise-off-step",
    "nameZh": "单腿台阶提踵",
    "bodyPart": "小腿",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "calves"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/5052?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/5052.mp4",
    "tip": "在顶部收紧片刻，同时保持脚踝挺直；每次重复动作时，上升向心收缩时吐气，回落回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-8467",
    "name": "single-lean-back-quadriceps-stretch",
    "nameZh": "单腿后仰股四头肌拉伸",
    "bodyPart": "大腿",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/8467?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8467.mp4",
    "tip": "不要让跪地的膝盖向外翻",
    "source": "fitwill"
  },
  {
    "id": "fw-1578",
    "name": "one-leg-quarter-squat",
    "nameZh": "单腿四分之一深蹲",
    "bodyPart": "大腿",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/1578?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/1578.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-4364",
    "name": "single-leg-dip-on-floor",
    "nameZh": "单腿地面臂屈伸",
    "bodyPart": "上臂",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "triceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4364?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4364.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-5167",
    "name": "single-leg-glute-bridge-with-external-rotation",
    "nameZh": "单腿外旋臀桥",
    "bodyPart": "臀部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/5167?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/5167.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-4931",
    "name": "single-leg-calve-stretch",
    "nameZh": "单腿小腿拉伸",
    "bodyPart": "小腿",
    "equipment": "other",
    "equipmentCn": "其他",
    "primaryMuscles": [
      "calves"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/4931?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4931.mp4",
    "tip": "在保持姿势时向心收缩时吐气，以减少小腿的紧张感",
    "source": "fitwill"
  },
  {
    "id": "fw-2475",
    "name": "glute-bridge-one-leg-on-floor-bent-knee",
    "nameZh": "单腿屈膝臀桥",
    "bodyPart": "臀部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/2475?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/2475.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-1906",
    "name": "abduction-of-one-leg-flexion-stretch",
    "nameZh": "单腿屈曲外展拉伸",
    "bodyPart": "大腿",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/1906?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/1906.mp4",
    "tip": "保持骨盆基本端正；在底部不要弹动",
    "source": "fitwill"
  },
  {
    "id": "fw-4168",
    "name": "jump-pistol-squat-box",
    "nameZh": "单腿手枪深蹲跳箱",
    "bodyPart": "爆发力训练",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "cardio"
    ],
    "secondaryMuscles": [],
    "category": "plyometrics",
    "image": "https://fitwill.app/api/image/4168?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4168.mp4",
    "tip": "下蹲时回位时吸气，从地面向心收缩跳跃时向心收缩时吐气",
    "source": "fitwill"
  },
  {
    "id": "fw-0667",
    "name": "raise-single-leg-push-up",
    "nameZh": "单腿抬高俯卧撑",
    "bodyPart": "胸部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0667?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0667.mp4",
    "tip": "保持抬起的腿伸直并用力；不要让肘部直接向外张开",
    "source": "fitwill"
  },
  {
    "id": "fw-4044",
    "name": "single-leg-glute-bridge-with-knee-to-chest",
    "nameZh": "单腿抱膝臀桥",
    "bodyPart": "臀部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4044?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4044.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-10754",
    "name": "single-leg-calf-jump",
    "nameZh": "单腿提踵跳",
    "bodyPart": "小腿",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "calves"
    ],
    "secondaryMuscles": [],
    "category": "plyometrics",
    "image": "https://fitwill.app/api/image/10754?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10754.mp4",
    "tip": "保持组数短而利落",
    "source": "fitwill"
  },
  {
    "id": "fw-0732",
    "name": "single-leg-squat-pistol",
    "nameZh": "单腿深蹲（手枪蹲）",
    "bodyPart": "臀部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0732?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0732.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-2375",
    "name": "single-leg-squat-with-support",
    "nameZh": "单腿支撑深蹲",
    "bodyPart": "大腿",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/2375?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/2375.mp4",
    "tip": "保持悬空腿在身前",
    "source": "fitwill"
  },
  {
    "id": "fw-4794",
    "name": "single-leg-jumping-glute-bridge",
    "nameZh": "单腿爆发式臀桥",
    "bodyPart": "爆发力训练",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "cardio"
    ],
    "secondaryMuscles": [],
    "category": "plyometrics",
    "image": "https://fitwill.app/api/image/4794?w=1024&h=576",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-3435",
    "name": "single-leg-hip-bridge-straight-leg",
    "nameZh": "单腿直腿臀桥",
    "bodyPart": "臀部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3435?w=1024&h=576",
    "tip": "保持两侧髋骨朝上",
    "source": "fitwill"
  },
  {
    "id": "fw-3585",
    "name": "single-leg-deadlift-with-knee-lift",
    "nameZh": "单腿硬拉提膝",
    "bodyPart": "臀部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3585?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3585.mp4",
    "tip": "保持髋部水平",
    "source": "fitwill"
  },
  {
    "id": "fw-5198",
    "name": "single-straight-leg-glute-bridge-hold",
    "nameZh": "单腿直腿臀桥保持",
    "bodyPart": "臀部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/5198?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/5198.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-3494",
    "name": "single-leg-heel-touch-squat",
    "nameZh": "单腿脚后跟触地深蹲",
    "bodyPart": "臀部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3494?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3494.mp4",
    "tip": "通过脚后跟和脚掌中部向心收缩站起，在顶部收紧臀部，但不要向后倾斜",
    "source": "fitwill"
  },
  {
    "id": "fw-4792",
    "name": "single-leg-hip-thrust-version-2",
    "nameZh": "单腿臀桥（版本 2）",
    "bodyPart": "臀部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4792?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4792.mp4",
    "tip": "在顶部稍作停顿，收紧向心收缩侧的臀部；顶部不要过度拱背",
    "source": "fitwill"
  },
  {
    "id": "fw-9359",
    "name": "single-leg-hamstring-bridge",
    "nameZh": "单腿腘绳肌臀桥",
    "bodyPart": "大腿",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "hamstrings"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9359?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9359.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-10312",
    "name": "single-leg-hinge-to-hip-flexor-reach",
    "nameZh": "单腿髋铰链接髋屈肌伸展",
    "bodyPart": "臀部",
    "equipment": "other",
    "equipmentCn": "平凳",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10312?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10312.mp4",
    "tip": "先重新收紧骨盆、收紧后侧臀部，再把手臂举起来",
    "source": "fitwill"
  },
  {
    "id": "fw-1203",
    "name": "one-arm-inner-biceps-cable-curl",
    "nameZh": "单臂绳索内侧二头肌弯举",
    "bodyPart": "上臂",
    "equipment": "cable",
    "equipmentCn": "拉力器",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/1203?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/1203.mp4",
    "tip": "弯举时向心收缩时吐气，回到预备姿势时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-5096",
    "name": "single-arm-overhead-dumbbell-squat",
    "nameZh": "单臂哑铃过顶深蹲",
    "bodyPart": "大腿",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/5096?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/5096.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-0189",
    "name": "single-arm-cable-rows",
    "nameZh": "单臂绳索划船",
    "bodyPart": "背部",
    "equipment": "cable",
    "equipmentCn": "拉力器",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0189?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0189.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-7888",
    "name": "single-arm-scapular-push-up-to-rotation",
    "nameZh": "单臂肩胛俯卧撑加转体",
    "bodyPart": "肩部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7888?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7888.mp4",
    "tip": "推地和旋转时向心收缩时吐气，肩胛骨回落时回位时吸气；如果是手臂在向心收缩，肩胛骨就没有在工作",
    "source": "fitwill"
  },
  {
    "id": "fw-1976",
    "name": "one-arm-shoulder-flexor-stretch",
    "nameZh": "单臂肩屈肌拉伸",
    "bodyPart": "肩部",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/1976?w=1024&h=576",
    "tip": "保持胸骨稳定",
    "source": "fitwill"
  },
  {
    "id": "fw-2656",
    "name": "one-arm-bayesian-cable-biceps-curl",
    "nameZh": "单臂贝叶斯绳索二头肌弯举",
    "bodyPart": "上臂",
    "equipment": "cable",
    "equipmentCn": "拉力器",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/2656?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/2656.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-1801",
    "name": "one-arm-lat-stretch",
    "nameZh": "单臂背阔肌拉伸",
    "bodyPart": "背部",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/1801?w=1024&h=576",
    "tip": "别让强行拉伸至无痛范围之外；保持动作缓慢且刻意",
    "source": "fitwill"
  },
  {
    "id": "fw-4332",
    "name": "crunch-hold",
    "nameZh": "卷腹保持",
    "bodyPart": "腰部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4332?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4332.mp4",
    "tip": "保持长凳支撑是被动的；下背部应保持靠近地面",
    "source": "fitwill"
  },
  {
    "id": "fw-9054",
    "name": "walking-on-spot-small-kick",
    "nameZh": "原地小踢腿行进",
    "bodyPart": "腿部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9054?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9054.mp4",
    "tip": "注意抬膝时身体不要后仰",
    "source": "fitwill"
  },
  {
    "id": "fw-11633",
    "name": "medicine-ball-marching-on-spot",
    "nameZh": "原地药球高抬腿",
    "bodyPart": "腿部",
    "equipment": "medicine ball",
    "equipmentCn": "药球",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/11633?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11633.mp4",
    "tip": "整套动作里始终原地不动；把球拉回来，重新收紧腹肌",
    "source": "fitwill"
  },
  {
    "id": "fw-8400",
    "name": "marching-kick-on-spot",
    "nameZh": "原地踢腿踏步",
    "bodyPart": "腿部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8400?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8400-front-pov.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-1501",
    "name": "band-side-plank-row-with-partner",
    "nameZh": "双人弹力带侧支撑划船",
    "bodyPart": "背部",
    "equipment": "bands",
    "equipmentCn": "弹力带",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/1501?w=1024&h=576",
    "tip": "使用比你意念集中在中更轻的弹力带张力",
    "source": "fitwill"
  },
  {
    "id": "fw-2534",
    "name": "kettlebell-double-push-press",
    "nameZh": "双壶铃推举",
    "bodyPart": "肩部",
    "equipment": "kettlebells",
    "equipmentCn": "壶铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/2534?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/2534.mp4",
    "tip": "在每次重复前收紧核心；保持每次重复的呼吸一致",
    "source": "fitwill"
  },
  {
    "id": "fw-9841",
    "name": "kettlebell-double-rack-squat",
    "nameZh": "双壶铃架式深蹲",
    "bodyPart": "腿部",
    "equipment": "kettlebells",
    "equipmentCn": "壶铃",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9841?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9841.mp4",
    "tip": "手腕应保持中立；保持目光向前或微微向上",
    "source": "fitwill"
  },
  {
    "id": "fw-9843",
    "name": "kettlebell-double-strict-press",
    "nameZh": "双壶铃严格推举",
    "bodyPart": "肩部",
    "equipment": "kettlebells",
    "equipmentCn": "壶铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9843?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9843.mp4",
    "tip": "推起时向心收缩时吐气，在顶端或回落阶段回位时吸气，让躯干整套动作里始终紧绷；推举时用力夹紧臀肌和股四头肌",
    "source": "fitwill"
  },
  {
    "id": "fw-9382",
    "name": "hands-up-butt-kick",
    "nameZh": "双手上举后踢腿跑",
    "bodyPart": "腿部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9382?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9382.mp4",
    "tip": "全程呼吸平稳，保持一致的回位时吸气和向心收缩时吐气节奏，别全程憋气",
    "source": "fitwill"
  },
  {
    "id": "fw-4069",
    "name": "barbell-bench-press-with-2-board",
    "nameZh": "双木板杠铃卧推",
    "bodyPart": "胸部",
    "equipment": "barbell",
    "equipmentCn": "杠铃",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4069?w=1024&h=576",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-4775",
    "name": "push-up-and-triceps-dip-on-parallel-bars",
    "nameZh": "双杠俯卧撑与臂屈伸",
    "bodyPart": "胸部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4775?w=1024&h=576",
    "tip": "不要在底部利用惯性反弹",
    "source": "fitwill"
  },
  {
    "id": "fw-5477",
    "name": "vertical-leg-raise-on-parallel-bars",
    "nameZh": "双杠垂直举腿",
    "bodyPart": "臀部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/5477?w=1024&h=576",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-1989",
    "name": "depression-in-parallel-bars-stretch",
    "nameZh": "双杠支撑肩胛下压拉伸",
    "bodyPart": "背部",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/1989?w=1024&h=576",
    "tip": "防止肋骨外翻，别让将动作变成下背部反弓",
    "source": "fitwill"
  },
  {
    "id": "fw-10101",
    "name": "frog-crunch-feet-together",
    "nameZh": "双脚并拢青蛙卷腹",
    "bodyPart": "核心",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10101?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10101.mp4",
    "tip": "在折叠的最高点稍作停顿，收紧下腹部；别让把下巴拉向胸口",
    "source": "fitwill"
  },
  {
    "id": "fw-1500",
    "name": "band-upright-row-under-two-feet",
    "nameZh": "双脚踩弹力带直立划船",
    "bodyPart": "肩部",
    "equipment": "bands",
    "equipmentCn": "弹力带",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/1500?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/1500.mp4",
    "tip": "每次重复动作时，拉起时向心收缩时吐气，放下时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-8491",
    "name": "leg-stretched-open-toes-together-knees-together",
    "nameZh": "双腿伸直张开拉伸（脚尖并拢、膝盖并拢）",
    "bodyPart": "腿部",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/8491?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8491.mp4",
    "tip": "双腿打开时向心收缩时吐气，收回时保持平稳呼吸；别让在最深的位置憋气",
    "source": "fitwill"
  },
  {
    "id": "fw-8439",
    "name": "double-lean-back-quadriceps-stretch",
    "nameZh": "双腿后仰股四头肌拉伸",
    "bodyPart": "大腿",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/8439?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8439.mp4",
    "tip": "后仰姿势中保持颈部中立",
    "source": "fitwill"
  },
  {
    "id": "fw-2472",
    "name": "glute-bridge-two-legs-on-bench",
    "nameZh": "双腿支撑凳上臀桥",
    "bodyPart": "臀部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/2472?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/2472.mp4",
    "tip": "在开始第一次重复前，收下颚，收紧腹部，保持肋骨对齐",
    "source": "fitwill"
  },
  {
    "id": "fw-3850",
    "name": "two-legs-reverse-biceps-curl-with-towel-version-2",
    "nameZh": "双腿毛巾反向二头肌弯举（版本 2）",
    "bodyPart": "上臂",
    "equipment": "other",
    "equipmentCn": "其他",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3850?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3850.mp4",
    "tip": "保持手腕平直，弯举时向心收缩时吐气，放下时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-3851",
    "name": "two-legs-hammer-curl-with-towel-version-2",
    "nameZh": "双腿毛巾锤式弯举版本 2",
    "bodyPart": "上臂",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3851?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3851.mp4",
    "tip": "全程使用中立的锤式握法；不要让下背部成为向心收缩点",
    "source": "fitwill"
  },
  {
    "id": "fw-10519",
    "name": "cross-arms-front-leg-kick",
    "nameZh": "双臂交叉前踢腿",
    "bodyPart": "腿部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10519?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10519.mp4",
    "tip": "向前踢时向心收缩时吐气，收腿时回位时吸气，保持呼吸平稳，别全程憋气；注意支撑脚不要向外侧翻",
    "source": "fitwill"
  },
  {
    "id": "fw-1799",
    "name": "two-handed-hang-back-stretch-with-training-wall-bars",
    "nameZh": "双臂悬垂背部拉伸（使用训练墙杆）",
    "bodyPart": "背部",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/1799?w=1024&h=576",
    "tip": "别让强行拉伸至无痛范围之外；保持动作缓慢且深思熟虑",
    "source": "fitwill"
  },
  {
    "id": "fw-4727",
    "name": "crunch-arms-on-chest",
    "nameZh": "双臂交叉卷腹",
    "bodyPart": "腰部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4727?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4727.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-4097",
    "name": "reverse-crunch-to-dead-bug",
    "nameZh": "反向卷腹接死虫式",
    "bodyPart": "腰部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4097?w=1024&h=576",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-4019",
    "name": "reverse-crunch-version-2",
    "nameZh": "反向卷腹版本 2",
    "bodyPart": "腰部",
    "equipment": "other",
    "equipmentCn": "其他",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4019?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4019.mp4",
    "tip": "缓慢降低双腿",
    "source": "fitwill"
  },
  {
    "id": "fw-4778",
    "name": "reverse-crunch-version-3",
    "nameZh": "反向卷腹版本 3",
    "bodyPart": "腰部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4778?w=1024&h=576",
    "tip": "膝盖内收时向心收缩时吐气",
    "source": "fitwill"
  },
  {
    "id": "fw-1782",
    "name": "reverse-chest-stretch",
    "nameZh": "反向胸部拉伸",
    "bodyPart": "胸部",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/1782?w=1024&h=576",
    "tip": "别让强行拉伸至无痛范围之外；保持动作缓慢且深思熟虑",
    "source": "fitwill"
  },
  {
    "id": "fw-10317",
    "name": "reverse-plank-leg-lift",
    "nameZh": "反向平板支撑抬腿",
    "bodyPart": "核心",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10317?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10317.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-1971",
    "name": "reverse-shoulder-stretch",
    "nameZh": "反向肩部拉伸",
    "bodyPart": "肩部",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/1971?w=1024&h=576",
    "tip": "保持支撑侧在地面上稳定，别让肩部向耳朵方向耸起；不要让颈部向前伸",
    "source": "fitwill"
  },
  {
    "id": "fw-8804",
    "name": "smith-single-leg-chair-squat",
    "nameZh": "史密斯单腿椅子深蹲",
    "bodyPart": "大腿",
    "equipment": "machine",
    "equipmentCn": "史密斯机",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8804?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8804.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-0886",
    "name": "smith-one-leg-deadlift",
    "nameZh": "史密斯单腿硬拉",
    "bodyPart": "背部",
    "equipment": "machine",
    "equipmentCn": "史密斯机",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0886?w=1024&h=576",
    "tip": "工作腿保持轻微弯曲；保持手臂伸直且放松",
    "source": "fitwill"
  },
  {
    "id": "fw-5225",
    "name": "smith-back-wide-shrug",
    "nameZh": "史密斯机宽距背后耸肩",
    "bodyPart": "背部",
    "equipment": "machine",
    "equipmentCn": "史密斯机",
    "primaryMuscles": [
      "traps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/5225?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/5225.mp4",
    "tip": "杠铃下放时回位时吸气，向上驱动双肩时向心收缩时吐气",
    "source": "fitwill"
  },
  {
    "id": "fw-11217",
    "name": "smith-stiff-legged-deadlift",
    "nameZh": "史密斯机直腿硬拉",
    "bodyPart": "大腿",
    "equipment": "machine",
    "equipmentCn": "史密斯机",
    "primaryMuscles": [
      "hamstrings"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/11217?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11217.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-7710",
    "name": "ring-alternate-reverse-curl",
    "nameZh": "吊环交替反向腿弯举",
    "bodyPart": "大腿",
    "equipment": "other",
    "equipmentCn": "悬挂",
    "primaryMuscles": [
      "hamstrings"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7710?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7710.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-0466",
    "name": "gironda-sternum-chin",
    "nameZh": "吉隆达胸骨引体向上",
    "bodyPart": "背部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0466?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0466.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-7709",
    "name": "ring-single-leg-curl-version-2",
    "nameZh": "吊环单腿弯举（版本2）",
    "bodyPart": "大腿",
    "equipment": "other",
    "equipmentCn": "悬挂",
    "primaryMuscles": [
      "hamstrings"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7709?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7709.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-4820",
    "name": "ring-reverse-ab-rollout",
    "nameZh": "吊环反向腹部卷腹",
    "bodyPart": "腰部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4820?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4820.mp4",
    "tip": "在向外伸展时缓慢移动；在收缩过程中平稳向心收缩时吐气，有助于防止肋骨外翻",
    "source": "fitwill"
  },
  {
    "id": "fw-7872",
    "name": "ring-eccentric-single-leg-curl-with-towel",
    "nameZh": "吊环毛巾单腿离心腿弯举",
    "bodyPart": "大腿",
    "equipment": "other",
    "equipmentCn": "毛巾",
    "primaryMuscles": [
      "hamstrings"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7872?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7872.mp4",
    "tip": "在开始动作之前，收紧腹部，收紧训练腿一侧的臀部；离心阶段别全程憋气",
    "source": "fitwill"
  },
  {
    "id": "fw-10661",
    "name": "ring-resistance-band-assisted-single-arm-pull-up",
    "nameZh": "吊环弹力带辅助单臂引体向上",
    "bodyPart": "上背部",
    "equipment": "bands",
    "equipmentCn": "阻力带",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10661?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10661.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-4819",
    "name": "ring-leg-curl",
    "nameZh": "吊环腿弯举",
    "bodyPart": "大腿",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4819?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4819.mp4",
    "tip": "不要让肋骨在顶点弹出",
    "source": "fitwill"
  },
  {
    "id": "fw-7871",
    "name": "ring-eccentric-leg-curl-with-yoga-block-and-towel",
    "nameZh": "吊环离心腿弯举（瑜伽砖毛巾版）",
    "bodyPart": "大腿",
    "equipment": "other",
    "equipmentCn": "毛巾",
    "primaryMuscles": [
      "hamstrings"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/7871?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7871.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-4912",
    "name": "ring-leg-curl-version-2",
    "nameZh": "吊环腿弯举 2.0版",
    "bodyPart": "大腿",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4912?w=1024&h=576",
    "tip": "保持吊环水平",
    "source": "fitwill"
  },
  {
    "id": "fw-7875",
    "name": "ring-weighted-vest-decline-push-up",
    "nameZh": "吊环负重背心下斜俯卧撑",
    "bodyPart": "胸部",
    "equipment": "other",
    "equipmentCn": "悬挂",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7875?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7875.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-4270",
    "name": "backward-abdominal-stretch",
    "nameZh": "后仰腹部拉伸",
    "bodyPart": "腰部",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/4270?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4270.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-8855",
    "name": "lean-back-tap-ankle-tap",
    "nameZh": "后仰触踝卷腹",
    "bodyPart": "核心",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8855?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8855.mp4",
    "tip": "在触踝点停顿一秒，双脚整套动作里始终悬空；前卷时保持颈部中立",
    "source": "fitwill"
  },
  {
    "id": "fw-8027",
    "name": "stepback-opposite-crunch",
    "nameZh": "后撤步对侧卷腹",
    "bodyPart": "核心",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8027?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8027.mp4",
    "tip": "膝盖和手肘靠近时向心收缩时吐气，放脚回落时回位时吸气；支撑腿膝盖整套动作里始终微屈",
    "source": "fitwill"
  },
  {
    "id": "fw-7659",
    "name": "stepback-opposite-grab",
    "nameZh": "后撤步对侧握腕拉伸",
    "bodyPart": "腰部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/7659?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7659.mp4",
    "tip": "保持前侧膝盖放松微屈；向拉伸位置牵拉时向心收缩时吐气,并保持呼吸的节奏",
    "source": "fitwill"
  },
  {
    "id": "fw-7433",
    "name": "rear-lunge-kickback",
    "nameZh": "后撤步箭步蹲后踢腿",
    "bodyPart": "臀肌",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7433?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7433.mp4",
    "tip": "向上蹬起和后踢时向心收缩时吐气，向下回到箭步蹲时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-0676",
    "name": "reverse-lunge-leg-kick",
    "nameZh": "后撤步箭步蹲踢腿",
    "bodyPart": "大腿",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0676?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0676.mp4",
    "tip": "通过前脚跟和脚掌中部向心收缩站起，起身时收紧支撑腿的臀部",
    "source": "fitwill"
  },
  {
    "id": "fw-8459",
    "name": "backkick-side-step",
    "nameZh": "后踢腿侧步",
    "bodyPart": "臀肌",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8459?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8459.mp4",
    "tip": "每次侧向跨步时向心收缩时吐气，双脚收回并拢时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-4674",
    "name": "hip-flexor-stretch-rear-foot-elevated",
    "nameZh": "后脚抬高式髋屈肌拉伸",
    "bodyPart": "臀部",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/4674?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4674.mp4",
    "tip": "整套动作里始终后侧臀部激活",
    "source": "fitwill"
  },
  {
    "id": "fw-9644",
    "name": "back-kick-heel-touches",
    "nameZh": "后踢腿脚跟触碰",
    "bodyPart": "核心",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9644?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9644.mp4",
    "tip": "向后踢腿并伸手碰脚跟时向心收缩时吐气，回到站立时回位时吸气；让脚跟贴近臀部",
    "source": "fitwill"
  },
  {
    "id": "fw-0146",
    "name": "butt-kicks",
    "nameZh": "后踢腿",
    "bodyPart": "腿部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "hamstrings"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0146?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0146.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-1797",
    "name": "reach-up-back-stretch",
    "nameZh": "向上伸展背部拉伸",
    "bodyPart": "背部",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/1797?w=1024&h=576",
    "tip": "别让强行拉伸至无痛范围之外；保持动作缓慢且刻意",
    "source": "fitwill"
  },
  {
    "id": "fw-8003",
    "name": "dumbbell-3-point-bench-press",
    "nameZh": "哑铃三点卧推",
    "bodyPart": "胸部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8003?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8003.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-9929",
    "name": "lever-single-leg-squat-on-hack-squat-machine",
    "nameZh": "哈克深蹲机杠杆单腿深蹲",
    "bodyPart": "大腿",
    "equipment": "machine",
    "equipmentCn": "杠杆器械",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9929?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9929.mp4",
    "tip": "把手握力保持轻到中等",
    "source": "fitwill"
  },
  {
    "id": "fw-4743",
    "name": "dumbbell-incline-biceps-curl-version-2",
    "nameZh": "哑铃上斜二头肌弯举版本 2",
    "bodyPart": "上臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4743?w=1024&h=576",
    "tip": "在顶部短暂收紧二头肌，肩膀下沉；弯举时向心收缩时吐气，下放时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-3764",
    "name": "dumbbell-incline-biceps-curl",
    "nameZh": "哑铃上斜二头肌弯举",
    "bodyPart": "上臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3764?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3764.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-11407",
    "name": "dumbbell-chest-supported-row",
    "nameZh": "哑铃上斜凳支撑划船",
    "bodyPart": "上背部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/11407?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11407.mp4",
    "tip": "哑铃下放时回位时吸气，每次拉起时平稳向心收缩时吐气",
    "source": "fitwill"
  },
  {
    "id": "fw-4071",
    "name": "dumbbell-incline-one-arm-front-raise-with-chest-support",
    "nameZh": "哑铃上斜单臂前平举（胸部支撑）",
    "bodyPart": "肩部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4071?w=1024&h=576",
    "tip": "在顶部稍作停顿，肩膀下沉或更用力地压向凳子；手臂抬起时向心收缩时吐气，受控下降时回位时吸气，以保持躯干收紧",
    "source": "fitwill"
  },
  {
    "id": "fw-4744",
    "name": "dumbbell-incline-head-supported-row",
    "nameZh": "哑铃上斜头部支撑划船",
    "bodyPart": "背部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4744?w=1024&h=576",
    "tip": "头部只需保持轻微压力",
    "source": "fitwill"
  },
  {
    "id": "fw-11593",
    "name": "dumbbell-incline-wide-grip-bench-press",
    "nameZh": "哑铃上斜宽握卧推",
    "bodyPart": "胸部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/11593?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11593.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-0317",
    "name": "dumbbell-incline-curl-version-2",
    "nameZh": "哑铃上斜弯举版本 2",
    "bodyPart": "上臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0317?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0317.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-5067",
    "name": "dumbbell-incline-squeeze-press",
    "nameZh": "哑铃上斜挤压推举",
    "bodyPart": "上臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/5067?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/5067.mp4",
    "tip": "选择六角哑铃或其他在收紧时保持稳定的形状；保持手腕挺直",
    "source": "fitwill"
  },
  {
    "id": "fw-10604",
    "name": "dumbbell-incline-twist-press-version-2",
    "nameZh": "哑铃上斜旋转推举（版本 2）",
    "bodyPart": "上胸部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10604?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10604.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-4015",
    "name": "dumbbell-incline-close-grip-press-variation",
    "nameZh": "哑铃上斜窄距推举变式",
    "bodyPart": "上臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "triceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4015?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4015.mp4",
    "tip": "保持手腕中立，推举时向心收缩时吐气，下放至下一次动作时回位时吸气；下放阶段保持肘部内收",
    "source": "fitwill"
  },
  {
    "id": "fw-2452",
    "name": "dumbbell-decline-bench-press",
    "nameZh": "哑铃下斜卧推",
    "bodyPart": "胸部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/2452?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/2452.mp4",
    "tip": "在每次重复前收紧核心；保持每次重复的呼吸一致",
    "source": "fitwill"
  },
  {
    "id": "fw-11588",
    "name": "dumbbell-decline-close-grip-press",
    "nameZh": "哑铃下斜窄距卧推",
    "bodyPart": "胸部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/11588?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11588.mp4",
    "tip": "别让在顶端让铃头相撞",
    "source": "fitwill"
  },
  {
    "id": "fw-8004",
    "name": "dumbbell-2-point-bench-press",
    "nameZh": "哑铃两点支撑卧推",
    "bodyPart": "胸部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8004?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8004.mp4",
    "tip": "不要把肘部完全外展到90度",
    "source": "fitwill"
  },
  {
    "id": "fw-11336",
    "name": "dumbbell-srtict-curl",
    "nameZh": "哑铃严格弯举",
    "bodyPart": "手臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/11336?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11336.mp4",
    "tip": "在顶点短暂停顿，用力收紧肱二头肌，然后再开始下放；哑铃上升时肩膀下沉",
    "source": "fitwill"
  },
  {
    "id": "fw-9197",
    "name": "dumbbell-biceps-curl-version-3",
    "nameZh": "哑铃二头弯举（版本 3）",
    "bodyPart": "上臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9197?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9197.mp4",
    "tip": "保持手腕伸直放松",
    "source": "fitwill"
  },
  {
    "id": "fw-4914",
    "name": "dumbbell-deadlift-neutral-grip",
    "nameZh": "哑铃中立握距硬拉",
    "bodyPart": "臀部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4914?w=1024&h=576",
    "tip": "意念集中在用双脚蹬地",
    "source": "fitwill"
  },
  {
    "id": "fw-0294",
    "name": "dumbbell-biceps-curl",
    "nameZh": "哑铃二头肌弯举",
    "bodyPart": "上臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0294?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0294.mp4",
    "tip": "在顶部稍作停顿并收紧二头肌，肩膀下沉或向后倾斜以完成重复；保持手腕位于前臂上方",
    "source": "fitwill"
  },
  {
    "id": "fw-10199",
    "name": "dumbbell-cross-romanian-deadlift",
    "nameZh": "哑铃交叉罗马尼亚硬拉",
    "bodyPart": "臀肌",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "hamstrings"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10199?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10199.mp4",
    "tip": "下探时回位时吸气，起身回到站姿时向心收缩时吐气；别让站立腿膝盖向内扣",
    "source": "fitwill"
  },
  {
    "id": "fw-2646",
    "name": "dumbbell-cross-body-hammer-curl-version-2",
    "nameZh": "哑铃交叉锤式弯举（版本 2）",
    "bodyPart": "上臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/2646?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/2646.mp4",
    "tip": "双脚站开约约与肩宽，膝盖略松，保持肋骨位于骨盆正上方；受控地将哑铃降回预备姿势，直到手臂再次伸直",
    "source": "fitwill"
  },
  {
    "id": "fw-1196",
    "name": "dumbbell-alternate-biceps-curl",
    "nameZh": "哑铃交替二头肌弯举",
    "bodyPart": "上臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/1196?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/1196.mp4",
    "tip": "在顶点短暂收紧，肩膀下沉或让肘部向前漂移；让上臂保持近乎垂直",
    "source": "fitwill"
  },
  {
    "id": "fw-3695",
    "name": "dumbbell-alternate-bench-press-high-start",
    "nameZh": "哑铃交替卧推（高位起始）",
    "bodyPart": "胸部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3695?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3695.mp4",
    "tip": "保持呼吸平稳，下放时回位时吸气，推起哑铃至顶部时向心收缩时吐气",
    "source": "fitwill"
  },
  {
    "id": "fw-2983",
    "name": "dumbbell-alternating-floor-press",
    "nameZh": "哑铃交替地板推举",
    "bodyPart": "胸部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/2983?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/2983.mp4",
    "tip": "在每次重复前收紧核心；保持每次重复的呼吸一致",
    "source": "fitwill"
  },
  {
    "id": "fw-3972",
    "name": "dumbbell-alternate-shoulder-press",
    "nameZh": "哑铃交替肩推",
    "bodyPart": "肩部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3972?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3972.mp4",
    "tip": "让哑铃有控制地回落，而不是直接掉回架位",
    "source": "fitwill"
  },
  {
    "id": "fw-6147",
    "name": "dumbbell-alternate-hammer-srtict-curl",
    "nameZh": "哑铃交替锤式严格弯举",
    "bodyPart": "上臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/6147?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/6147.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-0313",
    "name": "dumbbell-alternating-hammer-curl",
    "nameZh": "哑铃交替锤式弯举",
    "bodyPart": "上臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0313?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0313.mp4",
    "tip": "在顶部稍作停顿，然后有控制地回落哑铃，直到手臂几乎伸直",
    "source": "fitwill"
  },
  {
    "id": "fw-4067",
    "name": "dumbbell-alternate-arnold-press",
    "nameZh": "哑铃交替阿诺德推举",
    "bodyPart": "肩部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4067?w=1024&h=576",
    "tip": "保持稳定的预备姿势可以使训练更严格且平衡",
    "source": "fitwill"
  },
  {
    "id": "fw-4757",
    "name": "dumbbell-staggered-stance-romanian-deadlift",
    "nameZh": "哑铃交错站姿罗马尼亚硬拉",
    "bodyPart": "臀部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4757?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4757.mp4",
    "tip": "保持后脚轻盈；整个过程中保持前膝微屈",
    "source": "fitwill"
  },
  {
    "id": "fw-6891",
    "name": "dumbbell-alternate-z-press",
    "nameZh": "哑铃交替Z字推举",
    "bodyPart": "肩部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/6891?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/6891.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-6799",
    "name": "dumbbell-lying-oblique-v-up",
    "nameZh": "哑铃仰卧侧腹V字起",
    "bodyPart": "腰部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/6799?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/6799.mp4",
    "tip": "保持哑铃在肩部上方，别让让重量摆动到身体中线；折叠时向心收缩时吐气，放下时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-0342",
    "name": "dumbbell-lying-one-arm-press-version-2",
    "nameZh": "哑铃仰卧单臂推举版本 2",
    "bodyPart": "胸部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0342?w=1024&h=576",
    "tip": "保持推举侧肩膀下沉；不要让哑铃触地反弹",
    "source": "fitwill"
  },
  {
    "id": "fw-0343",
    "name": "dumbbell-lying-one-arm-press",
    "nameZh": "哑铃仰卧单臂推举",
    "bodyPart": "胸部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0343?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0343.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-7428",
    "name": "dumbbell-lying-on-floor-chest-press",
    "nameZh": "哑铃仰卧地板卧推",
    "bodyPart": "胸部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7428?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7428.mp4",
    "tip": "在顶端稍作停顿，收紧胸部；推起时向心收缩时吐气，放下哑铃时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-11072",
    "name": "dumbbell-lying-floor-single-arm-hammer-press-with",
    "nameZh": "哑铃仰卧地板单臂锤式推举",
    "bodyPart": "胸部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/11072?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11072.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-10042",
    "name": "dumbbell-lying-floor-squeeze-press",
    "nameZh": "哑铃仰卧地板挤压推举",
    "bodyPart": "胸部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10042?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10042.mp4",
    "tip": "形状不规则的铃片会让收紧更难保持",
    "source": "fitwill"
  },
  {
    "id": "fw-9198",
    "name": "dumbbell-lying-triceps-extension-on-floor-version",
    "nameZh": "哑铃仰卧地板臂屈伸（版本）",
    "bodyPart": "上臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "triceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9198?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9198.mp4",
    "tip": "伸肘时向心收缩时吐气，下放哑铃时回位时吸气；保持上臂垂直，把肘部意念集中在成固定不动的铰链",
    "source": "fitwill"
  },
  {
    "id": "fw-2738",
    "name": "dumbbell-lying-triceps-extension-on-floor",
    "nameZh": "哑铃仰卧地板臂屈伸",
    "bodyPart": "上臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "triceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/2738?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/2738.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-10153",
    "name": "dumbbell-lying-supine-shoulder-external-rotation",
    "nameZh": "哑铃仰卧肩关节外旋",
    "bodyPart": "肩部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10153?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10153.mp4",
    "tip": "把哑铃转回顶端时向心收缩时吐气，向下放到拉伸位置时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-9336",
    "name": "dumbbell-sit-up-to-press",
    "nameZh": "哑铃仰卧起坐推举",
    "bodyPart": "核心",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9336?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9336.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-6328",
    "name": "dumbbell-low-split-squat",
    "nameZh": "哑铃低位分腿蹲",
    "bodyPart": "大腿",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/6328?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/6328.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-5108",
    "name": "dumbbell-wood-chop-squat",
    "nameZh": "哑铃伐木深蹲",
    "bodyPart": "腰部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/5108?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/5108.mp4",
    "tip": "在伐木动作最吃力的部分向心收缩时吐气，回到顶部时回位时吸气；手臂伸直移动重量，别让将动作变成推举或弯举",
    "source": "fitwill"
  },
  {
    "id": "fw-0439",
    "name": "dumbbell-zottman-curl",
    "nameZh": "哑铃佐特曼弯举",
    "bodyPart": "上臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0439?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0439.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-10144",
    "name": "dumbbell-front-hand-to-hand-single-leg-balance",
    "nameZh": "哑铃体前交接单腿平衡",
    "bodyPart": "核心",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10144?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10144.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-5816",
    "name": "dumbbell-one-arm-side-lying-bench-press",
    "nameZh": "哑铃侧卧单臂卧推",
    "bodyPart": "胸部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/5816?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/5816.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-4752",
    "name": "dumbbell-side-bench-squat",
    "nameZh": "哑铃侧向凳上深蹲",
    "bodyPart": "大腿",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4752?w=1024&h=576",
    "tip": "离心阶段应整套动作里始终平稳直到触碰凳面",
    "source": "fitwill"
  },
  {
    "id": "fw-8221",
    "name": "dumbbell-lateral-raise-plank",
    "nameZh": "哑铃侧平举平板支撑",
    "bodyPart": "肩部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8221?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8221.mp4",
    "tip": "整套动作里始终稳定的呼吸：抬起时向心收缩时吐气，下放时回位时吸气，绷紧核心时别全程憋气",
    "source": "fitwill"
  },
  {
    "id": "fw-10953",
    "name": "dumbbell-lateral-raise-back-supported",
    "nameZh": "哑铃侧平举（背部靠墙支撑）",
    "bodyPart": "肩部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10953?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10953.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-7473",
    "name": "dumbbell-side-plank-raise",
    "nameZh": "哑铃侧平板支撑侧平举",
    "bodyPart": "肩部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7473?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7473.mp4",
    "tip": "举起重物时向心收缩时吐气，放下时回位时吸气，整套动作里始终平稳呼吸而不是憋气",
    "source": "fitwill"
  },
  {
    "id": "fw-10041",
    "name": "dumbbell-side-plank-version-2",
    "nameZh": "哑铃侧平板支撑(版本 2)",
    "bodyPart": "核心",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10041?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10041.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-11074",
    "name": "dumbbell-side-plank-clamshell",
    "nameZh": "哑铃侧平板支撑蚌式开合",
    "bodyPart": "臀肌",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "plyometrics",
    "image": "https://fitwill.app/api/image/11074?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11074.mp4",
    "tip": "整套动作里始终平稳呼吸：抬髋开膝时向心收缩时吐气，回到预备姿势时回位时吸气；全程让双脚紧紧贴在一起",
    "source": "fitwill"
  },
  {
    "id": "fw-1553",
    "name": "dumbbell-lateral-lunge-with-bicep-curl",
    "nameZh": "哑铃侧弓步加二头肌弯举",
    "bodyPart": "大腿",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/1553?w=1024&h=576",
    "tip": "保持非向心收缩腿伸直且脚后跟落地",
    "source": "fitwill"
  },
  {
    "id": "fw-4753",
    "name": "dumbbell-side-lunge-with-shoulder-press",
    "nameZh": "哑铃侧弓步加肩推",
    "bodyPart": "大腿",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4753?w=1024&h=576",
    "tip": "弓步时回位时吸气，站起和推举时向心收缩时吐气；不要在弓步底部进行推举",
    "source": "fitwill"
  },
  {
    "id": "fw-9340",
    "name": "dumbbell-russian-twist-to-single-arm-press",
    "nameZh": "哑铃俄罗斯转体接单臂推举",
    "bodyPart": "核心",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9340?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9340.mp4",
    "tip": "上推时向心收缩时吐气,下放和转体时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-4625",
    "name": "dumbbell-russian-twist-close-grip-shoulder-press-sit-up",
    "nameZh": "哑铃俄罗斯转体窄距推举仰卧起坐",
    "bodyPart": "腰部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4625?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4625.mp4",
    "tip": "推举时保持肘部内收",
    "source": "fitwill"
  },
  {
    "id": "fw-10641",
    "name": "dumbbell-prone-incline-flexion-row",
    "nameZh": "哑铃俯卧上斜屈曲划船",
    "bodyPart": "上背部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10641?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10641.mp4",
    "tip": "拉起哑铃时向心收缩时吐气，放下时回位时吸气，保持稳定的节奏，别全程憋气",
    "source": "fitwill"
  },
  {
    "id": "fw-8795",
    "name": "dumbbell-prone-incline-twist-curl",
    "nameZh": "哑铃俯卧上斜旋转弯举",
    "bodyPart": "上臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8795?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8795.mp4",
    "tip": "不要急于完成旋转",
    "source": "fitwill"
  },
  {
    "id": "fw-10640",
    "name": "dumbbell-prone-incline-seal-row",
    "nameZh": "哑铃俯卧上斜海豹划船",
    "bodyPart": "上背部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10640?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10640.mp4",
    "tip": "开始下一次拉动时回位时吸气，在顶点向心收缩时吐气；不要把哑铃拉向胸口",
    "source": "fitwill"
  },
  {
    "id": "fw-3993",
    "name": "dumbbell-push-up-front-raise",
    "nameZh": "哑铃俯卧撑前平举",
    "bodyPart": "胸部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3993?w=1024&h=576",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-4426",
    "name": "dumbbell-lying-wide-grip-row-on-rack",
    "nameZh": "哑铃俯卧宽距架上划船",
    "bodyPart": "背部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4426?w=1024&h=576",
    "tip": "保持胸部紧贴垫子",
    "source": "fitwill"
  },
  {
    "id": "fw-2482",
    "name": "dumbbell-bent-over-row",
    "nameZh": "哑铃俯身划船",
    "bodyPart": "背部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/2482?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/2482.mp4",
    "tip": "向上划船时向心收缩时吐气，下放时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-5697",
    "name": "dumbbell-lying-row-on-rack",
    "nameZh": "哑铃俯卧架上划船",
    "bodyPart": "背部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/5697?w=1024&h=576",
    "tip": "保持颈部放松，划船时向心收缩时吐气，哑铃回到悬垂位置时回位时吸气；保持胸部紧贴垫子",
    "source": "fitwill"
  },
  {
    "id": "fw-4730",
    "name": "dumbbell-bent-over-single-arm-row-version-2",
    "nameZh": "哑铃俯身单臂划船版本 2",
    "bodyPart": "背部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4730?w=1024&h=576",
    "tip": "在顶部短暂收紧背部，不要扭转躯干或耸肩",
    "source": "fitwill"
  },
  {
    "id": "fw-4425",
    "name": "dumbbell-lying-close-grip-parallel-row-on-rack",
    "nameZh": "哑铃俯卧窄距平行划船（架上）",
    "bodyPart": "背部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4425?w=1024&h=576",
    "tip": "重新调整肩膀，拉动时向心收缩时吐气，并按计划次数重复；保持肘部内收",
    "source": "fitwill"
  },
  {
    "id": "fw-9399",
    "name": "dumbbell-bent-over-wide-row",
    "nameZh": "哑铃俯身宽距划船",
    "bodyPart": "上背部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9399?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9399.mp4",
    "tip": "在顶端将肩胛骨向中间收紧，短暂停顿一拍，同时肩膀下沉把哑铃拉近耳朵",
    "source": "fitwill"
  },
  {
    "id": "fw-9183",
    "name": "dumbbell-bent-over-single-arm-row",
    "nameZh": "哑铃俯身单臂划船",
    "bodyPart": "背部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9183?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9183.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-3799",
    "name": "dumbbell-bent-over-reverse-row",
    "nameZh": "哑铃俯身反向划船",
    "bodyPart": "背部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3799?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3799.mp4",
    "tip": "向后并向下收紧肩胛骨，在顶部稍作停顿，肩膀下沉；保持胸部朝向地面",
    "source": "fitwill"
  },
  {
    "id": "fw-7475",
    "name": "dumbbell-bent-over-reverse-fly-to-hammer-curl",
    "nameZh": "哑铃俯身反向飞鸟接锤式弯举",
    "bodyPart": "肩部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7475?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7475.mp4",
    "tip": "在飞鸟的最高点短暂停顿，收紧三角肌后束和肩胛骨；飞鸟整套动作里始终肘部微弯可以保护肘关节",
    "source": "fitwill"
  },
  {
    "id": "fw-7625",
    "name": "dumbbell-bent-over-curl",
    "nameZh": "哑铃俯身弯举",
    "bodyPart": "上臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7625?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7625.mp4",
    "tip": "在顶端短暂停顿，用力收紧肱二头肌，不要让重量反弹",
    "source": "fitwill"
  },
  {
    "id": "fw-2325",
    "name": "dumbbell-pronated-to-neutral-grip-row",
    "nameZh": "哑铃俯身转中立握距划船",
    "bodyPart": "背部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "traps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/2325?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/2325.mp4",
    "tip": "在每次重复前收紧核心；保持每次重复的呼吸一致",
    "source": "fitwill"
  },
  {
    "id": "fw-9407",
    "name": "dumbbell-bent-over-twisting-row",
    "nameZh": "哑铃俯身转体划船",
    "bodyPart": "上背部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9407?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9407.mp4",
    "tip": "向上拉起并旋转时向心收缩时吐气，下放重量时回位时吸气；别让在动作顶部转动手腕",
    "source": "fitwill"
  },
  {
    "id": "fw-10329",
    "name": "dumbbell-kroc-row",
    "nameZh": "哑铃克罗划船",
    "bodyPart": "上背部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10329?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10329.mp4",
    "tip": "不要让哑铃漂向腋下",
    "source": "fitwill"
  },
  {
    "id": "fw-2431",
    "name": "dumbbell-sumo-squat-off-benches",
    "nameZh": "哑铃凳上相扑深蹲",
    "bodyPart": "臀部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/2431?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/2431.mp4",
    "tip": "双脚向心收缩站起，在顶部夹紧臀肌，但不要向后倾斜",
    "source": "fitwill"
  },
  {
    "id": "fw-9998",
    "name": "dumbbell-isometric-wrist-flexion-over-bench",
    "nameZh": "哑铃凳上等长腕屈曲",
    "bodyPart": "前臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "forearms"
    ],
    "secondaryMuscles": [],
    "category": "armwrest",
    "image": "https://fitwill.app/api/image/9998?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9998.mp4",
    "tip": "全程平稳呼吸，用鼻子回位时吸气和向心收缩时吐气，不要屏住呼吸；要让握把牢牢压在掌心",
    "source": "fitwill"
  },
  {
    "id": "fw-2217",
    "name": "dumbbell-bench-squat",
    "nameZh": "哑铃凳式深蹲",
    "bodyPart": "大腿",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/2217?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/2217.mp4",
    "tip": "将长凳视为触碰点；保持脚后跟落地",
    "source": "fitwill"
  },
  {
    "id": "fw-11413",
    "name": "dumbbell-bench-dip",
    "nameZh": "哑铃凳上臂屈伸",
    "bodyPart": "上臂",
    "equipment": "other",
    "equipmentCn": "平凳",
    "primaryMuscles": [
      "triceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/11413?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11413.mp4",
    "tip": "不要一味往下沉",
    "source": "fitwill"
  },
  {
    "id": "fw-1554",
    "name": "dumbbell-split-jump",
    "nameZh": "哑铃分腿跳",
    "bodyPart": "爆发力训练",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "cardio"
    ],
    "secondaryMuscles": [],
    "category": "plyometrics",
    "image": "https://fitwill.app/api/image/1554?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/1554.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-2959",
    "name": "dumbbell-split-squat",
    "nameZh": "哑铃分腿蹲",
    "bodyPart": "大腿",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/2959?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/2959.mp4",
    "tip": "向心收缩时吐气，通过前脚向心收缩站起，不要反弹或扭动身体",
    "source": "fitwill"
  },
  {
    "id": "fw-10457",
    "name": "dumbbell-leaning-forward-shrug",
    "nameZh": "哑铃前倾耸肩",
    "bodyPart": "上背部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "traps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10457?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10457.mp4",
    "tip": "不要把它做成划船；别让在顶端向后转肩",
    "source": "fitwill"
  },
  {
    "id": "fw-0292",
    "name": "dumbbell-row-left-side",
    "nameZh": "哑铃划船左侧",
    "bodyPart": "背部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "traps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0292?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0292.mp4",
    "tip": "完成划船动作时收紧背部，不要将肩膀耸向耳朵；意念集中在将肘部拉向髋部",
    "source": "fitwill"
  },
  {
    "id": "fw-4627",
    "name": "dumbbell-front-plank-arm-leg-raise",
    "nameZh": "哑铃前平板支撑对侧手脚抬起",
    "bodyPart": "腰部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4627?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4627.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-4622",
    "name": "dumbbell-front-plank-arm-raise",
    "nameZh": "哑铃前平板支撑手臂上举",
    "bodyPart": "腰部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4622?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4622.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-10117",
    "name": "dumbbell-half-kneeling-single-arm-clean-press",
    "nameZh": "哑铃半跪单臂翻举推举",
    "bodyPart": "肩部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10117?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10117.mp4",
    "tip": "推起时向心收缩时吐气，回落时回位时吸气，别让在整个动作序列中憋气",
    "source": "fitwill"
  },
  {
    "id": "fw-4577",
    "name": "dumbbell-half-kneeling-military-press",
    "nameZh": "哑铃半跪姿推举",
    "bodyPart": "肩部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4577?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4577.mp4",
    "tip": "保持前脚完全着地",
    "source": "fitwill"
  },
  {
    "id": "fw-11016",
    "name": "dumbbell-half-kneeling-single-arm-shoulder-press",
    "nameZh": "哑铃半跪姿单臂肩推",
    "bodyPart": "肩部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/11016?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11016.mp4",
    "tip": "不要让哑铃在锁定时前移",
    "source": "fitwill"
  },
  {
    "id": "fw-8502",
    "name": "dumbbell-kneeling-opposite-shoulder-press",
    "nameZh": "哑铃半跪对侧肩推",
    "bodyPart": "肩部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8502?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8502.mp4",
    "tip": "上推时向心收缩时吐气，下放时回位时吸气，保持呼吸平稳，别全程憋气",
    "source": "fitwill"
  },
  {
    "id": "fw-10093",
    "name": "dumbbell-half-kneeling-thor-lift",
    "nameZh": "哑铃半跪胸椎斜举",
    "bodyPart": "核心",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10093?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10093.mp4",
    "tip": "不要把它做成手臂上举；给跪地的膝盖垫好护垫",
    "source": "fitwill"
  },
  {
    "id": "fw-6123",
    "name": "dumbbell-unilateral-scapula-raise",
    "nameZh": "哑铃单侧肩胛提拉",
    "bodyPart": "背部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "traps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/6123?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/6123.mp4",
    "tip": "使用的哑铃重量要比你意念集中在的更轻；保持哑铃在大腿侧面",
    "source": "fitwill"
  },
  {
    "id": "fw-4821",
    "name": "dumbbell-single-leg-step-up-on-bench",
    "nameZh": "哑铃单腿上凳",
    "bodyPart": "大腿",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4821?w=1024&h=576",
    "tip": "在受控状态下有控制地回落，直到非工作脚轻轻触地；保持哑铃在身体两侧静止",
    "source": "fitwill"
  },
  {
    "id": "fw-10575",
    "name": "dumbbell-single-leg-hyperextension-version-2",
    "nameZh": "哑铃单腿山羊挺身（版本 2）",
    "bodyPart": "臀肌",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10575?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10575.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-0410",
    "name": "dumbbell-single-leg-split-squat",
    "nameZh": "哑铃单腿分腿蹲",
    "bodyPart": "大腿",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0410?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0410.mp4",
    "tip": "保持哑铃静止；将后脚视为支撑架，而不是向心收缩腿",
    "source": "fitwill"
  },
  {
    "id": "fw-2925",
    "name": "dumbbell-single-leg-step-up",
    "nameZh": "哑铃单腿登台阶",
    "bodyPart": "大腿",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/2925?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/2925.mp4",
    "tip": "在顶部稍作停顿，向心收缩腿完全伸展，哑铃保持静止；保持哑铃在身体两侧静止",
    "source": "fitwill"
  },
  {
    "id": "fw-5097",
    "name": "dumbbell-single-arm-alternate-decline-bench-press",
    "nameZh": "哑铃单臂交替下斜卧推",
    "bodyPart": "胸部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/5097?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/5097.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-8075",
    "name": "dumbbell-single-leg-hip-thrust",
    "nameZh": "哑铃单腿臀推",
    "bodyPart": "臀肌",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8075?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8075.mp4",
    "tip": "向上推起时向心收缩时吐气，下放时回位时吸气；注意髋部保持正对天花板",
    "source": "fitwill"
  },
  {
    "id": "fw-11659",
    "name": "dumbbell-single-arm-row-bird-dog-stance-on-bench",
    "nameZh": "哑铃单臂划船(凳上鸟狗式)",
    "bodyPart": "上背部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/11659?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11659.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-4837",
    "name": "dumbbell-single-arm-bent-over-row",
    "nameZh": "哑铃单臂俯身划船",
    "bodyPart": "背部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4837?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4837.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-5093",
    "name": "dumbbell-single-arm-floor-press",
    "nameZh": "哑铃单臂地板推举",
    "bodyPart": "胸部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/5093?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/5093.mp4",
    "tip": "向上推举哑铃时向心收缩时吐气，保持肘部不要过度外展；让地板设定你的底部范围",
    "source": "fitwill"
  },
  {
    "id": "fw-3333",
    "name": "dumbbell-one-arm-wide-grip-bench-press",
    "nameZh": "哑铃单臂宽握卧推",
    "bodyPart": "胸部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3333?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3333.mp4",
    "tip": "不要利用胸部反弹哑铃",
    "source": "fitwill"
  },
  {
    "id": "fw-4540",
    "name": "dumbbell-one-arm-thruster",
    "nameZh": "哑铃单臂推举",
    "bodyPart": "臀部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4540?w=1024&h=576",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-1236",
    "name": "dumbbell-one-arm-row-rack-support",
    "nameZh": "哑铃单臂支撑划船",
    "bodyPart": "背部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "traps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/1236?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/1236.mp4",
    "tip": "在顶点稍作停顿，然后有控制地回落哑铃，直到手臂完全伸展；保持哑铃轨迹紧贴躯干",
    "source": "fitwill"
  },
  {
    "id": "fw-3084",
    "name": "dumbbell-single-arm-preacher-curl",
    "nameZh": "哑铃单臂牧师凳弯举",
    "bodyPart": "上臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3084?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3084.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-8298",
    "name": "dumbbell-single-arm-clean-and-press",
    "nameZh": "哑铃单臂翻举推举",
    "bodyPart": "全身",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8298?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8298.mp4",
    "tip": "推举向上向心收缩时用力向心收缩时吐气；不要把翻举做成弯举",
    "source": "fitwill"
  },
  {
    "id": "fw-2381",
    "name": "dumbbell-one-arm-shoulder-press-version-2",
    "nameZh": "哑铃单臂肩推（版本 2）",
    "bodyPart": "肩部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/2381?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/2381.mp4",
    "tip": "在顶部别让过度耸肩",
    "source": "fitwill"
  },
  {
    "id": "fw-10901",
    "name": "dumbbell-single-arm-shrug",
    "nameZh": "哑铃单臂耸肩",
    "bodyPart": "上背部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "traps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10901?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10901.mp4",
    "tip": "随着组次变难，别让躯干向负重对侧旋转；保持头部中立、目视前方",
    "source": "fitwill"
  },
  {
    "id": "fw-0362",
    "name": "dumbbell-one-arm-triceps-extension-left-side",
    "nameZh": "哑铃单臂颈后臂屈伸（左侧）",
    "bodyPart": "上臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "triceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0362?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0362.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-11505",
    "name": "dumbbell-single-arm-z-press",
    "nameZh": "哑铃单臂Z字推举",
    "bodyPart": "肩部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/11505?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11505.mp4",
    "tip": "不要在推举中途用力向心收缩时吐气，那会让躯干姿势塌掉",
    "source": "fitwill"
  },
  {
    "id": "fw-8267",
    "name": "dumbbell-march-on-spot-overhead-press",
    "nameZh": "哑铃原地踏步过头推举",
    "bodyPart": "肩部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8267?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8267.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-2980",
    "name": "dumbbell-renegade-row",
    "nameZh": "哑铃反叛划船",
    "bodyPart": "背部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/2980?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/2980.mp4",
    "tip": "在每次重复前收紧核心；别让过快完成离心阶段",
    "source": "fitwill"
  },
  {
    "id": "fw-6151",
    "name": "dumbbell-reverse-push-up",
    "nameZh": "哑铃反向俯卧撑",
    "bodyPart": "上臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/6151?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/6151.mp4",
    "tip": "不要让头部先触碰地面；通过哑铃手柄向心收缩，平稳向心收缩时吐气并将身体推回原位",
    "source": "fitwill"
  },
  {
    "id": "fw-2511",
    "name": "dumbbell-reverse-grip-incline-row",
    "nameZh": "哑铃反握上斜划船",
    "bodyPart": "背部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/2511?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/2511.mp4",
    "tip": "意念集中在将肘部拉向后口袋",
    "source": "fitwill"
  },
  {
    "id": "fw-0382",
    "name": "dumbbell-reverse-grip-biceps-curl",
    "nameZh": "哑铃反握二头肌弯举",
    "bodyPart": "前臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0382?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0382.mp4",
    "tip": "保持手腕中立",
    "source": "fitwill"
  },
  {
    "id": "fw-2327",
    "name": "dumbbell-reverse-grip-row",
    "nameZh": "哑铃反握划船",
    "bodyPart": "背部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "traps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/2327?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/2327.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-8222",
    "name": "dumbbell-underhand-renegade-row",
    "nameZh": "哑铃反握叛徒划船",
    "bodyPart": "背部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8222?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8222.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-4836",
    "name": "dumbbell-reverse-grip-squeeze-bench-press",
    "nameZh": "哑铃反握挤压卧推",
    "bodyPart": "上臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4836?w=1024&h=576",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-9812",
    "name": "dumbbell-variable-press",
    "nameZh": "哑铃变角推举",
    "bodyPart": "胸部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9812?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9812.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-8225",
    "name": "dumbbell-renegade-row-walk",
    "nameZh": "哑铃叛徒划船行走",
    "bodyPart": "核心",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8225?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8225.mp4",
    "tip": "不要低头或抬头去看前方",
    "source": "fitwill"
  },
  {
    "id": "fw-2136",
    "name": "dumbbell-cuban-press-version-2",
    "nameZh": "哑铃古巴推举第二版",
    "bodyPart": "肩部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/2136?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/2136.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-4048",
    "name": "dumbbell-ipsilateral-split-squat",
    "nameZh": "哑铃同侧分腿蹲",
    "bodyPart": "大腿",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4048?w=1024&h=576",
    "tip": "向上推起时向心收缩时吐气，下蹲前回位时吸气，以防核心失去支撑",
    "source": "fitwill"
  },
  {
    "id": "fw-0299",
    "name": "dumbbell-cuban-press",
    "nameZh": "哑铃古巴推举",
    "bodyPart": "肩部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0299?w=1024&h=576",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-4758",
    "name": "dumbbell-step-back-lunge-and-row",
    "nameZh": "哑铃后撤箭步蹲划船",
    "bodyPart": "大腿",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4758?w=1024&h=576",
    "tip": "保持髋部端正，别让在划船时扭曲躯干或耸肩；不要从后腿用力蹬地",
    "source": "fitwill"
  },
  {
    "id": "fw-3755",
    "name": "dumbbell-rear-delt-row",
    "nameZh": "哑铃后束划船",
    "bodyPart": "背部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3755?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3755.mp4",
    "tip": "在顶部收紧并短暂暂停，肩膀下沉、扭转身体或猛拉哑铃；在顶部进行短暂的收紧，而不是长时间保持",
    "source": "fitwill"
  },
  {
    "id": "fw-10435",
    "name": "dumbbell-rear-lunge-biceps-curl",
    "nameZh": "哑铃后撤步弓步弯举",
    "bodyPart": "腿部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10435?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10435.mp4",
    "tip": "下蹲弓步和弯举时向心收缩时吐气，下放哑铃并回到站立时回位时吸气；别让在哑铃上升时躯干向后仰",
    "source": "fitwill"
  },
  {
    "id": "fw-11024",
    "name": "dumbbell-rear-delt-fly-and-row",
    "nameZh": "哑铃后束飞鸟划船",
    "bodyPart": "肩部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/11024?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11024.mp4",
    "tip": "不要追求高度",
    "source": "fitwill"
  },
  {
    "id": "fw-7566",
    "name": "dumbbell-hack-squat",
    "nameZh": "哑铃哈克深蹲",
    "bodyPart": "大腿",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7566?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7566.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-4732",
    "name": "dumbbell-cossack-squat",
    "nameZh": "哑铃哥萨克深蹲",
    "bodyPart": "大腿",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4732?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4732.mp4",
    "tip": "保持哑铃在胸骨高位；不要将动作变成前屈",
    "source": "fitwill"
  },
  {
    "id": "fw-3668",
    "name": "dumbbell-floor-chest-press",
    "nameZh": "哑铃地板卧推",
    "bodyPart": "胸部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3668?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3668.mp4",
    "tip": "让上臂轻轻接触地板；保持手腕叠放在前臂上方",
    "source": "fitwill"
  },
  {
    "id": "fw-11610",
    "name": "dumbbell-turkish-get-up-squat-style",
    "nameZh": "哑铃土耳其起立（深蹲式）",
    "bodyPart": "全身",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/11610?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11610.mp4",
    "tip": "收紧核心，眼睛盯住哑铃；桥式抬起髋部时，别让让哑铃漂到头后方",
    "source": "fitwill"
  },
  {
    "id": "fw-3319",
    "name": "dumbbell-lying-on-floor-hammer-press",
    "nameZh": "哑铃地板锤式推举",
    "bodyPart": "胸部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3319?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3319.mp4",
    "tip": "让地面设定底部位置；推举时保持肋骨下压",
    "source": "fitwill"
  },
  {
    "id": "fw-10516",
    "name": "dumbbell-seated-upper-half-biceps-curl",
    "nameZh": "哑铃坐姿上半程肱二头肌弯举",
    "bodyPart": "上臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10516?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10516.mp4",
    "tip": "让手肘紧贴肋骨",
    "source": "fitwill"
  },
  {
    "id": "fw-4235",
    "name": "dumbbell-seated-bent-over-rear-delt-row",
    "nameZh": "哑铃坐姿俯身三角肌后束划船",
    "bodyPart": "肩部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4235?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4235.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-4157",
    "name": "dumbbell-seated-front-and-back-tate-press",
    "nameZh": "哑铃坐姿前后泰特推举",
    "bodyPart": "上臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "triceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4157?w=1024&h=576",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-6150",
    "name": "dumbbell-seated-double-concentration-curl",
    "nameZh": "哑铃坐姿双臂集中弯举",
    "bodyPart": "上臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/6150?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/6150.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-6142",
    "name": "dumbbell-seated-reverse-arnold-press",
    "nameZh": "哑铃坐姿反向阿诺德推举",
    "bodyPart": "肩部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/6142?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/6142.mp4",
    "tip": "向上推举时向心收缩时吐气，放下时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-4183",
    "name": "dumbbell-seated-cuban-press",
    "nameZh": "哑铃坐姿古巴推举",
    "bodyPart": "肩部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4183?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4183.mp4",
    "tip": "保持颈部伸长，推举时向心收缩时吐气，放下时回位时吸气；别让靠在长凳上",
    "source": "fitwill"
  },
  {
    "id": "fw-5001",
    "name": "dumbbell-seated-external-shoulder-rotation",
    "nameZh": "哑铃坐姿肩外旋",
    "bodyPart": "肩部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/5001?w=1024&h=576",
    "tip": "保持手腕中立，向上旋转时向心收缩时吐气，返回时回位时吸气；保持弧线紧凑并贴近大腿",
    "source": "fitwill"
  },
  {
    "id": "fw-9397",
    "name": "dumbbell-sitting-leg-extension",
    "nameZh": "哑铃坐姿腿屈伸",
    "bodyPart": "大腿",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9397?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9397.mp4",
    "tip": "别让用惯性甩起重量",
    "source": "fitwill"
  },
  {
    "id": "fw-7892",
    "name": "dumbbell-seated-triceps-extension-version-2",
    "nameZh": "哑铃坐姿颈后臂屈伸（版本2）",
    "bodyPart": "上臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "triceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7892?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7892.mp4",
    "tip": "上推时向心收缩时吐气，下放哑铃到头后时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-10515",
    "name": "dumbbell-seated-front-raise-with-twist",
    "nameZh": "哑铃坐姿转腕前平举",
    "bodyPart": "肩部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "armwrest",
    "image": "https://fitwill.app/api/image/10515?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10515.mp4",
    "tip": "两只哑铃应该整套动作里始终平行移动",
    "source": "fitwill"
  },
  {
    "id": "fw-7550",
    "name": "dumbell-bulgarian-split-squat-from-deficit",
    "nameZh": "哑铃垫高保加利亚分腿蹲",
    "bodyPart": "腿部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7550?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7550.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-9389",
    "name": "dumbbell-seated-w-press",
    "nameZh": "哑铃坐姿W型推举",
    "bodyPart": "肩部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9389?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9389.mp4",
    "tip": "底部不要让手肘向内塌；保持头部中立、目视前方",
    "source": "fitwill"
  },
  {
    "id": "fw-11697",
    "name": "dumbbell-deadlift-from-deficit",
    "nameZh": "哑铃垫高硬拉",
    "bodyPart": "腿部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/11697?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11697.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-11066",
    "name": "dumbbell-elevated-heel-goblet-squat-version-2",
    "nameZh": "哑铃垫高脚跟高脚杯深蹲（版本2）",
    "bodyPart": "腿部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/11066?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11066.mp4",
    "tip": "让哑铃始终贴紧胸骨",
    "source": "fitwill"
  },
  {
    "id": "fw-8005",
    "name": "dumbbell-opposite-2-point-bench-press",
    "nameZh": "哑铃对侧两点支撑卧推",
    "bodyPart": "胸部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8005?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8005.mp4",
    "tip": "别让肘部完全向外打开；不要急着下放",
    "source": "fitwill"
  },
  {
    "id": "fw-4741",
    "name": "dumbbell-head-supported-row",
    "nameZh": "哑铃头部支撑划船",
    "bodyPart": "背部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4741?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4741.mp4",
    "tip": "保持前额接触轻柔",
    "source": "fitwill"
  },
  {
    "id": "fw-7598",
    "name": "dumbell-contralateral-glute-dominant-bulgarian-spl",
    "nameZh": "哑铃对侧臀主导保加利亚分腿蹲",
    "bodyPart": "臀肌",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7598?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7598.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-7406",
    "name": "dumbbell-bench-seated-press",
    "nameZh": "哑铃平凳坐姿推举",
    "bodyPart": "肩部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7406?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7406.mp4",
    "tip": "下放时回位时吸气，上推时平稳地向心收缩时吐气；别让从拉伸位置弹起哑铃",
    "source": "fitwill"
  },
  {
    "id": "fw-11496",
    "name": "dumbbell-plank-pass-through",
    "nameZh": "哑铃平板支撑传递",
    "bodyPart": "核心",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/11496?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11496.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-10425",
    "name": "dumbbell-banded-hip-thrust",
    "nameZh": "哑铃弹力带臀推",
    "bodyPart": "臀肌",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10425?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10425.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-7545",
    "name": "dumbbell-plank-jack",
    "nameZh": "哑铃平板支撑开合跳",
    "bodyPart": "核心",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "cardio",
    "image": "https://fitwill.app/api/image/7545?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7545.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-6558",
    "name": "dumbbell-banded-wall-sit",
    "nameZh": "哑铃弹力带靠墙静蹲",
    "bodyPart": "大腿",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/6558?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/6558.mp4",
    "tip": "保持哑铃在身体两侧静止",
    "source": "fitwill"
  },
  {
    "id": "fw-4164",
    "name": "dumbbell-devils-press",
    "nameZh": "哑铃恶魔推举",
    "bodyPart": "爆发力训练",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "cardio"
    ],
    "secondaryMuscles": [],
    "category": "plyometrics",
    "image": "https://fitwill.app/api/image/4164?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4164.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-8337",
    "name": "dumbbell-hang-clean-and-press",
    "nameZh": "哑铃悬垂高翻推举",
    "bodyPart": "全身",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "olympic weightlifting",
    "image": "https://fitwill.app/api/image/8337?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8337.mp4",
    "tip": "向心收缩并推举时用力向心收缩时吐气；在悬垂位置回位时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-10817",
    "name": "dumbbell-wrist-rotation",
    "nameZh": "哑铃手腕旋转",
    "bodyPart": "前臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "forearms"
    ],
    "secondaryMuscles": [],
    "category": "armwrest",
    "image": "https://fitwill.app/api/image/10817?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10817.mp4",
    "tip": "整套动作里始终平稳呼吸，逆重力转动时向心收缩时吐气，回转时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-6272",
    "name": "dumbbell-larsen-press",
    "nameZh": "哑铃拉森卧推",
    "bodyPart": "胸部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/6272?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/6272.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-4030",
    "name": "dumbbell-bar-grip-sumo-squat",
    "nameZh": "哑铃抓握相扑深蹲",
    "bodyPart": "臀部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4030?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4030.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-5422",
    "name": "roll-lower-back-side-lying-on-floor",
    "nameZh": "侧卧泡沫轴滚动下背部",
    "bodyPart": "背部",
    "equipment": "foam roll",
    "equipmentCn": "泡沫轴",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/5422?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/5422.mp4",
    "tip": "保持泡沫轴远离脊柱本身",
    "source": "fitwill"
  },
  {
    "id": "fw-1491",
    "name": "supine-spinal-twist-yoga-pose",
    "nameZh": "仰卧脊柱扭转瑜伽体式",
    "bodyPart": "臀部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/1491?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/1491.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-3528",
    "name": "downward-facing-dog-spine-mobility",
    "nameZh": "下犬式脊柱灵活性训练",
    "bodyPart": "背部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3528?w=1024&h=576",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-11089",
    "name": "split-stretch-spine-rolling",
    "nameZh": "分腿伸展脊柱滚动",
    "bodyPart": "臀部",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/11089?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11089.mp4",
    "tip": "停在肩胛骨位置即可；双手只做引导，不要当拐杖",
    "source": "fitwill"
  },
  {
    "id": "fw-10454",
    "name": "sitting-lower-back-stretch",
    "nameZh": "坐姿下背部拉伸",
    "bodyPart": "下背部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/10454?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10454.mp4",
    "tip": "不要沉进肩膀；沉入拉伸时缓慢向心收缩时吐气",
    "source": "fitwill"
  },
  {
    "id": "fw-9077",
    "name": "sitting-chest-opener-cat-cow-pose",
    "nameZh": "坐姿开胸猫牛式",
    "bodyPart": "胸部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9077?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9077.mp4",
    "tip": "整套动作里始终90度的手肘弯曲不要变形",
    "source": "fitwill"
  },
  {
    "id": "fw-1803",
    "name": "sitting-lower-trunk-extensor-stretch",
    "nameZh": "坐姿下背部伸肌拉伸",
    "bodyPart": "背部",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/1803?w=1024&h=576",
    "tip": "首先考虑将骨盆向后倾斜；底部不要弹动",
    "source": "fitwill"
  },
  {
    "id": "fw-9245",
    "name": "sitting-cat-cow-pose",
    "nameZh": "坐姿猫牛式",
    "bodyPart": "核心",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9245?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9245.mp4",
    "tip": "弓背阶段把向心收缩时吐气做充分",
    "source": "fitwill"
  },
  {
    "id": "fw-9961",
    "name": "kettlebell-bent-over-spinal-rotation",
    "nameZh": "壶铃俯身脊柱旋转",
    "bodyPart": "核心",
    "equipment": "kettlebells",
    "equipmentCn": "壶铃",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9961?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9961.mp4",
    "tip": "向每侧旋转时向心收缩时吐气，壶铃回到中间时回位时吸气；手臂保持伸直放松",
    "source": "fitwill"
  },
  {
    "id": "fw-8217",
    "name": "child-pose-cat-cow",
    "nameZh": "婴儿式猫牛式",
    "bodyPart": "背部",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8217?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8217.mp4",
    "tip": "全程配合呼吸：拱背对折时向心收缩时吐气，向前返回时回位时吸气；返回时别让把全部体重压在手腕上",
    "source": "fitwill"
  },
  {
    "id": "fw-10853",
    "name": "pilates-machine-long-spine",
    "nameZh": "普拉提核心床长脊柱式",
    "bodyPart": "普拉提",
    "equipment": "other",
    "equipmentCn": "踝带",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/10853?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10853.mp4",
    "tip": "不要用力把腿压过头顶；保持颈部中立、下颌放松",
    "source": "fitwill"
  },
  {
    "id": "fw-9124",
    "name": "sitting-cat-cow-stretch-on-a-chair",
    "nameZh": "椅上坐姿猫牛式拉伸",
    "bodyPart": "核心",
    "equipment": "other",
    "equipmentCn": "长凳或座位",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/9124?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9124.mp4",
    "tip": "让脊柱来完成动作；千万不要用手把头往前拉",
    "source": "fitwill"
  },
  {
    "id": "fw-4236",
    "name": "dumbbell-incline-two-front-raise-with-chest-support",
    "nameZh": "上斜俯卧哑铃双臂前平举",
    "bodyPart": "肩部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4236?w=1024&h=576",
    "tip": "保持长凳倾斜度适中",
    "source": "fitwill"
  },
  {
    "id": "fw-11349",
    "name": "dumbbell-chest-supported-lateral-raises",
    "nameZh": "上斜凳俯卧哑铃侧平举",
    "bodyPart": "肩部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/11349?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11349.mp4",
    "tip": "举起时向心收缩时吐气，下放时回位时吸气，保持呼吸平稳，别全程憋气；别让在顶端用力收紧肩胛骨",
    "source": "fitwill"
  },
  {
    "id": "fw-9461",
    "name": "incline-pigeon-stretch",
    "nameZh": "上斜凳鸽子式拉伸",
    "bodyPart": "臀部",
    "equipment": "other",
    "equipmentCn": "上斜长凳",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/9461?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9461.mp4",
    "tip": "前倾时缓慢向心收缩时吐气",
    "source": "fitwill"
  },
  {
    "id": "fw-0494",
    "name": "incline-reverse-grip-push-up",
    "nameZh": "上斜反手俯卧撑",
    "bodyPart": "胸部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0494?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0494.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-3694",
    "name": "dumbbell-incline-alternate-reverse-fly",
    "nameZh": "上斜哑铃交替反向飞鸟",
    "bodyPart": "肩部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3694?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3694.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-6162",
    "name": "dumbbell-incline-low-fly",
    "nameZh": "上斜哑铃低位飞鸟",
    "bodyPart": "胸部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/6162?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/6162.mp4",
    "tip": "保持肘部角度几乎固定；在顶部短暂收紧就足够了",
    "source": "fitwill"
  },
  {
    "id": "fw-7231",
    "name": "dumbbell-incline-single-arm-y-raise",
    "nameZh": "上斜哑铃单臂Y字平举",
    "bodyPart": "肩部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7231?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7231.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-3967",
    "name": "dumbbell-incline-around-the-world",
    "nameZh": "上斜哑铃绕环",
    "bodyPart": "胸部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3967?w=1024&h=576",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-1467",
    "name": "push-up-on-forearm",
    "nameZh": "前臂俯卧撑",
    "bodyPart": "上臂",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "triceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/1467?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/1467.mp4",
    "tip": "保持前臂支撑在肩膀下方",
    "source": "fitwill"
  },
  {
    "id": "fw-6880",
    "name": "forearms-stand-yoga-pose-pincha-mayurasana",
    "nameZh": "前臂倒立瑜伽体式（孔雀起舞式）",
    "bodyPart": "拉伸",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/6880?w=1024&h=576",
    "tip": "意念集中在通过前臂将地板推开",
    "source": "fitwill"
  },
  {
    "id": "fw-0486",
    "name": "hip-raise-bridge",
    "nameZh": "前臂支撑臀部上提",
    "bodyPart": "腰部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0486?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0486.mp4",
    "tip": "保持双脚着地并动作从容",
    "source": "fitwill"
  },
  {
    "id": "fw-2765",
    "name": "forearm-pronation-articulations",
    "nameZh": "前臂旋前关节活动",
    "bodyPart": "前臂",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "forearms"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/2765?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/2765.mp4",
    "tip": "保持肘部紧贴肋骨；如果手腕或肘部感到收紧，请在到达末端范围前停止",
    "source": "fitwill"
  },
  {
    "id": "fw-2766",
    "name": "forearm-supination-articulations",
    "nameZh": "前臂旋后关节活动",
    "bodyPart": "前臂",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "biceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/2766?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/2766.mp4",
    "tip": "旋转至旋后位时向心收缩时吐气，回到预备姿势时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-1815",
    "name": "forearm-pronator-stretch",
    "nameZh": "前臂旋前肌拉伸",
    "bodyPart": "前臂",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "forearms"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/1815?w=1024&h=576",
    "tip": "在保持拉伸前放松握力",
    "source": "fitwill"
  },
  {
    "id": "fw-0331",
    "name": "dumbbell-incline-twisted-flyes",
    "nameZh": "上斜哑铃扭转飞鸟",
    "bodyPart": "胸部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/0331?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0331.mp4",
    "tip": "不要将其变成推举动作；下放时回位时吸气，将哑铃带回时向心收缩时吐气",
    "source": "fitwill"
  },
  {
    "id": "fw-10692",
    "name": "forearm-supination",
    "nameZh": "前臂旋后",
    "bodyPart": "前臂",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "forearms"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10692?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10692.mp4",
    "tip": "掌心向上旋转时向心收缩时吐气，回到预备姿势时回位时吸气；旋转到达顶端时别让耸肩",
    "source": "fitwill"
  },
  {
    "id": "fw-2941",
    "name": "forearm-wall-slide",
    "nameZh": "前臂靠墙滑动",
    "bodyPart": "背部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/2941?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/2941.mp4",
    "tip": "保持肋骨下压",
    "source": "fitwill"
  },
  {
    "id": "fw-8246",
    "name": "outward-wrist-stretch-clasped-fingers",
    "nameZh": "十指相扣向外手腕伸展",
    "bodyPart": "手臂",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "forearms"
    ],
    "secondaryMuscles": [],
    "category": "armwrest",
    "image": "https://fitwill.app/api/image/8246?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8246.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-6763",
    "name": "seated-forearms-stretch",
    "nameZh": "坐姿前臂拉伸",
    "bodyPart": "拉伸",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/6763?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/6763.mp4",
    "tip": "在达到动作终点时向心收缩时吐气，保持颈部伸长，肩膀下沉；保持肘部伸直",
    "source": "fitwill"
  },
  {
    "id": "fw-9894",
    "name": "sitting-single-arm-wrist-extensors-stretch",
    "nameZh": "坐姿单臂腕伸肌拉伸",
    "bodyPart": "前臂",
    "equipment": "other",
    "equipmentCn": "平凳",
    "primaryMuscles": [
      "forearms"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/9894?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9894.mp4",
    "tip": "保持肩部放松下沉——肩膀下沉把肩膀抬向耳朵；保持手指放松并微微弯曲",
    "source": "fitwill"
  },
  {
    "id": "fw-8245",
    "name": "seated-wrist-extensors-stretch",
    "nameZh": "坐姿腕伸肌拉伸",
    "bodyPart": "手臂",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "forearms"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/8245?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8245.mp4",
    "tip": "不要把肘部锁死；屈腕要保持在前后平面上",
    "source": "fitwill"
  },
  {
    "id": "fw-11382",
    "name": "seated-wrist-flexors-stretch",
    "nameZh": "坐姿腕屈肌拉伸",
    "bodyPart": "前臂",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "forearms"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/11382?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11382.mp4",
    "tip": "手指保持柔软放松；在终点位置保持20到30秒，整套动作里始终肘部伸直，呼吸平稳",
    "source": "fitwill"
  },
  {
    "id": "fw-1798",
    "name": "lying-whole-body-stretch",
    "nameZh": "仰卧全身拉伸",
    "bodyPart": "背部",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/1798?w=1024&h=576",
    "tip": "保持颈部放松，别让下巴用力向胸部收紧",
    "source": "fitwill"
  },
  {
    "id": "fw-9064",
    "name": "incline-plyo-push-up",
    "nameZh": "上斜爆发力俯卧撑",
    "bodyPart": "胸部",
    "equipment": "other",
    "equipmentCn": "踏板",
    "primaryMuscles": [
      "chest"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9064?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9064.mp4",
    "tip": "快速恢复身体直线，短促向心收缩时吐气，接着推起下一次重复",
    "source": "fitwill"
  },
  {
    "id": "fw-0563",
    "name": "lateral-bound",
    "nameZh": "侧向跳跃",
    "bodyPart": "爆发力训练",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "cardio"
    ],
    "secondaryMuscles": [],
    "category": "plyometrics",
    "image": "https://fitwill.app/api/image/0563?w=1024&h=576",
    "tip": "落地时膝盖略松",
    "source": "fitwill"
  },
  {
    "id": "fw-10827",
    "name": "lateral-box-jump",
    "nameZh": "侧向跳箱",
    "bodyPart": "爆发力训练",
    "equipment": "other",
    "equipmentCn": "踏板",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "plyometrics",
    "image": "https://fitwill.app/api/image/10827?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10827.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-0567",
    "name": "lateral-twist-box-jump",
    "nameZh": "侧向转体跳箱",
    "bodyPart": "有氧",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "cardio"
    ],
    "secondaryMuscles": [],
    "category": "cardio",
    "image": "https://fitwill.app/api/image/0567?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0567.mp4",
    "tip": "保持转体幅度小且协调",
    "source": "fitwill"
  },
  {
    "id": "fw-10532",
    "name": "shuffle-step-with-squat-and-jump",
    "nameZh": "侧滑步深蹲跳",
    "bodyPart": "腿部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "plyometrics",
    "image": "https://fitwill.app/api/image/10532?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10532.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-3863",
    "name": "bulgarian-jump-squat",
    "nameZh": "保加利亚跳跃深蹲",
    "bodyPart": "大腿",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "plyometrics",
    "image": "https://fitwill.app/api/image/3863?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3863.mp4",
    "tip": "下蹲时回位时吸气，向上爆发时用力向心收缩时吐气；如果后髋部感到收紧，说明长凳太高了",
    "source": "fitwill"
  },
  {
    "id": "fw-5166",
    "name": "single-leg-box-jump",
    "nameZh": "单腿跳箱",
    "bodyPart": "爆发力训练",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "cardio"
    ],
    "secondaryMuscles": [],
    "category": "plyometrics",
    "image": "https://fitwill.app/api/image/5166?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/5166.mp4",
    "tip": "蓄力时让躯干稍微前倾",
    "source": "fitwill"
  },
  {
    "id": "fw-5148",
    "name": "jumping-single-leg-lunge",
    "nameZh": "单腿跳跃弓步",
    "bodyPart": "爆发力训练",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "cardio"
    ],
    "secondaryMuscles": [],
    "category": "plyometrics",
    "image": "https://fitwill.app/api/image/5148?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/5148.mp4",
    "tip": "下降时回位时吸气，跳跃和落地时向心收缩时吐气",
    "source": "fitwill"
  },
  {
    "id": "fw-5482",
    "name": "single-leg-hopping",
    "nameZh": "单腿跳跃",
    "bodyPart": "爆发力训练",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "cardio"
    ],
    "secondaryMuscles": [],
    "category": "plyometrics",
    "image": "https://fitwill.app/api/image/5482?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/5482.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-9514",
    "name": "countermovement-jump-arms-on-hip",
    "nameZh": "叉腰反向纵跳",
    "bodyPart": "爆发力训练",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "plyometrics",
    "image": "https://fitwill.app/api/image/9514?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9514.mp4",
    "tip": "不要倾斜、扭转或伸手；不要在下蹲底部停顿",
    "source": "fitwill"
  },
  {
    "id": "fw-10988",
    "name": "dumbbell-kneeling-to-jump-box",
    "nameZh": "哑铃跪姿跳箱",
    "bodyPart": "爆发力训练",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "plyometrics",
    "image": "https://fitwill.app/api/image/10988?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10988.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-10987",
    "name": "dumbbell-jump-box",
    "nameZh": "哑铃跳箱",
    "bodyPart": "腿部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "plyometrics",
    "image": "https://fitwill.app/api/image/10987?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10987.mp4",
    "tip": "落地时不要让膝盖内扣",
    "source": "fitwill"
  },
  {
    "id": "fw-4118",
    "name": "prisoner-jump-squat",
    "nameZh": "囚式跳跃深蹲",
    "bodyPart": "爆发力训练",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "cardio"
    ],
    "secondaryMuscles": [],
    "category": "plyometrics",
    "image": "https://fitwill.app/api/image/4118?w=1024&h=576",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-8695",
    "name": "lying-lean-forward-pilates",
    "nameZh": "仰卧前倾普拉提",
    "bodyPart": "核心",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/8695?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8695.mp4",
    "tip": "不要十指交扣用力拉；不要追求抬得高",
    "source": "fitwill"
  },
  {
    "id": "fw-8696",
    "name": "lying-roll-up-pilates",
    "nameZh": "普拉提仰卧卷起",
    "bodyPart": "核心",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/8696?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8696.mp4",
    "tip": "不要用头先向心收缩；双腿保持拉长但关节别完全锁死",
    "source": "fitwill"
  },
  {
    "id": "fw-10656",
    "name": "pilates-machine-lying-knee-extension-on-heels",
    "nameZh": "普拉提器械仰卧脚跟膝伸展",
    "bodyPart": "普拉提",
    "equipment": "other",
    "equipmentCn": "其他",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/10656?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10656.mp4",
    "tip": "膝盖伸展时不要向外打开",
    "source": "fitwill"
  },
  {
    "id": "fw-8699",
    "name": "swan-dive-pilates",
    "nameZh": "普拉提天鹅俯冲",
    "bodyPart": "下背部",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/8699?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8699.mp4",
    "tip": "不要急着摇摆；起始时保持脚背贴地",
    "source": "fitwill"
  },
  {
    "id": "fw-10655",
    "name": "pilates-machine-lying-knee-extension",
    "nameZh": "普拉提核心床仰卧伸膝",
    "bodyPart": "普拉提",
    "equipment": "other",
    "equipmentCn": "其他",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/10655?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10655.mp4",
    "tip": "腿蹬出时向心收缩时吐气；整套动作里始终脊柱稳定、骨盆中立",
    "source": "fitwill"
  },
  {
    "id": "fw-8697",
    "name": "lying-rollover-pilates",
    "nameZh": "普拉提仰卧翻滚",
    "bodyPart": "核心",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/8697?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8697.mp4",
    "tip": "整套动作里始终稳定的节奏：翻上去时向心收缩时吐气，顶端回位时吸气，回落时向心收缩时吐气；保持头部不动、面部放松",
    "source": "fitwill"
  },
  {
    "id": "fw-10657",
    "name": "pilates-machine-lying-calf-raise",
    "nameZh": "普拉提核心床仰卧提踵",
    "bodyPart": "小腿",
    "equipment": "other",
    "equipmentCn": "其他",
    "primaryMuscles": [
      "calves"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/10657?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10657.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-10654",
    "name": "pilates-machine-lying-knee-extension-on-toes",
    "nameZh": "普拉提核心床仰卧脚尖伸膝",
    "bodyPart": "普拉提",
    "equipment": "other",
    "equipmentCn": "其他",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/10654?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10654.mp4",
    "tip": "脚跟保持抬起且稳定",
    "source": "fitwill"
  },
  {
    "id": "fw-10847",
    "name": "pilates-machine-lying-frog-and-leg-circle",
    "nameZh": "普拉提核心床仰卧蛙式与腿部画圈",
    "bodyPart": "普拉提",
    "equipment": "other",
    "equipmentCn": "其他",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/10847?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10847.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-10848",
    "name": "pilates-machine-lying-running",
    "nameZh": "普拉提核心床仰卧跑步",
    "bodyPart": "普拉提",
    "equipment": "other",
    "equipmentCn": "其他",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/10848?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10848.mp4",
    "tip": "放慢弯曲的动作，让向心收缩时吐气带动收腿",
    "source": "fitwill"
  },
  {
    "id": "fw-10850",
    "name": "pilates-machine-side-split",
    "nameZh": "普拉提核心床侧劈腿",
    "bodyPart": "普拉提",
    "equipment": "machine",
    "equipmentCn": "杠杆器械",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/10850?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10850.mp4",
    "tip": "双腿打开时向心收缩时吐气，合拢时回位时吸气，保持呼吸平稳，别全程憋气；双腿打开时不要垂下手臂",
    "source": "fitwill"
  },
  {
    "id": "fw-10849",
    "name": "pilates-machine-lying-pelvic-lift",
    "nameZh": "普拉提核心床仰卧骨盆上抬",
    "bodyPart": "普拉提",
    "equipment": "other",
    "equipmentCn": "其他",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/10849?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10849.mp4",
    "tip": "别让在顶点把肋骨向天花板外翻；在长直线位置关节别完全锁死或过度伸展膝盖",
    "source": "fitwill"
  },
  {
    "id": "fw-10852",
    "name": "pilates-machine-russian-split",
    "nameZh": "普拉提核心床俄式劈叉",
    "bodyPart": "大腿",
    "equipment": "other",
    "equipmentCn": "其他",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/10852?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10852.mp4",
    "tip": "不要让髋部向外旋转打开",
    "source": "fitwill"
  },
  {
    "id": "fw-10851",
    "name": "pilates-machine-russian-squat",
    "nameZh": "普拉提核心床俄式深蹲",
    "bodyPart": "腿部",
    "equipment": "other",
    "equipmentCn": "其他",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/10851?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10851.mp4",
    "tip": "下蹲时回位时吸气，站起时向心收缩时吐气",
    "source": "fitwill"
  },
  {
    "id": "fw-10854",
    "name": "pilates-machine-arm-circle",
    "nameZh": "普拉提核心床手臂画圈",
    "bodyPart": "普拉提",
    "equipment": "machine",
    "equipmentCn": "杠杆器械",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/10854?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10854.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-0529",
    "name": "kettlebell-double-snatch",
    "nameZh": "双壶铃抓举",
    "bodyPart": "肩部",
    "equipment": "kettlebells",
    "equipmentCn": "壶铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "olympic weightlifting",
    "image": "https://fitwill.app/api/image/0529?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0529.mp4",
    "tip": "开始时重量要比你意念集中在的轻；在锁定位置，肩膀应感到向心收缩，但肩膀下沉至耳朵处",
    "source": "fitwill"
  },
  {
    "id": "fw-6152",
    "name": "dumbbell-one-arm-snatch-left-side",
    "nameZh": "哑铃单臂抓举（左侧）",
    "bodyPart": "举重",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "traps"
    ],
    "secondaryMuscles": [],
    "category": "olympic weightlifting",
    "image": "https://fitwill.app/api/image/6152?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/6152.mp4",
    "tip": "让髋部产生速度；结束时肋骨下压，不要外翻",
    "source": "fitwill"
  },
  {
    "id": "fw-10044",
    "name": "dumbbell-hang-snatch",
    "nameZh": "哑铃悬垂抓举",
    "bodyPart": "肩部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "olympic weightlifting",
    "image": "https://fitwill.app/api/image/10044?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10044.mp4",
    "tip": "在悬垂位回位时吸气，拉起过程中绷紧腰腹稳住躯干，站起至过顶完成位时向心收缩时吐气；别让在顶部过度伸展下背部",
    "source": "fitwill"
  },
  {
    "id": "fw-4389",
    "name": "dumbbell-push-jerk",
    "nameZh": "哑铃挺举",
    "bodyPart": "其他",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "olympic weightlifting",
    "image": "https://fitwill.app/api/image/4389?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4389.mp4",
    "tip": "在开始下蹲前，收紧躯干，收紧臀部，保持胸部挺拔；保持下蹲幅度浅且垂直",
    "source": "fitwill"
  },
  {
    "id": "fw-4210",
    "name": "kettlebell-split-snatch",
    "nameZh": "壶铃分腿抓举",
    "bodyPart": "爆发力训练",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "cardio"
    ],
    "secondaryMuscles": [],
    "category": "olympic weightlifting",
    "image": "https://fitwill.app/api/image/4210?w=1024&h=576",
    "tip": "分腿姿势不要跨度过大",
    "source": "fitwill"
  },
  {
    "id": "fw-11703",
    "name": "dumbbell-split-jerk",
    "nameZh": "哑铃箭步挺举",
    "bodyPart": "肩部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "olympic weightlifting",
    "image": "https://fitwill.app/api/image/11703?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11703.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-0538",
    "name": "kettlebell-one-arm-jerk",
    "nameZh": "壶铃单臂挺举",
    "bodyPart": "肩部",
    "equipment": "kettlebells",
    "equipmentCn": "壶铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "olympic weightlifting",
    "image": "https://fitwill.app/api/image/0538?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0538.mp4",
    "tip": "保持下蹲幅度较浅且垂直",
    "source": "fitwill"
  },
  {
    "id": "fw-0537",
    "name": "kettlebell-one-arm-clean-and-jerk",
    "nameZh": "壶铃单臂翻转挺举",
    "bodyPart": "肩部",
    "equipment": "kettlebells",
    "equipmentCn": "壶铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "olympic weightlifting",
    "image": "https://fitwill.app/api/image/0537?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0537.mp4",
    "tip": "翻转时保持壶铃靠近身体",
    "source": "fitwill"
  },
  {
    "id": "fw-0542",
    "name": "kettlebell-one-arm-snatch",
    "nameZh": "壶铃单臂抓举",
    "bodyPart": "肩部",
    "equipment": "kettlebells",
    "equipmentCn": "壶铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "olympic weightlifting",
    "image": "https://fitwill.app/api/image/0542?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0542.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-0527",
    "name": "kettlebell-double-jerk",
    "nameZh": "壶铃双臂挺举",
    "bodyPart": "肩部",
    "equipment": "kettlebells",
    "equipmentCn": "壶铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "olympic weightlifting",
    "image": "https://fitwill.app/api/image/0527?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/0527.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-7468",
    "name": "kettlebell-snatch-and-swing",
    "nameZh": "壶铃抓举与摇摆",
    "bodyPart": "全身",
    "equipment": "kettlebells",
    "equipmentCn": "壶铃",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "olympic weightlifting",
    "image": "https://fitwill.app/api/image/7468?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7468.mp4",
    "tip": "后摆时回位时吸气，伸髋向心收缩并抓举过头时短促向心收缩时吐气，壶铃回落时再次回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-4532",
    "name": "kettlebell-snatch",
    "nameZh": "壶铃抓举",
    "bodyPart": "举重",
    "equipment": "kettlebells",
    "equipmentCn": "壶铃",
    "primaryMuscles": [
      "traps"
    ],
    "secondaryMuscles": [],
    "category": "olympic weightlifting",
    "image": "https://fitwill.app/api/image/4532?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4532.mp4",
    "tip": "屈髋，膝盖略松，单手握住把手，同时腰背打直和胸部挺起",
    "source": "fitwill"
  },
  {
    "id": "fw-11704",
    "name": "kettlebell-split-jerk",
    "nameZh": "壶铃箭步挺举",
    "bodyPart": "肩部",
    "equipment": "kettlebells",
    "equipmentCn": "壶铃",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "olympic weightlifting",
    "image": "https://fitwill.app/api/image/11704?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11704.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-10283",
    "name": "incline-diamond-push-up",
    "nameZh": "上斜菱形俯卧撑",
    "bodyPart": "手臂",
    "equipment": "other",
    "equipmentCn": "长凳",
    "primaryMuscles": [
      "triceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/10283?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10283.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-1795",
    "name": "reaching-upper-back-stretch",
    "nameZh": "上背部伸展",
    "bodyPart": "背部",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/1795?w=1024&h=576",
    "tip": "别让强行超过无痛伸展的范围；保持动作缓慢且深思熟虑",
    "source": "fitwill"
  },
  {
    "id": "fw-3566",
    "name": "roll-upper-back",
    "nameZh": "上背部滚轴放松",
    "bodyPart": "背部",
    "equipment": "foam roll",
    "equipmentCn": "泡沫轴",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3566?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3566.mp4",
    "tip": "滚动或回到预备姿势时向心收缩时吐气，保持动作平稳且受控；收下颚，使颈部保持伸展和放松",
    "source": "fitwill"
  },
  {
    "id": "fw-11230",
    "name": "decline-diamond-pike-push-up",
    "nameZh": "下斜菱形折刀俯卧撑",
    "bodyPart": "肩部",
    "equipment": "other",
    "equipmentCn": "平凳",
    "primaryMuscles": [
      "shoulders"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/11230?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11230.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-9210",
    "name": "lying-upper-trapezius-press",
    "nameZh": "仰卧上斜方肌推压",
    "bodyPart": "颈部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "traps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9210?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9210.mp4",
    "tip": "抬头耸肩时向心收缩时吐气，下放回位时回位时吸气；再往上会让向心收缩转移到下背部和颈前部",
    "source": "fitwill"
  },
  {
    "id": "fw-2940",
    "name": "prone-single-arm-trap-raise",
    "nameZh": "俯卧单臂斜方肌上举",
    "bodyPart": "背部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/2940?w=1024&h=576",
    "tip": "专注于肩胛骨先动",
    "source": "fitwill"
  },
  {
    "id": "fw-9292",
    "name": "lying-prone-trapezius-press-back-extension",
    "nameZh": "俯卧斜方肌后压背伸展",
    "bodyPart": "上背部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "traps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9292?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9292.mp4",
    "tip": "抬起并向后压的时候向心收缩时吐气，回到俯卧姿势时回位时吸气；不要赶着回到预备姿势",
    "source": "fitwill"
  },
  {
    "id": "fw-8733",
    "name": "seated-alternate-arms-archer-back-rotation",
    "nameZh": "坐姿交替手臂射箭式上背旋转",
    "bodyPart": "背部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/8733?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8733.mp4",
    "tip": "头部保持在胸腔正上方",
    "source": "fitwill"
  },
  {
    "id": "fw-9117",
    "name": "sitting-lat-pulldown-on-a-chair",
    "nameZh": "坐姿椅上背阔肌下拉",
    "bodyPart": "背部",
    "equipment": "other",
    "equipmentCn": "长凳或座位",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9117?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9117.mp4",
    "tip": "向下拉肘时向心收缩时吐气，手臂回到预备姿势时回位时吸气；双手保持张开，不要握拳",
    "source": "fitwill"
  },
  {
    "id": "fw-6774",
    "name": "seated-rhomboid-stretch",
    "nameZh": "坐姿菱形肌拉伸",
    "bodyPart": "背部",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/6774?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/6774.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-9209",
    "name": "resistance-band-standing-trapezius-press",
    "nameZh": "弹力带站姿斜方肌推举",
    "bodyPart": "肩部",
    "equipment": "bands",
    "equipmentCn": "阻力带",
    "primaryMuscles": [
      "traps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9209?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9209.mp4",
    "tip": "向前推时向心收缩时吐气，回位到预备姿势时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-4490",
    "name": "roll-ball-trapezius-upper",
    "nameZh": "按摩球放松上斜方肌",
    "bodyPart": "其他",
    "equipment": "exercise ball",
    "equipmentCn": "滚球",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/4490?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/4490.mp4",
    "tip": "在按压酸痛点时缓慢向心收缩时吐气",
    "source": "fitwill"
  },
  {
    "id": "fw-1153",
    "name": "suspension-upper-back-stretch",
    "nameZh": "悬挂式上背部拉伸",
    "bodyPart": "背部",
    "equipment": "other",
    "equipmentCn": "悬挂",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/1153?w=1024&h=576",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-1791",
    "name": "trap-and-neck-stretch",
    "nameZh": "斜方肌与颈部拉伸",
    "bodyPart": "背部",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/1791?w=1024&h=576",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-11281",
    "name": "lever-seated-upper-back-row",
    "nameZh": "杠杆式坐姿上背划船",
    "bodyPart": "上背部",
    "equipment": "machine",
    "equipmentCn": "杠杆器械",
    "primaryMuscles": [
      "lats"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/11281?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/11281.mp4",
    "tip": "在收缩位置保持一秒；拉动把手时向心收缩时吐气，回到拉伸位置时回位时吸气",
    "source": "fitwill"
  },
  {
    "id": "fw-9718",
    "name": "alternating-side-lunge-and-kick",
    "nameZh": "交替侧弓步侧踢",
    "bodyPart": "腿部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9718?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9718.mp4",
    "tip": "下蹲进入弓步时回位时吸气，蹬起踢腿时向心收缩时吐气",
    "source": "fitwill"
  },
  {
    "id": "fw-9632",
    "name": "alternate-squat-to-front-lunge",
    "nameZh": "交替深蹲接前弓步",
    "bodyPart": "腿部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9632?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9632.mp4",
    "tip": "整只脚向心收缩站起，起身时向心收缩时吐气，在膝盖即将锁死前停下",
    "source": "fitwill"
  },
  {
    "id": "fw-3480",
    "name": "alternate-sprinter-lunge",
    "nameZh": "交替短跑冲刺弓步",
    "bodyPart": "臀部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/3480?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/3480.mp4",
    "tip": "全程在控制下降低身体",
    "source": "fitwill"
  },
  {
    "id": "fw-8970",
    "name": "low-lunge-to-hamstring-stretch",
    "nameZh": "低位弓步转腘绳肌拉伸",
    "bodyPart": "腿部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "hamstrings"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/8970?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8970.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-5893",
    "name": "low-lunge",
    "nameZh": "低位弓步",
    "bodyPart": "拉伸",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/5893?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/5893.mp4",
    "tip": "全程控制节奏，顶峰稍作停顿，靠目标肌群发力，别借惯性甩起。",
    "source": "fitwill"
  },
  {
    "id": "fw-9670",
    "name": "low-to-high-lunge-pose",
    "nameZh": "低位至高位弓步式",
    "bodyPart": "臀部",
    "equipment": "body only",
    "equipmentCn": "运动垫",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/9670?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/9670.mp4",
    "tip": "动作匀速有控制，离心阶段别放松，意念集中在发力肌群。",
    "source": "fitwill"
  },
  {
    "id": "fw-6009",
    "name": "low-lunge-left-side",
    "nameZh": "低弓步左侧",
    "bodyPart": "拉伸",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/6009?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/6009.mp4",
    "tip": "保持前脚跟落地",
    "source": "fitwill"
  },
  {
    "id": "fw-10353",
    "name": "low-lunge-stretch",
    "nameZh": "低弓步拉伸",
    "bodyPart": "臀部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/10353?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/10353.mp4",
    "tip": "保持躯干挺直、胸腔打开；前膝保持在脚踝正上方",
    "source": "fitwill"
  },
  {
    "id": "fw-6618",
    "name": "low-lunge-yoga-pose-anjaneyasana-i",
    "nameZh": "低弓步瑜伽体式 (Anjaneyasana I)",
    "bodyPart": "臀部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "glutes"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/6618?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/6618.mp4",
    "tip": "缓慢向心收缩时吐气有助于髋部下沉",
    "source": "fitwill"
  },
  {
    "id": "fw-7906",
    "name": "low-lunge-twist",
    "nameZh": "低弓步转体",
    "bodyPart": "腰部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "abdominals"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7906?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7906.mp4",
    "tip": "后腿要保持做功；不要勉强颈部",
    "source": "fitwill"
  },
  {
    "id": "fw-8868",
    "name": "low-lunge-to-hamstring-stretch-advanced",
    "nameZh": "低弓步转腘绳肌拉伸（高级）",
    "bodyPart": "拉伸",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "hamstrings"
    ],
    "secondaryMuscles": [],
    "category": "stretching",
    "image": "https://fitwill.app/api/image/8868?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/8868.mp4",
    "tip": "先摆好姿势再加重，宁轻勿假，关节保持中立位。",
    "source": "fitwill"
  },
  {
    "id": "fw-7702",
    "name": "side-bend-side-lunge",
    "nameZh": "侧屈侧弓步",
    "bodyPart": "腿部",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": [
      "quadriceps"
    ],
    "secondaryMuscles": [],
    "category": "strength",
    "image": "https://fitwill.app/api/image/7702?w=1024&h=576",
    "video": "https://s3.us-east-005.backblazeb2.com/fitwill/videos/web/7702.mp4",
    "tip": "向侧弓步回落时向心收缩时吐气,起身时回位时吸气,保持呼吸平稳,别全程憋气",
    "source": "fitwill"
  },
  // ============================================================================
  // 斗腕专项动作（#/library 斗腕分类追加；id 前缀 fw-aw-）
  // 桌面对抗（armwrestling）专属动作：rise/cup/top roll/hook/后压力/旋内/锁位/尺偏/指力等
  // 动图说明：标 approx 的复用素材站腕部动作近似演示；无动图的在库内走 B 站兜底
  // ============================================================================
  {
    "id": "fw-aw-rise",
    "name": "rise wrist raise",
    "nameZh": "Rise 挺腕（立腕）",
    "bodyPart": "前臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": ["forearms"],
    "secondaryMuscles": ["biceps"],
    "category": "armwrest",
    "image": "https://fitwill.app/api/image/1412?w=1024&h=576",
    "gif": "https://fitness.xingshuwen.com/videos/1412-SJAA2IQ.gif",
    "tip": "前臂放平，手腕从中立位向上挺起至极限再控回，幅度小、控制慢；斗腕立腕力量的核心，高位手位的根基。",
    "source": "fitwill"
  },
  {
    "id": "fw-aw-cup",
    "name": "cup wrist curl",
    "nameZh": "Cup 杯握（屈腕钩握）",
    "bodyPart": "前臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": ["forearms"],
    "secondaryMuscles": [],
    "category": "armwrest",
    "image": "https://fitwill.app/api/image/1412?w=1024&h=576",
    "gif": "https://fitness.xingshuwen.com/videos/1412-SJAA2IQ.gif",
    "tip": "哑铃横握（握杯姿势），手腕向掌心侧屈把哑铃一端扣向自己身体；发力想象把对手手背压向自己掌心。",
    "source": "fitwill"
  },
  {
    "id": "fw-aw-toproll",
    "name": "top roll band",
    "nameZh": "Top Roll 翻腕滚压",
    "bodyPart": "前臂",
    "equipment": "band",
    "equipmentCn": "弹力带",
    "primaryMuscles": ["forearms"],
    "secondaryMuscles": ["biceps", "lats"],
    "category": "armwrest",
    "image": "https://fitwill.app/api/image/1412?w=1024&h=576",
    "tip": "弹力带固定低处，握拳模拟斗腕握法，先立腕（rise）再顺势旋后翻腕并向后拉，一气呵成；重点是「翻」的动作链不是拉重。",
    "source": "fitwill"
  },
  {
    "id": "fw-aw-hook",
    "name": "hook pull band",
    "nameZh": "Hook 钩手训练",
    "bodyPart": "前臂",
    "equipment": "band",
    "equipmentCn": "弹力带",
    "primaryMuscles": ["forearms"],
    "secondaryMuscles": ["biceps", "shoulders"],
    "category": "armwrest",
    "image": "https://fitwill.app/api/image/1412?w=1024&h=576",
    "tip": "弹力带固定前上方，掌心朝自己握拳，屈腕钩住后内旋并把肘拉向身体；模拟钩手战术的钩住+内压+回收三段发力。",
    "source": "fitwill"
  },
  {
    "id": "fw-aw-backpressure",
    "name": "back pressure pull",
    "nameZh": "Back Pressure 后压力",
    "bodyPart": "手臂",
    "equipment": "band",
    "equipmentCn": "弹力带",
    "primaryMuscles": ["biceps"],
    "secondaryMuscles": ["lats", "middle back"],
    "category": "armwrest",
    "image": "https://fitwill.app/api/image/2380?w=1024&h=576",
    "gif": "https://fitness.xingshuwen.com/videos/2380-JYfT90s.gif",
    "tip": "弹力带固定前方，握拳屈肘向后拉，肩胛后收、肘贴身体；决定你能不能把对手拉出中心线。",
    "source": "fitwill"
  },
  {
    "id": "fw-aw-internal-rot",
    "name": "internal rotation band",
    "nameZh": "肩旋内拉钩",
    "bodyPart": "肩部",
    "equipment": "band",
    "equipmentCn": "弹力带",
    "primaryMuscles": ["shoulders"],
    "secondaryMuscles": ["forearms"],
    "category": "armwrest",
    "image": "https://fitwill.app/api/image/1412?w=1024&h=576",
    "tip": "弹力带固定体侧，屈肘90度大臂贴身，前臂向内旋转拉弹力带；钩手战术的「内旋」主要靠这条链。",
    "source": "fitwill"
  },
  {
    "id": "fw-aw-shrug-lock",
    "name": "shrug lock position",
    "nameZh": "耸肩锁位（肩带后缩）",
    "bodyPart": "肩部",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": ["traps"],
    "secondaryMuscles": ["shoulders"],
    "category": "armwrest",
    "image": "https://fitwill.app/api/image/1404?w=1024&h=576",
    "gif": "https://fitness.xingshuwen.com/videos/1404-RVJz3AT.gif",
    "tip": "持重物于体侧，耸肩并让肩胛后缩下沉，顶端停1-2秒；高位对拉时肩带锁住是防被压翻的最后一层。",
    "source": "fitwill"
  },
  {
    "id": "fw-aw-ulnar-deviation",
    "name": "ulnar deviation curl",
    "nameZh": "尺偏腕弯举（专项）",
    "bodyPart": "前臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": ["forearms"],
    "secondaryMuscles": [],
    "category": "armwrest",
    "image": "https://fitwill.app/api/image/0310?w=1024&h=576",
    "gif": "https://fitness.xingshuwen.com/videos/0310-KUzvbgR.gif",
    "tip": "哑铃握手中，只做手腕向小指侧偏移（尺偏），幅度小控制慢；斗腕桌面力线的核心，手腕没力常是尺偏链弱。",
    "source": "fitwill"
  },
  {
    "id": "fw-aw-wrist-extension",
    "name": "wrist extension reverse",
    "nameZh": "腕伸（反手背伸）",
    "bodyPart": "前臂",
    "equipment": "dumbbell",
    "equipmentCn": "哑铃",
    "primaryMuscles": ["forearms"],
    "secondaryMuscles": [],
    "category": "armwrest",
    "image": "https://fitwill.app/api/image/1412?w=1024&h=576",
    "gif": "https://fitness.xingshuwen.com/videos/1412-SJAA2IQ.gif",
    "tip": "反手（掌心向下）腕弯举或手腕背伸对抗；rise的「立腕」需要伸腕链配合，别只练屈腕。",
    "source": "fitwill"
  },
  {
    "id": "fw-aw-finger-close",
    "name": "finger closure grip",
    "nameZh": "指屈闭合（手指握力器）",
    "bodyPart": "前臂",
    "equipment": "other",
    "equipmentCn": "握力器",
    "primaryMuscles": ["forearms"],
    "secondaryMuscles": [],
    "category": "armwrest",
    "image": "https://fitwill.app/api/image/1412?w=1024&h=576",
    "tip": "握力器/捏力球做手指完全闭合的握压；指力决定你能不能包住对手拇指侧，闭合力量比单纯握力更重要。",
    "source": "fitwill"
  },
  {
    "id": "fw-aw-table-iso",
    "name": "table top isometric",
    "nameZh": "桌面对抗等长",
    "bodyPart": "前臂",
    "equipment": "body only",
    "equipmentCn": "自身体重",
    "primaryMuscles": ["forearms"],
    "secondaryMuscles": ["biceps", "shoulders"],
    "category": "armwrest",
    "image": "https://fitwill.app/api/image/1412?w=1024&h=576",
    "tip": "桌面或与搭子对握：一方施压一方顶住，各方向（立腕位/钩手位/翻腕位）分别做10-15秒等长；把力量翻译到桌面上的最快方式。",
    "source": "fitwill"
  },
  {
    "id": "fw-aw-ulnar-iso",
    "name": "ulnar deviation isometric",
    "nameZh": "尺偏侧链等长",
    "bodyPart": "前臂",
    "equipment": "band",
    "equipmentCn": "弹力带",
    "primaryMuscles": ["forearms"],
    "secondaryMuscles": [],
    "category": "armwrest",
    "image": "https://fitwill.app/api/image/1412?w=1024&h=576",
    "tip": "手腕保持中立位，侧偏到极限后等长收缩10-15秒，可用弹力带或手腕负重完成。",
    "source": "fitwill"
  }
];
