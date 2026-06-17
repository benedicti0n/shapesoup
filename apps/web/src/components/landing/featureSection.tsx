import { HugeiconsIcon } from "@hugeicons/react";
import {
  FingerPrintIcon,
  ResizeIcon,
  Copy01Icon,
  Download04Icon,
  Link01Icon,
  ColorPickerIcon,
  CodeIcon,
} from "@hugeicons/core-free-icons";
import { SectionTitle, PostItCard, DashedLine } from "./sketchPrimitives";

const features = [
  {
    icon: <HugeiconsIcon icon={FingerPrintIcon} size={24} strokeWidth={2.5} />,
    title: "Deterministic Seeds",
    description: "Same config + same seed = identical SVG, every single time.",
    decoration: "tape" as const,
    rotation: -1,
  },
  {
    icon: <HugeiconsIcon icon={ResizeIcon} size={24} strokeWidth={2.5} />,
    title: "Scalable SVG",
    description: "Crisp at any resolution. No rasterization, no pixelation.",
    decoration: undefined,
    rotation: 1,
  },
  {
    icon: <HugeiconsIcon icon={Copy01Icon} size={24} strokeWidth={2.5} />,
    title: "Copy SVG / JSX / CSS",
    description: "One-click copy in multiple formats for any workflow.",
    decoration: "tack" as const,
    rotation: -0.5,
  },
  {
    icon: <HugeiconsIcon icon={Download04Icon} size={24} strokeWidth={2.5} />,
    title: "Download SVG / PNG",
    description: "Export at 1x, 2x, or 4x resolution. Batch export available.",
    decoration: undefined,
    rotation: 1.5,
  },
  {
    icon: <HugeiconsIcon icon={Link01Icon} size={24} strokeWidth={2.5} />,
    title: "Shareable URLs",
    description: "Every pattern has a unique link. Share it, bookmark it, reopen it.",
    decoration: "tape" as const,
    rotation: -1.5,
  },
  {
    icon: <HugeiconsIcon icon={ColorPickerIcon} size={24} strokeWidth={2.5} />,
    title: "Palette Presets",
    description: "Randomize colors or pick from curated palettes instantly.",
    decoration: undefined,
    rotation: 0.5,
  },
  {
    icon: <HugeiconsIcon icon={CodeIcon} size={24} strokeWidth={2.5} />,
    title: "Pure TypeScript Core",
    description: "Zero browser dependencies. Works in Node, Deno, and the browser.",
    decoration: "tack" as const,
    rotation: -0.5,
  },
];

export function FeatureSection() {
  return (
    <section id="features" className="px-5 md:px-8 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <SectionTitle>Features</SectionTitle>
          <p className="mt-3 text-lg font-body text-pencil/70">Everything you need to cook SVGs.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <PostItCard
              key={feature.title}
              rotation={feature.rotation}
              className="relative hover:shadow-[6px_6px_0px_0px_rgba(45,45,45,0.15)] hover:-translate-y-1 transition-all duration-100"
            >
              {feature.decoration === "tape" && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-muted/70 border border-pencil/20"
                  style={{ transform: "translate(-50%, 0) rotate(-2deg)", borderRadius: "2px" }}
                />
              )}
              {feature.decoration === "tack" && (
                <div
                  className="absolute -top-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-accent border-2 border-pencil rounded-full"
                  style={{ transform: "translate(-50%, 0) rotate(3deg)" }}
                />
              )}

              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 flex items-center justify-center bg-white border-[3px] border-pencil text-pencil"
                  style={{
                    borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
                    boxShadow: "2px 2px 0px 0px #2d2d2d",
                  }}
                >
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold font-body text-pencil">{feature.title}</h3>
              </div>
              <DashedLine className="mb-3" />
              <p className="text-base font-body text-pencil/70">{feature.description}</p>
            </PostItCard>
          ))}
        </div>
      </div>
    </section>
  );
}
