import React, { createContext, useContext, useEffect, useReducer } from "react";
import { workspaceReducer, initialState } from "./workspaceReducer";
import { STORAGE_KEYS, readStorage, writeStorage } from "../data/storage";

const WorkspaceContext = createContext(null);

export function WorkspaceProvider({ children }) {
  const [state, dispatch] = useReducer(workspaceReducer, initialState);

  useEffect(() => {
    const lit = readStorage(STORAGE_KEYS.LITERATURE);
    const notes = readStorage(STORAGE_KEYS.NOTES);
    const activity = readStorage(STORAGE_KEYS.ACTIVITY);
    if (lit) dispatch({ type: "SET_LITERATURE", payload: lit });
    if (notes) dispatch({ type: "SET_NOTES", payload: notes });
    if (activity) dispatch({ type: "SET_ACTIVITY_LOG", payload: activity });
  }, []);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.LITERATURE, state.literature);
  }, [state.literature]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.NOTES, state.notes);
  }, [state.notes]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.ACTIVITY, state.activityLog);
  }, [state.activityLog]);

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
