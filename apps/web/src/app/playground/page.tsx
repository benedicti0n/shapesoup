"use client";

import { useState, Suspense } from "react";
import { PlaygroundHeader } from "@/components/playground/playgroundHeader";
import { GeneratorBrowser } from "@/components/playground/generatorBrowser";
import { PreviewWorkspace } from "@/components/playground/previewWorkspace";
import { InspectorSidebar } from "@/components/playground/inspectorSidebar";
import { UrlSync } from "@/components/playground/urlSync";
import { MobileActionSheet } from "@/components/playground/mobileActionSheet";
import { MobileControlsSheet, MobileControlsBar } from "@/components/playground/mobileControlsSheet";
import { MobileGeneratorPicker, MobileGeneratorSheet } from "@/components/playground/mobileGeneratorPicker";

export default function PlaygroundPage() {
  const [showLeftDrawer, setShowLeftDrawer] = useState(false);
  const [showRightDrawer, setShowRightDrawer] = useState(false);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [showControlsSheet, setShowControlsSheet] = useState(false);
  const [showGeneratorSheet, setShowGeneratorSheet] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-paper text-pencil overflow-hidden">
      <Suspense fallback={null}>
        <UrlSync />
      </Suspense>

      {/* Header */}
      <PlaygroundHeader onOpenGenerators={() => setShowLeftDrawer(true)} />

      <main className="flex flex-1 overflow-hidden relative">
        {/* Desktop left sidebar */}
        <aside
          className="hidden md:flex w-64 flex-shrink-0 border-r-[3px] border-pencil bg-white p-4 overflow-y-auto"
          style={{ boxShadow: "4px 0 0px 0px rgba(45,45,45,0.06)" }}
        >
          <GeneratorBrowser />
        </aside>

        {/* Center workspace */}
        <section className="flex-1 flex flex-col overflow-y-auto min-w-0">
          {/* Mobile: generator picker button */}
          <div className="md:hidden px-4 pt-3 pb-1">
            <MobileGeneratorPicker onOpen={() => setShowGeneratorSheet(true)} />
          </div>

          <div className="flex-1 flex items-center justify-center p-3 md:p-6">
            <PreviewWorkspace />
          </div>
        </section>

        {/* Desktop right sidebar */}
        <aside
          className="hidden md:flex w-80 flex-shrink-0 border-l-[3px] border-pencil bg-white p-4 overflow-y-auto"
          style={{ boxShadow: "-4px 0 0px 0px rgba(45,45,45,0.06)" }}
        >
          <InspectorSidebar />
        </aside>

        {/* Mobile left drawer (generator browser) */}
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

        {/* Mobile right drawer (inspector - kept for fallback) */}
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

      {/* Mobile sticky bottom controls bar */}
      <MobileControlsBar
        onOpenControls={() => setShowControlsSheet(true)}
        onOpenActions={() => setShowActionSheet(true)}
      />

      {/* Mobile overlays */}
      {showActionSheet && <MobileActionSheet onClose={() => setShowActionSheet(false)} />}
      {showControlsSheet && <MobileControlsSheet onClose={() => setShowControlsSheet(false)} />}
      {showGeneratorSheet && <MobileGeneratorSheet onClose={() => setShowGeneratorSheet(false)} />}
    </div>
  );
}
