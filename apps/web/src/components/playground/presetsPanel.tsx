"use client";

import { useState } from "react";
import {
  getPresets,
  savePreset,
  deletePreset,
  type SavedPreset,
} from "@/lib/utils/localStorage";
import { usePlaygroundStore, type GeneratorName } from "@/lib/store/playgroundStore";
import { HugeiconsIcon } from "@hugeicons/react";
import { SaveIcon, Delete01Icon, FolderLibraryIcon } from "@hugeicons/core-free-icons";

const wobblyRadius = "255px 15px 225px 15px / 15px 225px 15px 255px";
const wobblyRadiusMd = "15px 225px 15px 255px / 255px 15px 225px 15px";

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
        className="flex items-center justify-between text-lg font-bold font-heading text-pencil hover:text-accent transition-colors"
        style={{ transform: "rotate(-0.5deg)" }}
      >
        <span className="flex items-center gap-2">
          <HugeiconsIcon icon={FolderLibraryIcon} size={18} strokeWidth={2.5} />
          Presets
        </span>
        <span className="text-sm font-body">{isOpen ? "−" : "+"}</span>
      </button>
      <div className="w-full h-0.5 bg-pencil border-dashed border-t-2 border-pencil opacity-20" />

      {isOpen && (
        <>
          <div className="flex gap-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Preset name..."
              className="flex-1 px-3 py-2 bg-white border-[3px] border-pencil text-pencil text-base font-body
                focus:outline-none focus:border-blue-pen focus:ring-2 focus:ring-blue-pen/20"
              style={{
                borderRadius: wobblyRadiusMd,
                boxShadow: "3px 3px 0px 0px #2d2d2d",
                fontFamily: "var(--font-body)",
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
              }}
            />
            <button
              onClick={handleSave}
              className="px-3 py-2 bg-accent text-white border-[3px] border-pencil text-sm font-body
                shadow-[4px_4px_0px_0px_#2d2d2d] hover:shadow-[2px_2px_0px_0px_#2d2d2d] hover:-translate-y-px
                active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all duration-100
                inline-flex items-center gap-1.5"
              style={{ borderRadius: wobblyRadius, fontFamily: "var(--font-body)" }}
            >
              <HugeiconsIcon icon={SaveIcon} size={16} strokeWidth={2.5} />
              Save
            </button>
          </div>

          {presets.length === 0 ? (
            <p className="text-base font-body text-pencil/40">No saved presets yet.</p>
          ) : (
            <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
              {presets.map((preset) => (
                <div
                  key={preset.id}
                  className="flex items-center justify-between px-3 py-2 bg-white border-[3px] border-pencil
                    transition-all duration-100 hover:shadow-[2px_2px_0px_0px_#2d2d2d] hover:-translate-y-px"
                  style={{
                    borderRadius: wobblyRadius,
                    boxShadow: "3px 3px 0px 0px rgba(45,45,45,0.1)",
                  }}
                >
                  <button
                    onClick={() => handleLoad(preset)}
                    className="flex-1 text-left text-base font-body text-pencil truncate hover:text-accent transition-colors"
                    title={`${preset.name} (${preset.generator})`}
                  >
                    <span className="font-bold">{preset.name}</span>
                    <span className="text-sm text-pencil/50 ml-2">{preset.generator}</span>
                  </button>
                  <button
                    onClick={() => handleDelete(preset.id)}
                    className="text-pencil/40 hover:text-accent transition-colors p-1"
                    aria-label="Delete preset"
                  >
                    <HugeiconsIcon icon={Delete01Icon} size={16} strokeWidth={2.5} />
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
