"use client";

import { usePlaygroundStore } from "@/lib/store/playgroundStore";
import { PresetsPanel } from "@/components/playground/presetsPanel";
import { HugeiconsIcon } from "@hugeicons/react";
import { DiceIcon, MagicWand01Icon } from "@hugeicons/core-free-icons";
import type {
  BlobConfig,
  WaveConfig,
  BlurryGradientConfig,
  BlobSceneConfig,
  LowPolyGridConfig,
  LayeredPeaksConfig,
  TopoLinesConfig,
  DotMatrixConfig,
  MeshGradientConfig,
  NoiseGridConfig,
  BauhausPatternConfig,
} from "@shapesoup/core";

const canvasPresets = [
  { label: "800 x 600", width: 800, height: 600 },
  { label: "1200 x 800", width: 1200, height: 800 },
  { label: "1920 x 1080", width: 1920, height: 1080 },
  { label: "1080 x 1080", width: 1080, height: 1080 },
  { label: "640 x 640", width: 640, height: 640 },
];

const wobblyRadius = "255px 15px 225px 15px / 15px 225px 15px 255px";
const wobblyRadiusMd = "15px 225px 15px 255px / 255px 15px 225px 15px";

export function ControlsSidebar() {
  const activeGenerator = usePlaygroundStore((s) => s.activeGenerator);
  const configs = usePlaygroundStore((s) => s.configs);
  const seed = usePlaygroundStore((s) => s.seed);
  const updateConfig = usePlaygroundStore((s) => s.updateConfig);
  const setSeed = usePlaygroundStore((s) => s.setSeed);
  const randomizeSeed = usePlaygroundStore((s) => s.randomizeSeed);
  const randomizeAll = usePlaygroundStore((s) => s.randomizeAll);
  const setCanvasSize = usePlaygroundStore((s) => s.setCanvasSize);

  const currentConfig = configs[activeGenerator];

  return (
    <div className="flex flex-col gap-6">
      <PresetsPanel />

      {/* Seed Section */}
      <SketchSection title="Seed">
        <div className="flex gap-2">
          <SketchInput
            type="text"
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
            className="flex-1"
          />
        </div>
        <div className="flex gap-2 mt-2">
          <SketchButton onClick={randomizeSeed} icon={<HugeiconsIcon icon={DiceIcon} size={16} strokeWidth={2.5} />}>
            Seed
          </SketchButton>
          <SketchButton
            onClick={randomizeAll}
            variant="accent"
            icon={<HugeiconsIcon icon={MagicWand01Icon} size={16} strokeWidth={2.5} />}
          >
            All
          </SketchButton>
        </div>
      </SketchSection>

      {/* Canvas Size Section */}
      <SketchSection title="Canvas">
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
        <div className="flex gap-3 mt-3">
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-sm font-body text-pencil/70">Width</label>
            <SketchInput
              type="number"
              min={100}
              max={4000}
              value={currentConfig.width}
              onChange={(e) => setCanvasSize(Number(e.target.value), currentConfig.height)}
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
            />
          </div>
        </div>
      </SketchSection>

      {/* Generator-specific controls */}
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
    </div>
  );
}

/* ─── Reusable sketch primitives ─── */

function SketchSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h2
        className="text-lg font-bold font-heading text-pencil"
        style={{ transform: "rotate(-0.5deg)" }}
      >
        {title}
      </h2>
      <div className="w-full h-0.5 bg-pencil border-dashed border-t-2 border-pencil opacity-20" />
      {children}
    </div>
  );
}

function SketchInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`
        px-3 py-2 bg-white border-[3px] border-pencil text-pencil text-base font-body
        focus:outline-none focus:border-blue-pen focus:ring-2 focus:ring-blue-pen/20
        transition-all duration-100
        ${props.className || ""}
      `}
      style={{
        borderRadius: wobblyRadiusMd,
        boxShadow: "3px 3px 0px 0px #2d2d2d",
        fontFamily: "var(--font-body)",
        ...props.style,
      }}
    />
  );
}

