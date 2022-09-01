import { FC, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useAppSelector } from '../../hooks/reduxHelpers'
import { selectConfigs, UniqueConfigItem } from '../../redux/configsSlice'

const timeframes = ['1m', '3m', '5m', '15m', '30m', '1h', '4h', '12h', '1d']
const binds = ['o', 'h', 'l', 'c', 'hl', 'oc']

interface TimeframeSetting {
  timeframe: string
  config: UniqueConfigItem
  binds: string[]
}

const TimeframeSettings: FC = () => {
  const configs = useAppSelector(selectConfigs)

  const [activeSettings, setActiveSettings] = useState<TimeframeSetting[]>([
    { timeframe: '15m', config: configs[0], binds },
  ])

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

  return (
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
              <select name="config">
                {configs.map((config) => (
                  <option
                    key={`timeframe-config-${config.data.name}-${uuidv4()}`}
                    value={config.data.name}
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
  )
}

export default TimeframeSettings
