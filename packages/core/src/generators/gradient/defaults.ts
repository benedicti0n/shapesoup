import { BlurryGradientConfig } from "./types";

export const defaultBlurryGradientConfig: Required<
  Omit<BlurryGradientConfig, "width" | "height" | "seed">
> = {
  blobCount: 5,
  blurAmount: 40,
  colors: ["#f43f5e", "#f97316", "#eab308"],
};
