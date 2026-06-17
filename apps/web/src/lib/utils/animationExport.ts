export function wrapWithAnimation(svg: string, generator: string): string {
  if (!svg.includes("<svg")) return svg;

  const closingBracket = svg.indexOf(">");
  if (closingBracket === -1) return svg;

  const svgStart = svg.slice(0, closingBracket + 1);
  const svgEnd = svg.slice(closingBracket + 1);

  let animation = "";

  if (generator.includes("Wave")) {
    animation = `<g><animateTransform attributeName="transform" type="translate" values="0 0;-40 0;0 0" dur="6s" repeatCount="indefinite"/>`;
  } else if (generator === "Blob") {
    animation = `<g><animateTransform attributeName="transform" type="scale" values="1;1.03;1" dur="5s" repeatCount="indefinite" additive="sum"/><animateTransform attributeName="transform" type="rotate" values="0 0.5 0.5;2 0.5 0.5;0 0.5 0.5" dur="8s" repeatCount="indefinite" additive="sum"/>`;
  } else if (generator === "Blob Scene") {
    animation = `<g><animateTransform attributeName="transform" type="translate" values="0 0;0 -10;0 0" dur="7s" repeatCount="indefinite"/>`;
  } else if (generator === "Blurry Gradient") {
    animation = `<g><animateTransform attributeName="transform" type="scale" values="1;1.05;1" dur="10s" repeatCount="indefinite" additive="sum"/><animateTransform attributeName="transform" type="rotate" values="0 0.5 0.5;-3 0.5 0.5;0 0.5 0.5" dur="15s" repeatCount="indefinite" additive="sum"/>`;
  } else if (generator === "Low Poly Grid") {
    animation = `<g><animateTransform attributeName="transform" type="rotate" values="0 0.5 0.5;1 0.5 0.5;0 0.5 0.5" dur="12s" repeatCount="indefinite"/>`;
  } else if (generator === "Layered Peaks") {
    animation = `<g><animateTransform attributeName="transform" type="translate" values="0 0;-20 0;0 0" dur="10s" repeatCount="indefinite"/>`;
  }

  if (!animation) return svg;

  return `${svgStart}${animation}${svgEnd.replace("</svg>", "</g></svg>")}`;
}
