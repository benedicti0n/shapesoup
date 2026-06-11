import { LayeredPeaksConfig } from "./types";

export const defaultLayeredPeaksConfig: Required<
  Omit<LayeredPeaksConfig, "width" | "height" | "seed">
> = {
  layerCount: 5,
  peakCount: 8,
  roughness: 0.4,
  colors: ["#1e293b", "#334155", "#475569", "#64748b", "#94a3b8"],
};
