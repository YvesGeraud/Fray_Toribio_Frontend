<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  spotlightColor?: string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  spotlightColor: 'rgba(var(--primary-rgb, 59, 130, 246), 0.12)',
})

const cardRef = ref<HTMLElement | null>(null)
const mouseX = ref(0)
const mouseY = ref(0)
const isHovered = ref(false)

const handleMouseMove = (e: MouseEvent) => {
  if (!cardRef.value) return
  const rect = cardRef.value.getBoundingClientRect()
  mouseX.value = e.clientX - rect.left
  mouseY.value = e.clientY - rect.top
}

const handleMouseEnter = () => {
  isHovered.value = true
}

const handleMouseLeave = () => {
  isHovered.value = false
}
</script>

<template>
  <div
    ref="cardRef"
    class="relative rounded-2xl border border-border bg-card p-6 overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-xl group"
    :class="props.class"
    @mousemove="handleMouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Dynamic Spotlight Layer -->
    <div
      class="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      :style="{
        background: `radial-gradient(400px circle at ${mouseX}px ${mouseY}px, hsl(var(--primary) / 0.12), transparent 70%)`
      }"
    />

    <!-- Border highlight spotlight -->
    <div
      class="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      :style="{
        boxShadow: `inset 0 0 0 1px hsl(var(--primary) / 0.25)`
      }"
    />

    <!-- Content Slot -->
    <div class="relative z-10">
      <slot />
    </div>
  </div>
</template>

