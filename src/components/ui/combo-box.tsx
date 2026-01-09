import { useState, useRef, useEffect } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '../../lib/utils'

interface ComboBoxProps {
  label?: string
  value: string
  onChange: (value: string) => void
  suggestions: string[]
  placeholder?: string
  className?: string
}

/**
 * Combo box component - editable input with dropdown suggestions
 * User can type freely or select from suggestions
 */
export function ComboBox({
  label,
  value,
  onChange,
  suggestions,
  placeholder = '',
  className
}: ComboBoxProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Update input when external value changes
  useEffect(() => {
    setInputValue(value)
  }, [value])

  // Filter suggestions based on input
  const filteredSuggestions = suggestions.filter(s => 
    s.toLowerCase().includes(inputValue.toLowerCase())
  ).slice(0, 10) // Limit to 10 results

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.toUpperCase()
    setInputValue(newValue)
    onChange(newValue)
    setIsOpen(true)
  }

  const handleSelectSuggestion = (suggestion: string) => {
    setInputValue(suggestion)
    onChange(suggestion)
    setIsOpen(false)
    inputRef.current?.focus()
  }

  const handleInputFocus = () => {
    setIsOpen(true)
  }

  return (
    <div className="space-y-1.5" ref={containerRef}>
      {label && (
        <label className="text-xs font-display text-text-dim uppercase tracking-wider">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          className={cn(
            'flex h-10 w-full rounded-md px-3 py-2 pr-8',
            'bg-obsidian/80 border border-stone/60',
            'text-sm text-text placeholder:text-text-muted',
            'hover:border-stone hover:bg-obsidian',
            'focus:outline-none focus:ring-2 focus:ring-ember/40 focus:border-ember/50',
            'transition-all duration-150',
            'font-mono',
            className
          )}
        />
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-text-muted hover:text-text transition-colors"
        >
          <ChevronDown className={cn(
            'h-4 w-4 transition-transform duration-200',
            isOpen && 'rotate-180'
          )} />
        </button>

        {/* Dropdown suggestions */}
        {isOpen && filteredSuggestions.length > 0 && (
          <div className={cn(
            'absolute z-50 w-full mt-1 max-h-[240px] overflow-y-auto',
            'bg-stone border border-stone/60 rounded-md shadow-deep',
            'animate-in fade-in-0 zoom-in-95'
          )}>
            {filteredSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => handleSelectSuggestion(suggestion)}
                className={cn(
                  'relative flex w-full items-center gap-2 px-3 py-2',
                  'text-sm text-text hover:bg-stone/60',
                  'transition-colors duration-150 cursor-pointer',
                  'font-mono',
                  value === suggestion && 'bg-stone/40'
                )}
              >
                <Check
                  className={cn(
                    'h-4 w-4 shrink-0',
                    value === suggestion ? 'opacity-100 text-ember' : 'opacity-0'
                  )}
                />
                <span className="truncate">{suggestion}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
