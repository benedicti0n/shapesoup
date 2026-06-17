"use client";

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

export const wobblyRadius = "255px 15px 225px 15px / 15px 225px 15px 255px";
export const wobblyRadiusMd = "15px 225px 15px 255px / 255px 15px 225px 15px";

export function SketchInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
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

export function SketchButton({
  onClick,
  children,
  variant = "default",
  icon,
  className = "",
  type = "button",
  ariaLabel,
}: {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "default" | "accent";
  icon?: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  ariaLabel?: string;
}) {
  const isAccent = variant === "accent";
  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`
        inline-flex items-center justify-center gap-1.5 px-3 py-2
        border-[3px] border-pencil text-sm font-body
        transition-all duration-100
        hover:shadow-[2px_2px_0px_0px_#2d2d2d] hover:-translate-y-px
        active:shadow-none active:translate-x-[2px] active:translate-y-[2px]
        ${isAccent
          ? "bg-accent text-white shadow-[4px_4px_0px_0px_#2d2d2d] hover:bg-accent"
          : "bg-white text-pencil shadow-[4px_4px_0px_0px_#2d2d2d] hover:bg-accent hover:text-white"
        }
        ${className}
      `}
      style={{ borderRadius: wobblyRadius, fontFamily: "var(--font-body)" }}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}

export function ControlSlider({
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
            borderRadius: wobblyRadius,
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
        aria-label={label}
      />
    </div>
  );
}

export function ColorPaletteInput({
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
                borderRadius: wobblyRadius,
              }}
              aria-label={`Color ${i + 1}`}
            />
            {safeColors.length > 1 && (
              <button
                onClick={() => removeColor(i)}
                className="text-sm text-pencil/40 hover:text-accent transition-colors font-body"
                style={{ fontFamily: "var(--font-body)" }}
                aria-label={`Remove color ${i + 1}`}
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
            borderRadius: wobblyRadius,
            boxShadow: "2px 2px 0px 0px rgba(45,45,45,0.1)",
            fontFamily: "var(--font-body)",
          }}
          aria-label="Add color"
        >
          +
        </button>
      </div>
    </div>
  );
}

/* ─── Generator control panels ─── */

export function BlobControls({
  config,
  update,
}: {
  config: BlobConfig;
  update: (generator: "Blob", updates: Partial<BlobConfig>) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <ControlSlider label="Complexity" value={config.complexity} min={3} max={24} step={1} onChange={(v) => update("Blob", { complexity: v })} />
      <ControlSlider label="Contrast" value={config.contrast} min={0} max={1} step={0.05} onChange={(v) => update("Blob", { contrast: v })} />
      <ColorPaletteInput colors={config.colors} onChange={(colors) => update("Blob", { colors })} />
    </div>
  );
}

export function WaveControls({
  config,
  update,
}: {
  config: WaveConfig;
  update: (generator: "Wave", updates: Partial<WaveConfig>) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <ControlSlider label="Amplitude" value={config.amplitude} min={10} max={200} step={5} onChange={(v) => update("Wave", { amplitude: v })} />
      <ControlSlider label="Frequency" value={config.frequency} min={0.001} max={0.05} step={0.001} onChange={(v) => update("Wave", { frequency: v })} />
      <ControlSlider label="Points" value={config.points} min={4} max={50} step={1} onChange={(v) => update("Wave", { points: v })} />
      <ColorPaletteInput colors={config.colors} onChange={(colors) => update("Wave", { colors })} />
    </div>
  );
}

export function BlurryGradientControls({
  config,
  update,
}: {
  config: BlurryGradientConfig;
  update: (generator: "Blurry Gradient", updates: Partial<BlurryGradientConfig>) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <ControlSlider label="Blob Count" value={config.blobCount} min={1} max={15} step={1} onChange={(v) => update("Blurry Gradient", { blobCount: v })} />
      <ControlSlider label="Blur Amount" value={config.blurAmount} min={0} max={100} step={5} onChange={(v) => update("Blurry Gradient", { blurAmount: v })} />
      <ColorPaletteInput colors={config.colors} onChange={(colors) => update("Blurry Gradient", { colors })} />
    </div>
  );
}

export function BlobSceneControls({
  config,
  update,
}: {
  config: BlobSceneConfig;
  update: (generator: "Blob Scene", updates: Partial<BlobSceneConfig>) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <ControlSlider label="Groups" value={config.groupCount} min={2} max={4} step={1} onChange={(v) => update("Blob Scene", { groupCount: v })} />
      <ControlSlider label="Layers" value={config.layersPerGroup} min={3} max={6} step={1} onChange={(v) => update("Blob Scene", { layersPerGroup: v })} />
      <ControlSlider label="Complexity" value={config.complexity} min={8} max={16} step={1} onChange={(v) => update("Blob Scene", { complexity: v })} />
      <ControlSlider label="Contrast" value={config.contrast} min={0.15} max={0.45} step={0.05} onChange={(v) => update("Blob Scene", { contrast: v })} />
      <ControlSlider label="Size" value={config.size} min={0.8} max={2.2} step={0.1} onChange={(v) => update("Blob Scene", { size: v })} />
      <ColorPaletteInput colors={config.colors} onChange={(colors) => update("Blob Scene", { colors })} />
    </div>
  );
}

