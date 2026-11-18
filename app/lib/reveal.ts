/**
 * Motor de animaciones al hacer scroll (lo usan <Reveal> y v-reveal).
 *
 * - Sin dependencias: transiciones CSS por estilos en línea (no requiere CSS global ni Tailwind).
 * - Un IntersectionObserver compartido por configuración, no uno por elemento.
 * - prefers-reduced-motion: no oculta ni anima nada.
 * - Sin JavaScript (o en SSR antes de hidratar) el contenido se ve normal: solo se oculta en el cliente.
 * - Antes de imprimir revela todo, para que no salgan huecos en papel/PDF.
 */

export type RevealAnimation = 'fade' | 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom' | 'blur'

export interface RevealOptions {
  animation?: RevealAnimation
  /** ms antes de empezar */
  delay?: number
  /** ms de la transición */
  duration?: number
  /** px de desplazamiento para fade-up/down/left/right */
  distance?: number
  /** ms entre hijos (anima cada hijo directo en secuencia); 0 = el elemento completo */
  stagger?: number
  /** true = solo la primera vez; false = se oculta al salir y vuelve a animar al entrar */
  once?: boolean
  /** Fracción visible necesaria para disparar (0–1) */
  threshold?: number
  /** Margen del área de detección (por defecto dispara un poco antes del borde inferior) */
  rootMargin?: string
  easing?: string
}

const DEFAULTS: Required<RevealOptions> = {
  animation: 'fade-up',
  delay: 0,
  duration: 700,
  distance: 32,
  stagger: 0,
  once: true,
  threshold: 0.12,
  rootMargin: '0px 0px -8% 0px',
  easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
}

const isBrowser = typeof window !== 'undefined'
const prefersReducedMotion = () => isBrowser && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// ---- Observadores compartidos ----
type Callback = (visible: boolean) => void
const observers = new Map<string, { io: IntersectionObserver; callbacks: Map<Element, Callback> }>()

function observe(el: Element, threshold: number, rootMargin: string, cb: Callback) {
  const key = `${threshold}|${rootMargin}`
  let entry = observers.get(key)
  if (!entry) {
    const callbacks = new Map<Element, Callback>()
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => callbacks.get(e.target)?.(e.isIntersecting)),
      { threshold, rootMargin }
    )
    entry = { io, callbacks }
    observers.set(key, entry)
  }
  entry.callbacks.set(el, cb)
  entry.io.observe(el)
  return () => {
    entry!.io.unobserve(el)
    entry!.callbacks.delete(el)
  }
}

// ---- Imprimir: revelar todo ----
const pending = new Set<() => void>()
if (isBrowser) window.addEventListener('beforeprint', () => pending.forEach((show) => show()))

// ---- Estados ----
const hiddenTransform = (o: Required<RevealOptions>) => {
  const d = o.distance
  switch (o.animation) {
    case 'fade-up': return `translate3d(0, ${d}px, 0)`
    case 'fade-down': return `translate3d(0, ${-d}px, 0)`
    case 'fade-left': return `translate3d(${-d}px, 0, 0)` // entra desde la izquierda
    case 'fade-right': return `translate3d(${d}px, 0, 0)` // entra desde la derecha
    case 'zoom': return 'scale(0.94)'
    default: return ''
  }
}

function hide(el: HTMLElement, o: Required<RevealOptions>, delay: number) {
  el.style.transition = 'none'
  el.style.opacity = '0'
  el.style.transform = hiddenTransform(o)
  if (o.animation === 'blur') el.style.filter = 'blur(10px)'
  el.style.willChange = 'opacity, transform'
  // fuerza el estado inicial antes de definir la transición
  void el.offsetWidth
  const t = `${o.duration}ms ${o.easing} ${delay}ms`
  el.style.transition = `opacity ${t}, transform ${t}, filter ${t}`
}

function show(el: HTMLElement) {
  el.style.opacity = ''
  el.style.transform = ''
  el.style.filter = ''
  const done = (e: TransitionEvent) => {
    // transitionend también burbujea desde los hijos (hover de una tarjeta, etc.)
    if (e.target !== el) return
    el.style.willChange = ''
    el.style.transition = ''
    el.removeEventListener('transitionend', done)
  }
  el.addEventListener('transitionend', done)
}

function reset(el: HTMLElement) {
  el.style.opacity = ''
  el.style.transform = ''
  el.style.filter = ''
  el.style.transition = ''
  el.style.willChange = ''
}

/**
 * Prepara `el` (o sus hijos directos si `stagger > 0`) y lo revela al entrar en pantalla.
 * Devuelve una función de limpieza.
 */
export function reveal(el: HTMLElement, options: RevealOptions = {}): () => void {
  if (!isBrowser || prefersReducedMotion() || !('IntersectionObserver' in window)) return () => {}
  const o = { ...DEFAULTS, ...options }

  const targets = () => (o.stagger > 0 ? (Array.from(el.children) as HTMLElement[]) : [el])
  let revealed = false

  const hideAll = () => targets().forEach((t, i) => hide(t, o, o.delay + i * o.stagger))
  const showAll = () => {
    revealed = true
    targets().forEach(show)
  }

  hideAll()
  pending.add(showAll)

  const stop = observe(el, o.threshold, o.rootMargin, (visible) => {
    if (visible && !revealed) {
      showAll()
      if (o.once) {
        stop()
        pending.delete(showAll)
      }
    } else if (!visible && revealed && !o.once) {
      revealed = false
      hideAll()
    }
  })

  return () => {
    stop()
    pending.delete(showAll)
    targets().forEach(reset)
  }
}
