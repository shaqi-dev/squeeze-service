import { FC, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { useAppSelector } from '../../hooks/reduxHelpers'
import { selectConfigs } from '../../redux/configsSlice'
import { selectSymbols } from '../../redux/symbolsSlice'

import { timeframes, binds } from '../../utils/constants'

import { getBacktest } from '../../services/getBacktest'

import type { TimeframeSetting } from '../../types/TimeframeSettings'

const TimeframeSettings: FC = () => {
  const configs = useAppSelector(selectConfigs)
  const { symbols } = useAppSelector(selectSymbols)

  const [activeSettings, setActiveSettings] = useState<TimeframeSetting[]>([])

  useEffect(() => {
    if (activeSettings.length === 0) {
      setActiveSettings([{ timeframe: '15m', config: configs[0], binds }])
    }
  }, [configs, activeSettings.length])

  const handleClickTimeframeSelector = (timeframe: string): void => {
    const isActive = !!activeSettings.filter((x) => x.timeframe === timeframe).length

    if (isActive) {
      setActiveSettings([...activeSettings.filter((x) => x.timeframe !== timeframe)])
    } else {
      setActiveSettings([...activeSettings, { timeframe, config: configs[0], binds }])
    }
  }

  const handleClickBindSelector = (timeframe: string, bind: string): void => {
    const currentSetting = activeSettings.filter((x) => x.timeframe === timeframe)[0]

    if (currentSetting.binds.includes(bind)) {
      const changedSetting = {
        ...currentSetting,
        binds: currentSetting.binds.filter((x) => x !== bind),
      }
      setActiveSettings([
        ...activeSettings.filter((x) => x.timeframe !== timeframe),
        changedSetting,
      ])
    } else {
      const changedSetting = {
        ...currentSetting,
        binds: [...currentSetting.binds, bind],
      }
      setActiveSettings([
        ...activeSettings.filter((x) => x.timeframe !== timeframe),
        changedSetting,
      ])
    }
  }

  const handleChangeConfig = (timeframe: string, configId: string): void => {
    const currentSetting = activeSettings.filter((x) => x.timeframe === timeframe)[0]

    const changedSetting = {
      ...currentSetting,
      config: configs.filter((x) => x.id === configId)[0],
    }
    setActiveSettings([...activeSettings.filter((x) => x.timeframe !== timeframe), changedSetting])
  }

  const handleStartBacktest = async (): Promise<void> => {
    getBacktest(symbols, activeSettings)
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-5">
        <p className="text-xl font-bold">Timeframe Settings</p>
        <div className="flex gap-3">
          {timeframes.map((timeframe) => (
            <button
              type="button"
              key={`timeframe-selector-${timeframe}`}
              className={
                'border border-neutral-800 p-3 hover:text-blue-600' +
                `${
                  activeSettings.filter((x) => x.timeframe === timeframe).length
                    ? ' text-blue border-blue-600 text-blue-600'
                    : ''
                }`
              }
              onClick={(): void => handleClickTimeframeSelector(timeframe)}
            >
              {timeframe}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {activeSettings
            .sort((a, b) => timeframes.indexOf(a.timeframe) - timeframes.indexOf(b.timeframe))
            .map(({ timeframe, binds: currentBinds }) => (
              <div
                className="flex justify-around border border-neutral-800 py-3 px-4"
                key={`${timeframe}-settings`}
              >
                <p className="min-w-[30px]">{timeframe}</p>
                <select
                  name="config"
                  onChange={(e): void => handleChangeConfig(timeframe, e.target.value)}
                  value={activeSettings.find((x) => x.timeframe === timeframe)?.config.id}
                >
                  {configs.map((config) => (
                    <option
                      key={`timeframe-config-${config.data.name}-${uuidv4()}`}
                      value={config.id}
                    >
                      {config.data.name}
                    </option>
                  ))}
                </select>
                <div className="flex gap-2">
                  {binds.map((bind) => (
                    <button
                      type="button"
                      key={`${timeframe}-${bind}`}
                      className={`${currentBinds.includes(bind) ? 'text-blue-600' : ''}`}
                      onClick={(): void => handleClickBindSelector(timeframe, bind)}
                    >
                      {bind.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
      <button
        type="button"
        className="rounded-md bg-neutral-900 py-2 px-4 text-base font-semibold text-white transition-all duration-100 hover:bg-neutral-800"
        onClick={handleStartBacktest}
      >
        Start
      </button>
    </div>
  )
}

export default TimeframeSettings
