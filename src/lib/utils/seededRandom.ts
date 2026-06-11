import { SeededRandom } from "@/lib/types/generator";

export function createSeededRandom(seed: string): SeededRandom {
  let state = hashString(seed);

  function mulberry32(): number {
    let t = (state += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  const random = () => mulberry32();

  const randomInt = (min: number, max: number): number => {
    return Math.floor(random() * (max - min + 1)) + min;
  };

  const randomFloat = (min: number, max: number): number => {
    return random() * (max - min) + min;
  };

  const pick = <T>(arr: T[]): T => {
    return arr[randomInt(0, arr.length - 1)];
  };

  return { random, randomInt, randomFloat, pick };
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return hash;
}
