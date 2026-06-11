"use client";

import { GeneratorSelector } from "@/components/playground/generatorSelector";
import { LivePreview } from "@/components/playground/livePreview";
import { ControlsSidebar } from "@/components/playground/controlsSidebar";
import { ActionBar } from "@/components/playground/actionBar";

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-zinc-50 dark:bg-zinc-950">
      <header className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <h1 className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">
          ShapeSoup
        </h1>
        <ActionBar />
      </header>

      <main className="flex flex-1 overflow-hidden">
        <aside className="w-56 flex-shrink-0 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 overflow-y-auto">
          <GeneratorSelector />
        </aside>

        <section className="flex-1 flex items-center justify-center p-8 overflow-auto">
          <LivePreview />
        </section>

        <aside className="w-72 flex-shrink-0 border-l border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 overflow-y-auto">
          <ControlsSidebar />
        </aside>
      </main>
    </div>
  );
}
