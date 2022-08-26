import { FC } from 'react'
import SymbolsSettings from './components/SymbolsSettings'
import ConfigsSettings from './components/ConfigsSettings'

const App: FC = () => {
  return (
    <div className="flex justify-center gap-4 text-sm">
      <SymbolsSettings />
      <ConfigsSettings />
    </div>
  )
}

export default App
