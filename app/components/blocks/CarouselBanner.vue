<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import Badge from '@/components/ui/Badge.vue'

export interface SlideItem {
  id: string
  title: string
  subtitle?: string
  badge?: string
  imageUrl: string
  imageAlt?: string
  ctaText?: string
  /** Ruta interna (NuxtLink / RouterLink) o URL externa (http..., #ancla) */
  ctaLink?: string
}

interface Props {
  slides: SlideItem[]
  autoplay?: boolean
  interval?: number // ms por slide
  showProgress?: boolean // barra delgada de tiempo del slide actual
  pauseOnHover?: boolean
  swipeThreshold?: number // px mínimos para considerar un swipe
}

const props = withDefaults(defineProps<Props>(), {
  autoplay: true,
  interval: 5000,
  showProgress: true,
  pauseOnHover: true,
  swipeThreshold: 50,
})

const emit = defineEmits<{
  change: [index: number, slide: SlideItem]
  'cta-click': [slide: SlideItem]
}>()

const currentIndex = ref(0)
const progress = ref(0) // 0..1 del slide actual

const total = computed(() => props.slides.length)
const canAutoplay = computed(() => props.autoplay && total.value > 1)

// ---- Navegación ----
const goTo = (index: number) => {
  if (!total.value) return
  currentIndex.value = (index + total.value) % total.value
  elapsed = 0
  progress.value = 0
}
const next = () => goTo(currentIndex.value + 1)
const prev = () => goTo(currentIndex.value - 1)

watch(currentIndex, (i) => {
  const slide = props.slides[i]
  if (slide) emit('change', i, slide)
})

// Si cambian los slides (p.ej. llegan de una API) y el índice queda fuera de rango
watch(total, (n) => {
  if (currentIndex.value >= n) goTo(0)
})

// ---- Autoplay con rAF (pausable sin perder el avance) ----
const pausedBy = ref(new Set<string>())
const isPaused = computed(() => pausedBy.value.size > 0)
const pause = (reason: string) => { pausedBy.value = new Set(pausedBy.value).add(reason) }
const resume = (reason: string) => {
  const s = new Set(pausedBy.value)
  s.delete(reason)
  pausedBy.value = s
}

let rafId: number | null = null
let lastTs = 0
let elapsed = 0

const tick = (ts: number) => {
  const dt = lastTs ? ts - lastTs : 0
  lastTs = ts
  if (canAutoplay.value && !isPaused.value) {
    elapsed += dt
    if (elapsed >= props.interval) {
      next()
    } else {
      progress.value = elapsed / props.interval
    }
  }
  rafId = requestAnimationFrame(tick)
}

const onVisibility = () => (document.hidden ? pause('hidden') : resume('hidden'))

let reducedMotion: MediaQueryList | null = null
const onReducedMotion = () => (reducedMotion?.matches ? pause('reduced-motion') : resume('reduced-motion'))

onMounted(() => {
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  onReducedMotion()
  reducedMotion.addEventListener('change', onReducedMotion)
  document.addEventListener('visibilitychange', onVisibility)
  rafId = requestAnimationFrame(tick)
})

onUnmounted(() => {
  if (rafId !== null) cancelAnimationFrame(rafId)
  document.removeEventListener('visibilitychange', onVisibility)
  reducedMotion?.removeEventListener('change', onReducedMotion)
})

const onMouseEnter = () => props.pauseOnHover && pause('hover')
const onMouseLeave = () => resume('hover')
// Solo pausa con foco de teclado (con el mouse, :focus-visible no aplica)
const onFocusIn = (e: FocusEvent) => {
  if ((e.target as Element).matches?.(':focus-visible')) pause('focus')
}

// ---- Swipe táctil ----
let touchStartX = 0
let touchStartY = 0

const onTouchStart = (e: TouchEvent) => {
  const t = e.changedTouches[0]
  touchStartX = t.clientX
  touchStartY = t.clientY
  pause('touch')
}

const onTouchEnd = (e: TouchEvent) => {
  resume('touch')
  const t = e.changedTouches[0]
  const dx = t.clientX - touchStartX
  const dy = t.clientY - touchStartY
  // Solo swipes mayormente horizontales, para no interferir con el scroll vertical
  if (Math.abs(dx) < props.swipeThreshold || Math.abs(dx) < Math.abs(dy)) return
  if (dx < 0) next()
  else prev()
}

