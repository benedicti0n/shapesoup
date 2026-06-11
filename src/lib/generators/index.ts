import { blobGenerator, BlobConfig } from "@/lib/generators/blob";
import { waveGenerator, WaveConfig } from "@/lib/generators/wave";
import { blurryGradientGenerator, BlurryGradientConfig } from "@/lib/generators/blurryGradient";
import { blobSceneGenerator, BlobSceneConfig } from "@/lib/generators/blobScene";
import { layeredWavesGenerator, LayeredWavesConfig } from "@/lib/generators/layeredWaves";
import { stackedWavesGenerator, StackedWavesConfig } from "@/lib/generators/stackedWaves";
import { lowPolyGridGenerator, LowPolyGridConfig } from "@/lib/generators/lowPolyGrid";
import { layeredPeaksGenerator, LayeredPeaksConfig } from "@/lib/generators/layeredPeaks";
import { Generator } from "@/lib/types/generator";

export type GeneratorConfig =
  | BlobConfig
  | WaveConfig
  | BlurryGradientConfig
  | BlobSceneConfig
  | LayeredWavesConfig
  | StackedWavesConfig
  | LowPolyGridConfig
  | LayeredPeaksConfig;

export const generators: Generator<GeneratorConfig>[] = [
  blobGenerator as Generator<GeneratorConfig>,
  waveGenerator as Generator<GeneratorConfig>,
  blurryGradientGenerator as Generator<GeneratorConfig>,
  blobSceneGenerator as Generator<GeneratorConfig>,
  layeredWavesGenerator as Generator<GeneratorConfig>,
  stackedWavesGenerator as Generator<GeneratorConfig>,
  lowPolyGridGenerator as Generator<GeneratorConfig>,
  layeredPeaksGenerator as Generator<GeneratorConfig>,
];

export {
  blobGenerator,
  waveGenerator,
  blurryGradientGenerator,
  blobSceneGenerator,
  layeredWavesGenerator,
  stackedWavesGenerator,
  lowPolyGridGenerator,
  layeredPeaksGenerator,
};

export type {
  BlobConfig,
  WaveConfig,
  BlurryGradientConfig,
  BlobSceneConfig,
  LayeredWavesConfig,
  StackedWavesConfig,
  LowPolyGridConfig,
  LayeredPeaksConfig,
};
