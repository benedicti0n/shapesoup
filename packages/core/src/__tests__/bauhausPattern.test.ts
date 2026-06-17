import { describe, it, expect } from "vitest";
import { generateBauhausPattern } from "../generators/bauhausPattern/generateBauhausPattern";

describe("generateBauhausPattern", () => {
  const config = {
    width: 800,
    height: 600,
    seed: "bauhaus-test",
    shapeCount: 15,
    minSize: 30,
    maxSize: 150,
    strokeWidth: 3,
    colors: ["#dc2626", "#2563eb", "#f59e0b", "#1f2937"],
    backgroundColor: "#fef3c7",
    allowStrokeOnly: true,
  };

  it("produces deterministic output for the same config and seed", () => {
    const result1 = generateBauhausPattern(config);
    const result2 = generateBauhausPattern(config);
    expect(result1.svg).toBe(result2.svg);
    expect(result1.dataUri).toBe(result2.dataUri);
    expect(result1.metadata).toEqual(result2.metadata);
  });

  it("produces different output for different seeds", () => {
    const result1 = generateBauhausPattern({ ...config, seed: "a" });
    const result2 = generateBauhausPattern({ ...config, seed: "b" });
    expect(result1.svg).not.toBe(result2.svg);
  });

  it("returns valid svg structure", () => {
    const result = generateBauhausPattern(config);
    expect(result.svg).toContain("<svg");
    expect(result.svg).toContain("</svg>");
  });

  it("contains a mix of svg shapes or paths", () => {
    const result = generateBauhausPattern(config);
    const hasCircle = result.svg.includes("<circle");
    const hasRect = result.svg.includes("<rect");
    const hasLine = result.svg.includes("<line");
    const hasPath = result.svg.includes("<path");
    const hasPolygon = result.svg.includes("<polygon");
    expect(hasCircle || hasRect || hasLine || hasPath || hasPolygon).toBe(true);
  });

  it("returns a valid data uri", () => {
    const result = generateBauhausPattern(config);
    expect(result.dataUri).toMatch(/^data:image\/svg\+xml,/);
  });

  it("metadata includes required fields", () => {
    const result = generateBauhausPattern(config);
    expect(result.metadata.generator).toBe("bauhausPattern");
    expect(result.metadata.seed).toBe("bauhaus-test");
    expect(result.metadata.width).toBe(800);
    expect(result.metadata.height).toBe(600);
    expect(result.metadata.elements).toBeGreaterThan(1);
  });
});
