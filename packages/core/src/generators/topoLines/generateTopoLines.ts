import { GeneratorOutput } from "../../core/types";
import { createSeededRandom } from "../../core/random";
import { createSvgRoot, createSvgElement } from "../../core/svg";
import { interpolatePalette } from "../../core/color";
import { svgToDataUri } from "../../core/dataUri";
import { TopoLinesConfig } from "./types";
import { defaultTopoLinesConfig } from "./defaults";

export function generateTopoLines(rawConfig: TopoLinesConfig): GeneratorOutput {
  const config = { ...defaultTopoLinesConfig, ...rawConfig };
  const {
    width,
    height,
    lineCount,
    amplitude,
    frequency,
    noise,
    strokeWidth,
    spacing,
    colors,
    backgroundColor,
  } = config;
  const seed = String(config.seed ?? Math.random().toString(36).slice(2, 10));
  const rng = createSeededRandom(seed);

  const count = Math.max(3, Math.min(40, Math.round(lineCount)));
  const safeSpacing = Math.max(10, spacing);
  const safeStrokeWidth = Math.max(0.5, strokeWidth);
  const safeAmplitude = Math.max(5, amplitude);
  const safeFrequency = Math.max(0.001, frequency);
  const safeNoise = Math.max(0, Math.min(1, noise));

  const palette = colors.length > 0 ? colors : ["#1e293b", "#38bdf8", "#a78bfa"];

  const background = createSvgElement("rect", {
    width,
    height,
    fill: backgroundColor,
  });

  const lines: string[] = [];
  const pointsPerLine = Math.max(20, Math.min(100, Math.round(width / 15)));

  for (let i = 0; i < count; i++) {
    const baseY = height * 0.1 + (i * safeSpacing) % (height * 0.85);
    const phase = rng.randomFloat(0, Math.PI * 2);
    const lineFreq = safeFrequency * rng.randomFloat(0.7, 1.3);
    const lineAmp = safeAmplitude * rng.randomFloat(0.6, 1.4);

    const pathPoints: { x: number; y: number }[] = [];

    for (let p = 0; p <= pointsPerLine; p++) {
      const x = (p / pointsPerLine) * width;
      const sineOffset = Math.sin(x * lineFreq + phase) * lineAmp;
      const noiseOffset = (rng.randomFloat(-1, 1) * safeNoise * lineAmp * 0.5);
      const y = baseY + sineOffset + noiseOffset;
      pathPoints.push({ x, y });
    }

    // Build smooth path with cubic bezier
    const commands: string[] = [];
    commands.push(`M ${pathPoints[0].x.toFixed(2)} ${pathPoints[0].y.toFixed(2)}`);

    for (let p = 0; p < pathPoints.length - 1; p++) {
      const p0 = pathPoints[Math.max(0, p - 1)];
      const p1 = pathPoints[p];
      const p2 = pathPoints[p + 1];
      const p3 = pathPoints[Math.min(pathPoints.length - 1, p + 2)];

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      commands.push(`C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`);
    }

    const colorT = i / Math.max(1, count - 1);
    const stroke = interpolatePalette(palette, colorT);

    lines.push(
      `<path d="${commands.join(" ")}" fill="none" stroke="${stroke}" stroke-width="${safeStrokeWidth}" stroke-linecap="round" />`
    );
  }

  const children = `${background}${lines.join("")}`;
  const svg = createSvgRoot(
    { width, height, viewBox: `0 0 ${width} ${height}` },
    children
  );

  return {
    svg,
    dataUri: svgToDataUri(svg),
    metadata: {
      generator: "topoLines",
      seed,
      width,
      height,
      elements: 1 + lines.length,
    },
  };
}
