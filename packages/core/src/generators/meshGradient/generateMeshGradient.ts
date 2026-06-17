import { GeneratorOutput } from "../../core/types";
import { createSeededRandom } from "../../core/random";
import { createSvgRoot, createSvgElement } from "../../core/svg";
import { interpolatePalette } from "../../core/color";
import { svgToDataUri } from "../../core/dataUri";
import { MeshGradientConfig } from "./types";
import { defaultMeshGradientConfig } from "./defaults";

export function generateMeshGradient(rawConfig: MeshGradientConfig): GeneratorOutput {
  const config = { ...defaultMeshGradientConfig, ...rawConfig };
  const {
    width,
    height,
    blobCount,
    blur,
    opacity,
    minRadius,
    maxRadius,
    colors,
    backgroundColor,
  } = config;
  const seed = String(config.seed ?? Math.random().toString(36).slice(2, 10));
  const rng = createSeededRandom(seed);

  const count = Math.max(2, Math.min(15, Math.round(blobCount)));
  const safeBlur = Math.max(0, blur);
  const safeOpacity = Math.max(0.1, Math.min(1, opacity));
  const safeMinRadius = Math.max(20, minRadius);
  const safeMaxRadius = Math.max(safeMinRadius + 10, maxRadius);

  const palette = colors.length > 0 ? colors : ["#c084fc", "#818cf8", "#38bdf8"];

  const filterId = `meshBlur-${seed.replace(/[^a-zA-Z0-9]/g, "")}`;

  const filterDef = `
    <filter id="${filterId}" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="${safeBlur}" />
    </filter>
  `;

  const background = createSvgElement("rect", {
    width,
    height,
    fill: backgroundColor,
  });

  const blobs: string[] = [];

  for (let i = 0; i < count; i++) {
    const cx = rng.randomFloat(width * -0.2, width * 1.2);
    const cy = rng.randomFloat(height * -0.2, height * 1.2);
    const r = rng.randomFloat(safeMinRadius, safeMaxRadius);
    const colorT = i / Math.max(1, count - 1);
    const fill = interpolatePalette(palette, colorT);
    const blobOpacity = safeOpacity * rng.randomFloat(0.6, 1.0);

    blobs.push(
      `<circle cx="${cx.toFixed(2)}" cy="${cy.toFixed(2)}" r="${r.toFixed(2)}" fill="${fill}" fill-opacity="${blobOpacity.toFixed(3)}" filter="url(#${filterId})" />`
    );
  }

  const defs = `<defs>${filterDef}</defs>`;
  const children = `${defs}${background}${blobs.join("")}`;

  const svg = createSvgRoot(
    { width, height, viewBox: `0 0 ${width} ${height}` },
    children
  );

  return {
    svg,
    dataUri: svgToDataUri(svg),
    metadata: {
      generator: "meshGradient",
      seed,
      width,
      height,
      elements: 1 + blobs.length,
    },
  };
}
