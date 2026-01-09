import * as React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import { cn } from '../../lib/utils'

interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  label?: string
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, label, ...props }, ref) => (
  <div className="flex items-center gap-2">
    <SwitchPrimitive.Root
      className={cn(
        'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full',
        'border border-stone/50 shadow-sm transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember/50',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'data-[state=checked]:bg-ember data-[state=checked]:border-ember',
        'data-[state=unchecked]:bg-obsidian-dark',
        className
      )}
      {...props}
      ref={ref}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          'pointer-events-none block h-4 w-4 rounded-full bg-text shadow-lg',
          'ring-0 transition-transform',
          'data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0.5'
        )}
      />
    </SwitchPrimitive.Root>
    {label && (
      <label className="text-xs text-text-dim cursor-pointer">
        {label}
      </label>
    )}
  </div>
))
Switch.displayName = SwitchPrimitive.Root.displayName

export { Switch }
