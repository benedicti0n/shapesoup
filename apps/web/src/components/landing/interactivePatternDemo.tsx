"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  generateBlob,
  generateWave,
  generateBlobScene,
  generateLayeredWaves,
  generateLowPolyGrid,
  generateLayeredPeaks,
  generateBlurryGradient,
  generateTopoLines,
  generateDotMatrix,
  generateMeshGradient,
  generateNoiseGrid,
  generateBauhausPattern,
} from "@shapesoup/core";
import { HugeiconsIcon } from "@hugeicons/react";
import { DiceIcon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { SectionTitle, SketchCard } from "./sketchPrimitives";
import { generatorNameToSlug } from "@/lib/utils/urlState";

const demoPatterns: { generator: string; seed: string; name: string }[] = [
  { generator: "Blob Scene", seed: "forest-12", name: "Forest" },
  { generator: "Layered Waves", seed: "sunset-88", name: "Sunset" },
  { generator: "Bauhaus Pattern", seed: "bauhaus-01", name: "Poster" },
  { generator: "Mesh Gradient", seed: "dream-33", name: "Dream" },
  { generator: "Topographic Lines", seed: "map-77", name: "Map" },
  { generator: "Dot Matrix", seed: "halftone-44", name: "Halftone" },
];

const rotations = [-1.5, 1, -0.5, 1.5, -1, 0.5];

function generateDemoSvg(generator: string, seed: string) {
  const config = { width: 320, height: 220, seed };
  switch (generator) {
    case "Blob": return generateBlob(config).svg;
    case "Wave": return generateWave(config).svg;
    case "Blob Scene": return generateBlobScene(config).svg;
    case "Layered Waves": return generateLayeredWaves(config).svg;
    case "Low Poly Grid": return generateLowPolyGrid(config).svg;
    case "Layered Peaks": return generateLayeredPeaks(config).svg;
    case "Blurry Gradient": return generateBlurryGradient(config).svg;
    case "Topographic Lines": return generateTopoLines(config).svg;
    case "Dot Matrix": return generateDotMatrix(config).svg;
    case "Mesh Gradient": return generateMeshGradient(config).svg;
    case "Noise Grid": return generateNoiseGrid(config).svg;
    case "Bauhaus Pattern": return generateBauhausPattern(config).svg;
    default: return generateBlobScene(config).svg;
  }
}

export function InteractivePatternDemo() {
  const [seeds, setSeeds] = useState(demoPatterns.map((p) => p.seed));

  const shuffled = useMemo(() => {
    return demoPatterns.map((p, i) => ({
      ...p,
      svg: generateDemoSvg(p.generator, seeds[i]),
    }));
  }, [seeds]);

  const shuffleAll = () => {
    setSeeds((prev) =>
      prev.map(() => Math.random().toString(36).substring(2, 10))
    );
  };

  return (
    <section id="patterns" className="px-5 md:px-8 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <SectionTitle>Pattern Soup</SectionTitle>
            <p className="mt-3 text-lg font-body text-pencil/70 max-w-md">
              Every seed cooks a different SVG. Click shuffle to remix them all.
            </p>
          </div>
          <button
            onClick={shuffleAll}
            className="self-start px-4 py-2 bg-white border-[3px] border-pencil text-pencil text-base font-body
              shadow-[4px_4px_0px_0px_#2d2d2d] hover:bg-accent hover:text-white hover:shadow-[2px_2px_0px_0px_#2d2d2d]
              active:shadow-none active:translate-x-[3px] active:translate-y-[3px] transition-all duration-100
              inline-flex items-center gap-2"
            style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px", fontFamily: "var(--font-body)" }}
          >
            <HugeiconsIcon icon={DiceIcon} size={16} strokeWidth={2.5} />
            Shuffle Seeds
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {shuffled.map((pattern, i) => (
            <Link
              key={`${pattern.generator}-${seeds[i]}`}
              href={`/playground?type=${generatorNameToSlug[pattern.generator as keyof typeof generatorNameToSlug]}&seed=${seeds[i]}`}
              className="group"
            >
              <SketchCard
                decoration="tape"
                rotation={rotations[i]}
                className="p-4 transition-all duration-100 group-hover:shadow-[6px_6px_0px_0px_#2d2d2d] group-hover:-translate-y-1 group-hover:rotate-0"
              >
                <div
                  className="w-full bg-white overflow-hidden border-2 border-pencil/10"
                  style={{ borderRadius: "8px 40px 8px 45px / 45px 8px 40px 8px" }}
                  dangerouslySetInnerHTML={{ __html: pattern.svg }}
                />
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-base font-bold font-body text-pencil">{pattern.name}</p>
                    <p className="text-sm font-body text-pencil/50">{pattern.generator}</p>
                  </div>
                  <span className="text-sm font-body text-accent opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-1">
                    Open <HugeiconsIcon icon={ArrowRight01Icon} size={14} strokeWidth={2.5} />
                  </span>
                </div>
                <p className="mt-1 text-xs font-body text-pencil/40 font-mono">seed: {seeds[i]}</p>
              </SketchCard>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
