"use client";

import { usePlaygroundStore } from "@/lib/store/playgroundStore";
import { BlobConfig } from "@/lib/generators/blob";
import { WaveConfig } from "@/lib/generators/wave";
import { BlurryGradientConfig } from "@/lib/generators/blurryGradient";
import { BlobSceneConfig } from "@/lib/generators/blobScene";
import { LayeredWavesConfig } from "@/lib/generators/layeredWaves";
import { StackedWavesConfig } from "@/lib/generators/stackedWaves";
import { LowPolyGridConfig } from "@/lib/generators/lowPolyGrid";
import { LayeredPeaksConfig } from "@/lib/generators/layeredPeaks";

const canvasPresets = [
  { label: "800 x 600", width: 800, height: 600 },
  { label: "1200 x 800", width: 1200, height: 800 },
  { label: "1920 x 1080", width: 1920, height: 1080 },
  { label: "1080 x 1080", width: 1080, height: 1080 },
  { label: "640 x 640", width: 640, height: 640 },
];

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
      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">
          Seed
        </h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg border border-zinc-200 bg-white text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={randomizeSeed}
            className="flex-1 px-3 py-2 rounded-lg bg-zinc-100 text-zinc-900 text-sm font-medium hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 transition-colors"
          >
            Randomize Seed
          </button>
          <button
            onClick={randomizeAll}
            className="flex-1 px-3 py-2 rounded-lg bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors"
          >
            Randomize All
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">
          Canvas Size
        </h2>
        <div className="flex flex-wrap gap-1.5">
          {canvasPresets.map((preset) => (
            <button
              key={preset.label}
              onClick={() => setCanvasSize(preset.width, preset.height)}
              className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                currentConfig.width === preset.width && currentConfig.height === preset.height
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                  : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-xs text-zinc-500">Width</label>
            <input
              type="number"
              min={100}
              max={4000}
              value={currentConfig.width}
              onChange={(e) => setCanvasSize(Number(e.target.value), currentConfig.height)}
              className="px-2 py-1.5 rounded-lg border border-zinc-200 bg-white text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
            />
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-xs text-zinc-500">Height</label>
            <input
              type="number"
              min={100}
              max={4000}
              value={currentConfig.height}
              onChange={(e) => setCanvasSize(currentConfig.width, Number(e.target.value))}
              className="px-2 py-1.5 rounded-lg border border-zinc-200 bg-white text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
            />
          </div>
        </div>
      </div>

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
    </div>
  );
}

function BlobControls({
  config,
  update,
}: {
  config: BlobConfig;
  update: (generator: "Blob", updates: Partial<BlobConfig>) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <ControlSlider
        label="Complexity"
        value={config.complexity}
        min={3}
        max={24}
        step={1}
        onChange={(v) => update("Blob", { complexity: v })}
      />
      <ControlSlider
        label="Contrast"
        value={config.contrast}
        min={0}
        max={1}
        step={0.05}
        onChange={(v) => update("Blob", { contrast: v })}
      />
      <ColorPaletteInput
        colors={config.colors}
        onChange={(colors) => update("Blob", { colors })}
      />
    </div>
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
    <div className="flex flex-col gap-4">
      <ControlSlider
        label="Amplitude"
        value={config.amplitude}
        min={10}
        max={200}
        step={5}
        onChange={(v) => update("Wave", { amplitude: v })}
      />
      <ControlSlider
        label="Frequency"
        value={config.frequency}
        min={0.001}
        max={0.05}
        step={0.001}
        onChange={(v) => update("Wave", { frequency: v })}
      />
      <ControlSlider
        label="Points"
        value={config.points}
        min={4}
        max={50}
        step={1}
        onChange={(v) => update("Wave", { points: v })}
      />
      <ColorPaletteInput
        colors={config.colors}
        onChange={(colors) => update("Wave", { colors })}
      />
    </div>
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
    <div className="flex flex-col gap-4">
      <ControlSlider
        label="Blob Count"
        value={config.blobCount}
        min={1}
        max={15}
        step={1}
        onChange={(v) => update("Blurry Gradient", { blobCount: v })}
      />
      <ControlSlider
        label="Blur Amount"
        value={config.blurAmount}
        min={0}
        max={100}
        step={5}
        onChange={(v) => update("Blurry Gradient", { blurAmount: v })}
      />
      <ColorPaletteInput
        colors={config.colors}
        onChange={(colors) => update("Blurry Gradient", { colors })}
      />
    </div>
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
    <div className="flex flex-col gap-4">
      <ControlSlider
        label="Groups"
        value={config.groupCount}
        min={2}
        max={4}
        step={1}
        onChange={(v) => update("Blob Scene", { groupCount: v })}
      />
      <ControlSlider
        label="Layers"
        value={config.layersPerGroup}
        min={3}
        max={6}
        step={1}
        onChange={(v) => update("Blob Scene", { layersPerGroup: v })}
      />
      <ControlSlider
        label="Complexity"
        value={config.complexity}
        min={8}
        max={16}
        step={1}
        onChange={(v) => update("Blob Scene", { complexity: v })}
      />
      <ControlSlider
        label="Contrast"
        value={config.contrast}
        min={0.15}
        max={0.45}
        step={0.05}
        onChange={(v) => update("Blob Scene", { contrast: v })}
      />
      <ControlSlider
        label="Size"
        value={config.size}
        min={0.8}
        max={2.2}
        step={0.1}
        onChange={(v) => update("Blob Scene", { size: v })}
      />
      <ColorPaletteInput
        colors={config.colors}
        onChange={(colors) => update("Blob Scene", { colors })}
      />
    </div>
  );
}

function LayeredWavesControls({
  config,
  update,
}: {
  config: LayeredWavesConfig;
  update: (generator: "Layered Waves", updates: Partial<LayeredWavesConfig>) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <ControlSlider
        label="Layers"
        value={config.layerCount}
        min={2}
        max={8}
        step={1}
        onChange={(v) => update("Layered Waves", { layerCount: v })}
      />
      <ControlSlider
        label="Amplitude"
        value={config.amplitude}
        min={10}
        max={150}
        step={5}
        onChange={(v) => update("Layered Waves", { amplitude: v })}
      />
      <ControlSlider
        label="Frequency"
        value={config.frequency}
        min={0.001}
        max={0.03}
        step={0.001}
        onChange={(v) => update("Layered Waves", { frequency: v })}
      />
      <ControlSlider
        label="Points"
        value={config.points}
        min={4}
        max={30}
        step={1}
        onChange={(v) => update("Layered Waves", { points: v })}
      />
      <ColorPaletteInput
        colors={config.colors}
        onChange={(colors) => update("Layered Waves", { colors })}
      />
    </div>
  );
}

function StackedWavesControls({
  config,
  update,
}: {
  config: StackedWavesConfig;
  update: (generator: "Stacked Waves", updates: Partial<StackedWavesConfig>) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <ControlSlider
        label="Layers"
        value={config.layerCount}
        min={2}
        max={8}
        step={1}
        onChange={(v) => update("Stacked Waves", { layerCount: v })}
      />
      <ControlSlider
        label="Amplitude"
        value={config.amplitude}
        min={10}
        max={150}
        step={5}
        onChange={(v) => update("Stacked Waves", { amplitude: v })}
      />
      <ControlSlider
        label="Frequency"
        value={config.frequency}
        min={0.001}
        max={0.03}
        step={0.001}
        onChange={(v) => update("Stacked Waves", { frequency: v })}
      />
      <ControlSlider
        label="Points"
        value={config.points}
        min={6}
        max={40}
        step={1}
        onChange={(v) => update("Stacked Waves", { points: v })}
      />
      <ColorPaletteInput
        colors={config.colors}
        onChange={(colors) => update("Stacked Waves", { colors })}
      />
    </div>
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
    <div className="flex flex-col gap-4">
      <ControlSlider
        label="Columns"
        value={config.cols}
        min={3}
        max={16}
        step={1}
        onChange={(v) => update("Low Poly Grid", { cols: v })}
      />
      <ControlSlider
        label="Rows"
        value={config.rows}
        min={3}
        max={12}
        step={1}
        onChange={(v) => update("Low Poly Grid", { rows: v })}
      />
      <ControlSlider
        label="Jitter"
        value={config.jitter}
        min={0}
        max={1}
        step={0.05}
        onChange={(v) => update("Low Poly Grid", { jitter: v })}
      />
      <ColorPaletteInput
        colors={config.colors}
        onChange={(colors) => update("Low Poly Grid", { colors })}
      />
    </div>
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
    <div className="flex flex-col gap-4">
      <ControlSlider
        label="Layers"
        value={config.layerCount}
        min={2}
        max={8}
        step={1}
        onChange={(v) => update("Layered Peaks", { layerCount: v })}
      />
      <ControlSlider
        label="Peaks"
        value={config.peakCount}
        min={3}
        max={20}
        step={1}
        onChange={(v) => update("Layered Peaks", { peakCount: v })}
      />
      <ControlSlider
        label="Roughness"
        value={config.roughness}
        min={0}
        max={1}
        step={0.05}
        onChange={(v) => update("Layered Peaks", { roughness: v })}
      />
      <ColorPaletteInput
        colors={config.colors}
        onChange={(colors) => update("Layered Peaks", { colors })}
      />
    </div>
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
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {label}
        </label>
        <span className="text-sm text-zinc-500">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-zinc-900 dark:accent-zinc-100"
      />
    </div>
  );
}

function ColorPaletteInput({
  colors,
  onChange,
}: {
  colors: string[];
  onChange: (colors: string[]) => void;
}) {
  const updateColor = (index: number, color: string) => {
    const next = [...colors];
    next[index] = color;
    onChange(next);
  };

  const addColor = () => {
    onChange([...colors, "#000000"]);
  };

  const removeColor = (index: number) => {
    if (colors.length <= 1) return;
    const next = colors.filter((_, i) => i !== index);
    onChange(next);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        Colors
      </label>
      <div className="flex flex-wrap gap-2">
        {colors.map((color, i) => (
          <div key={i} className="flex items-center gap-1">
            <input
              type="color"
              value={color}
              onChange={(e) => updateColor(i, e.target.value)}
              className="w-8 h-8 rounded cursor-pointer border-0 p-0"
            />
            {colors.length > 1 && (
              <button
                onClick={() => removeColor(i)}
                className="text-xs text-zinc-400 hover:text-red-500 transition-colors"
              >
                &times;
              </button>
            )}
          </div>
        ))}
        <button
          onClick={addColor}
          className="w-8 h-8 rounded border border-dashed border-zinc-300 text-zinc-400 hover:border-zinc-500 hover:text-zinc-600 flex items-center justify-center text-lg transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
}
