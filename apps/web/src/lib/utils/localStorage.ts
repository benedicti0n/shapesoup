const STORAGE_KEYS = {
  favorites: "shapesoup_favorites",
  presets: "shapesoup_presets",
} as const;

export interface FavoriteItem {
  id: string;
  name: string;
  generator: string;
  seed: string;
  config: Record<string, unknown>;
  svgPreview: string;
  createdAt: number;
}

export interface SavedPreset {
  id: string;
  name: string;
  generator: string;
  config: Record<string, unknown>;
  createdAt: number;
}

export function getFavorites(): FavoriteItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.favorites);
    return raw ? (JSON.parse(raw) as FavoriteItem[]) : [];
  } catch {
    return [];
  }
}

export function saveFavorite(item: FavoriteItem): void {
  if (typeof window === "undefined") return;
  const favorites = getFavorites();
  const next = [item, ...favorites].slice(0, 50);
  localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(next));
}

export function deleteFavorite(id: string): void {
  if (typeof window === "undefined") return;
  const favorites = getFavorites();
  const next = favorites.filter((f) => f.id !== id);
  localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(next));
}

export function getPresets(): SavedPreset[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.presets);
    return raw ? (JSON.parse(raw) as SavedPreset[]) : [];
  } catch {
    return [];
  }
}

export function savePreset(preset: SavedPreset): void {
  if (typeof window === "undefined") return;
  const presets = getPresets();
  const next = [preset, ...presets].slice(0, 50);
  localStorage.setItem(STORAGE_KEYS.presets, JSON.stringify(next));
}

export function deletePreset(id: string): void {
  if (typeof window === "undefined") return;
  const presets = getPresets();
  const next = presets.filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEYS.presets, JSON.stringify(next));
}
