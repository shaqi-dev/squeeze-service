import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BinanceEndpoints } from './BinanceEndpoints'
import { RateLimit } from '../types/RateLimit'
import { Symbol } from '../types/Symbol'

export interface ExchangeInfoResponse {
  timezone: string
  serverTime: number
  rateLimits: RateLimit[]
  exchangeFilters: []
  symbols: Symbol[]
}

export const exchangeInfoApi = createApi({
  reducerPath: 'exchangeInfo',
  baseQuery: fetchBaseQuery({ baseUrl: BinanceEndpoints.EXCHANGE_INFO }),
  endpoints: (builder) => ({
    getExchangeInfo: builder.query<ExchangeInfoResponse, void>({
      query: () => ``,
    }),
    getSymbolInfo: builder.query<ExchangeInfoResponse, string>({
      query: (symbol) => `?symbol=${symbol}`,
    }),
    getSymbolsInfo: builder.query<ExchangeInfoResponse, string[]>({
      query: (symbols) => `?symbol=${encodeURIComponent(symbols.join(','))}`,
    }),
  }),
})

export const {
  useGetExchangeInfoQuery,
  useGetSymbolInfoQuery,
  useGetSymbolsInfoQuery,
  useLazyGetExchangeInfoQuery,
  useLazyGetSymbolInfoQuery,
  useLazyGetSymbolsInfoQuery,
} = exchangeInfoApi
