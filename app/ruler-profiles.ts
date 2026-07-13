export type RulerProfile = {
  id: string;
  eraId: string;
  name: string;
  personalName: string;
  title: string;
  dynasty: string;
  reign: string;
  lifespan: string;
  identity: string;
  portrait: {
    src?: string;
    alt: string;
    kind: "宫廷画像" | "传世画像" | "后世绘像" | "暂无可靠传世画像";
    credit: string;
    sourceUrl?: string;
  };
  traits: string[];
  mbti: {
    code: string;
    label: string;
    summary: string;
    dimensions: Array<{
      letter: string;
      name: string;
      evidence: string;
    }>;
  };
  personality: string;
  achievements: string[];
  limits: string[];
  ending: string;
  assessment: string;
};

export const rulerProfiles: RulerProfile[] = [
  {
    id: "qin-shihuang",
    eraId: "qin",
    name: "秦始皇",
    personalName: "嬴政",
    title: "首位皇帝",
    dynasty: "秦",
    reign: "前246—前210年；前221年起称皇帝",
    lifespan: "前259—前210年",
    identity: "兼并六国，并以皇帝、郡县和统一标准重塑天下秩序的统治者。",
    portrait: {
      src: "/rulers/qin-shihuang.jpg",
      alt: "秦始皇后世想象画像",
      kind: "后世绘像",
      credit: "19世纪摹本，原图可追溯至1609年；Wikimedia Commons 公版",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:QinShiHuang19century.jpg",
    },
    traits: ["强势果断", "制度雄心", "高度控制"],
    mbti: {
      code: "ENTJ",
      label: "战略组织者",
      summary: "更接近以宏大目标、制度设计和强力执行驱动的 ENTJ；求仙与巡行又显示他并非只关心日常行政，也持续追逐超越现实的目标。",
      dimensions: [
        { letter: "E", name: "外向驱动", evidence: "反复全国巡行、刻石宣示，把个人意志主动投射到天下秩序。" },
        { letter: "N", name: "整体想象", evidence: "从六国并立直接设想统一文字、道路和行政体系。" },
        { letter: "T", name: "规则权衡", evidence: "更看重制度效率与控制效果，较少为人情关系保留弹性。" },
        { letter: "J", name: "计划控制", evidence: "工程、法规与官僚体系均追求可规划、可检查和统一执行。" },
      ],
    },
    personality: "从统一战争与制度建设看，嬴政有极强的执行意志，倾向用统一标准和严密行政解决政治问题。他对权力安全高度警觉，对反对意见与地方自主空间采取严厉限制。",
    achievements: [
      "结束战国兼并局面，建立统一的秦帝国。",
      "推广郡县制，统一文字、度量衡、货币与交通标准。",
      "建设全国性道路和边防工程，为后世帝国提供制度框架。",
    ],
    limits: [
      "大规模工程、战争和徭役带来沉重社会负担。",
      "严刑治理与思想控制压缩了社会缓冲空间。",
    ],
    ending: "前210年巡行途中病逝于沙丘，死讯一度被隐瞒，随后发生继承政变。",
    assessment: "既是统一帝国制度的奠基者，也是高强度动员与严厉统治风险的典型。",
  },
  {
    id: "han-wudi",
    eraId: "western-han",
    name: "汉武帝",
    personalName: "刘彻",
    title: "开拓型雄主",
    dynasty: "西汉",
    reign: "前141—前87年",
    lifespan: "前156—前87年",
    identity: "大幅扩张汉帝国边疆、财政动员和中央权力的代表性君主。",
    portrait: {
      src: "/rulers/han-wudi.jpg",
      alt: "汉武帝后世绘制的全身画像",
      kind: "后世绘像",
      credit: "《圣君贤臣全身像册》；Wikimedia Commons 公版",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Liu_Che_(Emperor_Wu_of_Han).png",
    },
    traits: ["雄心进取", "意志强硬", "晚年调整"],
    mbti: {
      code: "ENTJ",
      label: "扩张型统筹者",
      summary: "长期战争、财政重构与频繁用人显示出典型的目标导向和组织能力；他爱好文学辞赋、封禅与求仙，也反映出强烈的象征想象。",
      dimensions: [
        { letter: "E", name: "外向驱动", evidence: "积极召集不同人才，并通过战争、外交和礼仪持续向外扩张影响。" },
        { letter: "N", name: "远景开拓", evidence: "经营西域、封禅与新制度都指向超越既有边界的帝国愿景。" },
        { letter: "T", name: "结果优先", evidence: "愿以盐铁财政和高成本战争换取长期战略收益。" },
        { letter: "J", name: "持续推进", evidence: "数十年围绕边疆与中央集权推进一套连贯政策。" },
      ],
    },
    personality: "长期对匈奴战争、财政改革和人才任用显示出强烈的开拓意志。他也容易采取严厉手段，晚年在社会与财政压力增大后开始调整征伐政策。",
    achievements: [
      "打击匈奴、控制河西走廊，推动汉朝与西域的联系。",
      "推行盐铁、均输等措施，加强中央资源调度。",
      "发展太学、察举与监察制度，继续塑造官僚国家。",
    ],
    limits: [
      "长期战争和大型工程加重了财政、赋役与人口压力。",
      "晚年巫蛊之祸造成太子刘据及大量官民遇害。",
    ],
    ending: "前87年病逝，临终安排霍光等辅佐年幼的汉昭帝。",
    assessment: "他把汉帝国推向扩张高峰，也展示了持续高动员给社会与宫廷政治带来的代价。",
  },
  {
    id: "han-guangwu",
    eraId: "eastern-han",
    name: "汉光武帝",
    personalName: "刘秀",
    title: "中兴之主",
    dynasty: "东汉",
    reign: "25—57年",
    lifespan: "前5—57年",
    identity: "在新末乱局中重建汉室，并逐步完成全国统一的东汉开国皇帝。",
    portrait: {
      src: "/rulers/han-guangwu.jpg",
      alt: "汉光武帝刘秀后世画像",
      kind: "后世绘像",
      credit: "《圣君贤臣全身像册》相关传世图像；Wikimedia Commons 公版",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Liu_Xiu_(Emperor_Guangwu_of_Han).png",
    },
    traits: ["沉着审势", "务实宽简", "善于整合"],
    mbti: {
      code: "ISTJ",
      label: "稳健重建者",
      summary: "刘秀更像重证据、重步骤的 ISTJ：先经营可控地盘，再逐个处理对手；太学经历与对经术秩序的重视也强化了这一倾向。",
      dimensions: [
        { letter: "I", name: "内敛蓄势", evidence: "较少以夸张姿态造势，更常通过观察形势和小步积累取得优势。" },
        { letter: "S", name: "现实落地", evidence: "统一后优先恢复农桑、户籍与地方秩序等具体事务。" },
        { letter: "T", name: "审慎计算", evidence: "善于分化联盟、控制节奏，并以制度安置功臣。" },
        { letter: "J", name: "秩序收束", evidence: "从河北立足到完成统一，路线渐进而有明确收束方向。" },
      ],
    },
    personality: "从河北立足、分化对手到逐步统一的过程看，刘秀较少冒进，善于等待形势与整合地方力量。即位后重视恢复生产，并以较温和方式安置功臣，但核心权力始终收归皇帝。",
    achievements: [
      "在群雄并立中恢复汉室，至36年前后基本完成统一。",
      "减少战争动员、整顿吏治，推动人口与农业恢复。",
      "妥善安置开国功臣，降低新王朝内部军事冲突。",
    ],
    limits: [
      "东汉政权依赖地方豪强支持，土地兼并问题并未解决。",
      "皇权与外戚、豪强之间的结构性张力延续到后世。",
    ],
    ending: "57年在洛阳去世，太子刘庄继位，是为汉明帝。",
    assessment: "他擅长在战争与恢复之间转换政策，是古代“中兴之主”的典型，但未能消除豪强政治的基础。",
  },
  {
    id: "sui-wendi",
    eraId: "sui",
    name: "隋文帝",
    personalName: "杨坚",
    title: "统一的重建者",
    dynasty: "隋",
    reign: "581—604年",
    lifespan: "541—604年",
    identity: "结束南北长期分裂、重新建立统一帝国的隋朝开国皇帝。",
    portrait: {
      src: "/rulers/sui-wendi.jpg",
      alt: "隋文帝杨坚传世帝王画像",
      kind: "传世画像",
      credit: "传世帝王图像；Wikimedia Commons 公版",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:%E9%9A%8B%E6%96%87%E5%B8%9D_%E6%9D%A8%E5%9D%9A.jpg",
    },
    traits: ["节俭勤政", "重视秩序", "晚年多疑"],
    mbti: {
      code: "ESTJ",
      label: "制度管理者",
      summary: "节俭生活、亲自理政和对户籍法令的重视，使杨坚很接近强调现实管理与秩序执行的 ESTJ。",
      dimensions: [
        { letter: "E", name: "直接管理", evidence: "频繁亲自过问官员、财政与宫廷事务，管理方式外显而直接。" },
        { letter: "S", name: "具体务实", evidence: "关注户口、仓储、赋役和衣食节俭等可衡量问题。" },
        { letter: "T", name: "规则判断", evidence: "更倾向依据法令和行政效率处理人与事。" },
        { letter: "J", name: "秩序偏好", evidence: "统一后迅速整理官制、法律与地方体系，追求稳定可控。" },
      ],
    },
    personality: "整顿官制、财政与户籍的行动显示他重视行政效率，并以节俭和亲自过问政务著称。维护皇权与家族秩序时手段强硬，晚年对官员和皇子的猜疑明显增加。",
    achievements: [
      "589年灭陈，结束南北朝对峙并恢复全国统一。",
      "整顿官制、户籍、赋役与法律，为唐代制度奠定基础。",
      "推动人口和农业恢复，形成史家所称的“开皇之治”。",
    ],
    limits: [
      "晚年用法趋严，并频繁猜忌、罢黜功臣与宗室。",
      "废杨勇、立杨广的继承安排长期受到争议。",
    ],
    ending: "604年死于仁寿宫，杨广继位；临终经过存在争议，不能据传闻作确定结论。",
    assessment: "他是隋唐统一帝国的重要奠基者，但晚年的继承安排也成为王朝转折的一环。",
  },
  {
    id: "tang-taizong",
    eraId: "tang",
    name: "唐太宗",
    personalName: "李世民",
    title: "贞观之治的核心人物",
    dynasty: "唐",
    reign: "626—649年",
    lifespan: "598—649年",
    identity: "通过玄武门之变即位，并推动贞观时期政治秩序的唐代代表君主。",
    portrait: {
      src: "/rulers/tang-taizong.jpg",
      alt: "明代绘制的唐太宗立像",
      kind: "后世绘像",
      credit: "明代南薰殿画像，台北故宫博物院藏；Wikimedia Commons 公版",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:TangTaizong.jpg",
    },
    traits: ["务实纳谏", "善用人才", "权力决断"],
    mbti: {
      code: "ENFJ",
      label: "共识型领导者",
      summary: "李世民既重视公开讨论、人才关系与政治共识，也拥有清晰的国家目标；他对书法、尤其王羲之作品的热爱，则显示其文化审美投入。",
      dimensions: [
        { letter: "E", name: "互动领导", evidence: "通过朝会、纳谏与密集君臣讨论形成决策。" },
        { letter: "N", name: "全局视野", evidence: "能把不同政治背景的人才纳入统一的贞观秩序。" },
        { letter: "F", name: "关系感知", evidence: "重视君臣信任、名声与说服，愿意让谏官公开纠正自己。" },
        { letter: "J", name: "目标明确", evidence: "在内政恢复、边疆和继承问题上均追求明确安排。" },
      ],
    },
    personality: "与魏征等大臣的互动显示他愿意听取不同意见，也善于把人才配置到合适位置。争夺和维护皇权时则极为果断，玄武门之变体现了其强硬一面。",
    achievements: [
      "恢复隋末战争破坏后的经济与行政秩序。",
      "重用不同政治背景的人才并鼓励谏议，改善决策。",
      "击败东突厥，加强对西域的经营。",
    ],
    limits: [
      "玄武门之变杀死兄弟并迫使唐高祖交权，长期存在伦理争议。",
      "后期对高句丽用兵未达目标，增加军事与后勤消耗。",
    ],
    ending: "649年病逝于翠微宫，太子李治继位，是为唐高宗。",
    assessment: "常被视为纳谏和用人的君主典型，但其统治同样建立在激烈宫廷斗争与军事扩张之上。",
  },
  {
    id: "wu-zetian",
    eraId: "tang",
    name: "武则天",
    personalName: "武曌",
    title: "武周皇帝",
    dynasty: "武周",
    reign: "690—705年正式称帝",
    lifespan: "624—705年",
    identity: "中国历史上唯一正式以皇帝称号统治全国的女性。",
    portrait: {
      src: "/rulers/wu-zetian.jpg",
      alt: "武则天后世想象画像",
      kind: "后世绘像",
      credit: "后世帝王画像；Wikimedia Commons 公版",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:A_Tang_Dynasty_Empress_Wu_Zetian.JPG",
    },
    traits: ["政治敏锐", "用人开放", "手段强硬"],
    mbti: {
      code: "INTJ",
      label: "长期策划者",
      summary: "从长期参与朝政到建立武周，武则天展现出耐心布局与结构性改造能力；她重文章、制举与政治象征，也偏好以新叙事塑造合法性。",
      dimensions: [
        { letter: "I", name: "观察蓄势", evidence: "在正式称帝前长期从宫廷内部积累经验、网络与权力。" },
        { letter: "N", name: "突破框架", evidence: "敢于重写性别、门第与皇位合法性的传统边界。" },
        { letter: "T", name: "权力计算", evidence: "用人、清洗和制度调整常以政治效果与控制力为先。" },
        { letter: "J", name: "长期布局", evidence: "从舆论符号到官僚选拔，形成多层次且持续推进的计划。" },
      ],
    },
    personality: "长期参与朝政与建立武周的过程显示，她对政治联盟、舆论与人才选拔判断敏锐，并敢于突破门第和性别限制。排除反对力量时则大量使用告密、酷吏与严厉惩罚。",
    achievements: [
      "扩大科举与制举取士，为非高门人才提供更多机会。",
      "延续并调整唐代制度，重视农业、户口和官僚考核。",
      "以女性皇帝身份执政，突破传统皇位继承的性别边界。",
    ],
    limits: [
      "宗室清洗与酷吏政治造成恐惧和冤狱。",
      "武周高度依赖其个人，未建立可持续的武氏继承秩序。",
    ],
    ending: "705年神龙政变后退位，唐中宗复位；武则天同年去世。",
    assessment: "她既是能力突出的最高统治者，也是以高压手段重组权力的政治人物。",
  },
  {
    id: "song-taizu",
    eraId: "northern-song",
    name: "宋太祖",
    personalName: "赵匡胤",
    title: "北宋开国皇帝",
    dynasty: "北宋",
    reign: "960—976年",
    lifespan: "927—976年",
    identity: "由后周将领成为开国皇帝，并重新整合五代以来军政秩序的统治者。",
    portrait: {
      src: "/rulers/song-taizu.jpg",
      alt: "宋太祖赵匡胤传世坐像",
      kind: "传世画像",
      credit: "南薰殿历代帝后像，台北故宫博物院藏；Wikimedia Commons 公版",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Song_Taizu_(cropped).jpg",
    },
    traits: ["审慎务实", "善控军权", "重视秩序"],
    mbti: {
      code: "ESTJ",
      label: "秩序整合者",
      summary: "军旅经历、直接用人和对制度化军权的执着，使赵匡胤更接近 ESTJ；其饮宴、谈判式释兵权也说明他善用现实关系完成管理目标。",
      dimensions: [
        { letter: "E", name: "现场领导", evidence: "从禁军统帅到统一战争，习惯在群体与组织中直接协调行动。" },
        { letter: "S", name: "现实处置", evidence: "更多采用调任、待遇和财政控制等具体办法化解风险。" },
        { letter: "T", name: "制度判断", evidence: "把将领个人问题转化为军政结构问题处理。" },
        { letter: "J", name: "秩序收束", evidence: "逐步收权并建立可持续的中央文官秩序。" },
      ],
    },
    personality: "处理禁军将领和地方政权时，赵匡胤倾向通过待遇、调任与制度安排降低直接冲突。他重视终结军人频繁拥立皇帝的局面，也由此重塑了军事权力结构。",
    achievements: [
      "建立宋朝并推进统一战争，为结束五代分裂奠定基础。",
      "逐步收回高级将领和节度使军政权力，降低政变风险。",
      "强化文官行政与中央财政，为北宋治理结构定型。",
    ],
    limits: [
      "军权集中与指挥层级增加的长期影响仍有争论。",
      "其突然去世和兄终弟及留下传说，但缺少证据作定论。",
    ],
    ending: "976年突然去世，其弟赵光义继位；“烛影斧声”不能视作已证实事实。",
    assessment: "他压低了五代式军事政变的频率，建立较稳定的文官帝国，但制度收益与军事约束并存。",
  },
  {
    id: "yuan-shizu",
    eraId: "yuan",
    name: "元世祖",
    personalName: "忽必烈",
    title: "大元皇帝与蒙古大汗",
    dynasty: "元",
    reign: "1260—1294年任大汗；1271年起为元朝皇帝",
    lifespan: "1215—1294年",
    identity: "建立元朝并最终消灭南宋、完成全国统一的蒙古统治者。",
    portrait: {
      src: "/rulers/kublai.jpg",
      alt: "元世祖忽必烈宫廷画像",
      kind: "宫廷画像",
      credit: "元代帝后半身像册，台北故宫博物院藏；Wikimedia Commons 公版",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:YuanEmperorAlbumKhubilaiPortrait.jpg",
    },
    traits: ["兼收并用", "制度务实", "扩张意志"],
    mbti: {
      code: "ENTP",
      label: "开放探索者",
      summary: "忽必烈频繁吸收蒙古、汉地、中亚与藏传佛教等多种顾问和制度方案，呈现强烈的开放试验倾向；对新城市、交通与远征也有持续兴趣。",
      dimensions: [
        { letter: "E", name: "多元连接", evidence: "广泛召集不同族群与文化背景的谋士、工匠和宗教人物。" },
        { letter: "N", name: "跨域整合", evidence: "尝试把草原帝国与中原官僚治理重新组合。" },
        { letter: "T", name: "方案比较", evidence: "在财政、行省和战争中偏好比较工具与实际效果。" },
        { letter: "P", name: "开放试验", evidence: "愿意不断采用新顾问、新制度与新远征方向，但成本控制不足。" },
      ],
    },
    personality: "任用蒙古、汉人、色目及其他背景官员，显示他善于吸收不同治理传统并把统治重心转向中原。他同时保持强烈扩张意志，多次发动海外与南方战争。",
    achievements: [
      "1271年定国号“大元”，1279年完成对南宋的征服。",
      "以大都为中心，发展行省、驿站与跨区域治理。",
      "促进欧亚范围内人员、技术与商品流动。",
    ],
    limits: [
      "对日本、越南、缅甸和爪哇的战争耗费巨大，部分失败。",
      "不同人群在任官、法律与赋役实践中待遇并不平等。",
    ],
    ending: "1294年病逝于大都，皇孙铁穆耳继位。",
    assessment: "他把蒙古征服政权改造为以中国为核心的元朝，但统一、等级治理与对外扩张应一并评价。",
  },
  {
    id: "ming-taizu",
    eraId: "ming",
    name: "明太祖",
    personalName: "朱元璋",
    title: "洪武皇帝",
    dynasty: "明",
    reign: "1368—1398年",
    lifespan: "1328—1398年",
    identity: "由贫苦出身的起义领袖成长为明朝开国皇帝的统治者。",
    portrait: {
      src: "/rulers/hongwu.jpg",
      alt: "明太祖朱元璋坐像",
      kind: "宫廷画像",
      credit: "明代帝王坐像；Wikimedia Commons 公版",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:A_Seated_Portrait_of_Ming_Emperor_Taizu.jpg",
    },
    traits: ["执行力强", "勤政严苛", "高度警惕"],
    mbti: {
      code: "ISTJ",
      label: "细节控制者",
      summary: "朱元璋亲批公文、重视户籍田亩与法令细节，表现出强烈的实务和规则倾向；贫困与战争经历又强化了节俭、警惕和可控秩序偏好。",
      dimensions: [
        { letter: "I", name: "个人掌控", evidence: "倾向亲自阅读奏章和作出决定，不愿让中枢权力脱离本人。" },
        { letter: "S", name: "细节实务", evidence: "高度关注里甲、黄册、鱼鳞图册与农业恢复。" },
        { letter: "T", name: "严厉规则", evidence: "常以法律威慑和制度服从判断官员行为。" },
        { letter: "J", name: "强秩序感", evidence: "追求从中央到乡里的固定层级、职责与检查方式。" },
      ],
    },
    personality: "从战争动员到重建户籍财政可见其极强的组织能力，并长期亲自处理大量政务。他对腐败和权力威胁极为警惕，整肃范围不断扩大并形成高压政治。",
    achievements: [
      "结束元末大规模战争，建立明朝并完成大部统一。",
      "重建户籍、土地、赋役和基层组织，推动农业恢复。",
      "加强中央皇权与地方控制，塑造明代基本制度。",
    ],
    limits: [
      "胡惟庸案、蓝玉案等清洗牵连甚广，造成政治恐惧与人才损失。",
      "废除丞相后政务负担大增，中枢协调更依赖皇帝本人。",
    ],
    ending: "1398年病逝于南京，皇太孙朱允炆继位，随后爆发靖难之役。",
    assessment: "他具有突出的战争领导与国家重建能力，但高压整肃和极端集权也留下结构性影响。",
  },
  {
    id: "ming-chengzu",
    eraId: "ming",
    name: "明成祖",
    personalName: "朱棣",
    title: "永乐皇帝",
    dynasty: "明",
    reign: "1402—1424年",
    lifespan: "1360—1424年",
    identity: "通过靖难之役夺取皇位，并把明帝国推向扩张与大型国家工程高峰的君主。",
    portrait: {
      src: "/rulers/yongle.jpg",
      alt: "明成祖朱棣宫廷画像",
      kind: "宫廷画像",
      credit: "明代宫廷画像；Wikimedia Commons 公版",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Yongle_(closeup).jpg",
    },
    traits: ["强势进取", "战略雄心", "勤政多疑"],
    mbti: {
      code: "ESTP",
      label: "行动冒险者",
      summary: "亲自起兵、屡次北征和快速推动迁都，令朱棣更接近靠行动把握机会的 ESTP；下西洋与大型营建也体现其偏好可见、宏大的现实成果。",
      dimensions: [
        { letter: "E", name: "外向行动", evidence: "习惯亲临战争和重大工程，以强势存在推动组织。" },
        { letter: "S", name: "现场现实", evidence: "关注军队、都城、航线等能够直接控制的现实资源。" },
        { letter: "T", name: "结果判断", evidence: "夺位、清洗与远征均明显以政治军事结果优先。" },
        { letter: "P", name: "机会驱动", evidence: "敢在高风险时机迅速行动，并持续开辟新的行动方向。" },
      ],
    },
    personality: "迁都、远航与北征等决策显示朱棣具有鲜明的战略雄心和持续行动力。他善于调动大型官僚与军事体系，但对建文旧臣和潜在反对者采取极严厉的清洗。",
    achievements: [
      "迁都北京，营建紫禁城并重塑帝国南北政治布局。",
      "派郑和多次下西洋，扩大明朝在印度洋区域的影响。",
      "组织编纂《永乐大典》，并多次北征蒙古。",
    ],
    limits: [
      "靖难夺位与清洗建文旧臣造成严重政治暴力。",
      "营建、远航与北征规模巨大，财政和人力成本高昂。",
    ],
    ending: "1424年第五次北征返程途中病逝于榆木川，太子朱高炽继位。",
    assessment: "他显著扩展了明朝的政治能见度与国家能力，也把夺位合法性和高成本动员的阴影带入统治。",
  },
  {
    id: "qing-kangxi",
    eraId: "qing",
    name: "康熙帝",
    personalName: "玄烨",
    title: "清圣祖",
    dynasty: "清",
    reign: "1661—1722年",
    lifespan: "1654—1722年",
    identity: "完成清初统一，并巩固多民族帝国秩序的长期在位皇帝。",
    portrait: {
      src: "/rulers/kangxi.jpg",
      alt: "康熙帝玄烨朝服宫廷画像",
      kind: "宫廷画像",
      credit: "清宫廷画家绘朝服像，故宫博物院藏；Wikimedia Commons 公版",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:The_Kangxi_Emperor.jpg",
    },
    traits: ["勤学务实", "富有耐性", "强势集权"],
    mbti: {
      code: "INTJ",
      label: "技术型策划者",
      summary: "康熙长期学习数学、天文、历法与医学，并把知识用于治河、测绘和外交判断；这种求证习惯与长期战略耐性更接近 INTJ。",
      dimensions: [
        { letter: "I", name: "深度研习", evidence: "愿意长期投入数学、天文和医学等需要独立钻研的知识。" },
        { letter: "N", name: "长期战略", evidence: "能把三藩、台湾、俄国与准噶尔问题放进长期帝国布局。" },
        { letter: "T", name: "技术求证", evidence: "偏好测量、计算、条约和治河工程等可验证方法。" },
        { letter: "J", name: "耐心推进", evidence: "重大问题往往分阶段处理，并长期保持目标一致。" },
      ],
    },
    personality: "亲政、巡行、治河和长期战争决策显示他重视学习具体事务，处理复杂问题时颇有耐性。他能够笼络不同官僚与地方力量，但始终把军政决策和皇位安全掌握在自己手中。",
    achievements: [
      "平定三藩、统一台湾，并应对准噶尔势力。",
      "与俄国签订《尼布楚条约》，通过谈判处理边界问题。",
      "重视治河、财政恢复与文化编纂，推动清初稳定。",
    ],
    limits: [
      "晚年储位反复和皇子结党持续多年，损害政治秩序。",
      "君主专制与思想审查继续强化。",
    ],
    ending: "1722年在畅春园去世，皇四子胤禛继位；民间改诏传闻缺少可靠证据。",
    assessment: "他是清朝奠基和巩固阶段的关键君主，行政耐性突出，成就也建立在强势集权和长期军事动员之上。",
  },
  {
    id: "qing-guangxu",
    eraId: "qing",
    name: "光绪帝",
    personalName: "载湉",
    title: "清德宗",
    dynasty: "清",
    reign: "1875—1908年",
    lifespan: "1871—1908年",
    identity: "身处帝国危机、曾试图通过戊戌变法推动制度改革的晚清皇帝。",
    portrait: {
      src: "/rulers/guangxu.jpg",
      alt: "光绪帝载湉宫廷画像",
      kind: "宫廷画像",
      credit: "清宫廷画家绘，故宫博物院藏；Wikimedia Commons 公版",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Emperor_Guangxu.jpg",
    },
    traits: ["求变急切", "重用新进", "处境受制"],
    mbti: {
      code: "INFJ",
      label: "理想改革者",
      summary: "光绪把国家危机理解为需要整体制度转型的问题，并将改革赋予明显的道义紧迫感；他依赖少数维新人士与书面方案，较接近理想驱动的 INFJ。",
      dimensions: [
        { letter: "I", name: "内向聚焦", evidence: "更多通过少数近臣、奏章与密集阅读形成改革判断。" },
        { letter: "N", name: "未来愿景", evidence: "关注教育、工业、行政与军制联动的整体制度转型。" },
        { letter: "F", name: "价值驱动", evidence: "改革言辞常带有救亡、自强与责任感，而非仅是技术修补。" },
        { letter: "J", name: "方案推进", evidence: "百日维新以密集诏令快速落地，显示强烈的计划与截止感。" },
      ],
    },
    personality: "甲午战败后的诏令与任用显示，光绪愿意接受制度改革并快速推动新政。但他缺少独立的军政基础，对既有权力结构的判断和联盟组织不足，改革意愿难以转化为稳定执行力。",
    achievements: [
      "支持戊戌变法，推动教育、行政、经济与军事改革议题。",
      "重用康有为、梁启超等维新人物，使制度变革进入最高决策层。",
      "其改革尝试为晚清新政与近代转型留下重要先声。",
    ],
    limits: [
      "百日维新节奏过快，缺少稳定官僚和军事联盟。",
      "长期受制于慈禧太后及既有权力格局，亲政空间有限。",
    ],
    ending: "戊戌政变后长期被幽禁，1908年在瀛台去世；现代检测提示砷中毒，但责任归属仍无法据此确定。",
    assessment: "他是有改革意愿却缺乏权力资源的悲剧性君主，其经历集中体现了晚清制度转型的阻力。",
  },
];
