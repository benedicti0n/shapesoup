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
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Link01Icon,
  Svg01Icon,
  CodeIcon,
  CssThreeIcon,
  ReactIcon,
  Download04Icon,
  Image02Icon,
  PackageIcon,
  Motion01Icon,
} from "@hugeicons/core-free-icons";

const wobblyRadius = "255px 15px 225px 15px / 15px 225px 15px 255px";
const wobblyRadiusMd = "15px 225px 15px 255px / 255px 15px 225px 15px";

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
    <div className="flex flex-wrap items-center gap-2.5">
      <SketchButton onClick={handleCopyLink} active={copiedLink} icon={<HugeiconsIcon icon={Link01Icon} size={16} strokeWidth={2.5} />}>
        {copiedLink ? "Copied!" : "Link"}
      </SketchButton>
      <SketchButton onClick={handleCopySvg} active={copiedSvg} icon={<HugeiconsIcon icon={Svg01Icon} size={16} strokeWidth={2.5} />}>
        {copiedSvg ? "Copied!" : "SVG"}
      </SketchButton>
      <SketchButton onClick={handleCopyJsx} active={copiedJsx} icon={<HugeiconsIcon icon={CodeIcon} size={16} strokeWidth={2.5} />}>
        {copiedJsx ? "Copied!" : "JSX"}
      </SketchButton>
      <SketchButton onClick={handleCopyCss} active={copiedCss} icon={<HugeiconsIcon icon={CssThreeIcon} size={16} strokeWidth={2.5} />}>
        {copiedCss ? "Copied!" : "CSS"}
      </SketchButton>
      <SketchButton onClick={handleCopyReact} active={copiedReact} icon={<HugeiconsIcon icon={ReactIcon} size={16} strokeWidth={2.5} />}>
        {copiedReact ? "Copied!" : "React"}
      </SketchButton>
      <SketchButton onClick={handleDownload} icon={<HugeiconsIcon icon={Download04Icon} size={16} strokeWidth={2.5} />}>
        SVG
      </SketchButton>

      <div className="flex items-center gap-1.5">
        <SketchButton
          onClick={handleDownloadPng}
          icon={<HugeiconsIcon icon={Image02Icon} size={16} strokeWidth={2.5} />}
        >
          {isDownloadingPng ? "..." : "PNG"}
        </SketchButton>
        <select
          value={pngScale}
          onChange={(e) => setPngScale(Number(e.target.value))}
          className="px-2 py-1.5 bg-white border-[3px] border-pencil text-sm font-body text-pencil cursor-pointer"
          style={{
            borderRadius: wobblyRadiusMd,
            boxShadow: "3px 3px 0px 0px #2d2d2d",
            fontFamily: "var(--font-body)",
          }}
          title="PNG scale"
        >
          <option value={1}>1x</option>
          <option value={2}>2x</option>
          <option value={4}>4x</option>
        </select>
      </div>

      <div className="flex items-center gap-1.5">
        <SketchButton
          onClick={handleBatchExport}
          icon={<HugeiconsIcon icon={PackageIcon} size={16} strokeWidth={2.5} />}
        >
          {isBatching ? "..." : "Batch"}
        </SketchButton>
        <select
          value={batchCount}
          onChange={(e) => setBatchCount(Number(e.target.value))}
          className="px-2 py-1.5 bg-white border-[3px] border-pencil text-sm font-body text-pencil cursor-pointer"
          style={{
            borderRadius: wobblyRadiusMd,
            boxShadow: "3px 3px 0px 0px #2d2d2d",
            fontFamily: "var(--font-body)",
          }}
          title="Batch count"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>

      <SketchButton
        onClick={handleCopyAnimated}
        active={copiedAnimated}
        icon={<HugeiconsIcon icon={Motion01Icon} size={16} strokeWidth={2.5} />}
      >
        {copiedAnimated ? "Copied!" : "Animated"}
      </SketchButton>

      <SaveFavoriteButton />
    </div>
  );
}

function SketchButton({
  onClick,
  children,
  active,
  icon,
}: {
  onClick: () => void;
  children: React.ReactNode;
  active?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center gap-1.5 px-3 py-2
        border-[3px] border-pencil text-sm font-body
        transition-all duration-100
        hover:bg-accent hover:text-white hover:shadow-[2px_2px_0px_0px_#2d2d2d]
        active:shadow-none active:translate-x-[3px] active:translate-y-[3px]
        ${active ? "bg-accent text-white shadow-[2px_2px_0px_0px_#2d2d2d]" : "bg-white shadow-[4px_4px_0px_0px_#2d2d2d] text-pencil"}
      `}
      style={{ borderRadius: wobblyRadius, fontFamily: "var(--font-body)" }}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}
