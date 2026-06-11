import { describe, it, expect } from "vitest";
import { waveGenerator } from "@/lib/generators/wave";

describe("waveGenerator", () => {
  const config = {
    width: 800,
    height: 600,
    amplitude: 80,
    frequency: 0.01,
    points: 10,
    colors: ["#ff0000", "#00ff00"],
  };

  it("produces deterministic output for the same config and seed", () => {
    const result1 = waveGenerator.generate(config, "wave-seed-1");
    const result2 = waveGenerator.generate(config, "wave-seed-1");
    expect(result1.svg).toBe(result2.svg);
    expect(result1.jsx).toBe(result2.jsx);
    expect(result1.metadata).toEqual(result2.metadata);
  });

  it("produces different output for different seeds", () => {
    const result1 = waveGenerator.generate(config, "wave-seed-a");
    const result2 = waveGenerator.generate(config, "wave-seed-b");
    expect(result1.svg).not.toBe(result2.svg);
  });

  it("returns valid svg structure", () => {
    const result = waveGenerator.generate(config, "wave-test");
    expect(result.svg).toContain("<svg");
    expect(result.svg).toContain("</svg>");
    expect(result.svg).toContain("<path");
  });

  it("returns metadata with correct dimensions", () => {
    const result = waveGenerator.generate(config, "wave-meta");
    expect(result.metadata.width).toBe(800);
    expect(result.metadata.height).toBe(600);
    expect(result.metadata.elements).toBe(1);
  });
});
