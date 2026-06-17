"use client";

import React from "react";
import { SectionTitle, PostItCard, DashedLine, SketchBadge } from "@/components/landing/sketchPrimitives";
import { CopyButton } from "@/components/landing/copyButton";

function CodeBlock({ children, label }: { children: string; label?: string }) {
  return (
    <div className="relative mt-3 mb-6">
      {label && (
        <div
          className="absolute -top-3 left-3 bg-post-it border-[3px] border-pencil px-2 py-0.5 text-sm font-bold font-body text-pencil"
          style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px", boxShadow: "2px 2px 0px 0px #2d2d2d", transform: "rotate(-2deg)" }}
        >
          {label}
        </div>
      )}
      <pre
        className="bg-paper border-[3px] border-pencil p-5 overflow-x-auto text-sm font-mono text-pencil leading-relaxed"
        style={{ borderRadius: "8px 30px 8px 35px / 35px 8px 30px 8px", boxShadow: "4px 4px 0px 0px rgba(45,45,45,0.1)" }}
      >
        <code>{children}</code>
      </pre>
    </div>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-2xl font-bold font-heading text-pencil mt-10 mb-3" style={{ transform: "rotate(-0.3deg)" }}>
      {children}
    </h3>
  );
}

function H4({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="text-xl font-bold font-body text-pencil mt-6 mb-2">
      {children}
    </h4>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-base font-body text-pencil/80 leading-relaxed mb-3">{children}</p>;
}

export function DocsContent() {
  return (
    <div className="flex flex-col gap-4">
      {/* Title */}
      <div className="mb-6">
        <SectionTitle>Documentation</SectionTitle>
        <p className="mt-2 text-lg font-body text-pencil/70">
          API reference for <code className="bg-white border-2 border-pencil px-1.5 py-0.5 text-sm font-mono rounded">@shapesoup/core</code>
        </p>
        <div className="mt-4 flex gap-2">
          <CopyButton text="pnpm add @shapesoup/core" label="Copy Install" />
        </div>
      </div>

      <DashedLine />

      {/* Quick Start */}
      <section id="quick-start">
        <H3>Quick Start</H3>
        <P>
          ShapeSoup is a pure TypeScript package with zero browser dependencies.
          Install it and generate your first SVG in seconds.
        </P>

        <CodeBlock label="install">
{`pnpm add @shapesoup/core
# or
npm install @shapesoup/core`}
        </CodeBlock>

        <CodeBlock label="usage">
{`import { generateBlobScene } from "@shapesoup/core";

const result = generateBlobScene({
  width: 1200,
  height: 800,
  seed: "my-product-launch",
});

console.log(result.svg);      // raw SVG string
console.log(result.dataUri);  // data:image/svg+xml,...
console.log(result.metadata); // { generator, seed, width, height, elements }`}
        </CodeBlock>

        <P>
          Every generator is deterministic: the same <code className="bg-white border-2 border-pencil px-1 py-0.5 text-sm font-mono rounded">config</code> +{" "}
          <code className="bg-white border-2 border-pencil px-1 py-0.5 text-sm font-mono rounded">seed</code> always produces the same SVG output.
        </P>
      </section>

      <DashedLine />

      {/* Types */}
      <section id="types">
        <H3>Base Types</H3>

        <H4>BaseGeneratorConfig</H4>
        <P>Shared by all generators.</P>
        <CodeBlock>
{`type BaseGeneratorConfig = {
  width: number;
  height: number;
  seed?: string | number;
  background?: string;
  colors?: string[];
};`}
        </CodeBlock>

        <H4>GeneratorOutput</H4>
        <P>What every generator returns.</P>
        <CodeBlock>
{`type GeneratorOutput = {
  svg: string;
  dataUri: string;
  metadata: {
    generator: string;
    seed: string;
    width: number;
    height: number;
    elements: number;
  };
};`}
        </CodeBlock>

        <H4>GeneratorType</H4>
        <P>String union for the generic dispatcher.</P>
        <CodeBlock>
{`type GeneratorType =
  | "blob"
  | "wave"
  | "blurryGradient"
  | "blobScene"
  | "layeredWaves"
  | "stackedWaves"
  | "lowPolyGrid"
  | "layeredPeaks"
  | "topoLines"
  | "dotMatrix"
  | "meshGradient"
  | "noiseGrid"
  | "bauhausPattern";`}
        </CodeBlock>
      </section>

      <DashedLine />

      {/* Generators */}
      <section id="generators">
        <H3>Generators</H3>
        <P>13 deterministic SVG generators. Each accepts a config object and returns a GeneratorOutput.</P>

        <GeneratorDoc
          name="generateBlob"
          description="A single organic blob shape with smooth curves."
          config={`type BlobConfig = {
  width: number;
  height: number;
  seed?: string | number;
  complexity?: number;  // default: 8
  contrast?: number;    // default: 0.4
  colors?: string[];    // default: ["#6366f1", "#a855f7", "#ec4899"]
};`}
        />

        <GeneratorDoc
          name="generateWave"
          description="A single sine wave with organic variation."
          config={`type WaveConfig = {
  width: number;
  height: number;
  seed?: string | number;
  amplitude?: number;   // default: 80
  frequency?: number;   // default: 0.01
  points?: number;      // default: 10
  layerCount?: number;  // default: 4
  colors?: string[];    // default: ["#0ea5e9", "#6366f1", "#a855f7"]
};`}
        />

        <GeneratorDoc
          name="generateLayeredWaves"
          description="Multiple smooth wave layers stacked vertically."
          note="Uses WaveConfig. layerCount controls the number of stacked smooth wave layers."
        />

        <GeneratorDoc
          name="generateStackedWaves"
          description="Multiple sharp wave layers stacked vertically."
          note="Uses WaveConfig. layerCount controls the number of stacked sharp wave layers."
        />

        <GeneratorDoc
          name="generateBlurryGradient"
          description="Soft blurred blob gradients with SVG filters."
          config={`type BlurryGradientConfig = {
  width: number;
  height: number;
  seed?: string | number;
  blobCount?: number;    // default: 5
  blurAmount?: number;   // default: 40
  colors?: string[];     // default: ["#f43f5e", "#f97316", "#eab308"]
};`}
        />

        <GeneratorDoc
          name="generateBlobScene"
          description="Organic solid blob compositions with layered contour bands."
          config={`type BlobSceneConfig = {
  width: number;
  height: number;
  seed?: string | number;
  groupCount?: number;      // default: 2
  layersPerGroup?: number;  // default: 5
  complexity?: number;      // default: 12
  contrast?: number;        // default: 0.3
  size?: number;            // default: 1.2
  colors?: string[];        // default: ["#0f766e", "#14b8a6", "#5eead4", "#ccfbf1"]
};`}
        />

        <GeneratorDoc
          name="generateLowPolyGrid"
          description="Triangulated geometric color fields with jitter."
          config={`type LowPolyGridConfig = {
  width: number;
  height: number;
  seed?: string | number;
  cols?: number;       // default: 8
  rows?: number;       // default: 6
  jitter?: number;     // default: 0.4
  colors?: string[];   // default: ["#f43f5e", "#f97316", "#eab308", "#84cc16"]
};`}
        />

        <GeneratorDoc
          name="generateLayeredPeaks"
          description="Mountain-like layered peak silhouettes."
          config={`type LayeredPeaksConfig = {
  width: number;
  height: number;
  seed?: string | number;
  layerCount?: number;  // default: 5
  peakCount?: number;   // default: 8
  roughness?: number;   // default: 0.4
  colors?: string[];    // default: ["#1e293b", "#334155", "#475569", "#64748b", "#94a3b8"]
};`}
        />

        <GeneratorDoc
          name="generateTopoLines"
          description="Contour-map style organic line patterns."
          config={`type TopoLinesConfig = {
  width: number;
  height: number;
  seed?: string | number;
  lineCount?: number;      // default: 12
  amplitude?: number;      // default: 60
  frequency?: number;      // default: 0.008
  noise?: number;          // default: 0.5
  strokeWidth?: number;    // default: 1.5
  spacing?: number;        // default: 50
  colors?: string[];       // default: ["#1e293b", "#38bdf8", "#a78bfa", "#f472b6"]
  backgroundColor?: string; // default: "#f8fafc"
};`}
        />

        <GeneratorDoc
          name="generateDotMatrix"
          description="Seeded halftone-style dot fields with distance-based radii."
          config={`type DotMatrixConfig = {
  width: number;
  height: number;
  seed?: string | number;
  columns?: number;        // default: 16
  rows?: number;           // default: 12
  minRadius?: number;      // default: 2
  maxRadius?: number;      // default: 20
  jitter?: number;         // default: 0.3
  density?: number;        // default: 0.85
  colors?: string[];       // default: ["#0f172a", "#334155", "#64748b", "#94a3b8"]
  backgroundColor?: string; // default: "#f1f5f9"
};`}
        />

        <GeneratorDoc
          name="generateMeshGradient"
          description="Soft modern gradient blobs with SVG blur filters."
          config={`type MeshGradientConfig = {
  width: number;
  height: number;
  seed?: string | number;
  blobCount?: number;       // default: 6
  blur?: number;            // default: 50
  opacity?: number;         // default: 0.7
  minRadius?: number;       // default: 120
  maxRadius?: number;       // default: 350
  colors?: string[];        // default: ["#c084fc", "#818cf8", "#38bdf8", "#2dd4bf", "#f472b6"]
  backgroundColor?: string;  // default: "#0f172a"
};`}
        />

        <GeneratorDoc
          name="generateNoiseGrid"
          description="Geometric texture with mixed shapes and jitter."
          config={`type NoiseGridConfig = {
  width: number;
  height: number;
  seed?: string | number;
  cellSize?: number;        // default: 30
  density?: number;         // default: 0.6
  shapeSize?: number;       // default: 0.7
  jitter?: number;          // default: 0.4
  strokeWidth?: number;     // default: 1.5
  colors?: string[];        // default: ["#1e293b", "#475569", "#94a3b8", "#cbd5e1"]
  backgroundColor?: string;  // default: "#f8fafc"
};`}
        />

        <GeneratorDoc
          name="generateBauhausPattern"
          description="Playful geometric poster layouts with bold shapes."
          config={`type BauhausPatternConfig = {
  width: number;
  height: number;
  seed?: string | number;
  shapeCount?: number;      // default: 18
  minSize?: number;         // default: 30
  maxSize?: number;         // default: 180
  strokeWidth?: number;     // default: 3
  colors?: string[];        // default: ["#dc2626", "#2563eb", "#f59e0b", "#1f2937", "#f3f4f6"]
  backgroundColor?: string;  // default: "#fef3c7"
  allowStrokeOnly?: boolean; // default: true
};`}
        />

        <H4>Generic Dispatcher</H4>
        <P>
          Use <code className="bg-white border-2 border-pencil px-1 py-0.5 text-sm font-mono rounded">generatePattern</code> to route to any generator by type string.
        </P>
        <CodeBlock>
{`import { generatePattern } from "@shapesoup/core";

const result = generatePattern({
  type: "layeredPeaks",
  config: {
    width: 800,
    height: 600,
    seed: "peaks",
    layerCount: 5,
    colors: ["#1e293b", "#334155", "#475569"],
  },
});`}
        </CodeBlock>
      </section>

      <DashedLine />

      {/* Presets */}
      <section id="presets">
        <H3>Presets</H3>

        <H4>Color Palettes</H4>
        <P>Built-in curated palettes and palette generators.</P>
        <CodeBlock label="palettes">
{`import { presetPalettes, getRandomPalette, generateRandomPalette } from "@shapesoup/core";

// 12 named palettes
console.log(presetPalettes);

// Pick a random preset palette
const palette = getRandomPalette(rng.random);

// Generate a random HSL palette
const randomPalette = generateRandomPalette(rng.random, 5);`}
        </CodeBlock>

        <H4>Canvas Sizes</H4>
        <P>Common dimensions for quick reference.</P>
        <CodeBlock label="sizes">
{`import { canvasSizePresets } from "@shapesoup/core";

// [ { width: 800, height: 600 }, { width: 1200, height: 800 }, ... ]`}
        </CodeBlock>

        <div className="flex flex-wrap gap-2 mt-3">
          {["800 x 600", "1200 x 800", "1920 x 1080", "1080 x 1080", "640 x 640"].map((size) => (
            <SketchBadge key={size}>{size}</SketchBadge>
          ))}
        </div>
      </section>

      <DashedLine />

      {/* Utilities */}
      <section id="utilities">
        <H3>Utilities</H3>

        <H4>createSeededRandom</H4>
        <P>Deterministic pseudo-random number generator. All generators use this internally.</P>
        <CodeBlock>
{`import { createSeededRandom } from "@shapesoup/core";

const rng = createSeededRandom("my-seed");

rng.random();           // [0, 1)
rng.randomInt(0, 10);   // integer in range
rng.randomFloat(0, 1);  // float in range
rng.pick(["a", "b", "c"]); // random array element`}
        </CodeBlock>

        <H4>Color Helpers</H4>
        <P>Palette interpolation and color utilities.</P>
        <CodeBlock>
{`import { interpolatePalette, randomColorFromPalette, svgToDataUri } from "@shapesoup/core";

// Interpolate between palette colors in OKLab space
const color = interpolatePalette(["#ff0000", "#0000ff"], 0.5);

// Pick a random color from a palette
const random = randomColorFromPalette(palette, rng.random);

// Convert an SVG string to a data URI
const dataUri = svgToDataUri(svgString);`}
        </CodeBlock>
      </section>

      <DashedLine />

      {/* Determinism note */}
      <PostItCard rotation={-1} className="mt-8">
        <p className="text-lg font-bold font-body text-pencil">
          same config + same seed = same SVG
        </p>
        <DashedLine className="my-2" />
        <p className="text-base font-body text-pencil/70">
          Every generator is a pure function. The output depends only on the config and seed.
          This makes patterns cacheable, testable, and version-controllable.
        </p>
      </PostItCard>
    </div>
  );
}

function GeneratorDoc({
  name,
  description,
  config,
  note,
}: {
  name: string;
  description: string;
  config?: string;
  note?: string;
}) {
  return (
    <div className="mt-8">
      <H4>
        <code className="text-accent">{name}</code>
      </H4>
      <P>{description}</P>
      {config && <CodeBlock label="config">{config}</CodeBlock>}
      {note && (
        <div className="flex items-start gap-2 mt-2">
          <div className="w-5 h-5 flex-shrink-0 mt-0.5 bg-blue-pen border-2 border-pencil rounded-full" style={{ boxShadow: "2px 2px 0px 0px #2d2d2d" }} />
          <p className="text-sm font-body text-pencil/70">{note}</p>
        </div>
      )}
    </div>
  );
}
