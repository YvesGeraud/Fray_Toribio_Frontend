<script setup lang="ts">
const route = useRoute()
const menuOpen = ref(false)

const links = [
  { label: 'Inicio', to: '/' },
  { label: 'El colegio', to: '/el-colegio' },
  { label: 'Oferta educativa', to: '/oferta-educativa' },
  { label: 'Vida escolar', to: '/vida-escolar' },
  { label: 'Admisiones', to: '/admisiones' },
  { label: 'Portales', to: '/portales' },
  { label: 'Contacto', to: '/contacto' },
]

const isActive = (to: string) => {
  if (to === '/') return route.path === '/'
  return route.path === to || route.path.startsWith(`${to}/`)
}
</script>

<template>
  <div class="utility-bar">
    <div class="flex items-center gap-2 sm:gap-3">
      <span>Institución educativa · Xicohtzinco, Tlaxcala</span>
      <span class="utility-cct hidden sm:inline">CCT 29PES0084Y</span>
    </div>
    <div class="hidden lg:flex items-center gap-3.5 text-[11px] font-semibold tracking-normal normal-case">
      <span class="text-white/60 uppercase tracking-widest text-[9.5px]">Plataformas:</span>
      <a
        href="https://colegiofraymotolinia.servoescolar.mx/"
        target="_blank"
        rel="noopener noreferrer"
        class="text-white/90 hover:text-amber-300 transition-colors inline-flex items-center gap-1"
        title="Acceso a calificaciones y boletas escolares"
      >
        <span>Control Escolar</span>
        <UIcon name="i-lucide-external-link" class="size-3 opacity-70" />
      </a>
      <span class="opacity-30">|</span>
      <a
        href="https://suite.amco.me/"
        target="_blank"
        rel="noopener noreferrer"
        class="text-white/90 hover:text-amber-300 transition-colors inline-flex items-center gap-1"
        title="Plataforma de enseñanza y recursos digitales AMCO"
      >
        <span>Suite AMCO</span>
        <UIcon name="i-lucide-external-link" class="size-3 opacity-70" />
      </a>
      <span class="opacity-30">|</span>
      <a
        href="https://compradelibros.amco.me/"
        target="_blank"
        rel="noopener noreferrer"
        class="text-white/90 hover:text-amber-300 transition-colors inline-flex items-center gap-1"
        title="Tienda oficial para adquisición de libros de texto y licencias"
      >
        <span>Compra de Libros</span>
        <UIcon name="i-lucide-external-link" class="size-3 opacity-70" />
      </a>
    </div>
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
