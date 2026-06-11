import { describe, it, expect } from "vitest";
import { generateLowPolyGrid } from "../generators/lowPoly/generateLowPolyGrid";

describe("generateLowPolyGrid", () => {
  const config = { width: 800, height: 600, seed: "poly-test", cols: 5, rows: 4, colors: ["#ff0000", "#00ff00", "#0000ff"] };

  it("is deterministic", () => {
    const r1 = generateLowPolyGrid(config);
    const r2 = generateLowPolyGrid(config);
    expect(r1.svg).toBe(r2.svg);
  });

  it("contains path elements", () => {
    const result = generateLowPolyGrid(config);
    expect(result.svg).toContain("<path");
    expect(result.metadata.elements).toBeGreaterThan(0);
  });
});
