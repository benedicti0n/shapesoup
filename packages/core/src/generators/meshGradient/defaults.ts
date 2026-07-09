import { MeshGradientConfig } from "./types";

export const defaultMeshGradientConfig: Required<
  Omit<MeshGradientConfig, "width" | "height" | "seed">
> = {
  blobCount: 8,
  blur: 70,
  opacity: 0.9,
  minRadius: 180,
  maxRadius: 520,
  colors: ["#22c55e", "#14b8a6", "#84cc16", "#0f766e", "#bef264"],
  backgroundColor: "#ecfdf5",
};