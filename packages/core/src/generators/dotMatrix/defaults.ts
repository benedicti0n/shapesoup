import { DotMatrixConfig } from "./types";

export const defaultDotMatrixConfig: Required<
  Omit<DotMatrixConfig, "width" | "height" | "seed">
> = {
  columns: 16,
  rows: 12,
  minRadius: 2,
  maxRadius: 20,
  jitter: 0.3,
  density: 0.85,
  colors: ["#0f172a", "#334155", "#64748b", "#94a3b8"],
  backgroundColor: "#f1f5f9",
};
