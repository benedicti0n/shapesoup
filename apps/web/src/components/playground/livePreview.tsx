"use client";

import { usePlaygroundStore } from "@/lib/store/playgroundStore";

export function LivePreview() {
  const result = usePlaygroundStore((s) => s.result);

  if (!result) {
    return (
      <div className="flex items-center justify-center h-full text-pencil/40 font-body text-xl">
        No preview available
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-5 w-full h-full">
      {/* Sketch frame around preview */}
      <div
        className="relative w-full max-w-3xl bg-white border-[3px] border-pencil overflow-hidden p-3"
        style={{
          borderRadius: "15px 225px 15px 255px / 255px 15px 225px 15px",
          boxShadow: "6px 6px 0px 0px #2d2d2d",
          transform: "rotate(-0.3deg)",
        }}
      >
        {/* Tape decoration */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-24 h-6 bg-muted/60 border border-pencil/20"
          style={{
            transform: "translate(-50%, -50%) rotate(-2deg)",
            borderRadius: "2px",
          }}
        />
        <div
          className="w-full bg-white"
          style={{ borderRadius: "8px 200px 8px 230px / 230px 8px 200px 8px" }}
          dangerouslySetInnerHTML={{ __html: result.svg }}
        />
      </div>

      {/* Info badges */}
      <div className="flex gap-3 flex-wrap justify-center">
        <Badge>
          {result.metadata.width} x {result.metadata.height}
        </Badge>
        <Badge>{result.metadata.elements} elements</Badge>
        <Badge>{result.metadata.generator}</Badge>
      </div>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="px-3 py-1 bg-white border-[3px] border-pencil text-sm font-body text-pencil"
        style={{
          borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px",
          boxShadow: "3px 3px 0px 0px #2d2d2d",
          fontFamily: "var(--font-body)",
          transform: "rotate(0.5deg)",
        }}
    >
      {children}
    </span>
  );
}
