"use client";

import { useState } from "react";
import { usePlaygroundStore } from "@/lib/store/playgroundStore";
import { copyToClipboard, downloadPng } from "@/lib/utils/export";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Copy01Icon,
  Image02Icon,
  Link01Icon,
  FullScreenIcon,
} from "@hugeicons/core-free-icons";

const wobblyRadius = "255px 15px 225px 15px / 15px 225px 15px 255px";

type PreviewBg = "paper" | "white" | "dark";

export function PreviewWorkspace() {
  const result = usePlaygroundStore((s) => s.result);
  const seed = usePlaygroundStore((s) => s.seed);
  const [bg, setBg] = useState<PreviewBg>("paper");
  const [copiedSvg, setCopiedSvg] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isDownloadingPng, setIsDownloadingPng] = useState(false);

  if (!result) {
    return (
      <div className="flex items-center justify-center h-full text-pencil/40 font-body text-xl">
        No preview available
      </div>
    );
  }

  const bgClass =
    bg === "paper"
      ? "bg-paper"
      : bg === "white"
        ? "bg-white"
        : "bg-pencil";

  const handleCopySvg = async () => {
    const success = await copyToClipboard(result.svg);
    if (success) {
      setCopiedSvg(true);
      setTimeout(() => setCopiedSvg(false), 2000);
    }
  };

  const handleCopyLink = async () => {
    const success = await copyToClipboard(window.location.href);
    if (success) {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleDownloadPng = async () => {
    setIsDownloadingPng(true);
    try {
      await downloadPng(
        result.svg,
        result.metadata.width,
        result.metadata.height,
        "pattern.png",
        2
      );
    } catch {
      // silently fail
    } finally {
      setIsDownloadingPng(false);
    }
  };

  const handleFullscreen = () => {
    const blob = new Blob([result.svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full h-full">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <BgToggle label="Paper" active={bg === "paper"} onClick={() => setBg("paper")} />
        <BgToggle label="White" active={bg === "white"} onClick={() => setBg("white")} />
        <BgToggle label="Dark" active={bg === "dark"} onClick={() => setBg("dark")} />
      </div>

      {/* Sketch frame around preview */}
      <div
        className={`relative w-full max-w-4xl border-[3px] border-pencil overflow-hidden p-3 ${bgClass} transition-colors duration-200`}
        style={{
          borderRadius: "15px 225px 15px 255px / 255px 15px 225px 15px",
          boxShadow: "6px 6px 0px 0px #2d2d2d",
          transform: "rotate(-0.3deg)",
        }}
      >
        {/* Tape decoration */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-24 h-6 bg-muted/60 border border-pencil/20"
          style={{
            transform: "translate(-50%, -50%) rotate(-2deg)",
            borderRadius: "2px",
          }}
        />
        <div
          className="w-full bg-white"
          style={{ borderRadius: "8px 200px 8px 230px / 230px 8px 200px 8px" }}
          dangerouslySetInnerHTML={{ __html: result.svg }}
        />
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <QuickActionButton
          onClick={handleCopySvg}
          icon={<HugeiconsIcon icon={Copy01Icon} size={14} strokeWidth={2.5} />}
          label={copiedSvg ? "Copied!" : "Copy SVG"}
          active={copiedSvg}
        />
        <QuickActionButton
          onClick={handleDownloadPng}
          icon={<HugeiconsIcon icon={Image02Icon} size={14} strokeWidth={2.5} />}
          label={isDownloadingPng ? "..." : "PNG 2x"}
        />
        <QuickActionButton
          onClick={handleCopyLink}
          icon={<HugeiconsIcon icon={Link01Icon} size={14} strokeWidth={2.5} />}
          label={copiedLink ? "Copied!" : "Copy Link"}
          active={copiedLink}
        />
        <QuickActionButton
          onClick={handleFullscreen}
          icon={<HugeiconsIcon icon={FullScreenIcon} size={14} strokeWidth={2.5} />}
          label="Fullscreen"
        />
      </div>

      {/* Info badges */}
      <div className="flex gap-3 flex-wrap justify-center">
        <Badge>
          {result.metadata.width} x {result.metadata.height}
        </Badge>
        <Badge>{result.metadata.elements} elements</Badge>
        <Badge>{result.metadata.generator}</Badge>
        <Badge>seed: {seed.slice(0, 12)}</Badge>
      </div>
    </div>
  );
}

function BgToggle({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        px-3 py-1 text-sm font-body border-[3px] border-pencil transition-all duration-100
        ${active
          ? "bg-accent text-white shadow-[2px_2px_0px_0px_#2d2d2d]"
          : "bg-white text-pencil shadow-[3px_3px_0px_0px_rgba(45,45,45,0.12)] hover:bg-accent hover:text-white"
        }
      `}
      style={{ borderRadius: wobblyRadius, fontFamily: "var(--font-body)" }}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}

function QuickActionButton({
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
        inline-flex items-center gap-1.5 px-3 py-1.5
        border-[3px] border-pencil text-sm font-body
        transition-all duration-100
        hover:shadow-[2px_2px_0px_0px_#2d2d2d] hover:-translate-y-px
        active:shadow-none active:translate-x-[2px] active:translate-y-[2px]
        ${active
          ? "bg-accent text-white shadow-[2px_2px_0px_0px_#2d2d2d]"
          : "bg-white shadow-[3px_3px_0px_0px_rgba(45,45,45,0.12)] text-pencil hover:bg-accent hover:text-white"
        }
      `}
      style={{ borderRadius: wobblyRadius, fontFamily: "var(--font-body)" }}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="px-3 py-1 bg-white border-[3px] border-pencil text-sm font-body text-pencil"
      style={{
        borderRadius: wobblyRadius,
        boxShadow: "3px 3px 0px 0px #2d2d2d",
        fontFamily: "var(--font-body)",
        transform: "rotate(0.5deg)",
      }}
    >
      {children}
    </span>
  );
}
