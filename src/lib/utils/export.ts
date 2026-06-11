export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export function downloadSvg(svgString: string, filename: string): void {
  const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename.endsWith(".svg") ? filename : `${filename}.svg`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function svgToJsx(svgString: string): string {
  return svgString
    .replace(/xmlns="http:\/\/www\.w3\.org\/2000\/svg"/g, "")
    .replace(/class=/g, "className=")
    .replace(/for=/g, "htmlFor=")
    .replace(/stroke-width=/g, "strokeWidth=")
    .replace(/stroke-linecap=/g, "strokeLinecap=")
    .replace(/stroke-linejoin=/g, "strokeLinejoin=")
    .replace(/fill-opacity=/g, "fillOpacity=")
    .replace(/stroke-opacity=/g, "strokeOpacity=")
    .replace(/clip-path=/g, "clipPath=")
    .replace(/fill-rule=/g, "fillRule=")
    .replace(/stroke-dasharray=/g, "strokeDasharray=")
    .replace(/stroke-dashoffset=/g, "strokeDashoffset=")
    .replace(/stop-color=/g, "stopColor=")
    .replace(/stop-opacity=/g, "stopOpacity=")
    .replace(/flood-color=/g, "floodColor=")
    .replace(/flood-opacity=/g, "floodOpacity=")
    .trim();
}
