import { describe, it, expect } from "vitest";
import { blurryGradientGenerator } from "@/lib/generators/blurryGradient";

describe("blurryGradientGenerator", () => {
  const config = {
    width: 800,
    height: 600,
    blobCount: 5,
    blurAmount: 40,
    colors: ["#ff0000", "#00ff00", "#0000ff"],
  };

  it("produces deterministic output for the same config and seed", () => {
    const result1 = blurryGradientGenerator.generate(config, "blur-seed-1");
    const result2 = blurryGradientGenerator.generate(config, "blur-seed-1");
    expect(result1.svg).toBe(result2.svg);
    expect(result1.jsx).toBe(result2.jsx);
    expect(result1.metadata).toEqual(result2.metadata);
  });

  it("produces different output for different seeds", () => {
    const result1 = blurryGradientGenerator.generate(config, "blur-seed-a");
    const result2 = blurryGradientGenerator.generate(config, "blur-seed-b");
    expect(result1.svg).not.toBe(result2.svg);
  });

  it("returns valid svg structure", () => {
    const result = blurryGradientGenerator.generate(config, "blur-test");
    expect(result.svg).toContain("<svg");
    expect(result.svg).toContain("</svg>");
    expect(result.svg).toContain("<filter");
    expect(result.svg).toContain("<feGaussianBlur");
    expect(result.svg).toContain("<ellipse");
  });

  it("returns metadata with correct element count", () => {
    const result = blurryGradientGenerator.generate(config, "blur-meta");
    expect(result.metadata.width).toBe(800);
    expect(result.metadata.height).toBe(600);
    expect(result.metadata.elements).toBe(config.blobCount + 1);
  });
});
