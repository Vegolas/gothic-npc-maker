import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { cn } from '../../lib/utils'

interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  label?: string
  showValue?: boolean
  valueFormat?: (value: number) => string
}

const SliderNew = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, label, showValue = true, valueFormat, value, defaultValue, ...props }, ref) => {
  const currentValue = value?.[0] ?? defaultValue?.[0] ?? 0
  const displayValue = valueFormat ? valueFormat(currentValue) : String(currentValue)

  return (
    <div className="space-y-2">
      {(label || showValue) && (
        <div className="flex justify-between items-center">
          {label && (
            <label className="text-xs font-display text-text-dim uppercase tracking-wider">
              {label}
            </label>
          )}
          {showValue && (
            <span className="text-xs font-mono text-ember tabular-nums">
              {displayValue}
            </span>
          )}
        </div>
      )}
      <SliderPrimitive.Root
        ref={ref}
        value={value}
        defaultValue={defaultValue}
        className={cn(
          'relative flex w-full touch-none select-none items-center group',
          className
        )}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-stone/80 border border-stone">
          <SliderPrimitive.Range className="absolute h-full bg-gradient-to-r from-ember/60 to-ember" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className={cn(
            'block h-5 w-5 rounded-full border-2 border-ember bg-obsidian',
            'shadow-lg shadow-ember/20',
            'transition-all duration-150',
            'hover:scale-110 hover:shadow-ember',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember/50',
            'disabled:pointer-events-none disabled:opacity-50',
            'cursor-grab active:cursor-grabbing'
          )}
        />
      </SliderPrimitive.Root>
    </div>
  )
})
SliderNew.displayName = 'SliderNew'

export { SliderNew }
