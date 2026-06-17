import Link from "next/link";
import Image from "next/image";
import { SketchButton } from "./sketchPrimitives";

const navLinks = [
  { label: "Generators", href: "#generators" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Developers", href: "#developers" },
  { label: "Features", href: "#features" },
  { label: "Docs", href: "/docs" },
];

export function LandingHeader() {
  return (
    <header
      className="sticky top-0 z-50 bg-paper/95 border-b-[3px] border-pencil backdrop-blur-sm"
      style={{ boxShadow: "0 4px 0px 0px rgba(45,45,45,0.06)" }}
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/shapesoup-logo.png"
            alt="ShapeSoup"
            width={32}
            height={32}
            className="rounded-sm"
            style={{ transform: "rotate(-2deg)" }}
          />
          <span
            className="text-xl md:text-2xl font-bold font-heading text-pencil group-hover:text-accent transition-colors"
            style={{ transform: "rotate(-1deg)" }}
          >
            ShapeSoup
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-base font-body text-pencil hover:text-accent relative group transition-colors"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" style={{ borderRadius: "2px" }} />
            </a>
          ))}
        </nav>

        <SketchButton href="/playground" variant="accent">
          Open Playground
        </SketchButton>
      </div>
    </header>
  );
}
