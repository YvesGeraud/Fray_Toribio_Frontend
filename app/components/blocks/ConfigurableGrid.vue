<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'
import { ChevronLeft, ChevronRight, Play, MapPin } from 'lucide-vue-next'
import Modal from '@/components/ui/Modal.vue'
import VideoEmbed from '@/components/blocks/VideoEmbed.vue'
import { aspectRatioClasses, type AspectRatio } from '@/lib/utils'
import { parseVideoUrl, youtubeThumbnail } from '@/lib/video'

export interface GridImageItem {
  id: string
  /** Miniatura. En videos de YouTube puede omitirse: se usa la del video */
  imageUrl?: string
  /** Versión en alta resolución que se carga solo en el lightbox (opcional) */
  fullImageUrl?: string
  title?: string
  /** Línea secundaria: ubicación, fecha, autor… */
  subtitle?: string
  description?: string
  category?: string
  alt?: string
  /** Enlace de YouTube/Vimeo o .mp4: la celda muestra ▶ y el lightbox reproduce el video */
  video?: string
}

interface Props {
  items: GridImageItem[]
  cols?: 2 | 3 | 4 | 5
  aspectRatio?: AspectRatio
  gap?: 'sm' | 'md' | 'lg'
  /** grid = celdas iguales · masonry = cada foto con su proporción natural (estilo Pinterest) */
  layout?: 'grid' | 'masonry'
  /** Abre un visor grande al hacer clic (sigue emitiendo @select) */
  lightbox?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  cols: 4,
  aspectRatio: 'square',
  gap: 'md',
  layout: 'grid',
  lightbox: false,
})

const emit = defineEmits<{
  select: [item: GridImageItem, index: number]
}>()

const colClasses = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
  5: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5',
}
const masonryCols = {
  2: 'columns-1 sm:columns-2',
  3: 'columns-1 sm:columns-2 lg:columns-3',
  4: 'columns-2 sm:columns-3 lg:columns-4',
  5: 'columns-2 sm:columns-3 md:columns-4 lg:columns-5',
}
const gapClasses = { sm: 'gap-2 sm:gap-3', md: 'gap-4 sm:gap-5', lg: 'gap-6' }
// En masonry el espacio vertical lo da el margen de cada celda
const masonryItemGap = { sm: 'mb-2 sm:mb-3', md: 'mb-4 sm:mb-5', lg: 'mb-6' }

const containerClass = computed(() =>
  props.layout === 'masonry'
    ? [masonryCols[props.cols], gapClasses[props.gap]]
    : ['grid', colClasses[props.cols], gapClasses[props.gap]]
)

const thumbOf = (item: GridImageItem) => {
  if (item.imageUrl) return item.imageUrl
  const v = item.video ? parseVideoUrl(item.video) : null
  // mqdefault: 16:9 sin franjas negras (hqdefault es 4:3 con barras) y existe en todos los videos
  return v?.provider === 'youtube' ? youtubeThumbnail(v.id, 'mqdefault') : ''
}

// ---- Lightbox ----
const isOpen = ref(false)
const activeIndex = ref(0)
const activeItem = computed(() => props.items[activeIndex.value])
const hasMany = computed(() => props.items.length > 1)

const open = (index: number) => {
  activeIndex.value = index
  isOpen.value = true
}
const show = (index: number) => {
  const n = props.items.length
  activeIndex.value = (index + n) % n
}

const handleSelect = (item: GridImageItem, index: number) => {
  emit('select', item, index)
  if (props.lightbox) open(index)
}

const onLightboxKey = (e: KeyboardEvent) => {
  if (!hasMany.value) return
  if (e.key === 'ArrowRight') show(activeIndex.value + 1)
  else if (e.key === 'ArrowLeft') show(activeIndex.value - 1)
}

watch(isOpen, (v) => {
  if (v) window.addEventListener('keydown', onLightboxKey)
  else window.removeEventListener('keydown', onLightboxKey)
})
// Si la lista cambia (p. ej. un filtro) mientras el visor está abierto, no apuntar fuera de rango
watch(() => props.items.length, (n) => {
  if (activeIndex.value >= n) activeIndex.value = Math.max(0, n - 1)
  if (n === 0) isOpen.value = false
})
onUnmounted(() => window.removeEventListener('keydown', onLightboxKey))

// Swipe dentro del visor
let touchX = 0
const onTouchStart = (e: TouchEvent) => { touchX = e.changedTouches[0].clientX }
const onTouchEnd = (e: TouchEvent) => {
  const dx = e.changedTouches[0].clientX - touchX
  if (Math.abs(dx) > 50 && hasMany.value) show(activeIndex.value + (dx < 0 ? 1 : -1))
}

