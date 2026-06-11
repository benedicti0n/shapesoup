import { create } from "zustand";
import { Generator as GeneratorType, GeneratorResult } from "@/lib/types/generator";
import {
  blobGenerator,
  waveGenerator,
  blurryGradientGenerator,
  blobSceneGenerator,
  layeredWavesGenerator,
  stackedWavesGenerator,
  lowPolyGridGenerator,
  layeredPeaksGenerator,
} from "@/lib/generators";
import { BlobConfig } from "@/lib/generators/blob";
import { WaveConfig } from "@/lib/generators/wave";
import { BlurryGradientConfig } from "@/lib/generators/blurryGradient";
import { BlobSceneConfig } from "@/lib/generators/blobScene";
import { LayeredWavesConfig } from "@/lib/generators/layeredWaves";
import { StackedWavesConfig } from "@/lib/generators/stackedWaves";
import { LowPolyGridConfig } from "@/lib/generators/lowPolyGrid";
import { LayeredPeaksConfig } from "@/lib/generators/layeredPeaks";
import { getRandomPalette } from "@/lib/utils/palettes";
import { createSeededRandom } from "@/lib/utils/seededRandom";

export type GeneratorName =
  | "Blob"
  | "Wave"
  | "Blurry Gradient"
  | "Blob Scene"
  | "Layered Waves"
  | "Stacked Waves"
  | "Low Poly Grid"
  | "Layered Peaks";

interface GeneratorConfigs {
  Blob: BlobConfig;
  Wave: WaveConfig;
  "Blurry Gradient": BlurryGradientConfig;
  "Blob Scene": BlobSceneConfig;
  "Layered Waves": LayeredWavesConfig;
  "Stacked Waves": StackedWavesConfig;
  "Low Poly Grid": LowPolyGridConfig;
  "Layered Peaks": LayeredPeaksConfig;
}

const defaultWidth = 800;
const defaultHeight = 600;

const defaultConfigs: GeneratorConfigs = {
  Blob: {
    width: defaultWidth,
    height: defaultHeight,
    complexity: 8,
    contrast: 0.4,
    colors: ["#6366f1", "#a855f7", "#ec4899"],
  },
  Wave: {
    width: defaultWidth,
    height: defaultHeight,
    amplitude: 80,
    frequency: 0.01,
    points: 10,
    colors: ["#0ea5e9", "#6366f1", "#a855f7"],
  },
  "Blurry Gradient": {
    width: defaultWidth,
    height: defaultHeight,
    blobCount: 5,
    blurAmount: 40,
    colors: ["#f43f5e", "#f97316", "#eab308"],
  },
  "Blob Scene": {
    width: defaultWidth,
    height: defaultHeight,
    groupCount: 2,
    layersPerGroup: 5,
    complexity: 12,
    contrast: 0.3,
    size: 1.2,
    colors: ["#0f766e", "#14b8a6", "#5eead4", "#ccfbf1"],
  },
  "Layered Waves": {
    width: defaultWidth,
    height: defaultHeight,
    layerCount: 4,
    amplitude: 60,
    frequency: 0.008,
    points: 12,
    colors: ["#0ea5e9", "#6366f1", "#a855f7", "#ec4899"],
  },
  "Stacked Waves": {
    width: defaultWidth,
    height: defaultHeight,
    layerCount: 5,
    amplitude: 50,
    frequency: 0.012,
    points: 14,
    colors: ["#14b8a6", "#0ea5e9", "#6366f1", "#a855f7"],
  },
  "Low Poly Grid": {
    width: defaultWidth,
    height: defaultHeight,
    cols: 8,
    rows: 6,
    jitter: 0.4,
    colors: ["#f43f5e", "#f97316", "#eab308", "#84cc16"],
  },
  "Layered Peaks": {
    width: defaultWidth,
    height: defaultHeight,
    layerCount: 5,
    peakCount: 8,
    roughness: 0.4,
    colors: ["#1e293b", "#334155", "#475569", "#64748b", "#94a3b8"],
  },
};

function generateRandomSeed(): string {
  return Math.random().toString(36).substring(2, 10);
}

