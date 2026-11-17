<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import Badge from '@/components/ui/Badge.vue'

export interface SlideItem {
  id: string
  title: string
  subtitle?: string
  badge?: string
  imageUrl: string
  ctaText?: string
  ctaLink?: string
}

interface Props {
  slides: SlideItem[]
  autoplay?: boolean
  interval?: number // ms
}

const props = withDefaults(defineProps<Props>(), {
  autoplay: true,
  interval: 5000,
})

const currentIndex = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % props.slides.length
}

const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + props.slides.length) % props.slides.length
}

const goTo = (index: number) => {
  currentIndex.value = index
}

const startAutoplay = () => {
  if (props.autoplay && props.slides.length > 1) {
    stopAutoplay()
    timer = setInterval(next, props.interval)
  }
}

const stopAutoplay = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

onMounted(() => startAutoplay())
onUnmounted(() => stopAutoplay())
</script>

<template>
  <div
    class="relative w-full rounded-3xl overflow-hidden shadow-xl border border-border bg-card group"
    @mouseenter="stopAutoplay"
    @mouseleave="startAutoplay"
  >
    <!-- Slides Viewport -->
    <div class="relative w-full aspect-[16/9] sm:aspect-[21/9] max-h-[520px] overflow-hidden">
      <div
        v-for="(slide, idx) in slides"
        :key="slide.id"
        :class="[
          'absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out',
          idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
        ]"
      >
        <!-- Background Image with Overlay -->
        <img
          :src="slide.imageUrl"
          :alt="slide.title"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

        <!-- Slide Overlay Content -->
        <div class="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-12 text-white max-w-3xl">
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
            <NuxtLink v-if="slide.ctaLink" :to="slide.ctaLink">
              <Button size="md" class="shadow-md shadow-primary/30">
                {{ slide.ctaText }}
              </Button>
            </NuxtLink>
            <Button v-else size="md" class="shadow-md shadow-primary/30">
              {{ slide.ctaText }}
            </Button>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Arrows -->
    <button
      class="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-black/70 transition-all cursor-pointer"
      title="Anterior"
      @click="prev"
    >
      <ChevronLeft class="w-5 h-5" />
    </button>
    <button
      class="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-black/70 transition-all cursor-pointer"
      title="Siguiente"
      @click="next"
    >
      <ChevronRight class="w-5 h-5" />
    </button>

    <!-- Indicators / Dots -->
    <div class="absolute bottom-4 right-6 z-20 flex items-center gap-1.5">
      <button
        v-for="(_, index) in slides"
        :key="index"
        :class="[
          'h-2 rounded-full transition-all duration-300',
          index === currentIndex ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
        ]"
        @click="goTo(index)"
      />
    </div>
  </div>
</template>

