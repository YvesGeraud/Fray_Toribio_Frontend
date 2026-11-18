import type { Directive } from 'vue'
import { reveal, type RevealOptions, type RevealAnimation } from '@/lib/reveal'

/** `false` desactiva la animación (útil para props opcionales) */
type RevealBinding = RevealAnimation | RevealOptions | false | undefined

const cleanups = new WeakMap<HTMLElement, () => void>()

const toOptions = (value: Exclude<RevealBinding, false>): RevealOptions =>
  typeof value === 'string' ? { animation: value } : value ?? {}

/**
 * Anima un elemento (o componente) al entrar en pantalla, sin envolverlo en otro div.
 *
 *   <section v-reveal>…</section>
 *   <FeatureGrid v-reveal="'zoom'" … />
 *   <ul v-reveal="{ stagger: 80 }">…</ul>     ← cada <li> en secuencia
 *
 * Registro: en <script setup> basta con importar `vReveal`; global: app.directive('reveal', vReveal).
 */
export const vReveal: Directive<HTMLElement, RevealBinding> = {
  mounted(el, binding) {
    if (binding.value === false) return
    cleanups.set(el, reveal(el, toOptions(binding.value)))
  },
  unmounted(el) {
    cleanups.get(el)?.()
    cleanups.delete(el)
  },
  // SSR (Nuxt): no se oculta en el servidor → sin JS el contenido se ve normal
  getSSRProps: () => ({}),
}
