export type BauhausPatternConfig = {
  width: number;
  height: number;
  seed?: string | number;
  shapeCount?: number;
  minSize?: number;
  maxSize?: number;
  strokeWidth?: number;
  colors?: string[];
  backgroundColor?: string;
  allowStrokeOnly?: boolean;
};