function SketchButton({
  onClick,
  children,
  variant = "default",
  icon,
}: {
  onClick: () => void;
  children: React.ReactNode;
  variant?: "default" | "accent";
  icon?: React.ReactNode;
}) {
  const isAccent = variant === "accent";
  return (
    <button
      onClick={onClick}
      className={`
        flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2
        border-[3px] border-pencil text-sm font-body
        transition-all duration-100
        hover:shadow-[2px_2px_0px_0px_#2d2d2d] hover:-translate-y-px
        active:shadow-none active:translate-x-[2px] active:translate-y-[2px]
        ${isAccent
          ? "bg-accent text-white shadow-[4px_4px_0px_0px_#2d2d2d] hover:bg-accent"
          : "bg-white text-pencil shadow-[4px_4px_0px_0px_#2d2d2d] hover:bg-accent hover:text-white"
        }
      `}
      style={{ borderRadius: wobblyRadius, fontFamily: "var(--font-body)" }}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}

function ControlSlider({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number | undefined;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}) {
  const safeValue = value ?? min;
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between items-center">
        <label className="text-base font-body text-pencil">{label}</label>
        <span
          className="text-sm font-body text-pencil bg-white border-[2px] border-pencil px-2 py-0.5"
          style={{
            borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
            boxShadow: "2px 2px 0px 0px #2d2d2d",
            fontFamily: "var(--font-body)",
          }}
        >
          {safeValue}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={safeValue}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full"
      />
    </div>
  );
}