// ---- Teclado ----
const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'ArrowRight') { e.preventDefault(); next() }
  else if (e.key === 'ArrowLeft') { e.preventDefault(); prev() }
}

const isExternal = (link: string) => /^(https?:)?\/\/|^mailto:|^tel:|^#/.test(link)
</script>

<template>
  <section
    class="relative w-full rounded-3xl overflow-hidden shadow-xl border border-border bg-card group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    aria-roledescription="carrusel"
    tabindex="0"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @focusin="onFocusIn"
    @focusout="resume('focus')"
    @keydown="onKeydown"
    @touchstart.passive="onTouchStart"
    @touchend.passive="onTouchEnd"
    @touchcancel.passive="resume('touch')"
  >
    <!-- Slides Viewport -->
    <div class="relative w-full aspect-[4/3] sm:aspect-[21/9] max-h-[520px] overflow-hidden touch-pan-y">
      <div
        v-for="(slide, idx) in slides"
        :key="slide.id"
        role="group"
        aria-roledescription="slide"
        :aria-label="`${idx + 1} de ${total}`"
        :aria-hidden="idx !== currentIndex"
        :inert="idx !== currentIndex || undefined"
        :class="[
          'absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out',
          idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
        ]"
      >
        <!-- Background Image with Overlay -->
        <img
          :src="slide.imageUrl"
          :alt="slide.imageAlt ?? ''"
          :loading="idx === 0 ? 'eager' : 'lazy'"
          :fetchpriority="idx === 0 ? 'high' : undefined"
          draggable="false"
          class="w-full h-full object-cover select-none"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

        <!-- Slide Overlay Content -->
        <div class="absolute inset-0 flex flex-col justify-end p-6 pb-10 sm:p-10 lg:p-12 text-white max-w-3xl">
          <div v-if="slide.badge" class="mb-3">
            <Badge variant="accent" class="bg-accent text-accent-foreground border-none font-bold">
              {{ slide.badge }}
            </Badge>
          </div>

          <h3 class="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight drop-shadow-sm">
            {{ slide.title }}
          </h3>

          <p v-if="slide.subtitle" class="mt-2 text-sm sm:text-base text-white/80 line-clamp-2 max-w-2xl">
            {{ slide.subtitle }}
          </p>

          <div v-if="slide.ctaText" class="mt-4">
            <!-- Slot por si necesitas un CTA totalmente personalizado -->
            <slot name="cta" :slide="slide">
              <Button
                size="md"
                class="shadow-md shadow-primary/30"
                :to="slide.ctaLink && !isExternal(slide.ctaLink) ? slide.ctaLink : undefined"
                :href="slide.ctaLink && isExternal(slide.ctaLink) ? slide.ctaLink : undefined"
                @click="emit('cta-click', slide)"
              >
                {{ slide.ctaText }}
              </Button>
            </slot>
          </div>
        </div>
      </div>
    </div>

    <template v-if="total > 1">
      <!-- Navigation Arrows (ocultas en touch; ahí se usa swipe) -->
      <button
        type="button"
        class="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-black/40 backdrop-blur-md text-white hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 focus-visible:opacity-100 hover:bg-black/70 transition-all cursor-pointer"
        aria-label="Slide anterior"
        @click="prev"
      >
        <ChevronLeft class="w-5 h-5" />
      </button>
      <button
        type="button"
        class="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-black/40 backdrop-blur-md text-white hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 focus-visible:opacity-100 hover:bg-black/70 transition-all cursor-pointer"
        aria-label="Slide siguiente"
        @click="next"
      >
        <ChevronRight class="w-5 h-5" />
      </button>

      <!-- Indicators / Dots -->
      <div class="absolute bottom-4 right-6 z-20 flex items-center gap-1.5">
        <button
          v-for="(s, index) in slides"
          :key="s.id"
          type="button"
          :aria-label="`Ir al slide ${index + 1}`"
          :aria-current="index === currentIndex"
          :class="[
            'h-2 rounded-full transition-all duration-300 cursor-pointer',
            index === currentIndex ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
          ]"
          @click="goTo(index)"
        />
      </div>

      <!-- Barra de progreso del slide actual -->
      <div
        v-if="showProgress && canAutoplay"
        class="absolute bottom-0 inset-x-0 z-20 h-1 bg-white/15"
        aria-hidden="true"
      >
        <div
          class="h-full bg-accent origin-left will-change-transform"
          :style="{ transform: `scaleX(${progress})` }"
        />
      </div>
    </template>
  </section>
</template>
