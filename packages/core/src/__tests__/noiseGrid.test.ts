import { describe, it, expect } from "vitest";
import { generateNoiseGrid } from "../generators/noiseGrid/generateNoiseGrid";

describe("generateNoiseGrid", () => {
  const config = {
    width: 800,
    height: 600,
    seed: "noise-test",
    cellSize: 30,
    density: 0.6,
    shapeSize: 0.7,
    jitter: 0.4,
    strokeWidth: 1.5,
    colors: ["#1e293b", "#475569", "#94a3b8"],
    backgroundColor: "#f8fafc",
  };

  it("produces deterministic output for the same config and seed", () => {
    const result1 = generateNoiseGrid(config);
    const result2 = generateNoiseGrid(config);
    expect(result1.svg).toBe(result2.svg);
    expect(result1.dataUri).toBe(result2.dataUri);
    expect(result1.metadata).toEqual(result2.metadata);
  });

  it("produces different output for different seeds", () => {
    const result1 = generateNoiseGrid({ ...config, seed: "a" });
    const result2 = generateNoiseGrid({ ...config, seed: "b" });
    expect(result1.svg).not.toBe(result2.svg);
  });

  it("returns valid svg structure", () => {
    const result = generateNoiseGrid(config);
    expect(result.svg).toContain("<svg");
    expect(result.svg).toContain("</svg>");
  });

  it("contains multiple simple svg elements", () => {
    const result = generateNoiseGrid(config);
    const hasRect = result.svg.includes("<rect");
    const hasCircle = result.svg.includes("<circle");
    const hasLine = result.svg.includes("<line");
    expect(hasRect || hasCircle || hasLine).toBe(true);
  });

  it("returns a valid data uri", () => {
    const result = generateNoiseGrid(config);
    expect(result.dataUri).toMatch(/^data:image\/svg\+xml,/);
  });

  it("metadata includes required fields", () => {
    const result = generateNoiseGrid(config);
    expect(result.metadata.generator).toBe("noiseGrid");
    expect(result.metadata.seed).toBe("noise-test");
    expect(result.metadata.width).toBe(800);
    expect(result.metadata.height).toBe(600);
    expect(result.metadata.elements).toBeGreaterThan(1);
  });
});
