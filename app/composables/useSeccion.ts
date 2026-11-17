import { servicioSecciones } from '~/services/secciones.servicio'

/**
 * Composable para cargar y gestionar los datos de una sección de manera reactiva y SSR-friendly.
 */
export const useSeccion = async (obtenerSlug: () => string) => {
  const slug = computed(obtenerSlug)

  const {
    data: seccion,
    status,
    error,
    refresh,
  } = await useAsyncData(
    `seccion-${slug.value}`,
    () => servicioSecciones.obtenerPorSlug(slug.value),
    {
      watch: [slug],
    }
  )

  const estaCargando = computed(() => status.value === 'pending')

  return {
    seccion,
    estaCargando,
    error,
    refresh,
  }
}
