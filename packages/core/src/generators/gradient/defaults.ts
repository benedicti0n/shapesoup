import { BlurryGradientConfig } from "./types";

export const defaultBlurryGradientConfig: Required<
  Omit<BlurryGradientConfig, "width" | "height" | "seed">
> = {
  blobCount: 7,
  blurAmount: 65,
  colors: ["#6366f1", "#a855f7", "#ec4899", "#f97316", "#facc15"],
  backgroundColor: "#0f0a1a",
  grain: false,
};