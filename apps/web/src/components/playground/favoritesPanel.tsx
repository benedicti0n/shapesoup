"use client";

import { useState } from "react";
import {
  getFavorites,
  saveFavorite,
  deleteFavorite,
  type FavoriteItem,
} from "@/lib/utils/localStorage";
import { usePlaygroundStore, type GeneratorName } from "@/lib/store/playgroundStore";
import { HugeiconsIcon } from "@hugeicons/react";
import { StarIcon, Delete01Icon, Bookmark02Icon } from "@hugeicons/core-free-icons";

const wobblyRadius = "255px 15px 225px 15px / 15px 225px 15px 255px";

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
    <div className="flex flex-col gap-3 mt-2">
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="flex items-center justify-between text-lg font-bold font-heading text-pencil hover:text-accent transition-colors"
        style={{ transform: "rotate(-0.5deg)" }}
      >
        <span className="flex items-center gap-2">
          <HugeiconsIcon icon={StarIcon} size={18} strokeWidth={2.5} />
          Favorites
        </span>
        <span className="text-sm font-body">{isOpen ? "−" : "+"}</span>
      </button>
      <div className="w-full h-0.5 bg-pencil border-dashed border-t-2 border-pencil opacity-20" />

      {isOpen && (
        <>
          {favorites.length === 0 ? (
            <p className="text-base font-body text-pencil/40">No favorites yet.</p>
          ) : (
            <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
              {favorites.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2 px-3 py-2 bg-white border-[3px] border-pencil transition-all duration-100 hover:shadow-[2px_2px_0px_0px_#2d2d2d] hover:-translate-y-px"
                  style={{ borderRadius: wobblyRadius, boxShadow: "3px 3px 0px 0px rgba(45,45,45,0.1)" }}
                >
                  <button
                    onClick={() => handleLoad(item)}
                    className="flex-1 text-left text-base font-body text-pencil truncate hover:text-accent transition-colors"
                    title={`${item.name} (${item.generator})`}
                  >
                    <span className="font-bold">{item.name}</span>
                    <span className="text-sm text-pencil/50 ml-2">{item.generator}</span>
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-pencil/40 hover:text-accent transition-colors p-1"
                    aria-label="Remove favorite"
                  >
                    <HugeiconsIcon icon={Delete01Icon} size={16} strokeWidth={2.5} />
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
      className={`
        inline-flex items-center gap-1.5 px-3 py-2
        border-[3px] border-pencil text-sm font-body
        transition-all duration-100
        hover:shadow-[2px_2px_0px_0px_#2d2d2d] hover:-translate-y-px
        active:shadow-none active:translate-x-[3px] active:translate-y-[3px]
        ${saved
          ? "bg-accent text-white shadow-[2px_2px_0px_0px_#2d2d2d]"
          : "bg-white text-pencil shadow-[4px_4px_0px_0px_#2d2d2d] hover:bg-accent hover:text-white"
        }
      `}
      style={{ borderRadius: wobblyRadius, fontFamily: "var(--font-body)" }}
      title="Save to favorites"
    >
      <HugeiconsIcon icon={Bookmark02Icon} size={16} strokeWidth={2.5} />
      {saved ? "Saved!" : "Favorite"}
    </button>
  );
}
