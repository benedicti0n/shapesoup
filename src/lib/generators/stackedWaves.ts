import { Generator, GeneratorResult } from "@/lib/types/generator";
import { createSeededRandom } from "@/lib/utils/seededRandom";
import { createSvgRoot } from "@/lib/utils/svg";
import { moveTo, lineTo, closePath, Point } from "@/lib/utils/paths";
import { randomColorFromPalette } from "@/lib/utils/colors";

export interface StackedWavesConfig {
  width: number;
  height: number;
  layerCount: number;
  amplitude: number;
  frequency: number;
  points: number;
  colors: string[];
}

export const stackedWavesGenerator: Generator<StackedWavesConfig> = {
  name: "Stacked Waves",
  generate(config, seed): GeneratorResult {
    const { width, height, layerCount, amplitude, frequency, points, colors } = config;
    const rng = createSeededRandom(seed);

    const layers = Math.max(2, Math.round(layerCount));
    const sampledPoints = Math.max(6, Math.round(points));
    const step = width / (sampledPoints - 1);

    const wavePaths: string[] = [];

    for (let layer = 0; layer < layers; layer++) {
      const layerPhase = rng.randomFloat(0, Math.PI * 2);
      const layerAmp = amplitude * rng.randomFloat(0.7, 1.3);
      const layerFreq = frequency * rng.randomFloat(0.9, 1.4);
      const yOffset = height * 0.15 + (layer / layers) * height * 0.55;

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
      const opacity = rng.randomFloat(0.7, 1.0);

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
