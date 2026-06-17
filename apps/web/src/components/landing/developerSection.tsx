import { SectionTitle, SketchCard, PostItCard, DashedLine } from "./sketchPrimitives";
import { CopyButton } from "./copyButton";

const codeSnippet = `import { generateBlobScene } from "@shapesoup/core";

const result = generateBlobScene({
  width: 1200,
  height: 800,
  seed: "my-product-launch",
});

console.log(result.svg);
// deterministic SVG, every time`;

const bulletPoints = [
  "Pure TypeScript — zero browser dependencies in core",
  "Deterministic output — same config + seed = identical SVG",
  "ESM + CJS + TypeScript declarations included",
  "Works with React, Next.js, plain HTML, and design tools",
];

export function DeveloperSection() {
  return (
    <section id="developers" className="px-5 md:px-8 py-16 md:py-24 bg-white border-y-[3px] border-pencil">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <SectionTitle>Use it in your app.</SectionTitle>
          <p className="mt-3 text-lg font-body text-pencil/70">
            Drop the npm package into any project. No strings attached.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Code card */}
          <SketchCard decoration="tape" rotation={-0.5} className="relative">
            {/* npm label */}
            <div
              className="absolute -top-3 -left-2 bg-post-it border-[3px] border-pencil px-3 py-1 text-sm font-bold font-body text-pencil"
              style={{
                borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
                boxShadow: "2px 2px 0px 0px #2d2d2d",
                transform: "rotate(-3deg)",
              }}
            >
              npm install
            </div>

            <pre
              className="bg-paper border-[3px] border-pencil p-4 overflow-x-auto text-sm font-mono text-pencil leading-relaxed"
              style={{ borderRadius: "8px 30px 8px 35px / 35px 8px 30px 8px" }}
            >
              <code>{codeSnippet}</code>
            </pre>

            <div className="mt-4 flex gap-2">
              <CopyButton text="pnpm add @shapesoup/core" label="Copy install" />
            </div>
          </SketchCard>

          {/* Info cards */}
          <div className="flex flex-col gap-4">
            <PostItCard rotation={1}>
              <p className="text-lg font-bold font-body text-pencil">
                same config + same seed = same SVG
              </p>
              <DashedLine className="my-2" />
              <p className="text-base font-body text-pencil/70">
                Every call is deterministic. Cache, test, and version-control your patterns with confidence.
              </p>
            </PostItCard>

            <div className="flex flex-col gap-3">
              {bulletPoints.map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className="w-6 h-6 flex-shrink-0 mt-0.5 bg-accent border-[2px] border-pencil"
                    style={{ borderRadius: "50%", boxShadow: "2px 2px 0px 0px #2d2d2d" }}
                  />
                  <p className="text-base font-body text-pencil/80">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
