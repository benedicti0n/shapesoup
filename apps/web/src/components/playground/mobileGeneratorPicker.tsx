"use client";

import { useRef, useEffect } from "react";
import { usePlaygroundStore } from "@/lib/store/playgroundStore";
import { GeneratorBrowser } from "./generatorBrowser";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon, ArrowDown01Icon } from "@hugeicons/core-free-icons";

const wobblyRadius = "255px 15px 225px 15px / 15px 225px 15px 255px";

export function MobileGeneratorPicker({ onOpen }: { onOpen: () => void }) {
  const activeGenerator = usePlaygroundStore((s) => s.activeGenerator);

  return (
    <button
      onClick={onOpen}
      className="w-full flex items-center justify-between px-4 py-3 bg-white border-[3px] border-pencil text-pencil
        shadow-[4px_4px_0px_0px_#2d2d2d] hover:bg-accent hover:text-white hover:shadow-[2px_2px_0px_0px_#2d2d2d]
        active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all duration-100"
      style={{ borderRadius: wobblyRadius, fontFamily: "var(--font-body)" }}
      aria-label="Select generator"
    >
      <span className="text-base font-body font-bold">{activeGenerator}</span>
      <HugeiconsIcon icon={ArrowDown01Icon} size={18} strokeWidth={2.5} />
    </button>
  );
}

export function MobileGeneratorSheet({ onClose }: { onClose: () => void }) {
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (sheetRef.current && !sheetRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] flex flex-col justify-end">
      <div className="absolute inset-0 bg-pencil/30" onClick={onClose} aria-hidden="true" />
      <div
        ref={sheetRef}
        className="relative bg-white border-t-[3px] border-pencil max-h-[80vh] overflow-y-auto"
        style={{ boxShadow: "0 -8px 0px 0px rgba(45,45,45,0.15)" }}
      >
        {/* Handle */}
        <div className="flex items-center justify-center pt-3 pb-1">
          <div className="w-12 h-1.5 bg-pencil/30 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 pb-3">
          <h2 className="text-lg font-bold font-heading text-pencil" style={{ transform: "rotate(-0.5deg)" }}>
            Generators
          </h2>
          <button
            onClick={onClose}
            className="p-2 bg-white border-[3px] border-pencil hover:bg-accent hover:text-white transition-colors"
            style={{ borderRadius: wobblyRadius, boxShadow: "2px 2px 0px 0px #2d2d2d" }}
            aria-label="Close generator picker"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={18} strokeWidth={2.5} />
          </button>
        </div>

        <div className="px-4 pb-6">
          <GeneratorBrowser />
        </div>
      </div>
    </div>
  );
}
