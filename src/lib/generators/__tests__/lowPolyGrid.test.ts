import { describe, it, expect } from "vitest";
import { lowPolyGridGenerator } from "@/lib/generators/lowPolyGrid";

describe("lowPolyGridGenerator", () => {
  const config = {
    width: 800,
    height: 600,
    cols: 5,
    rows: 4,
    jitter: 0.4,
    colors: ["#ff0000", "#00ff00", "#0000ff"],
  };

  it("produces deterministic output for the same config and seed", () => {
    const result1 = lowPolyGridGenerator.generate(config, "lpg-1");
    const result2 = lowPolyGridGenerator.generate(config, "lpg-1");
    expect(result1.svg).toBe(result2.svg);
    expect(result1.jsx).toBe(result2.jsx);
    expect(result1.metadata).toEqual(result2.metadata);
  });

  it("produces different output for different seeds", () => {
    const result1 = lowPolyGridGenerator.generate(config, "lpg-a");
    const result2 = lowPolyGridGenerator.generate(config, "lpg-b");
    expect(result1.svg).not.toBe(result2.svg);
  });

  it("returns valid svg structure", () => {
    const result = lowPolyGridGenerator.generate(config, "lpg-test");
    expect(result.svg).toContain("<svg");
    expect(result.svg).toContain("</svg>");
    expect(result.svg).toContain("<path");
  });

  it("returns metadata with correct dimensions", () => {
    const result = lowPolyGridGenerator.generate(config, "lpg-meta");
    expect(result.metadata.width).toBe(800);
    expect(result.metadata.height).toBe(600);
    expect(result.metadata.elements).toBeGreaterThan(0);
  });
});
