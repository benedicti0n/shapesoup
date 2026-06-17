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
  | "layeredPeaks"
  | "topoLines"
  | "dotMatrix"
  | "meshGradient"
  | "noiseGrid"
  | "bauhausPattern";
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

### generateTopoLines

```typescript
function generateTopoLines(config: TopoLinesConfig): GeneratorOutput;
```

**TopoLinesConfig:**

```typescript
type TopoLinesConfig = {
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
};
```

### generateDotMatrix

```typescript
function generateDotMatrix(config: DotMatrixConfig): GeneratorOutput;
```

**DotMatrixConfig:**

```typescript
type DotMatrixConfig = {
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
};
```

### generateMeshGradient

```typescript
function generateMeshGradient(config: MeshGradientConfig): GeneratorOutput;
```

**MeshGradientConfig:**

```typescript
type MeshGradientConfig = {
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
};
```

### generateNoiseGrid

```typescript
function generateNoiseGrid(config: NoiseGridConfig): GeneratorOutput;
```

**NoiseGridConfig:**

```typescript
type NoiseGridConfig = {
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
};
```

### generateBauhausPattern

```typescript
function generateBauhausPattern(config: BauhausPatternConfig): GeneratorOutput;
```

**BauhausPatternConfig:**

```typescript
type BauhausPatternConfig = {
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
