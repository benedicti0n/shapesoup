# ShapeSoup Generator Context Report: Blurry Gradient & Mesh Gradient

## Project Overview

ShapeSoup is a seed-based SVG generation pattern engine. Monorepo with `packages/core/src/` (the generators) and `apps/web/` (Next.js 16 playground).

## Architecture Tree

```
packages/core/src/
├── core/
│   ├── types.ts          # GeneratorOutput, BaseGeneratorConfig, GeneratorType union
│   ├── random.ts         # createSeededRandom() — mulberry32 PRNG
│   ├── color.ts          # randomColorFromPalette, interpolatePalette (culori oklab)
│   ├── svg.ts           # createSvgRoot, createSvgElement (string builders)
│   └── dataUri.ts       # svgToDataUri (URL-encoded data URI)
├── generators/
│   ├── gradient/
│   │   ├── types.ts
│   │   ├── defaults.ts
│   │   └── generateBlurryGradient.ts
│   └── meshGradient/
│       ├── types.ts
│       ├── defaults.ts
│       └── generateMeshGradient.ts
├── __tests__/
│   ├── gradient.test.ts
│   └── meshGradient.test.ts
apps/web/src/
├── lib/store/playgroundStore.ts    # Default configs, computeResult dispatch
└── components/playground/
    ├── previewWorkspace.tsx         # Inline SVG rendering via dangerouslySetInnerHTML
    ├── controlsSidebar.tsx          # Sliders for blobCount, blurAmount, etc.
    └── generatorControls.tsx        # Duplicate control set used by InspectorSidebar
```

---

## Generator 1: Blurry Gradient

### Config (`generators/gradient/types.ts`)

```ts
type BlurryGradientConfig = {
  width: number;
  height: number;
  seed?: string | number;
  blobCount?: number;    // default: 5
  blurAmount?: number;   // default: 40
  colors?: string[];     // default: ["#f43f5e", "#f97316", "#eab308"]
};
```

### Algorithm (`generateBlurryGradient.ts`)

1. Pick a random background color from the palette via `randomColorFromPalette()`.
2. Draw a full-canvas `<rect>` in that color.
3. Create `blobCount` `<ellipse>` elements:
   - Random position `(cx, cy)` anywhere within `[0, width]` × `[0, height]`
   - Random radii `rx` ∈ `[width × 0.15, width × 0.4]`, `ry` ∈ `[height × 0.15, height × 0.4]`
   - Random rotation `0–360°` around center
   - Random color from palette (picks one, no interpolation)
   - Random opacity `0.4–0.9`
4. All ellipses share a single `<feGaussianBlur>` filter with `stdDeviation="${blurAmount}"` and filter bounds `x="-50%" y="-50%" width="200%" height="200%"`.
5. Return: SVG string, data URI (URL-encoded), metadata.

### Key characteristics
- Uses **ellipses** (different rx/ry) with rotation — varied organic shapes
- Random color per blob (picks from palette, no interpolation)
- Background is a random palette color (no `backgroundColor` config param)
- Blobs placed strictly inside canvas bounds — no edge bleed
- Opacity range fairly wide: 0.4–0.9

---

## Generator 2: Mesh Gradient

### Config (`generators/meshGradient/types.ts`)

```ts
type MeshGradientConfig = {
  width: number;
  height: number;
  seed?: string | number;
  blobCount?: number;     // default: 6
  blur?: number;          // default: 50
  opacity?: number;       // default: 0.7
  minRadius?: number;     // default: 120
  maxRadius?: number;     // default: 350
  colors?: string[];      // default: ["#c084fc", "#818cf8", "#38bdf8", "#2dd4bf", "#f472b6"]
  backgroundColor?: string; // default: "#0f172a"
};
```

### Algorithm (`generateMeshGradient.ts`)

1. Draw a full-canvas `<rect>` in `backgroundColor` (dark `#0f172a` by default).
2. Create `blobCount` `<circle>` elements:
   - Random position extending beyond canvas: `cx` ∈ `[width × -0.2, width × 1.2]`, `cy` ∈ `[height × -0.2, height × 1.2]`
   - Random radius `r` ∈ `[minRadius, maxRadius]`
   - Color **interpolated** across palette using `interpolatePalette(palette, i / (count - 1))` — smooth gradient in OKLab space via culori
   - Opacity = `config.opacity × random(0.6, 1.0)` (final range: 0.06–1.0 depending on config)
3. All circles share a single `<feGaussianBlur>` with `stdDeviation="${blur}"` and same filter bounds as above.
4. Input clamping: count 2–15, blur ≥ 0, opacity 0.1–1.0, minRadius ≥ 20, maxRadius ≥ minRadius + 10.
5. Return SVG string, data URI, metadata.

### Key characteristics
- Uses **circles** (not ellipses) — no rx/ry variation, no rotation
- Colors are **interpolated** across blobs in OKLab — smooth color progression
- Circles **bleed past canvas edges** for depth
- Dark background by default — different aesthetic from Blurry Gradient
- Separate `minRadius`/`maxRadius` (absolute pixel values) vs Blurry Gradient's fractional radii
- Separate `opacity` config param (applied as a multiplier)

---

## Playground Defaults

From `apps/web/src/lib/store/playgroundStore.ts`:

