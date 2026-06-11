import { GeneratorOutput } from "../../core/types";
import { createSeededRandom } from "../../core/random";
import { createSvgRoot, createSvgElement } from "../../core/svg";
import { randomColorFromPalette } from "../../core/color";
import { svgToDataUri } from "../../core/dataUri";
import { BlurryGradientConfig } from "./types";
import { defaultBlurryGradientConfig } from "./defaults";

export function generateBlurryGradient(rawConfig: BlurryGradientConfig): GeneratorOutput {
  const config = { ...defaultBlurryGradientConfig, ...rawConfig };
  const { width, height, blobCount, blurAmount, colors } = config;
  const seed = String(config.seed ?? Math.random().toString(36).slice(2, 10));
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

  return {
    svg,
    dataUri: svgToDataUri(svg),
    metadata: {
      generator: "blurryGradient",
      seed,
      width,
      height,
      elements: count + 1,
    },
  };
}
