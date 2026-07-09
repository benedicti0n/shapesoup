import { describe, it, expect } from "vitest";
import { generateMeshGradient } from "../generators/meshGradient/generateMeshGradient";

describe("generateMeshGradient", () => {
  const config = {
    width: 800,
    height: 600,
    seed: "mesh-test",
    blobCount: 5,
    blur: 40,
    opacity: 0.7,
    minRadius: 100,
    maxRadius: 300,
    colors: ["#c084fc", "#818cf8", "#38bdf8"],
    backgroundColor: "#0f172a",
  };

  it("produces deterministic output for the same config and seed", () => {
    const result1 = generateMeshGradient(config);
    const result2 = generateMeshGradient(config);
    expect(result1.svg).toBe(result2.svg);
    expect(result1.dataUri).toBe(result2.dataUri);
    expect(result1.metadata).toEqual(result2.metadata);
  });

  it("produces different output for different seeds", () => {
    const result1 = generateMeshGradient({ ...config, seed: "a" });
    const result2 = generateMeshGradient({ ...config, seed: "b" });
    expect(result1.svg).not.toBe(result2.svg);
  });

  it("returns valid svg structure", () => {
    const result = generateMeshGradient(config);
    expect(result.svg).toContain("<svg");
    expect(result.svg).toContain("</svg>");
    expect(result.svg).toContain('xmlns="http://www.w3.org/2000/svg"');
  });

  it("returns a valid data uri", () => {
    const result = generateMeshGradient(config);
    expect(result.dataUri).toMatch(/^data:image\/svg\+xml,/);
  });

  it("contains radialGradient definitions", () => {
    const result = generateMeshGradient(config);
    expect(result.svg).toContain("radialGradient");
  });

  it("contains a base linearGradient background", () => {
    const result = generateMeshGradient(config);
    expect(result.svg).toContain("linearGradient");
  });

  it("contains multiple gradient layers (rects with url fills)", () => {
    const result = generateMeshGradient(config);
    const urlFills = result.svg.match(/fill="url\(#/g);
    expect(urlFills).toBeTruthy();
    expect(urlFills!.length).toBeGreaterThanOrEqual(3);
  });

  it("metadata includes required fields", () => {
    const result = generateMeshGradient(config);
    expect(result.metadata.generator).toBe("meshGradient");
    expect(result.metadata.seed).toBe("mesh-test");
    expect(result.metadata.width).toBe(800);
    expect(result.metadata.height).toBe(600);
    expect(result.metadata.elements).toBeGreaterThan(1);
  });

  it("config clamping still works", () => {
    const clampedConfig = { width: 400, height: 300, seed: "clamp", blobCount: 20, opacity: 2, minRadius: -10, maxRadius: 0 };
    const result = generateMeshGradient(clampedConfig);
    expect(result.svg).toContain("<svg");
    expect(result.svg).toContain("radialGradient");
  });
});