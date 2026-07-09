import { create } from "zustand";
import {
  generateBlob,
  generateWave,
  generateLayeredWaves,
  generateStackedWaves,
  generateBlurryGradient,
  generateBlobScene,
  generateLowPolyGrid,
  generateLayeredPeaks,
  generateTopoLines,
  generateDotMatrix,
  generateMeshGradient,
  generateNoiseGrid,
  generateBauhausPattern,
  createSeededRandom,
  getRandomPalette,
  type BlobConfig,
  type WaveConfig,
  type BlurryGradientConfig,
  type BlobSceneConfig,
  type LowPolyGridConfig,
  type LayeredPeaksConfig,
  type TopoLinesConfig,
  type DotMatrixConfig,
  type MeshGradientConfig,
  type NoiseGridConfig,
  type BauhausPatternConfig,
  type GeneratorOutput,
} from "@shapesoup/core";
import { svgToJsx } from "@/lib/utils/export";

export type GeneratorName =
  | "Blob"
  | "Wave"
  | "Blurry Gradient"
  | "Blob Scene"
  | "Layered Waves"
  | "Stacked Waves"
  | "Low Poly Grid"
  | "Layered Peaks"
  | "Topographic Lines"
  | "Dot Matrix"
  | "Mesh Gradient"
  | "Noise Grid"
  | "Bauhaus Pattern";

type WebGeneratorResult = GeneratorOutput & { jsx: string };

interface GeneratorConfigs {
  Blob: BlobConfig;
  Wave: WaveConfig;
  "Blurry Gradient": BlurryGradientConfig;
  "Blob Scene": BlobSceneConfig;
  "Layered Waves": WaveConfig;
  "Stacked Waves": WaveConfig;
  "Low Poly Grid": LowPolyGridConfig;
  "Layered Peaks": LayeredPeaksConfig;
  "Topographic Lines": TopoLinesConfig;
  "Dot Matrix": DotMatrixConfig;
  "Mesh Gradient": MeshGradientConfig;
  "Noise Grid": NoiseGridConfig;
  "Bauhaus Pattern": BauhausPatternConfig;
}

const defaultWidth = 800;
const defaultHeight = 600;

export const defaultConfigs: GeneratorConfigs = {
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
    blobCount: 7,
    blurAmount: 65,
    colors: ["#6366f1", "#a855f7", "#ec4899", "#f97316", "#facc15"],
    backgroundColor: "#0f0a1a",
    grain: false,
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
  "Topographic Lines": {
    width: defaultWidth,
    height: defaultHeight,
    lineCount: 12,
    amplitude: 60,
    frequency: 0.008,
    noise: 0.5,
    strokeWidth: 1.5,
    spacing: 50,
    colors: ["#1e293b", "#38bdf8", "#a78bfa", "#f472b6"],
    backgroundColor: "#f8fafc",
  },
  "Dot Matrix": {
    width: defaultWidth,
    height: defaultHeight,
    columns: 16,
    rows: 12,
    minRadius: 2,
    maxRadius: 20,
    jitter: 0.3,
    density: 0.85,
    colors: ["#0f172a", "#334155", "#64748b", "#94a3b8"],
    backgroundColor: "#f1f5f9",
  },
  "Mesh Gradient": {
    width: defaultWidth,
    height: defaultHeight,
    blobCount: 8,
    blur: 70,
    opacity: 0.9,
    minRadius: 180,
    maxRadius: 520,
    colors: ["#22c55e", "#14b8a6", "#84cc16", "#0f766e", "#bef264"],
    backgroundColor: "#ecfdf5",
  },
  "Noise Grid": {
    width: defaultWidth,
    height: defaultHeight,
    cellSize: 30,
    density: 0.6,
    shapeSize: 0.7,
    jitter: 0.4,
    strokeWidth: 1.5,
    colors: ["#1e293b", "#475569", "#94a3b8", "#cbd5e1"],
    backgroundColor: "#f8fafc",
  },
  "Bauhaus Pattern": {
    width: defaultWidth,
    height: defaultHeight,
    shapeCount: 18,
    minSize: 30,
    maxSize: 180,
    strokeWidth: 3,
    colors: ["#dc2626", "#2563eb", "#f59e0b", "#1f2937", "#f3f4f6"],
    backgroundColor: "#fef3c7",
    allowStrokeOnly: true,
  },
};

function generateRandomSeed(): string {
  return Math.random().toString(36).substring(2, 10);
}

