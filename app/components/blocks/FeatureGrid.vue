<script setup lang="ts">
import { computed, type Component } from 'vue'
import { ArrowRight } from 'lucide-vue-next'
import SectionHeader, { type HighlightStyle } from '@/components/blocks/SectionHeader.vue'
import { cn, aspectRatioClasses, type AspectRatio } from '@/lib/utils'
import { useLinkComponent, resolveLink, type LinkTo } from '@/composables/useLink'
import { vReveal } from '@/directives/reveal'
import type { RevealOptions } from '@/lib/reveal'

export interface FeatureItem {
  title: string
  text?: string
  icon?: Component
  image?: string
  imageAlt?: string
  /** Etiqueta sobre la imagen (o junto al icono) */
  badge?: string
  /** Toda la tarjeta se vuelve clicable */
  to?: LinkTo
  href?: string
  linkLabel?: string
}

interface Props {
  items: FeatureItem[]
  cols?: 2 | 3 | 4
  /** card = tarjeta con borde · plain = sin caja (más editorial) */
  variant?: 'card' | 'plain'
  /** Numera las tarjetas (01, 02…) */
  numbered?: boolean
  imageAspect?: AspectRatio
  // Encabezado opcional (atajo a <SectionHeader>)
  eyebrow?: string
  title?: string
  highlight?: string
  highlightStyle?: HighlightStyle
  lead?: string
  align?: 'center' | 'left'
  /** Envuelve en <section> con espaciado vertical y ancho máximo */
  contained?: boolean
  /** Las tarjetas aparecen en secuencia al hacer scroll (true = 90 ms entre cada una) */
  reveal?: boolean | RevealOptions
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  cols: 3,
  variant: 'card',
  numbered: false,
  imageAspect: 'video',
  align: 'center',
  contained: true,
  reveal: false,
})

const revealBinding = computed(() =>
  props.reveal === false ? false : { stagger: 90, ...(props.reveal === true ? {} : props.reveal) }
)

defineSlots<{
  header?: () => unknown
  item?: (p: { item: FeatureItem; index: number }) => unknown
  /** Debajo de la rejilla (ej. un <Callout> o un botón "Ver todos") */
  footer?: () => unknown
}>()

const colClasses = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
}

const routerLink = useLinkComponent()
const linkFor = (item: FeatureItem) => resolveLink(routerLink, item)

const num = (i: number) => String(i + 1).padStart(2, '0')

const rootClass = computed(() =>
  cn(props.contained && 'max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16', 'space-y-10', props.class)
)
</script>

<template>
  <section :class="rootClass">
    <slot name="header">
      <SectionHeader
        v-if="title"
        :eyebrow="eyebrow"
        :title="title"
        :highlight="highlight"
        :highlight-style="highlightStyle"
        :lead="lead"
        :align="align"
      />
    </slot>

    <div v-reveal="revealBinding" :class="['grid grid-cols-1 gap-5 lg:gap-6', colClasses[cols]]">
      <article
        v-for="(item, index) in items"
        :key="item.title"
        :class="[
          'group relative flex flex-col overflow-hidden',
          variant === 'card'
            ? 'rounded-2xl border border-border bg-card shadow-xs transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5'
            : '',
          linkFor(item) && variant === 'card' && 'hover:border-primary/40 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2',
        ]"
      >
        <slot name="item" :item="item" :index="index">
          <!-- Imagen -->
          <div
            v-if="item.image"
            :class="[
              'relative w-full overflow-hidden bg-muted',
              aspectRatioClasses[imageAspect],
              variant === 'plain' && 'rounded-2xl',
            ]"
          >
            <img
              :src="item.image"
              :alt="item.imageAlt ?? ''"
              loading="lazy"
              decoding="async"
              class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span
              v-if="item.badge"
              class="absolute top-3 left-3 rounded-md bg-card/90 backdrop-blur px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary shadow-xs"
            >
              {{ item.badge }}
            </span>
            <span
              v-if="numbered"
              class="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-card/90 backdrop-blur text-[10px] font-bold text-muted-foreground tabular-nums"
              aria-hidden="true"
            >
              {{ num(index) }}
            </span>
          </div>

          <div :class="['flex flex-1 flex-col', variant === 'card' ? 'p-6' : 'pt-5']">
            <!-- Icono (cuando no hay imagen) -->
            <div v-if="!item.image && (item.icon || numbered || item.badge)" class="mb-5 flex items-center justify-between gap-3">
              <span
                v-if="item.icon"
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
              >
                <component :is="item.icon" class="h-5 w-5" aria-hidden="true" />
              </span>
              <span v-if="item.badge" class="text-[10px] font-bold uppercase tracking-wider text-primary">{{ item.badge }}</span>
              <span v-if="numbered" class="ml-auto text-2xl font-extrabold text-muted-foreground/30 tabular-nums" aria-hidden="true">
                {{ num(index) }}
              </span>
            </div>

            <h3 class="text-lg font-bold leading-snug text-foreground">
              <!-- Enlace único extendido a toda la tarjeta con ::after -->
              <component
                :is="linkFor(item)!.is"
                v-if="linkFor(item)"
                v-bind="linkFor(item)!.attrs"
                class="focus-visible:outline-none after:absolute after:inset-0 after:content-[''] hover:text-primary transition-colors"
              >
                {{ item.title }}
              </component>
              <template v-else>{{ item.title }}</template>
            </h3>

            <p v-if="item.text" class="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{{ item.text }}</p>

            <span
              v-if="linkFor(item)"
              class="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
              aria-hidden="true"
            >
              {{ item.linkLabel ?? 'Ver más' }}
              <ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </slot>
      </article>
    </div>

    <slot name="footer" />
  </section>
</template>