export function LayeredWavesControls({
  config,
  update,
}: {
  config: WaveConfig;
  update: (generator: "Layered Waves", updates: Partial<WaveConfig>) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <ControlSlider label="Layers" value={config.layerCount} min={2} max={8} step={1} onChange={(v) => update("Layered Waves", { layerCount: v })} />
      <ControlSlider label="Amplitude" value={config.amplitude} min={10} max={150} step={5} onChange={(v) => update("Layered Waves", { amplitude: v })} />
      <ControlSlider label="Frequency" value={config.frequency} min={0.001} max={0.03} step={0.001} onChange={(v) => update("Layered Waves", { frequency: v })} />
      <ControlSlider label="Points" value={config.points} min={4} max={30} step={1} onChange={(v) => update("Layered Waves", { points: v })} />
      <ColorPaletteInput colors={config.colors} onChange={(colors) => update("Layered Waves", { colors })} />
    </div>
  );
}

export function StackedWavesControls({
  config,
  update,
}: {
  config: WaveConfig;
  update: (generator: "Stacked Waves", updates: Partial<WaveConfig>) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <ControlSlider label="Layers" value={config.layerCount} min={2} max={8} step={1} onChange={(v) => update("Stacked Waves", { layerCount: v })} />
      <ControlSlider label="Amplitude" value={config.amplitude} min={10} max={150} step={5} onChange={(v) => update("Stacked Waves", { amplitude: v })} />
      <ControlSlider label="Frequency" value={config.frequency} min={0.001} max={0.03} step={0.001} onChange={(v) => update("Stacked Waves", { frequency: v })} />
      <ControlSlider label="Points" value={config.points} min={6} max={40} step={1} onChange={(v) => update("Stacked Waves", { points: v })} />
      <ColorPaletteInput colors={config.colors} onChange={(colors) => update("Stacked Waves", { colors })} />
    </div>
  );
}

export function LowPolyGridControls({
  config,
  update,
}: {
  config: LowPolyGridConfig;
  update: (generator: "Low Poly Grid", updates: Partial<LowPolyGridConfig>) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <ControlSlider label="Columns" value={config.cols} min={3} max={16} step={1} onChange={(v) => update("Low Poly Grid", { cols: v })} />
      <ControlSlider label="Rows" value={config.rows} min={3} max={12} step={1} onChange={(v) => update("Low Poly Grid", { rows: v })} />
      <ControlSlider label="Jitter" value={config.jitter} min={0} max={1} step={0.05} onChange={(v) => update("Low Poly Grid", { jitter: v })} />
      <ColorPaletteInput colors={config.colors} onChange={(colors) => update("Low Poly Grid", { colors })} />
    </div>
  );
}

export function LayeredPeaksControls({
  config,
  update,
}: {
  config: LayeredPeaksConfig;
  update: (generator: "Layered Peaks", updates: Partial<LayeredPeaksConfig>) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <ControlSlider label="Layers" value={config.layerCount} min={2} max={8} step={1} onChange={(v) => update("Layered Peaks", { layerCount: v })} />
      <ControlSlider label="Peaks" value={config.peakCount} min={3} max={20} step={1} onChange={(v) => update("Layered Peaks", { peakCount: v })} />
      <ControlSlider label="Roughness" value={config.roughness} min={0} max={1} step={0.05} onChange={(v) => update("Layered Peaks", { roughness: v })} />
      <ColorPaletteInput colors={config.colors} onChange={(colors) => update("Layered Peaks", { colors })} />
    </div>
  );
}

export function TopoLinesControls({
  config,
  update,
}: {
  config: TopoLinesConfig;
  update: (generator: "Topographic Lines", updates: Partial<TopoLinesConfig>) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <ControlSlider label="Line Count" value={config.lineCount} min={3} max={40} step={1} onChange={(v) => update("Topographic Lines", { lineCount: v })} />
      <ControlSlider label="Amplitude" value={config.amplitude} min={5} max={200} step={5} onChange={(v) => update("Topographic Lines", { amplitude: v })} />
      <ControlSlider label="Frequency" value={config.frequency} min={0.001} max={0.05} step={0.001} onChange={(v) => update("Topographic Lines", { frequency: v })} />
      <ControlSlider label="Noise" value={config.noise} min={0} max={1} step={0.05} onChange={(v) => update("Topographic Lines", { noise: v })} />
      <ControlSlider label="Stroke Width" value={config.strokeWidth} min={0.5} max={5} step={0.5} onChange={(v) => update("Topographic Lines", { strokeWidth: v })} />
      <ControlSlider label="Spacing" value={config.spacing} min={10} max={120} step={5} onChange={(v) => update("Topographic Lines", { spacing: v })} />
      <ColorPaletteInput colors={config.colors} onChange={(colors) => update("Topographic Lines", { colors })} />
    </div>
  );
}

