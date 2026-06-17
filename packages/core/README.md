# @shapesoup/core

Pure TypeScript SVG generative pattern engine. No browser dependencies. No React. Just deterministic SVG generation from a config and a seed.

## Installation

```bash
pnpm add @shapesoup/core
```

## Basic Usage

```typescript
import { generateBlob } from "@shapesoup/core";

const result = generateBlob({
  width: 800,
  height: 600,
  seed: "my-seed",
  complexity: 12,
  contrast: 0.3,
  colors: ["#6366f1", "#a855f7", "#ec4899"],
});

console.log(result.svg);      // raw SVG string
console.log(result.dataUri);  // data:image/svg+xml,... ready for <img src>
console.log(result.metadata); // { generator, seed, width, height, elements }
```

## Blob Scene Example

```typescript
import { generateBlobScene } from "@shapesoup/core";

const result = generateBlobScene({
  width: 1920,
  height: 1080,
  seed: "hero-bg",
  groupCount: 2,
  layersPerGroup: 5,
  complexity: 12,
  contrast: 0.3,
  size: 1.2,
  colors: ["#0f766e", "#14b8a6", "#5eead4", "#ccfbf1"],
});
```

## Topographic Lines Example

```typescript
import { generateTopoLines } from "@shapesoup/core";

const result = generateTopoLines({
  width: 1200,
  height: 800,
  seed: "mountain-map",
  lineCount: 15,
  amplitude: 70,
  frequency: 0.01,
  colors: ["#0f172a", "#38bdf8", "#a78bfa"],
});
```

## Bauhaus Pattern Example

```typescript
import { generateBauhausPattern } from "@shapesoup/core";

const result = generateBauhausPattern({
  width: 800,
  height: 800,
  seed: "poster-01",
  shapeCount: 20,
  colors: ["#dc2626", "#2563eb", "#f59e0b", "#1f2937"],
});
```

## Generic Generator

```typescript
import { generatePattern } from "@shapesoup/core";

const result = generatePattern({
  type: "layeredPeaks",
  config: {
    width: 800,
    height: 600,
    seed: "peaks",
    layerCount: 5,
    colors: ["#1e293b", "#334155", "#475569"],
  },
});
```

## Determinism

All generators are pure functions. The same `config` + `seed` always produces the same `svg` output.

## Generators

- `generateBlob`
- `generateWave`
- `generateLayeredWaves`
- `generateStackedWaves`
- `generateBlurryGradient`
- `generateBlobScene`
- `generateLowPolyGrid`
- `generateLayeredPeaks`
- `generateTopoLines`
- `generateDotMatrix`
- `generateMeshGradient`
- `generateNoiseGrid`
- `generateBauhausPattern`

See `API.md` for full config documentation.
