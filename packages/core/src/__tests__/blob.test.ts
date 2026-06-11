import { describe, it, expect } from "vitest";
import { generateBlob } from "../generators/blob/generateBlob";

describe("generateBlob", () => {
  const config = {
    width: 800,
    height: 600,
    seed: "blob-test",
    complexity: 8,
    contrast: 0.4,
    colors: ["#ff0000", "#00ff00", "#0000ff"],
  };

  it("produces deterministic output for the same config and seed", () => {
    const result1 = generateBlob(config);
    const result2 = generateBlob(config);
    expect(result1.svg).toBe(result2.svg);
    expect(result1.dataUri).toBe(result2.dataUri);
    expect(result1.metadata).toEqual(result2.metadata);
  });

  it("produces different output for different seeds", () => {
    const result1 = generateBlob({ ...config, seed: "a" });
    const result2 = generateBlob({ ...config, seed: "b" });
    expect(result1.svg).not.toBe(result2.svg);
  });

  it("returns valid svg structure", () => {
    const result = generateBlob(config);
    expect(result.svg).toContain("<svg");
    expect(result.svg).toContain("</svg>");
    expect(result.svg).toContain("viewBox");
  });

  it("returns a valid data uri", () => {
    const result = generateBlob(config);
    expect(result.dataUri).toMatch(/^data:image\/svg\+xml,/);
  });

  it("metadata includes required fields", () => {
    const result = generateBlob(config);
    expect(result.metadata.generator).toBe("blob");
    expect(result.metadata.seed).toBe("blob-test");
    expect(result.metadata.width).toBe(800);
    expect(result.metadata.height).toBe(600);
    expect(result.metadata.elements).toBe(1);
  });
});
