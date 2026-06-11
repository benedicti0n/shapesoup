import { describe, it, expect } from "vitest";
import { interpolatePalette, randomColorFromPalette } from "@/lib/utils/colors";
import { createSeededRandom } from "@/lib/utils/seededRandom";

describe("interpolatePalette", () => {
  it("returns the first color when t is 0", () => {
    const result = interpolatePalette(["#ff0000", "#0000ff"], 0);
    expect(result.toLowerCase()).toBe("#ff0000");
  });

  it("returns the last color when t is 1", () => {
    const result = interpolatePalette(["#ff0000", "#0000ff"], 1);
    expect(result.toLowerCase()).toBe("#0000ff");
  });

  it("returns a valid hex color at midpoints", () => {
    const result = interpolatePalette(["#ff0000", "#0000ff"], 0.5);
    expect(result).toMatch(/^#[0-9a-fA-F]{6}$/);
  });

  it("handles single color palettes", () => {
    const result = interpolatePalette(["#00ff00"], 0.5);
    expect(result.toLowerCase()).toBe("#00ff00");
  });

  it("handles empty palettes", () => {
    const result = interpolatePalette([], 0.5);
    expect(result).toBe("#000000");
  });
});

describe("randomColorFromPalette", () => {
  it("returns a color from the palette", () => {
    const rng = createSeededRandom("color-test");
    const palette = ["#ff0000", "#00ff00", "#0000ff"];
    for (let i = 0; i < 50; i++) {
      const color = randomColorFromPalette(palette, rng.random);
      expect(palette).toContain(color);
    }
  });

  it("handles empty palettes", () => {
    const rng = createSeededRandom("empty-color-test");
    const result = randomColorFromPalette([], rng.random);
    expect(result).toBe("#000000");
  });
});
