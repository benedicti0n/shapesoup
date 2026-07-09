import { GeneratorOutput } from "../../core/types";
import { createSeededRandom } from "../../core/random";
import { createSvgRoot, createSvgElement } from "../../core/svg";
import { interpolatePalette, randomColorFromPalette } from "../../core/color";
import { svgToDataUri } from "../../core/dataUri";
import { BlurryGradientConfig } from "./types";
import { defaultBlurryGradientConfig } from "./defaults";

export function generateBlurryGradient(rawConfig: BlurryGradientConfig): GeneratorOutput {
  const config = { ...defaultBlurryGradientConfig, ...rawConfig };
  const { width, height, blobCount, blurAmount, colors, backgroundColor } = config;
  const seed = String(config.seed ?? Math.random().toString(36).slice(2, 10));
  const rng = createSeededRandom(seed);

  const count = Math.max(2, Math.round(blobCount));
  const softness = Math.max(20, blurAmount);

  const safeSeed = seed.replace(/[^a-zA-Z0-9_-]/g, "");
  const idPrefix = `blurryGradient-${safeSeed}`;

  const defs: string[] = [];
  const palette = colors.length > 0 ? colors : ["#6366f1", "#a855f7", "#ec4899"];

  const baseColorA = randomColorFromPalette(palette, rng.random);
  const baseColorB = randomColorFromPalette(palette, rng.random);
  const bgAngle = rng.randomFloat(0, 360);
  const bgGradId = `${idPrefix}-bg`;
  defs.push(`
    <linearGradient id="${bgGradId}" x1="0%" y1="0%" x2="100%" y2="100%" gradientTransform="rotate(${bgAngle.toFixed(1)} 0.5 0.5)">
      <stop offset="0%" stop-color="${baseColorA}" stop-opacity="0.55" />
      <stop offset="50%" stop-color="${baseColorB}" stop-opacity="0.25" />
      <stop offset="100%" stop-color="${backgroundColor || baseColorA}" stop-opacity="0.85" />
    </linearGradient>
  `);

  const dim = Math.max(width, height);
  for (let i = 0; i < count; i++) {
    const gradId = `${idPrefix}-blob-${i}`;
    const colorT = i / Math.max(1, count - 1);
    const base = interpolatePalette(palette, colorT);
    const pick = randomColorFromPalette(palette, rng.random);

    const mixRng = rng.random();
    const mixColor = mixRng < 0.5 ? base : pick;

    const cx = rng.randomFloat(width * -0.25, width * 1.25);
    const cy = rng.randomFloat(height * -0.25, height * 1.25);

    const softFactor = softness / 50;
    const rMin = dim * (0.25 + softFactor * 0.1);
    const rMax = dim * (0.6 + softFactor * 0.35);
    const r = rng.randomFloat(rMin, rMax);

    const stop0 = rng.randomFloat(0.75, 0.9);
    const stop35 = rng.randomFloat(0.4, 0.6);
    const stop70 = rng.randomFloat(0.1, 0.25);

    defs.push(`
      <radialGradient id="${gradId}" gradientUnits="userSpaceOnUse" cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r.toFixed(1)}">
        <stop offset="0%" stop-color="${mixColor}" stop-opacity="${stop0.toFixed(3)}" />
        <stop offset="35%" stop-color="${mixColor}" stop-opacity="${stop35.toFixed(3)}" />
        <stop offset="70%" stop-color="${mixColor}" stop-opacity="${stop70.toFixed(3)}" />
        <stop offset="100%" stop-color="${mixColor}" stop-opacity="0" />
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
  const depthR = dim * rng.randomFloat(0.8, 1.2);
  const depthColor = randomColorFromPalette(palette, rng.random);
  const depthId = `${idPrefix}-depth`;
  defs.push(`
    <radialGradient id="${depthId}" gradientUnits="userSpaceOnUse" cx="${depthCx.toFixed(1)}" cy="${depthCy.toFixed(1)}" r="${depthR.toFixed(1)}">
      <stop offset="0%" stop-color="${depthColor}" stop-opacity="0.12" />
      <stop offset="60%" stop-color="${depthColor}" stop-opacity="0.06" />
      <stop offset="100%" stop-color="${depthColor}" stop-opacity="0" />
    </radialGradient>
  `);

  const defsStr = `<defs>${defs.join("")}</defs>`;
  const content = `${defsStr}${createSvgElement("rect", { width: "100%", height: "100%", fill: `url(#${bgGradId})` })}${layers.join("")}${createSvgElement("rect", { width: "100%", height: "100%", fill: `url(#${depthId})` })}`;

  const svg = createSvgRoot({ width, height, viewBox: `0 0 ${width} ${height}` }, content);

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