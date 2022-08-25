export const convertVolume = (volume: number): string =>
  `${Math.round(volume / 1000000).toLocaleString('en-US', { minimumFractionDigits: 0 })} m.`
