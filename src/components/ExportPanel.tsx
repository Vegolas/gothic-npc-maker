import { useRef, useState } from 'react'
import { useNPCConfigValue } from '../hooks/useNPCConfig'
import { useNPCStore } from '../stores/npcStore'
import { downloadNPCScript, downloadNPCConfig, loadNPCConfigFromFile } from '../utils/exportUtils'
import { ChevronDown, Download, Upload, RotateCcw, FileCode, FileJson } from 'lucide-react'

/**
 * Export panel component
 * Provides export/import options for NPC configurations
 */
export function ExportPanel() {
  const config = useNPCConfigValue()
  const loadConfig = useNPCStore((state) => state.loadConfig)
  const resetConfig = useNPCStore((state) => state.resetConfig)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showMenu, setShowMenu] = useState(false)

  const handleDownloadScript = () => {
    downloadNPCScript(config)
    setShowMenu(false)
  }

  const handleDownloadConfig = () => {
    downloadNPCConfig(config)
    setShowMenu(false)
  }

  const handleLoadConfig = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const loadedConfig = await loadNPCConfigFromFile(file)
    if (loadedConfig) {
      loadConfig(loadedConfig)
    } else {
      alert('Failed to load configuration file')
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    setShowMenu(false)
  }

  const handleReset = () => {
    if (confirm('Reset all settings to defaults?')) {
      resetConfig()
    }
    setShowMenu(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-md
          bg-ember/20 border border-ember/30 text-ember
          font-display text-sm
          hover:bg-ember/30 hover:border-ember/50
          transition-all duration-200
          ${showMenu ? 'bg-ember/30 border-ember/50' : ''}
        `}
      >
        <Download className="w-4 h-4" />
        Export
        <ChevronDown className={`w-4 h-4 transition-transform ${showMenu ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown menu */}
      {showMenu && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowMenu(false)}
          />

          {/* Menu */}
          <div className="absolute right-0 mt-2 w-56 bg-obsidian border border-stone/50 rounded-lg shadow-deep z-20 overflow-hidden animate-fade-in">
            <div className="py-1">
              <button
                onClick={handleDownloadScript}
                className="w-full px-4 py-2.5 text-left text-sm text-text flex items-center gap-3 hover:bg-stone/30 hover:text-ember transition-colors"
              >
                <FileCode className="w-4 h-4 text-text-dim" />
                Download Script (.d)
              </button>
              <button
                onClick={handleDownloadConfig}
                className="w-full px-4 py-2.5 text-left text-sm text-text flex items-center gap-3 hover:bg-stone/30 hover:text-ember transition-colors"
              >
                <FileJson className="w-4 h-4 text-text-dim" />
                Save Config (.json)
              </button>

              <div className="h-px bg-stone/30 my-1" />

              <label className="flex items-center gap-3 w-full px-4 py-2.5 text-left text-sm text-text hover:bg-stone/30 hover:text-ember transition-colors cursor-pointer">
                <Upload className="w-4 h-4 text-text-dim" />
                Load Config...
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  onChange={handleLoadConfig}
                  className="hidden"
                />
              </label>

              <div className="h-px bg-stone/30 my-1" />

              <button
                onClick={handleReset}
                className="w-full px-4 py-2.5 text-left text-sm text-blood flex items-center gap-3 hover:bg-blood/10 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset to Defaults
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
