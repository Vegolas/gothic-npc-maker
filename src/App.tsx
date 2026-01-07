import { Sidebar } from './components/layout/Sidebar'
import { MainPanel } from './components/layout/MainPanel'
import { BottomPanel } from './components/layout/BottomPanel'
import { ExportPanel } from './components/ExportPanel'

/**
 * Main application component for Gothic NPC Creator.
 * Layout: Left sidebar (selectors) | Center (3D preview) | Bottom (script/attributes)
 */
function App() {
  return (
    <div className="h-screen w-screen flex flex-col bg-gothic-dark">
      {/* Header */}
      <header className="h-12 bg-gothic-darker border-b border-gothic-stone flex items-center justify-between px-4">
        <h1 className="text-lg font-bold text-gothic-gold">Gothic NPC Creator</h1>
        <ExportPanel />
      </header>

      {/* Main content area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left sidebar - Visual options */}
        <Sidebar />

        {/* Center - 3D Preview */}
        <MainPanel />
      </div>

      {/* Bottom panel - Identity, Attributes, Script */}
      <BottomPanel />
    </div>
  )
}

export default App
