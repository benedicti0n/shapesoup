export interface SvgAttributes {
  width?: number;
  height?: number;
  viewBox?: string;
  xmlns?: string;
  fill?: string;
  [key: string]: string | number | undefined;
}

export function createSvgElement(
  tag: string,
  attrs: Record<string, string | number | undefined>,
  children?: string
): string {
  const attributes = Object.entries(attrs)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}="${value}"`)
    .join(" ");

  if (children) {
    return `<${tag} ${attributes}>${children}</${tag}>`;
  }
  return `<${tag} ${attributes} />`;
}

export function createSvgRoot(
  attrs: SvgAttributes,
  children: string
): string {
  const defaultAttrs: SvgAttributes = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 800,
    height: 600,
    viewBox: "0 0 800 600",
    ...attrs,
  };

  return createSvgElement("svg", defaultAttrs, children);
}
