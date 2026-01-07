import { IdentityEditor, AttributeEditor, CombatEditor } from '../editors'
import { ScriptPreview } from '../ScriptPreview'

/**
 * Bottom panel containing identity editor, attributes, and script preview.
 * Three-column layout: Identity | Attributes | Script Preview
 */
export function BottomPanel() {
  return (
    <footer className="h-64 bg-gothic-darker border-t border-gothic-stone flex">
      {/* Identity section */}
      <div className="w-1/3 p-4 border-r border-gothic-stone overflow-y-auto">
        <h3 className="text-sm font-semibold text-gothic-gold uppercase tracking-wider mb-3">
          Identity
        </h3>
        <IdentityEditor />
      </div>

      {/* Attributes section */}
      <div className="w-1/3 p-4 border-r border-gothic-stone overflow-y-auto">
        <h3 className="text-sm font-semibold text-gothic-gold uppercase tracking-wider mb-3">
          Attributes
        </h3>
        <AttributeEditor />
        <div className="mt-4 pt-4 border-t border-gothic-stone/50">
          <CombatEditor />
        </div>
      </div>

      {/* Script preview section */}
      <div className="w-1/3 p-4 overflow-hidden flex flex-col">
        <h3 className="text-sm font-semibold text-gothic-gold uppercase tracking-wider mb-3">
          Script Preview
        </h3>
        <ScriptPreview />
      </div>
    </footer>
  )
}
