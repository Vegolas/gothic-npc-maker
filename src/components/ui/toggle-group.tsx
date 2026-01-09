import * as React from 'react'
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import { cn } from '../../lib/utils'

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & {
    label?: string
    variant?: 'default' | 'outline'
  }
>(({ className, label, variant = 'default', children, ...props }, ref) => (
  <div className="space-y-1.5">
    {label && (
      <label className="text-xs font-display text-text-dim uppercase tracking-wider">
        {label}
      </label>
    )}
    <ToggleGroupPrimitive.Root
      ref={ref}
      className={cn(
        'inline-flex rounded-lg p-1 gap-1',
        variant === 'default' && 'bg-obsidian/80 border border-stone/50',
        variant === 'outline' && 'bg-transparent',
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Root>
  </div>
))
ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> & {
    variant?: 'default' | 'ember'
  }
>(({ className, children, variant = 'default', ...props }, ref) => (
  <ToggleGroupPrimitive.Item
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center px-4 py-2 text-sm font-display rounded-md',
      'transition-all duration-200',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember/50',
      'disabled:pointer-events-none disabled:opacity-50',
      variant === 'default' && [
        'text-text-dim hover:text-text hover:bg-stone/30',
        'data-[state=on]:bg-stone/80 data-[state=on]:text-text data-[state=on]:shadow-sm',
      ],
      variant === 'ember' && [
        'text-text-dim hover:text-ember hover:bg-ember/10',
        'data-[state=on]:bg-ember/20 data-[state=on]:text-ember data-[state=on]:shadow-ember',
        'data-[state=on]:border data-[state=on]:border-ember/30',
      ],
      className
    )}
    {...props}
  >
    {children}
  </ToggleGroupPrimitive.Item>
))
ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupItem }
