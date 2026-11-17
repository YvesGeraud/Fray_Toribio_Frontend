<script setup lang="ts">
const route = useRoute()
const menuOpen = ref(false)

const links = [
  { label: 'Inicio', to: '/' },
  { label: 'El colegio', to: '/el-colegio' },
  { label: 'Oferta educativa', to: '/oferta-educativa' },
  { label: 'Vida escolar', to: '/vida-escolar' },
  { label: 'Admisiones', to: '/admisiones' },
  { label: 'Contacto', to: '/contacto' },
]

const isActive = (to: string) => {
  if (to === '/') return route.path === '/'
  return route.path === to || route.path.startsWith(`${to}/`)
}
</script>

<template>
  <div class="utility-bar">
    <span>Institución educativa · Xicohtzinco, Tlaxcala</span>
    <span class="utility-cct">CCT 29PES0084Y</span>
  </div>
  <header class="site-header">
    <NuxtLink class="school-brand" to="/" aria-label="Colegio Fray Toribio de Benavente, inicio" @click="menuOpen = false">
      <img src="/images/escudo.jpeg" alt="Escudo del Colegio Fray Toribio de Benavente" width="62" height="62">
      <span class="brand-copy"><strong>Colegio Fray Toribio<br class="brand-break"> de Benavente</strong><small>SECUNDARIA GENERAL · CCT 29PES0084Y</small></span>
    </NuxtLink>
    <button class="mobile-menu-button" type="button" :aria-expanded="menuOpen" aria-controls="primary-navigation" :aria-label="menuOpen ? 'Cerrar menú' : 'Abrir menú'" @click="menuOpen = !menuOpen">
      <UIcon :name="menuOpen ? 'i-lucide-x' : 'i-lucide-menu'" class="size-6" />
    </button>
    <nav id="primary-navigation" class="primary-navigation" :class="{ 'is-open': menuOpen }" aria-label="Navegación principal">
      <NuxtLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="nav-item"
        :class="{ 'is-active': isActive(link.to) }"
        @click="menuOpen = false"
      >
        {{ link.label }}
      </NuxtLink>
    </nav>
  </header>
</template>
