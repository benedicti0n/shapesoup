import { Generator, GeneratorResult } from "@/lib/types/generator";
import { createSeededRandom } from "@/lib/utils/seededRandom";
import { createSvgRoot } from "@/lib/utils/svg";
import { interpolatePalette } from "@/lib/utils/colors";
import { Delaunay } from "d3-delaunay";

export interface LowPolyGridConfig {
  width: number;
  height: number;
  cols: number;
  rows: number;
  jitter: number;
  colors: string[];
}

export const lowPolyGridGenerator: Generator<LowPolyGridConfig> = {
  name: "Low Poly Grid",
  generate(config, seed): GeneratorResult {
    const { width, height, cols, rows, jitter, colors } = config;
    const rng = createSeededRandom(seed);

    const colCount = Math.max(3, Math.round(cols));
    const rowCount = Math.max(3, Math.round(rows));
    const jitterAmount = Math.max(0, Math.min(1, jitter));

    const colStep = width / (colCount - 1);
    const rowStep = height / (rowCount - 1);

    const points: [number, number][] = [];
    const pointKeys: string[] = [];

    for (let r = 0; r < rowCount; r++) {
      for (let c = 0; c < colCount; c++) {
        const baseX = c * colStep;
        const baseY = r * rowStep;

        const jx = (rng.randomFloat(-1, 1) * colStep * 0.5) * jitterAmount;
        const jy = (rng.randomFloat(-1, 1) * rowStep * 0.5) * jitterAmount;

        const x = Math.max(0, Math.min(width, baseX + jx));
        const y = Math.max(0, Math.min(height, baseY + jy));

        points.push([x, y]);
        pointKeys.push(`${c}-${r}`);
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
    const svg = createSvgRoot(
      { width, height, viewBox: `0 0 ${width} ${height}` },
      children
    );

    const jsx = svg
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
        elements: triangles.length,
      },
    };
  },
};
