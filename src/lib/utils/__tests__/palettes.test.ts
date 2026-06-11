import { describe, it, expect } from "vitest";
import { presetPalettes, getRandomPalette, generateRandomPalette } from "@/lib/utils/palettes";
import { createSeededRandom } from "@/lib/utils/seededRandom";

describe("presetPalettes", () => {
  it("contains at least 10 palettes", () => {
    expect(presetPalettes.length).toBeGreaterThanOrEqual(10);
  });

  it("each palette has a name and colors", () => {
    for (const palette of presetPalettes) {
      expect(palette.name).toBeTruthy();
      expect(palette.colors.length).toBeGreaterThanOrEqual(2);
    }
  });
});

describe("getRandomPalette", () => {
  it("returns a palette from presets deterministically", () => {
    const rng = createSeededRandom("palette-test");
    const colors = getRandomPalette(rng.random);
    expect(colors.length).toBeGreaterThanOrEqual(2);
  });
});

describe("generateRandomPalette", () => {
  it("generates the requested number of colors", () => {
    const rng = createSeededRandom("gen-palette-test");
    const colors = generateRandomPalette(rng.random, 5);
    expect(colors).toHaveLength(5);
  });

  it("generates valid hex colors", () => {
    const rng = createSeededRandom("hex-test");
    const colors = generateRandomPalette(rng.random, 10);
    for (const color of colors) {
      expect(color).toMatch(/^#[0-9a-fA-F]{6}$/);
    }
  });
});
