export type BlurryGradientConfig = {
  width: number;
  height: number;
  seed?: string | number;
  blobCount?: number;
  blurAmount?: number;
  colors?: string[];
  backgroundColor?: string;
  grain?: boolean;
};