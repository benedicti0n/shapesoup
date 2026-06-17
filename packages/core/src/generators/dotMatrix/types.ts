export type DotMatrixConfig = {
  width: number;
  height: number;
  seed?: string | number;
  columns?: number;
  rows?: number;
  minRadius?: number;
  maxRadius?: number;
  jitter?: number;
  density?: number;
  colors?: string[];
  backgroundColor?: string;
};
