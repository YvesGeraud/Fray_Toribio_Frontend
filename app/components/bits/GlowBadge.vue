<script setup lang="ts">
interface Props {
  status?: 'active' | 'warning' | 'alert' | 'primary'
  text: string
  subtext?: string
}

withDefaults(defineProps<Props>(), {
  status: 'primary',
})

const dotColors = {
  active: 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.7)]',
  warning: 'bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.7)]',
  alert: 'bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.7)]',
  primary: 'bg-primary shadow-[0_0_12px_hsl(var(--primary)/0.7)]',
}

const pulseColors = {
  active: 'bg-emerald-400',
  warning: 'bg-amber-400',
  alert: 'bg-rose-400',
  primary: 'bg-primary',
}
</script>

<template>
  <div class="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-border bg-card/80 backdrop-blur-sm shadow-xs text-xs font-medium text-foreground">
    <span class="relative flex h-2.5 w-2.5">
      <span
        :class="['animate-ping absolute inline-flex h-full w-full rounded-full opacity-75', pulseColors[status]]"
      />
      <span
        :class="['relative inline-flex rounded-full h-2.5 w-2.5', dotColors[status]]"
      />
    </span>
    <span>{{ text }}</span>
    <span v-if="subtext" class="text-muted-foreground font-normal border-l border-border pl-2">
      {{ subtext }}
    </span>
  </div>
</template>

