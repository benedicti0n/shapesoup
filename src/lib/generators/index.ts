import { blobGenerator, BlobConfig } from "@/lib/generators/blob";
import { waveGenerator, WaveConfig } from "@/lib/generators/wave";
import { blurryGradientGenerator, BlurryGradientConfig } from "@/lib/generators/blurryGradient";
import { Generator } from "@/lib/types/generator";

export type GeneratorConfig = BlobConfig | WaveConfig | BlurryGradientConfig;

export const generators: Generator<GeneratorConfig>[] = [
  blobGenerator as Generator<GeneratorConfig>,
  waveGenerator as Generator<GeneratorConfig>,
  blurryGradientGenerator as Generator<GeneratorConfig>,
];

export { blobGenerator, waveGenerator, blurryGradientGenerator };
export type { BlobConfig, WaveConfig, BlurryGradientConfig };
