import { SectionTitle, PostItCard, DashedLine } from "./sketchPrimitives";

const steps = [
  {
    number: "1",
    title: "Choose a generator",
    description: "Pick from 10+ pattern families — waves, blobs, grids, gradients, and more.",
  },
  {
    number: "2",
    title: "Type any seed",
    description: "A word, a number, anything. Same seed + same config = identical SVG forever.",
  },
  {
    number: "3",
    title: "Copy, download, or share",
    description: "Export as SVG, PNG, JSX, CSS, or React. Share a link that restores the exact pattern.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="px-5 md:px-8 py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <SectionTitle>How It Works</SectionTitle>
          <p className="mt-3 text-lg font-body text-pencil/70">Three simple steps to your first SVG.</p>
        </div>

        <div className="relative grid md:grid-cols-3 gap-8">
          {/* Squiggly connector on desktop */}
          <div
            className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5 border-dashed border-t-2 border-pencil/30"
            style={{ transform: "rotate(-1deg)" }}
          />

          {steps.map((step, i) => (
            <div key={step.number} className="flex flex-col items-center text-center gap-4">
              {/* Number in rough circle */}
              <div
                className="w-14 h-14 flex items-center justify-center bg-accent text-white border-[3px] border-pencil text-xl font-bold font-heading"
                style={{
                  borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
                  boxShadow: "3px 3px 0px 0px #2d2d2d",
                  transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)`,
                }}
              >
                {step.number}
              </div>

              <PostItCard rotation={i % 2 === 0 ? -1 : 1} className="w-full">
                <h3 className="text-xl font-bold font-body text-pencil">{step.title}</h3>
                <DashedLine className="my-2" />
                <p className="text-base font-body text-pencil/70">{step.description}</p>
              </PostItCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
