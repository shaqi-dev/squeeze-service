import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BinanceEndpoints } from './BinanceEndpoints'
import { SymbolStatsResponseFull } from '../types/SymbolStats'

export const symbolStatsApi = createApi({
  reducerPath: 'tickerStats',
  baseQuery: fetchBaseQuery({ baseUrl: BinanceEndpoints.TICKER_STATS_24H }),
  endpoints: (builder) => ({
    getAllSymbolsStats: builder.query<SymbolStatsResponseFull[], void>({
      query: () => '',
    }),
    getSymbolStats: builder.query<SymbolStatsResponseFull, string>({
      query: (symbol) => `?symbol=${symbol}`,
    }),
    getSymbolsStats: builder.query<SymbolStatsResponseFull[], string[]>({
      query: (symbols) => `?symbols=${encodeURI(JSON.stringify(symbols))} `,
    }),
  }),
})

export const {
  useGetAllSymbolsStatsQuery,
  useLazyGetAllSymbolsStatsQuery,
  useGetSymbolStatsQuery,
  useGetSymbolsStatsQuery,
  useLazyGetSymbolStatsQuery,
  useLazyGetSymbolsStatsQuery,
} = symbolStatsApi
