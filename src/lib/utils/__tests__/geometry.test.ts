import { describe, it, expect } from "vitest";
import { pointOnCircle, samplePoints, distance } from "@/lib/utils/geometry";
import { createSeededRandom } from "@/lib/utils/seededRandom";

describe("pointOnCircle", () => {
  it("returns center when radius is 0", () => {
    const result = pointOnCircle(50, 50, 0, 0);
    expect(result.x).toBeCloseTo(50);
    expect(result.y).toBeCloseTo(50);
  });

  it("returns correct point at angle 0", () => {
    const result = pointOnCircle(0, 0, 10, 0);
    expect(result.x).toBeCloseTo(10);
    expect(result.y).toBeCloseTo(0);
  });

  it("returns correct point at angle PI/2", () => {
    const result = pointOnCircle(0, 0, 10, Math.PI / 2);
    expect(result.x).toBeCloseTo(0);
    expect(result.y).toBeCloseTo(10);
  });
});

describe("samplePoints", () => {
  it("returns the requested number of points", () => {
    const rng = createSeededRandom("sample-test");
    const points = samplePoints(10, 100, 100, rng.random);
    expect(points).toHaveLength(10);
  });

  it("returns points within bounds", () => {
    const rng = createSeededRandom("bounds-test");
    const points = samplePoints(50, 100, 200, rng.random);
    for (const p of points) {
      expect(p.x).toBeGreaterThanOrEqual(0);
      expect(p.x).toBeLessThanOrEqual(100);
      expect(p.y).toBeGreaterThanOrEqual(0);
      expect(p.y).toBeLessThanOrEqual(200);
    }
  });
});

describe("distance", () => {
  it("returns 0 for identical points", () => {
    expect(distance({ x: 5, y: 5 }, { x: 5, y: 5 })).toBe(0);
  });

  it("calculates correct distance", () => {
    const result = distance({ x: 0, y: 0 }, { x: 3, y: 4 });
    expect(result).toBe(5);
  });
});
