import { Config } from '../types/Config'
import { ConfigSetting, ConfigSettings } from '../types/ConfigSettings'

const getSettingRange = ({ from, to, step }: ConfigSetting): number[] =>
  Array.from({ length: (to - from) / step + 1 }, (_, k) => Math.round((k * step + from) * 10) / 10)

export const createConfigs = ({ buy, sell, stop }: ConfigSettings): Config[] => {
  const rangeBuy = getSettingRange(buy)
  const rangeSell = getSettingRange(sell)
  const rangeStop = getSettingRange(stop)

  const configs: Config[] = []

  for (let i = 0; i < rangeBuy.length; i += 1) {
    for (let j = 0; j < rangeSell.length; j += 1) {
      for (let k = 0; k < rangeStop.length; k += 1) {
        configs.push([rangeBuy[i], rangeSell[j], rangeStop[k]])
      }
    }
  }

  return configs
}
