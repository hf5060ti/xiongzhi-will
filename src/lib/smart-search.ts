// EXPORTS: smartMatch, SEARCH_ALIASES, normalizeQuery, buildMuscleAliases
// 智能化搜索：同义词 / 别名 / 拼音首字母 / 模糊匹配
// 目标：解决"搜索不准"——用户输入口语化、缩写、中英混排、错别字都能命中

/** 常见动作/肌群同义词表（口语 → 标准词） */
export const SEARCH_ALIASES: Record<string, string[]> = {
  // 肌群口语
  胸: ['chest', '胸肌', '卧推'],
  胸肌: ['chest', '胸'],
  背: ['back', '背部', 'lats', '背阔肌', '引体'],
  背部: ['back', '背'],
  腿: ['legs', '腿部', 'quadriceps', '股四头肌', '深蹲'],
  腿部: ['legs', '腿'],
  肩: ['shoulders', '肩部', '三角肌'],
  肩部: ['shoulders', '肩'],
  腹: ['abdominals', '腹肌', 'core', '核心'],
  腹肌: ['abdominals', '腹'],
  核心: ['abdominals', 'core'],
  臀: ['glutes', '臀肌', '臀部'],
  臀部: ['glutes', '臀'],
  手臂: ['biceps', 'triceps', '二头肌', '三头肌'],
  胳膊: ['biceps', 'triceps', '二头肌', '三头肌'],
  二头: ['biceps', '二头肌'],
  三头: ['triceps', '三头肌'],
  小腿: ['calves', 'calf'],
  大腿: ['quadriceps', 'hamstrings', '股四头肌', '腘绳肌'],
  前臂: ['forearms'],
  斜方: ['traps', '斜方肌'],
  // 常见动作口语
  卧推: ['bench press', 'chest press', 'Barbell Bench Press'],
  推胸: ['bench press', 'chest press'],
  划船: ['row', 'Bent Over Row', 'rowing'],
  硬拉: ['deadlift', 'Romanian Deadlift'],
  深蹲: ['squat', 'leg press'],
  引体: ['pull up', 'chin up', 'Pull Up'],
  引体向上: ['pull up', 'chin up', 'Pull Up'],
  俯卧撑: ['push up', 'Push Up'],
  弯举: ['curl', 'Barbell Curl', 'Dumbbell Curl'],
  飞鸟: ['lateral raise', 'fly', 'Dumbbell Fly', '侧平举'],
  平举: ['raise', 'lateral raise', 'front raise'],
  臂屈伸: ['dips', 'extension', 'Dips', 'pushdown'],
  推举: ['press', 'overhead press', 'shoulder press', '实力推'],
  实力推: ['overhead press', 'Overhead Press'],
  腿举: ['leg press', 'Leg Press'],
  提踵: ['calf raise', 'Calf Raise'],
  卷腹: ['crunch', 'Crunch', 'Sit-Up'],
  举腿: ['leg raise', 'Hanging Leg Raise'],
  平板支撑: ['plank', 'Plank'],
  波比: ['burpee', 'Burpee'],
  跳绳: ['jump rope', 'Jump Rope'],
  高翻: ['clean', 'power clean'],
  抓举: ['snatch'],
  挺举: ['clean and jerk'],
  箭步蹲: ['lunge', 'Lunge'],
  保加利亚: ['bulgarian split squat', 'Bulgarian Split Squat'],
  臀桥: ['hip thrust', 'glute bridge', 'Hip Thrust'],
  罗马尼亚: ['romanian deadlift', 'Romanian Deadlift'],
  面拉: ['face pull', 'Face Pull'],
  高位下拉: ['lat pulldown', 'Pulldown', 'Lat Pulldown'],
  坐姿划船: ['seated row', 'Seated Row'],
  反向飞鸟: ['reverse fly', 'Reverse Fly', 'rear delt'],
  // 器械口语
  杠铃: ['barbell'],
  哑铃: ['dumbbell'],
  壶铃: ['kettlebells', 'kettlebell'],
  绳索: ['cable'],
  器械: ['machine'],
  弹力带: ['bands', 'band'],
  药球: ['medicine ball'],
  自重: ['body only', 'bodyweight'],
  史密斯: ['smith machine'],
  龙门架: ['cable', 'machine'],
  战绳: ['battle rope'],
  拉力器: ['cable', 'machine'],
  夹胸: ['fly', 'chest fly', 'pec deck'],
  夹背: ['row', 'pulldown'],
  上斜: ['incline'],
  下斜: ['decline'],
  推肩: ['overhead press', 'shoulder press'],
  耸肩: ['shrug'],
  弯腿: ['leg curl', 'hamstring'],
  伸腿: ['leg extension', 'quadriceps'],
  蹬腿: ['leg press'],
  开合跳: ['jumping jack'],
  高抬腿: ['high knee', 'marching'],
  波比跳: ['burpee'],
  登山跑: ['mountain climber'],
  仰卧起坐: ['sit-up', 'crunch'],
  深蹲跳: ['jump squat', 'squat jump'],
  弓步: ['lunge'],
  箭步: ['lunge'],
  臀推: ['hip thrust', 'glute bridge'],
  前平举: ['front raise'],
  侧平举: ['lateral raise', 'side raise'],
  绳索下压: ['pushdown', 'cable'],
  窄距: ['close grip', 'narrow'],
  宽距: ['wide grip'],
  反手: ['chin up', 'reverse grip', 'supinated'],
  正手: ['pull up', 'pronated'],
  对握: ['neutral grip', 'hammer'],
  // 训练术语
  复合: ['compound'],
  孤立: ['isolation'],
  热身: ['warm up', 'stretch'],
  拉伸: ['stretch'],
  爆发力: ['power', 'explosive'],
  耐力: ['endurance', 'cardio'],
  力量: ['strength'],
};

