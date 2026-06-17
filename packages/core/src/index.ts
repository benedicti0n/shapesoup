import { GeneratorType, GeneratorOutput } from "./core/types";

export { generateBlob } from "./generators/blob/generateBlob";
export { generateWave } from "./generators/wave/generateWave";
export { generateLayeredWaves } from "./generators/wave/generateLayeredWaves";
export { generateStackedWaves } from "./generators/wave/generateStackedWaves";
export { generateBlurryGradient } from "./generators/gradient/generateBlurryGradient";
export { generateBlobScene } from "./generators/scene/generateBlobScene";
export { generateLowPolyGrid } from "./generators/lowPoly/generateLowPolyGrid";
export { generateLayeredPeaks } from "./generators/peaks/generateLayeredPeaks";
export { generateTopoLines } from "./generators/topoLines/generateTopoLines";
export { generateDotMatrix } from "./generators/dotMatrix/generateDotMatrix";
export { generateMeshGradient } from "./generators/meshGradient/generateMeshGradient";
export { generateNoiseGrid } from "./generators/noiseGrid/generateNoiseGrid";
export { generateBauhausPattern } from "./generators/bauhausPattern/generateBauhausPattern";

export { defaultBlobConfig } from "./generators/blob/defaults";
export { defaultWaveConfig } from "./generators/wave/defaults";
export { defaultBlurryGradientConfig } from "./generators/gradient/defaults";
export { defaultBlobSceneConfig } from "./generators/scene/defaults";
export { defaultLowPolyGridConfig } from "./generators/lowPoly/defaults";
export { defaultLayeredPeaksConfig } from "./generators/peaks/defaults";
export { defaultTopoLinesConfig } from "./generators/topoLines/defaults";
export { defaultDotMatrixConfig } from "./generators/dotMatrix/defaults";
export { defaultMeshGradientConfig } from "./generators/meshGradient/defaults";
export { defaultNoiseGridConfig } from "./generators/noiseGrid/defaults";
export { defaultBauhausPatternConfig } from "./generators/bauhausPattern/defaults";

export type { BlobConfig } from "./generators/blob/types";
export type { WaveConfig } from "./generators/wave/types";
export type { BlurryGradientConfig } from "./generators/gradient/types";
export type { BlobSceneConfig } from "./generators/scene/types";
export type { LowPolyGridConfig } from "./generators/lowPoly/types";
export type { LayeredPeaksConfig } from "./generators/peaks/types";
export type { TopoLinesConfig } from "./generators/topoLines/types";
export type { DotMatrixConfig } from "./generators/dotMatrix/types";
export type { MeshGradientConfig } from "./generators/meshGradient/types";
export type { NoiseGridConfig } from "./generators/noiseGrid/types";
export type { BauhausPatternConfig } from "./generators/bauhausPattern/types";

export type {
  BaseGeneratorConfig,
  GeneratorOutput,
  GeneratorType,
  RandomFn,
  SeededRandom,
  Point,
} from "./core/types";

export { createSeededRandom } from "./core/random";
export { interpolatePalette, randomColorFromPalette } from "./core/color";
export { svgToDataUri } from "./core/dataUri";
export {
  presetPalettes,
  getRandomPalette,
  generateRandomPalette,
} from "./presets/palettes";
export { canvasSizePresets } from "./presets/canvasSizes";

import { generateBlob } from "./generators/blob/generateBlob";
import { generateWave } from "./generators/wave/generateWave";
import { generateLayeredWaves } from "./generators/wave/generateLayeredWaves";
import { generateStackedWaves } from "./generators/wave/generateStackedWaves";
import { generateBlurryGradient } from "./generators/gradient/generateBlurryGradient";
import { generateBlobScene } from "./generators/scene/generateBlobScene";
import { generateLowPolyGrid } from "./generators/lowPoly/generateLowPolyGrid";
import { generateLayeredPeaks } from "./generators/peaks/generateLayeredPeaks";
import { generateTopoLines } from "./generators/topoLines/generateTopoLines";
import { generateDotMatrix } from "./generators/dotMatrix/generateDotMatrix";
import { generateMeshGradient } from "./generators/meshGradient/generateMeshGradient";
import { generateNoiseGrid } from "./generators/noiseGrid/generateNoiseGrid";
import { generateBauhausPattern } from "./generators/bauhausPattern/generateBauhausPattern";

export function generatePattern(input: {
  type: GeneratorType;
  config: unknown;
}): GeneratorOutput {
  switch (input.type) {
    case "blob":
      return generateBlob(input.config as Parameters<typeof generateBlob>[0]);
    case "wave":
      return generateWave(input.config as Parameters<typeof generateWave>[0]);
    case "layeredWaves":
      return generateLayeredWaves(input.config as Parameters<typeof generateLayeredWaves>[0]);
    case "stackedWaves":
      return generateStackedWaves(input.config as Parameters<typeof generateStackedWaves>[0]);
    case "blurryGradient":
      return generateBlurryGradient(input.config as Parameters<typeof generateBlurryGradient>[0]);
    case "blobScene":
      return generateBlobScene(input.config as Parameters<typeof generateBlobScene>[0]);
    case "lowPolyGrid":
      return generateLowPolyGrid(input.config as Parameters<typeof generateLowPolyGrid>[0]);
    case "layeredPeaks":
      return generateLayeredPeaks(input.config as Parameters<typeof generateLayeredPeaks>[0]);
    case "topoLines":
      return generateTopoLines(input.config as Parameters<typeof generateTopoLines>[0]);
    case "dotMatrix":
      return generateDotMatrix(input.config as Parameters<typeof generateDotMatrix>[0]);
    case "meshGradient":
      return generateMeshGradient(input.config as Parameters<typeof generateMeshGradient>[0]);
    case "noiseGrid":
      return generateNoiseGrid(input.config as Parameters<typeof generateNoiseGrid>[0]);
    case "bauhausPattern":
      return generateBauhausPattern(input.config as Parameters<typeof generateBauhausPattern>[0]);
    default:
      throw new Error(`Unknown generator type: ${(input as { type: string }).type}`);
  }
}
