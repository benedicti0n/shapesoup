"use client";

import { usePlaygroundStore } from "@/lib/store/playgroundStore";
import { BlobConfig } from "@/lib/generators/blob";
import { WaveConfig } from "@/lib/generators/wave";
import { BlurryGradientConfig } from "@/lib/generators/blurryGradient";

export function ControlsSidebar() {
  const activeGenerator = usePlaygroundStore((s) => s.activeGenerator);
  const configs = usePlaygroundStore((s) => s.configs);
  const seed = usePlaygroundStore((s) => s.seed);
  const updateConfig = usePlaygroundStore((s) => s.updateConfig);
  const setSeed = usePlaygroundStore((s) => s.setSeed);
  const randomizeSeed = usePlaygroundStore((s) => s.randomizeSeed);

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
          <button
            onClick={randomizeSeed}
            className="px-3 py-2 rounded-lg bg-zinc-100 text-zinc-900 text-sm font-medium hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 transition-colors"
          >
            Randomize
          </button>
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
