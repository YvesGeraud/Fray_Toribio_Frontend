<script setup lang="ts">
import { computed, type Component } from 'vue'
import { Info, CheckCircle2, AlertTriangle, XCircle, StickyNote, Quote } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

export type CalloutVariant = 'note' | 'info' | 'success' | 'warning' | 'danger' | 'quote'

interface Props {
  variant?: CalloutVariant
  title?: string
  /** Icono propio (por defecto uno según la variante) */
  icon?: Component
  hideIcon?: boolean
  /** Solo quote: autor y cargo/fuente */
  author?: string
  authorRole?: string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'note',
  hideIcon: false,
})

const defaults: Record<CalloutVariant, { icon: Component; box: string; iconColor: string }> = {
  note: { icon: StickyNote, box: 'bg-muted/50 border-border', iconColor: 'text-muted-foreground' },
  info: { icon: Info, box: 'bg-primary/5 border-primary/25', iconColor: 'text-primary' },
  success: { icon: CheckCircle2, box: 'bg-success/5 border-success/25', iconColor: 'text-success' },
  warning: { icon: AlertTriangle, box: 'bg-accent/10 border-accent/35', iconColor: 'text-accent' },
  danger: { icon: XCircle, box: 'bg-destructive/5 border-destructive/25', iconColor: 'text-destructive' },
  quote: { icon: Quote, box: 'bg-card border-border', iconColor: 'text-primary/25' },
}

const cfg = computed(() => defaults[props.variant])
const iconComp = computed(() => (props.hideIcon ? null : props.icon ?? cfg.value.icon))
</script>

<template>
  <!-- Cita: figure + blockquote + figcaption (semántica correcta) -->
  <figure
    v-if="variant === 'quote'"
    :class="cn('relative overflow-hidden rounded-2xl border p-6 sm:p-8', cfg.box, props.class)"
  >
    <component
      :is="iconComp"
      v-if="iconComp"
      :class="['pointer-events-none absolute -top-3 right-3 h-24 w-24 sm:h-28 sm:w-28', cfg.iconColor]"
      aria-hidden="true"
    />
    <blockquote class="relative text-lg sm:text-xl font-medium leading-relaxed text-foreground text-pretty">
      <p v-if="title" class="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary not-italic">{{ title }}</p>
      <slot />
    </blockquote>
    <figcaption v-if="author || $slots.author" class="relative mt-5 flex items-center gap-3">
      <slot name="author">
        <span class="h-px w-8 bg-primary" aria-hidden="true" />
        <span class="text-sm">
          <span class="font-semibold text-foreground">{{ author }}</span>
          <span v-if="authorRole" class="text-muted-foreground"> · {{ authorRole }}</span>
        </span>
      </slot>
    </figcaption>
  </figure>

  <!-- Nota / aviso -->
  <aside
    v-else
    :class="cn('flex gap-3 rounded-xl border p-4 sm:p-5', cfg.box, props.class)"
  >
    <component :is="iconComp" v-if="iconComp" :class="['mt-0.5 h-5 w-5 shrink-0', cfg.iconColor]" aria-hidden="true" />
    <div class="min-w-0 space-y-1 text-sm leading-relaxed text-muted-foreground">
      <p v-if="title" class="font-semibold text-foreground">{{ title }}</p>
      <slot />
    </div>
  </aside>
</template>
