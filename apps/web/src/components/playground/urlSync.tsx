"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { usePlaygroundStore } from "@/lib/store/playgroundStore";
import {
  parsePlaygroundStateFromSearchParams,
  serializePlaygroundStateToSearchParams,
} from "@/lib/utils/urlState";

export function UrlSync() {
  const searchParams = useSearchParams();
  const activeGenerator = usePlaygroundStore((s) => s.activeGenerator);
  const seed = usePlaygroundStore((s) => s.seed);
  const configs = usePlaygroundStore((s) => s.configs);
  const hydrate = usePlaygroundStore((s) => s.hydrate);
  const isHydrating = useRef(true);

  // Hydrate store from URL on initial mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const parsed = parsePlaygroundStateFromSearchParams(
      new URLSearchParams(window.location.search)
    );

    if (!parsed.type && !parsed.seed) {
      isHydrating.current = false;
      return;
    }

    const updates: Parameters<typeof hydrate>[0] = {};

    if (parsed.type) updates.activeGenerator = parsed.type;
    if (parsed.seed) updates.seed = parsed.seed;

    const generator = parsed.type ?? activeGenerator;
    const generatorConfig = { ...configs[generator] };

    if (parsed.width !== undefined) generatorConfig.width = parsed.width;
    if (parsed.height !== undefined) generatorConfig.height = parsed.height;
    if (parsed.colors !== undefined) generatorConfig.colors = parsed.colors;

    if (parsed.params) {
      for (const [key, value] of Object.entries(parsed.params)) {
        (generatorConfig as Record<string, unknown>)[key] = value;
      }
    }

    updates.configs = { [generator]: generatorConfig } as Partial<
      Parameters<typeof hydrate>[0]["configs"]
    >;

    hydrate(updates);
    isHydrating.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync URL from store changes (skip during hydration)
  useEffect(() => {
    if (isHydrating.current) return;

    const serialized = serializePlaygroundStateToSearchParams({
      activeGenerator,
      seed,
      config: configs[activeGenerator],
    });

    const newSearch = serialized.toString();
    const currentSearch = searchParams.toString();

    if (newSearch !== currentSearch) {
      window.history.replaceState(null, "", `${window.location.pathname}?${newSearch}`);
    }
  }, [activeGenerator, seed, configs, searchParams]);

  return null;
}
