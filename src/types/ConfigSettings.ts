export interface ConfigSetting {
  from: number
  to: number
  step: number
}

export interface ConfigSettings {
  buy: ConfigSetting
  sell: ConfigSetting
  stop: ConfigSetting
}