function ColorPaletteInput({
  colors,
  onChange,
}: {
  colors: string[] | undefined;
  onChange: (colors: string[]) => void;
}) {
  const safeColors = colors ?? [];
  const updateColor = (index: number, color: string) => {
    const next = [...safeColors];
    next[index] = color;
    onChange(next);
  };

  const addColor = () => {
    onChange([...safeColors, "#2d2d2d"]);
  };

  const removeColor = (index: number) => {
    if (safeColors.length <= 1) return;
    const next = safeColors.filter((_, i) => i !== index);
    onChange(next);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-base font-body text-pencil">Colors</label>
      <div className="flex flex-wrap gap-2">
        {safeColors.map((color, i) => (
          <div key={i} className="flex items-center gap-1">
            <input
              type="color"
              value={color}
              onChange={(e) => updateColor(i, e.target.value)}
              className="w-9 h-9 cursor-pointer"
              style={{
                borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
              }}
            />
            {safeColors.length > 1 && (
              <button
                onClick={() => removeColor(i)}
                className="text-sm text-pencil/40 hover:text-accent transition-colors font-body"
                style={{ fontFamily: "var(--font-body)" }}
              >
                &times;
              </button>
            )}
          </div>
        ))}
        <button
          onClick={addColor}
          className="w-9 h-9 border-[3px] border-dashed border-pencil/30 text-pencil/40 hover:border-pencil hover:text-pencil flex items-center justify-center text-lg transition-all duration-100 bg-white"
          style={{
            borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
            boxShadow: "2px 2px 0px 0px rgba(45,45,45,0.1)",
            fontFamily: "var(--font-body)",
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}

/* ─── Generator control panels ─── */

function BlobControls({
  config,
  update,
}: {
  config: BlobConfig;
  update: (generator: "Blob", updates: Partial<BlobConfig>) => void;
}) {
  return (
    <SketchSection title="Blob">
      <ControlSlider label="Complexity" value={config.complexity} min={3} max={24} step={1} onChange={(v) => update("Blob", { complexity: v })} />
      <ControlSlider label="Contrast" value={config.contrast} min={0} max={1} step={0.05} onChange={(v) => update("Blob", { contrast: v })} />
      <ColorPaletteInput colors={config.colors} onChange={(colors) => update("Blob", { colors })} />
    </SketchSection>
  );
}

function WaveControls({
  config,
  update,
}: {
  config: WaveConfig;
  update: (generator: "Wave", updates: Partial<WaveConfig>) => void;
}) {
  return (
    <SketchSection title="Wave">
      <ControlSlider label="Amplitude" value={config.amplitude} min={10} max={200} step={5} onChange={(v) => update("Wave", { amplitude: v })} />
      <ControlSlider label="Frequency" value={config.frequency} min={0.001} max={0.05} step={0.001} onChange={(v) => update("Wave", { frequency: v })} />
      <ControlSlider label="Points" value={config.points} min={4} max={50} step={1} onChange={(v) => update("Wave", { points: v })} />
      <ColorPaletteInput colors={config.colors} onChange={(colors) => update("Wave", { colors })} />
    </SketchSection>
  );
}

function BlurryGradientControls({
  config,
  update,
}: {
  config: BlurryGradientConfig;
  update: (generator: "Blurry Gradient", updates: Partial<BlurryGradientConfig>) => void;
}) {
  return (
    <SketchSection title="Blurry Gradient">
      <ControlSlider label="Blob Count" value={config.blobCount} min={1} max={15} step={1} onChange={(v) => update("Blurry Gradient", { blobCount: v })} />
      <ControlSlider label="Blur Amount" value={config.blurAmount} min={0} max={100} step={5} onChange={(v) => update("Blurry Gradient", { blurAmount: v })} />
      <ColorPaletteInput colors={config.colors} onChange={(colors) => update("Blurry Gradient", { colors })} />
    </SketchSection>
  );
}

function BlobSceneControls({
  config,
  update,
}: {
  config: BlobSceneConfig;
  update: (generator: "Blob Scene", updates: Partial<BlobSceneConfig>) => void;
}) {
  return (
    <SketchSection title="Blob Scene">
      <ControlSlider label="Groups" value={config.groupCount} min={2} max={4} step={1} onChange={(v) => update("Blob Scene", { groupCount: v })} />
      <ControlSlider label="Layers" value={config.layersPerGroup} min={3} max={6} step={1} onChange={(v) => update("Blob Scene", { layersPerGroup: v })} />
      <ControlSlider label="Complexity" value={config.complexity} min={8} max={16} step={1} onChange={(v) => update("Blob Scene", { complexity: v })} />
      <ControlSlider label="Contrast" value={config.contrast} min={0.15} max={0.45} step={0.05} onChange={(v) => update("Blob Scene", { contrast: v })} />
      <ControlSlider label="Size" value={config.size} min={0.8} max={2.2} step={0.1} onChange={(v) => update("Blob Scene", { size: v })} />
      <ColorPaletteInput colors={config.colors} onChange={(colors) => update("Blob Scene", { colors })} />
    </SketchSection>
  );
}

function LayeredWavesControls({
  config,
  update,
}: {
  config: WaveConfig;
  update: (generator: "Layered Waves", updates: Partial<WaveConfig>) => void;
}) {
  return (
    <SketchSection title="Layered Waves">
      <ControlSlider label="Layers" value={config.layerCount} min={2} max={8} step={1} onChange={(v) => update("Layered Waves", { layerCount: v })} />
      <ControlSlider label="Amplitude" value={config.amplitude} min={10} max={150} step={5} onChange={(v) => update("Layered Waves", { amplitude: v })} />
      <ControlSlider label="Frequency" value={config.frequency} min={0.001} max={0.03} step={0.001} onChange={(v) => update("Layered Waves", { frequency: v })} />
      <ControlSlider label="Points" value={config.points} min={4} max={30} step={1} onChange={(v) => update("Layered Waves", { points: v })} />
      <ColorPaletteInput colors={config.colors} onChange={(colors) => update("Layered Waves", { colors })} />
    </SketchSection>
  );
}

function StackedWavesControls({
  config,
  update,
}: {
  config: WaveConfig;
  update: (generator: "Stacked Waves", updates: Partial<WaveConfig>) => void;
}) {
  return (
    <SketchSection title="Stacked Waves">
      <ControlSlider label="Layers" value={config.layerCount} min={2} max={8} step={1} onChange={(v) => update("Stacked Waves", { layerCount: v })} />
      <ControlSlider label="Amplitude" value={config.amplitude} min={10} max={150} step={5} onChange={(v) => update("Stacked Waves", { amplitude: v })} />
      <ControlSlider label="Frequency" value={config.frequency} min={0.001} max={0.03} step={0.001} onChange={(v) => update("Stacked Waves", { frequency: v })} />
      <ControlSlider label="Points" value={config.points} min={6} max={40} step={1} onChange={(v) => update("Stacked Waves", { points: v })} />
      <ColorPaletteInput colors={config.colors} onChange={(colors) => update("Stacked Waves", { colors })} />
    </SketchSection>
  );
}

function LowPolyGridControls({
  config,
  update,
}: {
  config: LowPolyGridConfig;
  update: (generator: "Low Poly Grid", updates: Partial<LowPolyGridConfig>) => void;
}) {
  return (
    <SketchSection title="Low Poly Grid">
      <ControlSlider label="Columns" value={config.cols} min={3} max={16} step={1} onChange={(v) => update("Low Poly Grid", { cols: v })} />
      <ControlSlider label="Rows" value={config.rows} min={3} max={12} step={1} onChange={(v) => update("Low Poly Grid", { rows: v })} />
      <ControlSlider label="Jitter" value={config.jitter} min={0} max={1} step={0.05} onChange={(v) => update("Low Poly Grid", { jitter: v })} />
      <ColorPaletteInput colors={config.colors} onChange={(colors) => update("Low Poly Grid", { colors })} />
    </SketchSection>
  );
}

function LayeredPeaksControls({
  config,
  update,
}: {
  config: LayeredPeaksConfig;
  update: (generator: "Layered Peaks", updates: Partial<LayeredPeaksConfig>) => void;
}) {
  return (
    <SketchSection title="Layered Peaks">
      <ControlSlider label="Layers" value={config.layerCount} min={2} max={8} step={1} onChange={(v) => update("Layered Peaks", { layerCount: v })} />
      <ControlSlider label="Peaks" value={config.peakCount} min={3} max={20} step={1} onChange={(v) => update("Layered Peaks", { peakCount: v })} />
      <ControlSlider label="Roughness" value={config.roughness} min={0} max={1} step={0.05} onChange={(v) => update("Layered Peaks", { roughness: v })} />
      <ColorPaletteInput colors={config.colors} onChange={(colors) => update("Layered Peaks", { colors })} />
    </SketchSection>
  );
}

function TopoLinesControls({
  config,
  update,
}: {
  config: TopoLinesConfig;
  update: (generator: "Topographic Lines", updates: Partial<TopoLinesConfig>) => void;
}) {
  return (
    <SketchSection title="Topographic Lines">
      <ControlSlider label="Line Count" value={config.lineCount} min={3} max={40} step={1} onChange={(v) => update("Topographic Lines", { lineCount: v })} />
      <ControlSlider label="Amplitude" value={config.amplitude} min={5} max={200} step={5} onChange={(v) => update("Topographic Lines", { amplitude: v })} />
      <ControlSlider label="Frequency" value={config.frequency} min={0.001} max={0.05} step={0.001} onChange={(v) => update("Topographic Lines", { frequency: v })} />
      <ControlSlider label="Noise" value={config.noise} min={0} max={1} step={0.05} onChange={(v) => update("Topographic Lines", { noise: v })} />
      <ControlSlider label="Stroke Width" value={config.strokeWidth} min={0.5} max={5} step={0.5} onChange={(v) => update("Topographic Lines", { strokeWidth: v })} />
      <ControlSlider label="Spacing" value={config.spacing} min={10} max={120} step={5} onChange={(v) => update("Topographic Lines", { spacing: v })} />
      <ColorPaletteInput colors={config.colors} onChange={(colors) => update("Topographic Lines", { colors })} />
    </SketchSection>
  );
}

function DotMatrixControls({
  config,
  update,
}: {
  config: DotMatrixConfig;
  update: (generator: "Dot Matrix", updates: Partial<DotMatrixConfig>) => void;
}) {
  return (
    <SketchSection title="Dot Matrix">
      <ControlSlider label="Columns" value={config.columns} min={4} max={40} step={1} onChange={(v) => update("Dot Matrix", { columns: v })} />
      <ControlSlider label="Rows" value={config.rows} min={4} max={30} step={1} onChange={(v) => update("Dot Matrix", { rows: v })} />
      <ControlSlider label="Min Radius" value={config.minRadius} min={1} max={20} step={1} onChange={(v) => update("Dot Matrix", { minRadius: v })} />
      <ControlSlider label="Max Radius" value={config.maxRadius} min={2} max={50} step={1} onChange={(v) => update("Dot Matrix", { maxRadius: v })} />
      <ControlSlider label="Jitter" value={config.jitter} min={0} max={1} step={0.05} onChange={(v) => update("Dot Matrix", { jitter: v })} />
      <ControlSlider label="Density" value={config.density} min={0.1} max={1} step={0.05} onChange={(v) => update("Dot Matrix", { density: v })} />
      <ColorPaletteInput colors={config.colors} onChange={(colors) => update("Dot Matrix", { colors })} />
    </SketchSection>
  );
}

function MeshGradientControls({
  config,
  update,
}: {
  config: MeshGradientConfig;
  update: (generator: "Mesh Gradient", updates: Partial<MeshGradientConfig>) => void;
}) {
  return (
    <SketchSection title="Mesh Gradient">
      <ControlSlider label="Blob Count" value={config.blobCount} min={2} max={15} step={1} onChange={(v) => update("Mesh Gradient", { blobCount: v })} />
      <ControlSlider label="Blur" value={config.blur} min={0} max={120} step={5} onChange={(v) => update("Mesh Gradient", { blur: v })} />
      <ControlSlider label="Opacity" value={config.opacity} min={0.1} max={1} step={0.05} onChange={(v) => update("Mesh Gradient", { opacity: v })} />
      <ControlSlider label="Min Radius" value={config.minRadius} min={20} max={300} step={10} onChange={(v) => update("Mesh Gradient", { minRadius: v })} />
      <ControlSlider label="Max Radius" value={config.maxRadius} min={50} max={600} step={10} onChange={(v) => update("Mesh Gradient", { maxRadius: v })} />
      <ColorPaletteInput colors={config.colors} onChange={(colors) => update("Mesh Gradient", { colors })} />
    </SketchSection>
  );
}

function NoiseGridControls({
  config,
  update,
}: {
  config: NoiseGridConfig;
  update: (generator: "Noise Grid", updates: Partial<NoiseGridConfig>) => void;
}) {
  return (
    <SketchSection title="Noise Grid">
      <ControlSlider label="Cell Size" value={config.cellSize} min={10} max={100} step={5} onChange={(v) => update("Noise Grid", { cellSize: v })} />
      <ControlSlider label="Density" value={config.density} min={0.1} max={1} step={0.05} onChange={(v) => update("Noise Grid", { density: v })} />
      <ControlSlider label="Shape Size" value={config.shapeSize} min={0.2} max={1} step={0.05} onChange={(v) => update("Noise Grid", { shapeSize: v })} />
      <ControlSlider label="Jitter" value={config.jitter} min={0} max={1} step={0.05} onChange={(v) => update("Noise Grid", { jitter: v })} />
      <ControlSlider label="Stroke Width" value={config.strokeWidth} min={0.5} max={5} step={0.5} onChange={(v) => update("Noise Grid", { strokeWidth: v })} />
      <ColorPaletteInput colors={config.colors} onChange={(colors) => update("Noise Grid", { colors })} />
    </SketchSection>
  );
}

function BauhausPatternControls({
  config,
  update,
}: {
  config: BauhausPatternConfig;
  update: (generator: "Bauhaus Pattern", updates: Partial<BauhausPatternConfig>) => void;
}) {
  return (
    <SketchSection title="Bauhaus Pattern">
      <ControlSlider label="Shape Count" value={config.shapeCount} min={3} max={40} step={1} onChange={(v) => update("Bauhaus Pattern", { shapeCount: v })} />
      <ControlSlider label="Min Size" value={config.minSize} min={10} max={100} step={5} onChange={(v) => update("Bauhaus Pattern", { minSize: v })} />
      <ControlSlider label="Max Size" value={config.maxSize} min={50} max={400} step={10} onChange={(v) => update("Bauhaus Pattern", { maxSize: v })} />
      <ControlSlider label="Stroke Width" value={config.strokeWidth} min={1} max={10} step={0.5} onChange={(v) => update("Bauhaus Pattern", { strokeWidth: v })} />
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="allowStrokeOnly"
          checked={config.allowStrokeOnly}
          onChange={(e) => update("Bauhaus Pattern", { allowStrokeOnly: e.target.checked })}
        />
        <label htmlFor="allowStrokeOnly" className="text-base font-body text-pencil">
          Allow Stroke Only
        </label>
      </div>
      <ColorPaletteInput colors={config.colors} onChange={(colors) => update("Bauhaus Pattern", { colors })} />
    </SketchSection>
  );
}
