<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  modelValue?: string | number
  type?: string
  placeholder?: string
  disabled?: boolean
  error?: string
  label?: string
  hint?: string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const inputClass = computed(() => {
  return cn(
    'flex h-10 w-full rounded-lg border bg-background px-3.5 py-2 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50',
    props.error
      ? 'border-destructive focus-visible:ring-destructive'
      : 'border-border focus-visible:ring-primary',
    props.class
  )
})
</script>

<template>
  <div class="w-full space-y-1.5">
    <label v-if="label" class="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
      {{ label }}
    </label>
    <div class="relative">
      <input
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="inputClass"
        @input="handleInput"
      />
      <div v-if="$slots.suffix" class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <slot name="suffix" />
      </div>
    </div>
    <p v-if="error" class="text-xs text-destructive font-medium">{{ error }}</p>
    <p v-else-if="hint" class="text-xs text-muted-foreground">{{ hint }}</p>
  </div>
</template>

