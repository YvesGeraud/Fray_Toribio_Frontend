<script setup lang="ts">
import { DATOS_SECCIONES } from '~/data/secciones.datos'

const galeria = DATOS_SECCIONES['vida-escolar']?.galeria || []
const categoriaSeleccionada = ref('Todos')

const categorias = computed(() => {
  const cats = new Set(galeria.map(item => item.category))
  return ['Todos', ...Array.from(cats)]
})

const fotosFiltradas = computed(() => {
  if (categoriaSeleccionada.value === 'Todos') return galeria
  return galeria.filter(item => item.category === categoriaSeleccionada.value)
})
</script>

<template>
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
    <!-- Encabezado de la galería -->
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-200">
      <div>
        <p class="section-label !mb-2">MOMENTOS Y EXPERIENCIAS</p>
        <h2 class="text-3xl sm:text-4xl font-serif text-[#12396d] font-normal">
          Galería de la Comunidad Escolar
        </h2>
        <p class="text-sm text-slate-500 mt-2 max-w-xl">
          Conoce el día a día en el Colegio Fray Toribio de Benavente: ciencia, cultura, deportes y aprendizaje activo.
        </p>
      </div>

      <!-- Filtros por categoría -->
      <div class="flex flex-wrap gap-2">
        <button
          v-for="cat in categorias"
          :key="cat"
          type="button"
          class="px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all"
          :class="categoriaSeleccionada === cat
            ? 'bg-[#174789] text-white shadow-xs'
            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'"
          @click="categoriaSeleccionada = cat"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <!-- Rejilla fotográfica con efectos hover -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="foto in fotosFiltradas"
        :key="foto.id"
        class="group relative rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-lg transition-all duration-300 aspect-[4/3] bg-slate-100"
      >
        <img
          :src="foto.imageUrl"
          :alt="foto.title"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        >

        <!-- Overlay con título y categoría -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity flex flex-col justify-end p-5 text-white">
          <span class="text-[10px] font-bold uppercase tracking-widest text-[#d8c694] mb-1">
            {{ foto.category }}
          </span>
          <h4 class="text-base font-semibold leading-snug">
            {{ foto.title }}
          </h4>
        </div>
      </div>
    </div>
  </section>
</template>
