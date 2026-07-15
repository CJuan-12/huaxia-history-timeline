import type { CatalogRulerProfile } from "./ruler-catalog";
import type {
  CultureRegion,
  CultureRegionKey,
  CultureRegionStatus,
} from "./culture-atlas";

/**
 * The atlas deliberately works at the level of twelve broad cultural regions.
 * These values describe a ruler-focused reading of that schematic; they are
 * not GIS borders and must not be presented as a year-exact territorial map.
 */
export type RulerMapMoment = "accession" | "middle" | "end";

export type TerritoryTrend =
  | "formation"
  | "expansion"
  | "stable"
  | "recovery"
  | "contraction"
  | "fragmentation"
  | "relocation"
  | "collapse"
  | "uncertain";

export type TerritorySourceKind = "polity-template" | "ruler-change" | "uncertain";

export type TerritoryConfidence = "high" | "medium" | "low";

export type TerritoryRegionDirective = {
  status: CultureRegionStatus;
  headline?: string;
  detail?: string;
};

export type TerritoryPolityTemplate = {
  eraId: string;
  polity: string;
  confidence: TerritoryConfidence;
  summary: string;
  regions: Partial<Record<CultureRegionKey, TerritoryRegionDirective>>;
};

export type TerritoryStatePatch = {
  trend: TerritoryTrend;
  confidence: TerritoryConfidence;
  changeSummary: string;
  regions?: Partial<Record<CultureRegionKey, TerritoryRegionDirective>>;
};

export type RulerTerritoryChangeRule = Partial<Record<RulerMapMoment, TerritoryStatePatch>>;

export type RulerTerritoryState = {
  eraId: string;
  polity: string;
  rulerKey: string;
  rulerName: string;
  moment: RulerMapMoment;
  regions: Partial<Record<CultureRegionKey, CultureRegion>>;
  sourceKind: TerritorySourceKind;
  sourceLabel: string;
  sourceRulerName?: string;
  trend: TerritoryTrend;
  confidence: TerritoryConfidence;
  changeSummary: string;
};

export const rulerMapMomentLabels: Record<RulerMapMoment, string> = {
  accession: "即位时",
  middle: "统治中期",
  end: "末期",
};

export const territoryTrendLabels: Record<TerritoryTrend, string> = {
  formation: "政权形成",
  expansion: "区域扩展",
  stable: "大体延续",
  recovery: "控制恢复",
  contraction: "控制收缩",
  fragmentation: "实际控制碎裂",
  relocation: "政治中心重组",
  collapse: "政权覆灭",
  uncertain: "变化不确定",
};

const allRegionKeys: CultureRegionKey[] = [
  "western-regions",
  "northwest",
  "plateau",
  "steppe",
  "northeast",
  "guanzhong",
  "heartland",
  "jianghuai",
  "lower-yangtze",
  "southwest",
  "southeast",
  "lingnan",
];

const territoryStatusCopy: Record<CultureRegionStatus, string> = {
  core: "政权核心",
  controlled: "有效控制",
  exchange: "藩属或影响",
  rival: "同期政权或争夺",
  uncertain: "边界或实际控制存疑",
};

const polityKey = (eraId: string, polity: string) => `${eraId}::${polity}`;

export function getRulerTerritoryKey(
  ruler: Pick<CatalogRulerProfile, "eraId" | "polity" | "name"> & Partial<Pick<CatalogRulerProfile, "aliases">>,
): string;
export function getRulerTerritoryKey(eraId: string, polity: string, name: string): string;
export function getRulerTerritoryKey(
  rulerOrEraId: (Pick<CatalogRulerProfile, "eraId" | "polity" | "name"> & Partial<Pick<CatalogRulerProfile, "aliases">>) | string,
  polity?: string,
  name?: string,
): string {
  if (typeof rulerOrEraId === "string") return `${rulerOrEraId}::${polity ?? ""}::${name ?? ""}`;
  // Curated identity cards use a shorter display name, while aliases[0]
  // deliberately retains the catalogue's canonical ruler label.
  const canonicalName = rulerOrEraId.aliases?.[0] ?? rulerOrEraId.name;
  return `${rulerOrEraId.eraId}::${rulerOrEraId.polity}::${canonicalName}`;
}

const directive = (
  status: CultureRegionStatus,
  headline?: string,
  detail?: string,
): TerritoryRegionDirective => ({ status, headline, detail });

type RegionGroups = Partial<Record<CultureRegionStatus, CultureRegionKey[]>>;

const groupedRegions = (groups: RegionGroups): TerritoryPolityTemplate["regions"] => {
  const result: TerritoryPolityTemplate["regions"] = {};
  (Object.entries(groups) as [CultureRegionStatus, CultureRegionKey[]][]).forEach(([status, keys]) => {
    keys.forEach((key) => {
      result[key] = directive(status);
    });
  });
  return result;
};

const template = (
  eraId: string,
  polity: string,
  confidence: TerritoryConfidence,
  summary: string,
  groups: RegionGroups,
): TerritoryPolityTemplate => ({ eraId, polity, confidence, summary, regions: groupedRegions(groups) });

/**
 * One entry exists for every eraId + polity pair in ruler-catalog.ts (66 in
 * total).  Rival regions remain visible as contemporary context, especially in
 * periods of division; selecting a ruler never erases the other polities.
 */
