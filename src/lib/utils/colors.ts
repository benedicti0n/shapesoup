import { interpolate, formatHex, parse } from "culori";
import { RandomFn } from "@/lib/types/generator";

export function interpolatePalette(
  colors: string[],
  t: number
): string {
  if (colors.length === 0) return "#000000";
  if (colors.length === 1) return colors[0];

  const clampedT = Math.max(0, Math.min(1, t));
  const scaledT = clampedT * (colors.length - 1);
  const index = Math.floor(scaledT);
  const localT = scaledT - index;

  const colorA = colors[index];
  const colorB = colors[Math.min(index + 1, colors.length - 1)];

  const parsedA = parse(colorA);
  const parsedB = parse(colorB);

  if (!parsedA || !parsedB) return colorA;

  const interpolator = interpolate([parsedA, parsedB], "oklab");
  const result = interpolator(localT);
  return formatHex(result) ?? colorA;
}

export function randomColorFromPalette(
  palette: string[],
  randomFn: RandomFn
): string {
  if (palette.length === 0) return "#000000";
  const index = Math.floor(randomFn() * palette.length);
  return palette[Math.min(index, palette.length - 1)];
}
