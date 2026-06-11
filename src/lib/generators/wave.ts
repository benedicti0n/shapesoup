import { Generator, GeneratorResult } from "@/lib/types/generator";
import { createSeededRandom } from "@/lib/utils/seededRandom";
import { createSvgRoot } from "@/lib/utils/svg";
import { moveTo, cubicBezierTo, closePath, Point } from "@/lib/utils/paths";
import { randomColorFromPalette } from "@/lib/utils/colors";

export interface WaveConfig {
  width: number;
  height: number;
  amplitude: number;
  frequency: number;
  points: number;
  colors: string[];
}

export const waveGenerator: Generator<WaveConfig> = {
  name: "Wave",
  generate(config, seed): GeneratorResult {
    const { width, height, amplitude, frequency, points, colors } = config;
    const rng = createSeededRandom(seed);

    const phase = rng.randomFloat(0, Math.PI * 2);
    const sampledPoints = Math.max(4, Math.round(points));
    const step = width / (sampledPoints - 1);

    const wavePoints: Point[] = [];
    for (let i = 0; i < sampledPoints; i++) {
      const x = i * step;
      const y =
        height / 2 +
        Math.sin(x * frequency + phase) * amplitude +
        (rng.randomFloat(-0.3, 0.3) * amplitude);
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

    const pathElement = `<path d="${pathData}" fill="${fill}" />`;
    const svg = createSvgRoot({ width, height, viewBox: `0 0 ${width} ${height}` }, pathElement);

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
        elements: 1,
      },
    };
  },
};

function lineTo(x: number, y: number): string {
  return `L ${x} ${y}`;
}
