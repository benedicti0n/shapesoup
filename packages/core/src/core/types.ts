export type BaseGeneratorConfig = {
  width: number;
  height: number;
  seed?: string | number;
  background?: string;
  colors?: string[];
};

export type GeneratorOutput = {
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

export type GeneratorType =
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

export type { RandomFn, SeededRandom } from "./random";
export type { Point } from "./path";
