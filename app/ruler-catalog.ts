import { rulerProfiles, type RulerProfile } from "./ruler-profiles";
import { additionalRulerPortraits } from "./ruler-portraits";
import { buildPsychologyAssessment } from "./ruler-psychology";
import type { PsychologyAssessment } from "./ruler-psychology-types";
import { buildRulerLineage, type RulerLineage } from "./ruler-lineage";

/**
 * Lightweight catalogue metadata layered over the twelve fully researched
 * profiles. Index-only entries use evidence-ranked behavioural candidates and
 * remain explicit when relationship or personality records are scarce.
 */
export type CatalogRulerProfile = RulerProfile & {
  polity: string;
  order: number;
  aliases: string[];
  searchText: string;
  evidenceLevel: "curated" | "index";
  portraitStatus: "available" | "unavailable";
  mbtiStatus: "inferred" | "withheld";
  psychology: PsychologyAssessment;
  lineage: RulerLineage;
  featuredRank?: number;
};

type RulerSeed = {
  eraId: string;
  polity: string;
  polityOrder: number;
  name: string;
  order: number;
  reign?: string;
  aliases?: string[];
  predecessorKey?: string;
  predecessorName?: string;
};

type PolitySeed = {
  eraId: string;
  polity: string;
  rulers: string;
};

