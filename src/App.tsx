import { Suspense } from 'react'
import { Sidebar } from './components/layout/Sidebar'
import { MainPanel } from './components/layout/MainPanel'
import { BottomPanel } from './components/layout/BottomPanel'
import { ExportPanel } from './components/ExportPanel'
import { GameSelector } from './components/selectors'
import { ThumbnailRenderer } from './components/preview/ThumbnailRenderer'
import { Flame, Sword } from 'lucide-react'

/**
 * Loading fallback for preview panel
 */
function LoadingPreview() {
  return (
    <div className="w-96 bg-obsidian/50 flex items-center justify-center border-l border-stone/40">
      <div className="text-center space-y-3">
        <div className="w-8 h-8 border-2 border-ember/30 border-t-ember rounded-full animate-spin mx-auto" />
        <p className="text-text-dim font-display text-xs">Loading preview...</p>
      </div>
    </div>
  )
}

/**
 * Loading fallback for settings panel
 */
function LoadingSettings() {
  return (
    <div className="flex-1 bg-obsidian/50 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-2 border-ember/30 border-t-ember rounded-full animate-spin mx-auto" />
        <p className="text-text-dim font-display text-sm">Loading settings...</p>
      </div>
    </div>
  )
}

/**
 * Gothic NPC Creator - Main Application
 * A dark medieval fantasy NPC creation tool
 */
function App() {
  return (
    <div className="h-screen w-screen flex flex-col bg-void overflow-hidden">
      {/* Atmospheric background layer */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Subtle radial gradient from center */}
        <div className="absolute inset-0 bg-gradient-radial from-stone/20 via-transparent to-transparent opacity-50" />
        {/* Vignette effect */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-void/80" />
        {/* Stone texture overlay */}
        <div className="absolute inset-0 stone-texture" />
      </div>

      {/* Header - Ornate Gothic style */}
      <header className="relative z-10 h-16 bg-obsidian/95 border-b border-stone/50 backdrop-blur-sm">
        {/* Iron trim decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-iron-horizontal" />

        <div className="h-full flex items-center justify-between px-6">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            {/* Decorative icon */}
            <div className="relative">
              <Sword className="w-6 h-6 text-ember animate-flicker" />
              <div className="absolute inset-0 blur-md bg-ember/30 animate-ember-pulse" />
            </div>

            <div className="flex flex-col">
              <h1 className="text-xl font-display font-semibold text-text tracking-wide">
                <span className="text-ember">Gothic</span> NPC Creator
              </h1>
              <p className="text-[10px] text-text-muted font-body uppercase tracking-[0.2em]">
                Forge your characters
              </p>
            </div>
          </div>

          {/* Center - Game Version Selector */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3">
            <Flame className="w-4 h-4 text-ember/60" />
            <GameSelector />
            <Flame className="w-4 h-4 text-ember/60" />
          </div>

          {/* Right - Export Actions */}
          <div className="flex items-center gap-4">
            <ExportPanel />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex overflow-hidden">
        {/* Left Sidebar - Preview Settings */}
        <Sidebar />

        {/* Center - NPC Configuration */}
        <Suspense fallback={<LoadingSettings />}>
          <BottomPanel />
        </Suspense>

        {/* Right Sidebar - 3D Preview & Script */}
        <Suspense fallback={<LoadingPreview />}>
          <MainPanel />
        </Suspense>
      </div>

      {/* Hidden thumbnail renderer for generating preview images */}
      <ThumbnailRenderer />
    </div>
  )
}

export default App
