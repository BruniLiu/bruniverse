import React from "react";
import { cn } from "@/lib/utils";

const variants = {
  default: "bg-white text-black hover:bg-white/90",
  outline:
    "border border-white/12 bg-[#2f2f2f] text-white shadow-lg shadow-black/20 hover:bg-[#3a3a3a]",
  ghost: "text-white/78 hover:bg-white/8 hover:text-white",
};

const sizes = {
  default: "h-10 px-4 py-2",
  icon: "h-9 w-9",
};

export function Button({
  className,
  variant = "default",
  size = "default",
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-xl text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/35 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