const politySeeds: PolitySeed[] = [
  { eraId: "xia", polity: "夏", rulers: "禹|启|太康|仲康|相|少康|杼|槐|芒|泄|不降|扃|廑|孔甲|皋|发|桀" },
  { eraId: "shang", polity: "商", rulers: "汤|外丙|仲壬|太甲|沃丁|太庚|小甲|雍己|太戊|仲丁|外壬|河亶甲|祖乙|祖辛|沃甲|祖丁|南庚|阳甲|盘庚|小辛|小乙|武丁|祖庚|祖甲|廪辛|庚丁|武乙|文丁|帝乙|帝辛" },
  { eraId: "western-zhou", polity: "西周", rulers: "周武王|周成王|周康王|周昭王|周穆王|周共王|周懿王|周孝王|周夷王|周厉王|周宣王|周幽王" },
  { eraId: "eastern-zhou", polity: "东周", rulers: "周平王|周桓王|周庄王|周釐王|周惠王|周襄王|周顷王|周匡王|周定王|周简王|周灵王|周景王|周悼王|周敬王|周元王|周贞定王|周哀王|周思王|周考王|周威烈王|周安王|周烈王|周显王|周慎靓王|周赧王" },
  { eraId: "qin", polity: "秦", rulers: "秦始皇嬴政|秦二世胡亥|秦王子婴" },
  { eraId: "western-han", polity: "西汉", rulers: "汉高祖刘邦|汉惠帝刘盈|前少帝刘恭|后少帝刘弘|汉文帝刘恒|汉景帝刘启|汉武帝刘彻|汉昭帝刘弗陵|刘贺|汉宣帝刘询|汉元帝刘奭|汉成帝刘骜|汉哀帝刘欣|汉平帝刘衎" },
  { eraId: "xin", polity: "新", rulers: "王莽" },
  { eraId: "xin", polity: "更始政权", rulers: "更始帝刘玄" },
  { eraId: "xin", polity: "赤眉政权", rulers: "刘盆子" },
  { eraId: "eastern-han", polity: "东汉", rulers: "光武帝刘秀|明帝刘庄|章帝刘炟|和帝刘肇|殇帝刘隆|安帝刘祜|北乡侯刘懿|顺帝刘保|冲帝刘炳|质帝刘缵|桓帝刘志|灵帝刘宏|少帝刘辩|献帝刘协" },
  { eraId: "three-kingdoms", polity: "曹魏", rulers: "曹丕|曹叡|曹芳|曹髦|曹奂" },
  { eraId: "three-kingdoms", polity: "蜀汉", rulers: "刘备|刘禅" },
  { eraId: "three-kingdoms", polity: "孙吴", rulers: "孙权|孙亮|孙休|孙皓" },
  { eraId: "jin", polity: "西晋", rulers: "司马炎|司马衷|司马炽|司马邺" },
  { eraId: "jin", polity: "东晋", rulers: "司马睿|司马绍|司马衍|司马岳|司马聃|司马丕|司马奕|司马昱|司马曜|司马德宗|司马德文" },

  // Canonical sixteen regimes.  Only rulers who actually headed the polity are
  // included; purely posthumous imperial titles are not separate cards.
  { eraId: "sixteen-kingdoms", polity: "成汉", rulers: "李雄|李班|李期|李寿|李势" },
  { eraId: "sixteen-kingdoms", polity: "汉赵", rulers: "刘渊|刘和|刘聪|刘粲|刘曜|刘熙" },
  { eraId: "sixteen-kingdoms", polity: "后赵", rulers: "石勒|石弘|石虎|石世|石遵|石鉴|石祗" },
  { eraId: "sixteen-kingdoms", polity: "前凉", rulers: "张轨|张寔|张茂|张骏|张重华|张曜灵|张祚|张玄靓|张天锡" },
  { eraId: "sixteen-kingdoms", polity: "前燕", rulers: "慕容皝|慕容儁|慕容暐" },
  { eraId: "sixteen-kingdoms", polity: "前秦", rulers: "苻健|苻生|苻坚|苻丕|苻登|苻崇" },
  { eraId: "sixteen-kingdoms", polity: "后燕", rulers: "慕容垂|慕容宝|慕容盛|慕容熙" },
  { eraId: "sixteen-kingdoms", polity: "后秦", rulers: "姚苌|姚兴|姚泓" },
  { eraId: "sixteen-kingdoms", polity: "西秦", rulers: "乞伏国仁|乞伏乾归|乞伏炽磐|乞伏暮末" },
  { eraId: "sixteen-kingdoms", polity: "后凉", rulers: "吕光|吕绍|吕纂|吕隆" },
  { eraId: "sixteen-kingdoms", polity: "南凉", rulers: "秃发乌孤|秃发利鹿孤|秃发傉檀" },
  { eraId: "sixteen-kingdoms", polity: "南燕", rulers: "慕容德|慕容超" },
  { eraId: "sixteen-kingdoms", polity: "西凉", rulers: "李暠|李歆|李恂" },
  { eraId: "sixteen-kingdoms", polity: "北凉", rulers: "段业|沮渠蒙逊|沮渠牧犍" },
  { eraId: "sixteen-kingdoms", polity: "胡夏", rulers: "赫连勃勃|赫连昌|赫连定" },
  { eraId: "sixteen-kingdoms", polity: "北燕", rulers: "高云|冯跋|冯弘" },

  { eraId: "northern-southern", polity: "刘宋", rulers: "刘裕|刘义符|刘义隆|刘劭|刘骏|刘子业|刘彧|刘昱|刘准" },
  { eraId: "northern-southern", polity: "南齐", rulers: "萧道成|萧赜|萧昭业|萧昭文|萧鸾|萧宝卷|萧宝融" },
  { eraId: "northern-southern", polity: "梁", rulers: "萧衍|萧纲|萧栋|萧纪|萧绎|萧渊明|萧方智" },
  { eraId: "northern-southern", polity: "陈", rulers: "陈霸先|陈蒨|陈伯宗|陈顼|陈叔宝" },
  { eraId: "northern-southern", polity: "北魏", rulers: "拓跋珪|拓跋嗣|拓跋焘|拓跋余|拓跋濬|拓跋弘|元宏|元恪|元诩|元钊|元子攸|元晔|元恭|元朗|元修" },
  { eraId: "northern-southern", polity: "东魏", rulers: "元善见" },
  { eraId: "northern-southern", polity: "西魏", rulers: "元宝炬|元钦|元廓" },
  { eraId: "northern-southern", polity: "北齐", rulers: "高洋|高殷|高演|高湛|高纬|高恒" },
  { eraId: "northern-southern", polity: "北周", rulers: "宇文觉|宇文毓|宇文邕|宇文赟|宇文阐" },

  { eraId: "sui", polity: "隋", rulers: "隋文帝杨坚|隋炀帝杨广|隋恭帝杨侑|杨浩|杨侗" },
  { eraId: "tang", polity: "唐（含武周）", rulers: "唐高祖李渊|唐太宗李世民|唐高宗李治|唐中宗李显|唐睿宗李旦|武则天|唐少帝李重茂|唐玄宗李隆基|唐肃宗李亨|唐代宗李豫|唐德宗李适|唐顺宗李诵|唐宪宗李纯|唐穆宗李恒|唐敬宗李湛|唐文宗李昂|唐武宗李炎|唐宣宗李忱|唐懿宗李漼|唐僖宗李儇|唐昭宗李晔|唐哀帝李柷" },

  { eraId: "five-dynasties", polity: "后梁", rulers: "朱温|朱友珪|朱友贞" },
  { eraId: "five-dynasties", polity: "后唐", rulers: "李存勖|李嗣源|李从厚|李从珂" },
  { eraId: "five-dynasties", polity: "后晋", rulers: "石敬瑭|石重贵" },
  { eraId: "five-dynasties", polity: "后汉", rulers: "刘知远|刘承祐" },
  { eraId: "five-dynasties", polity: "后周", rulers: "郭威|柴荣|柴宗训" },
  { eraId: "five-dynasties", polity: "吴", rulers: "杨行密|杨渥|杨隆演|杨溥" },
  { eraId: "five-dynasties", polity: "南唐", rulers: "李昪|李璟|李煜" },
  { eraId: "five-dynasties", polity: "吴越", rulers: "钱镠|钱元瓘|钱弘佐|钱弘倧|钱弘俶" },
  { eraId: "five-dynasties", polity: "楚", rulers: "马殷|马希声|马希范|马希广|马希萼|马希崇" },
  { eraId: "five-dynasties", polity: "闽", rulers: "王审知|王延翰|王延钧|王继鹏|王延羲|朱文进|王延政" },
  { eraId: "five-dynasties", polity: "南汉", rulers: "刘䶮|刘玢|刘晟|刘鋹" },
  { eraId: "five-dynasties", polity: "前蜀", rulers: "王建|王衍" },
  { eraId: "five-dynasties", polity: "后蜀", rulers: "孟知祥|孟昶" },
  { eraId: "five-dynasties", polity: "荆南", rulers: "高季兴|高从诲|高保融|高保勗|高继冲" },
  { eraId: "five-dynasties", polity: "北汉", rulers: "刘崇|刘钧|刘继恩|刘继元" },

  { eraId: "liao", polity: "辽", rulers: "耶律阿保机|耶律德光|耶律阮|耶律璟|耶律贤|耶律隆绪|耶律宗真|耶律洪基|耶律延禧" },
  { eraId: "northern-song", polity: "北宋", rulers: "宋太祖赵匡胤|宋太宗赵光义|宋真宗赵恒|宋仁宗赵祯|宋英宗赵曙|宋神宗赵顼|宋哲宗赵煦|宋徽宗赵佶|宋钦宗赵桓" },
  { eraId: "western-xia", polity: "西夏", rulers: "李元昊|李谅祚|李秉常|李乾顺|李仁孝|李纯祐|李安全|李遵顼|李德旺|李睍" },
  { eraId: "jin-dynasty", polity: "金", rulers: "完颜阿骨打|完颜晟|完颜亶|完颜亮|完颜雍|完颜璟|完颜永济|完颜珣|完颜守绪|完颜承麟" },
  { eraId: "southern-song", polity: "南宋", rulers: "宋高宗赵构|宋孝宗赵昚|宋光宗赵惇|宋宁宗赵扩|宋理宗赵昀|宋度宗赵禥|宋恭帝赵㬎|宋端宗赵昰|宋末帝赵昺" },
  { eraId: "yuan", polity: "元", rulers: "忽必烈|铁穆耳|海山|爱育黎拔力八达|硕德八剌|也孙铁木儿|阿速吉八|图帖睦尔|和世㻋|懿璘质班|妥懽帖睦尔" },
  { eraId: "ming", polity: "明", rulers: "朱元璋|朱允炆|朱棣|朱高炽|朱瞻基|朱祁镇|朱祁钰|朱见深|朱祐樘|朱厚照|朱厚熜|朱载坖|朱翊钧|朱常洛|朱由校|朱由检" },
  { eraId: "ming", polity: "南明", rulers: "朱由崧|朱聿键|朱聿鐭|朱由榔" },
  { eraId: "qing", polity: "后金／清", rulers: "努尔哈赤|皇太极|顺治帝福临|康熙帝玄烨|雍正帝胤禛|乾隆帝弘历|嘉庆帝颙琰|道光帝旻宁|咸丰帝奕詝|同治帝载淳|光绪帝载湉|宣统帝溥仪" },
];

