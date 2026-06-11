import { BlobSceneConfig } from "./types";

export const defaultBlobSceneConfig: Required<
  Omit<BlobSceneConfig, "width" | "height" | "seed">
> = {
  groupCount: 2,
  layersPerGroup: 5,
  complexity: 12,
  contrast: 0.3,
  size: 1.2,
  colors: ["#0f766e", "#14b8a6", "#5eead4", "#ccfbf1"],
};
