"use client";

import { useState, useMemo } from "react";
import { usePlaygroundStore, type GeneratorName } from "@/lib/store/playgroundStore";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  WaterfallUp01Icon,
  WaveIcon,
  BlurIcon,
  Layers01Icon,
  GridIcon,
  MountainIcon,
  MapPinpoint02Icon,
  MoreHorizontalIcon,
  PolygonIcon,
  GridViewIcon,
  ShapesIcon,
  Search01Icon,
} from "@hugeicons/core-free-icons";

const generatorNames: GeneratorName[] = [
  "Blob",
  "Wave",
  "Blurry Gradient",
  "Blob Scene",
  "Layered Waves",
  "Stacked Waves",
  "Low Poly Grid",
  "Layered Peaks",
  "Topographic Lines",
  "Dot Matrix",
  "Mesh Gradient",
  "Noise Grid",
  "Bauhaus Pattern",
];

const generatorIcons: Record<GeneratorName, React.ReactNode> = {
  Blob: <HugeiconsIcon icon={ShapesIcon} size={18} strokeWidth={2.5} />,
  Wave: <HugeiconsIcon icon={WaveIcon} size={18} strokeWidth={2.5} />,
  "Blurry Gradient": <HugeiconsIcon icon={BlurIcon} size={18} strokeWidth={2.5} />,
  "Blob Scene": <HugeiconsIcon icon={Layers01Icon} size={18} strokeWidth={2.5} />,
  "Layered Waves": <HugeiconsIcon icon={WaveIcon} size={18} strokeWidth={2.5} />,
  "Stacked Waves": <HugeiconsIcon icon={WaterfallUp01Icon} size={18} strokeWidth={2.5} />,
  "Low Poly Grid": <HugeiconsIcon icon={GridIcon} size={18} strokeWidth={2.5} />,
  "Layered Peaks": <HugeiconsIcon icon={MountainIcon} size={18} strokeWidth={2.5} />,
  "Topographic Lines": <HugeiconsIcon icon={MapPinpoint02Icon} size={18} strokeWidth={2.5} />,
  "Dot Matrix": <HugeiconsIcon icon={MoreHorizontalIcon} size={18} strokeWidth={2.5} />,
  "Mesh Gradient": <HugeiconsIcon icon={PolygonIcon} size={18} strokeWidth={2.5} />,
  "Noise Grid": <HugeiconsIcon icon={GridViewIcon} size={18} strokeWidth={2.5} />,
  "Bauhaus Pattern": <HugeiconsIcon icon={ShapesIcon} size={18} strokeWidth={2.5} />,
};

const generatorDescriptions: Record<GeneratorName, string> = {
  Blob: "Organic blob shape",
  Wave: "Smooth sine wave",
  "Blurry Gradient": "Soft blurred blobs",
  "Blob Scene": "Layered blob composition",
  "Layered Waves": "Flowing wave layers",
  "Stacked Waves": "Stacked wave bands",
  "Low Poly Grid": "Triangulated colors",
  "Layered Peaks": "Mountain silhouettes",
  "Topographic Lines": "Contour map lines",
  "Dot Matrix": "Halftone dot field",
  "Mesh Gradient": "Soft gradient blobs",
  "Noise Grid": "Geometric noise texture",
  "Bauhaus Pattern": "Bold geometric poster",
};

const categories: { label: string; generators: GeneratorName[] }[] = [
  {
    label: "Featured",
    generators: ["Blob Scene", "Mesh Gradient", "Bauhaus Pattern"],
  },
  {
    label: "Backgrounds",
    generators: ["Wave", "Layered Waves", "Stacked Waves", "Blurry Gradient"],
  },
  {
    label: "Geometry",
    generators: ["Blob", "Low Poly Grid", "Dot Matrix", "Noise Grid"],
  },
  {
    label: "Nature",
    generators: ["Layered Peaks", "Topographic Lines"],
  },
];

const wobblyRadius = "255px 15px 225px 15px / 15px 225px 15px 255px";

