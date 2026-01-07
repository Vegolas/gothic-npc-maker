import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

/**
 * Input component props
 */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

/**
 * Text input component with Gothic-themed styling
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, type = 'text', ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).slice(2)}`

    return (
      <div className="space-y-1">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-medium text-gray-400 uppercase tracking-wide"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={cn(
            'w-full h-9 px-3 rounded-md text-sm',
            'bg-gothic-dark border border-gothic-stone',
            'text-white placeholder:text-gray-500',
            'focus:outline-none focus:ring-2 focus:ring-gothic-gold focus:border-transparent',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            // Number input specific
            type === 'number' && 'font-mono',
            // Error state
            error && 'border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-500">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
