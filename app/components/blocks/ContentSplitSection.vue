<script setup lang="ts">
import { computed } from 'vue'
import { CheckCircle2 } from 'lucide-vue-next'
import Badge from '@/components/ui/Badge.vue'
import { cn } from '@/lib/utils'

interface Props {
  reverse?: boolean          // Si es true, coloca la imagen a la izquierda y el texto a la derecha
  badge?: string            // Etiqueta superior opcional
  title: string             // Título principal
  subtitle?: string          // Párrafo descriptivo
  features?: string[]       // Lista de puntos fuertes con checkmarks
  imageSrc?: string         // URL de la imagen
  imageAlt?: string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  reverse: false,
  imageAlt: 'Imagen descriptiva',
})

const containerClass = computed(() => {
  return cn(
    'py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center',
    props.class
  )
})
</script>

<template>
  <section :class="containerClass">
    <!-- Columna 1: Contenido textual (o slot #content) -->
    <div :class="[reverse ? 'lg:order-2' : 'lg:order-1', 'space-y-6']">
      <div v-if="badge" class="flex items-center">
        <Badge variant="accent">{{ badge }}</Badge>
      </div>

      <div class="space-y-3">
        <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
          {{ title }}
        </h2>
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
        <div class="relative rounded-3xl overflow-hidden border border-border shadow-lg bg-muted aspect-[4/3] group">
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
    </div>
  </section>
</template>

