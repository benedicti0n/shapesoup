import { describe, it, expect } from "vitest";
import { svgToJsx } from "@/lib/utils/export";

describe("svgToJsx", () => {
  it("removes xmlns attribute", () => {
    const svg = '<svg xmlns="http://www.w3.org/2000/svg"><rect /></svg>';
    const jsx = svgToJsx(svg);
    expect(jsx).not.toContain("xmlns");
  });

  it("converts class to className", () => {
    const svg = '<svg class="foo"></svg>';
    const jsx = svgToJsx(svg);
    expect(jsx).toContain("className=");
    expect(jsx).not.toContain("class=");
  });

  it("converts stroke-width to strokeWidth", () => {
    const svg = '<rect stroke-width="2" />';
    const jsx = svgToJsx(svg);
    expect(jsx).toContain("strokeWidth=");
  });

  it("converts fill-opacity to fillOpacity", () => {
    const svg = '<rect fill-opacity="0.5" />';
    const jsx = svgToJsx(svg);
    expect(jsx).toContain("fillOpacity=");
  });
});
