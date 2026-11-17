export interface DatosFormularioContacto {
  nombre: string
  correo: string
  telefono: string
  mensaje: string
}

export interface RespuestaFormularioContacto {
  exito: boolean
  mensaje: string
  errores?: Record<string, string[]>
}

