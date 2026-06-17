"use client";

import { Suspense, useState } from "react";
import { GeneratorSelector } from "@/components/playground/generatorSelector";
import { LivePreview } from "@/components/playground/livePreview";
import { ControlsSidebar } from "@/components/playground/controlsSidebar";
import { ActionBar } from "@/components/playground/actionBar";
import { UrlSync } from "@/components/playground/urlSync";
import { Menu, X, SlidersHorizontal } from "lucide-react";

export default function Home() {
  const [showLeftDrawer, setShowLeftDrawer] = useState(false);
  const [showRightDrawer, setShowRightDrawer] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-zinc-50 dark:bg-zinc-950">
      <Suspense fallback={null}>
        <UrlSync />
      </Suspense>

      <header className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowLeftDrawer(true)}
            className="md:hidden p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
            aria-label="Open generators"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
            ShapeSoup
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex">
            <ActionBar />
          </div>
          <button
            onClick={() => setShowRightDrawer(true)}
            className="md:hidden p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
            aria-label="Open controls"
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile action bar */}
      <div className="md:hidden px-4 py-2 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-x-auto">
        <ActionBar />
      </div>

      <main className="flex flex-1 overflow-hidden relative">
        {/* Desktop left sidebar */}
        <aside className="hidden md:flex w-56 flex-shrink-0 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 overflow-y-auto">
          <GeneratorSelector />
        </aside>

        {/* Main preview */}
        <section className="flex-1 flex items-center justify-center p-4 md:p-8 overflow-auto">
          <LivePreview />
        </section>

        {/* Desktop right sidebar */}
        <aside className="hidden md:flex w-72 flex-shrink-0 border-l border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 overflow-y-auto">
          <ControlsSidebar />
        </aside>

        {/* Mobile left drawer */}
        {showLeftDrawer && (
          <>
            <div
              className="absolute inset-0 bg-black/30 z-40 md:hidden"
              onClick={() => setShowLeftDrawer(false)}
            />
            <aside className="absolute left-0 top-0 bottom-0 w-64 z-50 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 p-4 overflow-y-auto md:hidden shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">
                  Generator
                </h2>
                <button
                  onClick={() => setShowLeftDrawer(false)}
                  className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <GeneratorSelector />
            </aside>
          </>
        )}

        {/* Mobile right drawer */}
        {showRightDrawer && (
          <>
            <div
              className="absolute inset-0 bg-black/30 z-40 md:hidden"
              onClick={() => setShowRightDrawer(false)}
            />
            <aside className="absolute right-0 top-0 bottom-0 w-72 z-50 bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-4 overflow-y-auto md:hidden shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">
                  Controls
                </h2>
                <button
                  onClick={() => setShowRightDrawer(false)}
                  className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
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
