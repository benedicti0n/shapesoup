import { describe, it, expect } from "vitest";
import { createSeededRandom } from "@/lib/utils/seededRandom";

describe("createSeededRandom", () => {
  it("produces deterministic sequences for the same seed", () => {
    const rng1 = createSeededRandom("test-seed");
    const rng2 = createSeededRandom("test-seed");

    for (let i = 0; i < 100; i++) {
      expect(rng1.random()).toBe(rng2.random());
    }
  });

  it("produces different sequences for different seeds", () => {
    const rng1 = createSeededRandom("seed-a");
    const rng2 = createSeededRandom("seed-b");

    let allSame = true;
    for (let i = 0; i < 10; i++) {
      if (rng1.random() !== rng2.random()) {
        allSame = false;
        break;
      }
    }
    expect(allSame).toBe(false);
  });

  it("random() returns values in [0, 1)", () => {
    const rng = createSeededRandom("range-test");
    for (let i = 0; i < 1000; i++) {
      const value = rng.random();
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    }
  });

  it("randomInt returns values within bounds", () => {
    const rng = createSeededRandom("int-test");
    for (let i = 0; i < 100; i++) {
      const value = rng.randomInt(5, 10);
      expect(value).toBeGreaterThanOrEqual(5);
      expect(value).toBeLessThanOrEqual(10);
    }
  });

  it("randomFloat returns values within bounds", () => {
    const rng = createSeededRandom("float-test");
    for (let i = 0; i < 100; i++) {
      const value = rng.randomFloat(2.5, 7.5);
      expect(value).toBeGreaterThanOrEqual(2.5);
      expect(value).toBeLessThanOrEqual(7.5);
    }
  });

  it("pick selects an element from the array", () => {
    const rng = createSeededRandom("pick-test");
    const arr = ["a", "b", "c", "d", "e"];
    for (let i = 0; i < 50; i++) {
      const value = rng.pick(arr);
      expect(arr).toContain(value);
    }
  });
});
