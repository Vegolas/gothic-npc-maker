import * as React from 'react'
import { cn } from '../../lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const InputNew = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, id, ...props }, ref) => {
    const inputId = id || `input-${React.useId()}`

    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-display text-text-dim uppercase tracking-wider"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          id={inputId}
          className={cn(
            'flex h-10 w-full rounded-md px-3 py-2',
            'bg-obsidian/80 border border-stone/60',
            'text-sm text-text font-body placeholder:text-text-muted',
            'hover:border-stone hover:bg-obsidian',
            'focus:outline-none focus:ring-2 focus:ring-ember/40 focus:border-ember/50',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'transition-all duration-150',
            // Number input specifics
            type === 'number' && 'font-mono tabular-nums',
            '[&::-webkit-inner-spin-button]:appearance-none',
            '[&::-webkit-outer-spin-button]:appearance-none',
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
InputNew.displayName = 'InputNew'

export { InputNew }
