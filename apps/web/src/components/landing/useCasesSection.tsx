import { SectionTitle } from "./sketchPrimitives";

const useCases = [
  "Landing page backgrounds",
  "Social media graphics",
  "Open Graph images",
  "App hero sections",
  "Product cards",
  "Placeholder art",
  "Creative coding experiments",
  "Design system textures",
];

export function UseCasesSection() {
  return (
    <section className="px-5 md:px-8 py-16 md:py-24 bg-white border-y-[3px] border-pencil">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <SectionTitle>Who is it for?</SectionTitle>
          <p className="mt-3 text-lg font-body text-pencil/70">
            Anyone who needs beautiful, repeatable SVG backgrounds.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {useCases.map((useCase, i) => (
            <span
              key={useCase}
              className="px-4 py-2 bg-paper border-[3px] border-pencil text-base font-body text-pencil
                hover:bg-accent hover:text-white hover:shadow-[2px_2px_0px_0px_#2d2d2d] hover:-translate-y-px
                active:shadow-none active:translate-x-[2px] active:translate-y-[2px]
                transition-all duration-100 cursor-default"
              style={{
                borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
                boxShadow: "3px 3px 0px 0px #2d2d2d",
                fontFamily: "var(--font-body)",
                transform: `rotate(${i % 2 === 0 ? -0.5 : 0.5}deg)`,
              }}
            >
              {useCase}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
