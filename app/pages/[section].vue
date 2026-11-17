<script setup lang="ts">
const ruta = useRoute()
const slug = computed(() => String(ruta.params.section))

const { seccion, error } = await useSeccion(() => slug.value)

if (error.value || !seccion.value) {
  throw createError({ statusCode: 404, statusMessage: 'Página no encontrada' })
}

useSeoMeta({
  title: () => `${seccion.value?.nav ?? ''} | Colegio Fray Toribio de Benavente`,
  description: () => `${seccion.value?.lead ?? ''} Colegio Fray Toribio de Benavente, Xicohtzinco, Tlaxcala. CCT 29PES0084Y.`,
})
</script>

<template>
  <main v-if="seccion" class="section-page">
    <HeroSeccion :seccion="seccion" :slug="slug" />

    <TarjetasSeccion :seccion="seccion" />

    <!-- Bloques específicos desacoplados por funcionalidad -->
    <ProcesoAdmisiones v-if="slug === 'admisiones'" />

    <FormularioContacto v-if="slug === 'contacto'" />

    <PanelVidaEscolar v-if="slug === 'vida-escolar'" />

    <PanelUbicacion v-if="slug === 'contacto'" />
  </main>
</template>
