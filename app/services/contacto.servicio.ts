import type { DatosFormularioContacto, RespuestaFormularioContacto } from '~/types/contacto'

export const servicioContacto = {
  /**
   * Envía la solicitud de contacto a la API de Laravel.
   */
  async enviarMensaje(_datosFormulario: DatosFormularioContacto): Promise<RespuestaFormularioContacto> {
    // =========================================================================
    // TODO: Cuando el backend de Laravel esté conectado:
    // =========================================================================
    // const config = useRuntimeConfig()
    // try {
    //   return await $fetch<RespuestaFormularioContacto>(`${config.public.apiBase}/contacto`, {
    //     method: 'POST',
    //     body: datosFormulario,
    //   })
    // } catch (error: any) {
    //   return {
    //     exito: false,
    //     mensaje: error?.data?.message || 'Error al enviar el mensaje. Intenta más tarde.',
    //     errores: error?.data?.errors,
    //   }
    // }

    // Simulación de envío actual:
    await new Promise((resolve) => setTimeout(resolve, 600))
    return {
      exito: true,
      mensaje: 'Solicitud preparada correctamente.',
    }
  },
}

