import { Generator, GeneratorResult } from "@/lib/types/generator";
import { createSeededRandom } from "@/lib/utils/seededRandom";
import { createSvgRoot } from "@/lib/utils/svg";
import { moveTo, cubicBezierTo, closePath, Point } from "@/lib/utils/paths";
import { randomColorFromPalette } from "@/lib/utils/colors";

export interface LayeredWavesConfig {
  width: number;
  height: number;
  layerCount: number;
  amplitude: number;
  frequency: number;
  points: number;
  colors: string[];
}

export const layeredWavesGenerator: Generator<LayeredWavesConfig> = {
  name: "Layered Waves",
  generate(config, seed): GeneratorResult {
    const { width, height, layerCount, amplitude, frequency, points, colors } = config;
    const rng = createSeededRandom(seed);

    const layers = Math.max(2, Math.round(layerCount));
    const sampledPoints = Math.max(4, Math.round(points));
    const step = width / (sampledPoints - 1);

    const wavePaths: string[] = [];

    for (let layer = 0; layer < layers; layer++) {
      const layerPhase = rng.randomFloat(0, Math.PI * 2);
      const layerAmp = amplitude * rng.randomFloat(0.6, 1.2);
      const layerFreq = frequency * rng.randomFloat(0.8, 1.3);
      const yOffset = height * 0.2 + (layer / layers) * height * 0.5;

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
      const opacity = rng.randomFloat(0.6, 1.0);

      wavePaths.push(
        `<path d="${pathData}" fill="${fill}" fill-opacity="${opacity}" />`
      );
    }

    const children = wavePaths.join("");
    const svg = createSvgRoot(
      { width, height, viewBox: `0 0 ${width} ${height}` },
      children
    );

    const jsx = svg
      .replace(/xmlns="http:\/\/www\.w3\.org\/2000\/svg"/g, "")
      .replace(/class=/g, "className=")
      .replace(/fill-opacity=/g, "fillOpacity=")
      .trim();

    return {
      svg,
      jsx,
      metadata: {
        width,
        height,
        viewBox: `0 0 ${width} ${height}`,
        elements: layers,
      },
    };
  },
};

function lineTo(x: number, y: number): string {
  return `L ${x} ${y}`;
}
