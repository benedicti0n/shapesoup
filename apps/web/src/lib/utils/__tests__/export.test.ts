import { describe, it, expect } from "vitest";
import {
  svgToJsx,
  generateCssBackground,
  generateReactComponent,
} from "@/lib/utils/export";

describe("svgToJsx", () => {
  it("removes xmlns", () => {
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

  it("converts fill-rule to fillRule", () => {
    const svg = '<path fill-rule="evenodd" />';
    const jsx = svgToJsx(svg);
    expect(jsx).toContain("fillRule=");
  });

  it("converts clip-path to clipPath", () => {
    const svg = '<g clip-path="url(#clip)" />';
    const jsx = svgToJsx(svg);
    expect(jsx).toContain("clipPath=");
  });

  it("converts fill-opacity to fillOpacity", () => {
    const svg = '<rect fill-opacity="0.5" />';
    const jsx = svgToJsx(svg);
    expect(jsx).toContain("fillOpacity=");
  });

  it("converts stroke-linecap to strokeLinecap", () => {
    const svg = '<path stroke-linecap="round" />';
    const jsx = svgToJsx(svg);
    expect(jsx).toContain("strokeLinecap=");
  });

  it("converts stroke-linejoin to strokeLinejoin", () => {
    const svg = '<path stroke-linejoin="round" />';
    const jsx = svgToJsx(svg);
    expect(jsx).toContain("strokeLinejoin=");
  });

  it("converts stroke-dasharray to strokeDasharray", () => {
    const svg = '<path stroke-dasharray="4 2" />';
    const jsx = svgToJsx(svg);
    expect(jsx).toContain("strokeDasharray=");
  });

  it("converts stroke-dashoffset to strokeDashoffset", () => {
    const svg = '<path stroke-dashoffset="2" />';
    const jsx = svgToJsx(svg);
    expect(jsx).toContain("strokeDashoffset=");
  });

  it("converts stop-color to stopColor", () => {
    const svg = '<stop stop-color="red" />';
    const jsx = svgToJsx(svg);
    expect(jsx).toContain("stopColor=");
  });

  it("converts stop-opacity to stopOpacity", () => {
    const svg = '<stop stop-opacity="0.5" />';
    const jsx = svgToJsx(svg);
    expect(jsx).toContain("stopOpacity=");
  });

  it("converts flood-color to floodColor", () => {
    const svg = '<feFlood flood-color="red" />';
    const jsx = svgToJsx(svg);
    expect(jsx).toContain("floodColor=");
  });

  it("converts flood-opacity to floodOpacity", () => {
    const svg = '<feFlood flood-opacity="0.5" />';
    const jsx = svgToJsx(svg);
    expect(jsx).toContain("floodOpacity=");
  });
});

describe("generateCssBackground", () => {
  it("returns CSS with data URI", () => {
    const uri = "data:image/svg+xml,test";
    const css = generateCssBackground(uri);
    expect(css).toContain(`background-image: url("${uri}");`);
    expect(css).toContain("background-size: cover;");
    expect(css).toContain("background-position: center;");
    expect(css).toContain("background-repeat: no-repeat;");
  });
});

describe("generateReactComponent", () => {
  it("returns a React component with data URI", () => {
    const uri = "data:image/svg+xml,test";
    const width = 800;
    const height = 600;
    const code = generateReactComponent(uri, width, height);
    expect(code).toContain("export function ShapeSoupPattern()");
    expect(code).toContain(`backgroundImage: \`url("${uri}")\``);
    expect(code).toContain('backgroundSize: "cover"');
    expect(code).toContain('backgroundPosition: "center"');
    expect(code).toContain('backgroundRepeat: "no-repeat"');
    expect(code).toContain(`minHeight: "${height}px"`);
  });
});
