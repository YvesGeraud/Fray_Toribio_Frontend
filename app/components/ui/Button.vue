<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'accent' | 'destructive'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  disabled?: boolean
  class?: string
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  disabled: false,
  type: 'button',
})

const variantClasses = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm shadow-primary/25 focus-visible:ring-primary',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:ring-secondary',
  outline: 'border border-border bg-transparent hover:bg-muted text-foreground focus-visible:ring-primary',
  ghost: 'hover:bg-muted text-foreground focus-visible:ring-primary',
  accent: 'bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm font-semibold focus-visible:ring-accent',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive',
}

const sizeClasses = {
  sm: 'h-8 px-3 text-xs rounded-md',
  md: 'h-10 px-4 text-sm rounded-lg',
  lg: 'h-12 px-6 text-base rounded-lg',
  icon: 'h-10 w-10 p-0 rounded-lg',
}

const computedClass = computed(() => {
  return cn(
    'inline-flex items-center justify-center font-medium transition-all duration-150 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none gap-2 cursor-pointer',
    variantClasses[props.variant],
    sizeClasses[props.size],
    props.class
  )
})
</script>

<template>
  <button :type="type" :disabled="disabled" :class="computedClass">
    <slot />
  </button>
</template>

