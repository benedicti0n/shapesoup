import { describe, it, expect } from "vitest";
import { moveTo, lineTo, cubicBezierTo, closePath, smoothClosedPath } from "@/lib/utils/paths";

describe("path commands", () => {
  it("moveTo returns correct command", () => {
    expect(moveTo(10, 20)).toBe("M 10 20");
  });

  it("lineTo returns correct command", () => {
    expect(lineTo(30, 40)).toBe("L 30 40");
  });

  it("cubicBezierTo returns correct command", () => {
    expect(cubicBezierTo(1, 2, 3, 4, 5, 6)).toBe("C 1 2, 3 4, 5 6");
  });

  it("closePath returns Z", () => {
    expect(closePath()).toBe("Z");
  });
});

describe("smoothClosedPath", () => {
  it("returns empty string for fewer than 3 points", () => {
    expect(smoothClosedPath([])).toBe("");
    expect(smoothClosedPath([{ x: 0, y: 0 }])).toBe("");
    expect(smoothClosedPath([{ x: 0, y: 0 }, { x: 1, y: 1 }])).toBe("");
  });

  it("generates a closed path for 3 points", () => {
    const points = [
      { x: 0, y: 0 },
      { x: 100, y: 0 },
      { x: 50, y: 100 },
    ];
    const result = smoothClosedPath(points);
    expect(result).toContain("M");
    expect(result).toContain("C");
    expect(result).toContain("Z");
  });

  it("generates deterministic output for same points", () => {
    const points = [
      { x: 0, y: 0 },
      { x: 100, y: 50 },
      { x: 200, y: 0 },
      { x: 150, y: 100 },
    ];
    const result1 = smoothClosedPath(points);
    const result2 = smoothClosedPath(points);
    expect(result1).toBe(result2);
  });
});
