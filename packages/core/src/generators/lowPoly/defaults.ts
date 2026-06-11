import { LowPolyGridConfig } from "./types";

export const defaultLowPolyGridConfig: Required<
  Omit<LowPolyGridConfig, "width" | "height" | "seed">
> = {
  cols: 8,
  rows: 6,
  jitter: 0.4,
  colors: ["#f43f5e", "#f97316", "#eab308", "#84cc16"],
};
