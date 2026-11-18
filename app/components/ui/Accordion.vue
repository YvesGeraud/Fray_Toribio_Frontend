<script setup lang="ts">
import { computed, ref, useId, type Component } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

export interface AccordionItem {
  value: string
  title: string
  /** Texto simple; para contenido rico usa el slot #content-{value} o #content */
  content?: string
  icon?: Component
  disabled?: boolean
}

interface Props {
  items: AccordionItem[]
  /** single: solo uno abierto a la vez · multiple: varios */
  type?: 'single' | 'multiple'
  /** En modo single, permite cerrar el que está abierto */
  collapsible?: boolean
  variant?: 'default' | 'cards'
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'single',
  collapsible: true,
  variant: 'default',
})

// v-model: string (single) o string[] (multiple)
const model = defineModel<string | string[] | null>({ default: null })

defineSlots<
  { [K in `content-${string}`]?: (p: { item: AccordionItem }) => unknown } & {
    content?: (p: { item: AccordionItem }) => unknown
    title?: (p: { item: AccordionItem; open: boolean }) => unknown
  }
>()

const uid = useId()

const openSet = computed(() => {
  const v = model.value
  return new Set(Array.isArray(v) ? v : v ? [v] : [])
})
const isOpen = (value: string) => openSet.value.has(value)

const toggle = (item: AccordionItem) => {
  if (item.disabled) return
  const open = isOpen(item.value)
  if (props.type === 'multiple') {
    const next = new Set(openSet.value)
    if (open) {
      next.delete(item.value)
    } else {
      next.add(item.value)
    }
    model.value = [...next]
  } else {
    if (open && !props.collapsible) return
    model.value = open ? null : item.value
  }
}

// ---- Teclado: flechas arriba/abajo, Inicio, Fin entre encabezados ----
const headerRefs = ref<HTMLButtonElement[]>([])
const onKeydown = (e: KeyboardEvent, index: number) => {
  const enabledIdx = props.items.map((it, i) => (it.disabled ? -1 : i)).filter((i) => i >= 0)
  const pos = enabledIdx.indexOf(index)
  let target: number | undefined
  if (e.key === 'ArrowDown') target = enabledIdx[(pos + 1) % enabledIdx.length]
  else if (e.key === 'ArrowUp') target = enabledIdx[(pos - 1 + enabledIdx.length) % enabledIdx.length]
  else if (e.key === 'Home') target = enabledIdx[0]
  else if (e.key === 'End') target = enabledIdx[enabledIdx.length - 1]
  if (target === undefined) return
  e.preventDefault()
  headerRefs.value[target]?.focus()
}

const rootClass = computed(() =>
  cn(
    'w-full',
    props.variant === 'default' && 'divide-y divide-border border-y border-border',
    props.variant === 'cards' && 'space-y-3',
    props.class
  )
)
</script>

<template>
  <div :class="rootClass">
    <div
      v-for="(item, index) in items"
      :key="item.value"
      :class="[
        variant === 'cards' && [
          'rounded-xl border bg-card transition-colors',
          isOpen(item.value) ? 'border-primary/40 shadow-sm' : 'border-border',
        ],
      ]"
    >
      <h3 class="m-0">
        <button
          :id="`${uid}-h-${item.value}`"
          :ref="(el) => (headerRefs[index] = el as HTMLButtonElement)"
          type="button"
          :aria-expanded="isOpen(item.value)"
          :aria-controls="`${uid}-p-${item.value}`"
          :disabled="item.disabled"
          :class="[
            'group flex w-full items-center gap-3 text-left text-sm font-semibold text-foreground transition-colors cursor-pointer',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset',
            variant === 'cards' ? 'rounded-xl' : 'rounded-lg',
            'disabled:cursor-not-allowed disabled:opacity-50',
            variant === 'cards' ? 'px-5 py-4' : 'px-1 py-4 hover:text-primary',
          ]"
          @click="toggle(item)"
          @keydown="onKeydown($event, index)"
        >
          <component
            :is="item.icon"
            v-if="item.icon"
            :class="['h-4 w-4 shrink-0 transition-colors', isOpen(item.value) ? 'text-primary' : 'text-muted-foreground']"
          />
          <span class="flex-1">
            <slot name="title" :item="item" :open="isOpen(item.value)">{{ item.title }}</slot>
          </span>
          <ChevronDown
            :class="[
              'h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 motion-reduce:transition-none',
              isOpen(item.value) && 'rotate-180 text-primary',
            ]"
          />
        </button>
      </h3>

      <!-- grid 0fr → 1fr: anima a la altura real del contenido sin medir con JS -->
      <div
        :id="`${uid}-p-${item.value}`"
        role="region"
        :aria-labelledby="`${uid}-h-${item.value}`"
        :inert="!isOpen(item.value) || undefined"
        :class="[
          'grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none',
          isOpen(item.value) ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        ]"
      >
        <div class="overflow-hidden">
          <div
            :class="[
              'text-sm text-muted-foreground leading-relaxed',
              variant === 'cards' ? 'px-5 pb-5' : 'px-1 pb-4',
              item.icon && (variant === 'cards' ? 'pl-12' : 'pl-8'),
            ]"
          >
            <slot :name="`content-${item.value}`" :item="item">
              <slot name="content" :item="item">{{ item.content }}</slot>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
