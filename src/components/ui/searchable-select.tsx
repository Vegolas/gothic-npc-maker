import { useState, useMemo } from 'react'
import { Check, ChevronDown, Search } from 'lucide-react'
import { cn } from '../../lib/utils'
import * as Popover from '@radix-ui/react-popover'
import { InputNew } from './input-new'

interface SearchableSelectProps {
  label?: string
  value: string
  onValueChange: (value: string) => void
  options: string[]
  placeholder?: string
  customOption?: {
    value: string
    label: string
  }
}

/**
 * Searchable select component
 * Dropdown with search filtering for long lists
 */
export function SearchableSelect({
  label,
  value,
  onValueChange,
  options,
  placeholder = 'Select...',
  customOption
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const filteredOptions = useMemo(() => {
    if (!search) return options
    const searchLower = search.toLowerCase()
    return options.filter(opt => opt.toLowerCase().includes(searchLower))
  }, [options, search])

  const handleSelect = (selectedValue: string) => {
    if (selectedValue !== customOption?.value) {
      onValueChange(selectedValue)
      setOpen(false)
      setSearch('')
    }
  }

  return (
    <div className="space-y-1.5">
      {label && (
        <label className="text-xs font-display text-text-dim uppercase tracking-wider">
          {label}
        </label>
      )}

      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <button
            className={cn(
              'flex h-10 w-full items-center justify-between gap-2 rounded-md px-3 py-2',
              'bg-obsidian/80 border border-stone/60',
              'text-sm text-text placeholder:text-text-muted',
              'hover:border-stone hover:bg-obsidian',
              'focus:outline-none focus:ring-2 focus:ring-ember/40 focus:border-ember/50',
              'transition-all duration-150'
            )}
          >
            <span className="truncate">{value || placeholder}</span>
            <ChevronDown className="h-4 w-4 text-text-muted shrink-0" />
          </button>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            className={cn(
              'w-[var(--radix-popover-trigger-width)] max-h-[300px]',
              'bg-stone border border-stone/60 rounded-md shadow-deep',
              'overflow-hidden z-50',
              'data-[state=open]:animate-in data-[state=closed]:animate-out',
              'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
              'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95'
            )}
            sideOffset={4}
          >
            {/* Search input */}
            <div className="p-2 border-b border-stone/30">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-muted" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search actions..."
                  className={cn(
                    'h-8 w-full pl-8 pr-2 rounded-md',
                    'bg-obsidian/80 border border-stone/60',
                    'text-sm text-text placeholder:text-text-muted',
                    'focus:outline-none focus:ring-1 focus:ring-ember/40',
                    'transition-all duration-150'
                  )}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>

            {/* Options list */}
            <div className="max-h-[240px] overflow-y-auto p-1">
              {/* Custom option */}
              {customOption && (
                <button
                  onClick={() => handleSelect(customOption.value)}
                  className={cn(
                    'relative flex w-full items-center gap-2 rounded-sm px-3 py-2',
                    'text-sm text-ember hover:bg-stone/60',
                    'transition-colors duration-150 cursor-pointer'
                  )}
                >
                  {customOption.label}
                </button>
              )}

              {/* Filtered options */}
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSelect(option)}
                    className={cn(
                      'relative flex w-full items-center gap-2 rounded-sm px-3 py-2',
                      'text-sm text-text hover:bg-stone/60',
                      'transition-colors duration-150 cursor-pointer',
                      value === option && 'bg-stone/40'
                    )}
                  >
                    <Check
                      className={cn(
                        'h-4 w-4 shrink-0',
                        value === option ? 'opacity-100 text-ember' : 'opacity-0'
                      )}
                    />
                    <span className="truncate">{option}</span>
                  </button>
                ))
              ) : (
                <div className="py-6 text-center text-sm text-text-muted">
                  No actions found
                </div>
              )}
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  )
}
