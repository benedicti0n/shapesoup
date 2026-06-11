import { GeneratorOutput } from "../../core/types";
import { createSeededRandom } from "../../core/random";
import { createSvgRoot } from "../../core/svg";
import { moveTo, lineTo, closePath, Point } from "../../core/path";
import { interpolatePalette } from "../../core/color";
import { svgToDataUri } from "../../core/dataUri";
import { LayeredPeaksConfig } from "./types";
import { defaultLayeredPeaksConfig } from "./defaults";

export function generateLayeredPeaks(rawConfig: LayeredPeaksConfig): GeneratorOutput {
  const config = { ...defaultLayeredPeaksConfig, ...rawConfig };
  const { width, height, layerCount, peakCount, roughness, colors } = config;
  const seed = String(config.seed ?? Math.random().toString(36).slice(2, 10));
  const rng = createSeededRandom(seed);

  const layers = Math.max(2, Math.round(layerCount));
  const peaks = Math.max(3, Math.round(peakCount));
  const rough = Math.max(0, Math.min(1, roughness));

  const peakPaths: string[] = [];

  for (let layer = 0; layer < layers; layer++) {
    const layerProgress = layer / (layers - 1);
    const baseHeight = height * (0.2 + layerProgress * 0.5);
    const layerPeakHeight = height * rng.randomFloat(0.1, 0.3) * (1 - layerProgress * 0.5);

    const step = width / (peaks - 1);
    const peakPoints: Point[] = [];

    for (let i = 0; i < peaks; i++) {
      const x = i * step;
      const peakY =
        baseHeight -
        layerPeakHeight * rng.randomFloat(0.3, 1.0) +
        rng.randomFloat(-1, 1) * layerPeakHeight * rough;
      peakPoints.push({ x, y: Math.max(0, peakY) });
    }

    const commands: string[] = [];
    commands.push(moveTo(0, height));
    commands.push(lineTo(peakPoints[0].x, peakPoints[0].y));

    for (let i = 1; i < peakPoints.length; i++) {
      commands.push(lineTo(peakPoints[i].x, peakPoints[i].y));
    }

    commands.push(lineTo(width, height));
    commands.push(closePath());

    const pathData = commands.join(" ");
    const fill = interpolatePalette(colors, layerProgress);

    peakPaths.push(`<path d="${pathData}" fill="${fill}" />`);
  }

  const children = peakPaths.join("");
  const svg = createSvgRoot({ width, height, viewBox: `0 0 ${width} ${height}` }, children);

  return {
    svg,
    dataUri: svgToDataUri(svg),
    metadata: {
      generator: "layeredPeaks",
      seed,
      width,
      height,
      elements: layers,
    },
  };
}
