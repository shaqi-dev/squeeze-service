import { FC } from 'react'

interface SymbolItemProps {
  symbol: string
  volume: number | undefined
}

const SymbolItem: FC<SymbolItemProps> = ({ symbol, volume }) => {
  return (
    <div>
      {symbol}
      {volume && `: ${volume}`}
    </div>
  )
}

export default SymbolItem