export const territoryPolityTemplates: Record<string, TerritoryPolityTemplate> = {
  [polityKey("xia", "夏")]: template("xia", "夏", "low", "传统文献中的夏后氏活动中心示意，不能理解为可测绘的国界。", {
    uncertain: ["heartland", "guanzhong"], exchange: ["jianghuai"], rival: ["southwest"],
  }),
  [polityKey("shang", "商")]: template("shang", "商", "medium", "商王畿、方国联盟与交流网络的区域级示意。", {
    core: ["heartland"], controlled: ["jianghuai"], exchange: ["northeast", "northwest"], rival: ["southwest"],
  }),
  [polityKey("western-zhou", "西周")]: template("western-zhou", "西周", "medium", "宗周、成周与分封网络示意，不等同于现代连续领土。", {
    core: ["guanzhong", "heartland"], controlled: ["jianghuai", "northeast"], exchange: ["southwest"],
  }),
  [polityKey("eastern-zhou", "东周")]: template("eastern-zhou", "东周", "medium", "只突出洛阳周王畿；列国区域保留为同期竞争背景。", {
    core: ["heartland"], rival: ["guanzhong", "jianghuai", "lower-yangtze", "southwest"], exchange: ["steppe"],
  }),
  [polityKey("qin", "秦")]: template("qin", "秦", "high", "秦帝国直接行政、边疆控制与军事到达分层示意。", {
    core: ["guanzhong", "heartland"], controlled: ["jianghuai", "southwest", "lingnan"], exchange: ["steppe"],
  }),
  [polityKey("western-han", "西汉")]: template("western-han", "西汉", "high", "西汉中后期直接治理与边疆影响的宏观示意。", {
    core: ["guanzhong", "heartland"], controlled: ["jianghuai", "southwest", "lingnan", "northwest"], exchange: ["western-regions", "steppe"],
  }),

  [polityKey("xin", "新")]: template("xin", "新", "medium", "新朝名义继承汉地行政网络，末期实际控制迅速碎裂。", {
    core: ["guanzhong", "heartland"], controlled: ["jianghuai"], rival: ["steppe"],
  }),
  [polityKey("xin", "更始政权")]: template("xin", "更始政权", "low", "更始政权的联盟响应与短期军事控制示意。", {
    core: ["heartland"], controlled: ["guanzhong"], uncertain: ["jianghuai"], rival: ["steppe"],
  }),
  [polityKey("xin", "赤眉政权")]: template("xin", "赤眉政权", "low", "赤眉军及其所立政权的移动走廊示意，不视作全国疆域。", {
    core: ["guanzhong"], uncertain: ["heartland", "jianghuai"], rival: ["steppe"],
  }),
  [polityKey("eastern-han", "东汉")]: template("eastern-han", "东汉", "high", "东汉直接行政区与西北、草原关系的宏观示意。", {
    core: ["heartland", "guanzhong"], controlled: ["jianghuai", "southwest", "northwest"], exchange: ["steppe"],
  }),

  [polityKey("three-kingdoms", "曹魏")]: template("three-kingdoms", "曹魏", "high", "突出曹魏北方政权；蜀、吴作为同期对手保留。", {
    core: ["heartland"], exchange: ["steppe"], rival: ["southwest", "lower-yangtze", "lingnan"],
  }),
  [polityKey("three-kingdoms", "蜀汉")]: template("three-kingdoms", "蜀汉", "high", "突出巴蜀与汉中方向；北伐路线只作争夺区。", {
    core: ["southwest"], rival: ["heartland", "lower-yangtze"], exchange: ["lingnan", "steppe"],
  }),
  [polityKey("three-kingdoms", "孙吴")]: template("three-kingdoms", "孙吴", "high", "突出江东、东南与岭南；魏、蜀仍作为同期背景。", {
    core: ["lower-yangtze"], controlled: ["lingnan"], rival: ["heartland", "southwest"], exchange: ["steppe"],
  }),
  [polityKey("jin", "西晋")]: template("jin", "西晋", "high", "西晋统一后的宏观行政范围示意。", {
    core: ["heartland"], controlled: ["jianghuai", "lower-yangtze", "southwest"], exchange: ["steppe"],
  }),
  [polityKey("jin", "东晋")]: template("jin", "东晋", "high", "突出建康、江淮和巴蜀；北方为同期竞争区。", {
    core: ["lower-yangtze"], controlled: ["jianghuai", "southwest"], rival: ["heartland", "steppe"],
  }),

  [polityKey("sixteen-kingdoms", "成汉")]: template("sixteen-kingdoms", "成汉", "medium", "成汉以成都平原和巴蜀为核心。", {
    core: ["southwest"], rival: ["heartland", "guanzhong", "northwest", "northeast"], uncertain: ["steppe"],
  }),
  [polityKey("sixteen-kingdoms", "汉赵")]: template("sixteen-kingdoms", "汉赵", "medium", "汉赵前后政治中心变化较大，以中原—关中走廊示意。", {
    core: ["heartland", "guanzhong"], rival: ["northwest", "northeast", "southwest"], exchange: ["steppe"],
  }),
  [polityKey("sixteen-kingdoms", "后赵")]: template("sixteen-kingdoms", "后赵", "medium", "后赵以河北、中原为核心，北方控制随军政局势变化。", {
    core: ["heartland"], controlled: ["northeast"], rival: ["guanzhong", "northwest", "southwest"], exchange: ["steppe"],
  }),
  [polityKey("sixteen-kingdoms", "前凉")]: template("sixteen-kingdoms", "前凉", "medium", "前凉以河西走廊为核心。", {
    core: ["northwest"], exchange: ["steppe"], rival: ["guanzhong", "heartland", "northeast", "southwest"],
  }),
  [polityKey("sixteen-kingdoms", "前燕")]: template("sixteen-kingdoms", "前燕", "medium", "前燕由辽西、东北向河北和中原北部发展。", {
    core: ["northeast"], controlled: ["heartland"], rival: ["guanzhong", "northwest", "southwest"], exchange: ["steppe"],
  }),
  [polityKey("sixteen-kingdoms", "前秦")]: template("sixteen-kingdoms", "前秦", "medium", "前秦以关中为根基；统一北方只在苻坚专属快照中表达。", {
    core: ["guanzhong"], controlled: ["heartland"], rival: ["northwest", "northeast", "southwest"], exchange: ["steppe"],
  }),
  [polityKey("sixteen-kingdoms", "后燕")]: template("sixteen-kingdoms", "后燕", "medium", "后燕以河北、辽西方向为主要活动区。", {
    core: ["northeast"], controlled: ["heartland"], rival: ["guanzhong", "northwest", "southwest"], exchange: ["steppe"],
  }),
  [polityKey("sixteen-kingdoms", "后秦")]: template("sixteen-kingdoms", "后秦", "medium", "后秦以关中为核心，外围控制具有阶段性。", {
    core: ["guanzhong"], controlled: ["heartland"], rival: ["northwest", "northeast", "southwest"], exchange: ["steppe"],
  }),
  [polityKey("sixteen-kingdoms", "西秦")]: template("sixteen-kingdoms", "西秦", "low", "西秦活动于陇右、河西南缘，以宽泛区域表达。", {
    core: ["northwest"], uncertain: ["guanzhong", "steppe"], rival: ["heartland", "northeast", "southwest"],
  }),
  [polityKey("sixteen-kingdoms", "后凉")]: template("sixteen-kingdoms", "后凉", "medium", "后凉以河西为核心，后期被多个河西政权分割。", {
    core: ["northwest"], exchange: ["steppe"], rival: ["guanzhong", "heartland", "northeast", "southwest"],
  }),
  [polityKey("sixteen-kingdoms", "南凉")]: template("sixteen-kingdoms", "南凉", "low", "南凉在河西南部、青海东缘活动。", {
    core: ["northwest"], uncertain: ["steppe"], rival: ["guanzhong", "heartland", "northeast", "southwest"],
  }),
  [polityKey("sixteen-kingdoms", "南燕")]: template("sixteen-kingdoms", "南燕", "medium", "南燕以山东方向为核心，归入中原东部大区示意。", {
    core: ["heartland"], rival: ["guanzhong", "northwest", "northeast", "southwest"], exchange: ["steppe"],
  }),
  [polityKey("sixteen-kingdoms", "西凉")]: template("sixteen-kingdoms", "西凉", "low", "西凉以河西西部为核心并连接西域通道。", {
    core: ["northwest"], exchange: ["steppe"], rival: ["guanzhong", "heartland", "northeast", "southwest"],
  }),
  [polityKey("sixteen-kingdoms", "北凉")]: template("sixteen-kingdoms", "北凉", "medium", "北凉以河西为核心并联系西域通道。", {
    core: ["northwest"], exchange: ["steppe"], rival: ["guanzhong", "heartland", "northeast", "southwest"],
  }),
  [polityKey("sixteen-kingdoms", "胡夏")]: template("sixteen-kingdoms", "胡夏", "medium", "胡夏以河套、陕北方向为核心；夺取长安只作临时快照。", {
    core: ["northwest"], controlled: ["guanzhong"], rival: ["heartland", "northeast", "southwest"], exchange: ["steppe"],
  }),
  [polityKey("sixteen-kingdoms", "北燕")]: template("sixteen-kingdoms", "北燕", "medium", "北燕以辽西、东北方向为核心。", {
    core: ["northeast"], rival: ["heartland", "guanzhong", "northwest", "southwest"], exchange: ["steppe"],
  }),

  [polityKey("northern-southern", "刘宋")]: template("northern-southern", "刘宋", "high", "突出江南与江淮，北魏作为北方背景。", {
    core: ["lower-yangtze"], controlled: ["jianghuai", "southwest"], rival: ["heartland", "northwest", "steppe"],
  }),
  [polityKey("northern-southern", "南齐")]: template("northern-southern", "南齐", "high", "南齐以江南为核心，江淮为主要边防方向。", {
    core: ["lower-yangtze"], controlled: ["jianghuai", "southwest"], rival: ["heartland", "northwest", "steppe"],
  }),
  [polityKey("northern-southern", "梁")]: template("northern-southern", "梁", "high", "梁以江南为核心；侯景之乱后的碎裂由君主规则覆盖。", {
    core: ["lower-yangtze"], controlled: ["jianghuai", "southwest"], rival: ["heartland", "northwest", "steppe"],
  }),
  [polityKey("northern-southern", "陈")]: template("northern-southern", "陈", "high", "陈朝以江南为核心，初期范围较梁明显缩小。", {
    core: ["lower-yangtze"], controlled: ["jianghuai", "southwest"], rival: ["heartland", "northwest", "steppe"],
  }),
  [polityKey("northern-southern", "北魏")]: template("northern-southern", "北魏", "high", "北魏北方政权示意，南朝区域保留为对峙背景。", {
    core: ["heartland", "steppe"], controlled: ["northwest"], rival: ["jianghuai", "lower-yangtze", "southwest"],
  }),
  [polityKey("northern-southern", "东魏")]: template("northern-southern", "东魏", "high", "东魏以中原东部为核心，西魏和南朝为对手。", {
    core: ["heartland"], controlled: ["steppe"], rival: ["northwest", "jianghuai", "lower-yangtze", "southwest"],
  }),
  [polityKey("northern-southern", "西魏")]: template("northern-southern", "西魏", "high", "西魏以关陇方向为核心，使用西北大区表达。", {
    core: ["northwest"], controlled: ["heartland"], rival: ["steppe", "jianghuai", "lower-yangtze", "southwest"],
  }),
  [polityKey("northern-southern", "北齐")]: template("northern-southern", "北齐", "high", "北齐承接东魏，以中原东部为核心。", {
    core: ["heartland"], controlled: ["steppe"], rival: ["northwest", "jianghuai", "lower-yangtze", "southwest"],
  }),
  [polityKey("northern-southern", "北周")]: template("northern-southern", "北周", "high", "北周以关陇、西北为核心；灭北齐由宇文邕规则覆盖。", {
    core: ["northwest"], controlled: ["heartland"], rival: ["steppe", "jianghuai", "lower-yangtze", "southwest"],
  }),

  [polityKey("sui", "隋")]: template("sui", "隋", "high", "隋统一后的直接行政网络及东北、西北边疆关系示意。", {
    core: ["guanzhong", "heartland"], controlled: ["jianghuai", "lower-yangtze"], exchange: ["northeast", "northwest"],
  }),
  [polityKey("tang", "唐（含武周）")]: template("tang", "唐（含武周）", "high", "唐的直接行政、羁縻与交流范围分层示意。", {
    core: ["guanzhong", "heartland"], controlled: ["lower-yangtze", "lingnan", "northwest"], exchange: ["western-regions", "steppe", "plateau"],
  }),

  [polityKey("five-dynasties", "后梁")]: template("five-dynasties", "后梁", "high", "后梁以中原为核心，其他诸国作为并立背景。", {
    core: ["heartland"], rival: ["lower-yangtze", "southwest", "southeast", "lingnan", "northeast"],
  }),
  [polityKey("five-dynasties", "后唐")]: template("five-dynasties", "后唐", "high", "后唐以中原、河东为核心；取前蜀仅作阶段性扩张。", {
    core: ["heartland"], rival: ["lower-yangtze", "southwest", "southeast", "lingnan", "northeast"],
  }),
  [polityKey("five-dynasties", "后晋")]: template("five-dynasties", "后晋", "high", "后晋以中原为核心，燕云方向明确属于辽。", {
    core: ["heartland"], rival: ["northeast", "lower-yangtze", "southwest", "southeast", "lingnan"],
  }),
  [polityKey("five-dynasties", "后汉")]: template("five-dynasties", "后汉", "high", "后汉为中原短命政权。", {
    core: ["heartland"], rival: ["northeast", "lower-yangtze", "southwest", "southeast", "lingnan"],
  }),
  [polityKey("five-dynasties", "后周")]: template("five-dynasties", "后周", "high", "后周以中原为核心，柴荣时期出现重新统一趋势。", {
    core: ["heartland"], rival: ["northeast", "lower-yangtze", "southwest", "southeast", "lingnan"],
  }),
  [polityKey("five-dynasties", "吴")]: template("five-dynasties", "吴", "medium", "吴以江淮、江南方向为核心，使用江南大区表达。", {
    core: ["lower-yangtze"], rival: ["heartland", "southwest", "southeast", "lingnan", "northeast"],
  }),
  [polityKey("five-dynasties", "南唐")]: template("five-dynasties", "南唐", "high", "南唐以江南为核心，淮南得失由君主规则覆盖。", {
    core: ["lower-yangtze"], rival: ["heartland", "southwest", "southeast", "lingnan", "northeast"],
  }),
  [polityKey("five-dynasties", "吴越")]: template("five-dynasties", "吴越", "high", "吴越以两浙沿海为核心，归入东南大区。", {
    core: ["southeast"], rival: ["heartland", "lower-yangtze", "southwest", "lingnan", "northeast"],
  }),
  [polityKey("five-dynasties", "楚")]: template("five-dynasties", "楚", "medium", "楚以湖南和长江中游为核心，使用江南—西南交界示意。", {
    core: ["southwest"], controlled: ["lower-yangtze"], rival: ["heartland", "southeast", "lingnan", "northeast"],
  }),
  [polityKey("five-dynasties", "闽")]: template("five-dynasties", "闽", "high", "闽以福建为核心，归入东南大区。", {
    core: ["southeast"], rival: ["heartland", "lower-yangtze", "southwest", "lingnan", "northeast"],
  }),
  [polityKey("five-dynasties", "南汉")]: template("five-dynasties", "南汉", "high", "南汉以岭南为核心。", {
    core: ["lingnan"], rival: ["heartland", "lower-yangtze", "southwest", "southeast", "northeast"],
  }),
  [polityKey("five-dynasties", "前蜀")]: template("five-dynasties", "前蜀", "high", "前蜀以巴蜀为核心。", {
    core: ["southwest"], rival: ["heartland", "lower-yangtze", "southeast", "lingnan", "northeast"],
  }),
  [polityKey("five-dynasties", "后蜀")]: template("five-dynasties", "后蜀", "high", "后蜀以巴蜀为核心。", {
    core: ["southwest"], rival: ["heartland", "lower-yangtze", "southeast", "lingnan", "northeast"],
  }),
  [polityKey("five-dynasties", "荆南")]: template("five-dynasties", "荆南", "medium", "荆南为长江中游的小型政权，不覆盖整个江南。", {
    core: ["lower-yangtze"], uncertain: ["southwest"], rival: ["heartland", "southeast", "lingnan", "northeast"],
  }),
  [polityKey("five-dynasties", "北汉")]: template("five-dynasties", "北汉", "medium", "北汉以河东为核心，并受辽支持。", {
    core: ["heartland"], exchange: ["northeast"], rival: ["lower-yangtze", "southwest", "southeast", "lingnan"],
  }),

  [polityKey("liao", "辽")]: template("liao", "辽", "high", "辽的草原、东北核心与燕云农耕区分层示意。", {
    core: ["steppe", "northeast"], controlled: ["heartland", "northwest"], rival: ["guanzhong"],
  }),
  [polityKey("northern-song", "北宋")]: template("northern-song", "北宋", "high", "北宋直接治理区；辽、西夏方向保留为同期对峙背景。", {
    core: ["heartland"], controlled: ["jianghuai", "lower-yangtze", "lingnan"], rival: ["northeast", "northwest"],
  }),
  [polityKey("western-xia", "西夏")]: template("western-xia", "西夏", "high", "西夏河套、河西核心及周边交流区示意。", {
    core: ["northwest"], exchange: ["western-regions", "plateau", "steppe"], rival: ["guanzhong"],
  }),
  [polityKey("jin-dynasty", "金")]: template("jin-dynasty", "金", "high", "金的东北起源、中原统治区及宋金边界分层示意。", {
    core: ["northeast", "heartland"], controlled: ["guanzhong"], exchange: ["steppe"], rival: ["jianghuai"],
  }),
  [polityKey("southern-song", "南宋")]: template("southern-song", "南宋", "high", "南宋江南核心与沿江、四川、沿海防区示意。", {
    core: ["lower-yangtze"], controlled: ["jianghuai", "southwest", "southeast", "lingnan"], rival: ["heartland"],
  }),
  [polityKey("yuan", "元")]: template("yuan", "元", "high", "元朝直接治理、行省、宗教政治联系与欧亚交流分层示意。", {
    core: ["steppe", "heartland"], controlled: ["lower-yangtze", "plateau", "southwest", "northeast"], exchange: ["western-regions", "lingnan"],
  }),
  [polityKey("ming", "明")]: template("ming", "明", "high", "明朝直接行政、卫所和边疆交流分层示意。", {
    core: ["heartland", "lower-yangtze"], controlled: ["jianghuai", "southwest"], exchange: ["northwest", "southeast", "lingnan"], rival: ["northeast"],
  }),
  [polityKey("ming", "南明")]: template("ming", "南明", "medium", "南明各政权为移动、分立的残余政权，必须按君主分别聚焦。", {
    core: ["lower-yangtze"], uncertain: ["southwest", "southeast", "lingnan"], rival: ["heartland", "northeast", "northwest", "jianghuai"],
  }),
  [polityKey("qing", "后金／清")]: template("qing", "后金／清", "high", "后金至清的直接行政、盟旗、驻藏与边疆治理分层示意。", {
    core: ["northeast", "heartland"], controlled: ["lower-yangtze", "steppe", "western-regions", "plateau", "southwest", "northwest"], exchange: ["lingnan"],
  }),
};

