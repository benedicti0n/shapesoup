"use client";

import React from "react";
import Link from "next/link";
import {
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
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { SectionTitle, SketchCard } from "./sketchPrimitives";
import { generatorNameToSlug } from "@/lib/utils/urlState";

const generators = [
  {
    name: "Blob Scene",
    seed: "blobscene-demo",
    description: "Organic solid blob compositions with layered contour bands.",
    generate: generateBlobScene,
  },
  {
    name: "Layered Waves",
    seed: "waves-demo",
    description: "Soft flowing wave backgrounds with smooth curves.",
    generate: generateLayeredWaves,
  },
  {
    name: "Low Poly Grid",
    seed: "lowpoly-demo",
    description: "Triangulated geometric color fields with jitter.",
    generate: generateLowPolyGrid,
  },
  {
    name: "Layered Peaks",
    seed: "peaks-demo",
    description: "Mountain-like layered peak silhouettes.",
    generate: generateLayeredPeaks,
  },
  {
    name: "Blurry Gradient",
    seed: "gradient-demo",
    description: "Soft blurred blob gradients for dreamy backgrounds.",
    generate: generateBlurryGradient,
  },
  {
    name: "Topographic Lines",
    seed: "topo-demo",
    description: "Contour-map style organic line patterns.",
    generate: generateTopoLines,
  },
  {
    name: "Dot Matrix",
    seed: "dot-demo",
    description: "Seeded halftone-style dot fields with distance radii.",
    generate: generateDotMatrix,
  },
  {
    name: "Mesh Gradient",
    seed: "mesh-demo",
    description: "Soft modern gradient blobs with blur filters.",
    generate: generateMeshGradient,
  },
  {
    name: "Noise Grid",
    seed: "noise-demo",
    description: "Geometric texture with mixed shapes and jitter.",
    generate: generateNoiseGrid,
  },
  {
    name: "Bauhaus Pattern",
    seed: "bauhaus-demo",
    description: "Playful geometric poster layouts with bold shapes.",
    generate: generateBauhausPattern,
  },
];

const rotations = [-1, 0.5, -0.5, 1, -1.5, 0.5, -0.5, 1.5, -1, 0.5];

export function GeneratorShowcase() {
  const svgs = generators.map((gen) =>
    gen.generate({ width: 300, height: 200, seed: gen.seed }).svg.replace("<svg", '<svg style="width:100%;height:auto;display:block"')
  );

  return (
    <section id="generators" className="px-5 md:px-8 py-16 md:py-24 bg-white border-y-[3px] border-pencil">
      <div className="max-w-6xl mx-auto">
        <SectionTitle className="text-center">Generator Families</SectionTitle>
        <p className="mt-3 text-lg font-body text-pencil/70 text-center max-w-lg mx-auto">
          {generators.length} deterministic generators. Pick one, type a seed, and cook.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {generators.map((gen, i) => {
            const slug = generatorNameToSlug[gen.name as keyof typeof generatorNameToSlug];

            return (
              <Link key={gen.name} href={`/playground?type=${slug}&seed=${gen.seed}`} className="group">
                <SketchCard
                  className="p-0 overflow-hidden transition-all duration-100 group-hover:shadow-[6px_6px_0px_0px_#2d2d2d] group-hover:-translate-y-1"
                  rotation={rotations[i]}
                >
                  <div
                    className="w-full bg-white border-b-[3px] border-pencil/10"
                    style={{ borderRadius: "12px 200px 12px 220px / 220px 12px 200px 12px" }}
                    dangerouslySetInnerHTML={{ __html: svgs[i] }}
                  />
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold font-body text-pencil">{gen.name}</h3>
                      <span className="text-sm font-body text-accent opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-1">
                        Try it <HugeiconsIcon icon={ArrowRight01Icon} size={14} strokeWidth={2.5} />
                      </span>
                    </div>
                    <p className="text-sm font-body text-pencil/60 mt-1">{gen.description}</p>
                  </div>
                </SketchCard>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
