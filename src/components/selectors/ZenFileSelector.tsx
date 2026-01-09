import { useEffect, useState } from 'react'
import { useNPCStore } from '../../stores/npcStore'
import type { ZenWorldFile } from '../../types/npc'
import { listZenFiles, parseWaypointsFromZen } from '../../utils/zenParser'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select-new'
import { AlertCircle, CheckCircle2, FileText, Loader2 } from 'lucide-react'

/**
 * ZEN world file selector component
 * Allows users to select a .zen file from the worlds directory
 */
export function ZenFileSelector() {
  const gameVersion = useNPCStore((state) => state.config.gameVersion)
  const zenWorldFile = useNPCStore((state) => state.config.zenWorldFile)
  const setZenWorldFile = useNPCStore((state) => state.setZenWorldFile)
  
  const [availableFiles, setAvailableFiles] = useState<ZenWorldFile[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState<{ fileName: string; percent: number } | null>(null)
  const [selectedFileInfo, setSelectedFileInfo] = useState<ZenWorldFile | null>(null)
  const [waypoints, setWaypoints] = useState<string[]>([])
  const [loadingWaypoints, setLoadingWaypoints] = useState(false)

  // Load available ZEN files when game version changes
  useEffect(() => {
    setLoading(true)
    setLoadingProgress(null)
    
    listZenFiles(gameVersion, (fileName, loaded, total) => {
      const percent = Math.round((loaded / total) * 100)
      setLoadingProgress({ fileName, percent })
    }).then((files) => {
      setAvailableFiles(files)
      setLoading(false)
      setLoadingProgress(null)
      
      // If current selection is not in the new list, clear it
      if (zenWorldFile && !files.find(f => f.path === zenWorldFile)) {
        setZenWorldFile(null)
        setSelectedFileInfo(null)
        setWaypoints([])
      }
    })
  }, [gameVersion, zenWorldFile, setZenWorldFile])

  // Update selected file info when selection changes
  useEffect(() => {
    if (zenWorldFile) {
      const fileInfo = availableFiles.find(f => f.path === zenWorldFile)
      setSelectedFileInfo(fileInfo || null)
      
      // Load waypoints if file is valid
      if (fileInfo?.isValid) {
        setLoadingWaypoints(true)
        parseWaypointsFromZen(zenWorldFile).then((wps) => {
          setWaypoints(wps)
          setLoadingWaypoints(false)
        })
      } else {
        setWaypoints([])
      }
    } else {
      setSelectedFileInfo(null)
      setWaypoints([])
    }
  }, [zenWorldFile, availableFiles])

  const handleFileChange = (value: string) => {
    setZenWorldFile(value === '__none__' ? null : value)
  }

  const validFiles = availableFiles.filter(f => f.isValid)
  const invalidFiles = availableFiles.filter(f => !f.isValid)

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return ''
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
  }

  return (
    <div className="space-y-3">
      <div>
        <Select value={zenWorldFile || '__none__'} onValueChange={handleFileChange} disabled={loading}>
          <SelectTrigger label="World File (.zen)">
            <SelectValue placeholder={loading ? 'Loading...' : 'Select a world file'} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__none__">No world file selected</SelectItem>
            {validFiles.length > 0 && validFiles.map(file => (
              <SelectItem key={file.path} value={file.path}>
                {file.name} {file.fileSize ? `(${formatFileSize(file.fileSize)})` : ''}
              </SelectItem>
            ))}
            {invalidFiles.length > 0 && invalidFiles.map(file => (
              <SelectItem key={file.path} value={file.path} disabled>
                {file.name} (invalid)
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Loading progress indicator */}
      {loading && loadingProgress && (
        <div className="flex items-start gap-2 p-3 rounded-md border bg-stone/10 border-stone/30 text-xs">
          <Loader2 className="w-4 h-4 mt-0.5 flex-shrink-0 animate-spin text-ember" />
          <div className="flex-1">
            <div className="font-medium text-text-dim mb-2">
              Loading {loadingProgress.fileName}...
            </div>
            <div className="w-full bg-obsidian rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-ember transition-all duration-200"
                style={{ width: `${loadingProgress.percent}%` }}
              />
            </div>
            <div className="text-text-muted mt-1">
              {loadingProgress.percent}%
            </div>
          </div>
        </div>
      )}

      {/* File status indicator */}
      {selectedFileInfo && (
        <div className={`flex items-start gap-2 p-3 rounded-md border text-xs ${
          selectedFileInfo.isValid
            ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400'
            : 'bg-blood/5 border-blood/20 text-blood'
        }`}>
          {selectedFileInfo.isValid ? (
            <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          )}
          <div>
            <div className="font-medium mb-1">
              {selectedFileInfo.isValid ? 'Valid ZEN file' : 'Invalid ZEN file'}
            </div>
            {selectedFileInfo.errorMessage && (
              <div className="text-text-muted">
                {selectedFileInfo.errorMessage}
              </div>
            )}
            {selectedFileInfo.isValid && waypoints.length > 0 && (
              <div className="text-text-muted mt-1">
                Found {waypoints.length} waypoint{waypoints.length !== 1 ? 's' : ''}
                {selectedFileInfo.fileSize && ` • ${formatFileSize(selectedFileInfo.fileSize)}`}
              </div>
            )}
            {selectedFileInfo.isValid && loadingWaypoints && (
              <div className="flex items-center gap-2 text-text-muted mt-1">
                <Loader2 className="w-3 h-3 animate-spin" />
                Parsing waypoints...
              </div>
            )}
          </div>
        </div>
      )}

      {/* Help text */}
      {!zenWorldFile && (
        <div className="flex items-start gap-2 p-3 rounded-md bg-stone/10 border border-stone/20 text-xs text-text-muted">
          <FileText className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-medium text-text-dim mb-1">About ZEN files</div>
            Select a world file to reference waypoints for NPC routines. Only uncompiled (text-based) .ZEN files are supported.
            If you get an error, make sure your .ZEN file is not compiled.
          </div>
        </div>
      )}
    </div>
  )
}

// Export the waypoints for use in other components
export function useZenWaypoints(): string[] {
  const zenWorldFile = useNPCStore((state) => state.config.zenWorldFile)
  const [waypoints, setWaypoints] = useState<string[]>([])

  useEffect(() => {
    if (zenWorldFile) {
      parseWaypointsFromZen(zenWorldFile).then(setWaypoints)
    } else {
      setWaypoints([])
    }
  }, [zenWorldFile])

  return waypoints
}
