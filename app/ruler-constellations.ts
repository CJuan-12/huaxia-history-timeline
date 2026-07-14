export type ConstellationRelationKind = "lineage" | "partnership" | "conflict";

export type ConstellationNode = {
  id: string;
  rulerName: string;
  label: string;
  years: string;
  x: number;
  y: number;
};

export type ConstellationEdge = {
  from: string;
  to: string;
  kind: ConstellationRelationKind;
  label: string;
  detail: string;
  labelOffset?: number;
};

export type RulerConstellation = {
  id: string;
  eyebrow: string;
  title: string;
  period: string;
  intro: string;
  nodes: ConstellationNode[];
  edges: ConstellationEdge[];
};

export const rulerConstellations: RulerConstellation[] = [
  {
    id: "early-tang",
    eyebrow: "唐初至开元",
    title: "李唐与武周权力星群",
    period: "618—712",
    intro: "从李渊建唐到李隆基即位，父子继承、夫妻共治与母子权力关系彼此交叠。",
    nodes: [
      { id: "li-yuan", rulerName: "唐高祖李渊", label: "李渊", years: "618—626", x: 90, y: 140 },
      { id: "li-shimin", rulerName: "唐太宗李世民", label: "李世民", years: "626—649", x: 245, y: 140 },
      { id: "li-zhi", rulerName: "唐高宗李治", label: "李治", years: "649—683", x: 405, y: 140 },
      { id: "wu-zetian", rulerName: "武则天", label: "武则天", years: "690—705", x: 405, y: 300 },
      { id: "li-xian", rulerName: "唐中宗李显", label: "李显", years: "两度在位", x: 610, y: 105 },
      { id: "li-dan", rulerName: "唐睿宗李旦", label: "李旦", years: "两度在位", x: 610, y: 300 },
      { id: "li-longji", rulerName: "唐玄宗李隆基", label: "李隆基", years: "712—756", x: 845, y: 300 },
    ],
    edges: [
      { from: "li-yuan", to: "li-shimin", kind: "lineage", label: "父子", detail: "李世民是李渊次子，玄武门之变后成为皇太子并继位。" },
      { from: "li-shimin", to: "li-zhi", kind: "lineage", label: "父子", detail: "李治是李世民第九子，贞观十七年被立为皇太子。" },
      { from: "li-zhi", to: "wu-zetian", kind: "partnership", label: "夫妻", detail: "二人既是帝后，也在高宗后期形成共同处理政务的权力组合。", labelOffset: 20 },
      { from: "li-zhi", to: "li-xian", kind: "lineage", label: "父子", detail: "李显是李治与武则天之子，两度即位。", labelOffset: -12 },
      { from: "wu-zetian", to: "li-xian", kind: "lineage", label: "母子", detail: "武则天曾废黜李显，晚年又由李显复位，亲缘与皇权长期冲突。", labelOffset: -16 },
      { from: "wu-zetian", to: "li-dan", kind: "lineage", label: "母子", detail: "李旦两次处在武则天主导的权力安排中。", labelOffset: 12 },
      { from: "li-dan", to: "li-longji", kind: "lineage", label: "父子", detail: "李隆基协助父亲复位，后受禅登基。" },
    ],
  },
  {
    id: "early-ming",
    eyebrow: "洪武至宣德",
    title: "明初皇位分岔星图",
    period: "1368—1435",
    intro: "朱元璋的继承安排在祖孙与燕王一支之间分岔，靖难之役又重写了皇位传承线。",
    nodes: [
      { id: "zhu-yuanzhang", rulerName: "朱元璋", label: "朱元璋", years: "1368—1398", x: 120, y: 210 },
      { id: "zhu-yunwen", rulerName: "朱允炆", label: "朱允炆", years: "1398—1402", x: 365, y: 90 },
      { id: "zhu-di", rulerName: "朱棣", label: "朱棣", years: "1402—1424", x: 365, y: 315 },
      { id: "zhu-gaochi", rulerName: "朱高炽", label: "朱高炽", years: "1424—1425", x: 610, y: 315 },
      { id: "zhu-zhanji", rulerName: "朱瞻基", label: "朱瞻基", years: "1425—1435", x: 845, y: 315 },
    ],
    edges: [
      { from: "zhu-yuanzhang", to: "zhu-yunwen", kind: "lineage", label: "祖孙继承", detail: "太子朱标早逝后，朱元璋立朱标之子朱允炆为皇太孙。", labelOffset: -12 },
      { from: "zhu-yuanzhang", to: "zhu-di", kind: "lineage", label: "父子", detail: "朱棣是朱元璋第四子，受封燕王。", labelOffset: 12 },
      { from: "zhu-yunwen", to: "zhu-di", kind: "conflict", label: "叔侄 · 靖难", detail: "建文帝削藩后，燕王朱棣起兵，攻入南京并夺取皇位。", labelOffset: 22 },
      { from: "zhu-di", to: "zhu-gaochi", kind: "lineage", label: "父子", detail: "朱高炽为朱棣长子，继位为明仁宗。" },
      { from: "zhu-gaochi", to: "zhu-zhanji", kind: "lineage", label: "父子", detail: "朱瞻基继承父亲朱高炽的皇位，开启宣德时期。" },
    ],
  },
  {
    id: "early-qing",
    eyebrow: "后金至嘉庆",
    title: "清前期七代传承星链",
    period: "1616—1820",
    intro: "从后金汗位到清朝皇位，七代传承呈现父子主线，也包含皇太极由宗室推举与雍正继位争议。",
    nodes: [
      { id: "nurhaci", rulerName: "努尔哈赤", label: "努尔哈赤", years: "1616—1626", x: 85, y: 210 },
      { id: "hong-taiji", rulerName: "皇太极", label: "皇太极", years: "1626—1643", x: 230, y: 105 },
      { id: "shunzhi", rulerName: "顺治帝福临", label: "顺治", years: "1643—1661", x: 370, y: 260 },
      { id: "kangxi", rulerName: "康熙帝玄烨", label: "康熙", years: "1661—1722", x: 510, y: 105 },
      { id: "yongzheng", rulerName: "雍正帝胤禛", label: "雍正", years: "1722—1735", x: 650, y: 260 },
      { id: "qianlong", rulerName: "乾隆帝弘历", label: "乾隆", years: "1735—1796", x: 790, y: 105 },
      { id: "jiaqing", rulerName: "嘉庆帝颙琰", label: "嘉庆", years: "1796—1820", x: 930, y: 260 },
    ],
    edges: [
      { from: "nurhaci", to: "hong-taiji", kind: "lineage", label: "父子 · 推举", detail: "努尔哈赤死后，皇太极在诸贝勒权力格局中被拥立。" },
      { from: "hong-taiji", to: "shunzhi", kind: "lineage", label: "父子", detail: "皇太极猝逝后，幼子福临在宗室妥协中继位。" },
      { from: "shunzhi", to: "kangxi", kind: "lineage", label: "父子", detail: "玄烨是顺治帝第三子，八岁即位。" },
      { from: "kangxi", to: "yongzheng", kind: "lineage", label: "父子 · 争议", detail: "胤禛在长期储位竞争后继位，过程在后世产生诸多争论。" },
      { from: "yongzheng", to: "qianlong", kind: "lineage", label: "父子 · 密储", detail: "弘历经秘密立储制度确定为继承人。" },
      { from: "qianlong", to: "jiaqing", kind: "lineage", label: "父子 · 禅位", detail: "乾隆帝禅位于颙琰，但仍以太上皇身份掌握最高权力至去世。" },
    ],
  },
];
