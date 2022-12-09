import { UniqueConfigItem } from '../redux/configsSlice'

export interface TimeframeSetting {
  timeframe: string
  config: UniqueConfigItem
  binds: string[]
}
