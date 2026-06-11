import { describe, it, expect } from "vitest";
import { generateBlobScene } from "../generators/scene/generateBlobScene";

describe("generateBlobScene", () => {
  const config = { width: 800, height: 600, seed: "scene-test", groupCount: 2, layersPerGroup: 4, colors: ["#0f766e", "#14b8a6", "#5eead4", "#ccfbf1"] };

  it("is deterministic", () => {
    const r1 = generateBlobScene(config);
    const r2 = generateBlobScene(config);
    expect(r1.svg).toBe(r2.svg);
  });

  it("contains a background rect", () => {
    const result = generateBlobScene(config);
    expect(result.svg).toContain("<rect");
    expect(result.svg).toContain(`fill="${config.colors[0]}"`);
  });

  it("does not contain blur or filter elements", () => {
    const result = generateBlobScene(config);
    expect(result.svg).not.toContain("<filter");
    expect(result.svg).not.toContain("feGaussianBlur");
  });

  it("does not contain opacity attributes on paths", () => {
    const result = generateBlobScene(config);
    const pathMatches = result.svg.match(/<path[^>]*>/g) ?? [];
    for (const pathTag of pathMatches) {
      expect(pathTag).not.toContain("opacity");
      expect(pathTag).not.toContain("fill-opacity");
    }
  });

  it("does not contain shadow or mix-blend-mode", () => {
    const result = generateBlobScene(config);
    expect(result.svg).not.toContain("shadow");
    expect(result.svg).not.toContain("mix-blend-mode");
  });

  it("metadata has correct element count", () => {
    const result = generateBlobScene(config);
    expect(result.metadata.elements).toBe(1 + config.groupCount * config.layersPerGroup);
  });
});
