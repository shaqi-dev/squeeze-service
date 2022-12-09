export type KlinesLong = [
  number, // Kline open time
  string, // Open price
  string, // High price
  string, // Low price
  string, // Close price
  string, // Volume
  number, // Kline Close time
  string, // Quote asset volume
  number, // Number of trades
  string, // Taker buy base asset volume
  string, // Taker buy quote asset volume
  string, // Unused field, ignore.
]

export type KlinesShort = [
  number, // Kline open time
  string, // Open price
  string, // High price
  string, // Low price
  string, // Close price
  number, // Kline Close time
]

export type KlinesModified = [
  string, // Kline open time
  string, // Open price
  string, // High price
  string, // Low price
  string, // Close price
  string, // Kline Close time
  string, // Buy price
  string, // Sell price
  string, // Stop price
]
