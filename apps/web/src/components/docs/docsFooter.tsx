import Link from "next/link";
import Image from "next/image";
import { DashedLine } from "@/components/landing/sketchPrimitives";

export function DocsFooter() {
  return (
    <footer className="px-5 md:px-8 py-10 bg-white border-t-[3px] border-pencil">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/shapesoup-logo.png"
              alt="ShapeSoup"
              width={20}
              height={20}
              className="rounded-sm"
              style={{ transform: "rotate(-2deg)" }}
            />
            <span className="text-base font-bold font-heading text-pencil group-hover:text-accent transition-colors">ShapeSoup</span>
          </Link>
          <div className="flex flex-wrap gap-4">
            <Link href="/" className="text-base font-body text-pencil hover:text-accent transition-colors">Home</Link>
            <Link href="/playground" className="text-base font-body text-pencil hover:text-accent transition-colors">Playground</Link>
            <a href="https://www.npmjs.com/package/@shapesoup/core" target="_blank" rel="noopener noreferrer" className="text-base font-body text-pencil hover:text-accent transition-colors">npm</a>
            <a href="https://github.com/benedicti0n/shapesoup" target="_blank" rel="noopener noreferrer" className="text-base font-body text-pencil hover:text-accent transition-colors">GitHub</a>
          </div>
        </div>
        <DashedLine className="my-4" />
        <p className="text-sm font-body text-pencil/50">Made for deterministic SVG experiments.</p>
      </div>
    </footer>
  );
}
