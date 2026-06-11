"use client";

import { usePlaygroundStore, GeneratorName } from "@/lib/store/playgroundStore";

const generatorNames: GeneratorName[] = [
  "Blob",
  "Wave",
  "Blurry Gradient",
  "Blob Scene",
  "Layered Waves",
  "Stacked Waves",
  "Low Poly Grid",
  "Layered Peaks",
];

export function GeneratorSelector() {
  const activeGenerator = usePlaygroundStore((s) => s.activeGenerator);
  const setActiveGenerator = usePlaygroundStore((s) => s.setActiveGenerator);

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">
        Generator
      </h2>
      <div className="flex flex-col gap-1">
        {generatorNames.map((name) => (
          <button
            key={name}
            onClick={() => setActiveGenerator(name)}
            className={`px-3 py-2 rounded-lg text-left text-sm font-medium transition-colors ${
              activeGenerator === name
                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
            }`}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}
