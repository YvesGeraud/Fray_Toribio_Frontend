import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


/** Proporciones compartidas por los bloques con imagen (ConfigurableGrid, ContentSplitSection, ...) */
export type AspectRatio = 'square' | 'video' | 'portrait' | 'landscape'

export const aspectRatioClasses: Record<AspectRatio, string> = {
  square: 'aspect-square',
  video: 'aspect-[16/10]',
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
}
