import { FC } from 'react'
import { useGetSymbolInfoQuery } from './api/exchangeInfoApi'
import './App.css'

const App: FC = () => {
  const { data } = useGetSymbolInfoQuery('BTCUSDT')
  return <div className="text-sm">{JSON.stringify(data)}</div>
}

export default App
