import Trade from './Trade'
import getRoundNum from '../utils/getRoundNum'
import { KlinesModified } from '../types/Klines'

export enum TradeType {
  BUY,
  SELL,
  STOP,
}

export interface TradeData {
  time: string
  type: TradeType
  price: number
  amount: number
  USD: number
  bar: KlinesModified
  'Change, $'?: number
  'Change, %'?: number
  'Current Drawdown, %'?: number
  bars?: number | 'instant'
}

export interface TradeStats {
  config: [number, number, number]
  stats: [number, number, number]
  percentProfitable: number
  profitAmount: number
  profitPercent: number
  maxDrawdawn: number
  barsAvgAmount: number
  maxBarsToSell: number
  trades: TradeData[]
}

class TradesStats {
  fees = 0.075 / 100

  balance = 1000

  buyConfig: number

  sellConfig: number

  stopConfig: number

  initBalance = 1000

  prevBaseBalance = 0

  baseBalance = 1000

  tradeBalance = 0

  barsToSell = 0

  maxBarsToSell = 0

  barsTotal = 0

  barsAvg = 0

  closed = 0

  stopped = 0

  profitable = 0

  currentDrawdawn = 0

  maxDrawdawn = 0

  currentTrade: Trade | null = null

  trades: TradeData[] = []

  constructor(buyConfig: number, sellConfig: number, stopConfig: number) {
    this.buyConfig = getRoundNum(buyConfig, 2)
    this.sellConfig = getRoundNum(sellConfig, 2)
    this.stopConfig = getRoundNum(stopConfig, 2)
  }

  getTradeAmount = (): number => getRoundNum(this.tradeBalance, 2)

  getBaseAmount = (): number => getRoundNum(this.baseBalance, 2)

  getChangeAmount = (): number => getRoundNum(this.baseBalance - this.prevBaseBalance, 2)

  changePercent = (): number => getRoundNum(100 * (this.baseBalance / this.prevBaseBalance - 1), 2)

  percentProfitable = (): number => getRoundNum(100 * (this.profitable / this.closed), 2)

  profitAmount = (): number => getRoundNum(this.baseBalance - this.initBalance, 2)

  profitPercent = (): number => getRoundNum(100 * (this.baseBalance / this.initBalance) - 100, 2)

  barsAvgAmount = (): number => Math.round(this.barsTotal / this.closed)

  getTotalProfit(): string {
    const resAbsolute = getRoundNum(this.baseBalance - this.initBalance, 2)
    const resRelative = getRoundNum(100 * (this.baseBalance / this.initBalance - 1), 2)

    return resAbsolute >= 0
      ? `+$${resAbsolute} (+${resRelative}%)`
      : `-$${Math.abs(resAbsolute)} (${resRelative}%)`
  }

  pushTrade(type: TradeType, time: string, price: number, bar: KlinesModified): number {
    const data: TradeData = {
      time,
      type,
      price,
      amount: this.getTradeAmount(),
      USD: this.getBaseAmount(),
      bar,
    }

    if (type === TradeType.BUY) {
      return this.trades.push(data)
    }

    return this.trades.push({
      ...data,
      'Change, $': this.getChangeAmount(),
      'Change, %': this.changePercent(),
      'Current Drawdown, %': this.currentDrawdawn,
      bars: this.barsToSell || 'instant',
    })
  }

  // eslint-disable-next-line no-unused-vars
  openTrade(time: string, buy: number, sell: number, stop: number, bar: KlinesModified): void {
    this.currentTrade = new Trade(buy, sell, stop)
    this.barsToSell = 0
    this.prevBaseBalance = this.getBaseAmount()
    this.tradeBalance = (this.baseBalance - this.baseBalance * this.fees) / buy
    this.pushTrade(TradeType.BUY, time, buy, bar)
  }

  // eslint-disable-next-line no-unused-vars
  closeTrade(type: TradeType, time: string, bar: KlinesModified): void {
    let price

    if (type === TradeType.SELL && this.currentTrade) {
      price = this.currentTrade.getSellOrder()
      this.baseBalance = (this.tradeBalance - this.tradeBalance * this.fees) * price
      this.profitable += 1
      this.updateCurrentDrawdawn()
    } else if (type === TradeType.STOP && this.currentTrade) {
      price = this.currentTrade.getStopOrder()
      this.baseBalance = this.tradeBalance * price - this.tradeBalance * price * this.fees
      this.stopped += 1
      this.currentDrawdawn += this.changePercent()
      this.updateMaxDrawdawn()
    }

    if (price) {
      this.updateMaxBars()
      this.pushTrade(type, time, price, bar)
      this.closed += 1
      this.currentTrade = null
    }
  }

  updateCurrentDrawdawn(): void {
    if (this.currentDrawdawn < 0 && this.currentDrawdawn + this.changePercent() < 0) {
      this.currentDrawdawn += this.changePercent()
    } else if (this.currentDrawdawn < 0 && this.currentDrawdawn + this.changePercent() >= 0) {
      this.currentDrawdawn = 0
    }
  }

  updateMaxDrawdawn(): void {
    if (this.currentDrawdawn < this.maxDrawdawn) {
      this.maxDrawdawn = this.currentDrawdawn
    }
  }

  updateMaxBars(): void {
    if (this.barsToSell > this.maxBarsToSell) {
      this.maxBarsToSell = this.barsToSell
    }
  }

  continue(): void {
    this.barsToSell += 1
    this.barsTotal += 1
  }

  returnStats(): TradeStats {
    return {
      config: [this.buyConfig, this.sellConfig, this.stopConfig],
      stats: [this.profitable, this.stopped, this.closed],
      percentProfitable: this.percentProfitable(),
      profitAmount: this.profitAmount(),
      profitPercent: this.profitPercent(),
      maxDrawdawn: getRoundNum(this.maxDrawdawn, 2),
      barsAvgAmount: this.barsAvgAmount(),
      maxBarsToSell: this.maxBarsToSell,
      trades: this.trades,
    }
  }
}

export default TradesStats
