"use client";
/* eslint-disable @next/next/no-img-element -- local historical portraits preserve original aspect ratios in this static archive */

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
  type WheelEvent,
} from "react";
import {
  allRulerProfiles,
  catalogStats,
  featuredRulersByEra,
  politiesForEra,
  rulersByEra,
  type CatalogRulerProfile,
} from "./ruler-catalog";
import { rulerConstellations } from "./ruler-constellations";

const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const rulerProfileByName = new Map(allRulerProfiles.map((ruler) => [ruler.name, ruler]));
const constellationCanvas = { scaleX: 1.65, scaleY: 1.35, offsetX: 110, offsetY: 70 } as const;

type EventItem = {
  year: string;
  title: string;
  summary: string;
  detail: string;
};

type Era = {
  id: string;
  name: string;
  years: string;
  phase: string;
  intro: string;
  rulers: string;
  fall: string;
  events: EventItem[];
};

const mbtiCriteria = [
  { key: "E / I", title: "互动取向", text: "比较公开动员、边互动边判断，与独处反思、小范围深谈；朝会和出征本身不直接算 E。" },
  { key: "S / N", title: "信息取向", text: "比较成例、资源与具体执行，和制度重构、整体格局与长期可能；守旧或改革不能单独定型。" },
  { key: "T / F", title: "权衡取向", text: "比较一致规则、利害和效能，与忠诚、伦理、关系及人的处境；残酷不等于 T，情绪强烈也不等于 F。" },
  { key: "J / P", title: "行动取向", text: "比较预先定案、标准化与持续执行，和保留选项、临机调整；专制不等于 J，失控也不等于 P。" },
] as const;

const relationshipCriteria = [
  { title: "个人情感", text: "观察依恋、悲恸、宽恕、愤怒及危机中的自我调节，只采用可重复的行为模式。" },
  { title: "大臣与近侍", text: "观察任人、授权、纳谏、奖惩和改错方式，这是君王资料中通常最有信息量的一组证据。" },
  { title: "伴侣与后妃", text: "观察合作、偏爱、冲突、继承干预和丧偶反应，并警惕宫廷叙事与胜朝污名。" },
  { title: "父母与宗族", text: "区分礼制规定与自发行为，重点看亲族利益和国家规则冲突时的选择。" },
  { title: "藩属与外部政权", text: "按时代分别理解封国、联盟、册封、朝贡与外交，观察战争、自治、联姻和文化接纳。" },
] as const;

