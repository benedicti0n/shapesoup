"use client";

import { usePlaygroundStore } from "@/lib/store/playgroundStore";
import { copyToClipboard, downloadSvg } from "@/lib/utils/export";

export function ActionBar() {
  const result = usePlaygroundStore((s) => s.result);
  const copiedSvg = usePlaygroundStore((s) => s.copiedSvg);
  const copiedJsx = usePlaygroundStore((s) => s.copiedJsx);
  const setCopiedSvg = usePlaygroundStore((s) => s.setCopiedSvg);
  const setCopiedJsx = usePlaygroundStore((s) => s.setCopiedJsx);

  const handleCopySvg = async () => {
    if (!result) return;
    const success = await copyToClipboard(result.svg);
    if (success) {
      setCopiedSvg(true);
      setTimeout(() => setCopiedSvg(false), 2000);
    }
  };

  const handleCopyJsx = async () => {
    if (!result) return;
    const success = await copyToClipboard(result.jsx);
    if (success) {
      setCopiedJsx(true);
      setTimeout(() => setCopiedJsx(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    downloadSvg(result.svg, "pattern.svg");
  };

  return (
    <div className="flex flex-wrap gap-2">
      <ActionButton
        onClick={handleCopySvg}
        label={copiedSvg ? "Copied!" : "Copy SVG"}
      />
      <ActionButton
        onClick={handleCopyJsx}
        label={copiedJsx ? "Copied!" : "Copy JSX"}
      />
      <ActionButton onClick={handleDownload} label="Download SVG" />
    </div>
  );
}

function ActionButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-lg bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors"
    >
      {label}
    </button>
  );
}
