import { MeshGradientConfig } from "./types";

export const defaultMeshGradientConfig: Required<
  Omit<MeshGradientConfig, "width" | "height" | "seed">
> = {
  blobCount: 6,
  blur: 50,
  opacity: 0.7,
  minRadius: 120,
  maxRadius: 350,
  colors: ["#c084fc", "#818cf8", "#38bdf8", "#2dd4bf", "#f472b6"],
  backgroundColor: "#0f172a",
};
