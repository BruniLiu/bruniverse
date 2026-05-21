import React from "react";

const relations = {
  cites: { label: "Cites", color: "sky" },
  extends: { label: "Extends", color: "indigo" },
  related: { label: "Related", color: "teal" },
  contrasts: { label: "Contrasts", color: "amber" },
};

export default function RelationshipBadge({ type }) {
  const info = relations[type] || { label: type, color: "white" };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-bold ${
        info.color === "sky"
          ? "border-sky-200/20 bg-sky-200/[0.06] text-sky-100/80"
          : info.color === "indigo"
            ? "border-indigo-200/20 bg-indigo-200/[0.06] text-indigo-100/80"
            : info.color === "teal"
              ? "border-teal-200/20 bg-teal-200/[0.06] text-teal-100/80"
              : info.color === "amber"
                ? "border-amber-200/20 bg-amber-200/[0.06] text-amber-100/80"
                : "border-white/14 bg-white/[0.05] text-white/70"
      }`}
    >
      {info.label}
    </span>
  );
}
