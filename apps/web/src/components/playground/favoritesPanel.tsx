"use client";

import { useState } from "react";
import {
  getFavorites,
  saveFavorite,
  deleteFavorite,
  type FavoriteItem,
} from "@/lib/utils/localStorage";
import { usePlaygroundStore, type GeneratorName } from "@/lib/store/playgroundStore";
import { Star } from "lucide-react";

export function FavoritesPanel() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(getFavorites);
  const [isOpen, setIsOpen] = useState(false);

  const hydrate = usePlaygroundStore((s) => s.hydrate);

  const refresh = () => setFavorites(getFavorites());

  const handleLoad = (item: FavoriteItem) => {
    hydrate({
      activeGenerator: item.generator as GeneratorName,
      seed: item.seed,
      configs: { [item.generator]: item.config },
    });
  };

  const handleDelete = (id: string) => {
    deleteFavorite(id);
    refresh();
  };

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="flex items-center justify-between text-sm font-semibold text-zinc-500 uppercase tracking-wider"
      >
        <span className="flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5" />
          Favorites
        </span>
        <span className="text-xs">{isOpen ? "−" : "+"}</span>
      </button>

      {isOpen && (
        <>
          {favorites.length === 0 ? (
            <p className="text-xs text-zinc-400">No favorites yet.</p>
          ) : (
            <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto">
              {favorites.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <button
                    onClick={() => handleLoad(item)}
                    className="flex-1 text-left text-sm text-zinc-700 dark:text-zinc-300 truncate"
                    title={`${item.name} (${item.generator})`}
                  >
                    <span className="font-medium">{item.name}</span>
                    <span className="text-xs text-zinc-400 ml-2">
                      {item.generator}
                    </span>
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-xs text-zinc-400 hover:text-red-500 transition-colors px-2"
                    aria-label="Remove favorite"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export function SaveFavoriteButton() {
  const [saved, setSaved] = useState(false);
  const activeGenerator = usePlaygroundStore((s) => s.activeGenerator);
  const seed = usePlaygroundStore((s) => s.seed);
  const configs = usePlaygroundStore((s) => s.configs);
  const result = usePlaygroundStore((s) => s.result);

  const handleSave = () => {
    if (!result) return;
    const item: FavoriteItem = {
      id: crypto.randomUUID(),
      name: `${activeGenerator} #${seed.slice(0, 6)}`,
      generator: activeGenerator,
      seed,
      config: { ...configs[activeGenerator] },
      svgPreview: result.svg.slice(0, 500),
      createdAt: Date.now(),
    };
    saveFavorite(item);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <button
      onClick={handleSave}
      className="px-3 py-2 rounded-lg bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors flex items-center gap-1.5"
      title="Save to favorites"
    >
      <Star className={`w-4 h-4 ${saved ? "fill-yellow-400 text-yellow-400" : ""}`} />
      {saved ? "Saved!" : "Favorite"}
    </button>
  );
}
