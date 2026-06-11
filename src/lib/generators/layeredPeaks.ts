import { Generator, GeneratorResult } from "@/lib/types/generator";
import { createSeededRandom } from "@/lib/utils/seededRandom";
import { createSvgRoot } from "@/lib/utils/svg";
import { moveTo, lineTo, closePath, Point } from "@/lib/utils/paths";
import { interpolatePalette } from "@/lib/utils/colors";

export interface LayeredPeaksConfig {
  width: number;
  height: number;
  layerCount: number;
  peakCount: number;
  roughness: number;
  colors: string[];
}

export const layeredPeaksGenerator: Generator<LayeredPeaksConfig> = {
  name: "Layered Peaks",
  generate(config, seed): GeneratorResult {
    const { width, height, layerCount, peakCount, roughness, colors } = config;
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
          (rng.randomFloat(-1, 1) * layerPeakHeight * rough);
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
      const opacity = rng.randomFloat(0.8, 1.0);

      peakPaths.push(
        `<path d="${pathData}" fill="${fill}" fill-opacity="${opacity}" />`
      );
    }

    const children = peakPaths.join("");
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
