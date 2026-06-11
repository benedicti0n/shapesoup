import { describe, it, expect } from "vitest";
import { generateWave } from "../generators/wave/generateWave";
import { generateLayeredWaves } from "../generators/wave/generateLayeredWaves";
import { generateStackedWaves } from "../generators/wave/generateStackedWaves";

describe("generateWave", () => {
  const config = { width: 800, height: 600, seed: "wave-test", colors: ["#ff0000", "#00ff00"] };

  it("is deterministic", () => {
    const r1 = generateWave(config);
    const r2 = generateWave(config);
    expect(r1.svg).toBe(r2.svg);
  });

  it("returns path elements", () => {
    const result = generateWave(config);
    expect(result.svg).toContain("<path");
    expect(result.metadata.elements).toBe(1);
  });
});

describe("generateLayeredWaves", () => {
  const config = { width: 800, height: 600, seed: "lw-test", layerCount: 3, colors: ["#ff0000", "#00ff00"] };

  it("is deterministic", () => {
    const r1 = generateLayeredWaves(config);
    const r2 = generateLayeredWaves(config);
    expect(r1.svg).toBe(r2.svg);
  });

  it("returns multiple path elements", () => {
    const result = generateLayeredWaves(config);
    expect(result.svg).toContain("<path");
    expect(result.metadata.elements).toBe(3);
  });
});

describe("generateStackedWaves", () => {
  const config = { width: 800, height: 600, seed: "sw-test", layerCount: 3, colors: ["#ff0000", "#00ff00"] };

  it("is deterministic", () => {
    const r1 = generateStackedWaves(config);
    const r2 = generateStackedWaves(config);
    expect(r1.svg).toBe(r2.svg);
  });

  it("returns multiple path elements", () => {
    const result = generateStackedWaves(config);
    expect(result.svg).toContain("<path");
    expect(result.metadata.elements).toBe(3);
  });
});
