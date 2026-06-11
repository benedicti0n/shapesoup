import { GeneratorType, GeneratorOutput } from "./core/types";

export { generateBlob } from "./generators/blob/generateBlob";
export { generateWave } from "./generators/wave/generateWave";
export { generateLayeredWaves } from "./generators/wave/generateLayeredWaves";
export { generateStackedWaves } from "./generators/wave/generateStackedWaves";
export { generateBlurryGradient } from "./generators/gradient/generateBlurryGradient";
export { generateBlobScene } from "./generators/scene/generateBlobScene";
export { generateLowPolyGrid } from "./generators/lowPoly/generateLowPolyGrid";
export { generateLayeredPeaks } from "./generators/peaks/generateLayeredPeaks";

export { defaultBlobConfig } from "./generators/blob/defaults";
export { defaultWaveConfig } from "./generators/wave/defaults";
export { defaultBlurryGradientConfig } from "./generators/gradient/defaults";
export { defaultBlobSceneConfig } from "./generators/scene/defaults";
export { defaultLowPolyGridConfig } from "./generators/lowPoly/defaults";
export { defaultLayeredPeaksConfig } from "./generators/peaks/defaults";

export type { BlobConfig } from "./generators/blob/types";
export type { WaveConfig } from "./generators/wave/types";
export type { BlurryGradientConfig } from "./generators/gradient/types";
export type { BlobSceneConfig } from "./generators/scene/types";
export type { LowPolyGridConfig } from "./generators/lowPoly/types";
export type { LayeredPeaksConfig } from "./generators/peaks/types";

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
    default:
      throw new Error(`Unknown generator type: ${(input as { type: string }).type}`);
  }
}
