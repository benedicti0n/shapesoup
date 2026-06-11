import { describe, it, expect } from "vitest";
import { createSvgElement, createSvgRoot } from "@/lib/utils/svg";

describe("createSvgElement", () => {
  it("creates a self-closing tag without children", () => {
    const result = createSvgElement("rect", { width: 100, height: 50, fill: "red" });
    expect(result).toBe('<rect width="100" height="50" fill="red" />');
  });

  it("creates an opening/closing tag with children", () => {
    const result = createSvgElement("g", { class: "group" }, "<circle />");
    expect(result).toBe('<g class="group"><circle /></g>');
  });

  it("skips undefined attributes", () => {
    const result = createSvgElement("rect", { width: 100, height: undefined, fill: "red" });
    expect(result).toBe('<rect width="100" fill="red" />');
  });
});

describe("createSvgRoot", () => {
  it("creates a valid svg element with defaults", () => {
    const result = createSvgRoot({}, "<rect />");
    expect(result).toContain('xmlns="http://www.w3.org/2000/svg"');
    expect(result).toContain('width="800"');
    expect(result).toContain('height="600"');
    expect(result).toContain('viewBox="0 0 800 600"');
    expect(result).toContain("<rect />");
  });

  it("overrides default attributes", () => {
    const result = createSvgRoot({ width: 400, height: 300 }, "");
    expect(result).toContain('width="400"');
    expect(result).toContain('height="300"');
  });
});
