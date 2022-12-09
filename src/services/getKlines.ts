import axios from 'axios'
import { BinanceEndpoints } from '../api/BinanceEndpoints'

import type { KlinesLong, KlinesShort } from '../types/Klines'

const getKlines = async (
  symbol: string,
  timeframe: string,
  start: number = Date.now() - 86400000,
  end: number = Date.now(),
): Promise<KlinesShort[]> => {
  const klines: KlinesShort[] = []

  let currentStartTime = start

  // Parse klines data from binance
  const getData = async (startTime: number): Promise<void> => {
    try {
      const res = await axios.get<KlinesLong[]>(BinanceEndpoints.KLINES, {
        params: {
          symbol,
          interval: timeframe,
          startTime,
          endTime: end,
          limit: 1000,
        },
      })

      const { data } = res

      data.forEach((item) => klines.push([item[0], item[1], item[2], item[3], item[4], item[6]]))

      // Update current start time to last bar time in the part of data
      currentStartTime = data[data.length - 1][6] + 1
    } catch (error) {
      throw new Error(`Couldn't fetch ${symbol} klines data, received: ${error}`)
    }
  }

  while (currentStartTime < end) {
    // eslint-disable-next-line no-await-in-loop
    await getData(currentStartTime)
  }

  // Filter on duplicates
  const result = [...new Set(klines.map((item) => JSON.stringify(item)))].map((item) =>
    JSON.parse(item),
  )

  // Sort by date
  result.sort((a, b) => a[0] - b[0])

  return result
}

export default getKlines
