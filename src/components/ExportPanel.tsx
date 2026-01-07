import { useRef, useState } from 'react'
import { useNPCConfigValue } from '../hooks/useNPCConfig'
import { useNPCStore } from '../stores/npcStore'
import { downloadNPCScript, downloadNPCConfig, loadNPCConfigFromFile } from '../utils/exportUtils'
import { Button } from './ui/Button'

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
      <Button
        variant="primary"
        size="sm"
        onClick={() => setShowMenu(!showMenu)}
      >
        Export
        <svg
          className="w-4 h-4 ml-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Button>

      {/* Dropdown menu */}
      {showMenu && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowMenu(false)}
          />

          {/* Menu */}
          <div className="absolute right-0 mt-2 w-48 bg-gothic-darker border border-gothic-stone rounded-md shadow-lg z-20">
            <div className="py-1">
              <button
                onClick={handleDownloadScript}
                className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gothic-stone/30"
              >
                Download Script (.d)
              </button>
              <button
                onClick={handleDownloadConfig}
                className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gothic-stone/30"
              >
                Save Config (.json)
              </button>

              <div className="border-t border-gothic-stone my-1" />

              <label className="block w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gothic-stone/30 cursor-pointer">
                Load Config...
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  onChange={handleLoadConfig}
                  className="hidden"
                />
              </label>

              <div className="border-t border-gothic-stone my-1" />

              <button
                onClick={handleReset}
                className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-gothic-stone/30"
              >
                Reset to Defaults
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
