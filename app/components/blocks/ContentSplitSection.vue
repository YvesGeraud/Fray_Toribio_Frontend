<script setup lang="ts">
import { computed } from 'vue'
import { CheckCircle2 } from 'lucide-vue-next'
import Badge from '@/components/ui/Badge.vue'
import { cn, aspectRatioClasses, type AspectRatio } from '@/lib/utils'

export type OverlayPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

interface Props {
  reverse?: boolean          // Si es true, coloca la imagen a la izquierda y el texto a la derecha
  badge?: string             // Etiqueta superior opcional
  title: string              // Título principal
  subtitle?: string          // Párrafo descriptivo
  features?: string[]        // Lista de puntos fuertes con checkmarks
  imageSrc?: string          // URL de la imagen
  imageAlt?: string
  aspectRatio?: AspectRatio  // Proporción de la imagen (default 4:3)
  overlayPosition?: OverlayPosition // Esquina donde flota el slot #badge-overlay
  headingTag?: 'h1' | 'h2' | 'h3' // Nivel semántico del título (SEO / jerarquía)
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  reverse: false,
  imageAlt: 'Imagen descriptiva',
  aspectRatio: 'landscape',
  overlayPosition: 'bottom-left',
  headingTag: 'h2',
})

const containerClass = computed(() => {
  return cn(
    'py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center',
    props.class
  )
})

// Dentro de la foto en móvil; en desktop sobresale de la esquina (efecto "sello")
const overlayPositionClasses: Record<OverlayPosition, string> = {
  'top-left': 'top-3 left-3 sm:-top-6 sm:-left-6',
  'top-right': 'top-3 right-3 sm:-top-6 sm:-right-6',
  'bottom-left': 'bottom-3 left-3 sm:-bottom-6 sm:-left-6',
  'bottom-right': 'bottom-3 right-3 sm:-bottom-6 sm:-right-6',
}
</script>

<template>
  <section :class="containerClass">
    <!-- Columna 1: Contenido textual -->
    <div :class="[reverse ? 'lg:order-2' : 'lg:order-1', 'space-y-6']">
      <div v-if="badge" class="flex items-center">
        <Badge variant="accent">{{ badge }}</Badge>
      </div>

      <div class="space-y-3">
        <component
          :is="headingTag"
          class="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight"
        >
          {{ title }}
        </component>
        <p v-if="subtitle" class="text-base sm:text-lg text-muted-foreground leading-relaxed">
          {{ subtitle }}
        </p>
      </div>

      <!-- Slot para párrafos o contenido extendido adicional -->
      <slot />

      <!-- Lista de fortalezas / características con checkmark -->
      <ul v-if="features && features.length" class="space-y-2.5 pt-1">
        <li
          v-for="(feat, idx) in features"
          :key="idx"
          class="flex items-start gap-2.5 text-sm font-medium text-foreground"
        >
          <CheckCircle2 class="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <span>{{ feat }}</span>
        </li>
      </ul>

      <!-- Slot para botones de acción (CTA) -->
      <div v-if="$slots.actions" class="pt-2 flex flex-wrap items-center gap-3">
        <slot name="actions" />
      </div>
    </div>

    <!-- Columna 2: Media (Imagen, Video o Slot personalizado) -->
    <div :class="[reverse ? 'lg:order-1' : 'lg:order-2', 'relative']">
      <slot name="media">
        <!-- Renderizado por defecto si pasas imageSrc -->
        <div
          :class="[
            'relative rounded-3xl overflow-hidden border border-border shadow-lg bg-muted group',
            aspectRatioClasses[aspectRatio]
          ]"
        >
          <img
            v-if="imageSrc"
            :src="imageSrc"
            :alt="imageAlt"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <!-- Marco decorativo institucional sutil -->
          <div class="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-3xl pointer-events-none" />
        </div>
      </slot>

      <!--
        Slot flotante sobre la foto: sellos, insignias o un <StatCounter />.
        Vive fuera del contenedor con overflow-hidden para poder sobresalir de la esquina,
        y funciona tanto con la imagen por defecto como con un #media personalizado.
      -->
      <div
        v-if="$slots['badge-overlay']"
        :class="['absolute z-10', overlayPositionClasses[overlayPosition]]"
      >
        <slot name="badge-overlay" />
      </div>
    </div>
  </section>
</template>
