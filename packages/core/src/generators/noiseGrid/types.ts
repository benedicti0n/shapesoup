export type NoiseGridConfig = {
  width: number;
  height: number;
  seed?: string | number;
  cellSize?: number;
  density?: number;
  shapeSize?: number;
  jitter?: number;
  strokeWidth?: number;
  colors?: string[];
  backgroundColor?: string;
};
