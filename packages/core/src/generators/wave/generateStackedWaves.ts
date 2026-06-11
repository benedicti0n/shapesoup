import { GeneratorOutput } from "../../core/types";
import { createSeededRandom } from "../../core/random";
import { createSvgRoot } from "../../core/svg";
import { moveTo, lineTo, closePath, Point } from "../../core/path";
import { randomColorFromPalette } from "../../core/color";
import { svgToDataUri } from "../../core/dataUri";
import { WaveConfig } from "./types";
import { defaultWaveConfig } from "./defaults";

export function generateStackedWaves(rawConfig: WaveConfig): GeneratorOutput {
  const config = { ...defaultWaveConfig, ...rawConfig };
  const { width, height, amplitude, frequency, points, colors } = config;
  const seed = String(config.seed ?? Math.random().toString(36).slice(2, 10));
  const rng = createSeededRandom(seed);

  const layerCount = Math.max(2, Math.round(config.layerCount ?? 5));
  const sampledPoints = Math.max(6, Math.round(points));
  const step = width / (sampledPoints - 1);

  const wavePaths: string[] = [];

  for (let layer = 0; layer < layerCount; layer++) {
    const layerPhase = rng.randomFloat(0, Math.PI * 2);
    const layerAmp = amplitude * rng.randomFloat(0.7, 1.3);
    const layerFreq = frequency * rng.randomFloat(0.9, 1.4);
    const yOffset = height * 0.15 + (layer / layerCount) * height * 0.55;

    const wavePoints: Point[] = [];
    for (let i = 0; i < sampledPoints; i++) {
      const x = i * step;
      const baseY = yOffset + Math.sin(x * layerFreq + layerPhase) * layerAmp;
      const sharpness = rng.randomFloat(-0.4, 0.4) * layerAmp;
      const y = baseY + sharpness;
      wavePoints.push({ x, y });
    }

    const commands: string[] = [];
    commands.push(moveTo(wavePoints[0].x, wavePoints[0].y));

    for (let i = 1; i < wavePoints.length; i++) {
      commands.push(lineTo(wavePoints[i].x, wavePoints[i].y));
    }

    commands.push(lineTo(width, height));
    commands.push(lineTo(0, height));
    commands.push(closePath());

    const pathData = commands.join(" ");
    const fill = randomColorFromPalette(colors, rng.random);

    wavePaths.push(`<path d="${pathData}" fill="${fill}" />`);
  }

  const children = wavePaths.join("");
  const svg = createSvgRoot({ width, height, viewBox: `0 0 ${width} ${height}` }, children);

  return {
    svg,
    dataUri: svgToDataUri(svg),
    metadata: {
      generator: "stackedWaves",
      seed,
      width,
      height,
      elements: layerCount,
    },
  };
}
