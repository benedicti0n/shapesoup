import { describe, it, expect } from "vitest";
import { generateTopoLines } from "../generators/topoLines/generateTopoLines";

describe("generateTopoLines", () => {
  const config = {
    width: 800,
    height: 600,
    seed: "topo-test",
    lineCount: 8,
    amplitude: 50,
    frequency: 0.01,
    noise: 0.4,
    strokeWidth: 1.5,
    spacing: 60,
    colors: ["#1e293b", "#38bdf8", "#a78bfa"],
    backgroundColor: "#f8fafc",
  };

  it("produces deterministic output for the same config and seed", () => {
    const result1 = generateTopoLines(config);
    const result2 = generateTopoLines(config);
    expect(result1.svg).toBe(result2.svg);
    expect(result1.dataUri).toBe(result2.dataUri);
    expect(result1.metadata).toEqual(result2.metadata);
  });

  it("produces different output for different seeds", () => {
    const result1 = generateTopoLines({ ...config, seed: "a" });
    const result2 = generateTopoLines({ ...config, seed: "b" });
    expect(result1.svg).not.toBe(result2.svg);
  });

  it("returns valid svg structure", () => {
    const result = generateTopoLines(config);
    expect(result.svg).toContain("<svg");
    expect(result.svg).toContain("</svg>");
    expect(result.svg).toContain("viewBox");
  });

  it("contains path elements", () => {
    const result = generateTopoLines(config);
    expect(result.svg).toContain("<path");
    expect(result.svg).toContain('fill="none"');
    expect(result.svg).toContain("stroke=");
  });

  it("returns a valid data uri", () => {
    const result = generateTopoLines(config);
    expect(result.dataUri).toMatch(/^data:image\/svg\+xml,/);
  });

  it("metadata includes required fields", () => {
    const result = generateTopoLines(config);
    expect(result.metadata.generator).toBe("topoLines");
    expect(result.metadata.seed).toBe("topo-test");
    expect(result.metadata.width).toBe(800);
    expect(result.metadata.height).toBe(600);
    expect(result.metadata.elements).toBeGreaterThan(1);
  });
});
