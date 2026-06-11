import { GeneratorOutput } from "../../core/types";
import { createSeededRandom } from "../../core/random";
import { createSvgRoot } from "../../core/svg";
import { moveTo, cubicBezierTo, closePath, Point } from "../../core/path";
import { randomColorFromPalette } from "../../core/color";
import { svgToDataUri } from "../../core/dataUri";
import { WaveConfig } from "./types";
import { defaultWaveConfig } from "./defaults";

function lineTo(x: number, y: number): string {
  return `L ${x} ${y}`;
}

export function generateLayeredWaves(rawConfig: WaveConfig): GeneratorOutput {
  const config = { ...defaultWaveConfig, ...rawConfig };
  const { width, height, amplitude, frequency, points, colors } = config;
  const seed = String(config.seed ?? Math.random().toString(36).slice(2, 10));
  const rng = createSeededRandom(seed);

  const layerCount = Math.max(2, Math.round(config.layerCount ?? 4));
  const sampledPoints = Math.max(4, Math.round(points));
  const step = width / (sampledPoints - 1);

  const wavePaths: string[] = [];

  for (let layer = 0; layer < layerCount; layer++) {
    const layerPhase = rng.randomFloat(0, Math.PI * 2);
    const layerAmp = amplitude * rng.randomFloat(0.6, 1.2);
    const layerFreq = frequency * rng.randomFloat(0.8, 1.3);
    const yOffset = height * 0.2 + (layer / layerCount) * height * 0.5;

    const wavePoints: Point[] = [];
    for (let i = 0; i < sampledPoints; i++) {
      const x = i * step;
      const y =
        yOffset +
        Math.sin(x * layerFreq + layerPhase) * layerAmp +
        rng.randomFloat(-0.2, 0.2) * layerAmp;
      wavePoints.push({ x, y });
    }

    const commands: string[] = [];
    commands.push(moveTo(wavePoints[0].x, wavePoints[0].y));

    for (let i = 0; i < wavePoints.length - 1; i++) {
      const p0 = wavePoints[i];
      const p1 = wavePoints[i + 1];
      const cpx = (p0.x + p1.x) / 2;
      commands.push(cubicBezierTo(cpx, p0.y, cpx, p1.y, p1.x, p1.y));
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
      generator: "layeredWaves",
      seed,
      width,
      height,
      elements: layerCount,
    },
  };
}