const change = (
  trend: TerritoryTrend,
  confidence: TerritoryConfidence,
  changeSummary: string,
  groups?: RegionGroups,
): TerritoryStatePatch => ({
  trend,
  confidence,
  changeSummary,
  regions: groups ? groupedRegions(groups) : undefined,
});

const rulerRuleKey = (eraId: string, polity: string, name: string) =>
  getRulerTerritoryKey(eraId, polity, name);

/**
 * Sparse, event-based overrides.  A missing ruler is intentional: the resolver
 * carries forward the preceding same-polity state but reports that carry as an
 * uncertain schematic, never as proof that the border did not change.
 */
export const territoryChangeRules: Record<string, RulerTerritoryChangeRule> = {
  [rulerRuleKey("xia", "夏", "禹")]: {
    middle: change("formation", "low", "按传统叙事标出早期政治联盟的形成；考古材料不能支持精确疆界。"),
  },
  [rulerRuleKey("xia", "夏", "太康")]: {
    end: change("fragmentation", "low", "“太康失国”只表达联盟控制受挫，不据此绘制确定的领土丧失。", { uncertain: ["heartland", "guanzhong", "jianghuai"], rival: ["southwest"] }),
  },
  [rulerRuleKey("xia", "夏", "少康")]: {
    middle: change("recovery", "low", "“少康中兴”按传统文献表达为政治联盟恢复，仍使用低置信度活动区。", { uncertain: ["heartland", "guanzhong"], exchange: ["jianghuai"], rival: ["southwest"] }),
  },
  [rulerRuleKey("xia", "夏", "桀")]: {
    end: change("collapse", "low", "传统叙事中的夏末联盟瓦解；不把鸣条之战前后画成精确边界。", { uncertain: ["heartland"], rival: ["guanzhong", "jianghuai", "southwest"] }),
  },

  [rulerRuleKey("shang", "商", "汤")]: {
    middle: change("formation", "medium", "商政权取代夏后氏联盟，形成新的王畿—方国网络。"),
  },
  [rulerRuleKey("shang", "商", "盘庚")]: {
    middle: change("relocation", "medium", "迁殷改变王朝政治与祭祀中心，属于核心重组而非简单扩张。", { core: ["heartland"], exchange: ["jianghuai", "northeast", "northwest"], rival: ["southwest"] }),
  },
  [rulerRuleKey("shang", "商", "武丁")]: {
    middle: change("expansion", "medium", "甲骨文所见征伐与联盟活动增强；外围仍按方国影响而非直接领土处理。", { core: ["heartland"], controlled: ["jianghuai"], exchange: ["northeast", "northwest"], rival: ["southwest"] }),
  },
  [rulerRuleKey("shang", "商", "帝辛")]: {
    end: change("collapse", "medium", "商末东方战争与诸侯联盟反叛使王畿网络崩解。", { core: ["heartland"], uncertain: ["jianghuai", "northeast", "northwest"], rival: ["southwest"] }),
  },

  [rulerRuleKey("western-zhou", "西周", "周武王")]: {
    middle: change("formation", "medium", "克商后建立宗周中心，并开始重组东方政治网络。"),
  },
  [rulerRuleKey("western-zhou", "西周", "周成王")]: {
    middle: change("expansion", "medium", "周公东征和成周建设使东方分封网络得到巩固。"),
  },
  [rulerRuleKey("western-zhou", "西周", "周厉王")]: {
    end: change("fragmentation", "medium", "王室危机与共和行政反映中央权威受挫，分封区不等同于全部失去。", { core: ["guanzhong", "heartland"], uncertain: ["jianghuai", "northeast"], exchange: ["southwest"] }),
  },
  [rulerRuleKey("western-zhou", "西周", "周宣王")]: {
    middle: change("recovery", "medium", "宣王时期出现军事与王室权威的阶段性恢复。", { core: ["guanzhong", "heartland"], controlled: ["jianghuai"], exchange: ["northeast", "southwest"] }),
  },
  [rulerRuleKey("western-zhou", "西周", "周幽王")]: {
    end: change("collapse", "medium", "镐京失守使西周核心崩溃，随后政治中心东迁。", { uncertain: ["guanzhong"], rival: ["heartland", "jianghuai", "northeast", "southwest"] }),
  },

  [rulerRuleKey("eastern-zhou", "东周", "周平王")]: {
    accession: change("relocation", "medium", "东迁洛邑后只突出周王畿，不把诸侯国视为王室直辖。", { core: ["heartland"], rival: ["guanzhong", "jianghuai", "lower-yangtze", "southwest"], exchange: ["steppe"] }),
  },
  [rulerRuleKey("eastern-zhou", "东周", "周襄王")]: {
    end: change("contraction", "medium", "王室依赖诸侯干预，王畿控制进一步弱化。", { uncertain: ["heartland"], rival: ["guanzhong", "jianghuai", "lower-yangtze", "southwest"], exchange: ["steppe"] }),
  },
  [rulerRuleKey("eastern-zhou", "东周", "周敬王")]: {
    middle: change("recovery", "low", "王子朝之乱后王室在成周恢复有限秩序，仍只显示小型王畿。", { core: ["heartland"], rival: ["guanzhong", "jianghuai", "lower-yangtze", "southwest"], exchange: ["steppe"] }),
  },
  [rulerRuleKey("eastern-zhou", "东周", "周威烈王")]: {
    middle: change("fragmentation", "high", "承认韩、赵、魏为诸侯意味着列国格局制度化，不是周王室扩张。", { uncertain: ["heartland"], rival: ["guanzhong", "jianghuai", "lower-yangtze", "southwest"], exchange: ["steppe"] }),
  },
  [rulerRuleKey("eastern-zhou", "东周", "周赧王")]: {
    end: change("collapse", "high", "周王室仅余有限王畿，前256年政权终结。", { uncertain: ["heartland"], rival: ["guanzhong", "jianghuai", "lower-yangtze", "southwest", "steppe"] }),
  },

  [rulerRuleKey("qin", "秦", "秦始皇嬴政")]: {
    accession: change("formation", "high", "完成六国统一并建立皇帝、郡县体系。"),
    middle: change("expansion", "high", "南方和北方军事推进扩大到达范围；边疆使用控制或交流层，不等同于稳定内地治理。"),
  },
  [rulerRuleKey("qin", "秦", "秦二世胡亥")]: {
    middle: change("fragmentation", "high", "全国起义使名义疆域与中央实际控制迅速分离。", { core: ["guanzhong"], uncertain: ["heartland", "jianghuai", "southwest", "lingnan"], rival: ["steppe"] }),
    end: change("contraction", "high", "秦廷主要依靠关中及有限交通节点，六国故地已进入多方争夺。", { core: ["guanzhong"], rival: ["heartland", "jianghuai", "southwest", "lingnan", "steppe"] }),
  },
  [rulerRuleKey("qin", "秦", "秦王子婴")]: {
    accession: change("contraction", "high", "子婴时期仅以关中残余政权示意。", { core: ["guanzhong"], rival: ["heartland", "jianghuai", "southwest", "lingnan", "steppe"] }),
    end: change("collapse", "high", "秦政权投降，残余控制终结。", { uncertain: ["guanzhong"], rival: ["heartland", "jianghuai", "southwest", "lingnan", "steppe"] }),
  },

  [rulerRuleKey("western-han", "西汉", "汉高祖刘邦")]: {
    middle: change("formation", "high", "重新统一主要汉地，但封国与边疆控制仍具层次。", { core: ["guanzhong", "heartland"], controlled: ["jianghuai", "southwest"], exchange: ["northwest", "western-regions", "lingnan", "steppe"] }),
  },
  [rulerRuleKey("western-han", "西汉", "汉景帝刘启")]: {
    end: change("recovery", "high", "七国之乱平定后中央对封国的控制增强，属于内部治理重组。"),
  },
  [rulerRuleKey("western-han", "西汉", "汉武帝刘彻")]: {
    middle: change("expansion", "high", "河西、西域、岭南和西南方向显著扩展；西域仍以交通与都护影响分层表达。", { core: ["guanzhong", "heartland"], controlled: ["jianghuai", "southwest", "lingnan", "northwest"], exchange: ["western-regions", "steppe"] }),
  },
  [rulerRuleKey("western-han", "西汉", "汉宣帝刘询")]: {
    middle: change("recovery", "high", "西域经营和帝国内部秩序得到阶段性巩固。"),
  },
  [rulerRuleKey("western-han", "西汉", "汉元帝刘奭")]: {
    end: change("contraction", "medium", "外围经营趋于收缩；不把财政和宫廷问题直接画成内地丧失。", { core: ["guanzhong", "heartland"], controlled: ["jianghuai", "southwest", "lingnan"], exchange: ["northwest", "western-regions", "steppe"] }),
  },
  [rulerRuleKey("western-han", "西汉", "汉平帝刘衎")]: {
    end: change("fragmentation", "medium", "外戚控制造成政权中枢重组，名义行政范围仍大体存在。"),
  },

  [rulerRuleKey("xin", "新", "王莽")]: {
    accession: change("formation", "high", "新朝名义承接西汉行政网络。"),
    end: change("fragmentation", "high", "绿林、赤眉等起义使各地实际控制碎裂。", { core: ["guanzhong"], uncertain: ["heartland", "jianghuai"], rival: ["steppe"] }),
  },
  [rulerRuleKey("xin", "更始政权", "更始帝刘玄")]: {
    accession: change("formation", "medium", "绿林军拥立的联盟政权，以中原响应和军事节点示意。"),
    end: change("collapse", "high", "赤眉军攻入长安后更始政权终结。", { uncertain: ["guanzhong", "heartland"], rival: ["jianghuai", "steppe"] }),
  },
  [rulerRuleKey("xin", "赤眉政权", "刘盆子")]: {
    accession: change("formation", "low", "以赤眉军移动控制和关中据点示意，不视作稳定国家疆域。"),
    end: change("collapse", "high", "赤眉军向刘秀政权投降，所立政权终结。", { uncertain: ["guanzhong"], rival: ["heartland", "jianghuai", "steppe"] }),
  },

  [rulerRuleKey("eastern-han", "东汉", "光武帝刘秀")]: {
    accession: change("formation", "high", "初建政权时以河北、中原据点为基础。", { core: ["heartland"], uncertain: ["guanzhong", "jianghuai", "southwest", "northwest"], rival: ["steppe"] }),
    end: change("recovery", "high", "完成主要割据势力的统一，重建汉帝国。", { core: ["heartland", "guanzhong"], controlled: ["jianghuai", "southwest", "northwest"], exchange: ["steppe"] }),
  },
  [rulerRuleKey("eastern-han", "东汉", "明帝刘庄")]: {
    middle: change("expansion", "high", "重新经营西域交通并加强北方军事影响；地图只显示西北交流增强。"),
  },
  [rulerRuleKey("eastern-han", "东汉", "和帝刘肇")]: {
    middle: change("expansion", "high", "班超时期西域影响达到高点，仍作为交流和保护关系表达。"),
  },
  [rulerRuleKey("eastern-han", "东汉", "安帝刘祜")]: {
    end: change("contraction", "medium", "西北边疆经营反复，外围控制减弱。", { core: ["heartland", "guanzhong"], controlled: ["jianghuai", "southwest"], exchange: ["northwest", "steppe"] }),
  },
  [rulerRuleKey("eastern-han", "东汉", "灵帝刘宏")]: {
    end: change("fragmentation", "high", "黄巾起义和州牧军事化使实际控制开始碎裂。", { core: ["heartland"], uncertain: ["guanzhong", "jianghuai", "southwest", "northwest"], rival: ["steppe"] }),
  },
  [rulerRuleKey("eastern-han", "东汉", "献帝刘协")]: {
    accession: change("fragmentation", "high", "皇帝先后受军阀控制，名义天下与实际控制严重分离。", { uncertain: ["heartland", "guanzhong", "jianghuai", "southwest", "northwest"], rival: ["steppe"] }),
    end: change("collapse", "high", "曹丕代汉，东汉政权终结。", { uncertain: ["heartland"], rival: ["guanzhong", "jianghuai", "southwest", "northwest", "steppe"] }),
  },

  [rulerRuleKey("three-kingdoms", "曹魏", "曹丕")]: {
    accession: change("formation", "high", "曹魏承接汉末北方政权，以中原为核心。"),
  },
  [rulerRuleKey("three-kingdoms", "曹魏", "曹奂")]: {
    middle: change("expansion", "high", "263年灭蜀后西南转入魏的军事控制，但实际主导者为司马氏。", { core: ["heartland"], controlled: ["southwest"], rival: ["lower-yangtze", "lingnan"], exchange: ["steppe"] }),
    end: change("collapse", "high", "司马炎代魏，曹魏政权终结；西南控制由西晋继承。"),
  },
  [rulerRuleKey("three-kingdoms", "蜀汉", "刘备")]: {
    accession: change("formation", "high", "以益州和汉中方向建立蜀汉政权。"),
  },
  [rulerRuleKey("three-kingdoms", "蜀汉", "刘禅")]: {
    end: change("collapse", "high", "263年魏军入蜀，蜀汉政权终结。", { uncertain: ["southwest"], rival: ["heartland", "lower-yangtze", "lingnan", "steppe"] }),
  },
  [rulerRuleKey("three-kingdoms", "孙吴", "孙权")]: {
    accession: change("formation", "high", "孙吴正式建国，以江东和长江中下游为核心。"),
  },
  [rulerRuleKey("three-kingdoms", "孙吴", "孙皓")]: {
    end: change("collapse", "high", "280年西晋灭吴，孙吴控制终结。", { uncertain: ["lower-yangtze", "lingnan"], rival: ["heartland", "southwest", "steppe"] }),
  },

  [rulerRuleKey("jin", "西晋", "司马炎")]: {
    accession: change("formation", "high", "代魏建晋，初期尚与孙吴并立。", { core: ["heartland"], controlled: ["southwest"], rival: ["lower-yangtze", "jianghuai"], exchange: ["steppe"] }),
    end: change("expansion", "high", "280年灭吴后完成短暂统一。", { core: ["heartland"], controlled: ["jianghuai", "lower-yangtze", "southwest"], exchange: ["steppe"] }),
  },
  [rulerRuleKey("jin", "西晋", "司马衷")]: {
    end: change("fragmentation", "high", "八王之乱和地方战争使名义疆域与实际控制分离。", { core: ["heartland"], uncertain: ["jianghuai", "lower-yangtze", "southwest"], rival: ["steppe"] }),
  },
  [rulerRuleKey("jin", "西晋", "司马炽")]: {
    end: change("contraction", "high", "洛阳失守，西晋只余分散残余控制。", { uncertain: ["heartland", "jianghuai"], rival: ["lower-yangtze", "southwest", "steppe"] }),
  },
  [rulerRuleKey("jin", "西晋", "司马邺")]: {
    accession: change("contraction", "high", "以长安残余政权示意，不再显示完整西晋疆域。", { uncertain: ["heartland"], rival: ["jianghuai", "lower-yangtze", "southwest", "steppe"] }),
    end: change("collapse", "high", "长安失守，西晋终结。"),
  },
  [rulerRuleKey("jin", "东晋", "司马睿")]: {
    accession: change("formation", "high", "晋室南渡，以建康和江南为新核心。"),
  },
  [rulerRuleKey("jin", "东晋", "司马德宗")]: {
    end: change("expansion", "medium", "刘裕北伐一度进入中原、关中方向，仅标临时军事到达，不视作稳定东晋疆域。", { core: ["lower-yangtze"], controlled: ["jianghuai", "southwest"], uncertain: ["heartland"], rival: ["steppe"] }),
  },

  [rulerRuleKey("sixteen-kingdoms", "成汉", "李雄")]: {
    accession: change("formation", "medium", "成汉以成都平原为核心形成区域政权。"),
  },
  [rulerRuleKey("sixteen-kingdoms", "成汉", "李势")]: {
    end: change("collapse", "high", "东晋桓温入蜀，成汉政权终结。", { uncertain: ["southwest"], rival: ["heartland", "guanzhong", "northwest", "northeast", "steppe"] }),
  },
  [rulerRuleKey("sixteen-kingdoms", "汉赵", "刘渊")]: {
    accession: change("formation", "medium", "汉赵初起于并州方向，以中原北部活动区示意。", { core: ["heartland"], exchange: ["steppe"], rival: ["guanzhong", "northwest", "northeast", "southwest"] }),
  },
  [rulerRuleKey("sixteen-kingdoms", "汉赵", "刘聪")]: {
    middle: change("expansion", "high", "攻取洛阳、长安后影响扩展，但各地控制仍不均一。", { core: ["heartland", "guanzhong"], rival: ["northwest", "northeast", "southwest"], exchange: ["steppe"] }),
  },
  [rulerRuleKey("sixteen-kingdoms", "汉赵", "刘曜")]: {
    accession: change("relocation", "high", "前赵政治中心转入关中，并与后赵对峙。", { core: ["guanzhong"], rival: ["heartland", "northwest", "northeast", "southwest"], exchange: ["steppe"] }),
  },
  [rulerRuleKey("sixteen-kingdoms", "后赵", "石勒")]: {
    accession: change("formation", "high", "后赵以河北、中原北部为核心形成。"),
  },
  [rulerRuleKey("sixteen-kingdoms", "后赵", "石虎")]: {
    middle: change("expansion", "high", "后赵控制北方大部，但不把军事统治画成均质行政区。", { core: ["heartland"], controlled: ["northeast", "guanzhong"], exchange: ["steppe"], rival: ["northwest", "southwest"] }),
    end: change("fragmentation", "high", "石虎死后继承冲突迅速撕裂后赵控制。", { uncertain: ["heartland", "northeast", "guanzhong"], rival: ["northwest", "southwest", "steppe"] }),
  },
  [rulerRuleKey("sixteen-kingdoms", "前凉", "张轨")]: {
    accession: change("formation", "medium", "以凉州、河西治理网络为起点。"),
  },
  [rulerRuleKey("sixteen-kingdoms", "前凉", "张骏")]: {
    middle: change("expansion", "medium", "前凉在河西及西域通道影响增强，外围仍按交流关系表达。"),
  },
  [rulerRuleKey("sixteen-kingdoms", "前凉", "张天锡")]: {
    end: change("collapse", "high", "前秦攻灭前凉，河西控制转手。", { uncertain: ["northwest"], rival: ["guanzhong", "heartland", "northeast", "southwest", "steppe"] }),
  },
  [rulerRuleKey("sixteen-kingdoms", "前燕", "慕容皝")]: {
    accession: change("formation", "medium", "前燕以辽西、东北为核心形成。", { core: ["northeast"], rival: ["heartland", "guanzhong", "northwest", "southwest"], exchange: ["steppe"] }),
  },
  [rulerRuleKey("sixteen-kingdoms", "前燕", "慕容儁")]: {
    middle: change("expansion", "high", "前燕进入河北和中原北部，政治中心向邺城方向转移。", { core: ["northeast", "heartland"], rival: ["guanzhong", "northwest", "southwest"], exchange: ["steppe"] }),
  },
  [rulerRuleKey("sixteen-kingdoms", "前燕", "慕容暐")]: {
    end: change("collapse", "high", "前秦灭前燕。", { uncertain: ["northeast", "heartland"], rival: ["guanzhong", "northwest", "southwest", "steppe"] }),
  },
  [rulerRuleKey("sixteen-kingdoms", "前秦", "苻健")]: {
    accession: change("formation", "high", "前秦以关中为核心形成。", { core: ["guanzhong"], rival: ["heartland", "northwest", "northeast", "southwest"], exchange: ["steppe"] }),
  },
  [rulerRuleKey("sixteen-kingdoms", "前秦", "苻坚")]: {
    middle: change("expansion", "high", "灭前燕、前凉和代等政权后，一度统一北方。", { core: ["guanzhong"], controlled: ["heartland", "northwest", "northeast"], exchange: ["steppe"], rival: ["southwest"] }),
    end: change("fragmentation", "high", "淝水战败后后燕、后秦等相继建立，前秦控制迅速碎裂。", { core: ["guanzhong"], uncertain: ["heartland", "northwest", "northeast"], rival: ["southwest", "steppe"] }),
  },
  [rulerRuleKey("sixteen-kingdoms", "后燕", "慕容垂")]: {
    accession: change("formation", "high", "后燕恢复慕容氏在河北、东北方向的政权。"),
  },
  [rulerRuleKey("sixteen-kingdoms", "后燕", "慕容宝")]: {
    end: change("contraction", "high", "北魏进攻后后燕丧失河北大部，控制退向东北。", { core: ["northeast"], rival: ["heartland", "guanzhong", "northwest", "southwest", "steppe"] }),
  },
  [rulerRuleKey("sixteen-kingdoms", "后秦", "姚苌")]: {
    accession: change("formation", "high", "后秦以关中为核心形成。"),
  },
  [rulerRuleKey("sixteen-kingdoms", "后秦", "姚兴")]: {
    middle: change("expansion", "medium", "后秦在关中及周边影响扩大，河西和中原仍为多方竞争。", { core: ["guanzhong"], controlled: ["heartland"], uncertain: ["northwest"], rival: ["northeast", "southwest"], exchange: ["steppe"] }),
  },
  [rulerRuleKey("sixteen-kingdoms", "后秦", "姚泓")]: {
    end: change("collapse", "high", "刘裕北伐攻入长安，后秦灭亡。", { uncertain: ["guanzhong"], rival: ["heartland", "northwest", "northeast", "southwest", "steppe"] }),
  },
  [rulerRuleKey("sixteen-kingdoms", "西秦", "乞伏炽磐")]: {
    middle: change("expansion", "medium", "西秦在陇右、河西南缘达到较强阶段；边缘范围仍作不确定表达。"),
  },
  [rulerRuleKey("sixteen-kingdoms", "后凉", "吕光")]: {
    accession: change("formation", "medium", "后凉以姑臧和河西走廊为核心形成。"),
  },
  [rulerRuleKey("sixteen-kingdoms", "后凉", "吕隆")]: {
    end: change("collapse", "high", "后凉在河西诸国竞争中终结。", { uncertain: ["northwest"], rival: ["guanzhong", "heartland", "northeast", "southwest", "steppe"] }),
  },
  [rulerRuleKey("sixteen-kingdoms", "北凉", "沮渠蒙逊")]: {
    middle: change("expansion", "medium", "北凉控制河西主要节点并联系西域通道。"),
  },
  [rulerRuleKey("sixteen-kingdoms", "胡夏", "赫连勃勃")]: {
    middle: change("expansion", "medium", "胡夏由河套、陕北进入关中并短期占据长安；关中只作阶段性控制。", { core: ["northwest"], controlled: ["guanzhong"], rival: ["heartland", "northeast", "southwest"], exchange: ["steppe"] }),
  },
  [rulerRuleKey("sixteen-kingdoms", "北燕", "冯弘")]: {
    end: change("collapse", "high", "北魏压力下北燕终结。", { uncertain: ["northeast"], rival: ["heartland", "guanzhong", "northwest", "southwest", "steppe"] }),
  },

  [rulerRuleKey("northern-southern", "刘宋", "刘裕")]: {
    accession: change("formation", "high", "刘宋承接东晋江南政权，并短期保留部分北伐成果。", { core: ["lower-yangtze"], controlled: ["jianghuai", "southwest"], uncertain: ["heartland"], rival: ["northwest", "steppe"] }),
  },
  [rulerRuleKey("northern-southern", "刘宋", "刘义符")]: {
    end: change("contraction", "high", "北方若干州郡迅速丧失，稳定防区退回江淮方向。", { core: ["lower-yangtze"], controlled: ["jianghuai", "southwest"], rival: ["heartland", "northwest", "steppe"] }),
  },
  [rulerRuleKey("northern-southern", "刘宋", "刘彧")]: {
    end: change("contraction", "high", "内战后淮北、山东等地多归北魏，刘宋控制明显收缩。", { core: ["lower-yangtze"], uncertain: ["jianghuai"], controlled: ["southwest"], rival: ["heartland", "northwest", "steppe"] }),
  },
  [rulerRuleKey("northern-southern", "梁", "萧衍")]: {
    accession: change("formation", "high", "梁承接南齐，以江南和江淮为主要控制区。"),
    end: change("fragmentation", "high", "侯景之乱使建康失守，梁的实际控制严重碎裂。", { uncertain: ["lower-yangtze", "jianghuai", "southwest"], rival: ["heartland", "northwest", "steppe"] }),
  },
  [rulerRuleKey("northern-southern", "梁", "萧绎")]: {
    middle: change("recovery", "medium", "在江陵重建梁廷并恢复部分南方控制，但各地仍有并立势力。", { core: ["lower-yangtze"], uncertain: ["jianghuai", "southwest"], rival: ["heartland", "northwest", "steppe"] }),
  },
  [rulerRuleKey("northern-southern", "陈", "陈霸先")]: {
    accession: change("formation", "high", "陈初建时控制以建康及江南部分地区为核心。", { core: ["lower-yangtze"], uncertain: ["jianghuai", "southwest"], rival: ["heartland", "northwest", "steppe"] }),
  },
  [rulerRuleKey("northern-southern", "陈", "陈蒨")]: {
    middle: change("recovery", "high", "平定内部分裂后恢复南方主要区域控制。", { core: ["lower-yangtze"], controlled: ["jianghuai", "southwest"], rival: ["heartland", "northwest", "steppe"] }),
  },
  [rulerRuleKey("northern-southern", "陈", "陈叔宝")]: {
    end: change("collapse", "high", "隋军灭陈，南朝政权终结。", { uncertain: ["lower-yangtze", "jianghuai", "southwest"], rival: ["heartland", "northwest", "steppe"] }),
  },
  [rulerRuleKey("northern-southern", "北魏", "拓跋珪")]: {
    accession: change("formation", "high", "北魏从代北、草原南缘建立政权。", { core: ["steppe"], controlled: ["heartland"], rival: ["northwest", "jianghuai", "lower-yangtze", "southwest"] }),
  },
  [rulerRuleKey("northern-southern", "北魏", "拓跋焘")]: {
    middle: change("expansion", "high", "439年灭北凉后基本统一北方。", { core: ["heartland", "steppe"], controlled: ["northwest"], rival: ["jianghuai", "lower-yangtze", "southwest"] }),
  },
  [rulerRuleKey("northern-southern", "北魏", "元宏")]: {
    middle: change("relocation", "high", "迁都洛阳并推进制度重组；核心转向中原，不等同于疆域扩张。", { core: ["heartland"], controlled: ["steppe", "northwest"], rival: ["jianghuai", "lower-yangtze", "southwest"] }),
  },
  [rulerRuleKey("northern-southern", "北魏", "元诩")]: {
    end: change("fragmentation", "high", "六镇之乱及地方军政集团兴起使北魏实际控制碎裂。", { core: ["heartland"], uncertain: ["steppe", "northwest"], rival: ["jianghuai", "lower-yangtze", "southwest"] }),
  },
  [rulerRuleKey("northern-southern", "北魏", "元修")]: {
    end: change("collapse", "high", "北魏分裂为东魏、西魏，不能继续显示统一北方。", { uncertain: ["heartland", "northwest", "steppe"], rival: ["jianghuai", "lower-yangtze", "southwest"] }),
  },
  [rulerRuleKey("northern-southern", "北齐", "高纬")]: {
    end: change("contraction", "high", "北周进攻下北齐核心迅速收缩。", { core: ["heartland"], uncertain: ["steppe"], rival: ["northwest", "jianghuai", "lower-yangtze", "southwest"] }),
  },
  [rulerRuleKey("northern-southern", "北周", "宇文邕")]: {
    middle: change("expansion", "high", "灭北齐后统一北方，关陇核心扩展至中原东部。", { core: ["northwest", "heartland"], controlled: ["steppe"], rival: ["jianghuai", "lower-yangtze", "southwest"] }),
  },

  [rulerRuleKey("sui", "隋", "隋文帝杨坚")]: {
    accession: change("formation", "high", "代北周建隋，初期控制北方。", { core: ["guanzhong", "heartland"], controlled: ["northwest"], rival: ["jianghuai", "lower-yangtze", "northeast"] }),
    end: change("expansion", "high", "589年灭陈后重新统一主要汉地。", { core: ["guanzhong", "heartland"], controlled: ["jianghuai", "lower-yangtze"], exchange: ["northeast", "northwest"] }),
  },
  [rulerRuleKey("sui", "隋", "隋炀帝杨广")]: {
    middle: change("stable", "high", "运河与行政网络覆盖全国；对高句丽用兵不作为稳定领土扩张。"),
    end: change("fragmentation", "high", "全国起义和割据使隋廷实际控制分裂。", { uncertain: ["guanzhong", "heartland", "jianghuai", "lower-yangtze"], rival: ["northeast", "northwest"] }),
  },
  [rulerRuleKey("sui", "隋", "隋恭帝杨侑")]: {
    accession: change("contraction", "high", "长安傀儡政权，只突出关中残余。", { core: ["guanzhong"], rival: ["heartland", "jianghuai", "lower-yangtze", "northeast", "northwest"] }),
  },
  [rulerRuleKey("sui", "隋", "杨浩")]: {
    accession: change("contraction", "high", "宇文化及控制下的江都傀儡，仅用江淮节点示意。", { core: ["jianghuai"], rival: ["guanzhong", "heartland", "lower-yangtze", "northeast", "northwest"] }),
  },
  [rulerRuleKey("sui", "隋", "杨侗")]: {
    accession: change("contraction", "high", "洛阳残余政权，只突出中原节点。", { core: ["heartland"], rival: ["guanzhong", "jianghuai", "lower-yangtze", "northeast", "northwest"] }),
    end: change("collapse", "high", "王世充篡隋，隋室末期政权终结。"),
  },

  [rulerRuleKey("tang", "唐（含武周）", "唐高祖李渊")]: {
    accession: change("formation", "high", "唐初以关中为核心，与各地割据势力并立。", { core: ["guanzhong"], controlled: ["heartland"], uncertain: ["lower-yangtze", "lingnan", "northwest"], rival: ["western-regions", "steppe", "plateau"] }),
    end: change("recovery", "high", "至高祖末年主要统一战争基本完成。", { core: ["guanzhong", "heartland"], controlled: ["lower-yangtze", "lingnan", "northwest"], exchange: ["western-regions", "steppe", "plateau"] }),
  },
  [rulerRuleKey("tang", "唐（含武周）", "唐太宗李世民")]: {
    middle: change("expansion", "high", "击败东突厥并经营西域，外围按羁縻和交通影响表达。"),
  },
  [rulerRuleKey("tang", "唐（含武周）", "唐高宗李治")]: {
    middle: change("expansion", "high", "唐的军事与羁縻影响达到高点；西域、草原和高原不画成均质直辖地。", { core: ["guanzhong", "heartland"], controlled: ["lower-yangtze", "lingnan", "northwest"], exchange: ["western-regions", "steppe", "plateau"] }),
  },
  [rulerRuleKey("tang", "唐（含武周）", "武则天")]: {
    accession: change("relocation", "high", "国号改周、以洛阳为神都，属于政治中心重组；主要行政范围仍承接唐。", { core: ["heartland", "guanzhong"], controlled: ["lower-yangtze", "lingnan", "northwest"], exchange: ["western-regions", "steppe", "plateau"] }),
  },
  [rulerRuleKey("tang", "唐（含武周）", "唐玄宗李隆基")]: {
    middle: change("stable", "high", "开元时期内地行政网络稳定，边疆关系仍分直接控制与羁縻。"),
    end: change("fragmentation", "high", "安史之乱使河北、中原和关中实际控制严重分裂。", { uncertain: ["guanzhong", "heartland", "northwest", "western-regions", "steppe", "plateau"], controlled: ["lower-yangtze", "lingnan"] }),
  },
  [rulerRuleKey("tang", "唐（含武周）", "唐代宗李豫")]: {
    end: change("contraction", "high", "安史之乱后西北交通被切断、藩镇控制增强；内地名义版图未简单消失。", { core: ["guanzhong", "heartland"], controlled: ["lower-yangtze", "lingnan"], uncertain: ["northwest"], rival: ["western-regions", "plateau"], exchange: ["steppe"] }),
  },
  [rulerRuleKey("tang", "唐（含武周）", "唐宪宗李纯")]: {
    middle: change("recovery", "high", "元和削藩使中央对若干藩镇恢复控制，属于内部控制恢复。"),
  },
  [rulerRuleKey("tang", "唐（含武周）", "唐僖宗李儇")]: {
    end: change("fragmentation", "high", "黄巢起义和军镇割据使唐廷实际控制大幅碎裂。", { uncertain: ["guanzhong", "heartland", "lower-yangtze", "lingnan", "northwest"], rival: ["western-regions", "steppe", "plateau"] }),
  },
  [rulerRuleKey("tang", "唐（含武周）", "唐昭宗李晔")]: {
    end: change("contraction", "high", "皇帝受强藩控制，中央直接支配仅余有限节点。", { uncertain: ["guanzhong", "heartland"], rival: ["lower-yangtze", "lingnan", "northwest", "western-regions", "steppe", "plateau"] }),
  },
  [rulerRuleKey("tang", "唐（含武周）", "唐哀帝李柷")]: {
    end: change("collapse", "high", "朱温代唐，唐朝政权终结。"),
  },

  [rulerRuleKey("five-dynasties", "后梁", "朱温")]: {
    accession: change("formation", "high", "后梁以中原为核心建立，河东和南方诸国继续并立。"),
  },
  [rulerRuleKey("five-dynasties", "后梁", "朱友贞")]: {
    end: change("collapse", "high", "后唐灭后梁。", { uncertain: ["heartland"], rival: ["lower-yangtze", "southwest", "southeast", "lingnan", "northeast"] }),
  },
  [rulerRuleKey("five-dynasties", "后唐", "李存勖")]: {
    accession: change("formation", "high", "灭后梁后统一北方主要中原区域。"),
    end: change("expansion", "high", "灭前蜀后短期控制巴蜀；该控制未长期稳定。", { core: ["heartland"], controlled: ["southwest"], rival: ["lower-yangtze", "southeast", "lingnan", "northeast"] }),
  },
  [rulerRuleKey("five-dynasties", "后晋", "石敬瑭")]: {
    accession: change("formation", "high", "借辽援建后晋，并承认燕云十六州归辽；东北方向必须作为辽的竞争区。", { core: ["heartland"], rival: ["northeast", "lower-yangtze", "southwest", "southeast", "lingnan"] }),
  },
  [rulerRuleKey("five-dynasties", "后晋", "石重贵")]: {
    end: change("collapse", "high", "辽军南下灭后晋。", { uncertain: ["heartland"], rival: ["northeast", "lower-yangtze", "southwest", "southeast", "lingnan"] }),
  },
  [rulerRuleKey("five-dynasties", "后周", "郭威")]: {
    accession: change("formation", "high", "后周以中原为核心建立。"),
  },
  [rulerRuleKey("five-dynasties", "后周", "柴荣")]: {
    middle: change("expansion", "high", "向后蜀、南唐和辽边境推进，形成重新统一趋势；外围仅标阶段性控制。", { core: ["heartland"], uncertain: ["lower-yangtze", "southwest", "northeast"], rival: ["southeast", "lingnan"] }),
  },
  [rulerRuleKey("five-dynasties", "吴", "杨行密")]: {
    accession: change("formation", "medium", "吴政权以淮南和江东为基础，使用江南大区聚焦。"),
  },
  [rulerRuleKey("five-dynasties", "南唐", "李昪")]: {
    accession: change("formation", "high", "南唐承接吴政权，以江南为核心。"),
  },
  [rulerRuleKey("five-dynasties", "南唐", "李璟")]: {
    middle: change("expansion", "high", "一度兼并闽、楚部分地区，属于短期扩张。", { core: ["lower-yangtze"], controlled: ["southeast"], uncertain: ["southwest"], rival: ["heartland", "lingnan", "northeast"] }),
    end: change("contraction", "high", "败于后周后丧失江北淮南，退守江南。", { core: ["lower-yangtze"], rival: ["heartland", "southwest", "southeast", "lingnan", "northeast"] }),
  },
  [rulerRuleKey("five-dynasties", "南唐", "李煜")]: {
    end: change("collapse", "high", "宋灭南唐。", { uncertain: ["lower-yangtze"], rival: ["heartland", "southwest", "southeast", "lingnan", "northeast"] }),
  },
  [rulerRuleKey("five-dynasties", "前蜀", "王建")]: {
    accession: change("formation", "high", "前蜀以成都平原为核心建立。"),
  },
  [rulerRuleKey("five-dynasties", "前蜀", "王衍")]: {
    end: change("collapse", "high", "后唐灭前蜀。", { uncertain: ["southwest"], rival: ["heartland", "lower-yangtze", "southeast", "lingnan", "northeast"] }),
  },
  [rulerRuleKey("five-dynasties", "后蜀", "孟知祥")]: {
    accession: change("formation", "high", "后蜀重新以巴蜀为核心建立。"),
  },
  [rulerRuleKey("five-dynasties", "后蜀", "孟昶")]: {
    end: change("collapse", "high", "宋军灭后蜀。", { uncertain: ["southwest"], rival: ["heartland", "lower-yangtze", "southeast", "lingnan", "northeast"] }),
  },
  [rulerRuleKey("five-dynasties", "南汉", "刘鋹")]: {
    end: change("collapse", "high", "宋灭南汉。", { uncertain: ["lingnan"], rival: ["heartland", "lower-yangtze", "southwest", "southeast", "northeast"] }),
  },
  [rulerRuleKey("five-dynasties", "北汉", "刘继元")]: {
    end: change("collapse", "high", "宋灭北汉，五代十国主要割据格局结束。", { uncertain: ["heartland"], rival: ["northeast", "lower-yangtze", "southwest", "southeast", "lingnan"] }),
  },

  [rulerRuleKey("liao", "辽", "耶律阿保机")]: {
    accession: change("formation", "high", "契丹政权以草原和东北为核心形成。", { core: ["steppe", "northeast"], uncertain: ["heartland", "northwest"], rival: ["guanzhong"] }),
  },
  [rulerRuleKey("liao", "辽", "耶律德光")]: {
    middle: change("expansion", "high", "取得燕云十六州，南方农耕区纳入稳定统治；入中原仅属短期军事扩展。", { core: ["steppe", "northeast"], controlled: ["heartland", "northwest"], rival: ["guanzhong"] }),
  },
  [rulerRuleKey("liao", "辽", "耶律隆绪")]: {
    middle: change("stable", "high", "澶渊之盟后辽宋边界和南北治理结构进入长期稳定阶段。"),
  },
  [rulerRuleKey("liao", "辽", "耶律延禧")]: {
    middle: change("contraction", "high", "女真金兴起后辽失去东北和南部重要区域。", { core: ["steppe"], uncertain: ["northeast", "heartland", "northwest"], rival: ["guanzhong"] }),
    end: change("collapse", "high", "天祚帝被俘，辽朝主体政权终结。", { uncertain: ["steppe"], rival: ["northeast", "heartland", "northwest", "guanzhong"] }),
  },

  [rulerRuleKey("northern-song", "北宋", "宋太祖赵匡胤")]: {
    accession: change("formation", "high", "北宋初建，以中原为核心并开始“先南后北”的统一战争。", { core: ["heartland"], uncertain: ["jianghuai", "lower-yangtze", "lingnan"], rival: ["northeast", "northwest"] }),
    end: change("expansion", "high", "已统一南方大部分政权，但北汉和燕云仍在宋外。", { core: ["heartland"], controlled: ["jianghuai", "lower-yangtze", "lingnan"], rival: ["northeast", "northwest"] }),
  },
  [rulerRuleKey("northern-song", "北宋", "宋太宗赵光义")]: {
    middle: change("expansion", "high", "灭北汉后基本结束五代十国割据；北伐未能取得燕云。"),
  },
  [rulerRuleKey("northern-song", "北宋", "宋神宗赵顼")]: {
    middle: change("expansion", "high", "熙河开边增强西北控制，范围按边疆军政节点而非连续国界表达。", { core: ["heartland"], controlled: ["jianghuai", "lower-yangtze", "lingnan"], uncertain: ["northwest"], rival: ["northeast"] }),
  },
  [rulerRuleKey("northern-song", "北宋", "宋徽宗赵佶")]: {
    middle: change("expansion", "medium", "联金灭辽及河湟经营带来短期扩展，但北方战略环境迅速恶化。", { core: ["heartland"], controlled: ["jianghuai", "lower-yangtze", "lingnan"], uncertain: ["northwest", "northeast"] }),
    end: change("contraction", "high", "金军南下后北方控制崩解，徽宗退位时危机已覆盖中原。", { uncertain: ["heartland", "northwest", "northeast"], controlled: ["jianghuai", "lower-yangtze", "lingnan"] }),
  },
  [rulerRuleKey("northern-song", "北宋", "宋钦宗赵桓")]: {
    end: change("collapse", "high", "靖康之变后北宋灭亡。", { uncertain: ["heartland", "jianghuai"], rival: ["northeast", "northwest"], controlled: ["lower-yangtze", "lingnan"] }),
  },

  [rulerRuleKey("western-xia", "西夏", "李元昊")]: {
    accession: change("formation", "high", "以兴庆府、河套和河西东部为核心建立西夏。"),
  },
  [rulerRuleKey("western-xia", "西夏", "李乾顺")]: {
    middle: change("stable", "medium", "辽金转换期西夏维持河西核心并调整外部关系。"),
  },
  [rulerRuleKey("western-xia", "西夏", "李遵顼")]: {
    end: change("contraction", "high", "蒙古多轮进攻破坏边疆城镇和交通网络。", { core: ["northwest"], uncertain: ["western-regions", "plateau", "steppe"], rival: ["guanzhong"] }),
  },
  [rulerRuleKey("western-xia", "西夏", "李睍")]: {
    end: change("collapse", "high", "蒙古军攻陷中兴府，西夏灭亡。", { uncertain: ["northwest"], rival: ["western-regions", "plateau", "guanzhong", "steppe"] }),
  },

  [rulerRuleKey("jin-dynasty", "金", "完颜阿骨打")]: {
    accession: change("formation", "high", "金从东北女真联盟起兵，初期以东北为核心。", { core: ["northeast"], uncertain: ["heartland", "steppe"], rival: ["jianghuai", "guanzhong"] }),
    end: change("expansion", "high", "攻取辽的东北、北方重要区域，但尚未形成灭宋后的中原版图。", { core: ["northeast"], controlled: ["heartland"], exchange: ["steppe"], rival: ["jianghuai", "guanzhong"] }),
  },
  [rulerRuleKey("jin-dynasty", "金", "完颜晟")]: {
    middle: change("expansion", "high", "灭辽并攻灭北宋，占领华北和关中方向，南界进入宋金对峙。", { core: ["northeast", "heartland"], controlled: ["guanzhong"], exchange: ["steppe"], rival: ["jianghuai"] }),
  },
  [rulerRuleKey("jin-dynasty", "金", "完颜亮")]: {
    middle: change("relocation", "high", "迁都中都并加强中原中心；南征失败不形成稳定南方领土。"),
  },
  [rulerRuleKey("jin-dynasty", "金", "完颜雍")]: {
    middle: change("stable", "high", "世宗时期金的华北统治和宋金边界相对稳定。"),
  },
  [rulerRuleKey("jin-dynasty", "金", "完颜永济")]: {
    end: change("contraction", "high", "蒙古进攻使金失去北方大面积实际控制。", { core: ["heartland"], uncertain: ["northeast", "steppe", "guanzhong"], rival: ["jianghuai"] }),
  },
  [rulerRuleKey("jin-dynasty", "金", "完颜珣")]: {
    accession: change("relocation", "high", "迁都汴京后政权重心收缩至河南、陕西等地。", { core: ["heartland"], controlled: ["guanzhong"], rival: ["northeast", "steppe", "jianghuai"] }),
  },
  [rulerRuleKey("jin-dynasty", "金", "完颜守绪")]: {
    end: change("collapse", "high", "蒙古与南宋夹击下退守蔡州，金朝灭亡。", { uncertain: ["heartland"], rival: ["northeast", "steppe", "guanzhong", "jianghuai"] }),
  },
  [rulerRuleKey("jin-dynasty", "金", "完颜承麟")]: {
    accession: change("collapse", "high", "末帝仅在蔡州城破前短暂即位，只能显示末日据点，不能显示完整金朝。", { uncertain: ["heartland"], rival: ["northeast", "steppe", "guanzhong", "jianghuai"] }),
  },

  [rulerRuleKey("southern-song", "南宋", "宋高宗赵构")]: {
    accession: change("formation", "high", "南渡初期皇廷辗转，控制以江南和沿江节点为主。", { core: ["lower-yangtze"], uncertain: ["jianghuai", "southwest", "southeast", "lingnan"], rival: ["heartland"] }),
    end: change("recovery", "high", "绍兴和议后以江淮—长江防线维持较稳定南方政权。", { core: ["lower-yangtze"], controlled: ["jianghuai", "southwest", "southeast", "lingnan"], rival: ["heartland"] }),
  },
  [rulerRuleKey("southern-song", "南宋", "宋孝宗赵昚")]: {
    middle: change("stable", "high", "隆兴北伐未形成永久扩张，继续沿用江淮防线示意。"),
  },
  [rulerRuleKey("southern-song", "南宋", "宋理宗赵昀")]: {
    middle: change("fragmentation", "high", "金亡后蒙古成为主要对手，四川、长江上游进入持续战争。", { core: ["lower-yangtze"], controlled: ["jianghuai", "southeast", "lingnan"], uncertain: ["southwest"], rival: ["heartland"] }),
    end: change("contraction", "high", "蒙古持续南进，南宋西部和长江防区受到严重侵蚀。", { core: ["lower-yangtze"], uncertain: ["jianghuai", "southwest"], controlled: ["southeast", "lingnan"], rival: ["heartland"] }),
  },
  [rulerRuleKey("southern-song", "南宋", "宋度宗赵禥")]: {
    end: change("contraction", "high", "襄阳失守后长江防线被突破。", { core: ["lower-yangtze"], uncertain: ["jianghuai", "southwest"], controlled: ["southeast", "lingnan"], rival: ["heartland"] }),
  },
  [rulerRuleKey("southern-song", "南宋", "宋恭帝赵㬎")]: {
    end: change("contraction", "high", "临安投降后中央政权失去江南核心，残余势力向东南转移。", { uncertain: ["lower-yangtze"], controlled: ["southeast", "lingnan"], rival: ["heartland", "jianghuai", "southwest"] }),
  },
  [rulerRuleKey("southern-song", "南宋", "宋端宗赵昰")]: {
    accession: change("contraction", "high", "流亡政权沿东南海岸移动，只突出东南和岭南节点。", { core: ["southeast"], controlled: ["lingnan"], rival: ["heartland", "jianghuai", "lower-yangtze", "southwest"] }),
  },
  [rulerRuleKey("southern-song", "南宋", "宋末帝赵昺")]: {
    accession: change("contraction", "high", "海上流亡政权退至岭南沿海。", { core: ["lingnan"], uncertain: ["southeast"], rival: ["heartland", "jianghuai", "lower-yangtze", "southwest"] }),
    end: change("collapse", "high", "崖山海战后南宋政权终结。"),
  },

  [rulerRuleKey("yuan", "元", "忽必烈")]: {
    accession: change("formation", "high", "建元初期仍与南宋并立，以草原、华北为核心。", { core: ["steppe", "heartland"], controlled: ["plateau", "northeast"], exchange: ["western-regions", "southwest"], rival: ["lower-yangtze", "lingnan"] }),
    end: change("expansion", "high", "灭南宋后完成全国性统一，行省和驿站网络覆盖主要地区。", { core: ["steppe", "heartland"], controlled: ["lower-yangtze", "plateau", "southwest", "northeast"], exchange: ["western-regions", "lingnan"] }),
  },
  [rulerRuleKey("yuan", "元", "妥懽帖睦尔")]: {
    middle: change("fragmentation", "high", "红巾起义和地方军政集团兴起使内地实际控制分裂。", { core: ["heartland", "steppe"], uncertain: ["lower-yangtze", "southwest", "northeast", "lingnan"], controlled: ["plateau"], exchange: ["western-regions"] }),
    end: change("contraction", "high", "明军进入大都后元廷退回漠北；北元延续不等同于元在全国的统治。", { core: ["steppe"], uncertain: ["northeast", "western-regions", "plateau"], rival: ["heartland", "lower-yangtze", "southwest", "lingnan"] }),
  },

  [rulerRuleKey("ming", "明", "朱元璋")]: {
    accession: change("formation", "high", "明初以江南为核心建立，并开始北伐。", { core: ["lower-yangtze"], controlled: ["jianghuai"], uncertain: ["heartland", "southwest"], exchange: ["southeast", "lingnan"], rival: ["northwest", "northeast"] }),
    end: change("expansion", "high", "完成主要汉地统一并建立北方卫所和边疆网络。", { core: ["heartland", "lower-yangtze"], controlled: ["jianghuai", "southwest"], exchange: ["northwest", "southeast", "lingnan"], rival: ["northeast"] }),
  },
  [rulerRuleKey("ming", "明", "朱棣")]: {
    middle: change("relocation", "high", "迁都北京并强化北方军政中心；安南占领和漠北远征按临时到达处理。"),
  },
  [rulerRuleKey("ming", "明", "朱瞻基")]: {
    middle: change("contraction", "high", "撤出安南，结束短期直接占领；不影响明朝主要行政版图。"),
  },
  [rulerRuleKey("ming", "明", "朱由检")]: {
    middle: change("fragmentation", "high", "后金／清在东北扩张，内地起义使实际控制碎裂。", { core: ["heartland", "lower-yangtze"], uncertain: ["jianghuai", "southwest", "northwest"], rival: ["northeast"], exchange: ["southeast", "lingnan"] }),
    end: change("collapse", "high", "北京失守，明朝中央政权终结；南方残余另归南明政权。", { uncertain: ["heartland", "lower-yangtze", "jianghuai", "southwest"], rival: ["northeast", "northwest"], exchange: ["southeast", "lingnan"] }),
  },
  [rulerRuleKey("ming", "南明", "朱由崧")]: {
    accession: change("formation", "high", "弘光政权以南京、江南为核心。", { core: ["lower-yangtze"], uncertain: ["jianghuai"], rival: ["heartland", "northeast", "northwest", "southwest", "southeast", "lingnan"] }),
    end: change("collapse", "high", "清军攻占南京，弘光政权终结。"),
  },
  [rulerRuleKey("ming", "南明", "朱聿键")]: {
    accession: change("formation", "high", "隆武政权以福建等东南地区为活动中心。", { core: ["southeast"], uncertain: ["lower-yangtze", "lingnan"], rival: ["heartland", "northeast", "northwest", "jianghuai", "southwest"] }),
  },
  [rulerRuleKey("ming", "南明", "朱聿鐭")]: {
    accession: change("contraction", "high", "绍武政权仅在广州短暂存在，以岭南据点示意。", { core: ["lingnan"], rival: ["heartland", "northeast", "northwest", "jianghuai", "lower-yangtze", "southwest", "southeast"] }),
  },
  [rulerRuleKey("ming", "南明", "朱由榔")]: {
    accession: change("formation", "high", "永历政权在西南和岭南多地辗转，控制范围随战局变化。", { core: ["southwest", "lingnan"], uncertain: ["southeast"], rival: ["heartland", "northeast", "northwest", "jianghuai", "lower-yangtze"] }),
    end: change("collapse", "high", "永历政权退至西南边外并最终覆灭。", { uncertain: ["southwest"], rival: ["heartland", "northeast", "northwest", "jianghuai", "lower-yangtze", "southeast", "lingnan"] }),
  },

  [rulerRuleKey("qing", "后金／清", "努尔哈赤")]: {
    accession: change("formation", "high", "后金以建州女真和东北为核心形成。", { core: ["northeast"], exchange: ["steppe"], rival: ["heartland", "lower-yangtze", "western-regions", "plateau", "southwest", "northwest", "lingnan"] }),
  },
  [rulerRuleKey("qing", "后金／清", "皇太极")]: {
    middle: change("expansion", "high", "后金／清扩展辽东并加强对蒙古诸部关系，尚未统治关内全国。", { core: ["northeast"], controlled: ["steppe"], uncertain: ["heartland"], rival: ["lower-yangtze", "western-regions", "plateau", "southwest", "northwest", "lingnan"] }),
  },
  [rulerRuleKey("qing", "后金／清", "顺治帝福临")]: {
    accession: change("relocation", "high", "入关并迁都北京，初期北方为核心，南方仍有明及南明势力。", { core: ["northeast", "heartland"], controlled: ["steppe", "northwest"], uncertain: ["lower-yangtze", "southwest"], rival: ["western-regions", "plateau", "lingnan"] }),
    end: change("expansion", "high", "已控制主要内地，但西南和东南海上反清力量仍未完全终结。", { core: ["northeast", "heartland"], controlled: ["lower-yangtze", "steppe", "southwest", "northwest"], uncertain: ["lingnan"], exchange: ["western-regions", "plateau"] }),
  },
  [rulerRuleKey("qing", "后金／清", "康熙帝玄烨")]: {
    end: change("recovery", "high", "平定三藩、统一台湾并稳定北部边疆关系，完成清初主要整合。", { core: ["northeast", "heartland"], controlled: ["lower-yangtze", "steppe", "southwest", "northwest", "lingnan"], exchange: ["western-regions", "plateau"] }),
  },
  [rulerRuleKey("qing", "后金／清", "乾隆帝弘历")]: {
    middle: change("expansion", "high", "平定准噶尔、大小和卓后西北整合达到高点；新疆、蒙古、西藏按不同治理方式分层。", { core: ["northeast", "heartland"], controlled: ["lower-yangtze", "steppe", "western-regions", "plateau", "southwest", "northwest"], exchange: ["lingnan"] }),
  },
  [rulerRuleKey("qing", "后金／清", "咸丰帝奕詝")]: {
    middle: change("fragmentation", "high", "太平天国等战争使内地实际控制碎裂，不能简单画成对外割地。", { core: ["northeast", "heartland"], uncertain: ["lower-yangtze", "southwest", "lingnan"], controlled: ["steppe", "western-regions", "plateau", "northwest"] }),
    end: change("contraction", "high", "东北边界发生重大损失，同时内战仍在继续。", { core: ["heartland"], uncertain: ["northeast", "lower-yangtze", "southwest", "lingnan"], controlled: ["steppe", "western-regions", "plateau", "northwest"] }),
  },
  [rulerRuleKey("qing", "后金／清", "光绪帝载湉")]: {
    middle: change("contraction", "high", "甲午战后台湾被割让；条约口岸与势力范围不等同于全部沿海失去主权。", { core: ["northeast", "heartland"], controlled: ["lower-yangtze", "steppe", "western-regions", "plateau", "southwest", "northwest"], uncertain: ["lingnan"] }),
  },
  [rulerRuleKey("qing", "后金／清", "宣统帝溥仪")]: {
    accession: change("stable", "high", "即位时名义承接晚清版图和多层治理体系。"),
    end: change("collapse", "high", "1911年各省相继脱离清廷，1912年退位后帝国政权终结。", { uncertain: ["heartland", "northeast"], rival: ["lower-yangtze", "steppe", "western-regions", "plateau", "southwest", "lingnan", "northwest"] }),
  },
};

