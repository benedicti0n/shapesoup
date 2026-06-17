import { GeneratorName } from "@/lib/store/playgroundStore";

export const generatorSlugMap: Record<string, GeneratorName> = {
  blob: "Blob",
  wave: "Wave",
  blurryGradient: "Blurry Gradient",
  blobScene: "Blob Scene",
  layeredWaves: "Layered Waves",
  stackedWaves: "Stacked Waves",
  lowPolyGrid: "Low Poly Grid",
  layeredPeaks: "Layered Peaks",
};

export const generatorNameToSlug: Record<GeneratorName, string> = {
  Blob: "blob",
  Wave: "wave",
  "Blurry Gradient": "blurryGradient",
  "Blob Scene": "blobScene",
  "Layered Waves": "layeredWaves",
  "Stacked Waves": "stackedWaves",
  "Low Poly Grid": "lowPolyGrid",
  "Layered Peaks": "layeredPeaks",
};

export interface UrlState {
  type?: GeneratorName;
  seed?: string;
  width?: number;
  height?: number;
  colors?: string[];
  params?: Record<string, string | number>;
}

export function serializePlaygroundStateToSearchParams(state: {
  activeGenerator: GeneratorName;
  seed: string;
  config: Record<string, unknown>;
}): URLSearchParams {
  const params = new URLSearchParams();
  const slug = generatorNameToSlug[state.activeGenerator];
  if (slug) params.set("type", slug);
  if (state.seed) params.set("seed", state.seed);

  const { width, height, colors, seed, ...rest } = state.config;

  if (typeof width === "number") params.set("width", String(width));
  if (typeof height === "number") params.set("height", String(height));
  if (Array.isArray(colors) && colors.length > 0) {
    params.set("colors", colors.map((c) => String(c).replace("#", "")).join(","));
  }

  void seed; // excluded from URL; already set above from state.seed

  for (const [key, value] of Object.entries(rest)) {
    if (value === undefined || value === null) continue;
    if (Array.isArray(value)) continue;
    params.set(key, String(value));
  }

  return params;
}

export function parsePlaygroundStateFromSearchParams(
  searchParams: URLSearchParams
): UrlState {
  const typeSlug = searchParams.get("type");
  const type = typeSlug ? generatorSlugMap[typeSlug] : undefined;

  const seed = searchParams.get("seed") ?? undefined;
  const width = parseNumber(searchParams.get("width"));
  const height = parseNumber(searchParams.get("height"));

  const colorsRaw = searchParams.get("colors");
  const colors = colorsRaw
    ? colorsRaw.split(",").map((c) => (c.startsWith("#") ? c : `#${c}`))
    : undefined;

  const params: Record<string, string | number> = {};
  searchParams.forEach((value, key) => {
    if (["type", "seed", "width", "height", "colors"].includes(key)) return;
    const num = parseNumber(value);
    params[key] = num !== undefined ? num : value;
  });

  return { type, seed, width, height, colors, params };
}

function parseNumber(value: string | null): number | undefined {
  if (value === null) return undefined;
  const parsed = Number(value);
  if (Number.isNaN(parsed)) return undefined;
  return parsed;
}
