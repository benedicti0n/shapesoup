import { NoiseGridConfig } from "./types";

export const defaultNoiseGridConfig: Required<
  Omit<NoiseGridConfig, "width" | "height" | "seed">
> = {
  cellSize: 30,
  density: 0.6,
  shapeSize: 0.7,
  jitter: 0.4,
  strokeWidth: 1.5,
  colors: ["#1e293b", "#475569", "#94a3b8", "#cbd5e1"],
  backgroundColor: "#f8fafc",
};
