import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

/**
 * Button component variants
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

/**
 * Basic button component with Gothic-themed styling
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gothic-gold',
          'disabled:pointer-events-none disabled:opacity-50',
          // Variants
          {
            'bg-gothic-gold text-gothic-dark hover:bg-gothic-gold/90':
              variant === 'primary',
            'bg-gothic-stone text-white hover:bg-gothic-stone/80':
              variant === 'secondary',
            'hover:bg-gothic-stone/20 text-gray-300':
              variant === 'ghost',
          },
          // Sizes
          {
            'h-8 px-3 text-xs rounded': size === 'sm',
            'h-10 px-4 text-sm rounded-md': size === 'md',
            'h-12 px-6 text-base rounded-md': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
