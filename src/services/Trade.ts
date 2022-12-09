class Trade {
  buy: number

  sell: number

  stop: number

  constructor(buy: number, sell: number, stop: number) {
    this.buy = buy
    this.sell = sell
    this.stop = stop
  }

  getSellOrder = (): number => this.sell

  getStopOrder = (): number => this.stop
}

export default Trade
