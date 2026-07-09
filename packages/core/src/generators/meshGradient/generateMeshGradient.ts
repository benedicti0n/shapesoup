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
  const safeOpacity = Math.max(0.1, Math.min(1, opacity));
  const safeMinRadius = Math.max(20, minRadius);
  const safeMaxRadius = Math.max(safeMinRadius + 10, maxRadius);

  const softness = Math.max(20, blur);
  const dim = Math.max(width, height);

  const scaledMinRadius = Math.max(safeMinRadius, dim * 0.1);
  const scaledMaxRadius = Math.max(scaledMinRadius + 40, safeMaxRadius);

  const palette = colors.length > 0 ? colors : ["#22c55e", "#14b8a6", "#84cc16", "#0f766e"];

  const safeSeed = seed.replace(/[^a-zA-Z0-9_-]/g, "");
  const idPrefix = `meshGradient-${safeSeed}`;

  const defs: string[] = [];

  const bgGradId = `${idPrefix}-bg`;
  const bgColorA = interpolatePalette(palette, rng.random());
  const bgColorB = interpolatePalette(palette, rng.random());
  const bgAngle = rng.randomFloat(0, 360);
  defs.push(`
    <linearGradient id="${bgGradId}" x1="0%" y1="0%" x2="100%" y2="100%" gradientTransform="rotate(${bgAngle.toFixed(1)} 0.5 0.5)">
      <stop offset="0%" stop-color="${bgColorA}" stop-opacity="0.15" />
      <stop offset="100%" stop-color="${backgroundColor}" stop-opacity="1" />
    </linearGradient>
  `);

  const corners: Array<[number, number]> = [
    [0, 0],
    [width, 0],
    [0, height],
    [width, height],
  ];

  const placements: Array<{ cx: number; cy: number }> = [];

  for (let i = 0; i < count; i++) {
    if (i < 4) {
      const [cx, cy] = corners[i];
      const jitterX = rng.randomFloat(dim * -0.15, dim * 0.15);
      const jitterY = rng.randomFloat(dim * -0.15, dim * 0.15);

      const inwardX = cx === 0 ? jitterX : -jitterX;
      const inwardY = cy === 0 ? jitterY : -jitterY;

      placements.push({
        cx: cx + inwardX,
        cy: cy + inwardY,
      });
    } else {
      placements.push({
        cx: rng.randomFloat(width * -0.3, width * 1.3),
        cy: rng.randomFloat(height * -0.3, height * 1.3),
      });
    }
  }

  for (let i = 0; i < count; i++) {
    const gradId = `${idPrefix}-blob-${i}`;
    const colorT = i / Math.max(1, count - 1);
    const fill = interpolatePalette(palette, colorT);

    const { cx, cy } = placements[i];

    const softFactor = softness / 50;
    const baseR = rng.randomFloat(scaledMinRadius, scaledMaxRadius);
    const r = baseR * (1 + softFactor * 0.3);

    const s0 = safeOpacity * 0.85;
    const s35 = safeOpacity * 0.55;
    const s70 = safeOpacity * 0.18;

    defs.push(`
      <radialGradient id="${gradId}" gradientUnits="userSpaceOnUse" cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r.toFixed(1)}">
        <stop offset="0%" stop-color="${fill}" stop-opacity="${s0.toFixed(3)}" />
        <stop offset="35%" stop-color="${fill}" stop-opacity="${s35.toFixed(3)}" />
        <stop offset="70%" stop-color="${fill}" stop-opacity="${s70.toFixed(3)}" />
        <stop offset="100%" stop-color="${fill}" stop-opacity="0" />
      </radialGradient>
    `);
  }

  const layers: string[] = [];
  for (let i = 0; i < count; i++) {
    const gradId = `${idPrefix}-blob-${i}`;
    layers.push(createSvgElement("rect", { width: "100%", height: "100%", fill: `url(#${gradId})` }));
  }

  const depthCx = rng.randomFloat(width * 0.1, width * 0.9);
  const depthCy = rng.randomFloat(height * 0.1, height * 0.9);
  const depthR = dim * rng.randomFloat(0.9, 1.4);
  const depthColor = interpolatePalette(palette, rng.random());
  const depthId = `${idPrefix}-depth`;
  const dOpacity = safeOpacity * 0.15;
  defs.push(`
    <radialGradient id="${depthId}" gradientUnits="userSpaceOnUse" cx="${depthCx.toFixed(1)}" cy="${depthCy.toFixed(1)}" r="${depthR.toFixed(1)}">
      <stop offset="0%" stop-color="${depthColor}" stop-opacity="${dOpacity.toFixed(3)}" />
      <stop offset="60%" stop-color="${depthColor}" stop-opacity="${(dOpacity * 0.4).toFixed(3)}" />
      <stop offset="100%" stop-color="${depthColor}" stop-opacity="0" />
    </radialGradient>
  `);

  const defsStr = `<defs>${defs.join("")}</defs>`;
  const content = `${defsStr}${createSvgElement("rect", { width: "100%", height: "100%", fill: `url(#${bgGradId})` })}${layers.join("")}${createSvgElement("rect", { width: "100%", height: "100%", fill: `url(#${depthId})` })}`;

  const svg = createSvgRoot(
    { width, height, viewBox: `0 0 ${width} ${height}` },
    content
  );

  return {
    svg,
    dataUri: svgToDataUri(svg),
    metadata: {
      generator: "meshGradient",
      seed,
      width,
      height,
      elements: 1 + count,
    },
  };
}