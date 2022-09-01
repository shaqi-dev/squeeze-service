import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import type { Config } from '../types/Config'
import type { ConfigsSettingsFormInputs } from '../components/ConfigsSettings/ConfigsSettings'
import type { RootState } from './store'

export interface ConfigItem {
  data: ConfigsSettingsFormInputs
  configs: Config[]
}

export interface UniqueConfigItem extends ConfigItem {
  id: string
}

const initialState: UniqueConfigItem[] = []

const configsSlice = createSlice({
  name: 'symbolsSettings',
  initialState,
  reducers: {
    addConfig: (state, action: PayloadAction<ConfigItem>) => {
      return [...state, { id: uuidv4(), ...action.payload }]
    },
    updateConfig: (state, action: PayloadAction<UniqueConfigItem>) => {
      return [...state.filter((x) => x.id !== action.payload.id), action.payload]
    },
    deleteConfig: (state, action: PayloadAction<UniqueConfigItem>) => {
      return [...state.filter((x) => x.id !== action.payload.id)]
    },
  },
})

export const { addConfig, updateConfig, deleteConfig } = configsSlice.actions

export const selectConfigs = (state: RootState): UniqueConfigItem[] => state.configs

export default configsSlice.reducer
