import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

/**
 * Slider component props
 */
export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  showValue?: boolean
  valueFormat?: (value: number) => string
}

/**
 * Range slider component with Gothic-themed styling
 */
export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ className, label, showValue = true, valueFormat, id, value, ...props }, ref) => {
    const sliderId = id || `slider-${Math.random().toString(36).slice(2)}`
    const displayValue = valueFormat
      ? valueFormat(Number(value))
      : String(value)

    return (
      <div className="space-y-1">
        {(label || showValue) && (
          <div className="flex justify-between items-center">
            {label && (
              <label
                htmlFor={sliderId}
                className="block text-xs font-medium text-gray-400 uppercase tracking-wide"
              >
                {label}
              </label>
            )}
            {showValue && (
              <span className="text-xs text-gothic-gold font-mono">
                {displayValue}
              </span>
            )}
          </div>
        )}
        <input
          ref={ref}
          id={sliderId}
          type="range"
          value={value}
          className={cn(
            'w-full h-2 rounded-full appearance-none cursor-pointer',
            'bg-gothic-stone',
            // Thumb styling (WebKit)
            '[&::-webkit-slider-thumb]:appearance-none',
            '[&::-webkit-slider-thumb]:w-4',
            '[&::-webkit-slider-thumb]:h-4',
            '[&::-webkit-slider-thumb]:rounded-full',
            '[&::-webkit-slider-thumb]:bg-gothic-gold',
            '[&::-webkit-slider-thumb]:cursor-pointer',
            '[&::-webkit-slider-thumb]:transition-transform',
            '[&::-webkit-slider-thumb]:hover:scale-110',
            // Thumb styling (Firefox)
            '[&::-moz-range-thumb]:w-4',
            '[&::-moz-range-thumb]:h-4',
            '[&::-moz-range-thumb]:rounded-full',
            '[&::-moz-range-thumb]:bg-gothic-gold',
            '[&::-moz-range-thumb]:border-none',
            '[&::-moz-range-thumb]:cursor-pointer',
            // Focus styles
            'focus:outline-none focus:ring-2 focus:ring-gothic-gold/50',
            className
          )}
          {...props}
        />
      </div>
    )
  }
)

Slider.displayName = 'Slider'
