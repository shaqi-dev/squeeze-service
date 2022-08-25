import { configureStore } from '@reduxjs/toolkit'
import { exchangeInfoApi } from '../api/exchangeInfoApi'
import { symbolStatsApi } from '../api/symbolStatsApi'
import symbolsSettings from './symbolsSettingsSlice'

export const store = configureStore({
  reducer: {
    [exchangeInfoApi.reducerPath]: exchangeInfoApi.reducer,
    [symbolStatsApi.reducerPath]: symbolStatsApi.reducer,
    symbolsSettings,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(exchangeInfoApi.middleware, symbolStatsApi.middleware),
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
