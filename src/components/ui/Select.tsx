import { forwardRef, type SelectHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

/**
 * Option type for Select component
 */
export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

/**
 * Select component props
 */
export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  options: SelectOption[]
  label?: string
  placeholder?: string
}

/**
 * Dropdown select component with Gothic-themed styling
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, label, placeholder, id, ...props }, ref) => {
    const selectId = id || `select-${Math.random().toString(36).slice(2)}`

    return (
      <div className="space-y-1">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs font-medium text-gray-400 uppercase tracking-wide"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={cn(
            'w-full h-9 px-3 rounded-md text-sm',
            'bg-gothic-dark border border-gothic-stone',
            'text-white',
            'focus:outline-none focus:ring-2 focus:ring-gothic-gold focus:border-transparent',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'cursor-pointer',
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    )
  }
)

Select.displayName = 'Select'
