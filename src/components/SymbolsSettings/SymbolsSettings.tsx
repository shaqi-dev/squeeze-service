import { FC, useState, ChangeEventHandler } from 'react'
import { useLazyGetAllSymbolsStatsQuery } from '../../api/symbolStatsApi'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHelpers'
import { setSymbols, setMinVolume, selectSymbolsSettings } from '../../redux/symbolsSettingsSlice'
import SymbolsTable from '../SymbolsTable'
import { SymbolStatsResponseFull } from '../../types/SymbolStats'
import InputText from '../InputText'

const SymbolsSettings: FC = () => {
  const dispatch = useAppDispatch()
  const { symbols, minVolume } = useAppSelector(selectSymbolsSettings)
  const [minVolumeFilter, setMinVolumeFilter] = useState<boolean>(!!minVolume)
  const [getAllSymbolsStats, { data: cachedSymbolsStats }] = useLazyGetAllSymbolsStatsQuery()

  const updateSymbolsState = (
    symbolsStats: SymbolStatsResponseFull[],
    minVol = minVolume,
  ): void => {
    const result = [...symbolsStats]
      .map((symbol) => ({
        symbol: symbol.symbol,
        volume: symbol.quoteVolume,
      }))
      .filter((symbol) => {
        const RE_USDT = /\b\w+USDT\b/g
        let res = !!symbol.symbol.match(RE_USDT)

        if (res && minVol) {
          const convertedVolume = parseInt(symbol.volume, 10) / 1000000
          res = convertedVolume >= minVol
        }

        return res
      })
      .sort((a, b) => +b.volume - +a.volume)

    dispatch(setSymbols(result))
  }

  const handleLoadSymbols = async (): Promise<void> => {
    const { data: symbolsStats } = await getAllSymbolsStats()

    if (symbolsStats && symbolsStats.length) {
      updateSymbolsState(symbolsStats)
    }
  }

  const handleChangeMinVolume: ChangeEventHandler<HTMLInputElement> = (e) => {
    const currentMinVolume = e.target.value

    if (minVolumeFilter && currentMinVolume && +currentMinVolume) {
      dispatch(setMinVolume(+currentMinVolume))
    } else {
      dispatch(setMinVolume(null))
    }

    if (cachedSymbolsStats && cachedSymbolsStats.length) {
      updateSymbolsState(cachedSymbolsStats, +currentMinVolume)
    }
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <SymbolsTable symbols={symbols} />
      <p className="text-base text-gray-400">Total count: {symbols.length}</p>
      <div className="flex flex-col gap-3">
        <label htmlFor="min-vol" className="flex items-center gap-2 text-base">
          <input
            type="checkbox"
            checked={!!minVolumeFilter}
            onChange={(): void => setMinVolumeFilter(!minVolumeFilter)}
          />
          Minimal volume, m.:
          <InputText
            disabled={!minVolumeFilter}
            defaultValue={minVolume ? `${minVolume}` : ''}
            className="w-[70px]"
            onChange={handleChangeMinVolume}
          />
        </label>
        <button
          type="button"
          className="rounded-md bg-neutral-900 py-2 px-4 text-base font-semibold text-white transition-all duration-100 hover:bg-neutral-800"
          onClick={handleLoadSymbols}
        >
          Load Symbols
        </button>
      </div>
    </div>
  )
}

export default SymbolsSettings
