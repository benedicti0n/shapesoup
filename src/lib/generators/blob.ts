import { Generator, GeneratorResult } from "@/lib/types/generator";
import { createSeededRandom } from "@/lib/utils/seededRandom";
import { createSvgRoot } from "@/lib/utils/svg";
import { smoothClosedPath, Point } from "@/lib/utils/paths";
import { pointOnCircle } from "@/lib/utils/geometry";
import { randomColorFromPalette } from "@/lib/utils/colors";

export interface BlobConfig {
  width: number;
  height: number;
  complexity: number;
  contrast: number;
  colors: string[];
}

export const blobGenerator: Generator<BlobConfig> = {
  name: "Blob",
  generate(config, seed): GeneratorResult {
    const { width, height, complexity, contrast, colors } = config;
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

    const jsx = createSvgRoot({ width, height, viewBox: `0 0 ${width} ${height}` }, pathElement)
      .replace(/xmlns="http:\/\/www\.w3\.org\/2000\/svg"/g, "")
      .replace(/class=/g, "className=")
      .trim();

    return {
      svg,
      jsx,
      metadata: {
        width,
        height,
        viewBox: `0 0 ${width} ${height}`,
        elements: 1,
      },
    };
  },
};
