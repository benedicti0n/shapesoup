import { GeneratorOutput } from "../../core/types";
import { createSeededRandom } from "../../core/random";
import { createSvgRoot, createSvgElement } from "../../core/svg";
import { randomColorFromPalette } from "../../core/color";
import { svgToDataUri } from "../../core/dataUri";
import { NoiseGridConfig } from "./types";
import { defaultNoiseGridConfig } from "./defaults";

type ShapeType = "rect" | "circle" | "line" | "plus";

export function generateNoiseGrid(rawConfig: NoiseGridConfig): GeneratorOutput {
  const config = { ...defaultNoiseGridConfig, ...rawConfig };
  const {
    width,
    height,
    cellSize,
    density,
    shapeSize,
    jitter,
    strokeWidth,
    colors,
    backgroundColor,
  } = config;
  const seed = String(config.seed ?? Math.random().toString(36).slice(2, 10));
  const rng = createSeededRandom(seed);

  const safeCellSize = Math.max(10, Math.min(100, cellSize));
  const safeDensity = Math.max(0.1, Math.min(1, density));
  const safeShapeSize = Math.max(0.2, Math.min(1, shapeSize));
  const safeJitter = Math.max(0, Math.min(1, jitter));
  const safeStrokeWidth = Math.max(0.5, strokeWidth);

  const palette = colors.length > 0 ? colors : ["#1e293b", "#475569", "#94a3b8"];

  const background = createSvgElement("rect", {
    width,
    height,
    fill: backgroundColor,
  });

  const cols = Math.ceil(width / safeCellSize);
  const rows = Math.ceil(height / safeCellSize);

  const shapes: string[] = [];
  const shapeTypes: ShapeType[] = ["rect", "circle", "line", "plus"];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (rng.random() > safeDensity) continue;

      const baseX = c * safeCellSize + safeCellSize / 2;
      const baseY = r * safeCellSize + safeCellSize / 2;

      const jitterX = rng.randomFloat(-1, 1) * safeJitter * safeCellSize * 0.4;
      const jitterY = rng.randomFloat(-1, 1) * safeJitter * safeCellSize * 0.4;

      const cx = baseX + jitterX;
      const cy = baseY + jitterY;
      const size = safeCellSize * safeShapeSize;
      const color = randomColorFromPalette(palette, rng.random);
      const type = rng.pick(shapeTypes);

      switch (type) {
        case "rect": {
          const rectSize = size * rng.randomFloat(0.5, 1.0);
          const rx = rng.randomFloat(0, rectSize * 0.3);
          shapes.push(
            `<rect x="${(cx - rectSize / 2).toFixed(2)}" y="${(cy - rectSize / 2).toFixed(2)}" width="${rectSize.toFixed(2)}" height="${rectSize.toFixed(2)}" rx="${rx.toFixed(2)}" fill="${color}" />`
          );
          break;
        }
        case "circle": {
          const radius = (size / 2) * rng.randomFloat(0.4, 1.0);
          shapes.push(
            `<circle cx="${cx.toFixed(2)}" cy="${cy.toFixed(2)}" r="${radius.toFixed(2)}" fill="${color}" />`
          );
          break;
        }
        case "line": {
          const angle = rng.randomFloat(0, Math.PI);
          const halfLen = (size / 2) * rng.randomFloat(0.5, 1.0);
          const x1 = cx - Math.cos(angle) * halfLen;
          const y1 = cy - Math.sin(angle) * halfLen;
          const x2 = cx + Math.cos(angle) * halfLen;
          const y2 = cy + Math.sin(angle) * halfLen;
          shapes.push(
            `<line x1="${x1.toFixed(2)}" y1="${y1.toFixed(2)}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}" stroke="${color}" stroke-width="${safeStrokeWidth}" stroke-linecap="round" />`
          );
          break;
        }
        case "plus": {
          const arm = (size / 2) * rng.randomFloat(0.4, 0.8);
          shapes.push(
            `<line x1="${(cx - arm).toFixed(2)}" y1="${cy.toFixed(2)}" x2="${(cx + arm).toFixed(2)}" y2="${cy.toFixed(2)}" stroke="${color}" stroke-width="${safeStrokeWidth}" stroke-linecap="round" /><line x1="${cx.toFixed(2)}" y1="${(cy - arm).toFixed(2)}" x2="${cx.toFixed(2)}" y2="${(cy + arm).toFixed(2)}" stroke="${color}" stroke-width="${safeStrokeWidth}" stroke-linecap="round" />`
          );
          break;
        }
      }
    }
  }

  const children = `${background}${shapes.join("")}`;
  const svg = createSvgRoot(
    { width, height, viewBox: `0 0 ${width} ${height}` },
    children
  );

  return {
    svg,
    dataUri: svgToDataUri(svg),
    metadata: {
      generator: "noiseGrid",
      seed,
      width,
      height,
      elements: 1 + shapes.length,
    },
  };
}