const momentOrder: RulerMapMoment[] = ["accession", "middle", "end"];

const mergeDirectives = (
  current: TerritoryPolityTemplate["regions"],
  patch?: TerritoryStatePatch["regions"],
): TerritoryPolityTemplate["regions"] => {
  if (!patch) return current;
  return { ...current, ...patch };
};

const buildValidRegions = (
  baseRegions: Partial<Record<CultureRegionKey, CultureRegion>>,
  directives: TerritoryPolityTemplate["regions"],
  polity: string,
): Partial<Record<CultureRegionKey, CultureRegion>> => {
  const result: Partial<Record<CultureRegionKey, CultureRegion>> = {};

  allRegionKeys.forEach((key) => {
    const base = baseRegions[key];
    if (!base) return;
    const regionDirective = directives[key];
    const status = regionDirective?.status ?? "uncertain";
    result[key] = {
      status,
      headline: regionDirective?.headline ?? base.headline,
      detail:
        regionDirective?.detail ??
        `${base.detail}${regionDirective ? ` 当前按${polity}君主视角标为“${territoryStatusCopy[status]}”。` : ` 当前未归入${polity}的明确控制层，作为时代背景保留。`}`,
    };
  });

  return result;
};

/**
 * Resolve a ruler state by walking only the selected polity's succession:
 * predecessor end -> current accession -> current middle -> current end.
 * No state is ever inherited across polity boundaries.
 */
