export const initialState = {
  activeView: "overview",
  literature: [],
  notes: [],
  activityLog: [],
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

export function workspaceReducer(state, action) {
  switch (action.type) {
    case "SET_ACTIVE_VIEW":
      return { ...state, activeView: action.payload };

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
