# ShapeSoup — Implementation Todo

## Phase 0: Project Setup

- [x] Initialize Next.js project with TypeScript, TailwindCSS, App Router
- [x] Install dependencies: zustand, d3-delaunay, culori, vitest, jsdom, @vitest/ui
- [ ] Configure Tailwind and global styles
- [ ] Configure vitest with jsdom environment
- [ ] Install and set up shadcn/ui base components

## Phase 1: Core Infrastructure

- [ ] Create `lib/types/generator.ts` — shared Generator API types
- [ ] Create `lib/utils/seededRandom.ts` — Mulberry32 PRNG
  - [ ] Implement `createSeededRandom(seed: string)` returning `{ random, randomInt, randomFloat, pick }`
  - [ ] Add unit tests for determinism and range bounds
- [ ] Create `lib/utils/colors.ts` — color interpolation helpers
  - [ ] `interpolatePalette(colors, t)` using culori oklab
  - [ ] `randomColorFromPalette(palette, randomFn)`
  - [ ] Add unit tests
- [ ] Create `lib/utils/svg.ts` — SVG wrapper and helpers
  - [ ] `createSvgRoot(attrs)` returns SVG element string
  - [ ] `createSvgElement(tag, attrs, children?)` helper
  - [ ] Add unit tests
- [ ] Create `lib/utils/paths.ts` — SVG path command builders
  - [ ] `moveTo(x, y)`, `lineTo(x, y)`, `cubicBezierTo(...)`
  - [ ] `smoothClosedPath(points)` — convert points to smooth closed cubic Bézier
  - [ ] Add unit tests
- [ ] Create `lib/utils/geometry.ts` — geometric helpers
  - [ ] `pointOnCircle(cx, cy, radius, angle)`
  - [ ] `samplePoints(count, width, height, randomFn)`
  - [ ] Add unit tests
- [ ] Create `lib/utils/export.ts` — copy/download helpers
  - [ ] `copyToClipboard(text)`
  - [ ] `downloadSvg(svgString, filename)`
  - [ ] `svgToJsx(svgString)` — basic transform for JSX compatibility

## Phase 2: Generators

### Blob Generator
- [ ] Create `lib/generators/blob.ts`
  - [ ] Define `BlobConfig` interface (colors, complexity, contrast, seed)
  - [ ] Generate N points around circle
  - [ ] Distort radius with seeded random using contrast parameter
  - [ ] Convert to smooth closed cubic Bézier path via `smoothClosedPath`
  - [ ] Return `{ svg, jsx, metadata }`
- [ ] Add unit tests for deterministic output

### Wave Generator
- [ ] Create `lib/generators/wave.ts`
  - [ ] Define `WaveConfig` interface (colors, amplitude, frequency, phase, points)
  - [ ] Sample points across canvas width using sine formula + seeded phase/amplitude variation
  - [ ] Close path at bottom for fill
  - [ ] Return `{ svg, jsx, metadata }`
- [ ] Add unit tests for deterministic output

### Blurry Gradient Generator
- [ ] Create `lib/generators/blurryGradient.ts`
  - [ ] Define `BlurryGradientConfig` interface (colors, blobCount, blurAmount, seed)
  - [ ] Create SVG rect background
  - [ ] Generate randomized blurred circles/ellipses with SVG `<filter>` Gaussian blur
  - [ ] Return `{ svg, jsx, metadata }`
- [ ] Add unit tests for deterministic output

## Phase 3: Playground UI

- [ ] Set up Zustand store (`lib/store/playgroundStore.ts`)
  - [ ] Track `activeGenerator`, `config`, `seed`, `svgOutput`, `jsxOutput`
  - [ ] Actions: `setGenerator`, `updateConfig`, `setSeed`, `randomizeSeed`
- [ ] Create `components/playground/generatorSelector.tsx`
  - [ ] Tabs or buttons for Blob, Wave, Blurry Gradient
- [ ] Create `components/playground/livePreview.tsx`
  - [ ] Render SVG inline, update on config/seed change
  - [ ] Show dimensions and element count
- [ ] Create `components/playground/controlsSidebar.tsx`
  - [ ] Dynamic controls based on active generator config schema
  - [ ] Seed input field
  - [ ] Randomize button
  - [ ] Color palette picker
- [ ] Create `components/playground/actionBar.tsx`
  - [ ] Copy SVG button
  - [ ] Copy JSX button
  - [ ] Download SVG button
- [ ] Assemble `app/page.tsx` with playground layout

## Phase 4: Testing & Polish

- [ ] Write vitest unit tests for all utilities
- [ ] Write vitest unit tests for all three generators
- [ ] Verify deterministic output: same config + seed = identical SVG
- [ ] Verify UI interactions: randomize, copy, download
- [ ] Responsive layout testing
- [ ] Accessibility pass (labels, focus states, color contrast)

## Phase 5: Expansion (Future)

- [ ] Blob Scene generator
- [ ] Layered Waves generator
- [ ] Stacked Waves generator
- [ ] Low Poly Grid generator (d3-delaunay)
- [ ] Layered Peaks generator
- [ ] URL-based sharing (compress config + seed)
- [ ] npm package extraction