### Blurry Gradient (line 85)
```ts
"Blurry Gradient": {
  width: 800, height: 600,
  blobCount: 5, blurAmount: 40,
  colors: ["#f43f5e", "#f97316", "#eab308"],
}
```

### Mesh Gradient (line 160)
```ts
"Mesh Gradient": {
  width: 800, height: 600,
  blobCount: 6, blur: 50, opacity: 0.7,
  minRadius: 120, maxRadius: 350,
  colors: ["#c084fc", "#818cf8", "#38bdf8", "#2dd4bf", "#f472b6"],
  backgroundColor: "#0f172a",
}
```

---

## Playground UI Controls

From `controlsSidebar.tsx` and `generatorControls.tsx`:

### Blurry Gradient controls
- **Blob Count**: slider 1–15
- **Blur Amount**: slider 0–100 (step 5)
- **Colors**: color picker

### Mesh Gradient controls
- **Blob Count**: slider 2–15
- **Blur**: slider 0–120 (step 5)
- **Opacity**: slider 0–1 (step 0.05)
- **Min Radius**: slider 20–400
- **Max Radius**: slider 50–600
- **Colors**: color picker
- **Background Color**: color picker

---

## Rendering Pipeline

From `previewWorkspace.tsx`:

1. Generator produces SVG string + data URI.
2. `computeResult()` in the store calls the generator and wraps output with `svgToJsx()` (adds `jsx` field).
3. Preview renders inline via `dangerouslySetInnerHTML` with `style="width:100%;height:100%;display:block"` injected into `<svg>`.
4. Container uses `contain:fit` sizing (ResizeObserver) — aspect ratio maintained within available space.
5. **No CSS filters/blurs on the container** — all blur is from the SVG's `<feGaussianBlur>` element.
6. PNG export pipeline: SVG → Blob → `URL.createObjectURL` → `<img>` → `<canvas>` → `canvas.toDataURL("image/png")`.
7. Fullscreen: SVG → Blob → `URL.createObjectURL` → `window.open()`.

---

## Core Dependencies

### `core/random.ts` — `createSeededRandom(seed)`
- mulberry32 PRNG (32-bit)
- Returns `{ random, randomInt, randomFloat, pick }`
- Seed is hashed via simple string hash → initial state

### `core/color.ts`
- **`randomColorFromPalette(palette, randomFn)`** — picks a random color by index
- **`interpolatePalette(colors, t)`** — uses culori's `interpolate()` in OKLab color space, clamps `t` to [0, 1], returns hex string

### `core/svg.ts`
- **`createSvgElement(tag, attrs, children?)`** — builds string `<tag key="val" ... />` or `<tag ...>children</tag>`
- **`createSvgRoot(attrs, children)`** — wraps in `<svg>` with default `xmlns`, `width`, `height`, `viewBox`

### `core/dataUri.ts`
- **`svgToDataUri(svgString)`** — `encodeURIComponent` + escape quotes → `data:image/svg+xml,<encoded>`

### External
- **culori** — color interpolation in OKLab

---

## Tests

### `__tests__/gradient.test.ts`
- Determinism check (same config → same SVG)
- Contains `<filter>` and `<ellipse>` elements
- Element count matches blobCount + 1 (background rect)

### `__tests__/meshGradient.test.ts`
- Determinism check (SVG, dataUri, metadata all match)
- Different seeds produce different SVG
- Valid SVG structure (`<svg>` … `</svg>`)
- Contains filter, `feGaussianBlur`, `fill-opacity`
- Valid data URI format
- Metadata has all required fields

---

## Git History

- Both generators created in commit `3d4b4a3` — `feat: add 5 new SVG generators`
- **Neither file has ever been modified since creation**
- No previous versions to compare against

---

## Known Issue / User Feedback

> "The blur and blobs were more blended and looked good but now it looks kinda odd."

Since no code changed, possible causes (outside generator code):

1. **Browser rendering differences** — SVG `<feGaussianBlur>` rendering varies across browsers and even browser versions. Test in a different browser.
2. **Container size affecting perceived blur** — the `contain:fit` ResizeObserver means the SVG may be rendered at different viewport sizes. `feGaussianBlur` with absolute `stdDeviation` looks different at different display sizes. Inline SVG with `width:100%` vs raw SVG at pixel dimensions will render blur differently.
3. **PNG export pipeline** — SVG → Image → Canvas may render blur differently than inline SVG (canvas anti-aliasing, or the SVG being rasterized differently).
4. **Browser upgrade** — Safari/Firefox/Chrome may have changed their SVG filter rendering.
5. **The `background` container** — both the preview container and live preview have `border-radius: "8px 200px 8px 230px / 230px 8px 200px 8px"` and the outer container has `box-shadow` and `transform: rotate(-0.3deg)`, but these are on wrappers, not on the SVG itself.

### Potential improvements to explore:
- Use relative blur (`stdDeviation` relative to canvas size rather than absolute)
- Apply `<feColorMatrix>` or `<feBlend>` for better blend modes between blobs
- Overlap blobs more intentionally (cluster-based placement)
- Use `mix-blend-mode` in SVG or add `<feComposite>` for better color blending
- For PNG export, use a proper SVG rasterizer library instead of canvas fallback
- Add multiple filter layers or stacked blurs for more depth