import { FC, useState } from 'react'
import { useLazyGetAllSymbolsStatsQuery } from '../../api/symbolStatsApi'
import SymbolsTable from '../SymbolsTable'

const SymbolsSettings: FC = () => {
  const [symbolsStats, setSymbolsStats] = useState<{ symbol: string; volume: string }[]>([])
  const [getAllSymbolsStats] = useLazyGetAllSymbolsStatsQuery()

  const handleUpdateVolumes = async (): Promise<void> => {
    const { data: symbols } = await getAllSymbolsStats()

    if (symbols) {
      const result = [...symbols]
        .map((symbol) => ({
          symbol: symbol.symbol,
          volume: symbol.quoteVolume,
        }))
        .filter((symbol) => symbol.symbol.match(/\b\w+USDT\b/g))
        .sort((a, b) => +b.volume - +a.volume)

      setSymbolsStats(result)
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
