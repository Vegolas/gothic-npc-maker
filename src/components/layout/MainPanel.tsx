import { NPCPreview3D } from '../preview/NPCPreview3D'
import { ScriptPreview } from '../ScriptPreview'
import { Eye, Code, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

/**
 * Right sidebar containing 3D preview and script preview.
 * Both sections are independently collapsible.
 */
export function MainPanel() {
  const [isPreviewCollapsed, setIsPreviewCollapsed] = useState(false)
  const [isScriptCollapsed, setIsScriptCollapsed] = useState(false)

  return (
    <aside className="w-[420px] bg-obsidian/90 border-l border-stone/40 flex flex-col">
      {/* 3D Preview Section */}
      <div className={`flex flex-col border-b border-stone/40 transition-all duration-300 ${
        isPreviewCollapsed ? 'shrink-0' : 'flex-1 min-h-0'
      }`}>
        {/* Header with collapse button */}
        <button
          onClick={() => setIsPreviewCollapsed(!isPreviewCollapsed)}
          className={`px-5 py-3 border-b border-stone/30 flex items-center justify-between
            hover:bg-stone/20 transition-colors duration-150 group shrink-0
            ${isPreviewCollapsed ? 'bg-stone/10' : ''}`}
        >
          <div className="flex items-center gap-2">
            <Eye className={`w-4 h-4 transition-colors ${isPreviewCollapsed ? 'text-ember' : 'text-ember/70 group-hover:text-ember'}`} />
            <h3 className="text-sm font-display font-medium text-ember uppercase tracking-wider">
              3D Preview
            </h3>
          </div>
          {isPreviewCollapsed ? (
            <ChevronDown className="w-4 h-4 text-ember group-hover:text-ember transition-colors" />
          ) : (
            <ChevronUp className="w-4 h-4 text-text-muted group-hover:text-ember transition-colors" />
          )}
        </button>

        {/* Preview content */}
        {!isPreviewCollapsed && (
          <div className="flex-1 relative bg-obsidian/30 overflow-hidden">
            {/* Subtle background effect */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-4 rounded-lg bg-gradient-radial from-ember/5 via-transparent to-transparent" />
            </div>

            {/* 3D Preview */}
            <NPCPreview3D />

            {/* Corner decorations */}
            <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-stone/30 rounded-tr-sm" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-stone/30 rounded-bl-sm" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-stone/30 rounded-br-sm" />
          </div>
        )}
      </div>

      {/* Script Preview Section */}
      <div className={`flex flex-col transition-all duration-300 ${
        isScriptCollapsed ? 'shrink-0' : 'flex-1 min-h-0'
      }`}>
        {/* Header with collapse button */}
        <button
          onClick={() => setIsScriptCollapsed(!isScriptCollapsed)}
          className={`px-5 py-3 border-t border-b border-stone/30 flex items-center justify-between
            hover:bg-stone/20 transition-colors duration-150 group shrink-0
            ${isScriptCollapsed ? 'bg-stone/10' : ''}`}
        >
          <div className="flex items-center gap-2">
            <Code className={`w-4 h-4 transition-colors ${isScriptCollapsed ? 'text-ember' : 'text-ember/70 group-hover:text-ember'}`} />
            <h3 className="text-sm font-display font-medium text-ember uppercase tracking-wider">
              Daedalus Script
            </h3>
          </div>
          {isScriptCollapsed ? (
            <ChevronDown className="w-4 h-4 text-ember group-hover:text-ember transition-colors" />
          ) : (
            <ChevronUp className="w-4 h-4 text-text-muted group-hover:text-ember transition-colors" />
          )}
        </button>

        {/* Script content */}
        {!isScriptCollapsed && (
          <div className="flex-1 flex flex-col min-h-0">
            <ScriptPreview />
          </div>
        )}
      </div>

      {/* Footer decoration */}
      <div className="h-1 bg-iron-horizontal opacity-50" />
    </aside>
  )
}
