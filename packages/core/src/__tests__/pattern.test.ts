import { describe, it, expect } from "vitest";
import { generatePattern } from "../index";

describe("generatePattern", () => {
  it("routes blob type correctly", () => {
    const result = generatePattern({
      type: "blob",
      config: { width: 800, height: 600, seed: "pattern-blob" },
    });
    expect(result.metadata.generator).toBe("blob");
    expect(result.svg).toContain("<svg");
  });

  it("routes wave type correctly", () => {
    const result = generatePattern({
      type: "wave",
      config: { width: 800, height: 600, seed: "pattern-wave" },
    });
    expect(result.metadata.generator).toBe("wave");
  });

  it("routes topoLines type correctly", () => {
    const result = generatePattern({
      type: "topoLines",
      config: { width: 800, height: 600, seed: "pattern-topo" },
    });
    expect(result.metadata.generator).toBe("topoLines");
    expect(result.svg).toContain("<svg");
  });

  it("routes dotMatrix type correctly", () => {
    const result = generatePattern({
      type: "dotMatrix",
      config: { width: 800, height: 600, seed: "pattern-dot" },
    });
    expect(result.metadata.generator).toBe("dotMatrix");
    expect(result.svg).toContain("<svg");
  });

  it("routes meshGradient type correctly", () => {
    const result = generatePattern({
      type: "meshGradient",
      config: { width: 800, height: 600, seed: "pattern-mesh" },
    });
    expect(result.metadata.generator).toBe("meshGradient");
    expect(result.svg).toContain("<svg");
  });

  it("routes noiseGrid type correctly", () => {
    const result = generatePattern({
      type: "noiseGrid",
      config: { width: 800, height: 600, seed: "pattern-noise" },
    });
    expect(result.metadata.generator).toBe("noiseGrid");
    expect(result.svg).toContain("<svg");
  });

  it("routes bauhausPattern type correctly", () => {
    const result = generatePattern({
      type: "bauhausPattern",
      config: { width: 800, height: 600, seed: "pattern-bauhaus" },
    });
    expect(result.metadata.generator).toBe("bauhausPattern");
    expect(result.svg).toContain("<svg");
  });

  it("throws on unknown type", () => {
    expect(() =>
      generatePattern({ type: "unknown" as any, config: {} })
    ).toThrow("Unknown generator type");
  });
});