const reignOverrides: Record<string, string> = {
  "tang:唐中宗李显": "684年；705—710年（两度在位）",
  "tang:唐睿宗李旦": "684—690年；710—712年（两度在位）",
  "yuan:图帖睦尔": "1328—1329年；1329—1332年（两度在位）",
  "ming:朱祁镇": "1435—1449年；1457—1464年（两度在位）",
};

const aliasOverrides: Record<string, string[]> = {
  "qin:秦始皇嬴政": ["秦始皇", "嬴政"],
  "western-han:汉武帝刘彻": ["汉武帝", "刘彻"],
  "eastern-han:光武帝刘秀": ["汉光武帝", "刘秀"],
  "sui:隋文帝杨坚": ["隋文帝", "杨坚"],
  "tang:唐太宗李世民": ["唐太宗", "李世民"],
  "tang:武则天": ["武曌", "则天大圣皇帝"],
  "northern-song:宋太祖赵匡胤": ["宋太祖", "赵匡胤"],
  "yuan:忽必烈": ["元世祖", "薛禅汗"],
  "ming:朱元璋": ["明太祖", "洪武帝"],
  "ming:朱棣": ["明成祖", "永乐帝"],
  "qing:康熙帝玄烨": ["康熙帝", "玄烨", "清圣祖"],
  "qing:光绪帝载湉": ["光绪帝", "载湉", "清德宗"],
};