interface PlaygroundState {
  activeGenerator: GeneratorName;
  configs: GeneratorConfigs;
  seed: string;
  result: GeneratorResult | null;
  copiedSvg: boolean;
  copiedJsx: boolean;

  setActiveGenerator: (name: GeneratorName) => void;
  updateConfig: <K extends GeneratorName>(
    generator: K,
    updates: Partial<GeneratorConfigs[K]>
  ) => void;
  setSeed: (seed: string) => void;
  randomizeSeed: () => void;
  randomizeAll: () => void;
  setCanvasSize: (width: number, height: number) => void;
  regenerate: () => void;
  setCopiedSvg: (value: boolean) => void;
  setCopiedJsx: (value: boolean) => void;
}

function getGenerator(name: GeneratorName) {
  switch (name) {
    case "Blob":
      return blobGenerator;
    case "Wave":
      return waveGenerator;
    case "Blurry Gradient":
      return blurryGradientGenerator;
    case "Blob Scene":
      return blobSceneGenerator;
    case "Layered Waves":
      return layeredWavesGenerator;
    case "Stacked Waves":
      return stackedWavesGenerator;
    case "Low Poly Grid":
      return lowPolyGridGenerator;
    case "Layered Peaks":
      return layeredPeaksGenerator;
  }
}

function computeResult(
  activeGenerator: GeneratorName,
  configs: GeneratorConfigs,
  seed: string
): GeneratorResult {
  const generator = getGenerator(activeGenerator);
  return (generator as GeneratorType<unknown>).generate(
    configs[activeGenerator] as unknown,
    seed
  );
}

export const usePlaygroundStore = create<PlaygroundState>((set, get) => ({
  activeGenerator: "Blob",
  configs: structuredClone(defaultConfigs),
  seed: generateRandomSeed(),
  result: computeResult("Blob", structuredClone(defaultConfigs), generateRandomSeed()),
  copiedSvg: false,
  copiedJsx: false,

  setActiveGenerator: (name) => {
    const { configs, seed } = get();
    set({
      activeGenerator: name,
      result: computeResult(name, configs, seed),
      copiedSvg: false,
      copiedJsx: false,
    });
  },

  updateConfig: (generator, updates) => {
    const { configs, seed } = get();
    const newConfigs = {
      ...configs,
      [generator]: { ...configs[generator], ...updates },
    };
    set({
      configs: newConfigs,
      result: computeResult(get().activeGenerator, newConfigs, seed),
      copiedSvg: false,
      copiedJsx: false,
    });
  },

  setSeed: (seed) => {
    const { configs, activeGenerator } = get();
    set({
      seed,
      result: computeResult(activeGenerator, configs, seed),
      copiedSvg: false,
      copiedJsx: false,
    });
  },

  randomizeSeed: () => {
    const newSeed = generateRandomSeed();
    const { configs, activeGenerator } = get();
    set({
      seed: newSeed,
      result: computeResult(activeGenerator, configs, newSeed),
      copiedSvg: false,
      copiedJsx: false,
    });
  },

  randomizeAll: () => {
    const newSeed = generateRandomSeed();
    const { configs, activeGenerator } = get();
    const rng = createSeededRandom(newSeed);
    const newColors = getRandomPalette(rng.random);

    const newConfigs = {
      ...configs,
      [activeGenerator]: {
        ...configs[activeGenerator],
        colors: newColors,
      },
    };

    set({
      seed: newSeed,
      configs: newConfigs,
      result: computeResult(activeGenerator, newConfigs, newSeed),
      copiedSvg: false,
      copiedJsx: false,
    });
  },

  setCanvasSize: (width, height) => {
    const { configs, activeGenerator, seed } = get();
    const newConfigs = {
      ...configs,
      [activeGenerator]: {
        ...configs[activeGenerator],
        width,
        height,
      },
    };
    set({
      configs: newConfigs,
      result: computeResult(activeGenerator, newConfigs, seed),
      copiedSvg: false,
      copiedJsx: false,
    });
  },

  regenerate: () => {
    const { activeGenerator, configs, seed } = get();
    set({
      result: computeResult(activeGenerator, configs, seed),
    });
  },

  setCopiedSvg: (value) => set({ copiedSvg: value }),
  setCopiedJsx: (value) => set({ copiedJsx: value }),
}));
