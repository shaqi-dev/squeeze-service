enum OrderTypes {
  LIMIT = 'LIMIT',
  LIMIT_MAKER = 'LIMIT_MAKER',
  MARKET = 'MARKET',
  STOP_LOSS = 'STOP_LOSS',
  STOP_LOSS_LIMIT = 'STOP_LOSS_LIMIT',
  TAKE_PROFIT = 'TAKE_PROFIT',
  TAKE_PROFIT_LIMIT = 'TAKE_PROFIT_LIMIT',
}

enum Permissions {
  SPOT = 'SPOT',
  MARGIN = 'MARGIN',
}

export interface Symbol {
  symbol: string
  status: string
  baseAsset: string
  baseAssetPrecision: number
  quoteAsset: string
  quotePrecision: number // will be removed in future api versions (v4+)
  quoteAssetPrecision: number
  baseCommissionPrecision: number
  quoteCommissionPrecision: number
  orderTypes: OrderTypes[]
  icebergAllowed: boolean
  ocoAllowed: boolean
  quoteOrderQtyMarketAllowed: boolean
  allowTrailingStop: boolean
  cancelReplaceAllowed: boolean
  isSpotTradingAllowed: boolean
  isMarginTradingAllowed: boolean
  filters: []
  permissions: Permissions[]
}
