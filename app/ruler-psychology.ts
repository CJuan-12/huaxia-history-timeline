import { earlyPsychologyEntries } from "./ruler-psychology-early";
import { latePsychologyEntries } from "./ruler-psychology-late";
import type {
  MbtiCode,
  PsychologyArchetype,
  PsychologyAssessment,
  RawPsychologyEntry,
  RelationshipKey,
} from "./ruler-psychology-types";

type PsychologyContext = {
  key: string;
  name: string;
  polity: string;
  eraId: string;
  order: number;
};

type LegacyMbti = {
  code: string;
  label: string;
  summary: string;
  dimensions: Array<{
    letter: string;
    name: string;
    evidence: string;
  }>;
};

type ArchetypeCopy = {
  label: string;
  emotionalStyle: string;
  ministers: string;
  outerStates: string;
};

const relationshipLabels: Record<RelationshipKey, string> = {
  emotion: "个人情感",
  ministers: "对大臣",
  partners: "对伴侣／后妃",
  family: "对父母宗族",
  outerStates: "对藩属／外部政权",
};

const archetypeCopy: Record<PsychologyArchetype, ArchetypeCopy> = {
  founder: {
    label: "开创统合型",
    emotionalStyle: "公共行为通常呈现强烈目标感与主动承担风险的倾向",
    ministers: "常主动延揽和使用功臣，同时以封赏、名分与制度维持统御",
    outerStates: "多把结盟、征服与政治整合作为扩大安全边界的手段",
  },
  conqueror: {
    label: "军事行动型",
    emotionalStyle: "在战争与竞争情境中更易表现出直接、迅速和冒险的一面",
    ministers: "更重视将领的即时执行、战功与个人忠诚",
    outerStates: "倾向用军事压力、机动联盟与现实利益快速改变力量格局",
  },
  reformer: {
    label: "制度改革型",
    emotionalStyle: "常把不满和危机感转化为制度方案，而非只作情绪宣泄",
    ministers: "重视能执行新政的官员，也较难容忍拖延、保守或路线分歧",
    outerStates: "倾向用长期制度、财政和军政安排重新定义内外秩序",
  },
  consolidator: {
    label: "秩序守成型",
    emotionalStyle: "公开表现通常较克制，优先维持连续性与可预期秩序",
    ministers: "更依赖成熟官僚、成例与层级责任来推进治理",
    outerStates: "倾向在既有边界内以防御、互市、册封或有限战争维持均势",
  },
  mediator: {
    label: "关系协调型",
    emotionalStyle: "在公开决策中较重视安抚、名分与群体关系的可接受度",
    ministers: "倾向通过倾听、宽缓和关系整合维系官僚合作",
    outerStates: "更常使用和议、礼仪与互惠安排降低冲突成本",
  },
  scholar: {
    label: "内省文治型",
    emotionalStyle: "记录往往更突出思考、阅读、信仰或自我反省，而非持续外放情绪",
    ministers: "较重视文臣论辩、制度理念或道德名分，但执行力取决于现实权力结构",
    outerStates: "倾向先从名分、文化或长期格局理解外部关系",
  },
  aesthete: {
    label: "审美体验型",
    emotionalStyle: "个人兴趣、感受与审美表达在现存叙事中相对突出",
    ministers: "用人容易受到个人亲近、兴趣与即时感受影响，制度控制未必稳定",
    outerStates: "对外决策可能更随情境和个人体验变化，长期一致性相对不足",
  },
  "court-bound": {
    label: "宫廷受制型",
    emotionalStyle: "个人表达常被幼年、摄政、权臣或宫廷安全压力遮蔽",
    ministers: "名义上的君臣关系与实际决策权往往分离，难把政令直接视为本人意志",
    outerStates: "对外政策多由摄政者、权臣或既有军政体系决定",
  },
  "crisis-ruler": {
    label: "危局应对型",
    emotionalStyle: "现存行为多发生在战争、财政或继承危机中，警觉与防御反应较突出",
    ministers: "更依赖少数可信任执行者，也容易因压力而频繁更换路线或用人",
    outerStates: "对外以求存、结盟、退让或孤注一掷的反击为主要选择",
  },
  authoritarian: {
    label: "高压控制型",
    emotionalStyle: "公开行为常呈现强烈控制欲、猜疑或惩罚性反应",
    ministers: "强调服从与个人忠诚，常以严厉奖惩压缩异议空间",
    outerStates: "倾向用威慑、征伐和单向服从确立等级秩序",
  },
  "ritual-ruler": {
    label: "礼制象征型",
    emotionalStyle: "可见材料主要围绕礼仪、继承与名义权威，私人情绪难以辨认",
    ministers: "更多承担合法性和礼仪中心角色，实际行政可能由辅政集团完成",
    outerStates: "对外关系主要通过名号、册封、朝贡或象征性主权呈现",
  },
};

const mbtiLabels: Record<MbtiCode, string> = {
  ENTJ: "战略组织者",
  ENTP: "开拓辩证者",
  ENFJ: "关系动员者",
  ENFP: "愿景鼓舞者",
  ESTJ: "秩序执行者",
  ESTP: "现实行动者",
  ESFJ: "礼制协调者",
  ESFP: "体验表达者",
  INTJ: "长期规划者",
  INTP: "观念分析者",
  INFJ: "价值谋划者",
  INFP: "内在理想者",
  ISTJ: "制度守成者",
  ISTP: "冷静应变者",
  ISFJ: "责任维护者",
  ISFP: "感受自主者",
};

