import { Generator, GeneratorResult } from "@/lib/types/generator";
import { createSeededRandom } from "@/lib/utils/seededRandom";
import { createSvgRoot, createSvgElement } from "@/lib/utils/svg";
import { smoothClosedPath, Point } from "@/lib/utils/paths";
import { interpolatePalette } from "@/lib/utils/colors";

export interface BlobSceneConfig {
  width: number;
  height: number;
  groupCount: number;
  layersPerGroup: number;
  complexity: number;
  contrast: number;
  size: number;
  colors: string[];
}

interface BlobProfilePoint {
  angle: number;
  radiusMultiplier: number;
}

function createBlobProfile(
  pointCount: number,
  contrast: number,
  rng: { randomFloat: (min: number, max: number) => number }
): BlobProfilePoint[] {
  const count = Math.max(3, Math.round(pointCount));
  return Array.from({ length: count }, (_, i) => {
    const angle = (Math.PI * 2 * i) / count;
    const radiusMultiplier = rng.randomFloat(1 - contrast, 1 + contrast);
    return { angle, radiusMultiplier };
  });
}

function createBlobPathFromProfile(
  centerX: number,
  centerY: number,
  radiusX: number,
  radiusY: number,
  profile: BlobProfilePoint[]
): string {
  const points: Point[] = profile.map((p) => ({
    x: centerX + Math.cos(p.angle) * radiusX * p.radiusMultiplier,
    y: centerY + Math.sin(p.angle) * radiusY * p.radiusMultiplier,
  }));
  return smoothClosedPath(points);
}

export const blobSceneGenerator: Generator<BlobSceneConfig> = {
  name: "Blob Scene",
  generate(config, seed): GeneratorResult {
    const {
      width,
      height,
      groupCount,
      layersPerGroup,
      complexity,
      contrast,
      size,
      colors,
    } = config;
    const rng = createSeededRandom(seed);

    const groups = Math.max(2, Math.min(4, Math.round(groupCount)));
    const layers = Math.max(3, Math.min(6, Math.round(layersPerGroup)));
    const pointCount = Math.max(8, Math.min(16, Math.round(complexity)));
    const safeContrast = Math.max(0.15, Math.min(0.45, contrast));
    const safeSize = Math.max(0.8, Math.min(2.2, size));

    const palette = colors.length > 0 ? colors : ["#0d9488", "#34d399", "#a7f3d0", "#f0fdf4"];

    const backgroundColor = palette[0] ?? "#0d9488";
    const background = createSvgElement("rect", {
      width,
      height,
      fill: backgroundColor,
    });

    const groupDefinitions: {
      centerX: number;
      centerY: number;
      radiusX: number;
      radiusY: number;
    }[] = [];

    for (let g = 0; g < groups; g++) {
      let cx: number;
      let cy: number;

      if (g === 0) {
        cx = rng.randomFloat(-width * 0.2, width * 0.2);
        cy = rng.randomFloat(-height * 0.2, height * 0.2);
      } else if (g === 1) {
        cx = rng.randomFloat(width * 0.8, width * 1.2);
        cy = rng.randomFloat(height * 0.7, height * 1.2);
      } else if (g === 2) {
        const side = rng.randomInt(0, 3);
        if (side === 0) {
          cx = rng.randomFloat(width * 0.3, width * 0.7);
          cy = rng.randomFloat(-height * 0.3, height * 0.1);
        } else if (side === 1) {
          cx = rng.randomFloat(width * 0.3, width * 0.7);
          cy = rng.randomFloat(height * 0.9, height * 1.3);
        } else if (side === 2) {
          cx = rng.randomFloat(-width * 0.3, width * 0.1);
          cy = rng.randomFloat(height * 0.3, height * 0.7);
        } else {
          cx = rng.randomFloat(width * 0.9, width * 1.3);
          cy = rng.randomFloat(height * 0.3, height * 0.7);
        }
      } else {
        cx = rng.randomFloat(-width * 0.15, width * 1.15);
        cy = rng.randomFloat(-height * 0.15, height * 1.15);
      }

      const radiusX =
        Math.min(width, height) * rng.randomFloat(0.45, 0.85) * safeSize;
      const radiusY =
        Math.min(width, height) * rng.randomFloat(0.45, 0.85) * safeSize;

      groupDefinitions.push({ centerX: cx, centerY: cy, radiusX, radiusY });
    }

    const allPaths: string[] = [];

    for (let g = 0; g < groupDefinitions.length; g++) {
      const group = groupDefinitions[g];
      const profile = createBlobProfile(pointCount, safeContrast, rng);

      for (let l = 0; l < layers; l++) {
        const layerProgress = l / Math.max(1, layers - 1);
        const scale = 1.9 - layerProgress * 1.4;

        const pathData = createBlobPathFromProfile(
          group.centerX,
          group.centerY,
          group.radiusX * scale,
          group.radiusY * scale,
          profile
        );

        const colorT = (g / Math.max(1, groups)) * 0.4 + layerProgress * 0.6;
        const fill = interpolatePalette(palette, colorT);

        allPaths.push(`<path d="${pathData}" fill="${fill}" />`);
      }
    }

    const children = `${background}${allPaths.join("")}`;

    const svg = createSvgRoot(
      { width, height, viewBox: `0 0 ${width} ${height}` },
      children
    );

    const jsx = svg
      .replace(/xmlns="http:\/\/www\.w3\.org\/2000\/svg"/g, "")
      .replace(/class=/g, "className=")
      .trim();

    return {
      svg,
      jsx,
      metadata: {
        width,
        height,
        viewBox: `0 0 ${width} ${height}`,
        elements: 1 + allPaths.length,
      },
    };
  },
};
