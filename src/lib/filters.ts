import { FilterSettings } from '@/store/usePhotoboothStore'

export const FILTER_PRESETS = [
  { name: 'Normal', value: 'none' },
  { name: 'Grayscale', value: 'grayscale(100%)' },
  { name: 'Sepia', value: 'sepia(100%)' },
  { name: 'Vintage', value: 'sepia(50%) contrast(120%) brightness(90%)' },
  { name: 'Cool', value: 'hue-rotate(180deg) contrast(110%)' },
  { name: 'Warm', value: 'sepia(30%) hue-rotate(-10deg) saturate(140%)' },
]

export function getFilterString(settings: FilterSettings): string {
  const { filter, brightness, contrast, saturation, hue } = settings
  
  const baseFilter = filter === 'none' ? '' : filter
  const adjustments = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) hue-rotate(${hue}deg)`
  
  return `${baseFilter} ${adjustments}`.trim()
}
