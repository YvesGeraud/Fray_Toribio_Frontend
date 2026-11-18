<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  variant?: 'default' | 'secondary' | 'outline' | 'accent' | 'success' | 'destructive'
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
})

const variantClasses = {
  default: 'bg-primary/10 text-primary border border-primary/20',
  secondary: 'bg-secondary text-secondary-foreground border border-border',
  outline: 'border border-border text-foreground',
  // En oscuro el texto usa el propio acento: accent-foreground (oscuro) no se leería sobre fondo negro
  accent: 'bg-accent/15 text-accent-foreground dark:text-accent border border-accent/30 font-semibold',
  success: 'bg-success/10 text-success border border-success/20',
  destructive: 'bg-destructive/10 text-destructive border border-destructive/20',
}

const computedClass = computed(() => {
  return cn(
    'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide transition-colors',
    variantClasses[props.variant],
    props.class
  )
})
</script>

<template>
  <span :class="computedClass">
    <slot />
  </span>
</template>

