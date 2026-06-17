"use client";

import { useState, Suspense } from "react";
import { PlaygroundHeader } from "@/components/playground/playgroundHeader";
import { GeneratorBrowser, GeneratorChips } from "@/components/playground/generatorBrowser";
import { PreviewWorkspace } from "@/components/playground/previewWorkspace";
import { InspectorSidebar } from "@/components/playground/inspectorSidebar";
import { ActionMenus } from "@/components/playground/actionMenus";
import { UrlSync } from "@/components/playground/urlSync";

export default function PlaygroundPage() {
  const [showLeftDrawer, setShowLeftDrawer] = useState(false);
  const [showRightDrawer, setShowRightDrawer] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-paper text-pencil overflow-hidden">
      <Suspense fallback={null}>
        <UrlSync />
      </Suspense>

      <PlaygroundHeader
        onOpenGenerators={() => setShowLeftDrawer(true)}
        onOpenInspector={() => setShowRightDrawer(true)}
      />

      {/* Mobile action bar below header */}
      <div className="sm:hidden px-4 py-2 bg-white border-b-[3px] border-pencil overflow-x-auto">
        <ActionMenus />
      </div>

      <main className="flex flex-1 overflow-hidden relative">
        {/* Desktop left sidebar */}
        <aside
          className="hidden md:flex w-64 flex-shrink-0 border-r-[3px] border-pencil bg-white p-4 overflow-y-auto"
          style={{ boxShadow: "4px 0 0px 0px rgba(45,45,45,0.06)" }}
        >
          <GeneratorBrowser />
        </aside>

        {/* Center workspace */}
        <section className="flex-1 flex flex-col overflow-y-auto">
          {/* Mobile generator chips */}
          <div className="md:hidden px-4 pt-4 pb-2">
            <GeneratorChips onSelect={() => setShowLeftDrawer(false)} />
          </div>

          <div className="flex-1 flex items-center justify-center p-4 md:p-6">
            <PreviewWorkspace />
          </div>

          {/* Mobile inspector toggle */}
          <div className="md:hidden px-4 pb-4">
            <button
              onClick={() => setShowRightDrawer(true)}
              className="w-full px-4 py-2.5 bg-white border-[3px] border-pencil text-base font-body text-pencil
                shadow-[4px_4px_0px_0px_#2d2d2d] hover:bg-accent hover:text-white hover:shadow-[2px_2px_0px_0px_#2d2d2d]
                active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all duration-100"
              style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px", fontFamily: "var(--font-body)" }}
            >
              Open Controls
            </button>
          </div>
        </section>

        {/* Desktop right sidebar */}
        <aside
          className="hidden md:flex w-80 flex-shrink-0 border-l-[3px] border-pencil bg-white p-4 overflow-y-auto"
          style={{ boxShadow: "-4px 0 0px 0px rgba(45,45,45,0.06)" }}
        >
          <InspectorSidebar />
        </aside>

        {/* Mobile left drawer */}
        {showLeftDrawer && (
          <>
            <div
              className="absolute inset-0 bg-pencil/20 z-40 md:hidden"
              onClick={() => setShowLeftDrawer(false)}
              aria-hidden="true"
            />
            <aside
              className="absolute left-0 top-0 bottom-0 w-72 z-50 bg-white border-r-[3px] border-pencil p-4 overflow-y-auto md:hidden"
              style={{ boxShadow: "8px 0 0px 0px rgba(45,45,45,0.15)" }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold font-heading" style={{ transform: "rotate(-1deg)" }}>
                  Generators
                </h2>
                <button
                  onClick={() => setShowLeftDrawer(false)}
                  className="p-1.5 bg-white border-[3px] border-pencil hover:bg-accent hover:text-white transition-colors duration-100"
                  style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px", boxShadow: "2px 2px 0px 0px #2d2d2d" }}
                  aria-label="Close generators"
                >
                  <span className="text-lg font-heading leading-none px-1">&times;</span>
                </button>
              </div>
              <GeneratorBrowser />
            </aside>
          </>
        )}

        {/* Mobile right drawer */}
        {showRightDrawer && (
          <>
            <div
              className="absolute inset-0 bg-pencil/20 z-40 md:hidden"
              onClick={() => setShowRightDrawer(false)}
              aria-hidden="true"
            />
            <aside
              className="absolute right-0 top-0 bottom-0 w-80 z-50 bg-white border-l-[3px] border-pencil p-4 overflow-y-auto md:hidden"
              style={{ boxShadow: "-8px 0 0px 0px rgba(45,45,45,0.15)" }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold font-heading" style={{ transform: "rotate(-1deg)" }}>
                  Controls
                </h2>
                <button
                  onClick={() => setShowRightDrawer(false)}
                  className="p-1.5 bg-white border-[3px] border-pencil hover:bg-accent hover:text-white transition-colors duration-100"
                  style={{ borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px", boxShadow: "2px 2px 0px 0px #2d2d2d" }}
                  aria-label="Close controls"
                >
                  <span className="text-lg font-heading leading-none px-1">&times;</span>
                </button>
              </div>
              <InspectorSidebar />
            </aside>
          </>
        )}
      </main>
    </div>
  );
}
