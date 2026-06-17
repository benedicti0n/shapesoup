"use client";

import { usePlaygroundStore, GeneratorName } from "@/lib/store/playgroundStore";
import { FavoritesPanel } from "@/components/playground/favoritesPanel";
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

const wobblyRadius = "255px 15px 225px 15px / 15px 225px 15px 255px";

export function GeneratorSelector() {
  const activeGenerator = usePlaygroundStore((s) => s.activeGenerator);
  const setActiveGenerator = usePlaygroundStore((s) => s.setActiveGenerator);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h2
          className="text-xl font-bold font-heading text-pencil"
          style={{ transform: "rotate(-1deg)" }}
        >
          Generators
        </h2>
        <div className="w-full h-0.5 bg-pencil border-dashed border-t-2 border-pencil opacity-30" />
      </div>
      <div className="flex flex-col gap-2">
        {generatorNames.map((name, index) => {
          const isActive = activeGenerator === name;
          return (
            <button
              key={name}
              onClick={() => setActiveGenerator(name)}
              className={`
                flex items-center gap-2.5 px-4 py-2.5 text-left text-base font-body
                border-[3px] border-pencil transition-all duration-100
                hover:shadow-[2px_2px_0px_0px_#2d2d2d] hover:-translate-y-px
                active:shadow-none active:translate-x-[2px] active:translate-y-[2px]
                ${isActive
                  ? "bg-accent text-white shadow-[2px_2px_0px_0px_#2d2d2d]"
                  : "bg-white shadow-[4px_4px_0px_0px_#2d2d2d] text-pencil hover:bg-accent hover:text-white"
                }
              `}
              style={{
                borderRadius: wobblyRadius,
                transform: `rotate(${index % 2 === 0 ? -0.5 : 0.5}deg)`,
                fontFamily: "var(--font-body)",
              }}
            >
              <span className={isActive ? "text-white" : "text-pencil"}>
                {generatorIcons[name]}
              </span>
              <span>{name}</span>
            </button>
          );
        })}
      </div>
      <FavoritesPanel />
    </div>
  );
}
