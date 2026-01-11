import { VisualEditor, IdentityEditor, RoutineEditor } from '../editors'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs'
import { Palette, User, Clock } from 'lucide-react'

/**
 * Main configuration panel containing visual, identity, and routine tabs.
 * Now positioned as the primary content area.
 */
export function BottomPanel() {
  return (
    <div className="flex-1 bg-obsidian/95 flex flex-col overflow-hidden">
      <Tabs defaultValue="visual" className="flex-1 flex flex-col">
        <div className="px-4 pt-3 pb-2 border-b border-stone/20">
          <TabsList>
            <TabsTrigger value="visual" className="gap-2">
              <Palette className="w-3.5 h-3.5" />
              Visual
            </TabsTrigger>
            <TabsTrigger value="identity" className="gap-2">
              <User className="w-3.5 h-3.5" />
              Identity
            </TabsTrigger>
            <TabsTrigger value="routine" className="gap-2">
              <Clock className="w-3.5 h-3.5" />
              Routine
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-hidden relative">
          <TabsContent value="visual" className="absolute inset-0 m-0 overflow-y-auto">
            <div className="p-5">
              <VisualEditor />
            </div>
          </TabsContent>

          <TabsContent value="identity" className="absolute inset-0 m-0 overflow-y-auto">
            <div className="p-5">
              <IdentityEditor />
            </div>
          </TabsContent>

          <TabsContent value="routine" className="absolute inset-0 m-0 overflow-y-auto">
            <div className="p-5">
              <RoutineEditor />
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
