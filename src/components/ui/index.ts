/**
 * UI component exports
 */

// New Radix-based components
export * from './accordion'
export * from './tabs'
export * from './slider-new'
export * from './select-new'
export * from './input-new'
export * from './toggle-group'
export * from './scroll-area'
export * from './separator'

// Legacy components (for gradual migration)
export { Button, type ButtonProps } from './Button'
export { Select as SelectLegacy, type SelectProps as SelectLegacyProps, type SelectOption } from './Select'
export { Slider as SliderLegacy, type SliderProps as SliderLegacyProps } from './Slider'
export { Input as InputLegacy, type InputProps as InputLegacyProps } from './Input'
export { Card, CardHeader, CardTitle, CardContent, type CardProps } from './Card'
