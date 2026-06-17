"use client";

import { useState } from "react";
import {
  getPresets,
  savePreset,
  deletePreset,
  type SavedPreset,
} from "@/lib/utils/localStorage";
import { usePlaygroundStore, type GeneratorName } from "@/lib/store/playgroundStore";

export function PresetsPanel() {
  const [presets, setPresets] = useState<SavedPreset[]>(getPresets);
  const [isOpen, setIsOpen] = useState(true);
  const [name, setName] = useState("");

  const activeGenerator = usePlaygroundStore((s) => s.activeGenerator);
  const configs = usePlaygroundStore((s) => s.configs);
  const hydrate = usePlaygroundStore((s) => s.hydrate);

  const refresh = () => setPresets(getPresets());

  const handleSave = () => {
    if (!name.trim()) return;
    const preset: SavedPreset = {
      id: crypto.randomUUID(),
      name: name.trim(),
      generator: activeGenerator,
      config: { ...configs[activeGenerator] },
      createdAt: Date.now(),
    };
    savePreset(preset);
    setName("");
    refresh();
  };

  const handleLoad = (preset: SavedPreset) => {
    hydrate({
      activeGenerator: preset.generator as GeneratorName,
      configs: { [preset.generator]: preset.config },
    });
  };

  const handleDelete = (id: string) => {
    deletePreset(id);
    refresh();
  };

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="flex items-center justify-between text-sm font-semibold text-zinc-500 uppercase tracking-wider"
      >
        <span>Presets</span>
        <span className="text-xs">{isOpen ? "−" : "+"}</span>
      </button>

      {isOpen && (
        <>
          <div className="flex gap-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Preset name..."
              className="flex-1 px-3 py-2 rounded-lg border border-zinc-200 bg-white text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
              }}
            />
            <button
              onClick={handleSave}
              className="px-3 py-2 rounded-lg bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors"
            >
              Save
            </button>
          </div>

          {presets.length === 0 ? (
            <p className="text-xs text-zinc-400">No saved presets yet.</p>
          ) : (
            <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto">
              {presets.map((preset) => (
                <div
                  key={preset.id}
                  className="flex items-center justify-between px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <button
                    onClick={() => handleLoad(preset)}
                    className="flex-1 text-left text-sm text-zinc-700 dark:text-zinc-300 truncate"
                    title={`${preset.name} (${preset.generator})`}
                  >
                    <span className="font-medium">{preset.name}</span>
                    <span className="text-xs text-zinc-400 ml-2">
                      {preset.generator}
                    </span>
                  </button>
                  <button
                    onClick={() => handleDelete(preset.id)}
                    className="text-xs text-zinc-400 hover:text-red-500 transition-colors px-2"
                    aria-label="Delete preset"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
