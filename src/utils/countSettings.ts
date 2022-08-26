export const countSettings = (from: number, to: number, step: number): number =>
  Math.floor((to - from) / step)
