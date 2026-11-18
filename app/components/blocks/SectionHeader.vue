<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

export type HighlightStyle = 'gradient' | 'primary' | 'accent' | 'underline'

export interface SectionHeaderProps {
  /** Etiqueta pequeña sobre el título (ej. "OPINIONES & RESEÑAS") */
  eyebrow?: string
  title?: string
  /** Fragmento del título a resaltar: title="Elige el paquete ideal" highlight="ideal" */
  highlight?: string
  highlightStyle?: HighlightStyle
  lead?: string
  align?: 'center' | 'left'
  as?: 'h1' | 'h2' | 'h3'
  size?: 'sm' | 'md' | 'lg'
  class?: string
}

const props = withDefaults(defineProps<SectionHeaderProps>(), {
  highlightStyle: 'gradient',
  align: 'center',
  as: 'h2',
  size: 'md',
})

// Divide el título en [antes, resaltado, después] (sin distinguir mayúsculas)
const parts = computed(() => {
  const t = props.title ?? ''
  const h = props.highlight?.trim()
  if (!h) return { before: t, mark: '', after: '' }
  const i = t.toLowerCase().indexOf(h.toLowerCase())
  if (i < 0) return { before: t, mark: '', after: '' }
  return { before: t.slice(0, i), mark: t.slice(i, i + h.length), after: t.slice(i + h.length) }
})

const highlightClass: Record<HighlightStyle, string> = {
  gradient: 'bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent',
  primary: 'text-primary',
  accent: 'text-accent',
  underline: 'underline decoration-accent decoration-4 underline-offset-[6px]',
}

const titleSize = {
  sm: 'text-2xl sm:text-3xl',
  md: 'text-3xl sm:text-4xl',
  lg: 'text-4xl sm:text-5xl lg:text-6xl',
}
const leadSize = { sm: 'text-sm sm:text-base', md: 'text-base sm:text-lg', lg: 'text-lg sm:text-xl' }

const rootClass = computed(() =>
  cn(
    'space-y-3',
    props.align === 'center' ? 'text-center mx-auto max-w-3xl' : 'text-left max-w-3xl',
    props.class
  )
)
</script>

<template>
  <header :class="rootClass">
    <p
      v-if="eyebrow || $slots.eyebrow"
      class="text-xs font-bold uppercase tracking-[0.18em] text-primary"
    >
      <slot name="eyebrow">{{ eyebrow }}</slot>
    </p>

    <component
      :is="as"
      v-if="title || $slots.title"
      :class="['font-display font-extrabold tracking-tight text-foreground leading-[1.1] text-balance', titleSize[size]]"
    >
      <slot name="title">
        {{ parts.before }}<span v-if="parts.mark" :class="highlightClass[highlightStyle]">{{ parts.mark }}</span>{{ parts.after }}
      </slot>
    </component>

    <p
      v-if="lead"
      :class="[
        'text-muted-foreground leading-relaxed text-pretty',
        leadSize[size],
        align === 'center' && 'mx-auto max-w-2xl',
      ]"
    >
      {{ lead }}
    </p>

    <!-- Botones, filtros o cualquier extra bajo el encabezado -->
    <div
      v-if="$slots.default"
      :class="['pt-3 flex flex-wrap gap-3', align === 'center' ? 'justify-center' : 'justify-start']"
    >
      <slot />
    </div>
  </header>
</template>
