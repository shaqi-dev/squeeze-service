import { FC, useState } from 'react'
import { useLazyGetExchangeInfoQuery } from '../../api/exchangeInfoApi'
import { useLazyGetSymbolsStatsMiniQuery } from '../../api/symbolStatsApi'
import SymbolsTable from '../SymbolsTable'

const SymbolsSettings: FC = () => {
  const [symbolsStats, setSymbolsStats] = useState<{ symbol: string; volume: string }[]>([])

  const [getExchangeInfo] = useLazyGetExchangeInfoQuery()
  const [getSymbolStats] = useLazyGetSymbolsStatsMiniQuery()

  const handleUpdateVolumes = async (): Promise<void> => {
    // parse all symbols
    const { data: exchangeInfo } = await getExchangeInfo()

    // filter full symbols data to USDT tickers only
    if (exchangeInfo) {
      const symbolsUSDT = exchangeInfo.symbols
        .filter((symbol) => symbol.quoteAsset === 'USDT')
        .map((symbol) => symbol.symbol)

      // parse volume
      if (symbolsUSDT.length) {
        const { data: currentStats } = await getSymbolStats(symbolsUSDT)

        // push sorted tickers to state
        if (currentStats) {
          const currentStatsSorted = [...currentStats]
            .sort((a, b) => +b.quoteVolume - +a.quoteVolume)
            .map((stats) => ({ symbol: stats.symbol, volume: stats.quoteVolume }))

          setSymbolsStats(currentStatsSorted)
        }
      }
    }
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <SymbolsTable symbols={symbolsStats} />
      <div className="flex gap-3">
        <button
          type="button"
          className="rounded-md bg-neutral-900 py-2 px-4 text-base font-semibold text-white transition-all duration-100 hover:bg-neutral-800"
          onClick={handleUpdateVolumes}
        >
          Load Symbols
        </button>
      </div>
    </div>
  )
}

export default SymbolsSettings
