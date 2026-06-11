import { describe, it, expect } from "vitest";
import { stackedWavesGenerator } from "@/lib/generators/stackedWaves";

describe("stackedWavesGenerator", () => {
  const config = {
    width: 800,
    height: 600,
    layerCount: 3,
    amplitude: 50,
    frequency: 0.012,
    points: 10,
    colors: ["#ff0000", "#00ff00", "#0000ff"],
  };

  it("produces deterministic output for the same config and seed", () => {
    const result1 = stackedWavesGenerator.generate(config, "sw-1");
    const result2 = stackedWavesGenerator.generate(config, "sw-1");
    expect(result1.svg).toBe(result2.svg);
    expect(result1.jsx).toBe(result2.jsx);
    expect(result1.metadata).toEqual(result2.metadata);
  });

  it("produces different output for different seeds", () => {
    const result1 = stackedWavesGenerator.generate(config, "sw-a");
    const result2 = stackedWavesGenerator.generate(config, "sw-b");
    expect(result1.svg).not.toBe(result2.svg);
  });

  it("returns valid svg structure", () => {
    const result = stackedWavesGenerator.generate(config, "sw-test");
    expect(result.svg).toContain("<svg");
    expect(result.svg).toContain("</svg>");
    expect(result.svg).toContain("<path");
  });

  it("returns metadata with correct element count", () => {
    const result = stackedWavesGenerator.generate(config, "sw-meta");
    expect(result.metadata.elements).toBe(config.layerCount);
  });
});
