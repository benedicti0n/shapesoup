"use client";

import { useState } from "react";
import { usePlaygroundStore, defaultConfigs } from "@/lib/store/playgroundStore";
import { PresetsPanel } from "./presetsPanel";
import { FavoritesPanel } from "./favoritesPanel";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  DiceIcon,
  MagicWand01Icon,
  ChevronDownIcon,
  PackageIcon,
  Motion01Icon,
  RefreshIcon,
  Image02Icon,
} from "@hugeicons/core-free-icons";
import {
  BlobControls,
  WaveControls,
  BlurryGradientControls,
  BlobSceneControls,
  LayeredWavesControls,
  StackedWavesControls,
  LowPolyGridControls,
  LayeredPeaksControls,
  TopoLinesControls,
  DotMatrixControls,
  MeshGradientControls,
  NoiseGridControls,
  BauhausPatternControls,
  SketchInput,
  SketchButton,
} from "./generatorControls";
import { downloadBatchZip } from "@/lib/utils/batchExport";
import { wrapWithAnimation } from "@/lib/utils/animationExport";
import { downloadPng } from "@/lib/utils/export";
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

const canvasPresets = [
  { label: "800 x 600", width: 800, height: 600 },
  { label: "1200 x 800", width: 1200, height: 800 },
  { label: "1920 x 1080", width: 1920, height: 1080 },
  { label: "1080 x 1080", width: 1080, height: 1080 },
  { label: "640 x 640", width: 640, height: 640 },
];

const wobblyRadiusMd = "15px 225px 15px 255px / 255px 15px 225px 15px";

