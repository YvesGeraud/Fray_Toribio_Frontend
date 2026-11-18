<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { useLink, type LinkTo } from '@/composables/useLink'

export type ButtonVariant = 'default' | 'secondary' | 'outline' | 'ghost' | 'accent' | 'destructive'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon'

export interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  class?: string
  type?: 'button' | 'submit' | 'reset'
  /** Ruta interna. Renderiza NuxtLink (Nuxt) o RouterLink (vue-router); si no hay router, cae a <a href>. */
  to?: LinkTo
  /** URL externa o ancla (#seccion). Renderiza un <a>. Pasa target/rel como atributos normales. */
  href?: string
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'default',
  size: 'md',
  disabled: false,
  type: 'button',
})

const variantClasses: Record<ButtonVariant, string> = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm shadow-primary/25 focus-visible:ring-primary',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:ring-secondary',
  outline: 'border border-border bg-transparent hover:bg-muted text-foreground focus-visible:ring-primary',
  ghost: 'hover:bg-muted text-foreground focus-visible:ring-primary',
  accent: 'bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm font-semibold focus-visible:ring-accent',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs rounded-md',
  md: 'h-10 px-4 text-sm rounded-lg',
  lg: 'h-12 px-6 text-base rounded-lg',
  icon: 'h-10 w-10 p-0 rounded-lg',
}

const { tag, attrs: linkAttrs, isLink } = useLink(
  () => ({ to: props.to, href: props.href, disabled: props.disabled }),
  'button'
)

const elementAttrs = computed(() =>
  isLink.value ? linkAttrs.value : { type: props.type, disabled: props.disabled }
)

const computedClass = computed(() => {
  return cn(
    'inline-flex items-center justify-center font-medium transition-all duration-150 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 select-none gap-2 cursor-pointer no-underline',
    variantClasses[props.variant],
    sizeClasses[props.size],
    props.class
  )
})
</script>

<template>
  <component :is="tag" v-bind="elementAttrs" :class="computedClass">
    <slot />
  </component>
</template>
