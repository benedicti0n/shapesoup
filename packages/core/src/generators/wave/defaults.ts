import { WaveConfig } from "./types";

export const defaultWaveConfig: Required<
  Omit<WaveConfig, "width" | "height" | "seed">
> = {
  amplitude: 80,
  frequency: 0.01,
  points: 10,
  layerCount: 4,
  colors: ["#0ea5e9", "#6366f1", "#a855f7"],
};