function wrapWithJsx(output: GeneratorOutput): WebGeneratorResult {
  return {
    ...output,
    jsx: svgToJsx(output.svg),
  };
}

function computeResult(
  activeGenerator: GeneratorName,
  configs: GeneratorConfigs,
  seed: string
): WebGeneratorResult {
  const config = { ...configs[activeGenerator], seed };

  switch (activeGenerator) {
    case "Blob":
      return wrapWithJsx(generateBlob(config));
    case "Wave":
      return wrapWithJsx(generateWave(config));
    case "Blurry Gradient":
      return wrapWithJsx(generateBlurryGradient(config));
    case "Blob Scene":
      return wrapWithJsx(generateBlobScene(config));
    case "Layered Waves":
      return wrapWithJsx(generateLayeredWaves(config));
    case "Stacked Waves":
      return wrapWithJsx(generateStackedWaves(config));
    case "Low Poly Grid":
      return wrapWithJsx(generateLowPolyGrid(config));
    case "Layered Peaks":
      return wrapWithJsx(generateLayeredPeaks(config));
    case "Topographic Lines":
      return wrapWithJsx(generateTopoLines(config));
    case "Dot Matrix":
      return wrapWithJsx(generateDotMatrix(config));
    case "Mesh Gradient":
      return wrapWithJsx(generateMeshGradient(config));
    case "Noise Grid":
      return wrapWithJsx(generateNoiseGrid(config));
    case "Bauhaus Pattern":
      return wrapWithJsx(generateBauhausPattern(config));
  }
}

export function createInitialResult(
  generator: GeneratorName,
  configs: GeneratorConfigs,
  seed: string
): WebGeneratorResult {
  return computeResult(generator, configs, seed);
}

interface PlaygroundState {
  activeGenerator: GeneratorName;
  configs: GeneratorConfigs;
  seed: string;
  result: WebGeneratorResult | null;
  copiedSvg: boolean;
  copiedJsx: boolean;
  copiedLink: boolean;
  copiedCss: boolean;
  copiedReact: boolean;

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
  setCopiedLink: (value: boolean) => void;
  setCopiedCss: (value: boolean) => void;
  setCopiedReact: (value: boolean) => void;
  hydrate: (partial: {
    activeGenerator?: GeneratorName;
    seed?: string;
    configs?: Partial<GeneratorConfigs>;
  }) => void;
}

export const usePlaygroundStore = create<PlaygroundState>((set, get) => ({
  activeGenerator: "Blob",
  configs: structuredClone(defaultConfigs),
  seed: generateRandomSeed(),
  result: computeResult("Blob", structuredClone(defaultConfigs), generateRandomSeed()),
  copiedSvg: false,
  copiedJsx: false,
  copiedLink: false,
  copiedCss: false,
  copiedReact: false,

  setActiveGenerator: (name) => {
    const { configs, seed } = get();
    set({
      activeGenerator: name,
      result: computeResult(name, configs, seed),
      copiedSvg: false,
      copiedJsx: false,
      copiedLink: false,
      copiedCss: false,
      copiedReact: false,
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
      copiedLink: false,
      copiedCss: false,
      copiedReact: false,
    });
  },

  setSeed: (seed) => {
    const { configs, activeGenerator } = get();
    set({
      seed,
      result: computeResult(activeGenerator, configs, seed),
      copiedSvg: false,
      copiedJsx: false,
      copiedLink: false,
      copiedCss: false,
      copiedReact: false,
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
      copiedLink: false,
      copiedCss: false,
      copiedReact: false,
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
      copiedLink: false,
      copiedCss: false,
      copiedReact: false,
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
      copiedLink: false,
      copiedCss: false,
      copiedReact: false,
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
  setCopiedLink: (value) => set({ copiedLink: value }),
  setCopiedCss: (value) => set({ copiedCss: value }),
  setCopiedReact: (value) => set({ copiedReact: value }),

  hydrate: (partial) => {
    const current = get();
    const nextGenerator = partial.activeGenerator ?? current.activeGenerator;
    const nextSeed = partial.seed ?? current.seed;
    const nextConfigs = partial.configs
      ? ({
          ...current.configs,
          ...Object.fromEntries(
            Object.entries(partial.configs).map(([k, v]) => [
              k,
              { ...current.configs[k as GeneratorName], ...v },
            ])
          ),
        } as GeneratorConfigs)
      : current.configs;

    set({
      activeGenerator: nextGenerator,
      seed: nextSeed,
      configs: nextConfigs,
      result: computeResult(nextGenerator, nextConfigs, nextSeed),
    });
  },
}));
