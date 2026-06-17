"use client";

import Link from "next/link";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { Menu01Icon } from "@hugeicons/core-free-icons";
import { ActionMenus } from "./actionMenus";

export function PlaygroundHeader({
  onOpenGenerators,
}: {
  onOpenGenerators: () => void;
}) {
  return (
    <header
      className="flex items-center justify-between px-3 md:px-6 py-2 md:py-3 bg-white border-b-[3px] border-pencil relative z-30"
      style={{ boxShadow: "0 4px 0px 0px rgba(45,45,45,0.08)" }}
    >
      {/* Left: Logo + mobile menu */}
      <div className="flex items-center gap-2 md:gap-3">
        <button
          onClick={onOpenGenerators}
          className="md:hidden p-1.5 bg-white border-[3px] border-pencil hover:bg-accent hover:text-white transition-colors duration-100"
          style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px", boxShadow: "2px 2px 0px 0px #2d2d2d" }}
          aria-label="Open generators"
        >
          <HugeiconsIcon icon={Menu01Icon} size={18} strokeWidth={2.5} />
        </button>

        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Image
            src="/shapesoup-logo.svg"
            alt="ShapeSoup"
            width={24}
            height={24}
            className="rounded-sm md:w-7 md:h-7"
            style={{ transform: "rotate(-2deg)" }}
          />
          <h1
            className="text-lg md:text-2xl font-bold tracking-tight font-heading"
            style={{ transform: "rotate(-1deg)" }}
          >
            ShapeSoup
          </h1>
        </Link>
      </div>

      {/* Center: Nav (desktop only) */}
      <nav className="hidden md:flex items-center gap-6">
        <a
          href="/playground"
          className="text-base font-body text-pencil hover:text-accent relative group transition-colors"
          aria-current="page"
        >
          Playground
          <span
            className="absolute -bottom-1 left-0 w-full h-0.5 bg-accent"
            style={{ borderRadius: "2px" }}
          />
        </a>
        <a
          href="/docs"
          className="text-base font-body text-pencil hover:text-accent relative group transition-colors"
        >
          Docs
          <span
            className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"
            style={{ borderRadius: "2px" }}
          />
        </a>
      </nav>

      {/* Right: Actions (desktop only) */}
      <div className="hidden sm:flex items-center gap-2">
        <ActionMenus />
      </div>
    </header>
  );
}
