import { computed, getCurrentInstance, resolveComponent, type Component, type MaybeRefOrGetter, toValue } from 'vue'

export type LinkTo = string | Record<string, unknown>

/**
 * Resuelve qué elemento usar para un enlace según el entorno, sin warnings:
 *  - Nuxt: NuxtLink (Nuxt reescribe en build la llamada literal resolveComponent('NuxtLink')).
 *  - Vue + vue-router: RouterLink (registrado globalmente por el router).
 *  - Vue sin router: <a href>.
 *
 * Debe llamarse dentro de setup().
 */
export function useLinkComponent(): Component | null {
  const appContext = getCurrentInstance()?.appContext
  const isNuxt = !!appContext?.config.globalProperties.$nuxt
  return isNuxt
    ? (resolveComponent('NuxtLink') as Component)
    : ((appContext?.components.RouterLink as Component) ?? null)
}

/** Enlaces externos, anclas, mailto/tel: siempre <a href> */
export const isExternalLink = (link: string) => /^(https?:)?\/\/|^mailto:|^tel:|^#/.test(link)

/**
 * Versión sin estado para listas (tarjetas, menús, migas): recibe el componente de router ya resuelto
 * con useLinkComponent() y devuelve { is, attrs } para <component :is v-bind>. null si no hay destino.
 */
export function resolveLink(
  routerLink: Component | null,
  target: { to?: LinkTo; href?: string; target?: string; rel?: string }
): { is: string | Component; attrs: Record<string, unknown> } | null {
  const { to, href, target: explicitTarget, rel: explicitRel } = target
  if (!to && !href) return null
  const url = href ?? (to as string)
  const isExt = typeof url === 'string' && isExternalLink(url)
  if (to && !isExt && routerLink) return { is: routerLink, attrs: { to } }
  return {
    is: 'a',
    attrs: {
      href: url,
      ...(isExt || explicitTarget ? { target: explicitTarget ?? '_blank', rel: explicitRel ?? 'noopener noreferrer' } : {}),
    },
  }
}

/**
 * Dado `to` (ruta interna) y/o `href` (externo), devuelve el tag y los atributos a enlazar.
 * Si no hay ninguno, devuelve `fallback` (ej. 'button' o 'div').
 */
export function useLink(
  options: MaybeRefOrGetter<{ to?: LinkTo; href?: string; disabled?: boolean }>,
  fallback: string = 'div'
) {
  const routerLink = useLinkComponent()

  const isLink = computed(() => {
    const o = toValue(options)
    return !!(o.to || o.href)
  })

  const tag = computed<string | Component>(() => {
    const o = toValue(options)
    if (o.to && !(typeof o.to === 'string' && isExternalLink(o.to)) && routerLink) return routerLink
    if (o.to || o.href) return 'a'
    return fallback
  })

  const attrs = computed<Record<string, unknown>>(() => {
    const o = toValue(options)
    if (!isLink.value) return {}
    // Un <a> no tiene atributo disabled: se simula de forma accesible
    const disabledAttrs = o.disabled ? { 'aria-disabled': 'true', tabindex: -1 } : {}
    if (tag.value !== 'a') return { to: o.to, ...disabledAttrs }
    const href = o.href ?? (typeof o.to === 'string' ? o.to : undefined)
    const isExt = typeof href === 'string' && isExternalLink(href)
    return {
      href,
      ...(isExt ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
      ...disabledAttrs,
    }
  })

  return { tag, attrs, isLink }
}
