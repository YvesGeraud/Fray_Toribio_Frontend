<script setup lang="ts">
import type { PaginaSeccion } from '~/types/seccion'

defineProps<{
  seccion: PaginaSeccion
}>()
</script>

<template>
  <section class="section-content-wrap">
    <div class="section-content-heading">
      <p class="section-label">{{ seccion.eyebrow }}</p>
      <h2>{{ seccion.nav }}<br><em>en el Colegio.</em></h2>
    </div>

    <div class="detail-card-grid">
      <RevealContent
        v-for="(card, index) in seccion.cards"
        :key="card.title"
        class="detail-card !p-0 overflow-hidden flex flex-col rounded-xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow bg-white"
        :delay="index * 90"
      >
        <!-- Imagen ilustrativa -->
        <div v-if="card.image" class="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 group">
          <img
            :src="card.image"
            :alt="card.title"
            class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          >
          <span v-if="card.badge" class="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-xs text-[#12396d] rounded-md shadow-xs">
            {{ card.badge }}
          </span>
          <span class="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-bold text-slate-500 flex items-center justify-center">
            0{{ index + 1 }}
          </span>
        </div>

        <div class="p-6 flex-1 flex flex-col">
          <div v-if="!card.image" class="flex items-center justify-between mb-4">
            <span class="detail-icon">
              <UIcon :name="card.icon || 'i-lucide-check'" class="size-5" />
            </span>
            <span class="pillar-number !static">0{{ index + 1 }}</span>
          </div>

          <h3 class="!mt-0 text-xl font-serif text-[#12396d] font-normal mb-2.5">
            {{ card.title }}
          </h3>

          <p class="text-sm text-slate-600 leading-relaxed flex-1">
            {{ card.text }}
          </p>
        </div>
      </RevealContent>
    </div>

    <NotaEditorial v-if="seccion.note" :nota="seccion.note" />
  </section>
</template>
