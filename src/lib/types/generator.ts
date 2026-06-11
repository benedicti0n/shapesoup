export interface GeneratorResult {
  svg: string;
  jsx: string;
  metadata: {
    width: number;
    height: number;
    viewBox: string;
    elements: number;
  };
}

export interface Generator<TConfig> {
  name: string;
  generate(config: TConfig, seed: string): GeneratorResult;
}

export type RandomFn = () => number;

export interface SeededRandom {
  random: RandomFn;
  randomInt: (min: number, max: number) => number;
  randomFloat: (min: number, max: number) => number;
  pick: <T>(arr: T[]) => T;
}
