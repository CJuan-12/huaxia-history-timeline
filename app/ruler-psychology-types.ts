export type MbtiCode =
  `${"E" | "I"}${"N" | "S"}${"T" | "F"}${"J" | "P"}`;

export type PsychologyConfidence = "medium" | "low";

export type PsychologyArchetype =
  | "founder"
  | "conqueror"
  | "reformer"
  | "consolidator"
  | "mediator"
  | "scholar"
  | "aesthete"
  | "court-bound"
  | "crisis-ruler"
  | "authoritarian"
  | "ritual-ruler";

export type RelationshipKey =
  | "emotion"
  | "ministers"
  | "partners"
  | "family"
  | "outerStates";

export type RelationEvidence = {
  text: string;
  evidenceLevel: "documented" | "limited";
};

export type RawPsychologyEntry = {
  code: MbtiCode;
  confidence: PsychologyConfidence;
  archetype: PsychologyArchetype;
  /** Concise, evidence-aware reason for choosing this archetype and code. */
  basis: string;
  /** Only add a relation when the historical record supports a specific claim. */
  relations?: Partial<Record<RelationshipKey, string | RelationEvidence>>;
};

export type RelationshipAssessment = {
  key: RelationshipKey;
  label: string;
  evidenceLevel: "documented" | "limited" | "scarce";
  text: string;
};

export type PsychologyAssessment = {
  code: MbtiCode;
  label: string;
  confidence: PsychologyConfidence;
  confidenceLabel: "中等置信" | "低置信候选" | "低置信·结构代理";
  structuralProxy: boolean;
  basis: string;
  summary: string;
  dimensions: Array<{
    letter: string;
    name: string;
    evidence: string;
  }>;
  relationships: RelationshipAssessment[];
};