export function GeneratorBrowser() {
  const activeGenerator = usePlaygroundStore((s) => s.activeGenerator);
  const setActiveGenerator = usePlaygroundStore((s) => s.setActiveGenerator);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return generatorNames.filter(
      (g) =>
        g.toLowerCase().includes(q) ||
        generatorDescriptions[g].toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="flex flex-col gap-5">
      {/* Search */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-pencil/50 pointer-events-none">
          <HugeiconsIcon icon={Search01Icon} size={16} strokeWidth={2.5} />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Find a generator..."
          className="w-full pl-9 pr-3 py-2 bg-white border-[3px] border-pencil text-pencil text-base font-body
            focus:outline-none focus:border-blue-pen focus:ring-2 focus:ring-blue-pen/20 transition-all duration-100"
          style={{
            borderRadius: wobblyRadius,
            boxShadow: "3px 3px 0px 0px #2d2d2d",
            fontFamily: "var(--font-body)",
          }}
          aria-label="Search generators"
        />
      </div>

      {/* Results or categories */}
      {filtered ? (
        <div className="flex flex-col gap-2">
          {filtered.length === 0 ? (
            <p className="text-base font-body text-pencil/50">No generators found.</p>
          ) : (
            filtered.map((name) => (
              <GeneratorItem
                key={name}
                name={name}
                isActive={activeGenerator === name}
                onClick={() => setActiveGenerator(name)}
              />
            ))
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {categories.map((cat) => (
            <div key={cat.label} className="flex flex-col gap-2">
              <h3
                className="text-sm font-bold font-heading text-pencil/60 uppercase tracking-wider"
                style={{ transform: "rotate(-0.5deg)" }}
              >
                {cat.label}
              </h3>
              <div className="flex flex-col gap-2">
                {cat.generators.map((name) => (
                  <GeneratorItem
                    key={name}
                    name={name}
                    isActive={activeGenerator === name}
                    onClick={() => setActiveGenerator(name)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function GeneratorItem({
  name,
  isActive,
  onClick,
}: {
  name: GeneratorName;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2.5 px-3 py-2 text-left
        border-[3px] border-pencil transition-all duration-100
        hover:shadow-[2px_2px_0px_0px_#2d2d2d] hover:-translate-y-px
        active:shadow-none active:translate-x-[2px] active:translate-y-[2px]
        ${isActive
          ? "bg-accent text-white shadow-[2px_2px_0px_0px_#2d2d2d]"
          : "bg-white shadow-[3px_3px_0px_0px_rgba(45,45,45,0.12)] text-pencil hover:bg-accent hover:text-white"
        }
      `}
      style={{
        borderRadius: wobblyRadius,
        fontFamily: "var(--font-body)",
      }}
      aria-pressed={isActive}
      aria-label={name}
    >
      <span className={isActive ? "text-white" : "text-pencil"}>
        {generatorIcons[name]}
      </span>
      <div className="flex flex-col">
        <span className="text-sm font-body leading-tight">{name}</span>
        <span className={`text-xs font-body leading-tight ${isActive ? "text-white/70" : "text-pencil/50"}`}>
          {generatorDescriptions[name]}
        </span>
      </div>
    </button>
  );
}

export function GeneratorChips({
  onSelect,
}: {
  onSelect?: () => void;
}) {
  const activeGenerator = usePlaygroundStore((s) => s.activeGenerator);
  const setActiveGenerator = usePlaygroundStore((s) => s.setActiveGenerator);

  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {generatorNames.map((name) => {
        const isActive = activeGenerator === name;
        return (
          <button
            key={name}
            onClick={() => {
              setActiveGenerator(name);
              onSelect?.();
            }}
            className={`
              flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-body
              border-[3px] border-pencil transition-all duration-100
              ${isActive
                ? "bg-accent text-white shadow-[2px_2px_0px_0px_#2d2d2d]"
                : "bg-white shadow-[3px_3px_0px_0px_rgba(45,45,45,0.12)] text-pencil hover:bg-accent hover:text-white"
              }
            `}
            style={{ borderRadius: wobblyRadius, fontFamily: "var(--font-body)" }}
            aria-pressed={isActive}
          >
            {generatorIcons[name]}
            <span className="whitespace-nowrap">{name}</span>
          </button>
        );
      })}
    </div>
  );
}
