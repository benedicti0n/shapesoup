import { GeneratorOutput } from "../../core/types";
import { createSeededRandom } from "../../core/random";
import { createSvgRoot } from "../../core/svg";
import { interpolatePalette } from "../../core/color";
import { svgToDataUri } from "../../core/dataUri";
import { LowPolyGridConfig } from "./types";
import { defaultLowPolyGridConfig } from "./defaults";
import { Delaunay } from "d3-delaunay";

export function generateLowPolyGrid(rawConfig: LowPolyGridConfig): GeneratorOutput {
  const config = { ...defaultLowPolyGridConfig, ...rawConfig };
  const { width, height, cols, rows, jitter, colors } = config;
  const seed = String(config.seed ?? Math.random().toString(36).slice(2, 10));
  const rng = createSeededRandom(seed);

  const colCount = Math.max(3, Math.round(cols));
  const rowCount = Math.max(3, Math.round(rows));
  const jitterAmount = Math.max(0, Math.min(1, jitter));

  const colStep = width / (colCount - 1);
  const rowStep = height / (rowCount - 1);

  const points: [number, number][] = [];

  for (let r = 0; r < rowCount; r++) {
    for (let c = 0; c < colCount; c++) {
      const baseX = c * colStep;
      const baseY = r * rowStep;

      const jx = (rng.randomFloat(-1, 1) * colStep * 0.5) * jitterAmount;
      const jy = (rng.randomFloat(-1, 1) * rowStep * 0.5) * jitterAmount;

      const x = Math.max(0, Math.min(width, baseX + jx));
      const y = Math.max(0, Math.min(height, baseY + jy));

      points.push([x, y]);
    }
  }

  const delaunay = Delaunay.from(points);
  const triangles: string[] = [];

  for (let i = 0; i < delaunay.triangles.length; i += 3) {
    const i0 = delaunay.triangles[i];
    const i1 = delaunay.triangles[i + 1];
    const i2 = delaunay.triangles[i + 2];

    const p0 = points[i0];
    const p1 = points[i1];
    const p2 = points[i2];

    const cx = (p0[0] + p1[0] + p2[0]) / 3;
    const cy = (p0[1] + p1[1] + p2[1]) / 3;

    const t = ((cx / width) + (cy / height)) / 2;
    const fill = interpolatePalette(colors, t);

    const pathData = `M ${p0[0]} ${p0[1]} L ${p1[0]} ${p1[1]} L ${p2[0]} ${p2[1]} Z`;
    triangles.push(`<path d="${pathData}" fill="${fill}" stroke="none" />`);
  }

  const children = triangles.join("");
  const svg = createSvgRoot({ width, height, viewBox: `0 0 ${width} ${height}` }, children);

  return {
    svg,
    dataUri: svgToDataUri(svg),
    metadata: {
      generator: "lowPolyGrid",
      seed,
      width,
      height,
      elements: triangles.length,
    },
  };
}
