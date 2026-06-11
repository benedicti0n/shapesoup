# ShapeSoup — Features & Product Vision

## Overview

ShapeSoup is a seed-based SVG generative pattern engine. It is a web playground and (eventually) an npm package that lets designers and developers create deterministic, beautiful, scalable SVG backgrounds and illustrations from a simple config + seed.

Every generator is a pure function: **same config + same seed = same SVG**. This makes patterns reproducible, shareable via URL, and testable.

## Core Philosophy

- **Deterministic by design**: No true randomness in generators. A seed drives all variation.
- **SVG-native output**: Every pattern is a real SVG — not canvas, not PNG. Scalable, editable, small file size.
- **Playground-first**: The web app is the primary interface. Tweak parameters, see live preview, copy or download SVG.
- **Extensible**: New generators plug into the same API with minimal boilerplate.
- **Framework-agnostic core**: The generator logic is pure TypeScript. React/Next.js is only the UI layer.

## Target Users

- UI/UX designers looking for unique background assets
- Frontend developers who need programmatic, scalable graphics
- Generative art enthusiasts who want controllable randomness

## Generator Families (Roadmap)

### v1 — Launch

1. **Blob** — Smooth organic closed shapes. Points around a circle with radius distortion, connected by cubic Bézier curves.
2. **Wave** — Flowing sine-based wave paths. Sampled across canvas width with variable phase, amplitude, and frequency.
3. **Blurry Gradient** — Soft atmospheric gradients. SVG rectangles plus blurred circles/ellipses using SVG Gaussian blur filters.

### v2 — Expansion

4. **Blob Scene** — Multiple layered blobs with varied size, color, and blur. Creates depth and composition.
5. **Layered Waves** — Stacked wave paths with offset Y positions and color transitions. Classic section divider aesthetic.
6. **Stacked Waves** — Similar to layered waves but with sharper peaks and more dramatic overlaps.
7. **Low Poly Grid** — Jittered grid points triangulated with d3-delaunay. Each triangle gets a fill from interpolated palette colors.
8. **Layered Peaks** — Mountain-like jagged peaks stacked with gradient fills. Great for hero sections.

### v3 — Polish

- Animated SVG export (SMIL or CSS keyframes)
- URL-based sharing (compress config + seed into query params)
- Batch export (generate N variations at once)
- npm package `@shapesoup/core` extraction

## Shared Generator API

Every generator must implement:

```typescript
interface Generator<TConfig> {
  name: string;
  generate(config: TConfig, seed: string): GeneratorResult;
}

interface GeneratorResult {
  svg: string;      // Raw SVG string
  jsx: string;      // JSX/React component string
  metadata: {
    width: number;
    height: number;
    viewBox: string;
    elements: number;
  };
}
```

Inputs:
- `config`: Generator-specific parameters (colors, counts, sizes, etc.)
- `seed`: A string that initializes the seeded PRNG

Outputs:
- `svg`: Complete, self-contained SVG string ready for download
- `jsx`: Equivalent as a React JSX string for copy-paste into code
- `metadata`: Useful stats about the generated graphic

## Core Utilities

1. **Seeded Random** — Mulberry32 or similar fast, seedable PRNG. Used by all generators.
2. **Color Interpolation** — Using `culori` to blend between palette stops, support oklab/hsl/rgb.
3. **SVG Wrapper** — Standard `<svg>` root with configurable viewBox, width, height, xmlns.
4. **Path Helpers** — Cubic Bézier smooth curve builders, line commands, close paths.
5. **Geometry Helpers** — Point rotation, distance, circle sampling, grid generation.
6. **Export Helpers** — Download as `.svg`, copy to clipboard, pretty-print/minify.

## Playground UI

### Layout

- **Left sidebar**: Generator selector (tabs or accordion)
- **Center**: Live SVG preview (responsive, zoomable)
- **Right sidebar**: Parameter controls per generator
  - Color palette picker (preset palettes + custom)
  - Numeric sliders with seeded randomization
  - Seed input field
  - Randomize button (new seed)
  - Action buttons: Copy SVG, Copy JSX, Download SVG

### Controls

- Seed input: text field, allows pasting a specific seed
- Randomize button: generates a new random seed
- Copy SVG: copies the `svg` output string to clipboard
- Copy JSX: copies the `jsx` output string to clipboard
- Download SVG: triggers a `.svg` file download

### Live Preview

- SVG rendered inline in an `<img>` or directly as JSX
- Updates on every config change (debounced)
- Shows dimensions and element count

## Tech Stack

- **Next.js App Router** — Routing, API routes if needed later
- **TypeScript** — Strict mode, no implicit any
- **TailwindCSS** — Utility-first styling
- **shadcn/ui** — Base UI components (buttons, inputs, sliders, tabs)
- **Zustand** — Lightweight global state for generator config, seed, UI preferences
- **d3-delaunay** — Delaunay triangulation for Low Poly Grid only
- **culori** — Color space conversions and interpolation
- **vitest** — Unit tests for deterministic generator output

## Testing Strategy

- Every generator must have unit tests proving determinism
- Same config + same seed must produce identical SVG strings
- Snapshot testing for known seed/config combinations
- PRNG utility tested for uniform distribution and repeatability

## Naming Conventions

- `camelCase` for all identifiers (variables, functions, files, directories)
- Generators named like `blobGenerator`, `waveGenerator`
- Utilities named like `createSeededRandom`, `interpolateColor`

## File Structure (Target)

```
app/
  page.tsx                    — Playground main page
  layout.tsx                  — Root layout
components/
  ui/                         — shadcn/ui components
  playground/
    generatorSelector.tsx
    livePreview.tsx
    controlsSidebar.tsx
    actionBar.tsx
lib/
  generators/
    blob.ts
    wave.ts
    blurryGradient.ts
    index.ts
  utils/
    seededRandom.ts
    colors.ts
    svg.ts
    paths.ts
    geometry.ts
    export.ts
  types/
    generator.ts
  store/
    playgroundStore.ts
public/
```

## Future: npm Package

After the playground is solid, extract `lib/generators` and `lib/utils` into a standalone npm package `@shapesoup/core`. The playground then becomes a consumer of the package.
