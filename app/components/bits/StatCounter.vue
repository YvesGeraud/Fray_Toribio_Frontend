<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Props {
  target: number
  prefix?: string
  suffix?: string
  duration?: number // in ms
  label: string
  sublabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  prefix: '',
  suffix: '',
  duration: 1800,
})

const count = ref(0)
const hasAnimated = ref(false)
const elRef = ref<HTMLElement | null>(null)

const startAnimation = () => {
  if (hasAnimated.value) return
  hasAnimated.value = true

  const startTime = performance.now()
  const startVal = 0
  const endVal = props.target

  const update = (now: number) => {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / props.duration, 1)
    
    // Ease Out Quad
    const ease = 1 - Math.pow(1 - progress, 3)
    count.value = Math.floor(startVal + (endVal - startVal) * ease)

    if (progress < 1) {
      requestAnimationFrame(update)
    } else {
      count.value = endVal
    }
  }

  requestAnimationFrame(update)
}

onMounted(() => {
  // Use IntersectionObserver to animate when visible
  if ('IntersectionObserver' in window && elRef.value) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        startAnimation()
        observer.disconnect()
      }
    }, { threshold: 0.3 })
    observer.observe(elRef.value)
  } else {
    startAnimation()
  }
})
</script>

<template>
  <div ref="elRef" class="flex flex-col items-center justify-center text-center p-4">
    <div class="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight flex items-baseline">
      <span v-if="prefix" class="text-primary mr-1 text-3xl">{{ prefix }}</span>
      <span class="tabular-nums">{{ count.toLocaleString() }}</span>
      <span v-if="suffix" class="text-primary ml-1 text-3xl">{{ suffix }}</span>
    </div>
    <div class="mt-2 text-sm font-semibold text-foreground/90 uppercase tracking-wider">
      {{ label }}
    </div>
    <div v-if="sublabel" class="text-xs text-muted-foreground mt-0.5">
      {{ sublabel }}
    </div>
  </div>
</template>

