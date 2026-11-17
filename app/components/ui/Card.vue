<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  variant?: 'default' | 'muted' | 'outline' | 'interactive'
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
})

const variantClasses = {
  default: 'bg-card text-card-foreground border border-border shadow-sm',
  muted: 'bg-muted/40 text-foreground border border-border/60',
  outline: 'bg-transparent text-foreground border-2 border-border',
  interactive: 'bg-card text-card-foreground border border-border shadow-sm hover:border-primary/40 hover:shadow-md transition-all duration-200 cursor-pointer',
}

const cardClass = computed(() => {
  return cn(
    'rounded-xl overflow-hidden',
    variantClasses[props.variant],
    props.class
  )
})
</script>

<template>
  <div :class="cardClass">
    <div v-if="$slots.header" class="p-6 pb-4 border-b border-border/40">
      <slot name="header" />
    </div>
    <div class="p-6">
      <slot />
    </div>
    <div v-if="$slots.footer" class="p-6 pt-0 border-t border-border/30 mt-4 flex items-center justify-between">
      <slot name="footer" />
    </div>
  </div>
</template>

