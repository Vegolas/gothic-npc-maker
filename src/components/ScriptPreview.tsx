import { useMemo } from 'react'
import { useNPCConfigValue } from '../hooks/useNPCConfig'
import { generateDaedalusScript } from '../utils/daedalusGenerator'

/**
 * Script preview component
 * Displays generated Daedalus script in a scrollable parchment-style view
 */
export function ScriptPreview() {
  const config = useNPCConfigValue()

  // Generate script whenever config changes
  const script = useMemo(() => {
    return generateDaedalusScript(config)
  }, [config])

  return (
    <div className="h-full relative overflow-hidden">
      {/* Parchment background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#e8dcc4] via-[#e0d4b8] to-[#d8ccac] opacity-95" />
      <div className="absolute inset-0 stone-texture opacity-30" />

      {/* Aged edges effect */}
      <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(92,64,51,0.3)]" />

      {/* Script content - scrollable */}
      <div className="relative h-full overflow-y-auto p-4">
        <pre className="font-mono text-xs text-[#2d2418] whitespace-pre-wrap leading-relaxed select-all">
          {script}
        </pre>
      </div>
    </div>
  )
}
