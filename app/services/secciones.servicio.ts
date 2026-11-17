import { DATOS_SECCIONES } from '~/data/secciones.datos'
import type { PaginaSeccion, RespuestaApiLaravel as _RespuestaApiLaravel } from '~/types/seccion'

export const servicioSecciones = {
  /**
   * Obtiene la información de una sección por su slug.
   * Compatible actualmente con datos locales y listo para Laravel REST API.
   */
  async obtenerPorSlug(slug: string): Promise<PaginaSeccion | null> {
    // =========================================================================
    // TODO: Cuando el backend de Laravel esté listo, descomentar esta sección:
    // =========================================================================
    // const config = useRuntimeConfig()
    // try {
    //   const respuesta = await $fetch<RespuestaApiLaravel<PaginaSeccion>>(`${config.public.apiBase}/secciones/${slug}`)
    //   return respuesta.data
    // } catch (error) {
    //   console.error(`Error al obtener la sección ${slug} desde Laravel API:`, error)
    //   return null
    // }

    // Mock local actual:
    const seccion = DATOS_SECCIONES[slug]
    if (!seccion) return null

    return {
      ...seccion,
      slug,
    }
  },

  /**
   * Lista todos los slugs disponibles
   */
  async obtenerTodosLosSlugs(): Promise<string[]> {
    return Object.keys(DATOS_SECCIONES)
  },
}

