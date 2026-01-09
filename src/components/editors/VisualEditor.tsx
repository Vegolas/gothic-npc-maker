import {
  GenderSelector,
  BodySelector,
  HeadSelector,
  ArmorSelector,
  BodyTextureSelector,
  FatnessSlider,
} from '../selectors'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'
import { useNPCStore } from '../../stores/npcStore'

/**
 * Section header with icon
 */
function SectionHeader({
  icon,
  title,
  badge
}: {
  icon: React.ReactNode
  title: string
  badge?: string
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-ember/80">{icon}</span>
      <span>{title}</span>
      {badge && (
        <span className="ml-auto mr-2 text-[10px] px-1.5 py-0.5 rounded bg-ember/20 text-ember font-mono">
          {badge}
        </span>
      )}
    </div>
  )
}

/**
 * Help icon with tooltip
 */
function HelpTip({ content }: { content: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-stone/30 text-text-muted hover:bg-stone/50 hover:text-text-dim transition-colors"
        >
          <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
        </button>
      </TooltipTrigger>
      <TooltipContent side="right" className="max-w-[200px]">
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  )
}

/**
 * Icons for section headers
 */
const Icons = {
  character: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  ),
  armor: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  texture: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
    </svg>
  ),
}

/**
 * Visual editor component
 * Configures NPC appearance: body, head, armor, textures, and body modifiers
 */
export function VisualEditor() {
  const gender = useNPCStore((state) => state.config.gender)
  const armorInstance = useNPCStore((state) => state.config.armorInstance)

  return (
    <TooltipProvider delayDuration={300}>
      <div className="space-y-1">
        <Accordion
          type="multiple"
          defaultValue={['character', 'equipment', 'appearance']}
          className="space-y-1"
        >
          {/* Character Section */}
          <AccordionItem value="character" className="border-none rounded-lg bg-obsidian-dark/30 overflow-hidden">
            <AccordionTrigger className="px-3 py-2.5 hover:bg-obsidian-dark/50 transition-colors">
              <SectionHeader
                icon={Icons.character}
                title="Character"
                badge={gender === 'male' ? 'M' : 'F'}
              />
            </AccordionTrigger>
            <AccordionContent className="px-3 pb-3">
              <div className="space-y-4">
                <GenderSelector />
                <BodySelector />
                <HeadSelector />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Equipment Section */}
          <AccordionItem value="equipment" className="border-none rounded-lg bg-obsidian-dark/30 overflow-hidden">
            <AccordionTrigger className="px-3 py-2.5 hover:bg-obsidian-dark/50 transition-colors">
              <SectionHeader
                icon={Icons.armor}
                title="Equipment"
                badge={armorInstance ? '1' : '0'}
              />
            </AccordionTrigger>
            <AccordionContent className="px-3 pb-3">
              <ArmorSelector />
            </AccordionContent>
          </AccordionItem>

          {/* Appearance Section */}
          <AccordionItem value="appearance" className="border-none rounded-lg bg-obsidian-dark/30 overflow-hidden">
            <AccordionTrigger className="px-3 py-2.5 hover:bg-obsidian-dark/50 transition-colors">
              <SectionHeader
                icon={Icons.texture}
                title="Appearance"
              />
            </AccordionTrigger>
            <AccordionContent className="px-3 pb-3">
              <div className="space-y-5">
                {/* Skin & Textures */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-medium text-text-muted uppercase tracking-wide">
                      Skin & Textures
                    </span>
                    <HelpTip content="Adjust skin color and texture variants. Skin color affects both body and head." />
                  </div>
                  <div className="pl-2 border-l-2 border-ember/20">
                    <BodyTextureSelector />
                  </div>
                </div>

                {/* Body Shape */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-medium text-text-muted uppercase tracking-wide">
                      Body Shape
                    </span>
                    <HelpTip content="Adjust the body proportions. Values below 1.0 make the NPC thinner, above 1.0 makes them wider." />
                  </div>
                  <div className="pl-2 border-l-2 border-ember/20">
                    <FatnessSlider />
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Quick Stats Footer */}
        <div className="mt-4 pt-3 border-t border-stone/30">
          <div className="flex items-center justify-between text-[10px] text-text-muted">
            <span>Visual Configuration</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Ready
              </span>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
