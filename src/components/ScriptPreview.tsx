import { useMemo, useState } from 'react'
import { useNPCConfigValue } from '../hooks/useNPCConfig'
import { generateDaedalusScript } from '../utils/daedalusGenerator'
import { Button } from './ui/Button'

/**
 * Script preview component
 * Displays generated Daedalus script with copy functionality
 */
export function ScriptPreview() {
  const config = useNPCConfigValue()
  const [copied, setCopied] = useState(false)

  // Generate script whenever config changes
  const script = useMemo(() => {
    return generateDaedalusScript(config)
  }, [config])

  // Copy to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(script)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Script display */}
      <div className="flex-1 overflow-y-auto bg-gothic-dark rounded-md p-3 font-mono text-xs">
        <pre className="text-gray-300 whitespace-pre-wrap">
          {script}
        </pre>
      </div>

      {/* Copy button */}
      <div className="mt-2 flex justify-end">
        <Button
          size="sm"
          variant={copied ? 'secondary' : 'primary'}
          onClick={handleCopy}
        >
          {copied ? 'Copied!' : 'Copy to Clipboard'}
        </Button>
      </div>
    </div>
  )
}
