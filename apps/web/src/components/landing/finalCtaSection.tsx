import { SketchButton, SectionTitle, DashedLine } from "./sketchPrimitives";
import { CopyButton } from "./copyButton";

export function FinalCtaSection() {
  return (
    <section className="px-5 md:px-8 py-20 md:py-28">
      <div className="max-w-3xl mx-auto text-center">
        <div
          className="relative bg-white border-[3px] border-pencil p-8 md:p-12"
          style={{
            borderRadius: "15px 225px 15px 255px / 255px 15px 225px 15px",
            boxShadow: "8px 8px 0px 0px #2d2d2d",
            transform: "rotate(-0.3deg)",
          }}
        >
          {/* Decorative tape */}
          <div
            className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-muted/70 border border-pencil/20"
            style={{ transform: "translate(-50%, 0) rotate(-2deg)", borderRadius: "2px" }}
          />

          {/* Bouncing dot decoration */}
          <div
            className="hidden md:block absolute -top-6 -right-6 w-8 h-8 bg-accent border-[3px] border-pencil rounded-full"
            style={{
              boxShadow: "3px 3px 0px 0px #2d2d2d",
              animation: "bounce 3s infinite",
            }}
          />

          <SectionTitle>Ready to cook your first SVG?</SectionTitle>
          <p className="mt-4 text-lg md:text-xl font-body text-pencil/70 max-w-lg mx-auto">
            Pick a generator, type a weird seed, and export something beautiful.
          </p>

          <DashedLine className="my-6 max-w-xs mx-auto" />

          <div className="flex flex-wrap justify-center gap-3">
            <SketchButton href="/playground" variant="accent">
              Open Playground
            </SketchButton>
            <CopyButton text="pnpm add @shapesoup/core" label="Copy Install" />
          </div>

          <p className="mt-4 text-sm font-body text-pencil/40">
            No sign-up. No credit card. Just seeds and SVGs.
          </p>
        </div>
      </div>
    </section>
  );
}
