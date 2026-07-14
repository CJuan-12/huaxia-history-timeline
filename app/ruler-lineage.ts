import { rulerParentageData } from "./ruler-lineage-data";

export type RulerLineage = {
  mother: string;
  father: string;
  predecessor: string;
  relation: "前任亲生子" | "兄弟承袭" | "非直系入继" | "本政权首位" | "关系待考";
  summary: string;
  evidence: "documented" | "partial" | "scarce";
  sourceUrl?: string;
};

type LineageContext = {
  key: string;
  name: string;
  polity: string;
  predecessorKey?: string;
  predecessorName?: string;
};

const missingMother = "母亲身份未见可核对记录";
const missingFather = "父亲身份未见可核对记录";

export function buildRulerLineage(context: LineageContext): RulerLineage {
  const record = rulerParentageData[context.key];
  const predecessor = context.predecessorName ?? "无同一政权前任";
  const predecessorRecord = context.predecessorKey ? rulerParentageData[context.predecessorKey] : undefined;
  const mother = record?.mother ?? missingMother;
  const father = record?.father ?? missingFather;
  const sourceUrl = record?.qid ? `https://www.wikidata.org/wiki/${record.qid}` : undefined;
  const parentCount = Number(Boolean(record?.father)) + Number(Boolean(record?.mother));

  if (!context.predecessorKey) {
    return {
      mother,
      father,
      predecessor,
      relation: "本政权首位",
      summary: `${context.name}是本站所列${context.polity}政权的首位君主，不属于同一政权内由前任父子相承。父亲：${father}；母亲：${mother}。`,
      evidence: parentCount === 2 ? "documented" : parentCount === 1 ? "partial" : "scarce",
      sourceUrl,
    };
  }

  if (record?.fatherQid && predecessorRecord?.qid && record.fatherQid === predecessorRecord.qid) {
    return {
      mother,
      father,
      predecessor,
      relation: "前任亲生子",
      summary: `${context.name}是前任君主${predecessor}的亲生子。父亲：${father}；母亲：${mother}。`,
      evidence: record.mother ? "documented" : "partial",
      sourceUrl,
    };
  }

  if (record?.fatherQid && predecessorRecord?.fatherQid && record.fatherQid === predecessorRecord.fatherQid) {
    return {
      mother,
      father,
      predecessor,
      relation: "兄弟承袭",
      summary: `${context.name}并非前任君主${predecessor}之子；两人同父，属于兄弟或同父宗亲之间的承袭。父亲：${father}；母亲：${mother}。`,
      evidence: record.mother ? "documented" : "partial",
      sourceUrl,
    };
  }

  if (record?.father || record?.mother) {
    return {
      mother,
      father,
      predecessor,
      relation: "非直系入继",
      summary: `${context.name}并非已确认的前任君主${predecessor}亲生子。其身世来源为：父亲${father}，母亲${mother}；皇位来自旁支入继、兄终弟及、养亲、拥立、夺位或改朝换代中的一种，具体过程需结合该政权继承史。`,
      evidence: parentCount === 2 ? "documented" : "partial",
      sourceUrl,
    };
  }

  return {
    mother,
    father,
    predecessor,
    relation: "关系待考",
    summary: `${context.name}与前任君主${predecessor}的父子关系尚无可核对的父母条目，不能据君主次序推定为前任与妻妃所生。母系与具体入继来源均暂列待考。`,
    evidence: "scarce",
    sourceUrl,
  };
}
