import { RandomFn } from "@/lib/types/generator";

export interface ColorPalette {
  name: string;
  colors: string[];
}

export const presetPalettes: ColorPalette[] = [
  { name: "Indigo", colors: ["#6366f1", "#a855f7", "#ec4899"] },
  { name: "Ocean", colors: ["#0ea5e9", "#6366f1", "#a855f7"] },
  { name: "Sunset", colors: ["#f43f5e", "#f97316", "#eab308"] },
  { name: "Forest", colors: ["#22c55e", "#16a34a", "#15803d", "#84cc16"] },
  { name: "Monochrome", colors: ["#18181b", "#3f3f46", "#71717a", "#a1a1aa", "#d4d4d8"] },
  { name: "Berry", colors: ["#be123c", "#9f1239", "#881337", "#f43f5e", "#fb7185"] },
  { name: "Citrus", colors: ["#facc15", "#fb923c", "#f87171", "#ef4444"] },
  { name: "Arctic", colors: ["#06b6d4", "#22d3ee", "#67e8f9", "#c4b5fd", "#a78bfa"] },
  { name: "Earth", colors: ["#78350f", "#92400e", "#b45309", "#d97706", "#f59e0b"] },
  { name: "Neon", colors: ["#ccff00", "#00ffcc", "#ff00cc", "#cc00ff"] },
  { name: "Pastel", colors: ["#fecdd3", "#fde68a", "#bbf7d0", "#bfdbfe", "#ddd6fe"] },
  { name: "Magma", colors: ["#7f1d1d", "#991b1b", "#b91c1c", "#dc2626", "#ef4444", "#f87171"] },
];

export function getRandomPalette(randomFn: RandomFn): string[] {
  const index = Math.floor(randomFn() * presetPalettes.length);
  return [...presetPalettes[index].colors];
}

export function generateRandomPalette(randomFn: RandomFn, count: number = 3): string[] {
  const colors: string[] = [];
  const baseHue = randomFn() * 360;
  const scheme = Math.floor(randomFn() * 4);

  for (let i = 0; i < count; i++) {
    let hue: number;

    switch (scheme) {
      case 0: // Analogous
        hue = (baseHue + i * 30) % 360;
        break;
      case 1: // Complementary
        hue = i % 2 === 0 ? baseHue : (baseHue + 180) % 360;
        break;
      case 2: // Triadic
        hue = (baseHue + i * 120) % 360;
        break;
      case 3: // Monochromatic
        hue = baseHue;
        break;
      default:
        hue = (baseHue + i * 60) % 360;
    }

    const saturation = 50 + randomFn() * 40;
    const lightness = 40 + randomFn() * 40;
    colors.push(hslToHex(hue, saturation, lightness));
  }

  return colors;
}

function hslToHex(h: number, s: number, l: number): string {
  const sat = s / 100;
  const light = l / 100;

  const c = (1 - Math.abs(2 * light - 1)) * sat;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = light - c / 2;

  let r = 0;
  let g = 0;
  let b = 0;

  if (h >= 0 && h < 60) {
    r = c; g = x; b = 0;
  } else if (h >= 60 && h < 120) {
    r = x; g = c; b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0; g = c; b = x;
  } else if (h >= 180 && h < 240) {
    r = 0; g = x; b = c;
  } else if (h >= 240 && h < 300) {
    r = x; g = 0; b = c;
  } else {
    r = c; g = 0; b = x;
  }

  const toHex = (n: number) => {
    const hex = Math.round((n + m) * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