/** 中文 → 拼音首字母（常用词覆盖，用于拼音缩写搜索，如 wotui=卧推） */
const PINYIN_MAP: Record<string, string> = {
  卧: 'w', 推: 't', 胸: 'x', 背: 'b', 腿: 't', 肩: 'j', 腹: 'f', 臀: 't',
  手: 's', 臂: 'b', 杠: 'g', 铃: 'l', 哑: 'y', 壶: 'h', 绳: 's', 索: 's',
  机: 'j', 械: 'x', 深: 's', 蹲: 'd', 硬: 'y', 拉: 'l', 引: 'y', 体: 't',
  向: 'x', 上: 's', 俯: 'f', 撑: 'c', 弯: 'w', 举: 'j', 飞: 'f',
  鸟: 'n', 平: 'p', 屈: 'q', 伸: 's', 卷: 'j',
  提: 't', 踵: 'z', 平板: 'pb', 支撑: 'zc', 波比: 'bb', 跳绳: 'ts',
};

/** 规范化搜索词：去空白、转小写 */
export function normalizeQuery(q: string): string {
  return (q || '').trim().toLowerCase();
}

/**
 * 智能匹配：查询词与候选文本是否匹配
 * 支持：精确包含、同义词展开、拼音首字母缩写
 */
export function smartMatch(query: string, texts: string[]): boolean {
  const q = normalizeQuery(query);
  if (!q) return true; // 无查询 = 全部匹配
  const joined = texts.join(' | ').toLowerCase();

  // 1. 直接包含
  if (joined.includes(q)) return true;

  // 2. 同义词展开：查询词的每个别名，若命中候选文本则匹配
  for (const [alias, synonyms] of Object.entries(SEARCH_ALIASES)) {
    // 查询包含别名（如 "卧推怎么练" 包含 "卧推"）
    if (q.includes(alias.toLowerCase())) {
      if (synonyms.some((s) => joined.includes(s.toLowerCase()))) return true;
    }
    // 查询本身就是别名（如输入 "bench"）
  }
  // 3. 反向：候选文本中的别名被查询命中
  for (const [alias, synonyms] of Object.entries(SEARCH_ALIASES)) {
    if (q === alias.toLowerCase() || q.includes(alias.toLowerCase())) {
      if (synonyms.some((s) => joined.includes(s.toLowerCase()))) return true;
    }
  }

  // 4. 拼音首字母缩写：把查询拆成每个汉字首字母，与候选拼音拼接匹配
  // 例如输入 "wotui" → 匹配 "卧推"
  if (/^[a-z]+$/.test(q)) {
    for (const [cn, py] of Object.entries(PINYIN_MAP)) {
      if (py === q && joined.includes(cn)) return true;
      // 多字词：pb=平板, bb=波比, ts=跳绳
    }
  }

  // 5. 多词 AND：查询含空格/逗号时，每个词都要命中（词序无关）
  if (q.includes(' ')) {
    const parts = q.split(/\s+/).filter(Boolean);
    if (parts.length > 1) {
      return parts.every((p) => {
        // 每个词递归判断（去掉空格后单字词）
        return smartMatch(p, texts);
      });
    }
  }

  return false;
}

/** 构建肌群别名：把英文肌群映射到常见中文口语 */
export function buildMuscleAliases(primary: string[], secondary: string[]): string[] {
  const all = [...new Set([...primary, ...secondary])];
  const cn: string[] = [];
  for (const m of all) {
    switch (m) {
      case 'chest': cn.push('胸肌', '胸', '胸部'); break;
      case 'shoulders': cn.push('肩部', '肩', '三角肌'); break;
      case 'abdominals': cn.push('腹肌', '腹', '核心'); break;
      case 'quadriceps': cn.push('股四头肌', '大腿前侧', '腿'); break;
      case 'hamstrings': cn.push('腘绳肌', '大腿后侧', '腿'); break;
      case 'triceps': cn.push('三头肌', '三头'); break;
      case 'biceps': cn.push('二头肌', '二头'); break;
      case 'lats': cn.push('背阔肌', '背部', '背'); break;
      case 'middle back': cn.push('上背部', '背'); break;
      case 'lower back': cn.push('下背部', '腰', '背'); break;
      case 'calves': cn.push('小腿'); break;
      case 'forearms': cn.push('前臂'); break;
      case 'glutes': cn.push('臀肌', '臀', '臀部'); break;
      case 'traps': cn.push('斜方肌', '斜方'); break;
      case 'adductors': cn.push('内收肌', '大腿内侧'); break;
      case 'abductors': cn.push('外展肌', '大腿外侧'); break;
      case 'neck': cn.push('颈部', '脖子'); break;
      case 'cardio': cn.push('心肺', '有氧'); break;
      default: cn.push(m);
    }
  }
  return cn;
}
