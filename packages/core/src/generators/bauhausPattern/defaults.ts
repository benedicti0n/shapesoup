import { BauhausPatternConfig } from "./types";

export const defaultBauhausPatternConfig: Required<
  Omit<BauhausPatternConfig, "width" | "height" | "seed">
> = {
  shapeCount: 18,
  minSize: 30,
  maxSize: 180,
  strokeWidth: 3,
  colors: ["#dc2626", "#2563eb", "#f59e0b", "#1f2937", "#f3f4f6"],
  backgroundColor: "#fef3c7",
  allowStrokeOnly: true,
};
