import { create } from "zustand";
import { Generator as GeneratorType, GeneratorResult } from "@/lib/types/generator";
import {
  generators,
  blobGenerator,
  waveGenerator,
  blurryGradientGenerator,
} from "@/lib/generators";
import { BlobConfig } from "@/lib/generators/blob";
import { WaveConfig } from "@/lib/generators/wave";
import { BlurryGradientConfig } from "@/lib/generators/blurryGradient";

export type GeneratorName = "Blob" | "Wave" | "Blurry Gradient";

interface GeneratorConfigs {
  Blob: BlobConfig;
  Wave: WaveConfig;
  "Blurry Gradient": BlurryGradientConfig;
}

const defaultConfigs: GeneratorConfigs = {
  Blob: {
    width: 800,
    height: 600,
    complexity: 8,
    contrast: 0.4,
    colors: ["#6366f1", "#a855f7", "#ec4899"],
  },
  Wave: {
    width: 800,
    height: 600,
    amplitude: 80,
    frequency: 0.01,
    points: 10,
    colors: ["#0ea5e9", "#6366f1", "#a855f7"],
  },
  "Blurry Gradient": {
    width: 800,
    height: 600,
    blobCount: 5,
    blurAmount: 40,
    colors: ["#f43f5e", "#f97316", "#eab308"],
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
  configs: { ...defaultConfigs },
  seed: generateRandomSeed(),
  result: computeResult("Blob", defaultConfigs, generateRandomSeed()),
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

  regenerate: () => {
    const { activeGenerator, configs, seed } = get();
    set({
      result: computeResult(activeGenerator, configs, seed),
    });
  },

  setCopiedSvg: (value) => set({ copiedSvg: value }),
  setCopiedJsx: (value) => set({ copiedJsx: value }),
}));
