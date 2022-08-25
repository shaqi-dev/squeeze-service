import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SymbolStatsShort } from '../types/SymbolStats'
import type { RootState } from './store'

export interface SymbolsSettingsState {
  symbols: SymbolStatsShort[]
  minVolume: number | null
}

const initialState: SymbolsSettingsState = {
  symbols: [],
  minVolume: null,
}

const symbolsSettingsSlice = createSlice({
  name: 'symbolsSettings',
  initialState,
  reducers: {
    setSymbols: (state, action: PayloadAction<SymbolStatsShort[]>) => {
      state.symbols = action.payload
    },
    setMinVolume: (state, action: PayloadAction<number | null>) => {
      state.minVolume = action.payload
    },
  },
})

export const { setSymbols, setMinVolume } = symbolsSettingsSlice.actions

export const selectSymbolsSettings = (state: RootState): SymbolsSettingsState =>
  state.symbolsSettings

export default symbolsSettingsSlice.reducer
