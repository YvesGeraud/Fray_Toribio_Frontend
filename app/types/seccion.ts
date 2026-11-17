export interface TarjetaInfo {
  title: string
  text: string
  icon?: string
  image?: string
  badge?: string
  date?: string
}

export interface GaleriaItem {
  id: string
  imageUrl: string
  title: string
  category: string
}

export interface PaginaSeccion {
  slug?: string
  nav: string
  eyebrow: string
  title: string
  lead: string
  image: string
  imageAlt: string
  cards: TarjetaInfo[]
  note?: string
  galeria?: GaleriaItem[]
}

/**
 * Estructura estándar para respuestas tipo Laravel API Resource
 * ej: return response()->json(['data' => $seccion]);
 */
export interface RespuestaApiLaravel<T> {
  data: T
  message?: string
}