const eras: Era[] = [
  {
    id: "xia",
    name: "夏",
    years: "约前2070—前1600",
    phase: "早期国家",
    intro: "传统史书中的第一个世袭王朝。夏的年代与世系仍主要依赖后世文献重建。",
    rulers: "禹 → 启 → 太康 → 仲康 → 相 → 少康 → 杼 → 槐 → 芒 → 泄 → 不降 → 扃 → 廑 → 孔甲 → 皋 → 发 → 桀",
    fall: "王权与部族联盟逐渐松动，商部族在东方崛起；传统记载称商汤在鸣条之战击败夏军。",
    events: [
      { year: "约前21世纪", title: "从禅让到世袭", summary: "启继承王位，“家天下”成为传统叙事中的制度转折。", detail: "这一变化意味着最高权力逐渐由部族联盟推举转为王族内部继承，早期国家结构开始稳定化。" },
      { year: "传统纪年", title: "少康复国", summary: "后羿、寒浞夺权后，少康重新建立夏后氏统治。", detail: "“少康中兴”体现了早期王权仍依赖部族、方国与婚姻联盟，中央控制远非后世帝国式结构。" },
      { year: "约前1600", title: "鸣条之战", summary: "商汤组织反夏力量，夏桀战败，夏朝终结。", detail: "具体过程缺少同时代文字证据，不能只用“夏桀暴政”解释，还要看到商部族长期积累的联盟与军事优势。" },
    ],
  },
  {
    id: "shang",
    name: "商",
    years: "约前1600—前1046",
    phase: "青铜王朝",
    intro: "以王族、方国和祭祀体系组织起来的青铜文明，晚期都城位于殷。",
    rulers: "汤 → 外丙 → 仲壬 → 太甲 → 沃丁 → 太庚 → 小甲 → 雍己 → 太戊 → 仲丁 → 外壬 → 河亶甲 → 祖乙 → 祖辛 → 沃甲 → 祖丁 → 南庚 → 阳甲 → 盘庚 → 小辛 → 小乙 → 武丁 → 祖庚 → 祖甲 → 廪辛 → 庚丁 → 武乙 → 文丁 → 帝乙 → 帝辛",
    fall: "长期征战与资源压力上升，王室、贵族和方国矛盾增加；周武王组织诸侯联盟，在牧野击败商军。",
    events: [
      { year: "约前1300", title: "盘庚迁殷", summary: "商王盘庚迁都殷，王朝进入较稳定的晚期阶段。", detail: "安阳殷墟出土甲骨文与宫殿、墓葬遗存，使商代晚期成为中国早期史中证据最丰富的部分之一。" },
      { year: "武丁时期", title: "武丁中兴", summary: "商朝对周边方国频繁用兵，王权与祭祀体系达到高峰。", detail: "甲骨卜辞记录了战争、农业、灾害与王室活动，也留下妇好等重要人物的材料。" },
      { year: "前1046", title: "牧野之战", summary: "周军与盟军击败商军，帝辛自焚。", detail: "商朝末期东征造成消耗，周人则在西方不断整合力量；“纣王荒淫”只是后世的道德化概括。" },
    ],
  },
  {
    id: "western-zhou",
    name: "西周",
    years: "前1046—前771",
    phase: "礼制与分封",
    intro: "周人以宗法、礼乐与分封组织广阔区域，形成影响后世深远的政治秩序。",
    rulers: "武王 → 成王 → 康王 → 昭王 → 穆王 → 共王 → 懿王 → 孝王 → 夷王 → 厉王 → 共和行政 → 宣王 → 幽王",
    fall: "王畿、军力与财政长期衰退，贵族和继承冲突叠加犬戎压力；镐京被攻破后平王东迁。",
    events: [
      { year: "前11世纪", title: "分封与宗法", summary: "周公辅政，分封诸侯并建立礼制秩序。", detail: "分封有利于早期扩张，却也让地方诸侯拥有土地、人口和军队，为东周王权衰落埋下结构性因素。" },
      { year: "前841", title: "国人暴动", summary: "周厉王出奔，进入共和行政。", detail: "共和元年是中国传统史中连续可靠纪年的起点；“共和”究竟是周召共治还是共伯和执政仍有争议。" },
      { year: "前771", title: "犬戎破镐京", summary: "继承危机引发内外联合进攻，周幽王被杀。", detail: "“烽火戏诸侯”不能被当作唯一解释。真正的背景是王室实力下降、申侯与王室冲突以及边疆压力累积。" },
    ],
  },
  {
    id: "eastern-zhou",
    name: "东周",
    years: "前770—前256",
    phase: "春秋战国",
    intro: "周天子名义仍在，实际政治重心转向诸侯争霸、制度变法与兼并战争。",
    rulers: "平王 → 桓王 → 庄王 → 釐王 → 惠王 → 襄王 → 顷王 → 匡王 → 定王 → 简王 → 灵王 → 景王 → 悼王 → 敬王 → 元王 → 贞定王 → 哀王 → 思王 → 考王 → 威烈王 → 安王 → 烈王 → 显王 → 慎靓王 → 赧王",
    fall: "诸侯掌握土地、军队、税收与外交，周天子王畿不断缩小；前256年秦灭西周国。",
    events: [
      { year: "前770", title: "平王东迁", summary: "周王室迁至洛邑，东周开始。", detail: "迁都后王室失去西部核心区域，对诸侯的直接控制显著削弱，春秋争霸由此展开。" },
      { year: "前403", title: "三家分晋", summary: "威烈王承认韩、赵、魏为诸侯。", detail: "战国时代的国家竞争更加制度化，各国通过变法、征税和常备军提升动员能力。" },
      { year: "前256", title: "秦灭周室", summary: "秦吞并西周国，周赧王去世。", detail: "残余东周国于前249年被秦消灭。春秋、战国是东周内部阶段，并非两个独立王朝。" },
    ],
  },
  {
    id: "qin",
    name: "秦",
    years: "前221—前207",
    phase: "第一次大一统",
    intro: "秦把战国时期的高动员国家推向全国，建立皇帝、郡县与统一标准体系。",
    rulers: "秦始皇嬴政 → 秦二世胡亥 → 秦王子婴",
    fall: "沉重征发、严厉统治、继承政变和全国性反秦战争同时爆发；巨鹿之战后秦军主力瓦解。",
    events: [
      { year: "前221", title: "统一六国", summary: "嬴政称始皇帝，建立郡县制帝国。", detail: "统一文字、度量衡、货币与交通标准，为后世统一帝国提供基本框架。" },
      { year: "前210", title: "沙丘政变", summary: "始皇死后，赵高、李斯扶胡亥即位。", detail: "宗室与重臣遭到清洗，中央决策能力快速下降，继承危机成为帝国崩溃的加速器。" },
      { year: "前209—前207", title: "反秦战争", summary: "陈胜吴广起义后，各地武装与六国旧势力复起。", detail: "秦军在巨鹿遭遇决定性失败，刘邦入关，子婴投降。秦并非由某一项政策单独拖垮。" },
    ],
  },
  {
    id: "western-han",
    name: "西汉",
    years: "前202—公元9",
    phase: "帝国定型",
    intro: "汉初在秦制基础上调整治理方式，随后建立稳定的官僚、财政与边疆体系。",
    rulers: "高祖 → 惠帝 → 前少帝 → 后少帝 → 文帝 → 景帝 → 武帝 → 昭帝 → 刘贺 → 宣帝 → 元帝 → 成帝 → 哀帝 → 平帝 → 孺子婴",
    fall: "幼主、无嗣与外戚控制造成中枢失衡，王氏外戚掌权，王莽最终建立新朝。",
    events: [
      { year: "前180—前141", title: "文景之治", summary: "减轻赋役、恢复生产，中央财政逐步充实。", detail: "汉初通过郡国并行和休养生息稳固统治，七国之乱后诸侯王权力继续收缩。" },
      { year: "前141—前87", title: "汉武帝时代", summary: "北击匈奴、经营西域，帝国规模与财政动员扩大。", detail: "盐铁、均输等政策增强中央财政，同时长期战争也带来人口与经济压力。" },
      { year: "公元9", title: "王莽代汉", summary: "王莽迫使孺子婴让位，建立新朝。", detail: "西汉末皇嗣屡断，外戚逐步控制朝政；土地与豪强问题加深了统治危机。" },
    ],
  },
  {
    id: "xin",
    name: "新与更始",
    years: "9—25",
    phase: "帝国断裂",
    intro: "王莽以复古改革重塑帝国，但政策、灾荒与行政失灵共同引发大规模反抗。",
    rulers: "王莽 → 更始帝刘玄；赤眉军另立刘盆子",
    fall: "改革执行混乱、黄河灾害与饥荒叠加，绿林、赤眉起义摧毁新朝；刘秀随后重新统一。",
    events: [
      { year: "9", title: "王莽改制", summary: "土地、货币与官名反复调整。", detail: "改革意图解决兼并和财政问题，但政策复杂多变、基层执行能力不足，反而扩大了社会不确定性。" },
      { year: "17—23", title: "绿林赤眉", summary: "灾荒与失政引发各地起义。", detail: "起义与地方豪强武装结合，王莽于23年在长安被杀，新朝灭亡。" },
      { year: "25", title: "光武称帝", summary: "刘秀建立东汉，逐步结束割据。", detail: "刘秀利用汉室名义、河北基础与地方精英支持，于36年前后基本完成统一。" },
    ],
  },
  {
    id: "eastern-han",
    name: "东汉",
    years: "25—220",
    phase: "豪强与帝国",
    intro: "帝国恢复后地方豪强不断扩张，幼帝、外戚和宦官构成后期权力循环。",
    rulers: "光武帝 → 明帝 → 章帝 → 和帝 → 殇帝 → 安帝 → 刘懿 → 顺帝 → 冲帝 → 质帝 → 桓帝 → 灵帝 → 少帝 → 献帝",
    fall: "豪强扩大、财政兵源流失，党锢与宫廷冲突削弱官僚；黄巾起义促使地方军事化，最终曹魏代汉。",
    events: [
      { year: "25—57", title: "光武中兴", summary: "刘秀恢复汉室，重建中央与地方秩序。", detail: "东汉初期降低战争动员、整顿官僚，并以地方豪强合作支撑统治。" },
      { year: "2世纪", title: "外戚与宦官", summary: "幼帝频仍，宫廷集团反复争夺决策权。", detail: "外戚摄政与宦官政变形成循环，党锢之祸又打击了士人官僚网络。" },
      { year: "184—220", title: "黄巾与军阀", summary: "州郡自行募兵，中央权力瓦解。", detail: "董卓入京后进入军阀混战；曹操控制献帝，曹丕于220年迫使献帝禅位。" },
    ],
  },
  {
    id: "three-kingdoms",
    name: "三国",
    years: "220—280",
    phase: "魏蜀吴并立",
    intro: "曹魏、蜀汉与孙吴竞逐天下，政治、军事与人口资源高度集中于战争。",
    rulers: "曹魏：曹丕 → 曹叡 → 曹芳 → 曹髦 → 曹奂；蜀汉：刘备 → 刘禅；孙吴：孙权 → 孙亮 → 孙休 → 孙皓",
    fall: "蜀汉于263年降魏，司马氏于266年代魏建晋，西晋于280年灭吴。",
    events: [
      { year: "220—229", title: "三国建立", summary: "曹魏、蜀汉、孙吴先后正式称帝。", detail: "三个政权在军制、屯田、地方治理和人才选拔上各有调整，但长期受制于战争与人口损失。" },
      { year: "249", title: "高平陵之变", summary: "司马懿发动政变，司马氏控制曹魏。", detail: "此后魏国皇权被架空，司马氏逐步清除反对力量，为西晋取代曹魏奠定基础。" },
      { year: "263—280", title: "归于西晋", summary: "蜀亡、魏禅晋，吴最终被灭。", detail: "三国统一不是一战完成，而是资源差距、内部继承与司马氏掌权共同推动的结果。" },
    ],
  },
  {
    id: "jin",
    name: "两晋",
    years: "266—420",
    phase: "短统一与南渡",
    intro: "西晋短暂统一后因宗室战争崩溃，东晋依靠江南门阀与北府军延续。",
    rulers: "西晋：司马炎 → 司马衷 → 司马炽 → 司马邺；东晋：司马睿 → 司马绍 → 司马衍 → 司马岳 → 司马聃 → 司马丕 → 司马奕 → 司马昱 → 司马曜 → 司马德宗 → 司马德文",
    fall: "八王之乱摧毁西晋中枢；东晋皇权长期受门阀与军头制约，最终刘裕掌军并代晋。",
    events: [
      { year: "280", title: "西晋统一", summary: "西晋灭吴，结束三国局面。", detail: "统一并未解决宗室分封、军权配置和豪族政治问题，帝国稳定期非常短。" },
      { year: "291—316", title: "八王与永嘉", summary: "宗室内战后洛阳、长安相继失守。", detail: "八王之乱消耗中央军队和财政，汉赵等北方政权趁势扩张，西晋于316年灭亡。" },
      { year: "317—420", title: "衣冠南渡", summary: "东晋在建康建立，北方进入多政权时期。", detail: "东晋依赖门阀与军事集团；桓玄一度篡位，刘裕凭北府兵掌权并建立刘宋。" },
    ],
  },
  {
    id: "sixteen-kingdoms",
    name: "十六国",
    years: "304—439",
    phase: "北方多政权",
    intro: "前后赵、前后秦、前后燕、凉州诸国等交替兴亡；“十六国”并不代表只有十六个国家。",
    rulers: "主要政权包括成汉、汉赵、后赵、前凉、前燕、前秦、后秦、后燕、西秦、后凉、南凉、南燕、西凉、北凉、胡夏、北燕",
    fall: "军权个人化、继承不稳与联盟重组造成政权短命；北魏于439年基本统一北方。",
    events: [
      { year: "4世纪初", title: "多国并起", summary: "西晋崩溃后，北方军事集团纷纷建国。", detail: "统治者常使用皇帝、天王或王等不同称号，各国也不断吸收汉地官僚制度与地方精英。" },
      { year: "376—383", title: "前秦统一与淝水", summary: "苻坚一度统一北方，却在淝水之战后迅速解体。", detail: "前秦依靠多族群军事政治联盟扩张，淝水战败打破威望后，各地旧势力迅速复国。" },
      { year: "439", title: "北魏统一北方", summary: "北魏灭北凉，北方主要割据告一段落。", detail: "统一并未结束南北对峙，中国进入南北朝并立的新阶段。" },
    ],
  },
  {
    id: "northern-southern",
    name: "南北朝",
    years: "420—589",
    phase: "南北并立",
    intro: "南方宋齐梁陈连续更替，北方由北魏分裂并重组为北齐、北周。",
    rulers: "南朝：刘宋 → 南齐 → 梁 → 陈；北朝：北魏 → 东魏、西魏 → 北齐、北周",
    fall: "南朝常由掌兵权臣禅代；北周统一北方后被杨坚取代，隋于589年灭陈完成统一。",
    events: [
      { year: "420", title: "刘宋代晋", summary: "刘裕建立刘宋，南朝开始。", detail: "南朝皇权与军头关系紧张，宗室冲突与掌兵权臣反复推动王朝更替。" },
      { year: "494—534", title: "北魏转折", summary: "孝文帝迁洛改革，六镇起义后北魏分裂。", detail: "迁都与制度整合改变北魏国家结构，但边镇利益失衡与宫廷冲突最终造成东西魏并立。" },
      { year: "577—589", title: "走向隋统一", summary: "北周灭北齐，杨坚代周，隋军再灭陈。", detail: "北方长期军政整合形成优势，隋由此结束近四百年的大分裂。" },
    ],
  },
  {
    id: "sui",
    name: "隋",
    years: "581—618/619",
    phase: "重新统一",
    intro: "隋重建全国性制度与交通网络，却在短期内叠加大工程和对外战争。",
    rulers: "文帝杨坚 → 炀帝杨广 → 恭帝杨侑；末期另有杨浩、杨侗并立",
    fall: "大型工程、三征高句丽、灾荒和财政透支引发全国起义；618年杨广被杀，末期政权于619年终结。",
    events: [
      { year: "589", title: "灭陈统一", summary: "隋结束南北朝对峙，重建统一帝国。", detail: "隋调整中央官制、选官与地方行政，为唐代制度奠定重要基础。" },
      { year: "605以后", title: "运河与东都", summary: "大运河和洛阳建设强化南北运输。", detail: "工程本身具有长期价值，但与宫殿、边防和战争同步推进，造成短期徭役与财政压力。" },
      { year: "612—618", title: "高句丽战争与起义", summary: "连续远征失败，各地群雄起兵。", detail: "隋亡不能简单归结为修运河，而是战争、工程、灾荒与政治叛乱共同作用。" },
    ],
  },
  {
    id: "tang",
    name: "唐与武周",
    years: "618—907",
    phase: "开放帝国",
    intro: "唐前期形成高度整合的帝国，中后期则在藩镇、宦官与财政重组中延续。",
    rulers: "高祖 → 太宗 → 高宗 → 中宗 → 睿宗 → 武则天 → 中宗复位 → 少帝 → 睿宗复位 → 玄宗 → 肃宗 → 代宗 → 德宗 → 顺宗 → 宪宗 → 穆宗 → 敬宗 → 文宗 → 武宗 → 宣宗 → 懿宗 → 僖宗 → 昭宗 → 哀帝",
    fall: "安史之乱后藩镇与宦官权力扩大，财政结构重组；黄巢起义重创中央，朱温于907年代唐。",
    events: [
      { year: "626—741", title: "贞观到开元", summary: "制度整合、对外扩张与城市经济共同推动盛世。", detail: "唐帝国依靠均田、租庸调、府兵与成熟官僚体系运行，同时连接欧亚交通网络。" },
      { year: "690—705", title: "武周", summary: "武则天正式称帝，改国号周。", detail: "武则天是中国历史上唯一正式以皇帝身份统治全国的女性，705年神龙政变后恢复唐朝。" },
      { year: "755—907", title: "安史之后", summary: "藩镇、宦官与新财政体系改变帝国结构。", detail: "安史之乱没有立即灭唐，却造成长期结构转折；黄巢起义后朱温控制朝廷并完成禅代。" },
    ],
  },
  {
    id: "five-dynasties",
    name: "五代十国",
    years: "907—979",
    phase: "军人政治",
    intro: "北方五代快速更替，南方与西南多个区域政权并立，统一趋势逐步恢复。",
    rulers: "五代：后梁 → 后唐 → 后晋 → 后汉 → 后周；十国：吴、南唐、吴越、楚、闽、南汉、前蜀、后蜀、荆南、北汉",
    fall: "兵变、继承与藩镇冲突频繁；后周改革增强中原实力，宋朝以“先南后北”完成大部统一。",
    events: [
      { year: "907", title: "唐亡与后梁", summary: "朱温建立后梁，五代开始。", detail: "北方政权多由军事集团建立，皇位继承与将领关系决定政权寿命。" },
      { year: "936—947", title: "后晋与契丹", summary: "石敬瑭借契丹兵建国，后晋最终被辽攻灭。", detail: "燕云地区的归属深刻影响此后辽、宋之间的战略格局。" },
      { year: "960—979", title: "宋的统一战争", summary: "陈桥兵变后，宋逐步消灭南方诸国与北汉。", detail: "吴越选择纳土归宋，南唐、后蜀、南汉等则先后被军事征服。" },
    ],
  },
  {
    id: "liao",
    name: "辽",
    years: "916—1125",
    phase: "契丹帝国",
    intro: "辽以南北面官等制度治理不同区域，与北宋长期并立。",
    rulers: "耶律阿保机 → 耶律德光 → 耶律阮 → 耶律璟 → 耶律贤 → 耶律隆绪 → 耶律宗真 → 耶律洪基 → 耶律延禧",
    fall: "后期贵族内斗与军政衰退，女真金朝迅速崛起；1125年天祚帝被俘。",
    events: [
      { year: "916", title: "契丹建国", summary: "耶律阿保机称帝，逐步形成辽朝。", detail: "辽通过双轨制度管理草原与农耕地区，构成多元帝国。" },
      { year: "1005", title: "澶渊之盟", summary: "辽宋建立长期稳定的边境关系。", detail: "双方以岁币和互市换取停战，此后百余年大规模战争显著减少。" },
      { year: "1115—1125", title: "女真崛起", summary: "金朝建立并迅速攻灭辽。", detail: "宋金海上之盟加剧辽朝压力；耶律大石西迁后另建西辽。" },
    ],
  },
  {
    id: "northern-song",
    name: "北宋",
    years: "960—1127",
    phase: "文治与城市",
    intro: "宋强化文官和中央财政，经济、城市与技术高度发展，但北方边防长期承压。",
    rulers: "太祖赵匡胤 → 太宗赵光义 → 真宗赵恒 → 仁宗赵祯 → 英宗赵曙 → 神宗赵顼 → 哲宗赵煦 → 徽宗赵佶 → 钦宗赵桓",
    fall: "军政指挥层级、党争和边防判断共同造成危机；联金灭辽后直接面对金军，1127年发生靖康之变。",
    events: [
      { year: "960", title: "陈桥兵变", summary: "赵匡胤建立宋朝，逐步收回地方军权。", detail: "宋通过禁军、文官与财政制度降低军人割据风险，同时形成更复杂的战时指挥体系。" },
      { year: "1069以后", title: "王安石变法", summary: "围绕财政、军政和基层治理展开改革。", detail: "改革回应边防与财政压力，却引发长期新旧党争，政策反复影响连续性。" },
      { year: "1127", title: "靖康之变", summary: "金军攻破开封，徽钦二帝被俘。", detail: "联金灭辽的战略反噬、军事判断失误与指挥问题共同导致北宋迅速崩溃。" },
    ],
  },
  {
    id: "western-xia",
    name: "西夏",
    years: "1038—1227",
    phase: "河西政权",
    intro: "西夏控制河西与宁夏地区，在宋、辽、金和蒙古之间维持复杂平衡。",
    rulers: "李元昊 → 李谅祚 → 李秉常 → 李乾顺 → 李仁孝 → 李纯祐 → 李安全 → 李遵顼 → 李德旺 → 李睍",
    fall: "后期政变与战争消耗国力，蒙古多轮征伐；1227年中兴府陷落。",
    events: [
      { year: "1038", title: "元昊称帝", summary: "西夏正式建立，并创造、推广西夏文。", detail: "西夏吸收中原制度，也保留自身军事与文化传统，长期控制丝路要地。" },
      { year: "11—12世纪", title: "宋辽金之间", summary: "西夏通过战争、和议与选边维持生存。", detail: "小国外交带来回旋空间，也使财政和军队长期承受边境战争压力。" },
      { year: "1205—1227", title: "蒙古征夏", summary: "蒙古多次进攻，西夏最终灭亡。", detail: "长期战争、内部权力斗争和选边失误使西夏难以抵御蒙古的持续动员。" },
    ],
  },
  {
    id: "jin-dynasty",
    name: "金",
    years: "1115—1234",
    phase: "女真王朝",
    intro: "女真金朝迅速灭辽并占领北宋北方地区，之后转向中原化治理。",
    rulers: "完颜阿骨打 → 完颜晟 → 完颜亶 → 完颜亮 → 完颜雍 → 完颜璟 → 完颜永济 → 完颜珣 → 完颜守绪 → 完颜承麟",
    fall: "蒙古持续打击使金失去北方税源，迁都后战略纵深缩小，多线战争与民变加速崩溃。",
    events: [
      { year: "1115—1127", title: "灭辽与北宋", summary: "阿骨打建金，金军先后消灭辽和北宋。", detail: "金的快速崛起重塑东亚政治格局，也把宋朝推向南方。" },
      { year: "1161—1189", title: "大定之治", summary: "金世宗时期政局相对稳定。", detail: "金朝进一步整合女真传统与中原官僚、财政制度。" },
      { year: "1214—1234", title: "迁都与蔡州", summary: "蒙古压力下迁都开封，最终在蔡州灭亡。", detail: "金同时面对蒙古、南宋和内部民变；末帝完颜承麟在位不足一天。" },
    ],
  },
  {
    id: "southern-song",
    name: "南宋",
    years: "1127—1279",
    phase: "江南帝国",
    intro: "南宋以江淮和长江防线维系统治，经济与海贸繁荣，并长期抵抗金、蒙古。",
    rulers: "高宗赵构 → 孝宗赵昚 → 光宗赵惇 → 宁宗赵扩 → 理宗赵昀 → 度宗赵禥 → 恭帝赵㬎 → 端宗赵昰 → 末帝赵昺",
    fall: "联蒙灭金后直接面对蒙古，长期战争消耗财政与兵员；襄阳防线失守后临安投降，崖山之战结束政权。",
    events: [
      { year: "1127", title: "宋室南迁", summary: "赵构建立南宋，定都临安。", detail: "南宋重建财政与军队，依靠江淮防线、长江水军和东南经济维持统治。" },
      { year: "1141", title: "绍兴和议", summary: "宋金形成长期南北对峙。", detail: "和议换取相对稳定，也固定了南宋偏安格局；此后仍有多次北伐与边境战争。" },
      { year: "1273—1279", title: "襄阳到崖山", summary: "襄阳失守，蒙古军突破长江防线。", detail: "1276年临安投降，残余政权继续南撤，1279年崖山海战失败。" },
    ],
  },
  {
    id: "yuan",
    name: "元",
    years: "1271—1368",
    phase: "蒙古帝国时代",
    intro: "元朝是蒙古帝国分化后的核心政权之一，建立覆盖全国的行省与驿站体系。",
    rulers: "忽必烈 → 铁穆耳 → 海山 → 爱育黎拔力八达 → 硕德八剌 → 也孙铁木儿 → 阿速吉八 → 图帖睦尔 → 和世㻋 → 图帖睦尔复位 → 懿璘质班 → 妥懽帖睦尔",
    fall: "继承政变、权臣政治、纸钞与财政危机、河患徭役共同激化矛盾；红巾起义后元廷退往漠北。",
    events: [
      { year: "1271—1279", title: "大元与统一", summary: "忽必烈定国号元，随后消灭南宋。", detail: "元朝以行省制度管理广阔区域，并通过驿站网络连接欧亚交通。" },
      { year: "1307以后", title: "继承频繁", summary: "皇位更替与政变增加，中央政治不稳定。", detail: "短期皇帝、权臣与宫廷集团反复重组，削弱政策连续性。" },
      { year: "1351—1368", title: "红巾与北退", summary: "治河徭役引发起义，地方军阀崛起。", detail: "朱元璋势力最终控制江南并北伐进入大都；北元政权仍在漠北延续。" },
    ],
  },
  {
    id: "ming",
    name: "明",
    years: "1368—1644 / 南明至1662",
    phase: "皇权与全球白银",
    intro: "明朝重建汉地帝国，前期强化皇权，后期深度进入全球贸易与白银经济。",
    rulers: "朱元璋 → 朱允炆 → 朱棣 → 朱高炽 → 朱瞻基 → 朱祁镇 → 朱祁钰 → 朱祁镇复位 → 朱见深 → 朱祐樘 → 朱厚照 → 朱厚熜 → 朱载坖 → 朱翊钧 → 朱常洛 → 朱由校 → 朱由检；南明：朱由崧 → 朱聿键 → 朱聿鐭 → 朱由榔",
    fall: "财政军饷、灾荒疫病、辽东战争和起义形成两线危机；李自成攻入北京，清军随后消灭大顺与南明。",
    events: [
      { year: "1368", title: "明朝建立", summary: "朱元璋在南京称帝，随后驱逐元廷。", detail: "明初重建户籍、赋役和卫所体系，并通过强皇权结构控制官僚。" },
      { year: "1402—1449", title: "永乐到土木", summary: "迁都北京、远航与北征后，土木堡之变重创朝廷。", detail: "英宗被俘后北京保卫战成功，明朝政治与边防结构由此发生变化。" },
      { year: "1644—1662", title: "北京陷落与南明", summary: "李自成入北京，崇祯自缢；南明继续抵抗。", detail: "吴三桂引清军入关，清军击败大顺并逐步消灭南明，永历帝于1662年被杀。" },
    ],
  },
  {
    id: "qing",
    name: "清",
    years: "1636 / 1644—1912",
    phase: "帝制终章",
    intro: "清从东北崛起，建立多民族帝国；19世纪后面对内乱、列强与现代国家转型压力。",
    rulers: "努尔哈赤 → 皇太极 → 顺治 → 康熙 → 雍正 → 乾隆 → 嘉庆 → 道光 → 咸丰 → 同治 → 光绪 → 宣统",
    fall: "人口财政与基层治理危机、长期内乱、列强冲击与改革失衡叠加；武昌起义后各省独立，清帝退位。",
    events: [
      { year: "1636—1683", title: "建清与统一", summary: "皇太极改国号清，清军入关并逐步完成统一。", detail: "清朝吸收明代官僚财政体系，同时通过八旗、理藩等制度治理不同区域。" },
      { year: "1840—1895", title: "战争与内乱", summary: "鸦片战争、太平天国与甲午战败连续冲击国家。", detail: "地方军事和财政权扩大，条约、赔款和列强势力又削弱中央主权与资源。" },
      { year: "1901—1912", title: "新政与辛亥", summary: "清末改革重组军政，却未能恢复政治信任。", detail: "保路运动、武昌起义和新军倒向革命促使各省独立；1912年2月12日清帝正式退位。" },
    ],
  },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function RulerPortrait({ ruler, large = false }: { ruler: CatalogRulerProfile; large?: boolean }) {
  if (ruler.portrait.src) {
    return (
      <img
        src={`${publicBasePath}${ruler.portrait.src}`}
        alt={ruler.portrait.alt}
        width={large ? 520 : 92}
        height={large ? 680 : 118}
        loading={large ? "eager" : "lazy"}
        decoding="async"
      />
    );
  }

  return (
    <span
      className={`portrait-placeholder${large ? " portrait-placeholder-large" : ""}`}
      role="img"
      aria-label={`${ruler.name}暂无可确认的传世画像`}
    >
      <b aria-hidden="true">{ruler.name.slice(0, 1)}</b>
      <small>暂无可靠<br />传世画像</small>
    </span>
  );
}

function RulerTeaser({
  ruler,
  onOpen,
  compact = false,
}: {
  ruler: CatalogRulerProfile;
  onOpen: (ruler: CatalogRulerProfile, opener: HTMLButtonElement) => void;
  compact?: boolean;
}) {
  return (
    <button
      className={`ruler-teaser${compact ? " ruler-teaser-compact" : ""}`}
      type="button"
      aria-haspopup="dialog"
      onClick={(event) => onOpen(ruler, event.currentTarget)}
    >
      <span className="ruler-teaser-portrait">
        <RulerPortrait ruler={ruler} />
        <small>{ruler.portrait.kind}</small>
      </span>
      <span className="ruler-teaser-copy">
        <span className="ruler-dynasty">{ruler.polity} · {ruler.reign}</span>
        <span
          className={`mbti-mini${ruler.psychology.confidence === "low" ? " low-confidence" : ""}`}
          aria-label={`MBTI 行为推演：${ruler.psychology.code}，${ruler.psychology.confidenceLabel}`}
        >
          {ruler.psychology.code}{ruler.psychology.confidence === "low" ? <sup aria-hidden="true">?</sup> : null}
        </span>
        <strong>{ruler.name}</strong>
        <em>{ruler.personalName} · {ruler.title}</em>
        {!compact ? (
          <span className="trait-list" aria-label="性格标签">
            {ruler.traits.map((trait) => <i key={trait}>{trait}</i>)}
          </span>
        ) : null}
        <span className="ruler-open-label">查看身份卡 →</span>
      </span>
    </button>
  );
}

export default function Home() {
  const railRef = useRef<HTMLDivElement>(null);
  const eraJumpRef = useRef<HTMLElement>(null);
  const eraButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const rulerOpenerRef = useRef<HTMLButtonElement | null>(null);
  const panelRefs = useRef<Array<HTMLElement | null>>([]);
  const wheelSettleRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragRef = useRef({
    active: false,
    axis: "idle" as "idle" | "pending" | "x" | "y",
    startX: 0,
    startY: 0,
    startScroll: 0,
  });
  const [current, setCurrent] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [activeSection, setActiveSection] = useState<"timeline" | "constellation" | "archive">("timeline");
  const directoryRef = useRef<HTMLElement>(null);
  const constellationRef = useRef<HTMLElement>(null);
  const constellationTabsRef = useRef<HTMLDivElement>(null);
  const constellationTabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const constellationTabSettleRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const constellationViewportRef = useRef<HTMLDivElement>(null);
  const constellationDragRef = useRef({ active: false, startX: 0, startY: 0, scrollLeft: 0, scrollTop: 0 });
  const [constellationDragging, setConstellationDragging] = useState(false);
  const [selectedRuler, setSelectedRuler] = useState<CatalogRulerProfile | null>(null);
  const [rulerQuery, setRulerQuery] = useState("");
  const [rulerEra, setRulerEra] = useState("all");
  const [rulerPolity, setRulerPolity] = useState("all");
  const [visibleRulerCount, setVisibleRulerCount] = useState(18);
  const [constellationId, setConstellationId] = useState(rulerConstellations[0].id);

  const currentEra = eras[current];
  const activeConstellation = rulerConstellations.find((item) => item.id === constellationId) ?? rulerConstellations[0];

  const directoryPolities = rulerEra === "all" ? [] : (politiesForEra[rulerEra] ?? []);
  const filteredRulers = useMemo(() => {
    const normalizedQuery = rulerQuery.trim().toLocaleLowerCase("zh-CN");
    return allRulerProfiles.filter((ruler) => {
      if (rulerEra !== "all" && ruler.eraId !== rulerEra) return false;
      if (rulerPolity !== "all" && ruler.polity !== rulerPolity) return false;
      if (!normalizedQuery) return true;
      return ruler.searchText.toLocaleLowerCase("zh-CN").includes(normalizedQuery);
    });
  }, [rulerEra, rulerPolity, rulerQuery]);

  const updateFromScroll = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;

    const center = rail.scrollLeft + rail.clientWidth / 2;
    let nearest = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;
    panelRefs.current.forEach((panel, index) => {
      if (!panel) return;
      const panelCenter = panel.offsetLeft + panel.offsetWidth / 2;
      const distance = Math.abs(panelCenter - center);
      if (distance < nearestDistance) {
        nearest = index;
        nearestDistance = distance;
      }
    });
    setCurrent(nearest);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateFromScroll);
    };
    rail.addEventListener("scroll", onScroll, { passive: true });
    updateFromScroll();
    return () => {
      rail.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [updateFromScroll]);

  useEffect(() => {
    const jump = eraJumpRef.current;
    const button = eraButtonRefs.current[current];
    if (!jump || !button) return;
    const nextLeft = button.offsetLeft - jump.clientWidth / 2 + button.offsetWidth / 2;
    jump.scrollTo({ left: Math.max(0, nextLeft), behavior: "smooth" });
  }, [current]);

  useEffect(() => {
    let frame = 0;
    const updateActiveSection = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const marker = 150;
        const constellationTop = constellationRef.current?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY;
        const archiveTop = directoryRef.current?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY;
        setActiveSection(archiveTop <= marker ? "archive" : constellationTop <= marker ? "constellation" : "timeline");
      });
    };
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    updateActiveSection();
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (selectedRuler && dialog && !dialog.open) {
      dialog.querySelector<HTMLElement>(".ruler-dialog-shell")?.scrollTo({ top: 0 });
      dialog.showModal();
    }
  }, [selectedRuler]);

  useEffect(() => {
    document.documentElement.classList.toggle("dialog-open", Boolean(selectedRuler));
    return () => document.documentElement.classList.remove("dialog-open");
  }, [selectedRuler]);

  useEffect(() => () => {
    if (wheelSettleRef.current) clearTimeout(wheelSettleRef.current);
    if (constellationTabSettleRef.current) clearTimeout(constellationTabSettleRef.current);
  }, []);

  useEffect(() => {
    const tabs = constellationTabsRef.current;
    const index = rulerConstellations.findIndex((item) => item.id === constellationId);
    const tab = constellationTabRefs.current[index];
    if (tabs && tab) {
      tabs.scrollTo({
        left: Math.max(0, tab.offsetLeft - tabs.clientWidth / 2 + tab.offsetWidth / 2),
        behavior: "auto",
      });
    }
    constellationViewportRef.current?.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  }, [constellationId]);

  const scrollToEra = useCallback((index: number) => {
    const next = clamp(index, 0, eras.length - 1);
    panelRefs.current[next]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
    setCurrent(next);
  }, []);

  const snapToNearestEra = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const center = rail.scrollLeft + rail.clientWidth / 2;
    let nearest = 0;
    let distance = Number.POSITIVE_INFINITY;
    panelRefs.current.forEach((panel, index) => {
      if (!panel) return;
      const nextDistance = Math.abs(panel.offsetLeft + panel.offsetWidth / 2 - center);
      if (nextDistance < distance) {
        nearest = index;
        distance = nextDistance;
      }
    });
    scrollToEra(nearest);
  }, [scrollToEra]);

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    if (!rail || event.ctrlKey) return;

    const explicitShiftScroll = event.shiftKey && Math.abs(event.deltaY) > Math.abs(event.deltaX);
    const horizontalDelta = explicitShiftScroll ? event.deltaY : event.deltaX;
    const isHorizontalGesture = explicitShiftScroll
      || Math.abs(event.deltaX) > Math.abs(event.deltaY) * 1.15;

    // Keep ordinary mouse-wheel and vertical trackpad gestures on the page.
    // The timeline only takes over after the gesture is clearly horizontal.
    if (!isHorizontalGesture || horizontalDelta === 0) return;
    event.preventDefault();
    const unit = event.deltaMode === 1 ? 26 : event.deltaMode === 2 ? rail.clientWidth : 1;
    rail.scrollBy({ left: horizontalDelta * unit, behavior: "auto" });
    if (wheelSettleRef.current) clearTimeout(wheelSettleRef.current);
    wheelSettleRef.current = setTimeout(snapToNearestEra, 140);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    const target = event.target as HTMLElement;
    if (target.closest("button, summary, input, a")) return;
    const rail = railRef.current;
    if (!rail) return;
    const isMouse = event.pointerType === "mouse";
    dragRef.current = {
      active: true,
      axis: isMouse ? "x" : "pending",
      startX: event.clientX,
      startY: event.clientY,
      startScroll: rail.scrollLeft,
    };
    if (isMouse) {
      setDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    }
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active || !railRef.current) return;
    const deltaX = event.clientX - dragRef.current.startX;
    const deltaY = event.clientY - dragRef.current.startY;

    if (dragRef.current.axis === "pending") {
      if (Math.max(Math.abs(deltaX), Math.abs(deltaY)) < 8) return;
      if (Math.abs(deltaY) >= Math.abs(deltaX) * 1.15) {
        dragRef.current.axis = "y";
        dragRef.current.active = false;
        return;
      }
      if (Math.abs(deltaX) <= Math.abs(deltaY) * 1.15) return;
      dragRef.current.axis = "x";
      setDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    }

    if (dragRef.current.axis !== "x") return;
    event.preventDefault();
    railRef.current.scrollLeft = dragRef.current.startScroll - deltaX;
  };

  const endPointerDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    const shouldSnap = dragRef.current.axis === "x";
    dragRef.current.active = false;
    dragRef.current.axis = "idle";
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (shouldSnap) requestAnimationFrame(snapToNearestEra);
  };

  const openRuler = (ruler: CatalogRulerProfile, opener: HTMLButtonElement) => {
    rulerOpenerRef.current = opener;
    setSelectedRuler(ruler);
  };

  const showRulerDirectory = (eraId = "all") => {
    setRulerEra(eraId);
    setRulerPolity("all");
    setRulerQuery("");
    setVisibleRulerCount(18);
    requestAnimationFrame(() => {
      directoryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const showConstellation = (eraId: string) => {
    const match = rulerConstellations.find((item) => item.eraId === eraId);
    if (match) setConstellationId(match.id);
    requestAnimationFrame(() => {
      constellationRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const showTimeline = () => {
    document.getElementById("timeline")?.scrollIntoView({ behavior: "smooth", block: "start" });
    requestAnimationFrame(() => railRef.current?.focus({ preventScroll: true }));
  };

  const settleConstellationTabs = () => {
    const tabs = constellationTabsRef.current;
    if (!tabs) return;
    const center = tabs.scrollLeft + tabs.clientWidth / 2;
    let nearest = 0;
    let distance = Number.POSITIVE_INFINITY;
    constellationTabRefs.current.forEach((tab, index) => {
      if (!tab) return;
      const nextDistance = Math.abs(tab.offsetLeft + tab.offsetWidth / 2 - center);
      if (nextDistance < distance) {
        nearest = index;
        distance = nextDistance;
      }
    });
    const next = rulerConstellations[nearest];
    if (next && next.id !== constellationId) setConstellationId(next.id);
  };

  const handleConstellationTabsScroll = () => {
    if (constellationTabSettleRef.current) clearTimeout(constellationTabSettleRef.current);
    constellationTabSettleRef.current = setTimeout(settleConstellationTabs, 180);
  };

  const handleConstellationTabsWheel = (event: WheelEvent<HTMLDivElement>) => {
    const tabs = constellationTabsRef.current;
    if (!tabs || event.ctrlKey || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    const maxScroll = tabs.scrollWidth - tabs.clientWidth;
    const canMove = (event.deltaY < 0 && tabs.scrollLeft > 0) || (event.deltaY > 0 && tabs.scrollLeft < maxScroll);
    if (!canMove) return;
    event.preventDefault();
    const unit = event.deltaMode === 1 ? 24 : event.deltaMode === 2 ? tabs.clientWidth : 1;
    tabs.scrollBy({ left: event.deltaY * unit, behavior: "auto" });
  };

  const handleConstellationWheel = (event: WheelEvent<HTMLDivElement>) => {
    const viewport = constellationViewportRef.current;
    if (!viewport || event.ctrlKey) return;
    const unit = event.deltaMode === 1 ? 24 : event.deltaMode === 2 ? viewport.clientHeight : 1;
    const deltaX = (event.shiftKey && Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX) * unit;
    const deltaY = (event.shiftKey ? 0 : event.deltaY) * unit;
    const maxX = viewport.scrollWidth - viewport.clientWidth;
    const maxY = viewport.scrollHeight - viewport.clientHeight;
    const canMoveX = (deltaX < 0 && viewport.scrollLeft > 0) || (deltaX > 0 && viewport.scrollLeft < maxX);
    const canMoveY = (deltaY < 0 && viewport.scrollTop > 0) || (deltaY > 0 && viewport.scrollTop < maxY);
    if (!canMoveX && !canMoveY) return;
    event.preventDefault();
    viewport.scrollBy({ left: deltaX, top: deltaY, behavior: "auto" });
  };

  const handleConstellationPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || (event.target as HTMLElement).closest("button")) return;
    const viewport = constellationViewportRef.current;
    if (!viewport) return;
    constellationDragRef.current = {
      active: true,
      startX: event.clientX,
      startY: event.clientY,
      scrollLeft: viewport.scrollLeft,
      scrollTop: viewport.scrollTop,
    };
    setConstellationDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleConstellationPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const viewport = constellationViewportRef.current;
    if (!viewport || !constellationDragRef.current.active) return;
    event.preventDefault();
    viewport.scrollLeft = constellationDragRef.current.scrollLeft - (event.clientX - constellationDragRef.current.startX);
    viewport.scrollTop = constellationDragRef.current.scrollTop - (event.clientY - constellationDragRef.current.startY);
  };

  const endConstellationDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!constellationDragRef.current.active) return;
    constellationDragRef.current.active = false;
    setConstellationDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const resetConstellationViewport = () => {
    constellationViewportRef.current?.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  };

  const clearDirectoryFilters = () => {
    setRulerQuery("");
    setRulerEra("all");
    setRulerPolity("all");
    setVisibleRulerCount(18);
  };

  const closeRuler = () => {
    const dialog = dialogRef.current;
    if (dialog?.open) dialog.close();
    else setSelectedRuler(null);
  };

  const restoreRulerFocus = () => {
    setSelectedRuler(null);
    requestAnimationFrame(() => rulerOpenerRef.current?.focus());
  };

  const handleKeyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollToEra(current + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollToEra(current - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      scrollToEra(0);
    } else if (event.key === "End") {
      event.preventDefault();
      scrollToEra(eras.length - 1);
    }
  };

  const timelineLabel = useMemo(
    () => `${current + 1} / ${eras.length} · ${currentEra.name} ${currentEra.years}`,
    [current, currentEra],
  );

  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="brand" href="#timeline" aria-label="返回时间轴顶部">
          <span className="brand-mark">史</span>
          <span>
            <strong>华夏长卷</strong>
            <small>中国古代历史时间轴</small>
          </span>
        </a>
        <nav className="topbar-nav" aria-label="页面快速导航">
          <button type="button" className={activeSection === "timeline" ? "active" : ""} onClick={showTimeline} aria-current={activeSection === "timeline" ? "page" : undefined}>时间轴</button>
          <button type="button" className={activeSection === "constellation" ? "active" : ""} onClick={() => showConstellation(currentEra.id)} aria-current={activeSection === "constellation" ? "page" : undefined}>关系星谱</button>
          <button type="button" className={activeSection === "archive" ? "active" : ""} onClick={() => showRulerDirectory(rulerEra)} aria-current={activeSection === "archive" ? "page" : undefined}>君王档案</button>
        </nav>
        <div className="current-era" aria-live="polite">
          <span>正在浏览</span>
          <strong>{currentEra.name}</strong>
          <em>{currentEra.years}</em>
        </div>
      </header>

      <section className="hero" aria-labelledby="page-title">
        <p className="eyebrow">从夏商周到帝制终章</p>
        <h1 id="page-title">沿着时间，横向展开中国古代史</h1>
        <p className="hero-copy">
          拖动时间轴，或者使用鼠标滚轮与左右方向键穿行于朝代之间。展开大事记，也可以进入君王档案馆，查看全部 {catalogStats.total} 位在位君主的关系行为与 MBTI 候选分析。
        </p>
        <button className="archive-entry" type="button" onClick={() => showRulerDirectory()}>
          <span>君王档案馆</span>
          搜索全部 {catalogStats.total} 位君主 <b aria-hidden="true">↓</b>
        </button>
        <div className="gesture-hints" aria-label="操作提示">
          <span>拖拽横移</span>
          <span>滚轮浏览</span>
          <span>左右键切换</span>
          <span>卡片点击展开</span>
          <span>{catalogStats.mbtiInferred} 份 MBTI 候选</span>
          <span>{catalogStats.withPortrait} 幅已核验画像</span>
        </div>
      </section>

      <section id="timeline" className="timeline-section" aria-label="中国古代历史横向时间轴">
        <div className="timeline-controls">
          <button
            type="button"
            className="arrow-button"
            onClick={() => scrollToEra(current - 1)}
            disabled={current === 0}
            aria-label="查看上一个历史时期"
          >
            ←
          </button>
          <label className="range-wrap">
            <span>{timelineLabel}</span>
            <input
              type="range"
              min="0"
              max={eras.length - 1}
              step="1"
              value={current}
              onChange={(event) => scrollToEra(Number(event.target.value))}
              aria-label="拖动历史时间轴"
              aria-valuetext={timelineLabel}
              aria-controls="history-rail"
            />
          </label>
          <button
            type="button"
            className="arrow-button"
            onClick={() => scrollToEra(current + 1)}
            disabled={current === eras.length - 1}
            aria-label="查看下一个历史时期"
          >
            →
          </button>
        </div>

        <nav ref={eraJumpRef} className="era-jump" aria-label="快速选择朝代">
          {eras.map((era, index) => (
            <button
              key={era.id}
              ref={(node) => { eraButtonRefs.current[index] = node; }}
              type="button"
              className={index === current ? "active" : ""}
              onClick={() => scrollToEra(index)}
              aria-pressed={index === current}
            >
              <span>{era.name}</span>
              <small>{era.years}</small>
            </button>
          ))}
        </nav>

        <div
          ref={railRef}
          id="history-rail"
          className={`timeline-rail${dragging ? " dragging" : ""}`}
          onWheel={handleWheel}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endPointerDrag}
          onPointerCancel={endPointerDrag}
          onKeyDown={handleKeyboard}
          tabIndex={0}
          role="region"
          aria-label="可横向拖动的历史内容"
        >
          {eras.map((era, index) => (
            <article
              key={era.id}
              ref={(node) => {
                panelRefs.current[index] = node;
              }}
              className={`era-panel${index === current ? " active" : ""}`}
              data-era-index={index}
              aria-labelledby={`era-${era.id}`}
            >
              <div className="track-node" aria-hidden="true">
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>

              <div className="era-heading">
                <div>
                  <p className="era-phase">{era.phase}</p>
                  <h2 id={`era-${era.id}`}>{era.name}</h2>
                </div>
                <p className="era-years">{era.years}</p>
              </div>

              <p className="era-intro">{era.intro}</p>

              <div className="era-meta-grid">
                <details className="rulers-card">
                  <summary>
                    <span>君主与政权序列</span>
                    <b>展开</b>
                  </summary>
                  <p>{era.rulers}</p>
                </details>
                <div className="fall-card">
                  <span>终结原因</span>
                  <p>{era.fall}</p>
                </div>
              </div>

              {rulersByEra[era.id]?.length ? (
                <section className="featured-rulers" aria-labelledby={`rulers-${era.id}`}>
                  <div className="ruler-section-heading">
                    <div>
                      <span>人物切面</span>
                      <h3 id={`rulers-${era.id}`}>代表君王 · 本期收录 {rulersByEra[era.id].length} 位</h3>
                    </div>
                    <small>点击人物，查看关系行为与 MBTI 依据</small>
                  </div>
                  <div className="ruler-grid">
                    {(featuredRulersByEra[era.id] ?? []).map((ruler) => (
                      <RulerTeaser key={ruler.id} ruler={ruler} onOpen={openRuler} />
                    ))}
                  </div>
                  <div className="era-ruler-more">
                    <p>
                      其余君主：{rulersByEra[era.id].filter((ruler) => !(featuredRulersByEra[era.id] ?? []).some((featured) => featured.id === ruler.id)).slice(0, 6).map((ruler) => ruler.name).join("、")}
                      {rulersByEra[era.id].length > 8 ? "等" : ""}
                    </p>
                    <button type="button" onClick={() => showRulerDirectory(era.id)}>
                      查看本期全部 {rulersByEra[era.id].length} 位 →
                    </button>
                  </div>
                </section>
              ) : null}

              <div className="events-heading">
                <span>大事记</span>
                <small>点击卡片查看详情</small>
              </div>

              <div className="event-grid">
                {era.events.map((item) => (
                  <details className="event-card" key={`${era.id}-${item.title}`}>
                    <summary>
                      <time>{item.year}</time>
                      <h3>{item.title}</h3>
                      <p>{item.summary}</p>
                      <span className="expand-label">展开详情</span>
                    </summary>
                    <div className="event-detail">
                      <p>{item.detail}</p>
                    </div>
                  </details>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section ref={constellationRef} className="constellation-section" aria-labelledby="constellation-title">
        <div className="constellation-heading">
          <div>
            <p>RULER CONSTELLATIONS</p>
            <h2 id="constellation-title">帝王关系星谱</h2>
          </div>
          <div className="constellation-heading-copy">
            <p>
              覆盖全部 {eras.length} 个历史时期，把家族、继承、共治与冲突放回同一张关系网。复杂分裂时期采用代表政权节点，不强行拼成单一家谱。
            </p>
            <button type="button" onClick={() => showConstellation(currentEra.id)}>
              定位到正在浏览的「{currentEra.name}」关系 →
            </button>
          </div>
        </div>

        <div
          ref={constellationTabsRef}
          className="constellation-tabs"
          role="tablist"
          aria-label="滑动选择帝王关系星群"
          onScroll={handleConstellationTabsScroll}
          onWheel={handleConstellationTabsWheel}
        >
          {rulerConstellations.map((constellation, index) => (
            <button
              key={constellation.id}
              ref={(element) => { constellationTabRefs.current[index] = element; }}
              id={`constellation-tab-${constellation.id}`}
              type="button"
              role="tab"
              aria-selected={constellation.id === activeConstellation.id}
              aria-controls="constellation-panel"
              className={constellation.id === activeConstellation.id ? "active" : ""}
              onClick={() => setConstellationId(constellation.id)}
            >
              <small>{constellation.eyebrow}</small>
              <strong>{constellation.title}</strong>
            </button>
          ))}
        </div>

        <article
          id="constellation-panel"
          className="constellation-panel"
          role="tabpanel"
          aria-labelledby={`constellation-tab-${activeConstellation.id}`}
        >
          <header className="constellation-panel-heading">
            <div>
              <span>{activeConstellation.eyebrow}</span>
              <h3>{activeConstellation.title}</h3>
            </div>
            <time>{activeConstellation.period}</time>
            <p>{activeConstellation.intro}</p>
          </header>

          <div className="constellation-legend" aria-label="连线图例">
            <span><i className="lineage" />血缘与继承</span>
            <span><i className="partnership" />夫妻与共同执政</span>
            <span><i className="conflict" />宗族冲突与夺位</span>
          </div>

          <div className="constellation-canvas-tools">
            <p><span aria-hidden="true">↔</span> 滚轮或触控板平移 · 拖拽探索画布 · 点击人物查看身份卡</p>
            <button type="button" onClick={resetConstellationViewport}>回到起点</button>
          </div>

          <div
            ref={constellationViewportRef}
            className={`constellation-viewport${constellationDragging ? " dragging" : ""}`}
            tabIndex={0}
            aria-label="可自由滚动和拖拽的帝王关系星谱"
            onWheel={handleConstellationWheel}
            onPointerDown={handleConstellationPointerDown}
            onPointerMove={handleConstellationPointerMove}
            onPointerUp={endConstellationDrag}
            onPointerCancel={endConstellationDrag}
          >
            <div className="constellation-map">
              {activeConstellation.edges.map((edge) => {
                const from = activeConstellation.nodes.find((node) => node.id === edge.from);
                const to = activeConstellation.nodes.find((node) => node.id === edge.to);
                if (!from || !to) return null;
                const fromX = from.x * constellationCanvas.scaleX + constellationCanvas.offsetX;
                const fromY = from.y * constellationCanvas.scaleY + constellationCanvas.offsetY;
                const toX = to.x * constellationCanvas.scaleX + constellationCanvas.offsetX;
                const toY = to.y * constellationCanvas.scaleY + constellationCanvas.offsetY;
                const dx = toX - fromX;
                const dy = toY - fromY;
                const length = Math.hypot(dx, dy);
                const angle = Math.atan2(dy, dx) * (180 / Math.PI);
                return (
                  <span key={`${edge.from}-${edge.to}-${edge.label}`} aria-hidden="true">
                    <i
                      className={`constellation-link ${edge.kind}`}
                      style={{ left: fromX, top: fromY, width: length, transform: `rotate(${angle}deg)` }}
                    />
                    <b
                      className={`constellation-edge-label ${edge.kind}`}
                      style={{ left: (fromX + toX) / 2, top: (fromY + toY) / 2 + (edge.labelOffset ?? 0) }}
                    >
                      {edge.label}
                    </b>
                  </span>
                );
              })}

              {activeConstellation.nodes.map((node) => {
                const ruler = rulerProfileByName.get(node.rulerName);
                if (!ruler) return null;
                return (
                  <button
                    key={node.id}
                    type="button"
                    className="constellation-node"
                    style={{
                      left: node.x * constellationCanvas.scaleX + constellationCanvas.offsetX,
                      top: node.y * constellationCanvas.scaleY + constellationCanvas.offsetY,
                    }}
                    aria-label={`打开${ruler.name}身份卡`}
                    aria-haspopup="dialog"
                    onClick={(event) => openRuler(ruler, event.currentTarget)}
                  >
                    <span aria-hidden="true">✦</span>
                    <strong>{node.label}</strong>
                    <small>{node.years}</small>
                  </button>
                );
              })}
            </div>
          </div>

          <ol className="constellation-relations" aria-label={`${activeConstellation.title}关系说明`}>
            {activeConstellation.edges.map((edge) => {
              const from = activeConstellation.nodes.find((node) => node.id === edge.from);
              const to = activeConstellation.nodes.find((node) => node.id === edge.to);
              return (
                <li key={`detail-${edge.from}-${edge.to}-${edge.label}`}>
                  <span className={edge.kind}>{edge.label}</span>
                  <strong>{from?.label} → {to?.label}</strong>
                  <p>{edge.detail}</p>
                </li>
              );
            })}
          </ol>
        </article>
      </section>

      <section ref={directoryRef} id="ruler-directory" className="ruler-directory" aria-labelledby="ruler-directory-title">
        <div className="directory-heading">
          <div>
            <p>THE RULER ARCHIVE</p>
            <h2 id="ruler-directory-title">君王档案馆</h2>
          </div>
          <p>
            当前口径收录 {catalogStats.total} 位实际在位君主。每人都有关系行为视角下的 MBTI 候选与置信度；复位者只计一人，短期、被废与并立君主保留。
          </p>
        </div>

        <details className="methodology-card">
          <summary>
            <div>
              <span>HOW THE TYPE IS INFERRED</span>
              <strong>这些 MBTI 候选是怎么判的？</strong>
            </div>
            <em>展开九项标准</em>
          </summary>
          <div className="methodology-body">
            <section>
              <div className="methodology-title">
                <h3>四个偏好维度</h3>
                <span>政治角色不自动等于人格偏好</span>
              </div>
              <div className="methodology-dimensions">
                {mbtiCriteria.map((criterion) => (
                  <article key={criterion.key}>
                    <b>{criterion.key}</b>
                    <h4>{criterion.title}</h4>
                    <p>{criterion.text}</p>
                  </article>
                ))}
              </div>
            </section>
            <section>
              <div className="methodology-title">
                <h3>五类关系证据</h3>
                <span>只补充判断，不用一段轶事直接定型</span>
              </div>
              <div className="methodology-relations">
                {relationshipCriteria.map((criterion, index) => (
                  <article key={criterion.title}>
                    <b>{String(index + 1).padStart(2, "0")}</b>
                    <div><h4>{criterion.title}</h4><p>{criterion.text}</p></div>
                  </article>
                ))}
              </div>
            </section>
            <p className="methodology-caution">
              <strong>置信度规则：</strong>只有跨时期、跨场景且能归因于本人的材料才进入“中等置信”；幼主、傀儡、短祚或仅存名号者统一标为带问号的低置信候选，其中仅能依据继承位置观察者会注明“结构代理”。史料沉默不代表人物缺少相应情感，类型也不是本人自测结果、学术定论或心理诊断。
              <a href="https://www.myersbriggs.org/my-mbti-personality-type/the-mbti-preferences/" target="_blank" rel="noreferrer">查看 MBTI 四维定义</a>
            </p>
          </div>
        </details>

        <div className="directory-controls">
          <label className="directory-search">
            <span>搜索姓名、帝号或别名</span>
            <input
              type="search"
              value={rulerQuery}
              onChange={(event) => {
                setRulerQuery(event.target.value);
                setVisibleRulerCount(18);
              }}
              placeholder="例如：刘彻、唐太宗、康熙"
            />
          </label>
          <label>
            <span>历史时期</span>
            <select
              value={rulerEra}
              onChange={(event) => {
                setRulerEra(event.target.value);
                setRulerPolity("all");
                setVisibleRulerCount(18);
              }}
            >
              <option value="all">全部 23 个时期</option>
              {eras.map((era) => <option key={era.id} value={era.id}>{era.name} · {rulersByEra[era.id]?.length ?? 0} 位</option>)}
            </select>
          </label>
          <label>
            <span>具体政权</span>
            <select
              value={rulerPolity}
              onChange={(event) => {
                setRulerPolity(event.target.value);
                setVisibleRulerCount(18);
              }}
              disabled={directoryPolities.length < 2}
            >
              <option value="all">{directoryPolities.length < 2 ? "无需细分" : "全部政权"}</option>
              {directoryPolities.map((polity) => <option key={polity} value={polity}>{polity}</option>)}
            </select>
          </label>
        </div>

        <div className="directory-status" aria-live="polite">
          <div><strong>找到 {filteredRulers.length} 位</strong><span>已显示 {Math.min(visibleRulerCount, filteredRulers.length)} 位</span></div>
          <button type="button" onClick={clearDirectoryFilters} disabled={!rulerQuery && rulerEra === "all" && rulerPolity === "all"}>清除筛选</button>
        </div>

        {filteredRulers.length ? (
          <>
            <div className="directory-grid">
              {filteredRulers.slice(0, visibleRulerCount).map((ruler) => (
                <RulerTeaser key={ruler.id} ruler={ruler} onOpen={openRuler} compact />
              ))}
            </div>
            {visibleRulerCount < filteredRulers.length ? (
              <button className="directory-more" type="button" onClick={() => setVisibleRulerCount((count) => count + 18)}>
                继续显示 18 位 <span>（尚有 {filteredRulers.length - visibleRulerCount} 位）</span>
              </button>
            ) : null}
          </>
        ) : (
          <div className="directory-empty">
            <strong>没有找到匹配人物</strong>
            <p>可以尝试姓名、庙号、年号，或清除朝代与政权筛选。</p>
          </div>
        )}

        <aside className="archive-note">
          <strong>资料说明</strong>
          <p>
            有可靠公版来源的画像会显示图像与出处；其余人物明确标注“暂无可靠传世画像”。MBTI 现已覆盖全部人物，其中中等置信 {catalogStats.mbtiMedium} 位、低置信候选 {catalogStats.mbtiLow} 位（含 {catalogStats.mbtiStructural} 位结构代理），并逐项标明情绪、君臣、伴侣、宗族与对外关系是否缺少直接记录。
          </p>
        </aside>
      </section>

      <dialog
        ref={dialogRef}
        className="ruler-dialog"
        aria-labelledby={selectedRuler ? "ruler-dialog-title" : undefined}
        aria-describedby={selectedRuler ? "ruler-dialog-description" : undefined}
        onCancel={(event) => {
          event.preventDefault();
          closeRuler();
        }}
        onClose={restoreRulerFocus}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeRuler();
        }}
      >
        {selectedRuler ? (
          <div className="ruler-dialog-shell">
            <button className="dialog-close" type="button" onClick={closeRuler} aria-label="关闭君王档案">
              <span aria-hidden="true">×</span>
              关闭
            </button>

            <figure className="ruler-portrait-large">
              <RulerPortrait ruler={selectedRuler} large />
              <figcaption>
                <span>{selectedRuler.portrait.kind}</span>
                {selectedRuler.portrait.sourceUrl ? (
                  <a href={selectedRuler.portrait.sourceUrl} target="_blank" rel="noreferrer">
                    {selectedRuler.portrait.credit}
                  </a>
                ) : <small>{selectedRuler.portrait.credit}</small>}
              </figcaption>
            </figure>

            <article className="ruler-profile">
              <p className="ruler-profile-kicker">{selectedRuler.dynasty} · 君王身份卡</p>
              <h2 id="ruler-dialog-title">{selectedRuler.name}</h2>
              <p className="ruler-profile-name">{selectedRuler.personalName} <span>{selectedRuler.title}</span></p>

              <dl className="ruler-facts">
                <div><dt>在位</dt><dd>{selectedRuler.reign}</dd></div>
                <div><dt>生卒</dt><dd>{selectedRuler.lifespan}</dd></div>
              </dl>

              <p className="ruler-identity" id="ruler-dialog-description">{selectedRuler.identity}</p>

              <section className="lineage-card" aria-labelledby="lineage-title">
                <div className="lineage-heading">
                  <div>
                    <span>母亲与承袭来源</span>
                    <h3 id="lineage-title">皇位从哪里来</h3>
                  </div>
                  <em className={`lineage-evidence-${selectedRuler.lineage.evidence}`}>
                    {selectedRuler.lineage.relation}
                  </em>
                </div>
                <dl className="lineage-facts">
                  <div><dt>母亲</dt><dd>{selectedRuler.lineage.mother}</dd></div>
                  <div><dt>父亲</dt><dd>{selectedRuler.lineage.father}</dd></div>
                  <div><dt>前任</dt><dd>{selectedRuler.lineage.predecessor}</dd></div>
                </dl>
                <p>{selectedRuler.lineage.summary}</p>
                {selectedRuler.lineage.sourceUrl ? (
                  <a href={selectedRuler.lineage.sourceUrl} target="_blank" rel="noreferrer">查看父母资料索引 ↗</a>
                ) : <small>早期或材料稀少人物暂未匹配到可靠父母条目。</small>}
              </section>

              <div className="profile-traits" aria-label="史料性格标签">
                {selectedRuler.traits.map((trait) => <span key={trait}>{trait}</span>)}
              </div>

              <section className="mbti-card" aria-labelledby="mbti-title">
                <div className="mbti-heading">
                  <div>
                    <span>MBTI · 关系行为推演</span>
                    <h3 id="mbti-title">{selectedRuler.psychology.label}</h3>
                  </div>
                  <div className="mbti-verdict">
                    <strong>{selectedRuler.psychology.code}{selectedRuler.psychology.confidence === "low" ? <sup aria-hidden="true">?</sup> : null}</strong>
                    <em className={selectedRuler.psychology.confidence === "medium" ? "medium" : "low"}>
                      {selectedRuler.psychology.confidenceLabel}
                    </em>
                  </div>
                </div>
                <p className="mbti-summary">{selectedRuler.psychology.summary}</p>
                <p className="mbti-basis"><b>核心依据</b>{selectedRuler.psychology.basis}</p>
                <div className="mbti-dimensions">
                  {selectedRuler.psychology.dimensions.map((dimension) => (
                    <div key={dimension.letter}>
                      <b>{dimension.letter}</b>
                      <span>{dimension.name}</span>
                      <p>{dimension.evidence}</p>
                    </div>
                  ))}
                </div>

                <div className="relationship-heading">
                  <h3>关系行为观察</h3>
                  <span>五项辅助判定标准</span>
                </div>
                <div className="relationship-grid">
                  {selectedRuler.psychology.relationships.map((relationship) => (
                    <article key={relationship.key}>
                      <div>
                        <h4>{relationship.label}</h4>
                        <span className={`evidence-${relationship.evidenceLevel}`}>
                          {relationship.evidenceLevel === "documented"
                            ? "多项材料"
                            : relationship.evidenceLevel === "limited"
                              ? "有具体线索"
                              : "缺少直接记录"}
                        </span>
                      </div>
                      <p>{relationship.text}</p>
                    </article>
                  ))}
                </div>
                <small>
                  历史人物无法完成现代标准化问卷；本页把政治行为、兴趣与关系记录映射到 MBTI 偏好。关系材料缺载时只降低置信度，不把名分、婚姻或政令自动当成私人情感。
                </small>
              </section>

              <section className="personality-card">
                <div className="profile-section-title">
                  <h3>史料性格侧写</h3>
                  <span>行为概括，非心理诊断</span>
                </div>
                <p>{selectedRuler.personality}</p>
              </section>

              <div className="profile-columns">
                <section>
                  <h3>主要作为</h3>
                  <ul>{selectedRuler.achievements.map((item) => <li key={item}>{item}</li>)}</ul>
                </section>
                <section className="profile-limits">
                  <h3>争议与局限</h3>
                  <ul>{selectedRuler.limits.map((item) => <li key={item}>{item}</li>)}</ul>
                </section>
              </div>

              <section className="profile-ending">
                <h3>人物结局</h3>
                <p>{selectedRuler.ending}</p>
              </section>

              <blockquote>{selectedRuler.assessment}</blockquote>
            </article>
          </div>
        ) : null}
      </dialog>

      <footer>
        <p>历史并非一条笔直的线，而是制度、战争、财政、人物与环境交织而成的长卷。</p>
        <span>MBTI 为基于史料行为、兴趣与关系的候选推演；古代画像不等同于真实照片</span>
      </footer>
    </main>
  );
}
