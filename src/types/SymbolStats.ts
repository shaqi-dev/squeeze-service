export enum SymbolStatsType {
  FULL = 'FULL',
  MINI = 'MINI',
}

export interface SymbolStatsResponseFull {
  symbol: string
  priceChange: string
  priceChangePercent: string
  weightedAvgPrice: string
  prevClosePrice: string
  lastPrice: string
  lastQty: string
  bidPrice: string
  bidQty: string
  askPrice: string
  askQty: string
  openPrice: string
  highPrice: string
  lowPrice: string
  volume: string
  quoteVolume: string
  openTime: number
  closeTime: number
  firstId: number // First tradeId
  lastId: number // Last tradeId
  count: number // Trade count
}

export interface SymbolStatsResponseMini {
  symbol: string // Symbol Name
  openPrice: string // Opening price of the Interval
  highPrice: string // Highest price in the interval
  lowPrice: string // Lowest  price in the interval
  lastPrice: string // Closing price of the interval
  volume: string // Total trade volume (in base asset)
  quoteVolume: string // Total trade volume (in quote asset)
  openTime: number // Start of the ticker interval
  closeTime: number // End of the ticker interval
  firstId: number // First tradeId considered
  lastId: number // Last tradeId considered
  count: number // Total trade count
}
