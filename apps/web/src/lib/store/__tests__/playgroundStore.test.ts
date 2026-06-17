import { describe, it, expect } from "vitest";
import {
  usePlaygroundStore,
  defaultConfigs,
  createInitialResult,
} from "@/lib/store/playgroundStore";

describe("playgroundStore", () => {
  it("has initial state with a result", () => {
    const state = usePlaygroundStore.getState();
    expect(state.activeGenerator).toBe("Blob");
    expect(state.seed).toBeTruthy();
    expect(state.result).not.toBeNull();
    expect(state.result?.svg).toContain("<svg");
  });

  it("changing seed recomputes output", () => {
    const state = usePlaygroundStore.getState();
    const oldSvg = state.result!.svg;
    state.setSeed("new-seed-for-test");
    const newState = usePlaygroundStore.getState();
    expect(newState.seed).toBe("new-seed-for-test");
    expect(newState.result!.svg).not.toBe(oldSvg);
  });

  it("same seed and config produces deterministic output", () => {
    const state = usePlaygroundStore.getState();
    const configs = state.configs;
    const seed = "deterministic-test";

    const result1 = createInitialResult("Blob", configs, seed);
    const result2 = createInitialResult("Blob", configs, seed);
    expect(result1.svg).toBe(result2.svg);
    expect(result1.dataUri).toBe(result2.dataUri);
  });

  it("switching generator recomputes result", () => {
    const state = usePlaygroundStore.getState();
    const oldSvg = state.result!.svg;
    state.setActiveGenerator("Wave");
    const newState = usePlaygroundStore.getState();
    expect(newState.activeGenerator).toBe("Wave");
    expect(newState.result!.svg).not.toBe(oldSvg);
  });

  it("setCanvasSize updates width and height", () => {
    const state = usePlaygroundStore.getState();
    state.setActiveGenerator("Blob");
    state.setCanvasSize(1200, 800);
    const newState = usePlaygroundStore.getState();
    expect(newState.configs.Blob.width).toBe(1200);
    expect(newState.configs.Blob.height).toBe(800);
    expect(newState.result!.metadata.width).toBe(1200);
    expect(newState.result!.metadata.height).toBe(800);
  });

  it("randomizeSeed changes seed", () => {
    const state = usePlaygroundStore.getState();
    const oldSeed = state.seed;
    state.randomizeSeed();
    const newState = usePlaygroundStore.getState();
    expect(newState.seed).not.toBe(oldSeed);
    expect(newState.result).not.toBeNull();
  });

  it("randomizeAll changes seed and colors", () => {
    const state = usePlaygroundStore.getState();
    state.setActiveGenerator("Blob");
    const oldSeed = state.seed;
    const oldColors = [...state.configs.Blob.colors!];
    state.randomizeAll();
    const newState = usePlaygroundStore.getState();
    expect(newState.seed).not.toBe(oldSeed);
    expect(newState.configs.Blob.colors).not.toEqual(oldColors);
  });

  it("hydrate updates state from partial", () => {
    const state = usePlaygroundStore.getState();
    state.hydrate({
      activeGenerator: "Blob Scene",
      seed: "hydrated",
      configs: {
        "Blob Scene": {
          ...defaultConfigs["Blob Scene"],
          width: 1920,
          height: 1080,
          groupCount: 3,
        },
      },
    });
    const newState = usePlaygroundStore.getState();
    expect(newState.activeGenerator).toBe("Blob Scene");
    expect(newState.seed).toBe("hydrated");
    expect(newState.configs["Blob Scene"].width).toBe(1920);
    expect(newState.configs["Blob Scene"].height).toBe(1080);
    expect(newState.configs["Blob Scene"].groupCount).toBe(3);
    expect(newState.result!.metadata.generator).toBe("blobScene");
  });
});
