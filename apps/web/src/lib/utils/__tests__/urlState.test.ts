import { describe, it, expect } from "vitest";
import {
  serializePlaygroundStateToSearchParams,
  parsePlaygroundStateFromSearchParams,
  generatorSlugMap,
  generatorNameToSlug,
} from "@/lib/utils/urlState";

describe("generatorSlugMap", () => {
  it("maps all generator slugs to names", () => {
    expect(generatorSlugMap.blob).toBe("Blob");
    expect(generatorSlugMap.blobScene).toBe("Blob Scene");
    expect(generatorSlugMap.layeredWaves).toBe("Layered Waves");
  });
});

describe("generatorNameToSlug", () => {
  it("maps all generator names to slugs", () => {
    expect(generatorNameToSlug["Blob"]).toBe("blob");
    expect(generatorNameToSlug["Blob Scene"]).toBe("blobScene");
    expect(generatorNameToSlug["Layered Waves"]).toBe("layeredWaves");
  });
});

describe("serializePlaygroundStateToSearchParams", () => {
  it("serializes basic state", () => {
    const params = serializePlaygroundStateToSearchParams({
      activeGenerator: "Blob",
      seed: "abc123",
      config: { width: 800, height: 600, colors: ["#ff0000", "#00ff00"] },
    });
    expect(params.get("type")).toBe("blob");
    expect(params.get("seed")).toBe("abc123");
    expect(params.get("width")).toBe("800");
    expect(params.get("height")).toBe("600");
    expect(params.get("colors")).toBe("ff0000,00ff00");
  });

  it("serializes generator-specific params", () => {
    const params = serializePlaygroundStateToSearchParams({
      activeGenerator: "Blob Scene",
      seed: "test",
      config: {
        width: 1200,
        height: 800,
        groupCount: 3,
        layersPerGroup: 4,
        colors: ["#0f766e"],
      },
    });
    expect(params.get("type")).toBe("blobScene");
    expect(params.get("groupCount")).toBe("3");
    expect(params.get("layersPerGroup")).toBe("4");
  });
});

describe("parsePlaygroundStateFromSearchParams", () => {
  it("parses basic params", () => {
    const search = new URLSearchParams("?type=blob&seed=abc&width=1200&height=800&colors=ff0000,00ff00");
    const parsed = parsePlaygroundStateFromSearchParams(search);
    expect(parsed.type).toBe("Blob");
    expect(parsed.seed).toBe("abc");
    expect(parsed.width).toBe(1200);
    expect(parsed.height).toBe(800);
    expect(parsed.colors).toEqual(["#ff0000", "#00ff00"]);
  });

  it("parses generator-specific params", () => {
    const search = new URLSearchParams("?type=blobScene&groupCount=3&contrast=0.35");
    const parsed = parsePlaygroundStateFromSearchParams(search);
    expect(parsed.type).toBe("Blob Scene");
    expect(parsed.params?.groupCount).toBe(3);
    expect(parsed.params?.contrast).toBe(0.35);
  });

  it("returns undefined for unknown type", () => {
    const search = new URLSearchParams("?type=unknown&seed=test");
    const parsed = parsePlaygroundStateFromSearchParams(search);
    expect(parsed.type).toBeUndefined();
    expect(parsed.seed).toBe("test");
  });

  it("handles empty params gracefully", () => {
    const search = new URLSearchParams();
    const parsed = parsePlaygroundStateFromSearchParams(search);
    expect(parsed.type).toBeUndefined();
    expect(parsed.seed).toBeUndefined();
    expect(parsed.width).toBeUndefined();
    expect(parsed.height).toBeUndefined();
    expect(parsed.colors).toBeUndefined();
    expect(Object.keys(parsed.params ?? {})).toHaveLength(0);
  });

  it("round-trips correctly", () => {
    const original = {
      activeGenerator: "Blob Scene" as const,
      seed: "roundtrip",
      config: {
        width: 1920,
        height: 1080,
        groupCount: 2,
        layersPerGroup: 5,
        complexity: 12,
        contrast: 0.3,
        size: 1.2,
        colors: ["#0f766e", "#14b8a6", "#5eead4"],
      },
    };

    const serialized = serializePlaygroundStateToSearchParams(original);
    const parsed = parsePlaygroundStateFromSearchParams(serialized);

    expect(parsed.type).toBe(original.activeGenerator);
    expect(parsed.seed).toBe(original.seed);
    expect(parsed.width).toBe(original.config.width);
    expect(parsed.height).toBe(original.config.height);
    expect(parsed.colors).toEqual(original.config.colors);
    expect(parsed.params?.groupCount).toBe(original.config.groupCount);
    expect(parsed.params?.layersPerGroup).toBe(original.config.layersPerGroup);
    expect(parsed.params?.complexity).toBe(original.config.complexity);
    expect(parsed.params?.contrast).toBe(original.config.contrast);
    expect(parsed.params?.size).toBe(original.config.size);
  });
});
