enum RateLimitInterval {
  SECOND = 'SECOND',
  MINUTE = 'MINUTE',
  DAY = 'DAY',
}

enum RateLimitType {
  REQUEST_WEIGHT = 'REQUEST_WEIGHT',
  RAW_REQUESTS = 'RAW_REQUESTS',
  ORDERS = 'ORDERS',
}

export interface RateLimit {
  rateLimitType: RateLimitType
  interval: RateLimitInterval
  intervalNum: number
  limit: number
}
