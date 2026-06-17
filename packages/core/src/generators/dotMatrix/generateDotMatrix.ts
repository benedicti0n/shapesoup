import { GeneratorOutput } from "../../core/types";
import { createSeededRandom } from "../../core/random";
import { createSvgRoot, createSvgElement } from "../../core/svg";
import { interpolatePalette } from "../../core/color";
import { svgToDataUri } from "../../core/dataUri";
import { DotMatrixConfig } from "./types";
import { defaultDotMatrixConfig } from "./defaults";

export function generateDotMatrix(rawConfig: DotMatrixConfig): GeneratorOutput {
  const config = { ...defaultDotMatrixConfig, ...rawConfig };
  const {
    width,
    height,
    columns,
    rows,
    minRadius,
    maxRadius,
    jitter,
    density,
    colors,
    backgroundColor,
  } = config;
  const seed = String(config.seed ?? Math.random().toString(36).slice(2, 10));
  const rng = createSeededRandom(seed);

  const cols = Math.max(4, Math.min(40, Math.round(columns)));
  const rowCount = Math.max(4, Math.min(30, Math.round(rows)));
  const safeMinRadius = Math.max(1, minRadius);
  const safeMaxRadius = Math.max(safeMinRadius + 1, maxRadius);
  const safeJitter = Math.max(0, Math.min(1, jitter));
  const safeDensity = Math.max(0.1, Math.min(1, density));

  const palette = colors.length > 0 ? colors : ["#0f172a", "#334155", "#64748b"];

  const background = createSvgElement("rect", {
    width,
    height,
    fill: backgroundColor,
  });

  const cellW = width / cols;
  const cellH = height / rowCount;

  const dots: string[] = [];

  for (let r = 0; r < rowCount; r++) {
    for (let c = 0; c < cols; c++) {
      if (rng.random() > safeDensity) continue;

      const baseX = c * cellW + cellW / 2;
      const baseY = r * cellH + cellH / 2;

      const jitterX = (rng.randomFloat(-1, 1) * safeJitter * cellW) / 2;
      const jitterY = (rng.randomFloat(-1, 1) * safeJitter * cellH) / 2;

      const cx = baseX + jitterX;
      const cy = baseY + jitterY;

      // Radius based on distance from center + seeded variation
      const dx = cx - width / 2;
      const dy = cy - height / 2;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = Math.sqrt((width / 2) ** 2 + (height / 2) ** 2);
      const distFactor = 1 - dist / maxDist;

      const radius =
        safeMinRadius +
        (safeMaxRadius - safeMinRadius) *
          (distFactor * 0.6 + rng.random() * 0.4);

      const colorT = (r * cols + c) / Math.max(1, cols * rowCount - 1);
      const fill = interpolatePalette(palette, colorT);

      dots.push(
        `<circle cx="${cx.toFixed(2)}" cy="${cy.toFixed(2)}" r="${radius.toFixed(2)}" fill="${fill}" />`
      );
    }
  }

  const children = `${background}${dots.join("")}`;
  const svg = createSvgRoot(
    { width, height, viewBox: `0 0 ${width} ${height}` },
    children
  );

  return {
    svg,
    dataUri: svgToDataUri(svg),
    metadata: {
      generator: "dotMatrix",
      seed,
      width,
      height,
      elements: 1 + dots.length,
    },
  };
}