function Accordion({
  title,
  defaultOpen,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  return (
    <div
      className="bg-white border-[3px] border-pencil"
      style={{
        borderRadius: wobblyRadiusMd,
        boxShadow: "4px 4px 0px 0px rgba(45,45,45,0.1)",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
        aria-expanded={open}
      >
        <h3
          className="text-base font-bold font-heading text-pencil"
          style={{ transform: "rotate(-0.3deg)" }}
        >
          {title}
        </h3>
        <HugeiconsIcon
          icon={ChevronDownIcon}
          size={18}
          strokeWidth={2.5}
          className={`text-pencil transition-transform duration-100 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-4 pb-4 flex flex-col gap-3">
          <div className="w-full h-0.5 border-dashed border-t-2 border-pencil opacity-20" />
          {children}
        </div>
      )}
    </div>
  );
}

export function InspectorSidebar() {
  const activeGenerator = usePlaygroundStore((s) => s.activeGenerator);
  const configs = usePlaygroundStore((s) => s.configs);
  const seed = usePlaygroundStore((s) => s.seed);
  const result = usePlaygroundStore((s) => s.result);
  const updateConfig = usePlaygroundStore((s) => s.updateConfig);
  const setSeed = usePlaygroundStore((s) => s.setSeed);
  const randomizeSeed = usePlaygroundStore((s) => s.randomizeSeed);
  const randomizeAll = usePlaygroundStore((s) => s.randomizeAll);
  const setCanvasSize = usePlaygroundStore((s) => s.setCanvasSize);
  const hydrate = usePlaygroundStore((s) => s.hydrate);

  const currentConfig = configs[activeGenerator];

  const [batchCount, setBatchCount] = useState(5);
  const [isBatching, setIsBatching] = useState(false);
  const [isDownloadingPng, setIsDownloadingPng] = useState(false);
  const [copiedAnimated, setCopiedAnimated] = useState(false);

  const handleBatchExport = async () => {
    if (!result || isBatching) return;
    setIsBatching(true);
    try {
      const items: { filename: string; content: string }[] = [];
      const config = configs[activeGenerator];

      for (let i = 0; i < batchCount; i++) {
        const s = Math.random().toString(36).substring(2, 10);
        let output;
        switch (activeGenerator) {
          case "Blob": output = generateBlob({ ...config, seed: s }); break;
          case "Wave": output = generateWave({ ...config, seed: s }); break;
          case "Blurry Gradient": output = generateBlurryGradient({ ...config, seed: s }); break;
          case "Blob Scene": output = generateBlobScene({ ...config, seed: s }); break;
          case "Layered Waves": output = generateLayeredWaves({ ...config, seed: s }); break;
          case "Stacked Waves": output = generateStackedWaves({ ...config, seed: s }); break;
          case "Low Poly Grid": output = generateLowPolyGrid({ ...config, seed: s }); break;
          case "Layered Peaks": output = generateLayeredPeaks({ ...config, seed: s }); break;
          case "Topographic Lines": output = generateTopoLines({ ...config, seed: s }); break;
          case "Dot Matrix": output = generateDotMatrix({ ...config, seed: s }); break;
          case "Mesh Gradient": output = generateMeshGradient({ ...config, seed: s }); break;
          case "Noise Grid": output = generateNoiseGrid({ ...config, seed: s }); break;
          case "Bauhaus Pattern": output = generateBauhausPattern({ ...config, seed: s }); break;
        }
        if (!output) continue;
        items.push({
          filename: `${activeGenerator.toLowerCase().replace(/\s+/g, "-")}-${s}.svg`,
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
    try {
      await navigator.clipboard.writeText(animated);
      setCopiedAnimated(true);
      setTimeout(() => setCopiedAnimated(false), 2000);
    } catch {
      // silently fail
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
        2
      );
    } catch {
      // silently fail
    } finally {
      setIsDownloadingPng(false);
    }
  };

  const handleReset = () => {
    hydrate({
      configs: {
        [activeGenerator]: structuredClone(defaultConfigs[activeGenerator]),
      },
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Seed */}
      <Accordion title="Seed" defaultOpen>
        <SketchInput
          type="text"
          value={seed}
          onChange={(e) => setSeed(e.target.value)}
          aria-label="Seed value"
        />
        <div className="flex gap-2">
          <SketchButton
            onClick={randomizeSeed}
            icon={<HugeiconsIcon icon={DiceIcon} size={16} strokeWidth={2.5} />}
            className="flex-1"
          >
            Random Seed
          </SketchButton>
          <SketchButton
            onClick={randomizeAll}
            variant="accent"
            icon={<HugeiconsIcon icon={MagicWand01Icon} size={16} strokeWidth={2.5} />}
            className="flex-1"
          >
            Randomize All
          </SketchButton>
        </div>
      </Accordion>

      {/* Canvas */}
      <Accordion title="Canvas" defaultOpen>
        <div className="flex flex-wrap gap-2">
          {canvasPresets.map((preset) => (
            <button
              key={preset.label}
              onClick={() => setCanvasSize(preset.width, preset.height)}
              className={`
                px-3 py-1.5 text-sm font-body border-[3px] border-pencil
                transition-all duration-100
                hover:shadow-[2px_2px_0px_0px_#2d2d2d] hover:-translate-y-px
                active:shadow-none active:translate-x-[2px] active:translate-y-[2px]
                ${currentConfig.width === preset.width && currentConfig.height === preset.height
                  ? "bg-accent text-white shadow-[2px_2px_0px_0px_#2d2d2d]"
                  : "bg-white shadow-[3px_3px_0px_0px_#2d2d2d] text-pencil hover:bg-accent hover:text-white"
                }
              `}
              style={{ borderRadius: wobblyRadiusMd, fontFamily: "var(--font-body)" }}
            >
              {preset.label}
            </button>
          ))}
        </div>
        <div className="flex gap-3 mt-1">
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-sm font-body text-pencil/70">Width</label>
            <SketchInput
              type="number"
              min={100}
              max={4000}
              value={currentConfig.width}
              onChange={(e) => setCanvasSize(Number(e.target.value), currentConfig.height)}
              aria-label="Canvas width"
            />
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-sm font-body text-pencil/70">Height</label>
            <SketchInput
              type="number"
              min={100}
              max={4000}
              value={currentConfig.height}
              onChange={(e) => setCanvasSize(currentConfig.width, Number(e.target.value))}
              aria-label="Canvas height"
            />
          </div>
        </div>
      </Accordion>

      {/* Generator Controls */}
      <Accordion title={`${activeGenerator} Controls`} defaultOpen>
        {activeGenerator === "Blob" && (
          <BlobControls config={configs.Blob} update={updateConfig} />
        )}
        {activeGenerator === "Wave" && (
          <WaveControls config={configs.Wave} update={updateConfig} />
        )}
        {activeGenerator === "Blurry Gradient" && (
          <BlurryGradientControls config={configs["Blurry Gradient"]} update={updateConfig} />
        )}
        {activeGenerator === "Blob Scene" && (
          <BlobSceneControls config={configs["Blob Scene"]} update={updateConfig} />
        )}
        {activeGenerator === "Layered Waves" && (
          <LayeredWavesControls config={configs["Layered Waves"]} update={updateConfig} />
        )}
        {activeGenerator === "Stacked Waves" && (
          <StackedWavesControls config={configs["Stacked Waves"]} update={updateConfig} />
        )}
        {activeGenerator === "Low Poly Grid" && (
          <LowPolyGridControls config={configs["Low Poly Grid"]} update={updateConfig} />
        )}
        {activeGenerator === "Layered Peaks" && (
          <LayeredPeaksControls config={configs["Layered Peaks"]} update={updateConfig} />
        )}
        {activeGenerator === "Topographic Lines" && (
          <TopoLinesControls config={configs["Topographic Lines"]} update={updateConfig} />
        )}
        {activeGenerator === "Dot Matrix" && (
          <DotMatrixControls config={configs["Dot Matrix"]} update={updateConfig} />
        )}
        {activeGenerator === "Mesh Gradient" && (
          <MeshGradientControls config={configs["Mesh Gradient"]} update={updateConfig} />
        )}
        {activeGenerator === "Noise Grid" && (
          <NoiseGridControls config={configs["Noise Grid"]} update={updateConfig} />
        )}
        {activeGenerator === "Bauhaus Pattern" && (
          <BauhausPatternControls config={configs["Bauhaus Pattern"]} update={updateConfig} />
        )}
      </Accordion>

      {/* Presets */}
      <Accordion title="Presets">
        <PresetsPanel />
      </Accordion>

      {/* Advanced */}
      <Accordion title="Advanced">
        <div className="flex flex-col gap-3">
          <SketchButton
            onClick={handleReset}
            icon={<HugeiconsIcon icon={RefreshIcon} size={16} strokeWidth={2.5} />}
          >
            Reset to Defaults
          </SketchButton>

          <div className="flex items-center gap-2">
            <SketchButton
              onClick={handleDownloadPng}
              icon={<HugeiconsIcon icon={Image02Icon} size={16} strokeWidth={2.5} />}
            >
              {isDownloadingPng ? "..." : "PNG 2x"}
            </SketchButton>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <SketchButton
                onClick={handleBatchExport}
                icon={<HugeiconsIcon icon={PackageIcon} size={16} strokeWidth={2.5} />}
              >
                {isBatching ? "Exporting..." : "Batch Export"}
              </SketchButton>
              <select
                value={batchCount}
                onChange={(e) => setBatchCount(Number(e.target.value))}
                className="px-2 py-2 bg-white border-[3px] border-pencil text-sm font-body text-pencil cursor-pointer"
                style={{
                  borderRadius: wobblyRadiusMd,
                  boxShadow: "3px 3px 0px 0px #2d2d2d",
                  fontFamily: "var(--font-body)",
                }}
                aria-label="Batch count"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>

          <SketchButton
            onClick={handleCopyAnimated}
            icon={<HugeiconsIcon icon={Motion01Icon} size={16} strokeWidth={2.5} />}
          >
            {copiedAnimated ? "Copied!" : "Copy Animated SVG"}
          </SketchButton>

          <FavoritesPanel />
        </div>
      </Accordion>
    </div>
  );
}
