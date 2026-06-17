"use client";

import { useState } from "react";
import { usePlaygroundStore } from "@/lib/store/playgroundStore";
import { downloadBatchZip } from "@/lib/utils/batchExport";
import { wrapWithAnimation } from "@/lib/utils/animationExport";
import { SaveFavoriteButton } from "@/components/playground/favoritesPanel";
import {
  copyToClipboard,
  downloadSvg,
  downloadPng,
  generateCssBackground,
  generateReactComponent,
} from "@/lib/utils/export";
import {
  generateBlob,
  generateWave,
  generateLayeredWaves,
  generateStackedWaves,
  generateBlurryGradient,
  generateBlobScene,
  generateLowPolyGrid,
  generateLayeredPeaks,
  generateTopoLines,
  generateDotMatrix,
  generateMeshGradient,
  generateNoiseGrid,
  generateBauhausPattern,
} from "@shapesoup/core";

export function ActionBar() {
  const result = usePlaygroundStore((s) => s.result);
  const activeGenerator = usePlaygroundStore((s) => s.activeGenerator);
  const configs = usePlaygroundStore((s) => s.configs);
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
  const [batchCount, setBatchCount] = useState(5);
  const [isBatching, setIsBatching] = useState(false);
  const [copiedAnimated, setCopiedAnimated] = useState(false);

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

  const handleBatchExport = async () => {
    if (!result || isBatching) return;
    setIsBatching(true);
    try {
      const items: { filename: string; content: string }[] = [];
      const config = configs[activeGenerator];

        for (let i = 0; i < batchCount; i++) {
          const seed = Math.random().toString(36).substring(2, 10);
          let output;
          switch (activeGenerator) {
            case "Blob":
              output = generateBlob({ ...config, seed });
              break;
            case "Wave":
              output = generateWave({ ...config, seed });
              break;
            case "Blurry Gradient":
              output = generateBlurryGradient({ ...config, seed });
              break;
            case "Blob Scene":
              output = generateBlobScene({ ...config, seed });
              break;
            case "Layered Waves":
              output = generateLayeredWaves({ ...config, seed });
              break;
            case "Stacked Waves":
              output = generateStackedWaves({ ...config, seed });
              break;
            case "Low Poly Grid":
              output = generateLowPolyGrid({ ...config, seed });
              break;
            case "Layered Peaks":
              output = generateLayeredPeaks({ ...config, seed });
              break;
            case "Topographic Lines":
              output = generateTopoLines({ ...config, seed });
              break;
            case "Dot Matrix":
              output = generateDotMatrix({ ...config, seed });
              break;
            case "Mesh Gradient":
              output = generateMeshGradient({ ...config, seed });
              break;
            case "Noise Grid":
              output = generateNoiseGrid({ ...config, seed });
              break;
            case "Bauhaus Pattern":
              output = generateBauhausPattern({ ...config, seed });
              break;
          }
          if (!output) continue;
          items.push({
            filename: `${activeGenerator.toLowerCase().replace(/\s+/g, "-")}-${seed}.svg`,
            content: output.svg,
          });
        }

      await downloadBatchZip(items);
    } catch {
      // silently fail
    } finally {
      setIsBatching(false);
    }
  };

  const handleCopyAnimated = async () => {
    if (!result) return;
    const animated = wrapWithAnimation(result.svg, activeGenerator);
    const success = await copyToClipboard(animated);
    if (success) {
      setCopiedAnimated(true);
      setTimeout(() => setCopiedAnimated(false), 2000);
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
      <div className="flex items-center gap-1.5">
        <ActionButton
          onClick={handleBatchExport}
          label={isBatching ? "Generating..." : "Batch Export"}
        />
        <select
          value={batchCount}
          onChange={(e) => setBatchCount(Number(e.target.value))}
          className="px-2 py-1.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 focus:outline-none"
          title="Batch count"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
      <ActionButton
        onClick={handleCopyAnimated}
        label={copiedAnimated ? "Copied!" : "Copy Animated SVG"}
      />
      <SaveFavoriteButton />
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
