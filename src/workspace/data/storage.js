export const STORAGE_KEYS = {
  WORKSPACE: "bruniverse-workspace",
  LITERATURE: "bruniverse-literature",
  NOTES: "bruniverse-notes",
  ACTIVITY: "bruniverse-activity",
};

export function createLiteratureItem({ title, authors, abstract, doi, year, tags, source }) {
  return {
    id: crypto.randomUUID(),
    title: title || "",
    authors: authors || [],
    abstract: abstract || "",
    doi: doi || "",
    year: year || null,
    tags: tags || [],
    source: source || "manual",
    relationships: [],
    graphPosition: {
      x: 200 + Math.random() * 400,
      y: 200 + Math.random() * 400,
    },
    createdAt: new Date().toISOString(),
  };
}

export function createNoteItem({ title, content }) {
  return {
    id: crypto.randomUUID(),
    title: title || "Untitled Note",
    content: content || "",
    linkedLiteratureIds: [],
    tags: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export function createResearchCaseItem({
  sdg,
  title,
  country,
  owner,
  focus,
  researchQuestion,
  status,
}) {
  const timestamp = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    sdg: sdg || "SDG",
    title: title || "Untitled SDG case",
    country: country || "Global",
    owner: owner || "Researcher",
    focus: focus || "",
    researchQuestion: researchQuestion || "",
    status: status || "drafting",
    progress: 20,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

export function createEvidenceItem({
  caseId,
  type,
  title,
  source,
  year,
  url,
  path,
  citation,
  reliability,
  summary,
}) {
  return {
    id: crypto.randomUUID(),
    caseId,
    type: type || "source",
    title: title || "Untitled evidence",
    source: source || "",
    year: year ? Number(year) : null,
    url: url || "",
    path: path || "",
    citation: citation || "",
    reliability: reliability || "needs review",
    summary: summary || "",
    linkedClaimIds: [],
    createdAt: new Date().toISOString(),
  };
}

export function createClaimItem({ caseId, type, text, evidenceIds }) {
  return {
    id: crypto.randomUUID(),
    caseId,
    type: type || "adverse",
    text: text || "",
    evidenceIds: evidenceIds || [],
    citationState: evidenceIds?.length ? "supported" : "needs evidence",
    updatedAt: new Date().toISOString(),
  };
}

export function createBriefItem({ caseId, title }) {
  const timestamp = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    caseId,
    title: title || "Untitled Research Brief",
    status: "draft",
    citationStatus: "needs review",
    sections: {
      problem: "",
      evidence: "",
      response: "",
    },
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

export function createActivityEntry({ type, description, relatedId }) {
  return {
    id: crypto.randomUUID(),
    type,
    description,
    relatedId: relatedId || null,
    timestamp: new Date().toISOString(),
  };
}

export function readStorage(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage full or unavailable — silently fail
  }
}

export function extractWorkspaceState(state) {
  return {
    version: 1,
    cases: state.cases || [],
    evidence: state.evidence || [],
    claims: state.claims || [],
    briefs: state.briefs || [],
    literature: state.literature || [],
    notes: state.notes || [],
    activityLog: state.activityLog || [],
    updatedAt: new Date().toISOString(),
  };
}
