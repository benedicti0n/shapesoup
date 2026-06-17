import JSZip from "jszip";

export async function downloadBatchZip(
  items: { filename: string; content: string }[]
): Promise<void> {
  const zip = new JSZip();

  for (const item of items) {
    zip.file(item.filename, item.content);
  }

  const blob = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "shapesoup-batch.zip";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
