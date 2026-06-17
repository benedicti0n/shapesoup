import { TopoLinesConfig } from "./types";

export const defaultTopoLinesConfig: Required<
  Omit<TopoLinesConfig, "width" | "height" | "seed">
> = {
  lineCount: 12,
  amplitude: 60,
  frequency: 0.008,
  noise: 0.5,
  strokeWidth: 1.5,
  spacing: 50,
  colors: ["#1e293b", "#38bdf8", "#a78bfa", "#f472b6"],
  backgroundColor: "#f8fafc",
};
