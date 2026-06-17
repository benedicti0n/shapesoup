import { describe, it, expect } from "vitest";
import { generateDotMatrix } from "../generators/dotMatrix/generateDotMatrix";

describe("generateDotMatrix", () => {
  const config = {
    width: 800,
    height: 600,
    seed: "dot-test",
    columns: 12,
    rows: 10,
    minRadius: 3,
    maxRadius: 18,
    jitter: 0.3,
    density: 0.8,
    colors: ["#0f172a", "#334155", "#64748b"],
    backgroundColor: "#f1f5f9",
  };

  it("produces deterministic output for the same config and seed", () => {
    const result1 = generateDotMatrix(config);
    const result2 = generateDotMatrix(config);
    expect(result1.svg).toBe(result2.svg);
    expect(result1.dataUri).toBe(result2.dataUri);
    expect(result1.metadata).toEqual(result2.metadata);
  });

  it("produces different output for different seeds", () => {
    const result1 = generateDotMatrix({ ...config, seed: "a" });
    const result2 = generateDotMatrix({ ...config, seed: "b" });
    expect(result1.svg).not.toBe(result2.svg);
  });

  it("returns valid svg structure", () => {
    const result = generateDotMatrix(config);
    expect(result.svg).toContain("<svg");
    expect(result.svg).toContain("</svg>");
  });

  it("contains circles", () => {
    const result = generateDotMatrix(config);
    expect(result.svg).toContain("<circle");
  });

  it("returns a valid data uri", () => {
    const result = generateDotMatrix(config);
    expect(result.dataUri).toMatch(/^data:image\/svg\+xml,/);
  });

  it("metadata includes required fields", () => {
    const result = generateDotMatrix(config);
    expect(result.metadata.generator).toBe("dotMatrix");
    expect(result.metadata.seed).toBe("dot-test");
    expect(result.metadata.width).toBe(800);
    expect(result.metadata.height).toBe(600);
    expect(result.metadata.elements).toBeGreaterThan(1);
  });
});
