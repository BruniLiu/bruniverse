import React, { createContext, useContext, useEffect, useReducer, useRef } from "react";
import { getSessionToken } from "../../lib/auth";
import { workspaceReducer, initialState } from "./workspaceReducer";
import {
  STORAGE_KEYS,
  extractWorkspaceState,
  readStorage,
  writeStorage,
} from "../data/storage";
import { createSampleWorkspace } from "../data/sampleWorkspace";

const WorkspaceContext = createContext(null);

async function fetchWorkspace() {
  const response = await fetch("/api/workspace", {
    headers: {
      "x-bruniverse-session": getSessionToken(),
    },
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.error || "Unable to load workspace.");
  }

  return data.workspace;
}

async function saveWorkspace(workspace) {
  const response = await fetch("/api/workspace", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-bruniverse-session": getSessionToken(),
    },
    body: JSON.stringify({ workspace }),
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.error || "Unable to save workspace.");
  }

  return data.workspace;
}

function readLocalWorkspace() {
  const savedWorkspace = readStorage(STORAGE_KEYS.WORKSPACE);
  if (savedWorkspace) return savedWorkspace;

  const sample = createSampleWorkspace();
  const legacyLiterature = readStorage(STORAGE_KEYS.LITERATURE);
  const legacyNotes = readStorage(STORAGE_KEYS.NOTES);
  const legacyActivity = readStorage(STORAGE_KEYS.ACTIVITY);

  return {
    ...sample,
    literature: legacyLiterature || sample.literature,
    notes: legacyNotes || sample.notes,
    activityLog: legacyActivity || sample.activityLog,
  };
}

export function WorkspaceProvider({ children }) {
  const [state, dispatch] = useReducer(workspaceReducer, initialState);
  const hasLoadedRef = useRef(false);
  const saveTimerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    async function loadWorkspace() {
      dispatch({
        type: "SET_SYNC_STATUS",
        payload: { status: "loading", message: "Opening workspace service..." },
      });

      try {
        const workspace = await fetchWorkspace();
        if (cancelled) return;

        dispatch({
          type: "SET_WORKSPACE",
          payload: {
            ...workspace,
            syncStatus: "synced",
            syncMessage: "Workspace saved to Bruniverse API.",
          },
        });
      } catch (error) {
        if (cancelled) return;

        dispatch({
          type: "SET_WORKSPACE",
          payload: {
            ...readLocalWorkspace(),
            syncStatus: "local",
            syncMessage:
              error instanceof Error
                ? `${error.message} Local demo mode is active.`
                : "Local demo mode is active.",
          },
        });
      } finally {
        hasLoadedRef.current = true;
      }
    }

    loadWorkspace();
    return () => {
      cancelled = true;
      if (saveTimerRef.current) window.clearTimeout(saveTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!hasLoadedRef.current) return;

    const workspace = extractWorkspaceState(state);
    writeStorage(STORAGE_KEYS.WORKSPACE, workspace);
    writeStorage(STORAGE_KEYS.LITERATURE, state.literature);
    writeStorage(STORAGE_KEYS.NOTES, state.notes);
    writeStorage(STORAGE_KEYS.ACTIVITY, state.activityLog);

    if (saveTimerRef.current) window.clearTimeout(saveTimerRef.current);

    saveTimerRef.current = window.setTimeout(async () => {
      try {
        dispatch({
          type: "SET_SYNC_STATUS",
          payload: { status: "saving", message: "Saving workspace..." },
        });
        await saveWorkspace(workspace);
        dispatch({
          type: "SET_SYNC_STATUS",
          payload: { status: "synced", message: "Workspace saved to Bruniverse API." },
        });
      } catch {
        dispatch({
          type: "SET_SYNC_STATUS",
          payload: {
            status: "local",
            message: "API save unavailable. Changes are preserved in this browser.",
          },
        });
      }
    }, 600);
  }, [
    state.cases,
    state.evidence,
    state.claims,
    state.briefs,
    state.literature,
    state.notes,
    state.activityLog,
  ]);

  return (
    <WorkspaceContext.Provider value={{ state, dispatch }}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) throw new Error("useWorkspace must be used within WorkspaceProvider");
  return ctx;
}
