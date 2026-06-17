"use client";

import { useState, useRef, useEffect } from "react";
import { usePlaygroundStore, defaultConfigs } from "@/lib/store/playgroundStore";
import { downloadBatchZip } from "@/lib/utils/batchExport";
import { wrapWithAnimation } from "@/lib/utils/animationExport";
import {
  copyToClipboard,
  downloadSvg,
  downloadPng,
  generateCssBackground,
  generateReactComponent,
} from "@/lib/utils/export";
import { SaveFavoriteButton } from "@/components/playground/favoritesPanel";
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
  ArrowDown01Icon,
  MoreHorizontalIcon,
  BookOpen01Icon,
  RefreshIcon,
} from "@hugeicons/core-free-icons";
import Link from "next/link";
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

const wobblyRadius = "255px 15px 225px 15px / 15px 225px 15px 255px";
const wobblyRadiusMd = "15px 225px 15px 255px / 255px 15px 225px 15px";

function SketchDropdown({
  label,
  icon,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={`
          inline-flex items-center gap-1.5 px-3 py-2
          border-[3px] border-pencil text-sm font-body
          bg-white shadow-[4px_4px_0px_0px_#2d2d2d]
          transition-all duration-100
          hover:bg-accent hover:text-white hover:shadow-[2px_2px_0px_0px_#2d2d2d]
          active:shadow-none active:translate-x-[2px] active:translate-y-[2px]
        `}
        style={{ borderRadius: wobblyRadius, fontFamily: "var(--font-body)" }}
      >
        {icon}
        <span>{label}</span>
        <HugeiconsIcon
          icon={ArrowDown01Icon}
          size={14}
          strokeWidth={2.5}
          className={`transition-transform duration-100 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 min-w-[220px] bg-white border-[3px] border-pencil p-2 flex flex-col gap-1 z-50"
          style={{
            borderRadius: wobblyRadiusMd,
            boxShadow: "6px 6px 0px 0px #2d2d2d",
            fontFamily: "var(--font-body)",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

function MenuItem({
  onClick,
  icon,
  label,
  active,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      role="menuitem"
      onClick={() => onClick()}
      className={`
        flex items-center gap-2 px-3 py-2 text-left text-sm font-body
        transition-all duration-100
        ${active
          ? "bg-accent text-white"
          : "text-pencil hover:bg-accent hover:text-white"
        }
      `}
      style={{ borderRadius: wobblyRadius, fontFamily: "var(--font-body)" }}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function MenuDivider() {
  return (
    <div className="my-1 border-t-2 border-dashed border-pencil/20" />
  );
}

export function ActionMenus() {
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
  const hydrate = usePlaygroundStore((s) => s.hydrate);

  const [pngScale, setPngScale] = useState(2);
  const [isDownloadingPng, setIsDownloadingPng] = useState(false);
  const batchCount = 5;
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

  const handleReset = () => {
    hydrate({
      configs: {
        [activeGenerator]: structuredClone(
          defaultConfigs[activeGenerator]
        ),
      },
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <SketchDropdown
        label="Share"
        icon={<HugeiconsIcon icon={Link01Icon} size={16} strokeWidth={2.5} />}
      >
        <MenuItem
          onClick={handleCopyLink}
          icon={<HugeiconsIcon icon={Link01Icon} size={16} strokeWidth={2.5} />}
          label={copiedLink ? "Copied!" : "Copy Link"}
          active={copiedLink}
        />
        <MenuItem
          onClick={handleCopySvg}
          icon={<HugeiconsIcon icon={Svg01Icon} size={16} strokeWidth={2.5} />}
          label={copiedSvg ? "Copied!" : "Copy SVG"}
          active={copiedSvg}
        />
        <MenuItem
          onClick={handleCopyJsx}
          icon={<HugeiconsIcon icon={CodeIcon} size={16} strokeWidth={2.5} />}
          label={copiedJsx ? "Copied!" : "Copy JSX"}
          active={copiedJsx}
        />
        <MenuItem
          onClick={handleCopyCss}
          icon={<HugeiconsIcon icon={CssThreeIcon} size={16} strokeWidth={2.5} />}
          label={copiedCss ? "Copied!" : "Copy CSS"}
          active={copiedCss}
        />
        <MenuItem
          onClick={handleCopyReact}
          icon={<HugeiconsIcon icon={ReactIcon} size={16} strokeWidth={2.5} />}
          label={copiedReact ? "Copied!" : "Copy React"}
          active={copiedReact}
        />
      </SketchDropdown>

      <SketchDropdown
        label="Export"
        icon={<HugeiconsIcon icon={Download04Icon} size={16} strokeWidth={2.5} />}
      >
        <MenuItem
          onClick={handleDownload}
          icon={<HugeiconsIcon icon={Svg01Icon} size={16} strokeWidth={2.5} />}
          label="Download SVG"
        />

        <div
          className="flex items-center gap-2 px-3 py-2"
          style={{ fontFamily: "var(--font-body)" }}
        >
          <HugeiconsIcon icon={Image02Icon} size={16} strokeWidth={2.5} />
          <span className="text-sm font-body text-pencil">PNG</span>
          <select
            value={pngScale}
            onChange={(e) => setPngScale(Number(e.target.value))}
            className="px-2 py-1 bg-white border-[3px] border-pencil text-sm font-body text-pencil cursor-pointer"
            style={{
              borderRadius: wobblyRadiusMd,
              boxShadow: "2px 2px 0px 0px #2d2d2d",
              fontFamily: "var(--font-body)",
            }}
            aria-label="PNG scale"
          >
            <option value={1}>1x</option>
            <option value={2}>2x</option>
            <option value={4}>4x</option>
          </select>
          <button
            onClick={handleDownloadPng}
            className="px-2 py-1 text-sm font-body bg-white border-[3px] border-pencil text-pencil
              shadow-[2px_2px_0px_0px_#2d2d2d] hover:bg-accent hover:text-white transition-all duration-100"
            style={{ borderRadius: wobblyRadius, fontFamily: "var(--font-body)" }}
            aria-label="Download PNG"
          >
            {isDownloadingPng ? "..." : "Go"}
          </button>
        </div>

        <MenuItem
          onClick={handleBatchExport}
          icon={<HugeiconsIcon icon={PackageIcon} size={16} strokeWidth={2.5} />}
          label={isBatching ? "Exporting..." : "Batch Export"}
        />
        <MenuItem
          onClick={handleCopyAnimated}
          icon={<HugeiconsIcon icon={Motion01Icon} size={16} strokeWidth={2.5} />}
          label={copiedAnimated ? "Copied!" : "Animated Export"}
          active={copiedAnimated}
        />
      </SketchDropdown>

      <SketchDropdown
        label="More"
        icon={<HugeiconsIcon icon={MoreHorizontalIcon} size={16} strokeWidth={2.5} />}
      >
        <Link
          href="/docs"
          className="flex items-center gap-2 px-3 py-2 text-left text-sm font-body text-pencil hover:bg-accent hover:text-white transition-all duration-100"
          style={{ borderRadius: wobblyRadius, fontFamily: "var(--font-body)" }}
          role="menuitem"
        >
          <HugeiconsIcon icon={BookOpen01Icon} size={16} strokeWidth={2.5} />
          <span>Docs</span>
        </Link>
        <MenuDivider />
        <MenuItem
          onClick={handleReset}
          icon={<HugeiconsIcon icon={RefreshIcon} size={16} strokeWidth={2.5} />}
          label="Reset Config"
        />
      </SketchDropdown>

      <SaveFavoriteButton />
    </div>
  );
}
