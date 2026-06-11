"use client";

import { usePlaygroundStore } from "@/lib/store/playgroundStore";

export function LivePreview() {
  const result = usePlaygroundStore((s) => s.result);

  if (!result) {
    return (
      <div className="flex items-center justify-center h-full text-zinc-400">
        No preview available
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full h-full">
      <div className="relative w-full max-w-3xl bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <div
          className="w-full aspect-[4/3]"
          dangerouslySetInnerHTML={{ __html: result.svg }}
        />
      </div>
      <div className="flex gap-4 text-xs text-zinc-500">
        <span>{result.metadata.width} x {result.metadata.height}</span>
        <span>{result.metadata.elements} elements</span>
      </div>
    </div>
  );
}
