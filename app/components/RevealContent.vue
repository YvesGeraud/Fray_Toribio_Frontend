<script setup lang="ts">
const props = withDefaults(defineProps<{ delay?: number }>(), { delay: 0 })
const element = ref<HTMLElement | null>(null)
const visible = ref(false)
let observer: IntersectionObserver | undefined

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    visible.value = true
    return
  }
  observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      window.setTimeout(() => { visible.value = true }, props.delay)
      observer?.disconnect()
    }
  }, { threshold: 0.12 })
  if (element.value) observer.observe(element.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div ref="element" class="reveal-content" :class="{ 'reveal-visible': visible }">
    <slot />
  </div>
</template>
