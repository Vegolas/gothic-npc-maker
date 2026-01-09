import { HeadOffsetSlider, SceneSelector } from '../selectors'
import { ScrollArea } from '../ui/scroll-area'
import { Settings, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

/**
 * Left sidebar containing app-specific settings that don't affect the game.
 * Head offset controls for adjusting the 3D preview only.
 * Can be collapsed to save screen space.
 */
export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <aside 
      className={`relative bg-obsidian/90 border-r border-stone/40 flex flex-col backdrop-blur-sm transition-all duration-300 ${
        isCollapsed ? 'w-12' : 'w-80'
      }`}
    >
      {/* Collapse/Expand Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-4 -right-3 z-20 w-6 h-6 rounded-full bg-obsidian border border-stone/60 
          flex items-center justify-center text-text-muted hover:text-ember hover:border-ember/50
          transition-all duration-150 shadow-deep"
        title={isCollapsed ? 'Expand preview settings' : 'Collapse preview settings'}
      >
        {isCollapsed ? (
          <ChevronRight className="w-3.5 h-3.5" />
        ) : (
          <ChevronLeft className="w-3.5 h-3.5" />
        )}
      </button>

      {/* Collapsed State - Vertical Label */}
      {isCollapsed && (
        <div className="flex-1 flex items-center justify-center">
          <div className="transform -rotate-90 whitespace-nowrap">
            <div className="flex items-center gap-2">
              <Settings className="w-3.5 h-3.5 text-ember/70" />
              <span className="text-xs font-display font-medium text-ember uppercase tracking-[0.15em]">
                Preview
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Expanded State - Full Content */}
      {!isCollapsed && (
        <>
          {/* Header */}
          <div className="px-5 py-4 border-b border-stone/30">
            <div className="flex items-center gap-2 mb-1">
              <Settings className="w-4 h-4 text-ember/70" />
              <h2 className="text-sm font-display font-medium text-ember uppercase tracking-[0.15em]">
                Preview Settings
              </h2>
            </div>
            <p className="text-xs text-text-muted mt-1">
              Adjust 3D preview (not saved to script)
            </p>
          </div>

          {/* Scrollable Content */}
          <ScrollArea className="flex-1">
            <div className="p-5 space-y-5">
              {/* Scene Selection */}
              <div>
                <h3 className="text-xs font-display text-text-dim uppercase tracking-wider mb-2">
                  Scene
                </h3>
                <SceneSelector />
              </div>

              {/* Head Position */}
              <div>
                <h3 className="text-xs font-display text-text-dim uppercase tracking-wider mb-2">
                  Head Position
                </h3>
                <p className="text-xs text-text-muted mb-3">
                  Fine-tune head placement for preview only
                </p>
                <HeadOffsetSlider />
              </div>
            </div>
          </ScrollArea>

          {/* Footer decoration */}
          <div className="h-1 bg-iron-horizontal opacity-50" />
        </>
      )}
    </aside>
  )
}
