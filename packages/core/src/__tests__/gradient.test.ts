import { describe, it, expect } from "vitest";
import { generateBlurryGradient } from "../generators/gradient/generateBlurryGradient";

describe("generateBlurryGradient", () => {
  const config = { width: 800, height: 600, seed: "blur-test", blobCount: 3, colors: ["#ff0000", "#00ff00"] };

  it("is deterministic", () => {
    const r1 = generateBlurryGradient(config);
    const r2 = generateBlurryGradient(config);
    expect(r1.svg).toBe(r2.svg);
  });

  it("produces different output for different seeds", () => {
    const r1 = generateBlurryGradient({ ...config, seed: "a" });
    const r2 = generateBlurryGradient({ ...config, seed: "b" });
    expect(r1.svg).not.toBe(r2.svg);
  });

  it("returns a valid svg root", () => {
    const result = generateBlurryGradient(config);
    expect(result.svg).toContain("<svg");
    expect(result.svg).toContain("</svg>");
    expect(result.svg).toContain('xmlns="http://www.w3.org/2000/svg"');
  });

  it("returns a valid data uri", () => {
    const result = generateBlurryGradient(config);
    expect(result.dataUri).toMatch(/^data:image\/svg\+xml,/);
  });

  it("contains radialGradient definitions", () => {
    const result = generateBlurryGradient(config);
    expect(result.svg).toContain("radialGradient");
  });

  it("contains a base linearGradient", () => {
    const result = generateBlurryGradient(config);
    expect(result.svg).toContain("linearGradient");
  });

  it("contains full-canvas rect elements with gradient fills", () => {
    const result = generateBlurryGradient(config);
    const rectMatch = result.svg.match(/<rect\s/g);
    expect(rectMatch).toBeTruthy();
    expect(rectMatch!.length).toBeGreaterThanOrEqual(3);
    expect(result.svg).toContain('fill="url(');
  });

  it("metadata includes required fields", () => {
    const result = generateBlurryGradient(config);
    expect(result.metadata.generator).toBe("blurryGradient");
    expect(result.metadata.seed).toBe("blur-test");
    expect(result.metadata.width).toBe(800);
    expect(result.metadata.height).toBe(600);
    expect(result.metadata.elements).toBeGreaterThan(0);
  });

  it("works with default config (no overrides)", () => {
    const result = generateBlurryGradient({ width: 400, height: 300, seed: "default-test" });
    expect(result.svg).toContain("<svg");
    expect(result.svg).toContain("</svg>");
  });

  it("uses gradientUnits=\"userSpaceOnUse\" on blob gradients", () => {
    const result = generateBlurryGradient(config);
    expect(result.svg).toContain("userSpaceOnUse");
  });
});