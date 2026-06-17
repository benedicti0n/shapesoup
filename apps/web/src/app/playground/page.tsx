"use client";

import { useState, Suspense } from "react";
import Image from "next/image";
import { GeneratorSelector } from "@/components/playground/generatorSelector";
import { LivePreview } from "@/components/playground/livePreview";
import { ControlsSidebar } from "@/components/playground/controlsSidebar";
import { ActionBar } from "@/components/playground/actionBar";
import { UrlSync } from "@/components/playground/urlSync";
import { HugeiconsIcon } from "@hugeicons/react";
import { Menu01Icon, Settings02Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";

export default function PlaygroundPage() {
  const [showLeftDrawer, setShowLeftDrawer] = useState(false);
  const [showRightDrawer, setShowRightDrawer] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-paper text-pencil">
      <Suspense fallback={null}>
        <UrlSync />
      </Suspense>

      <header
        className="flex items-center justify-between px-5 md:px-8 py-4 bg-white border-b-[3px] border-pencil relative"
        style={{ boxShadow: "0 4px 0px 0px rgba(45,45,45,0.08)" }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowLeftDrawer(true)}
            className="md:hidden p-2 bg-white border-[3px] border-pencil hover:bg-accent hover:text-white transition-colors duration-100"
            style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px", boxShadow: "3px 3px 0px 0px #2d2d2d" }}
            aria-label="Open generators"
          >
            <HugeiconsIcon icon={Menu01Icon} size={20} strokeWidth={2.5} />
          </button>
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Image
              src="/shapesoup-logo.svg"
              alt="ShapeSoup"
              width={28}
              height={28}
              className="rounded-sm"
              style={{ transform: "rotate(-2deg)" }}
            />
            <h1
              className="text-2xl md:text-3xl font-bold tracking-tight font-heading"
              style={{ transform: "rotate(-1deg)" }}
            >
              ShapeSoup
            </h1>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/docs"
            className="hidden md:inline-flex px-3 py-2 bg-white border-[3px] border-pencil text-sm font-body text-pencil
              shadow-[3px_3px_0px_0px_#2d2d2d] hover:bg-accent hover:text-white hover:shadow-[2px_2px_0px_0px_#2d2d2d]
              active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all duration-100"
            style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px", fontFamily: "var(--font-body)" }}
          >
            Docs
          </Link>
          <div className="hidden md:flex">
            <ActionBar />
          </div>
          <button
            onClick={() => setShowRightDrawer(true)}
            className="md:hidden p-2 bg-white border-[3px] border-pencil hover:bg-accent hover:text-white transition-colors duration-100"
            style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px", boxShadow: "3px 3px 0px 0px #2d2d2d" }}
            aria-label="Open controls"
          >
            <HugeiconsIcon icon={Settings02Icon} size={20} strokeWidth={2.5} />
          </button>
        </div>
      </header>

      <div className="md:hidden px-4 py-3 bg-white border-b-[3px] border-pencil overflow-x-auto">
        <ActionBar />
      </div>

      <main className="flex flex-1 overflow-hidden relative">
        <aside
          className="hidden md:flex w-64 flex-shrink-0 border-r-[3px] border-pencil bg-white p-5 overflow-y-auto"
          style={{ boxShadow: "4px 0 0px 0px rgba(45,45,45,0.06)" }}
        >
          <GeneratorSelector />
        </aside>

        <section className="flex-1 flex items-center justify-center p-4 md:p-8 overflow-auto">
          <LivePreview />
        </section>

        <aside
          className="hidden md:flex w-80 flex-shrink-0 border-l-[3px] border-pencil bg-white p-5 overflow-y-auto"
          style={{ boxShadow: "-4px 0 0px 0px rgba(45,45,45,0.06)" }}
        >
          <ControlsSidebar />
        </aside>

        {showLeftDrawer && (
          <>
            <div className="absolute inset-0 bg-pencil/20 z-40 md:hidden" onClick={() => setShowLeftDrawer(false)} />
            <aside
              className="absolute left-0 top-0 bottom-0 w-72 z-50 bg-white border-r-[3px] border-pencil p-5 overflow-y-auto md:hidden"
              style={{ boxShadow: "8px 0 0px 0px rgba(45,45,45,0.15)" }}
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold font-heading" style={{ transform: "rotate(-1deg)" }}>Generators</h2>
                <button
                  onClick={() => setShowLeftDrawer(false)}
                  className="p-1.5 bg-white border-[3px] border-pencil hover:bg-accent hover:text-white transition-colors duration-100"
                  style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px", boxShadow: "2px 2px 0px 0px #2d2d2d" }}
                  aria-label="Close"
                >
                  <span className="text-lg font-heading leading-none px-1">&times;</span>
                </button>
              </div>
              <GeneratorSelector />
            </aside>
          </>
        )}

        {showRightDrawer && (
          <>
            <div className="absolute inset-0 bg-pencil/20 z-40 md:hidden" onClick={() => setShowRightDrawer(false)} />
            <aside
              className="absolute right-0 top-0 bottom-0 w-80 z-50 bg-white border-l-[3px] border-pencil p-5 overflow-y-auto md:hidden"
              style={{ boxShadow: "-8px 0 0px 0px rgba(45,45,45,0.15)" }}
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold font-heading" style={{ transform: "rotate(-1deg)" }}>Controls</h2>
                <button
                  onClick={() => setShowRightDrawer(false)}
                  className="p-1.5 bg-white border-[3px] border-pencil hover:bg-accent hover:text-white transition-colors duration-100"
                  style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px", boxShadow: "2px 2px 0px 0px #2d2d2d" }}
                  aria-label="Close"
                >
                  <span className="text-lg font-heading leading-none px-1">&times;</span>
                </button>
              </div>
              <ControlsSidebar />
            </aside>
          </>
        )}
      </main>
    </div>
  );
}
