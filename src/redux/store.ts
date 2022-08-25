import { configureStore } from '@reduxjs/toolkit'
import { exchangeInfoApi } from '../api/exchangeInfoApi'

export const store = configureStore({
  reducer: {
    [exchangeInfoApi.reducerPath]: exchangeInfoApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(exchangeInfoApi.middleware),
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