export function DotMatrixControls({
  config,
  update,
}: {
  config: DotMatrixConfig;
  update: (generator: "Dot Matrix", updates: Partial<DotMatrixConfig>) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <ControlSlider label="Columns" value={config.columns} min={4} max={40} step={1} onChange={(v) => update("Dot Matrix", { columns: v })} />
      <ControlSlider label="Rows" value={config.rows} min={4} max={30} step={1} onChange={(v) => update("Dot Matrix", { rows: v })} />
      <ControlSlider label="Min Radius" value={config.minRadius} min={1} max={20} step={1} onChange={(v) => update("Dot Matrix", { minRadius: v })} />
      <ControlSlider label="Max Radius" value={config.maxRadius} min={2} max={50} step={1} onChange={(v) => update("Dot Matrix", { maxRadius: v })} />
      <ControlSlider label="Jitter" value={config.jitter} min={0} max={1} step={0.05} onChange={(v) => update("Dot Matrix", { jitter: v })} />
      <ControlSlider label="Density" value={config.density} min={0.1} max={1} step={0.05} onChange={(v) => update("Dot Matrix", { density: v })} />
      <ColorPaletteInput colors={config.colors} onChange={(colors) => update("Dot Matrix", { colors })} />
    </div>
  );
}

export function MeshGradientControls({
  config,
  update,
}: {
  config: MeshGradientConfig;
  update: (generator: "Mesh Gradient", updates: Partial<MeshGradientConfig>) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <ControlSlider label="Blob Count" value={config.blobCount} min={2} max={15} step={1} onChange={(v) => update("Mesh Gradient", { blobCount: v })} />
      <ControlSlider label="Blur" value={config.blur} min={0} max={120} step={5} onChange={(v) => update("Mesh Gradient", { blur: v })} />
      <ControlSlider label="Opacity" value={config.opacity} min={0.1} max={1} step={0.05} onChange={(v) => update("Mesh Gradient", { opacity: v })} />
      <ControlSlider label="Min Radius" value={config.minRadius} min={20} max={300} step={10} onChange={(v) => update("Mesh Gradient", { minRadius: v })} />
      <ControlSlider label="Max Radius" value={config.maxRadius} min={50} max={600} step={10} onChange={(v) => update("Mesh Gradient", { maxRadius: v })} />
      <ColorPaletteInput colors={config.colors} onChange={(colors) => update("Mesh Gradient", { colors })} />
    </div>
  );
}

export function NoiseGridControls({
  config,
  update,
}: {
  config: NoiseGridConfig;
  update: (generator: "Noise Grid", updates: Partial<NoiseGridConfig>) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <ControlSlider label="Cell Size" value={config.cellSize} min={10} max={100} step={5} onChange={(v) => update("Noise Grid", { cellSize: v })} />
      <ControlSlider label="Density" value={config.density} min={0.1} max={1} step={0.05} onChange={(v) => update("Noise Grid", { density: v })} />
      <ControlSlider label="Shape Size" value={config.shapeSize} min={0.2} max={1} step={0.05} onChange={(v) => update("Noise Grid", { shapeSize: v })} />
      <ControlSlider label="Jitter" value={config.jitter} min={0} max={1} step={0.05} onChange={(v) => update("Noise Grid", { jitter: v })} />
      <ControlSlider label="Stroke Width" value={config.strokeWidth} min={0.5} max={5} step={0.5} onChange={(v) => update("Noise Grid", { strokeWidth: v })} />
      <ColorPaletteInput colors={config.colors} onChange={(colors) => update("Noise Grid", { colors })} />
    </div>
  );
}

export function BauhausPatternControls({
  config,
  update,
}: {
  config: BauhausPatternConfig;
  update: (generator: "Bauhaus Pattern", updates: Partial<BauhausPatternConfig>) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
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
          aria-label="Allow stroke only"
        />
        <label htmlFor="allowStrokeOnly" className="text-base font-body text-pencil">
          Allow Stroke Only
        </label>
      </div>
      <ColorPaletteInput colors={config.colors} onChange={(colors) => update("Bauhaus Pattern", { colors })} />
    </div>
  );
}
