import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BinanceEndpoints } from './BinanceEndpoints'
import { SymbolStatsResponseFull } from '../types/SymbolStats'

export const klinesApi = createApi({
  reducerPath: 'klines',
  baseQuery: fetchBaseQuery({ baseUrl: BinanceEndpoints.KLINES }),
  endpoints: (builder) => ({
    getKlines: builder.query<SymbolStatsResponseFull[], void>({
      query: (symbol) => `?symbol=${symbol}`,
    }),
  }),
})

export const { useGetKlinesQuery, useLazyGetKlinesQuery } = klinesApi
