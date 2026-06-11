import { describe, it, expect } from "vitest";
import { blobSceneGenerator } from "@/lib/generators/blobScene";

describe("blobSceneGenerator", () => {
  const config = {
    width: 800,
    height: 600,
    groupCount: 2,
    layersPerGroup: 4,
    complexity: 10,
    contrast: 0.3,
    size: 1.0,
    colors: ["#0f766e", "#14b8a6", "#5eead4", "#ccfbf1"],
  };

  it("produces deterministic output for the same config and seed", () => {
    const result1 = blobSceneGenerator.generate(config, "blob-scene-1");
    const result2 = blobSceneGenerator.generate(config, "blob-scene-1");
    expect(result1.svg).toBe(result2.svg);
    expect(result1.jsx).toBe(result2.jsx);
    expect(result1.metadata).toEqual(result2.metadata);
  });

  it("produces different output for different seeds", () => {
    const result1 = blobSceneGenerator.generate(config, "blob-scene-a");
    const result2 = blobSceneGenerator.generate(config, "blob-scene-b");
    expect(result1.svg).not.toBe(result2.svg);
  });

  it("returns valid svg structure", () => {
    const result = blobSceneGenerator.generate(config, "blob-scene-test");
    expect(result.svg).toContain("<svg");
    expect(result.svg).toContain("</svg>");
    expect(result.svg).toContain("<path");
    expect(result.svg).toContain("<rect");
  });

  it("contains a solid background rect", () => {
    const result = blobSceneGenerator.generate(config, "blob-scene-bg");
    expect(result.svg).toContain('<rect');
    expect(result.svg).toContain(`fill="${config.colors[0]}"`);
  });

  it("does not contain blur or filter elements", () => {
    const result = blobSceneGenerator.generate(config, "blob-scene-no-blur");
    expect(result.svg).not.toContain("<filter");
    expect(result.svg).not.toContain("feGaussianBlur");
    expect(result.svg).not.toContain("blur");
  });

  it("does not contain opacity attributes on paths", () => {
    const result = blobSceneGenerator.generate(config, "blob-scene-opacity");
    const pathMatches = result.svg.match(/<path[^>]*>/g) ?? [];
    for (const pathTag of pathMatches) {
      expect(pathTag).not.toContain("opacity");
      expect(pathTag).not.toContain("fill-opacity");
    }
  });

  it("does not contain shadow or mix-blend-mode", () => {
    const result = blobSceneGenerator.generate(config, "blob-scene-no-fx");
    expect(result.svg).not.toContain("shadow");
    expect(result.svg).not.toContain("mix-blend-mode");
  });

  it("returns metadata with correct element count", () => {
    const result = blobSceneGenerator.generate(config, "blob-scene-meta");
    expect(result.metadata.width).toBe(800);
    expect(result.metadata.height).toBe(600);
    expect(result.metadata.elements).toBe(1 + config.groupCount * config.layersPerGroup);
  });
});
