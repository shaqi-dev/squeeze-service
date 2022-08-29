import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Config } from '../types/Config'
import type { RootState } from './store'

export interface ConfigItem {
  name: string
  configs: Config[]
}

const initialState: ConfigItem[] = []

const configsSlice = createSlice({
  name: 'symbolsSettings',
  initialState,
  reducers: {
    addConfig: (state, action: PayloadAction<ConfigItem>) => {
      state.push(action.payload)
    },
    updateConfig: (state, action: PayloadAction<ConfigItem>) => {
      const current = state.indexOf(state.filter((item) => item.name === action.payload.name)[0])
      state[current] = action.payload
    },
    deleteConfig: (state, action: PayloadAction<ConfigItem>) => {
      state = state.filter((item) => item.name !== action.payload.name)
    },
  },
})

export const { addConfig, updateConfig, deleteConfig } = configsSlice.actions

export const selectConfigs = (state: RootState): ConfigItem[] => state.configs

export default configsSlice.reducer
