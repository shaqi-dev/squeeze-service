/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import getKlines from './getKlines'
import getBindTargetPrice from './getBindTargetPrice'
import { KlinesModified } from '../types/Klines'

import type { SymbolStatsShort } from '../types/SymbolStats'
import type { TimeframeSetting } from '../types/TimeframeSettings'
import TradesStats, { TradeStats, TradeType } from './TradeStats'

interface TradeStatsExtended extends TradeStats {
  symbol: string
  timeframe: string
  bind: string
}

export const getBacktest = async (
  symbols: SymbolStatsShort[],
  timeframes: TimeframeSetting[],
): Promise<void> => {
  let totalResult: TradeStatsExtended[] = []

  for (const timeframe of timeframes) {
    let currentTimeframeResult: TradeStatsExtended[] = []

    for (const symbol of symbols) {
      const klines = await getKlines(symbol.symbol, timeframe.timeframe)

      let currentSymbolResult: TradeStatsExtended[] = []

      for (const bind of timeframe.binds) {
        const currentBindResult: TradeStatsExtended[] = []

        for (const config of timeframe.config.configs) {
          const [buyPercent, sellPercent, stopPercent] = config

          const stats = new TradesStats(buyPercent, sellPercent, stopPercent)

          klines.forEach((bar, i, arr) => {
            const [openTime, open, high, low, close, closeTime] = bar

            if (i > 0) {
              const prevBar = arr[i - 1]
              const bindPrice = getBindTargetPrice(bind, prevBar)
              const buy = bindPrice - bindPrice * (buyPercent / 100)
              const sell = buy * (1 + sellPercent / 100)
              const stop = buy - buy * (stopPercent / 100)

              const openTimeString = new Date(openTime).toLocaleString()
              const closeTimeString = new Date(closeTime + 1).toLocaleString()
              const getRoundPrice = (price: number): string =>
                Number(price).toFixed(open.length - 2)
              const modifiedBar: KlinesModified = [
                openTimeString,
                bar[1],
                bar[2],
                bar[3],
                bar[4],
                closeTimeString,
                getRoundPrice(buy),
                getRoundPrice(sell),
                getRoundPrice(stop),
              ]

              const { currentTrade } = stats
              const stopOrder = currentTrade && +currentTrade.getStopOrder()
              const sellOrder = currentTrade && +currentTrade.getSellOrder()

              const buyCondition = +low <= +buy
              const sellCondition = +high >= sellOrder!
              const instantSellCondition = +close >= sell
              const stopCondition = +low <= stopOrder!
              const instantStopCondition = +low <= stop

              // Main trading logic
              if (currentTrade) {
                stats.continue()
                if (stopCondition) {
                  stats.closeTrade(TradeType.STOP, openTimeString, modifiedBar)
                } else if (sellCondition) {
                  stats.closeTrade(TradeType.SELL, openTimeString, modifiedBar)
                }
              } else if (currentTrade === null && buyCondition) {
                stats.openTrade(openTimeString, buy, sell, stop, modifiedBar)
                if (instantStopCondition) {
                  stats.closeTrade(TradeType.STOP, openTimeString, modifiedBar)
                } else if (instantSellCondition) {
                  stats.closeTrade(TradeType.SELL, openTimeString, modifiedBar)
                }
              }
            }
          })

          currentBindResult.push({
            symbol: symbol.symbol,
            timeframe: timeframe.timeframe,
            bind,
            ...stats.returnStats(),
          })
        }

        currentSymbolResult = [...currentSymbolResult, ...currentBindResult]
          .sort((a, b) => b.profitAmount - a.profitAmount)
          .slice(0, 10)

        console.log(currentSymbolResult)
      }

      currentTimeframeResult = [...currentTimeframeResult, ...currentSymbolResult]
        .sort((a, b) => b.profitAmount - a.profitAmount)
        .slice(0, 10)

      console.log(currentTimeframeResult)
    }

    totalResult = [...totalResult, ...currentTimeframeResult]
      .sort((a, b) => b.profitAmount - a.profitAmount)
      .slice(0, 10)

    console.log(totalResult)
  }
}