const allPsychologyEntries: Record<string, RawPsychologyEntry> = {
  ...earlyPsychologyEntries,
  ...latePsychologyEntries,
};

function sentence(value: string): string {
  return /[。！？]$/.test(value) ? value : `${value}。`;
}

function requireEntry(context: PsychologyContext): RawPsychologyEntry {
  const entry = allPsychologyEntries[context.key];
  if (!entry) {
    throw new Error(`Missing psychology assessment for ${context.key}`);
  }
  return entry;
}

function dimensionEvidence(code: MbtiCode, basis: string) {
  const descriptions = {
    E: ["外向动员", "记录更突出主动介入、公开动员或把意志投向外部局势"],
    I: ["内向审慎", "记录更突出内廷判断、个人兴趣、反思或在有限关系中作决定"],
    N: ["格局想象", "更重视名分、制度、长期方向或超出眼前事务的整体目标"],
    S: ["现实经验", "更依赖既有成例、直接经验、具体资源与眼前局势"],
    T: ["效能判断", "决策更强调结果、秩序、权力配置或一致规则"],
    F: ["关系价值", "决策更强调忠诚、亲疏、伦理名分或群体感受"],
    J: ["计划控制", "偏好明确名分、预设安排、稳定层级或可控制的执行路径"],
    P: ["弹性应变", "更常随局势调整联盟、路线与行动节奏"],
  } as const;

  return [...code].map((letter) => {
    const [name, description] = descriptions[letter as keyof typeof descriptions];
    return {
      letter,
      name,
      evidence: `${description}；本次主要依据：${basis}`,
    };
  });
}

function relationshipText(
  key: RelationshipKey,
  entry: RawPsychologyEntry,
  context: PsychologyContext,
): string {
  const specific = entry.relations?.[key];
  if (specific) return sentence(typeof specific === "string" ? specific : specific.text);

  const archetype = archetypeCopy[entry.archetype];
  if (key === "emotion") {
    return `${archetype.emotionalStyle}。但正史主要记录政治后果，${context.name}的日常情绪与私人表达仍缺少连续材料。`;
  }
  if (key === "ministers") {
    return `${archetype.ministers}。这是依据统治角色形成的行为候选，仍需与具体任免、纳谏和惩处记录逐条对照。`;
  }
  if (key === "partners") {
    return `现有索引未提供足以判断${context.name}亲密关系模式的连续记录；后妃、婚姻材料往往围绕继承和联盟书写，因此本维度不作具体情感臆测。`;
  }
  if (key === "family") {
    return `${context.name}处在${context.polity}的宗法与继承结构中，但名分安排不能直接等同于真实亲疏；缺少明确事件时，本维度只作为背景，不主导 MBTI 判定。`;
  }
  return `${archetype.outerStates}。不同年代未必存在同一种“藩属国”制度，这里统一观察其对外部政权、地方势力与边疆集团的处理方式。`;
}

export function buildPsychologyAssessment(
  context: PsychologyContext,
  legacyMbti?: LegacyMbti,
): PsychologyAssessment {
  const entry = requireEntry(context);
  const legacyCode = legacyMbti?.code as MbtiCode | undefined;
  const code = entry.code;
  const legacyMatches = Boolean(legacyCode && legacyCode in mbtiLabels && legacyCode === code);
  const archetype = archetypeCopy[entry.archetype];
  const structuralProxy = entry.confidence === "low"
    && (entry.archetype === "court-bound" || entry.archetype === "ritual-ruler");
  const confidenceLabel = entry.confidence === "medium"
    ? "中等置信"
    : structuralProxy
      ? "低置信·结构代理"
      : "低置信候选";
  const basis = sentence(entry.basis);
  const dimensions = legacyMatches && legacyMbti?.dimensions.length
    ? legacyMbti.dimensions
    : dimensionEvidence(code, entry.basis);

  const relationships = (Object.keys(relationshipLabels) as RelationshipKey[]).map((key) => {
    const relation = entry.relations?.[key];
    return {
      key,
      label: relationshipLabels[key],
      evidenceLevel: relation
        ? (typeof relation === "string" ? "limited" as const : relation.evidenceLevel)
        : "scarce" as const,
      text: relationshipText(key, entry, context),
    };
  });

  return {
    code,
    label: legacyMatches ? legacyMbti!.label : mbtiLabels[code],
    confidence: entry.confidence,
    confidenceLabel,
    structuralProxy,
    basis,
    summary: legacyMatches
      ? `${legacyMbti!.summary} 本轮又把情绪表达与君臣、伴侣、宗族及对外关系纳入复核。`
      : `${archetype.label}：${basis}综合决策方式与关系行为后，暂拟为 ${code}${structuralProxy ? "?；该代码主要是结构代理，不代表已识别出本人稳定人格" : `；${confidenceLabel}不等于历史定论`}。`,
    dimensions,
    relationships,
  };
}

export const psychologyEntryCount = Object.keys(allPsychologyEntries).length;
