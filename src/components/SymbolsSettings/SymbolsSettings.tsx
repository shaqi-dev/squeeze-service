import { FC, useState, useRef } from 'react'
import { useLazyGetAllSymbolsStatsQuery } from '../../api/symbolStatsApi'
import SymbolsTable from '../SymbolsTable'

const SymbolsSettings: FC = () => {
  const [symbolsStats, setSymbolsStats] = useState<{ symbol: string; volume: string }[]>([])
  const [minVolumeFilter, setMinVolumeFilter] = useState(false)
  const minVolumeRef = useRef<HTMLInputElement>(null)
  const [getAllSymbolsStats] = useLazyGetAllSymbolsStatsQuery()

  const handleUpdateVolumes = async (): Promise<void> => {
    const { data: symbols } = await getAllSymbolsStats()

    if (symbols) {
      const result = [...symbols]
        .map((symbol) => ({
          symbol: symbol.symbol,
          volume: symbol.quoteVolume,
        }))
        .filter((symbol) => {
          const RE_USDT = /\b\w+USDT\b/g
          let res = !!symbol.symbol.match(RE_USDT)

          if (res && minVolumeFilter && minVolumeRef.current) {
            const convertedVolume = parseInt(symbol.volume, 10) / 1000000
            const currentMinVolume = +minVolumeRef.current.value
            res = convertedVolume >= currentMinVolume
          }

          return res
        })
        .sort((a, b) => +b.volume - +a.volume)

      setSymbolsStats(result)
    }
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <SymbolsTable symbols={symbolsStats} />
      <p className="text-base text-gray-400">Total count: {symbolsStats.length}</p>
      <div className="flex flex-col gap-3">
        <label htmlFor="min-vol" className="flex items-center gap-2 text-base">
          <input
            type="checkbox"
            checked={minVolumeFilter}
            onChange={(): void => setMinVolumeFilter(!minVolumeFilter)}
          />
          Minimal volume, m.:
          <input
            type="text"
            className="w-20 rounded-md border border-neutral-900 py-2 px-4 text-base disabled:border-neutral-400 disabled:bg-gray-200 disabled:text-gray-500"
            ref={minVolumeRef}
            disabled={!minVolumeFilter}
          />
        </label>
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