const curatedIdBySeedKey: Record<string, string> = {
  "qin:秦始皇嬴政": "qin-shihuang",
  "western-han:汉武帝刘彻": "han-wudi",
  "eastern-han:光武帝刘秀": "han-guangwu",
  "sui:隋文帝杨坚": "sui-wendi",
  "tang:唐太宗李世民": "tang-taizong",
  "tang:武则天": "wu-zetian",
  "northern-song:宋太祖赵匡胤": "song-taizu",
  "yuan:忽必烈": "yuan-shizu",
  "ming:朱元璋": "ming-taizu",
  "ming:朱棣": "ming-chengzu",
  "qing:康熙帝玄烨": "qing-kangxi",
  "qing:光绪帝载湉": "qing-guangxu",
};

const polityIndexByEra = new Map<string, number>();
const rulerSeeds: RulerSeed[] = politySeeds.flatMap((group) => {
  const polityOrder = (polityIndexByEra.get(group.eraId) ?? 0) + 1;
  polityIndexByEra.set(group.eraId, polityOrder);

  return group.rulers.split("|").map((name, index) => {
    const seedKey = `${group.eraId}:${name}`;
    return {
      eraId: group.eraId,
      polity: group.polity,
      polityOrder,
      name,
      order: index + 1,
      reign: reignOverrides[seedKey],
      aliases: aliasOverrides[seedKey] ?? [],
      predecessorKey: index > 0 ? `${group.eraId}:${group.rulers.split("|")[index - 1]}` : undefined,
      predecessorName: index > 0 ? group.rulers.split("|")[index - 1] : undefined,
    };
  });
});

const curatedById = new Map(rulerProfiles.map((profile) => [profile.id, profile]));

function createIndexProfile(seed: RulerSeed): CatalogRulerProfile {
  const seedKey = `${seed.eraId}:${seed.name}`;
  const curatedId = curatedIdBySeedKey[seedKey];
  const curated = curatedId ? curatedById.get(curatedId) : undefined;
  const additionalPortrait = additionalRulerPortraits[seedKey];
  const aliases = Array.from(new Set([seed.name, ...(seed.aliases ?? []), ...(curated ? [curated.name, curated.personalName] : [])]));
  const psychology = buildPsychologyAssessment({
    key: seedKey,
    name: seed.name,
    polity: seed.polity,
    eraId: seed.eraId,
    order: seed.order,
  }, curated?.mbti);
  const lineage = buildRulerLineage({
    key: seedKey,
    name: seed.name,
    polity: seed.polity,
    predecessorKey: seed.predecessorKey,
    predecessorName: seed.predecessorName,
  });

  if (curated) {
    return {
      ...curated,
      reign: seed.reign ?? curated.reign,
      polity: seed.polity,
      order: seed.order,
      aliases,
      searchText: [seed.name, ...aliases, seed.polity, curated.name, curated.personalName, curated.title, curated.reign].join(" "),
      evidenceLevel: "curated",
      portraitStatus: curated.portrait.src ? "available" : "unavailable",
      mbtiStatus: "inferred",
      psychology,
      lineage,
    };
  }

  return {
    id: `ruler-${seed.eraId}-${seed.polityOrder}-${seed.order}`,
    eraId: seed.eraId,
    name: seed.name,
    personalName: "史籍所载名号",
    title: `${seed.polity}君主`,
    dynasty: seed.polity,
    reign: seed.reign ?? "在位纪年待专门史料卡补充",
    lifespan: "生卒年待考",
    identity: `${seed.name}为${seed.polity}在位君主。本卡已完成世系索引，详细生平仍需依据专门史料逐项补充。`,
    portrait: additionalPortrait ?? {
      src: "",
      alt: `${seed.name}暂无可靠传世画像`,
      kind: "暂无可靠传世画像",
      credit: "未采用现代想象图，以免把生成形象误作历史肖像。",
    },
    traits: [psychology.label, psychology.confidenceLabel],
    mbti: {
      code: psychology.code,
      label: psychology.label,
      summary: psychology.summary,
      dimensions: psychology.dimensions,
    },
    personality: `${psychology.basis}关系维度中缺载的部分会明确标注，不把政治名分直接当作私人感情。`,
    achievements: ["已纳入完整君主世系目录；专题事迹等待史料核对。"],
    limits: ["当前为索引级身份卡，不代表完整人物传记。", `${psychology.confidenceLabel}仅表示基于现有行为线索的候选类型。`],
    ending: "结局与继承关系待专门史料卡补充。",
    assessment: "关系行为可以扩充观察面，却不能替代缺失史料；卡片会同时展示推演依据与证据强弱。",
    polity: seed.polity,
    order: seed.order,
    aliases,
    searchText: [seed.name, ...aliases, seed.polity].join(" "),
    evidenceLevel: "index",
    portraitStatus: additionalPortrait ? "available" : "unavailable",
    mbtiStatus: "inferred",
    psychology,
    lineage,
  };
}

