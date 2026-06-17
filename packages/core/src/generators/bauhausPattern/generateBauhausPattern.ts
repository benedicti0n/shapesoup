import { GeneratorOutput } from "../../core/types";
import { createSeededRandom } from "../../core/random";
import { createSvgRoot, createSvgElement } from "../../core/svg";
import { randomColorFromPalette } from "../../core/color";
import { svgToDataUri } from "../../core/dataUri";
import { BauhausPatternConfig } from "./types";
import { defaultBauhausPatternConfig } from "./defaults";

type BauhausShape =
  | "circle"
  | "rect"
  | "roundedRect"
  | "line"
  | "ring"
  | "semicircle"
  | "quarterCircle"
  | "triangle";

export function generateBauhausPattern(rawConfig: BauhausPatternConfig): GeneratorOutput {
  const config = { ...defaultBauhausPatternConfig, ...rawConfig };
  const {
    width,
    height,
    shapeCount,
    minSize,
    maxSize,
    strokeWidth,
    colors,
    backgroundColor,
    allowStrokeOnly,
  } = config;
  const seed = String(config.seed ?? Math.random().toString(36).slice(2, 10));
  const rng = createSeededRandom(seed);

  const count = Math.max(3, Math.min(40, Math.round(shapeCount)));
  const safeMinSize = Math.max(10, minSize);
  const safeMaxSize = Math.max(safeMinSize + 10, maxSize);
  const safeStrokeWidth = Math.max(1, strokeWidth);

  const palette = colors.length > 0 ? colors : ["#dc2626", "#2563eb", "#f59e0b", "#1f2937"];

  const background = createSvgElement("rect", {
    width,
    height,
    fill: backgroundColor,
  });

  const shapeTypes: BauhausShape[] = [
    "circle",
    "rect",
    "roundedRect",
    "line",
    "ring",
    "semicircle",
    "quarterCircle",
    "triangle",
  ];

  const shapes: string[] = [];

  for (let i = 0; i < count; i++) {
    const cx = rng.randomFloat(width * 0.05, width * 0.95);
    const cy = rng.randomFloat(height * 0.05, height * 0.95);
    const size = rng.randomFloat(safeMinSize, safeMaxSize);
    const rotation = rng.randomInt(0, 3) * 90;
    const color = randomColorFromPalette(palette, rng.random);
    const isStroke = allowStrokeOnly && rng.random() > 0.5;
    const fill = isStroke ? "none" : color;
    const stroke = isStroke ? color : "none";
    const strokeAttr = isStroke ? ` stroke="${stroke}" stroke-width="${safeStrokeWidth}"` : "";

    const type = rng.pick(shapeTypes);

    switch (type) {
      case "circle": {
        const r = size / 2;
        shapes.push(
          `<circle cx="${cx.toFixed(2)}" cy="${cy.toFixed(2)}" r="${r.toFixed(2)}" fill="${fill}"${strokeAttr} />`
        );
        break;
      }
      case "rect": {
        const w = size * rng.randomFloat(0.6, 1.2);
        const h = size * rng.randomFloat(0.6, 1.2);
        shapes.push(
          `<rect x="${(cx - w / 2).toFixed(2)}" y="${(cy - h / 2).toFixed(2)}" width="${w.toFixed(2)}" height="${h.toFixed(2)}" fill="${fill}"${strokeAttr} transform="rotate(${rotation} ${cx.toFixed(2)} ${cy.toFixed(2)})" />`
        );
        break;
      }
      case "roundedRect": {
        const w = size * rng.randomFloat(0.6, 1.2);
        const h = size * rng.randomFloat(0.6, 1.2);
        const rx = Math.min(w, h) * 0.2;
        shapes.push(
          `<rect x="${(cx - w / 2).toFixed(2)}" y="${(cy - h / 2).toFixed(2)}" width="${w.toFixed(2)}" height="${h.toFixed(2)}" rx="${rx.toFixed(2)}" fill="${fill}"${strokeAttr} transform="rotate(${rotation} ${cx.toFixed(2)} ${cy.toFixed(2)})" />`
        );
        break;
      }
      case "line": {
        const len = size;
        const angle = rng.pick([0, 45, 90, 135]) * (Math.PI / 180);
        const x1 = cx - Math.cos(angle) * len / 2;
        const y1 = cy - Math.sin(angle) * len / 2;
        const x2 = cx + Math.cos(angle) * len / 2;
        const y2 = cy + Math.sin(angle) * len / 2;
        shapes.push(
          `<line x1="${x1.toFixed(2)}" y1="${y1.toFixed(2)}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}" stroke="${color}" stroke-width="${safeStrokeWidth * 1.5}" stroke-linecap="round" />`
        );
        break;
      }
      case "ring": {
        const r = size / 2;
        const innerR = r * rng.randomFloat(0.4, 0.7);
        shapes.push(
          `<circle cx="${cx.toFixed(2)}" cy="${cy.toFixed(2)}" r="${r.toFixed(2)}" fill="none" stroke="${color}" stroke-width="${(r - innerR).toFixed(2)}" />`
        );
        break;
      }
      case "semicircle": {
        const r = size / 2;
        const sweep = rng.pick([0, 1]);
        const rot = rng.pick([0, 90, 180, 270]);
        const startAngle = (rot * Math.PI) / 180;
        const endAngle = startAngle + Math.PI;
        const x1 = cx + r * Math.cos(startAngle);
        const y1 = cy + r * Math.sin(startAngle);
        const x2 = cx + r * Math.cos(endAngle);
        const y2 = cy + r * Math.sin(endAngle);
        const largeArc = 0;
        shapes.push(
          `<path d="M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r.toFixed(2)} ${r.toFixed(2)} 0 ${largeArc} ${sweep} ${x2.toFixed(2)} ${y2.toFixed(2)}" fill="${fill}"${strokeAttr} />`
        );
        break;
      }
      case "quarterCircle": {
        const r = size / 2;
        const quadrant = rng.randomInt(0, 3);
        const startAngle = (quadrant * Math.PI) / 2;
        const endAngle = startAngle + Math.PI / 2;
        const x1 = cx + r * Math.cos(startAngle);
        const y1 = cy + r * Math.sin(startAngle);
        const x2 = cx + r * Math.cos(endAngle);
        const y2 = cy + r * Math.sin(endAngle);
        const largeArc = 0;
        const sweep = 1;
        shapes.push(
          `<path d="M ${cx.toFixed(2)} ${cy.toFixed(2)} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r.toFixed(2)} ${r.toFixed(2)} 0 ${largeArc} ${sweep} ${x2.toFixed(2)} ${y2.toFixed(2)} Z" fill="${fill}"${strokeAttr} />`
        );
        break;
      }
      case "triangle": {
        const r = size / 2;
        const triRot = rng.randomInt(0, 3) * 90 * (Math.PI / 180);
        const p1x = cx + r * Math.cos(triRot);
        const p1y = cy + r * Math.sin(triRot);
        const p2x = cx + r * Math.cos(triRot + (2 * Math.PI) / 3);
        const p2y = cy + r * Math.sin(triRot + (2 * Math.PI) / 3);
        const p3x = cx + r * Math.cos(triRot + (4 * Math.PI) / 3);
        const p3y = cy + r * Math.sin(triRot + (4 * Math.PI) / 3);
        shapes.push(
          `<polygon points="${p1x.toFixed(2)},${p1y.toFixed(2)} ${p2x.toFixed(2)},${p2y.toFixed(2)} ${p3x.toFixed(2)},${p3y.toFixed(2)}" fill="${fill}"${strokeAttr} />`
        );
        break;
      }
    }
  }

  const children = `${background}${shapes.join("")}`;
  const svg = createSvgRoot(
    { width, height, viewBox: `0 0 ${width} ${height}` },
    children
  );

  return {
    svg,
    dataUri: svgToDataUri(svg),
    metadata: {
      generator: "bauhausPattern",
      seed,
      width,
      height,
      elements: 1 + shapes.length,
    },
  };
}
