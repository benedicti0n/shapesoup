import { describe, it, expect } from "vitest";
import { blobGenerator } from "@/lib/generators/blob";

describe("blobGenerator", () => {
  const config = {
    width: 800,
    height: 600,
    complexity: 8,
    contrast: 0.4,
    colors: ["#ff0000", "#00ff00", "#0000ff"],
  };

  it("produces deterministic output for the same config and seed", () => {
    const result1 = blobGenerator.generate(config, "blob-seed-1");
    const result2 = blobGenerator.generate(config, "blob-seed-1");
    expect(result1.svg).toBe(result2.svg);
    expect(result1.jsx).toBe(result2.jsx);
    expect(result1.metadata).toEqual(result2.metadata);
  });

  it("produces different output for different seeds", () => {
    const result1 = blobGenerator.generate(config, "blob-seed-a");
    const result2 = blobGenerator.generate(config, "blob-seed-b");
    expect(result1.svg).not.toBe(result2.svg);
  });

  it("returns valid svg structure", () => {
    const result = blobGenerator.generate(config, "blob-test");
    expect(result.svg).toContain("<svg");
    expect(result.svg).toContain("</svg>");
    expect(result.svg).toContain("<path");
  });

  it("returns metadata with correct dimensions", () => {
    const result = blobGenerator.generate(config, "blob-meta");
    expect(result.metadata.width).toBe(800);
    expect(result.metadata.height).toBe(600);
    expect(result.metadata.viewBox).toBe("0 0 800 600");
    expect(result.metadata.elements).toBe(1);
  });
});
