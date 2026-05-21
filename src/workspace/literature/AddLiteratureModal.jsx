import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link, Loader, Plus, Search, X } from "lucide-react";
import { useWorkspace } from "../context/WorkspaceContext";
import { createLiteratureItem, createActivityEntry } from "../data/storage";
import { streamDeepSeekReply } from "../../lib/deepseek";

const motionEase = [0.23, 1, 0.32, 1];

export default function AddLiteratureModal() {
  const shouldReduceMotion = useReducedMotion();
  const { state, dispatch } = useWorkspace();
  const isOpen = state.modals.addLiterature;

  const [mode, setMode] = useState("manual");
  const [input, setInput] = useState("");
  const [manual, setManual] = useState({
    title: "",
    authors: "",
    abstract: "",
    year: "",
    doi: "",
    tags: "",
  });
  const [isExtracting, setIsExtracting] = useState(false);
  const [extracted, setExtracted] = useState(null);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  function close() {
    dispatch({ type: "CLOSE_MODAL", payload: "addLiterature" });
    setInput("");
    setManual({ title: "", authors: "", abstract: "", year: "", doi: "", tags: "" });
    setExtracted(null);
    setError("");
  }

  async function handleExtract() {
    if (!input.trim()) return;
    setIsExtracting(true);
    setError("");

    try {
      const messages = [
        {
          role: "system",
          content:
            'You are a research literature metadata extraction assistant. Extract structured metadata from the provided paper information. Respond with ONLY valid JSON, no markdown, no code fences, no extra text. JSON format: { "title": string, "authors": string[], "abstract": string, "year": number | null, "doi": string | null, "keywords": string[] }',
        },
        {
          role: "user",
          content: `Extract metadata from this research paper information:\n\n${input}`,
        },
      ];

      let result = "";
      await streamDeepSeekReply(messages, {
        signal: new AbortController().signal,
        onToken: (token) => {
          result += token;
        },
      });

      const cleaned = result.replace(/```json|```/g, "").trim();
      const metadata = JSON.parse(cleaned);
      setExtracted(metadata);
    } catch (err) {
      setError(err instanceof Error ? err.message : "AI extraction failed. Please try manual entry.");
    } finally {
      setIsExtracting(false);
    }
  }

  function handleSave(data) {
    const item = createLiteratureItem({
      title: data.title,
      authors: data.authors,
      abstract: data.abstract,
      doi: data.doi || null,
      year: data.year || null,
      tags: data.keywords || data.tags || [],
      source: extracted ? "ai" : "manual",
    });

    dispatch({ type: "ADD_LITERATURE", payload: item });
    dispatch({
      type: "ADD_ACTIVITY",
      payload: createActivityEntry({
        type: "added_literature",
        description: `Added "${item.title.slice(0, 80)}"`,
        relatedId: item.id,
      }),
    });
    close();
  }

  function handleManualSubmit(e) {
    e.preventDefault();
    const data = {
      title: manual.title,
      authors: manual.authors.split(",").map((s) => s.trim()).filter(Boolean),
      abstract: manual.abstract,
      year: manual.year ? Number(manual.year) : null,
      doi: manual.doi,
      keywords: manual.tags.split(",").map((s) => s.trim()).filter(Boolean),
    };
    handleSave(data);
  }

  const dataToShow = extracted || {
    title: manual.title,
    authors: manual.authors.split(",").map((s) => s.trim()).filter(Boolean),
    abstract: manual.abstract,
    year: manual.year ? Number(manual.year) : null,
    doi: manual.doi,
    keywords: manual.tags.split(",").map((s) => s.trim()).filter(Boolean),
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={close}
    >
      <motion.div
        className="w-full max-w-lg rounded-xl border border-indigo-200/16 bg-[#0a0a1c]/94 p-6 shadow-[0_28px_100px_rgba(0,0,0,0.5)] backdrop-blur-xl"
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.24, ease: motionEase }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Add Paper</h2>
          <button
            type="button"
            onClick={close}
            className="rounded-md p-1 text-white/42 transition hover:bg-white/[0.06] hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mb-4 flex gap-1 rounded-lg border border-white/10 bg-white/[0.03] p-1">
          {[
            { id: "manual", label: "Manual", icon: Plus },
            { id: "extract", label: "DOI / Link", icon: Link },
            { id: "search", label: "Topic Search", icon: Search },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setMode(id)}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-2 text-xs font-bold transition ${
                mode === id
                  ? "bg-indigo-200/[0.12] text-indigo-100"
                  : "text-white/46 hover:text-white/72"
              }`}
            >
              <Icon size={13} />
              {label}
            </button>
          ))}
        </div>

        {mode === "extract" && (
          <div className="grid gap-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste a DOI, arXiv link, or paper citation text..."
              rows={3}
              className="rounded-lg border border-white/12 bg-white/[0.05] px-4 py-3 text-sm font-medium text-white outline-none transition placeholder:text-white/32 focus:border-indigo-200/40"
            />
            <button
              type="button"
              onClick={handleExtract}
              disabled={isExtracting || !input.trim()}
              className="rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-bold text-white shadow-[0_14px_38px_rgba(99,102,241,0.22)] transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isExtracting ? (
                <span className="inline-flex items-center gap-2">
                  <Loader size={15} className="animate-spin" />
                  Extracting with AI...
                </span>
              ) : (
                "Extract with AI"
              )}
            </button>
            {error && (
              <p className="text-xs font-medium text-red-300/80">{error}</p>
            )}
          </div>
        )}

        {mode === "search" && (
          <div className="grid gap-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe a research topic, e.g. 'climate change education in developing countries'..."
              rows={3}
              className="rounded-lg border border-white/12 bg-white/[0.05] px-4 py-3 text-sm font-medium text-white outline-none transition placeholder:text-white/32 focus:border-indigo-200/40"
            />
            <button
              type="button"
              onClick={handleExtract}
              disabled={isExtracting || !input.trim()}
              className="rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-bold text-white shadow-[0_14px_38px_rgba(99,102,241,0.22)] transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isExtracting ? (
                <span className="inline-flex items-center gap-2">
                  <Loader size={15} className="animate-spin" />
                  Searching AI...
                </span>
              ) : (
                "Search with AI"
              )}
            </button>
          </div>
        )}

        {mode === "manual" && (
          <form onSubmit={handleManualSubmit} className="grid gap-3">
            <input
              type="text"
              value={manual.title}
              onChange={(e) => setManual({ ...manual, title: e.target.value })}
              placeholder="Paper title *"
              required
              className="rounded-lg border border-white/12 bg-white/[0.05] px-4 py-2.5 text-sm font-medium text-white outline-none transition placeholder:text-white/32 focus:border-indigo-200/40"
            />
            <input
              type="text"
              value={manual.authors}
              onChange={(e) => setManual({ ...manual, authors: e.target.value })}
              placeholder="Authors (comma separated)"
              className="rounded-lg border border-white/12 bg-white/[0.05] px-4 py-2.5 text-sm font-medium text-white outline-none transition placeholder:text-white/32 focus:border-indigo-200/40"
            />
            <textarea
              value={manual.abstract}
              onChange={(e) => setManual({ ...manual, abstract: e.target.value })}
              placeholder="Abstract"
              rows={3}
              className="rounded-lg border border-white/12 bg-white/[0.05] px-4 py-3 text-sm font-medium text-white outline-none transition placeholder:text-white/32 focus:border-indigo-200/40"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value={manual.year}
                onChange={(e) => setManual({ ...manual, year: e.target.value })}
                placeholder="Year"
                className="rounded-lg border border-white/12 bg-white/[0.05] px-4 py-2.5 text-sm font-medium text-white outline-none transition placeholder:text-white/32 focus:border-indigo-200/40"
              />
              <input
                type="text"
                value={manual.doi}
                onChange={(e) => setManual({ ...manual, doi: e.target.value })}
                placeholder="DOI"
                className="rounded-lg border border-white/12 bg-white/[0.05] px-4 py-2.5 text-sm font-medium text-white outline-none transition placeholder:text-white/32 focus:border-indigo-200/40"
              />
            </div>
            <input
              type="text"
              value={manual.tags}
              onChange={(e) => setManual({ ...manual, tags: e.target.value })}
              placeholder="Tags (comma separated)"
              className="rounded-lg border border-white/12 bg-white/[0.05] px-4 py-2.5 text-sm font-medium text-white outline-none transition placeholder:text-white/32 focus:border-indigo-200/40"
            />
            <button
              type="submit"
              className="rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-black shadow-[0_14px_38px_rgba(255,255,255,0.12)] transition hover:bg-indigo-100"
            >
              Add Paper
            </button>
          </form>
        )}

        {(extracted || (mode === "extract" && extracted)) && (
          <div className="mt-4 rounded-lg border border-indigo-200/14 bg-indigo-200/[0.05] p-4">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-indigo-100/60">
              AI Extracted
            </p>
            <p className="mt-2 text-sm font-bold text-white">
              {extracted?.title || "Untitled"}
            </p>
            {extracted?.authors?.length > 0 && (
              <p className="mt-1 text-xs text-white/52">
                {extracted.authors.join(", ")}
              </p>
            )}
            {extracted?.abstract && (
              <p className="mt-2 text-xs leading-5 text-white/48 line-clamp-3">
                {extracted.abstract}
              </p>
            )}
            <button
              type="button"
              onClick={() => handleSave(extracted)}
              className="mt-3 rounded-lg bg-white px-4 py-2 text-xs font-bold text-black transition hover:bg-indigo-100"
            >
              Confirm & Save
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
