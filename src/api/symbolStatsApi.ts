import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BinanceEndpoints } from './BinanceEndpoints'
import {
  SymbolStatsType,
  SymbolStatsResponseFull,
  SymbolStatsResponseMini,
} from '../types/SymbolStats'

export const symbolStatsApi = createApi({
  reducerPath: 'tickerStats',
  baseQuery: fetchBaseQuery({ baseUrl: BinanceEndpoints.TICKER_STATS_24H }),
  endpoints: (builder) => ({
    getSymbolStatsMini: builder.query<SymbolStatsResponseMini, string>({
      query: (symbol) => `?symbol=${symbol}&type=${SymbolStatsType.MINI}`,
    }),
    getSymbolStatsFull: builder.query<SymbolStatsResponseFull, string>({
      query: (symbol) => `?symbol=${symbol}&type=${SymbolStatsType.FULL}`,
    }),
    getSymbolsStatsMini: builder.query<SymbolStatsResponseMini[], string[]>({
      query: (symbols) => `?symbols=${encodeURI(JSON.stringify(symbols))}`,
    }),
    getSymbolsStatsFull: builder.query<SymbolStatsResponseFull[], string[]>({
      query: (symbols) =>
        `?symbols=${encodeURI(JSON.stringify(symbols))}&type=${SymbolStatsType.FULL}`,
    }),
  }),
})

export const {
  useGetSymbolStatsFullQuery,
  useGetSymbolStatsMiniQuery,
  useGetSymbolsStatsFullQuery,
  useGetSymbolsStatsMiniQuery,
  useLazyGetSymbolStatsFullQuery,
  useLazyGetSymbolStatsMiniQuery,
  useLazyGetSymbolsStatsFullQuery,
  useLazyGetSymbolsStatsMiniQuery,
} = symbolStatsApi
