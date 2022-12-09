import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SymbolStatsShort } from '../types/SymbolStats'
import type { RootState } from './store'

export interface SymbolsState {
  symbols: SymbolStatsShort[]
  minVolume: number | null
}

const initialState: SymbolsState = {
  symbols: [],
  minVolume: null,
}

const symbolsSlice = createSlice({
  name: 'symbols',
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

export const { setSymbols, setMinVolume } = symbolsSlice.actions

export const selectSymbols = (state: RootState): SymbolsState => state.symbols

export default symbolsSlice.reducer
