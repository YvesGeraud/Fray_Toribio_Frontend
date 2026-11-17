<script setup lang="ts">
import type { PaginaSeccion } from '~/types/seccion'

defineProps<{
  seccion: PaginaSeccion
  slug: string
}>()
</script>

<template>
  <section class="w-full bg-[#f4f7fa] border-b border-[#e5ebf2] transition-colors duration-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
      <!-- Columna izquierda: Información institucional -->
      <div class="space-y-5">
        <!-- Breadcrumbs refinados -->
        <nav class="flex items-center gap-2 text-xs text-slate-500 font-medium" aria-label="Ruta de navegación">
          <NuxtLink to="/" class="hover:text-primary transition-colors flex items-center gap-1.5">
            <UIcon name="i-lucide-home" class="size-3.5" />
            <span>Inicio</span>
          </NuxtLink>
          <UIcon name="i-lucide-chevron-right" class="size-3 text-slate-400" />
          <span class="text-primary font-semibold">{{ seccion.nav }}</span>
        </nav>

        <!-- Eyebrow con acento dorado -->
        <p class="eyebrow !mb-2">
          <span class="eyebrow-rule" />
          {{ seccion.eyebrow }}
        </p>

        <!-- Título principal en tipografía serif -->
        <h1 class="text-4xl sm:text-5xl lg:text-[3.25rem] font-normal tracking-tight text-[#12396d] font-serif leading-[1.08]">
          {{ seccion.title }}
        </h1>

        <!-- Párrafo descriptivo lead -->
        <p class="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
          {{ seccion.lead }}
        </p>

        <!-- Botones de acción -->
        <div class="pt-3 flex flex-wrap items-center gap-3.5">
          <UButton
            v-if="slug !== 'contacto'"
            to="/contacto#formulario"
            color="primary"
            size="lg"
            trailing-icon="i-lucide-arrow-right"
            class="shadow-md shadow-blue-900/10"
          >
            Solicita informes
          </UButton>

          <UButton
            v-if="slug !== 'admisiones'"
            to="/admisiones"
            color="neutral"
            variant="outline"
            size="lg"
            trailing-icon="i-lucide-graduation-cap"
          >
            Admisiones 2026 - 2027
          </UButton>
        </div>
      </div>

      <!-- Columna derecha: Imagen destacada y credencial flotante -->
      <div class="relative">
        <div class="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl bg-white aspect-[4/3] group">
          <img
            :src="seccion.image"
            :alt="seccion.imageAlt"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            fetchpriority="high"
          >
          <div class="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl sm:rounded-3xl pointer-events-none" />
        </div>

        <!-- Sello institucional flotante -->
        <div class="absolute -bottom-4 -left-3 sm:bottom-4 sm:left-4 bg-white/95 backdrop-blur-md border border-slate-200/90 p-3 sm:p-4 rounded-xl shadow-xl flex items-center gap-3 max-w-[280px] sm:max-w-xs transition-transform duration-300 hover:translate-y-[-2px]">
          <img
            class="w-11 h-11 sm:w-13 sm:h-13 object-contain rounded-md shrink-0"
            src="/images/escudo.jpeg"
            alt="Escudo oficial del Colegio Fray Toribio de Benavente"
            width="52"
            height="52"
          >
          <div class="flex flex-col">
            <strong class="font-serif text-xs sm:text-sm font-bold text-[#12396d] leading-snug">
              Secundaria General
            </strong>
            <small class="text-[9px] sm:text-[10px] text-slate-500 font-medium tracking-wide">
              Xicohtzinco, Tlax. · CCT 29PES0084Y
            </small>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
