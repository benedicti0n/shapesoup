import { describe, it, expect } from "vitest";
import { layeredPeaksGenerator } from "@/lib/generators/layeredPeaks";

describe("layeredPeaksGenerator", () => {
  const config = {
    width: 800,
    height: 600,
    layerCount: 4,
    peakCount: 6,
    roughness: 0.4,
    colors: ["#ff0000", "#00ff00", "#0000ff"],
  };

  it("produces deterministic output for the same config and seed", () => {
    const result1 = layeredPeaksGenerator.generate(config, "lp-1");
    const result2 = layeredPeaksGenerator.generate(config, "lp-1");
    expect(result1.svg).toBe(result2.svg);
    expect(result1.jsx).toBe(result2.jsx);
    expect(result1.metadata).toEqual(result2.metadata);
  });

  it("produces different output for different seeds", () => {
    const result1 = layeredPeaksGenerator.generate(config, "lp-a");
    const result2 = layeredPeaksGenerator.generate(config, "lp-b");
    expect(result1.svg).not.toBe(result2.svg);
  });

  it("returns valid svg structure", () => {
    const result = layeredPeaksGenerator.generate(config, "lp-test");
    expect(result.svg).toContain("<svg");
    expect(result.svg).toContain("</svg>");
    expect(result.svg).toContain("<path");
  });

  it("returns metadata with correct element count", () => {
    const result = layeredPeaksGenerator.generate(config, "lp-meta");
    expect(result.metadata.elements).toBe(config.layerCount);
  });
});
