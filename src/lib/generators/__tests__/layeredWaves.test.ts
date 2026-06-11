import { describe, it, expect } from "vitest";
import { layeredWavesGenerator } from "@/lib/generators/layeredWaves";

describe("layeredWavesGenerator", () => {
  const config = {
    width: 800,
    height: 600,
    layerCount: 3,
    amplitude: 60,
    frequency: 0.008,
    points: 8,
    colors: ["#ff0000", "#00ff00", "#0000ff"],
  };

  it("produces deterministic output for the same config and seed", () => {
    const result1 = layeredWavesGenerator.generate(config, "lw-1");
    const result2 = layeredWavesGenerator.generate(config, "lw-1");
    expect(result1.svg).toBe(result2.svg);
    expect(result1.jsx).toBe(result2.jsx);
    expect(result1.metadata).toEqual(result2.metadata);
  });

  it("produces different output for different seeds", () => {
    const result1 = layeredWavesGenerator.generate(config, "lw-a");
    const result2 = layeredWavesGenerator.generate(config, "lw-b");
    expect(result1.svg).not.toBe(result2.svg);
  });

  it("returns valid svg structure", () => {
    const result = layeredWavesGenerator.generate(config, "lw-test");
    expect(result.svg).toContain("<svg");
    expect(result.svg).toContain("</svg>");
    expect(result.svg).toContain("<path");
  });

  it("returns metadata with correct element count", () => {
    const result = layeredWavesGenerator.generate(config, "lw-meta");
    expect(result.metadata.elements).toBe(config.layerCount);
  });
});
