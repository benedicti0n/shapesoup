import { describe, it, expect } from "vitest";
import { generateLayeredPeaks } from "../generators/peaks/generateLayeredPeaks";

describe("generateLayeredPeaks", () => {
  const config = { width: 800, height: 600, seed: "peaks-test", layerCount: 4, colors: ["#ff0000", "#00ff00", "#0000ff"] };

  it("is deterministic", () => {
    const r1 = generateLayeredPeaks(config);
    const r2 = generateLayeredPeaks(config);
    expect(r1.svg).toBe(r2.svg);
  });

  it("contains path elements", () => {
    const result = generateLayeredPeaks(config);
    expect(result.svg).toContain("<path");
    expect(result.metadata.elements).toBe(4);
  });
});
