import { GeneratorOutput } from "../../core/types";
import { createSeededRandom } from "../../core/random";
import { createSvgRoot } from "../../core/svg";
import { smoothClosedPath, Point } from "../../core/path";
import { pointOnCircle } from "../../core/geometry";
import { randomColorFromPalette } from "../../core/color";
import { svgToDataUri } from "../../core/dataUri";
import { BlobConfig } from "./types";
import { defaultBlobConfig } from "./defaults";

export function generateBlob(rawConfig: BlobConfig): GeneratorOutput {
  const config = { ...defaultBlobConfig, ...rawConfig };
  const { width, height, complexity, contrast, colors } = config;
  const seed = String(config.seed ?? Math.random().toString(36).slice(2, 10));
  const rng = createSeededRandom(seed);

  const cx = width / 2;
  const cy = height / 2;
  const baseRadius = Math.min(width, height) * 0.35;
  const pointCount = Math.max(3, Math.round(complexity));

  const points: Point[] = [];
  for (let i = 0; i < pointCount; i++) {
    const angle = (i / pointCount) * Math.PI * 2;
    const distortion = rng.randomFloat(1 - contrast, 1 + contrast);
    const radius = baseRadius * distortion;
    points.push(pointOnCircle(cx, cy, radius, angle));
  }

  const pathData = smoothClosedPath(points);
  const fill = randomColorFromPalette(colors, rng.random);

  const pathElement = `<path d="${pathData}" fill="${fill}" />`;
  const svg = createSvgRoot({ width, height, viewBox: `0 0 ${width} ${height}` }, pathElement);

  return {
    svg,
    dataUri: svgToDataUri(svg),
    metadata: {
      generator: "blob",
      seed,
      width,
      height,
      elements: 1,
    },
  };
}
