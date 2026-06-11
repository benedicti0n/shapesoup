import { describe, it, expect } from "vitest";
import { generateBlurryGradient } from "../generators/gradient/generateBlurryGradient";

describe("generateBlurryGradient", () => {
  const config = { width: 800, height: 600, seed: "blur-test", blobCount: 3, colors: ["#ff0000", "#00ff00"] };

  it("is deterministic", () => {
    const r1 = generateBlurryGradient(config);
    const r2 = generateBlurryGradient(config);
    expect(r1.svg).toBe(r2.svg);
  });

  it("contains filter and ellipse elements", () => {
    const result = generateBlurryGradient(config);
    expect(result.svg).toContain("<filter");
    expect(result.svg).toContain("<ellipse");
    expect(result.metadata.elements).toBe(4);
  });
});
