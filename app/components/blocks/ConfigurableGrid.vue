<script setup lang="ts">
import { computed } from 'vue'

export interface GridImageItem {
  id: string
  imageUrl: string
  title?: string
  category?: string
}

interface Props {
  items: GridImageItem[]
  cols?: 2 | 3 | 4 | 5
  aspectRatio?: 'square' | 'video' | 'portrait'
  gap?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  cols: 4,
  aspectRatio: 'square',
  gap: 'md',
})

const emit = defineEmits<{
  'select': [item: GridImageItem]
}>()

const colClasses = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
  5: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5',
}

const aspectClasses = {
  square: 'aspect-square',
  video: 'aspect-[16/10]',
  portrait: 'aspect-[3/4]',
}

const gapClasses = {
  sm: 'gap-2 sm:gap-3',
  md: 'gap-4 sm:gap-5',
  lg: 'gap-6',
}

const gridClass = computed(() => {
  return [
    'grid',
    colClasses[props.cols],
    gapClasses[props.gap],
  ]
})
</script>

<template>
  <div class="w-full">
    <div :class="gridClass">
      <div
        v-for="item in items"
        :key="item.id"
        :class="[
          'group relative overflow-hidden rounded-2xl border border-border bg-card shadow-xs transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer',
          aspectClasses[aspectRatio]
        ]"
        @click="emit('select', item)"
      >
        <!-- Slot opcional para contenido personalizado en cada celda -->
        <slot name="item" :item="item">
          <!-- Renderizado por defecto de imagen -->
          <img
            :src="item.imageUrl"
            :alt="item.title || 'Foto'"
            class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          <!-- Gradient Overlay on Hover -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3.5 text-white">
            <span v-if="item.category" class="text-[10px] font-bold uppercase tracking-wider text-accent">
              {{ item.category }}
            </span>
            <p v-if="item.title" class="text-xs sm:text-sm font-semibold leading-tight line-clamp-2">
              {{ item.title }}
            </p>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

