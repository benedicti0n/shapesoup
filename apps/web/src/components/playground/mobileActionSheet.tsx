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
  BookOpen01Icon,
  RefreshIcon,
  Cancel01Icon,
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

export function MobileActionSheet({ onClose }: { onClose: () => void }) {
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
  const [isBatching, setIsBatching] = useState(false);
  const [copiedAnimated, setCopiedAnimated] = useState(false);

  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (sheetRef.current && !sheetRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleCopySvg = async () => {
    if (!result) return;
    const success = await copyToClipboard(result.svg);
    if (success) { setCopiedSvg(true); setTimeout(() => setCopiedSvg(false), 2000); }
  };
  const handleCopyJsx = async () => {
    if (!result) return;
    const success = await copyToClipboard(result.jsx);
    if (success) { setCopiedJsx(true); setTimeout(() => setCopiedJsx(false), 2000); }
  };
  const handleDownload = () => { if (!result) return; downloadSvg(result.svg, "pattern.svg"); };
  const handleCopyLink = async () => {
    const success = await copyToClipboard(window.location.href);
    if (success) { setCopiedLink(true); setTimeout(() => setCopiedLink(false), 2000); }
  };
  const handleDownloadPng = async () => {
    if (!result) return;
    setIsDownloadingPng(true);
    try { await downloadPng(result.svg, result.metadata.width, result.metadata.height, "pattern.png", pngScale); }
    catch { /* silently fail */ } finally { setIsDownloadingPng(false); }
  };
  const handleCopyCss = async () => {
    if (!result) return;
    const css = generateCssBackground(result.dataUri);
    const success = await copyToClipboard(css);
    if (success) { setCopiedCss(true); setTimeout(() => setCopiedCss(false), 2000); }
  };
  const handleCopyReact = async () => {
    if (!result) return;
    const react = generateReactComponent(result.dataUri, result.metadata.width, result.metadata.height);
    const success = await copyToClipboard(react);
    if (success) { setCopiedReact(true); setTimeout(() => setCopiedReact(false), 2000); }
  };
  const handleBatchExport = async () => {
    if (!result || isBatching) return;
    setIsBatching(true);
    try {
      const items: { filename: string; content: string }[] = [];
      const config = configs[activeGenerator];
      for (let i = 0; i < 5; i++) {
        const seed = Math.random().toString(36).substring(2, 10);
        let output;
        switch (activeGenerator) {
          case "Blob": output = generateBlob({ ...config, seed }); break;
          case "Wave": output = generateWave({ ...config, seed }); break;
          case "Blurry Gradient": output = generateBlurryGradient({ ...config, seed }); break;
          case "Blob Scene": output = generateBlobScene({ ...config, seed }); break;
          case "Layered Waves": output = generateLayeredWaves({ ...config, seed }); break;
          case "Stacked Waves": output = generateStackedWaves({ ...config, seed }); break;
          case "Low Poly Grid": output = generateLowPolyGrid({ ...config, seed }); break;
          case "Layered Peaks": output = generateLayeredPeaks({ ...config, seed }); break;
          case "Topographic Lines": output = generateTopoLines({ ...config, seed }); break;
          case "Dot Matrix": output = generateDotMatrix({ ...config, seed }); break;
          case "Mesh Gradient": output = generateMeshGradient({ ...config, seed }); break;
          case "Noise Grid": output = generateNoiseGrid({ ...config, seed }); break;
          case "Bauhaus Pattern": output = generateBauhausPattern({ ...config, seed }); break;
        }
        if (!output) continue;
        items.push({ filename: `${activeGenerator.toLowerCase().replace(/\s+/g, "-")}-${seed}.svg`, content: output.svg });
      }
      await downloadBatchZip(items);
    } catch { /* silently fail */ } finally { setIsBatching(false); }
  };
  const handleCopyAnimated = async () => {
    if (!result) return;
    const animated = wrapWithAnimation(result.svg, activeGenerator);
    const success = await copyToClipboard(animated);
    if (success) { setCopiedAnimated(true); setTimeout(() => setCopiedAnimated(false), 2000); }
  };
  const handleReset = () => {
    hydrate({ configs: { [activeGenerator]: structuredClone(defaultConfigs[activeGenerator]) } });
  };

  return (
    <div className="fixed inset-0 z-[60] flex flex-col justify-end">
      <div className="absolute inset-0 bg-pencil/30" onClick={onClose} aria-hidden="true" />
      <div
        ref={sheetRef}
        className="relative bg-white border-t-[3px] border-pencil max-h-[85vh] overflow-y-auto"
        style={{ boxShadow: "0 -8px 0px 0px rgba(45,45,45,0.15)" }}
      >
        {/* Handle */}
        <div className="flex items-center justify-center pt-3 pb-1">
          <div className="w-12 h-1.5 bg-pencil/30 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 pb-3">
          <h2 className="text-lg font-bold font-heading text-pencil" style={{ transform: "rotate(-0.5deg)" }}>
            Actions
          </h2>
          <button
            onClick={onClose}
            className="p-2 bg-white border-[3px] border-pencil hover:bg-accent hover:text-white transition-colors"
            style={{ borderRadius: wobblyRadius, boxShadow: "2px 2px 0px 0px #2d2d2d" }}
            aria-label="Close actions"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={18} strokeWidth={2.5} />
          </button>
        </div>

        <div className="px-4 pb-6 flex flex-col gap-5">
          {/* Share */}
          <Section title="Share">
            <div className="grid grid-cols-2 gap-2">
              <SheetButton onClick={handleCopyLink} active={copiedLink} icon={<HugeiconsIcon icon={Link01Icon} size={18} strokeWidth={2.5} />} label={copiedLink ? "Copied!" : "Copy Link"} />
              <SheetButton onClick={handleCopySvg} active={copiedSvg} icon={<HugeiconsIcon icon={Svg01Icon} size={18} strokeWidth={2.5} />} label={copiedSvg ? "Copied!" : "Copy SVG"} />
              <SheetButton onClick={handleCopyJsx} active={copiedJsx} icon={<HugeiconsIcon icon={CodeIcon} size={18} strokeWidth={2.5} />} label={copiedJsx ? "Copied!" : "Copy JSX"} />
              <SheetButton onClick={handleCopyCss} active={copiedCss} icon={<HugeiconsIcon icon={CssThreeIcon} size={18} strokeWidth={2.5} />} label={copiedCss ? "Copied!" : "Copy CSS"} />
              <SheetButton onClick={handleCopyReact} active={copiedReact} icon={<HugeiconsIcon icon={ReactIcon} size={18} strokeWidth={2.5} />} label={copiedReact ? "Copied!" : "Copy React"} />
            </div>
          </Section>

          {/* Export */}
          <Section title="Export">
            <div className="grid grid-cols-2 gap-2">
              <SheetButton onClick={handleDownload} icon={<HugeiconsIcon icon={Download04Icon} size={18} strokeWidth={2.5} />} label="Download SVG" />
              <SheetButton onClick={handleDownloadPng} icon={<HugeiconsIcon icon={Image02Icon} size={18} strokeWidth={2.5} />} label={isDownloadingPng ? "..." : `PNG ${pngScale}x`} />
              <SheetButton onClick={handleBatchExport} icon={<HugeiconsIcon icon={PackageIcon} size={18} strokeWidth={2.5} />} label={isBatching ? "Exporting..." : "Batch Export"} />
              <SheetButton onClick={handleCopyAnimated} active={copiedAnimated} icon={<HugeiconsIcon icon={Motion01Icon} size={18} strokeWidth={2.5} />} label={copiedAnimated ? "Copied!" : "Animated"} />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm font-body text-pencil/70">PNG scale:</span>
              <div className="flex gap-1">
                {[1, 2, 4].map((s) => (
                  <button
                    key={s}
                    onClick={() => setPngScale(s)}
                    className={`px-3 py-1.5 text-sm font-body border-[3px] border-pencil transition-all ${pngScale === s ? "bg-accent text-white shadow-[2px_2px_0px_0px_#2d2d2d]" : "bg-white shadow-[2px_2px_0px_0px_rgba(45,45,45,0.12)] text-pencil"}`}
                    style={{ borderRadius: wobblyRadius, fontFamily: "var(--font-body)" }}
                  >
                    {s}x
                  </button>
                ))}
              </div>
            </div>
          </Section>

          {/* Other */}
          <Section title="Other">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <SaveFavoriteButton />
              </div>
              <Link
                href="/docs"
                className="flex items-center gap-2 px-4 py-3 bg-white border-[3px] border-pencil text-pencil text-base font-body shadow-[3px_3px_0px_0px_rgba(45,45,45,0.12)] hover:bg-accent hover:text-white transition-all"
                style={{ borderRadius: wobblyRadius, fontFamily: "var(--font-body)" }}
                onClick={onClose}
              >
                <HugeiconsIcon icon={BookOpen01Icon} size={18} strokeWidth={2.5} />
                Docs
              </Link>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-3 bg-white border-[3px] border-pencil text-pencil text-base font-body shadow-[3px_3px_0px_0px_rgba(45,45,45,0.12)] hover:bg-accent hover:text-white transition-all text-left"
                style={{ borderRadius: wobblyRadius, fontFamily: "var(--font-body)" }}
              >
                <HugeiconsIcon icon={RefreshIcon} size={18} strokeWidth={2.5} />
                Reset Config
              </button>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-bold font-heading text-pencil/60 uppercase tracking-wider" style={{ transform: "rotate(-0.3deg)" }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

function SheetButton({
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
      onClick={onClick}
      className={`
        flex items-center gap-2 px-3 py-3
        border-[3px] border-pencil text-sm font-body
        transition-all duration-100
        ${active
          ? "bg-accent text-white shadow-[2px_2px_0px_0px_#2d2d2d]"
          : "bg-white shadow-[3px_3px_0px_0px_rgba(45,45,45,0.12)] text-pencil hover:bg-accent hover:text-white"
        }
      `}
      style={{ borderRadius: wobblyRadius, fontFamily: "var(--font-body)" }}
    >
      {icon}
      <span className="truncate">{label}</span>
    </button>
  );
}
