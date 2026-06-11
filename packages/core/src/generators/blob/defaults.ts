import { BlobConfig } from "./types";

export const defaultBlobConfig: Required<
  Omit<BlobConfig, "width" | "height" | "seed">
> = {
  complexity: 8,
  contrast: 0.4,
  colors: ["#6366f1", "#a855f7", "#ec4899"],
};