const profilesWithoutFeaturedRank = rulerSeeds.map(createIndexProfile);

const profilesByEraBeforeFeatured = profilesWithoutFeaturedRank.reduce<Record<string, CatalogRulerProfile[]>>(
  (accumulator, profile) => {
    (accumulator[profile.eraId] ??= []).push(profile);
    return accumulator;
  },
  {},
);

const featuredIdsByEra = Object.fromEntries(
  Object.entries(profilesByEraBeforeFeatured).map(([eraId, profiles]) => {
    const curated = profiles.filter((profile) => profile.evidenceLevel === "curated");
    const featured = [...curated, ...profiles.filter((profile) => profile.evidenceLevel !== "curated")].slice(0, 2);
    return [eraId, featured.map((profile) => profile.id)];
  }),
) as Record<string, string[]>;

export const allRulerProfiles: CatalogRulerProfile[] = profilesWithoutFeaturedRank.map((profile) => {
  const featuredRank = featuredIdsByEra[profile.eraId]?.indexOf(profile.id) ?? -1;
  return featuredRank >= 0 ? { ...profile, featuredRank: featuredRank + 1 } : profile;
});

export const rulersByEra = allRulerProfiles.reduce<Record<string, CatalogRulerProfile[]>>((accumulator, profile) => {
  (accumulator[profile.eraId] ??= []).push(profile);
  return accumulator;
}, {});

export const featuredRulersByEra = Object.fromEntries(
  Object.entries(rulersByEra).map(([eraId, profiles]) => [
    eraId,
    profiles.filter((profile) => profile.featuredRank).sort((a, b) => (a.featuredRank ?? 0) - (b.featuredRank ?? 0)),
  ]),
) as Record<string, CatalogRulerProfile[]>;

export const politiesForEra = Object.fromEntries(
  Object.entries(rulersByEra).map(([eraId, profiles]) => [eraId, Array.from(new Set(profiles.map((profile) => profile.polity)))]),
) as Record<string, string[]>;

const byEra = Object.fromEntries(Object.entries(rulersByEra).map(([eraId, profiles]) => [eraId, profiles.length]));

export const catalogStats = {
  total: allRulerProfiles.length,
  curated: allRulerProfiles.filter((profile) => profile.evidenceLevel === "curated").length,
  indexOnly: allRulerProfiles.filter((profile) => profile.evidenceLevel === "index").length,
  withPortrait: allRulerProfiles.filter((profile) => profile.portraitStatus === "available").length,
  portraitUnavailable: allRulerProfiles.filter((profile) => profile.portraitStatus === "unavailable").length,
  mbtiInferred: allRulerProfiles.filter((profile) => profile.mbtiStatus === "inferred").length,
  mbtiWithheld: allRulerProfiles.filter((profile) => profile.mbtiStatus === "withheld").length,
  mbtiMedium: allRulerProfiles.filter((profile) => profile.psychology.confidence === "medium").length,
  mbtiLow: allRulerProfiles.filter((profile) => profile.psychology.confidence === "low").length,
  mbtiStructural: allRulerProfiles.filter((profile) => profile.psychology.structuralProxy).length,
  byEra,
} as const;
