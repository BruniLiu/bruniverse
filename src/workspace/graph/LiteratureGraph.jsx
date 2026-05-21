import React, { useCallback, useEffect, useRef, useState } from "react";
import { Sparkles, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { useWorkspace } from "../context/WorkspaceContext";
import { streamDeepSeekReply } from "../../lib/deepseek";
import { createActivityEntry } from "../data/storage";
import ForceSimulation from "./ForceSimulation";
import { renderGraph, hitTest } from "./GraphRenderer";
import GraphDetailPanel from "./GraphDetailPanel";

export default function LiteratureGraph() {
  const { state, dispatch } = useWorkspace();
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const simRef = useRef(null);
  const rafRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragNode, setDragNode] = useState(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [size, setSize] = useState({ width: 800, height: 600 });

  const items = state.literature;
  const selectedId = state.graphSelectedNodeId;

  // Build graph data from literature items
  const graphNodes = items.map((item) => ({
    id: item.id,
    label: (item.title || "").slice(0, 40),
    title: item.title,
    x: item.graphPosition?.x ?? 200 + Math.random() * 400,
    y: item.graphPosition?.y ?? 200 + Math.random() * 400,
  }));

  const graphLinks = [];
  for (const item of items) {
    for (const rel of item.relationships || []) {
      const exists = graphLinks.some(
        (l) =>
          (l.source === item.id && l.target === rel.targetId) ||
          (l.source === rel.targetId && l.target === item.id),
      );
      if (!exists) {
        graphLinks.push({
          source: item.id,
          target: rel.targetId,
          type: rel.type,
          distance: 140,
        });
      }
    }
  }

  // Init / resize
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Run simulation
  useEffect(() => {
    if (graphNodes.length === 0) {
      simRef.current = null;
      return;
    }

    const sim = new ForceSimulation(graphNodes, graphLinks, size);
    simRef.current = sim;

    function loop() {
      if (sim.tick()) {
        rafRef.current = requestAnimationFrame(loop);
      }
      draw();
    }

    function draw() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      const dpr = window.devicePixelRatio || 1;
      canvas.width = size.width * dpr;
      canvas.height = size.height * dpr;
      canvas.style.width = `${size.width}px`;
      canvas.style.height = `${size.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      renderGraph(ctx, sim.nodes, graphLinks, {
        selectedId,
        scale,
        offsetX: offset.x,
        offsetY: offset.y,
        width: size.width,
        height: size.height,
      });
    }

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [graphNodes, graphLinks, size, selectedId, scale, offset]);

  // Handle canvas interactions
  const getCanvasPos = useCallback(
    (e) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return { x: 0, y: 0 };
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    },
    [],
  );

  function handleMouseDown(e) {
    const pos = getCanvasPos(e);
    const sim = simRef.current;
    if (!sim) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
      return;
    }

    // Check node hit
    for (const node of sim.nodes) {
      if (
        hitTest(node, pos.x, pos.y, scale, offset.x, offset.y, size.width, size.height)
      ) {
        setDragNode(node);
        dispatch({ type: "SET_GRAPH_SELECTED_NODE", payload: node.id });
        return;
      }
    }

    // Pan
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  }

  function handleMouseMove(e) {
    if (dragNode && simRef.current) {
      const pos = getCanvasPos(e);
      dragNode.x = (pos.x - offset.x - size.width / 2) / scale + size.width / 2;
      dragNode.y = (pos.y - offset.y - size.height / 2) / scale + size.height / 2;
      simRef.current.reheat();
    } else if (isDragging) {
      setOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  }

  function handleMouseUp() {
    setIsDragging(false);
    if (dragNode) {
      // Persist position
      const item = state.literature.find((l) => l.id === dragNode.id);
      if (item) {
        dispatch({
          type: "UPDATE_LITERATURE",
          payload: {
            id: dragNode.id,
            updates: { graphPosition: { x: dragNode.x, y: dragNode.y } },
          },
        });
      }
      setDragNode(null);
    }
  }

  function handleWheel(e) {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.92 : 1.08;
    setScale((s) => Math.min(3, Math.max(0.15, s * delta)));
  }

  function handleReset() {
    setScale(1);
    setOffset({ x: 0, y: 0 });
    dispatch({ type: "SET_GRAPH_SELECTED_NODE", payload: null });
  }

  // AI analysis
  async function handleAiAnalyze() {
    if (items.length < 2) return;
    setIsAnalyzing(true);

    try {
      const paperList = items
        .map(
          (p) =>
            `ID:${p.id} Title:"${p.title}" Abstract:${(p.abstract || "").slice(0, 300)}`,
        )
        .join("\n---\n");

      const messages = [
        {
          role: "system",
          content:
            'Analyze semantic relationships between these research papers. Respond ONLY with a valid JSON array. Format: [{ "sourceId": string, "targetId": string, "type": "cites"|"extends"|"related"|"contrasts", "reason": string }]',
        },
        { role: "user", content: `Analyze these papers:\n\n${paperList}` },
      ];

      let result = "";
      await streamDeepSeekReply(messages, {
        signal: new AbortController().signal,
        onToken: (token) => {
          result += token;
        },
      });

      const cleaned = result.replace(/```json|```/g, "").trim();
      const relationships = JSON.parse(cleaned);

      for (const rel of relationships) {
        const sourceItem = items.find((l) => l.id === rel.sourceId);
        if (!sourceItem) continue;
        const existing = (sourceItem.relationships || []).some(
          (r) => r.targetId === rel.targetId && r.type === rel.type,
        );
        if (existing) continue;

        dispatch({
          type: "UPDATE_LITERATURE",
          payload: {
            id: rel.sourceId,
            updates: {
              relationships: [
                ...(sourceItem.relationships || []),
                { targetId: rel.targetId, type: rel.type },
              ],
            },
          },
        });
      }

      dispatch({
        type: "ADD_ACTIVITY",
        payload: createActivityEntry({
          type: "relationship_detected",
          description: `AI detected ${relationships.length} relationships across ${items.length} papers`,
        }),
      });
    } catch {
      // AI analysis failed silently
    } finally {
      setIsAnalyzing(false);
    }
  }

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden">
      {items.length === 0 ? (
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <p className="text-sm font-medium text-white/46">
              No papers to visualize yet.
            </p>
            <p className="mt-1 text-xs text-white/30">
              Add some papers first, then return here.
            </p>
            <button
              type="button"
              onClick={() => {
                dispatch({ type: "SET_ACTIVE_VIEW", payload: "literature" });
                dispatch({ type: "OPEN_MODAL", payload: { modal: "addLiterature" } });
              }}
              className="mt-4 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-indigo-400"
            >
              Add Papers
            </button>
          </div>
        </div>
      ) : (
        <>
          <canvas
            ref={canvasRef}
            className="absolute inset-0 cursor-grab"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
          />

          <GraphDetailPanel />

          {/* Controls */}
          <div className="absolute bottom-4 left-4 z-10 flex gap-1.5">
            <div className="flex gap-1 rounded-lg border border-white/12 bg-[#0a0a1c]/86 p-1 backdrop-blur-md">
              <button
                type="button"
                onClick={() => setScale((s) => Math.min(3, s * 1.2))}
                className="grid h-8 w-8 place-items-center rounded-md text-white/56 transition hover:bg-white/[0.08] hover:text-white"
                title="Zoom in"
              >
                <ZoomIn size={16} />
              </button>
              <button
                type="button"
                onClick={() => setScale((s) => Math.max(0.15, s * 0.83))}
                className="grid h-8 w-8 place-items-center rounded-md text-white/56 transition hover:bg-white/[0.08] hover:text-white"
                title="Zoom out"
              >
                <ZoomOut size={16} />
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="grid h-8 w-8 place-items-center rounded-md text-white/56 transition hover:bg-white/[0.08] hover:text-white"
                title="Reset view"
              >
                <RotateCcw size={15} />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAiAnalyze}
              disabled={isAnalyzing || items.length < 2}
              className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-200/18 bg-indigo-200/[0.08] px-3 py-1.5 text-xs font-bold text-indigo-100/80 backdrop-blur-md transition hover:bg-indigo-200/[0.12] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Sparkles size={14} />
              {isAnalyzing ? "Analyzing..." : "AI Analyze"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
