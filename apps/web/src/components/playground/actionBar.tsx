"use client";

import { useState } from "react";
import { usePlaygroundStore } from "@/lib/store/playgroundStore";
import {
  copyToClipboard,
  downloadSvg,
  downloadPng,
  generateCssBackground,
  generateReactComponent,
} from "@/lib/utils/export";

export function ActionBar() {
  const result = usePlaygroundStore((s) => s.result);
  const copiedSvg = usePlaygroundStore((s) => s.copiedSvg);
  const copiedJsx = usePlaygroundStore((s) => s.copiedJsx);
  const copiedLink = usePlaygroundStore((s) => s.copiedLink);
  const copiedCss = usePlaygroundStore((s) => s.copiedCss);
  const copiedReact = usePlaygroundStore((s) => s.copiedReact);
  const setCopiedSvg = usePlaygroundStore((s) => s.setCopiedSvg);
  const setCopiedJsx = usePlaygroundStore((s) => s.setCopiedJsx);
  const setCopiedLink = usePlaygroundStore((s) => s.setCopiedLink);
  const setCopiedCss = usePlaygroundStore((s) => s.setCopiedCss);
  const setCopiedReact = usePlaygroundStore((s) => s.setCopiedReact);

  const [pngScale, setPngScale] = useState(2);
  const [isDownloadingPng, setIsDownloadingPng] = useState(false);

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

  const handleCopyLink = async () => {
    const success = await copyToClipboard(window.location.href);
    if (success) {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleDownloadPng = async () => {
    if (!result) return;
    setIsDownloadingPng(true);
    try {
      await downloadPng(
        result.svg,
        result.metadata.width,
        result.metadata.height,
        "pattern.png",
        pngScale
      );
    } catch {
      // silently fail
    } finally {
      setIsDownloadingPng(false);
    }
  };

  const handleCopyCss = async () => {
    if (!result) return;
    const css = generateCssBackground(result.dataUri);
    const success = await copyToClipboard(css);
    if (success) {
      setCopiedCss(true);
      setTimeout(() => setCopiedCss(false), 2000);
    }
  };

  const handleCopyReact = async () => {
    if (!result) return;
    const react = generateReactComponent(
      result.dataUri,
      result.metadata.width,
      result.metadata.height
    );
    const success = await copyToClipboard(react);
    if (success) {
      setCopiedReact(true);
      setTimeout(() => setCopiedReact(false), 2000);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <ActionButton
        onClick={handleCopyLink}
        label={copiedLink ? "Copied!" : "Copy Link"}
      />
      <ActionButton
        onClick={handleCopySvg}
        label={copiedSvg ? "Copied!" : "Copy SVG"}
      />
      <ActionButton
        onClick={handleCopyJsx}
        label={copiedJsx ? "Copied!" : "Copy JSX"}
      />
      <ActionButton
        onClick={handleCopyCss}
        label={copiedCss ? "Copied!" : "Copy CSS"}
      />
      <ActionButton
        onClick={handleCopyReact}
        label={copiedReact ? "Copied!" : "Copy React"}
      />
      <ActionButton onClick={handleDownload} label="Download SVG" />
      <div className="flex items-center gap-1.5">
        <ActionButton
          onClick={handleDownloadPng}
          label={isDownloadingPng ? "Exporting..." : "Download PNG"}
        />
        <select
          value={pngScale}
          onChange={(e) => setPngScale(Number(e.target.value))}
          className="px-2 py-1.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 focus:outline-none"
          title="PNG scale"
        >
          <option value={1}>1x</option>
          <option value={2}>2x</option>
          <option value={4}>4x</option>
        </select>
      </div>
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
      className="px-3 py-2 rounded-lg bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors"
    >
      {label}
    </button>
  );
}
