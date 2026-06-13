import { createSampleWorkspace } from "../data/sampleWorkspace";

const sampleWorkspace = createSampleWorkspace();

export const initialState = {
  activeView: "overview",
  syncStatus: "loading",
  syncMessage: "Opening workspace service...",
  cases: sampleWorkspace.cases,
  evidence: sampleWorkspace.evidence,
  claims: sampleWorkspace.claims,
  briefs: sampleWorkspace.briefs,
  literature: sampleWorkspace.literature,
  notes: sampleWorkspace.notes,
  activityLog: sampleWorkspace.activityLog,
  selectedCaseId: sampleWorkspace.cases[0]?.id || null,
  selectedBriefId: sampleWorkspace.briefs[0]?.id || null,
  selectedLiteratureId: null,
  selectedNoteId: null,
  graphSelectedNodeId: null,
  modals: {
    addLiterature: false,
    aiExtraction: false,
    noteLinkPicker: false,
    noteLinkPickerNoteId: null,
  },
};

function normaliseWorkspace(workspace = {}) {
  return {
    cases: Array.isArray(workspace.cases) ? workspace.cases : [],
    evidence: Array.isArray(workspace.evidence) ? workspace.evidence : [],
    claims: Array.isArray(workspace.claims) ? workspace.claims : [],
    briefs: Array.isArray(workspace.briefs) ? workspace.briefs : [],
    literature: Array.isArray(workspace.literature) ? workspace.literature : [],
    notes: Array.isArray(workspace.notes) ? workspace.notes : [],
    activityLog: Array.isArray(workspace.activityLog) ? workspace.activityLog : [],
  };
}

export function workspaceReducer(state, action) {
  switch (action.type) {
    case "SET_ACTIVE_VIEW":
      return { ...state, activeView: action.payload };

    case "SET_SYNC_STATUS":
      return {
        ...state,
        syncStatus: action.payload.status,
        syncMessage: action.payload.message || "",
      };

    case "SET_WORKSPACE": {
      const workspace = normaliseWorkspace(action.payload);
      const selectedCaseStillExists = workspace.cases.some(
        (item) => item.id === state.selectedCaseId,
      );
      const selectedBriefStillExists = workspace.briefs.some(
        (item) => item.id === state.selectedBriefId,
      );

      return {
        ...state,
        ...workspace,
        selectedCaseId: selectedCaseStillExists
          ? state.selectedCaseId
          : workspace.cases[0]?.id || null,
        selectedBriefId: selectedBriefStillExists
          ? state.selectedBriefId
          : workspace.briefs[0]?.id || null,
        syncStatus: action.payload?.syncStatus || "synced",
        syncMessage: action.payload?.syncMessage || "",
      };
    }

    case "ADD_CASE":
      return {
        ...state,
        cases: [action.payload, ...state.cases],
        selectedCaseId: action.payload.id,
      };
    case "UPDATE_CASE":
      return {
        ...state,
        cases: state.cases.map((item) =>
          item.id === action.payload.id
            ? { ...item, ...action.payload.updates, updatedAt: new Date().toISOString() }
            : item,
        ),
      };
    case "DELETE_CASE":
      return {
        ...state,
        cases: state.cases.filter((item) => item.id !== action.payload),
        evidence: state.evidence.filter((item) => item.caseId !== action.payload),
        claims: state.claims.filter((item) => item.caseId !== action.payload),
        briefs: state.briefs.filter((item) => item.caseId !== action.payload),
        selectedCaseId:
          state.selectedCaseId === action.payload
            ? state.cases.find((item) => item.id !== action.payload)?.id || null
            : state.selectedCaseId,
      };
    case "SELECT_CASE":
      return { ...state, selectedCaseId: action.payload };

    case "ADD_EVIDENCE":
      return { ...state, evidence: [action.payload, ...state.evidence] };
    case "UPDATE_EVIDENCE":
      return {
        ...state,
        evidence: state.evidence.map((item) =>
          item.id === action.payload.id ? { ...item, ...action.payload.updates } : item,
        ),
      };
    case "DELETE_EVIDENCE":
      return {
        ...state,
        evidence: state.evidence.filter((item) => item.id !== action.payload),
        claims: state.claims.map((claim) => ({
          ...claim,
          evidenceIds: claim.evidenceIds.filter((id) => id !== action.payload),
        })),
      };

    case "ADD_CLAIM":
      return { ...state, claims: [action.payload, ...state.claims] };
    case "UPDATE_CLAIM":
      return {
        ...state,
        claims: state.claims.map((item) =>
          item.id === action.payload.id
            ? { ...item, ...action.payload.updates, updatedAt: new Date().toISOString() }
            : item,
        ),
      };
    case "DELETE_CLAIM":
      return {
        ...state,
        claims: state.claims.filter((item) => item.id !== action.payload),
        evidence: state.evidence.map((item) => ({
          ...item,
          linkedClaimIds: item.linkedClaimIds.filter((id) => id !== action.payload),
        })),
      };

    case "ADD_BRIEF":
      return {
        ...state,
        briefs: [action.payload, ...state.briefs],
        selectedBriefId: action.payload.id,
      };
    case "UPDATE_BRIEF":
      return {
        ...state,
        briefs: state.briefs.map((item) =>
          item.id === action.payload.id
            ? { ...item, ...action.payload.updates, updatedAt: new Date().toISOString() }
            : item,
        ),
      };
    case "SELECT_BRIEF":
      return { ...state, selectedBriefId: action.payload };

    case "SET_LITERATURE":
      return { ...state, literature: action.payload };
    case "ADD_LITERATURE":
      return { ...state, literature: [action.payload, ...state.literature] };
    case "UPDATE_LITERATURE":
      return {
        ...state,
        literature: state.literature.map((item) =>
          item.id === action.payload.id
            ? { ...item, ...action.payload.updates }
            : item,
        ),
      };
    case "DELETE_LITERATURE":
      return {
        ...state,
        literature: state.literature.filter(
          (item) => item.id !== action.payload,
        ),
        selectedLiteratureId:
          state.selectedLiteratureId === action.payload
            ? null
            : state.selectedLiteratureId,
        notes: state.notes.map((note) => ({
          ...note,
          linkedLiteratureIds: note.linkedLiteratureIds.filter(
            (id) => id !== action.payload,
          ),
        })),
      };
    case "SELECT_LITERATURE":
      return { ...state, selectedLiteratureId: action.payload };

    case "SET_NOTES":
      return { ...state, notes: action.payload };
    case "ADD_NOTE":
      return { ...state, notes: [action.payload, ...state.notes] };
    case "UPDATE_NOTE":
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id
            ? { ...note, ...action.payload.updates, updatedAt: new Date().toISOString() }
            : note,
        ),
      };
    case "DELETE_NOTE":
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
        selectedNoteId:
          state.selectedNoteId === action.payload
            ? null
            : state.selectedNoteId,
      };
    case "SELECT_NOTE":
      return { ...state, selectedNoteId: action.payload };

    case "SET_ACTIVITY_LOG":
      return { ...state, activityLog: action.payload };
    case "ADD_ACTIVITY":
      return {
        ...state,
        activityLog: [action.payload, ...state.activityLog].slice(0, 50),
      };

    case "SET_GRAPH_SELECTED_NODE":
      return { ...state, graphSelectedNodeId: action.payload };

    case "OPEN_MODAL":
      return {
        ...state,
        modals: { ...state.modals, [action.payload.modal]: true, ...action.payload.meta },
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        modals: { ...state.modals, [action.payload]: false },
      };

    default:
      return state;
  }
}