export function resolveRulerTerritoryState(
  ruler: CatalogRulerProfile,
  eraRulers: CatalogRulerProfile[],
  baseRegions: Partial<Record<CultureRegionKey, CultureRegion>>,
  moment: RulerMapMoment,
): RulerTerritoryState {
  const selectedKey = getRulerTerritoryKey(ruler);
  const polityTemplate = territoryPolityTemplates[polityKey(ruler.eraId, ruler.polity)];
  const fallbackTemplate: TerritoryPolityTemplate = {
    eraId: ruler.eraId,
    polity: ruler.polity,
    confidence: "low",
    summary: `${ruler.polity}尚无专门政权模板，沿用时代底图作不确定示意。`,
    regions: Object.fromEntries(
      Object.keys(baseRegions).map((key) => [key, directive("uncertain")]),
    ) as TerritoryPolityTemplate["regions"],
  };
  const selectedTemplate = polityTemplate ?? fallbackTemplate;

  const samePolity = eraRulers
    .filter((candidate) => candidate.eraId === ruler.eraId && candidate.polity === ruler.polity)
    .sort((left, right) => left.order - right.order);
  const selectedIndex = samePolity.findIndex(
    (candidate) => getRulerTerritoryKey(candidate) === selectedKey,
  );
  const succession = selectedIndex >= 0 ? samePolity.slice(0, selectedIndex + 1) : [ruler];
  const predecessor = selectedIndex > 0 ? samePolity[selectedIndex - 1] : undefined;

  let resolvedDirectives = selectedTemplate.regions;
  let exactMomentPatch: TerritoryStatePatch | undefined;
  let lastRuleRulerName: string | undefined;

  succession.forEach((candidate) => {
    const isSelected = getRulerTerritoryKey(candidate) === selectedKey;
    const candidateRule = territoryChangeRules[getRulerTerritoryKey(candidate)];
    const lastMomentIndex = isSelected ? momentOrder.indexOf(moment) : momentOrder.length - 1;

    momentOrder.slice(0, lastMomentIndex + 1).forEach((candidateMoment) => {
      const statePatch = candidateRule?.[candidateMoment];
      if (!statePatch) return;
      resolvedDirectives = mergeDirectives(resolvedDirectives, statePatch.regions);
      lastRuleRulerName = candidate.name;
      if (isSelected && candidateMoment === moment) exactMomentPatch = statePatch;
    });
  });

  const hasExactMomentRule = Boolean(exactMomentPatch);
  const inheritedFrom = lastRuleRulerName;
  const inheritedSourceLabel = inheritedFrom === ruler.name
    ? `${ruler.name}较早阶段`
    : inheritedFrom
      ? `${inheritedFrom}末期`
      : undefined;
  const uncertainSummary = inheritedSourceLabel
    ? `未配置${ruler.name}${rulerMapMomentLabels[moment]}可安全表达为十二大区变化的节点；当前沿用${inheritedSourceLabel}的宏观示意，不表示疆域保持不变。`
    : `未配置${ruler.name}${rulerMapMomentLabels[moment]}可安全表达为十二大区变化的节点；当前沿用${ruler.polity}政权模板示意，不表示疆域保持不变。`;
  const inheritedStageLabel = moment === "accession"
    ? predecessor
      ? `材料有限 · 承袭${predecessor.name}末期示意`
      : `材料有限 · 沿用${ruler.polity}政权基线`
    : moment === "middle"
      ? `材料有限 · 沿用${ruler.name}即位时示意`
      : `材料有限 · 沿用${ruler.name}统治中期示意`;

  return {
    eraId: ruler.eraId,
    polity: ruler.polity,
    rulerKey: selectedKey,
    rulerName: ruler.name,
    moment,
    regions: buildValidRegions(baseRegions, resolvedDirectives, ruler.polity),
    sourceKind: hasExactMomentRule ? "ruler-change" : "uncertain",
    sourceLabel: hasExactMomentRule
      ? `本阶段有明确依据 · ${ruler.name}${rulerMapMomentLabels[moment]}`
      : inheritedStageLabel,
    sourceRulerName: hasExactMomentRule ? ruler.name : predecessor?.name ?? inheritedFrom,
    trend: exactMomentPatch?.trend ?? "uncertain",
    confidence: exactMomentPatch?.confidence ?? "low",
    changeSummary: exactMomentPatch?.changeSummary ?? uncertainSummary,
  };
}
