"use client";

import { useState, useMemo } from "react";
import {
  generateBlobScene,
  generateLayeredWaves,
  generateMeshGradient,
  generateBauhausPattern,
} from "@shapesoup/core";
import { HugeiconsIcon } from "@hugeicons/react";
import { DiceIcon } from "@hugeicons/core-free-icons";
import { SketchButton, SketchBadge } from "./sketchPrimitives";
import { CopyButton } from "./copyButton";

const heroSeeds = [
  { generator: "Blob Scene" as const, seed: "aurora-77", label: "Blob Scene" },
  { generator: "Layered Waves" as const, seed: "ocean-42", label: "Layered Waves" },
  { generator: "Mesh Gradient" as const, seed: "nebula-13", label: "Mesh Gradient" },
  { generator: "Bauhaus Pattern" as const, seed: "poster-99", label: "Bauhaus" },
];

function generateHeroSvg(generator: string, seed: string) {
  const config = { width: 600, height: 400, seed };
  switch (generator) {
    case "Blob Scene":
      return generateBlobScene(config).svg;
    case "Layered Waves":
      return generateLayeredWaves(config).svg;
    case "Mesh Gradient":
      return generateMeshGradient(config).svg;
    case "Bauhaus Pattern":
      return generateBauhausPattern(config).svg;
    default:
      return generateBlobScene(config).svg;
  }
}

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentSeed, setCurrentSeed] = useState(heroSeeds[0].seed);

  const active = heroSeeds[activeIndex];

  const svg = useMemo(() => {
    const raw = generateHeroSvg(active.generator, currentSeed);
    return raw.replace("<svg", '<svg style="width:100%;height:auto;display:block"');
  }, [active.generator, currentSeed]);

  const randomize = () => {
    const newSeed = Math.random().toString(36).substring(2, 10);
    setCurrentSeed(newSeed);
  };

  return (
    <section className="relative px-5 md:px-8 py-16 md:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Text */}
        <div className="flex flex-col gap-6">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-pencil leading-tight"
            style={{ transform: "rotate(-0.5deg)" }}
          >
            Seeded SVG patterns{" "}
            <span className="text-accent">that feel hand-made.</span>
          </h1>
          <p className="text-lg md:text-xl font-body text-pencil/80 max-w-lg">
            ShapeSoup turns a simple config and seed into deterministic SVG patterns you can copy,
            download, share, or drop straight into your app.
          </p>

          <div className="flex flex-wrap gap-3 mt-2">
            <SketchButton href="/playground" variant="accent">
              Open Playground
            </SketchButton>
            <CopyButton text="pnpm add @shapesoup/core" label="Copy Install" />
          </div>

          <div className="flex flex-wrap gap-2 mt-1">
            <SketchBadge>SVG</SketchBadge>
            <SketchBadge>Deterministic</SketchBadge>
            <SketchBadge>Copy-ready</SketchBadge>
            <SketchBadge>Typescript</SketchBadge>
          </div>
        </div>

        {/* Right: Interactive preview */}
        <div className="relative">
          {/* Taped paper frame */}
          <div
            className="relative bg-white border-[3px] border-pencil p-4"
            style={{
              borderRadius: "15px 225px 15px 255px / 255px 15px 225px 15px",
              boxShadow: "8px 8px 0px 0px #2d2d2d",
              transform: "rotate(0.5deg)",
            }}
          >
            {/* Tape */}
            <div
              className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-muted/70 border border-pencil/20"
              style={{ transform: "translate(-50%, 0) rotate(-2deg)", borderRadius: "2px" }}
            />

            {/* SVG preview */}
            <div
              className="w-full bg-white overflow-hidden"
              style={{ borderRadius: "8px 200px 8px 230px / 230px 8px 200px 8px" }}
              dangerouslySetInnerHTML={{ __html: svg }}
            />

            {/* Controls below preview */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {heroSeeds.map((item, i) => (
                <button
                  key={item.label}
                  onClick={() => {
                    setActiveIndex(i);
                    setCurrentSeed(item.seed);
                  }}
                  className={`px-3 py-1.5 text-sm font-body border-[3px] border-pencil transition-all duration-100
                    ${activeIndex === i
                      ? "bg-accent text-white shadow-[2px_2px_0px_0px_#2d2d2d]"
                      : "bg-white text-pencil shadow-[3px_3px_0px_0px_#2d2d2d] hover:bg-accent hover:text-white"
                    }`}
                  style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px", fontFamily: "var(--font-body)" }}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={randomize}
                className="px-3 py-1.5 text-sm font-body bg-white border-[3px] border-pencil text-pencil
                  shadow-[3px_3px_0px_0px_#2d2d2d] hover:bg-accent hover:text-white transition-all duration-100
                  inline-flex items-center gap-1"
                style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px", fontFamily: "var(--font-body)" }}
              >
                <HugeiconsIcon icon={DiceIcon} size={14} strokeWidth={2.5} />
                Randomize
              </button>
            </div>

            <p className="mt-3 text-sm font-body text-pencil/60">
              same seed = same soup{" "}
              <span className="text-pencil/40">(try changing the seed above)</span>
            </p>
          </div>

          {/* Floating tag */}
          <div
            className="absolute -top-4 -right-2 md:-right-6 bg-white border-[3px] border-pencil px-3 py-1 text-sm font-body text-pencil hidden md:block"
            style={{
              borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
              boxShadow: "3px 3px 0px 0px #2d2d2d",
              transform: "rotate(3deg)",
            }}
          >
            seed: {currentSeed}
          </div>
        </div>
      </div>
    </section>
  );
}
