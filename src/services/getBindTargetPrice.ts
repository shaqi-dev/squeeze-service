import { KlinesShort } from '../types/Klines'

const getBindTargetPrice = (bind: string, prevBar: KlinesShort): number => {
  const [, open, high, low, close] = prevBar

  switch (bind) {
    case 'o':
      return +open
    case 'h':
      return +high
    case 'l':
      return +low
    case 'c':
      return +close
    case 'hl':
      return (+high + +low) / 2
    case 'oc':
      return (+open + +close) / 2
    default:
      return (+open + +close) / 2
  }
}

export default getBindTargetPrice