// Expuesto por si quieres abrir el visor desde fuera: gridRef.value.openLightbox(3)
defineExpose({ openLightbox: open })
</script>

<template>
  <div class="w-full">
    <TransitionGroup
      tag="div"
      :class="containerClass"
      enter-active-class="transition duration-300 ease-out motion-reduce:transition-none"
      enter-from-class="opacity-0 scale-95"
      move-class="transition-transform duration-300 ease-out motion-reduce:transition-none"
    >
      <div
        v-for="(item, index) in items"
        :key="item.id"
        role="button"
        tabindex="0"
        :aria-label="(item.video ? 'Ver video: ' : '') + (item.title || item.alt || `Imagen ${index + 1}`)"
        :class="[
          'group relative overflow-hidden rounded-2xl border border-border bg-card shadow-xs transition-[box-shadow,transform] duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
          layout === 'masonry' ? ['break-inside-avoid', masonryItemGap[gap]] : aspectRatioClasses[aspectRatio],
        ]"
        @click="handleSelect(item, index)"
        @keydown.enter.prevent="handleSelect(item, index)"
        @keydown.space.prevent="handleSelect(item, index)"
      >
        <!-- Slot opcional para contenido personalizado en cada celda -->
        <slot name="item" :item="item" :index="index">
          <img
            :src="thumbOf(item)"
            :alt="item.alt || item.title || ''"
            :class="[
              'w-full object-cover transition-transform duration-500 group-hover:scale-105',
              layout === 'masonry' ? 'h-auto' : 'h-full',
            ]"
            loading="lazy"
            decoding="async"
          />

          <!-- Indicador de video -->
          <span
            v-if="item.video"
            class="pointer-events-none absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur transition-transform group-hover:scale-110"
            aria-hidden="true"
          >
            <Play class="ml-0.5 h-5 w-5 fill-current" />
          </span>

          <!-- Texto al pasar el mouse / enfocar -->
          <div
            v-if="item.title || item.category || item.subtitle"
            class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3.5 text-white"
          >
            <span v-if="item.category" class="text-[10px] font-bold uppercase tracking-wider text-accent">
              {{ item.category }}
            </span>
            <p v-if="item.title" class="text-xs sm:text-sm font-semibold leading-tight line-clamp-2">
              {{ item.title }}
            </p>
            <p v-if="item.subtitle" class="mt-0.5 flex items-center gap-1 text-[11px] text-white/75 truncate">
              <MapPin class="h-3 w-3 shrink-0" aria-hidden="true" /> {{ item.subtitle }}
            </p>
          </div>
        </slot>
      </div>
    </TransitionGroup>

    <!-- Lightbox integrado (solo se monta si lightbox=true) -->
    <Modal
      v-if="lightbox"
      v-model="isOpen"
      size="full"
      :title="activeItem?.title"
      :description="[activeItem?.subtitle, activeItem?.category].filter(Boolean).join(' · ') || undefined"
    >
      <div
        v-if="activeItem"
        class="relative flex items-center justify-center select-none"
        @touchstart.passive="onTouchStart"
        @touchend.passive="onTouchEnd"
      >
        <!-- Slot por si quieres renderizar otro contenido en el visor -->
        <slot name="lightbox" :item="activeItem" :index="activeIndex">
          <VideoEmbed
            v-if="activeItem.video"
            :key="activeItem.id"
            :src="activeItem.video"
            :title="activeItem.title || 'Video'"
            :poster="activeItem.imageUrl"
            autoplay
            class="max-h-[70vh] max-w-[calc(70vh*16/9)]"
          />
          <img
            v-else
            :key="activeItem.id"
            :src="activeItem.fullImageUrl || thumbOf(activeItem)"
            :alt="activeItem.alt || activeItem.title || ''"
            class="max-h-[70vh] w-auto max-w-full rounded-xl object-contain"
            draggable="false"
          />
        </slot>

        <template v-if="hasMany">
          <button
            type="button"
            aria-label="Anterior"
            class="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/75 transition-colors cursor-pointer"
            @click="show(activeIndex - 1)"
          >
            <ChevronLeft class="w-5 h-5" />
          </button>
          <button
            type="button"
            aria-label="Siguiente"
            class="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/75 transition-colors cursor-pointer"
            @click="show(activeIndex + 1)"
          >
            <ChevronRight class="w-5 h-5" />
          </button>
        </template>
      </div>

      <p v-if="activeItem?.description" class="mt-3 text-center text-sm text-muted-foreground">{{ activeItem.description }}</p>
      <p v-if="hasMany" class="mt-2 text-center text-xs font-medium text-muted-foreground tabular-nums">
        {{ activeIndex + 1 }} / {{ items.length }}
      </p>
    </Modal>
  </div>
</template>
