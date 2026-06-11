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

  it("throws on unknown type", () => {
    expect(() =>
      generatePattern({ type: "unknown" as any, config: {} })
    ).toThrow("Unknown generator type");
  });
});
