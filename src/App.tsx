import { FC } from 'react'
import { useGetSymbolsInfoQuery } from './api/exchangeInfoApi'
import './App.css'

const App: FC = () => {
  const { data } = useGetSymbolsInfoQuery(['BTCUSDT', 'ETHUSDT'])
  return <div className="text-sm">{JSON.stringify(data)}</div>
}

export default App
