import { Point } from "@/lib/utils/paths";
import { RandomFn } from "@/lib/types/generator";

export function pointOnCircle(
  cx: number,
  cy: number,
  radius: number,
  angle: number
): Point {
  return {
    x: cx + radius * Math.cos(angle),
    y: cy + radius * Math.sin(angle),
  };
}

export function samplePoints(
  count: number,
  width: number,
  height: number,
  randomFn: RandomFn
): Point[] {
  const points: Point[] = [];
  for (let i = 0; i < count; i++) {
    points.push({
      x: randomFn() * width,
      y: randomFn() * height,
    });
  }
  return points;
}

export function distance(a: Point, b: Point): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}
