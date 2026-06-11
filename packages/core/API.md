# @shapesoup/core API Reference

## Base Types

### BaseGeneratorConfig

```typescript
type BaseGeneratorConfig = {
  width: number;
  height: number;
  seed?: string | number;
  background?: string;
  colors?: string[];
};
```

### GeneratorOutput

```typescript
type GeneratorOutput = {
  svg: string;
  dataUri: string;
  metadata: {
    generator: string;
    seed: string;
    width: number;
    height: number;
    elements: number;
  };
};
```

### GeneratorType

```typescript
type GeneratorType =
  | "blob"
  | "wave"
  | "blurryGradient"
  | "blobScene"
  | "layeredWaves"
  | "stackedWaves"
  | "lowPolyGrid"
  | "layeredPeaks";
```

## Generators

### generateBlob

```typescript
function generateBlob(config: BlobConfig): GeneratorOutput;
```

**BlobConfig:**

```typescript
type BlobConfig = {
  width: number;
  height: number;
  seed?: string | number;
  complexity?: number;  // default: 8
  contrast?: number;    // default: 0.4
  colors?: string[];    // default: ["#6366f1", "#a855f7", "#ec4899"]
};
```

### generateWave

```typescript
function generateWave(config: WaveConfig): GeneratorOutput;
```

**WaveConfig:**

```typescript
type WaveConfig = {
  width: number;
  height: number;
  seed?: string | number;
  amplitude?: number;   // default: 80
  frequency?: number;   // default: 0.01
  points?: number;      // default: 10
  layerCount?: number;  // default: 4
  colors?: string[];    // default: ["#0ea5e9", "#6366f1", "#a855f7"]
};
```

### generateLayeredWaves

```typescript
function generateLayeredWaves(config: WaveConfig): GeneratorOutput;
```

Uses `WaveConfig`. `layerCount` controls the number of stacked smooth wave layers.

### generateStackedWaves

```typescript
function generateStackedWaves(config: WaveConfig): GeneratorOutput;
```

Uses `WaveConfig`. `layerCount` controls the number of stacked sharp wave layers.

### generateBlurryGradient

```typescript
function generateBlurryGradient(config: BlurryGradientConfig): GeneratorOutput;
```

**BlurryGradientConfig:**

```typescript
type BlurryGradientConfig = {
  width: number;
  height: number;
  seed?: string | number;
  blobCount?: number;    // default: 5
  blurAmount?: number;   // default: 40
  colors?: string[];     // default: ["#f43f5e", "#f97316", "#eab308"]
};
```

### generateBlobScene

```typescript
function generateBlobScene(config: BlobSceneConfig): GeneratorOutput;
```

**BlobSceneConfig:**

```typescript
type BlobSceneConfig = {
  width: number;
  height: number;
  seed?: string | number;
  groupCount?: number;      // default: 2
  layersPerGroup?: number;  // default: 5
  complexity?: number;      // default: 12
  contrast?: number;        // default: 0.3
  size?: number;            // default: 1.2
  colors?: string[];        // default: ["#0f766e", "#14b8a6", "#5eead4", "#ccfbf1"]
};
```

### generateLowPolyGrid

```typescript
function generateLowPolyGrid(config: LowPolyGridConfig): GeneratorOutput;
```

**LowPolyGridConfig:**

```typescript
type LowPolyGridConfig = {
  width: number;
  height: number;
  seed?: string | number;
  cols?: number;       // default: 8
  rows?: number;       // default: 6
  jitter?: number;     // default: 0.4
  colors?: string[];   // default: ["#f43f5e", "#f97316", "#eab308", "#84cc16"]
};
```

### generateLayeredPeaks

```typescript
function generateLayeredPeaks(config: LayeredPeaksConfig): GeneratorOutput;
```

**LayeredPeaksConfig:**

```typescript
type LayeredPeaksConfig = {
  width: number;
  height: number;
  seed?: string | number;
  layerCount?: number;  // default: 5
  peakCount?: number;   // default: 8
  roughness?: number;   // default: 0.4
  colors?: string[];    // default: ["#1e293b", "#334155", "#475569", "#64748b", "#94a3b8"]
};
```

## Generic Dispatcher

### generatePattern

```typescript
function generatePattern(input: {
  type: GeneratorType;
  config: any;
}): GeneratorOutput;
```

Routes to the correct generator based on `type`.

## Presets

### Palettes

```typescript
import { presetPalettes, getRandomPalette, generateRandomPalette } from "@shapesoup/core";
```

- `presetPalettes` — array of 12 named color palettes
- `getRandomPalette(randomFn)` — pick a random preset palette
- `generateRandomPalette(randomFn, count)` — generate a random HSL palette

### Canvas Sizes

```typescript
import { canvasSizePresets } from "@shapesoup/core";
```

Array of common canvas dimensions: 800x600, 1200x800, 1920x1080, 1080x1080, 640x640.

## Utilities

### createSeededRandom

```typescript
import { createSeededRandom } from "@shapesoup/core";

const rng = createSeededRandom("my-seed");
const n = rng.random();       // [0, 1)
const i = rng.randomInt(0, 10);
const f = rng.randomFloat(0.5, 1.5);
const c = rng.pick(["a", "b", "c"]);
```

### Color Helpers

```typescript
import { interpolatePalette, randomColorFromPalette, svgToDataUri } from "@shapesoup/core";

const color = interpolatePalette(["#ff0000", "#0000ff"], 0.5);
const random = randomColorFromPalette(palette, rng.random);
const dataUri = svgToDataUri(svgString);
```
