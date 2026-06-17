import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { PencilEdit01Icon } from "@hugeicons/core-free-icons";
import { DashedLine } from "./sketchPrimitives";

const footerLinks = [
  { label: "Playground", href: "/playground" },
  { label: "npm", href: "https://www.npmjs.com/package/@shapesoup/core" },
  { label: "GitHub", href: "https://github.com/benedicti0n/shapesoup" },
];

export function LandingFooter() {
  return (
    <footer className="px-5 md:px-8 py-12 bg-white border-t-[3px] border-pencil">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-2">
            <HugeiconsIcon icon={PencilEdit01Icon} size={20} strokeWidth={2.5} className="text-accent" />
            <span className="text-lg font-bold font-heading text-pencil">ShapeSoup</span>
          </div>

          <nav className="flex flex-wrap gap-4">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-body text-pencil hover:text-accent relative group transition-colors"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" style={{ borderRadius: "2px" }} />
              </Link>
            ))}
          </nav>
        </div>

        <DashedLine className="my-6" />

        <p className="text-sm font-body text-pencil/50 text-center">
          Made for deterministic SVG experiments. Built with seeds, paper, and ink.
        </p>
      </div>
    </footer>
  );
}
