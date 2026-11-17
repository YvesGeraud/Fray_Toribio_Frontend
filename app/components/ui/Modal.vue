<script setup lang="ts">
import { watch, onMounted, onUnmounted } from 'vue'
import { X } from 'lucide-vue-next'

interface Props {
  modelValue: boolean
  title?: string
  description?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'close': []
}>()

const close = () => {
  emit('update:modelValue', false)
  emit('close')
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.modelValue) {
    close()
  }
}

watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onMounted(() => window.addEventListener('keydown', handleKeyDown))
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  document.body.style.overflow = ''
})

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        @click.self="close"
      >
        <div
          :class="[
            'relative w-full rounded-2xl bg-card border border-border shadow-2xl p-6 overflow-hidden transition-all transform',
            sizeClasses[size]
          ]"
        >
          <!-- Header -->
          <div class="flex items-start justify-between pb-4 border-b border-border/50">
            <div>
              <h3 v-if="title" class="text-lg font-bold text-foreground tracking-tight">
                {{ title }}
              </h3>
              <p v-if="description" class="text-sm text-muted-foreground mt-0.5">
                {{ description }}
              </p>
            </div>
            <button
              class="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              @click="close"
            >
              <X class="w-5 h-5" />
            </button>
          </div>

          <!-- Body -->
          <div class="py-4">
            <slot />
          </div>

          <!-- Footer -->
          <div v-if="$slots.footer" class="pt-4 border-t border-border/50 flex justify-end gap-2">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

