import { FC } from 'react'
import SymbolsSettings from './components/SymbolsSettings'
import ConfigsSettings from './components/ConfigsSettings'
import TimeframeSettings from './components/TimeframeSettings'

const App: FC = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4 text-sm">
      <SymbolsSettings />
      <ConfigsSettings />
      <TimeframeSettings />
    </div>
  )
}

export default App
