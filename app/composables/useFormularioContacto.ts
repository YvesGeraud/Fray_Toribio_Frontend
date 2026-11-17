import { servicioContacto } from '~/services/contacto.servicio'
import type { DatosFormularioContacto } from '~/types/contacto'

const estadoInicial: DatosFormularioContacto = {
  nombre: '',
  correo: '',
  telefono: '',
  mensaje: '',
}

export const useFormularioContacto = () => {
  const formulario = reactive<DatosFormularioContacto>({ ...estadoInicial })
  const enviando = ref(false)
  const enviado = ref(false)
  const mensajeError = ref<string | null>(null)
  const erroresCampo = ref<Record<string, string[]>>({})

  const enviar = async () => {
    enviando.value = true
    mensajeError.value = null
    erroresCampo.value = {}

    try {
      const respuesta = await servicioContacto.enviarMensaje(formulario)
      if (respuesta.exito) {
        enviado.value = true
      } else {
        mensajeError.value = respuesta.mensaje
        if (respuesta.errores) {
          erroresCampo.value = respuesta.errores
        }
      }
    } catch {
      mensajeError.value = 'Ocurrió un error inesperado. Intenta de nuevo.'
    } finally {
      enviando.value = false
    }
  }

  const reiniciar = () => {
    Object.assign(formulario, estadoInicial)
    enviado.value = false
    mensajeError.value = null
    erroresCampo.value = {}
  }

  return {
    formulario,
    enviando,
    enviado,
    mensajeError,
    erroresCampo,
    enviar,
    reiniciar,
  }
}

