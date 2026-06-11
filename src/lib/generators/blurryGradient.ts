import { Generator, GeneratorResult } from "@/lib/types/generator";
import { createSeededRandom } from "@/lib/utils/seededRandom";
import { createSvgRoot, createSvgElement } from "@/lib/utils/svg";
import { randomColorFromPalette } from "@/lib/utils/colors";

export interface BlurryGradientConfig {
  width: number;
  height: number;
  blobCount: number;
  blurAmount: number;
  colors: string[];
}

export const blurryGradientGenerator: Generator<BlurryGradientConfig> = {
  name: "Blurry Gradient",
  generate(config, seed): GeneratorResult {
    const { width, height, blobCount, blurAmount, colors } = config;
    const rng = createSeededRandom(seed);

    const count = Math.max(1, Math.round(blobCount));
    const blur = Math.max(0, blurAmount);

    const filterId = `blur-${seed.replace(/[^a-zA-Z0-9]/g, "")}`;

    const filterDef = `
      <filter id="${filterId}" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="${blur}" />
      </filter>
    `;

    const bgColor = randomColorFromPalette(colors, rng.random);
    const background = createSvgElement("rect", {
      width,
      height,
      fill: bgColor,
    });

    const blobs: string[] = [];
    for (let i = 0; i < count; i++) {
      const cx = rng.randomFloat(0, width);
      const cy = rng.randomFloat(0, height);
      const rx = rng.randomFloat(width * 0.15, width * 0.4);
      const ry = rng.randomFloat(height * 0.15, height * 0.4);
      const rotation = rng.randomFloat(0, 360);
      const color = randomColorFromPalette(colors, rng.random);
      const opacity = rng.randomFloat(0.4, 0.9);

      blobs.push(
        `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${color}" fill-opacity="${opacity}" transform="rotate(${rotation} ${cx} ${cy})" filter="url(#${filterId})" />`
      );
    }

    const defs = `<defs>${filterDef}</defs>`;
    const children = `${defs}${background}${blobs.join("")}`;

    const svg = createSvgRoot({ width, height, viewBox: `0 0 ${width} ${height}` }, children);

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
        elements: count + 1,
      },
    };
  },
};
