<script setup lang="ts">
import type { Component } from 'vue'
import { Calendar, Award, Building, Sparkles } from 'lucide-vue-next'
import Badge from '@/components/ui/Badge.vue'

interface Milestone {
  year: string
  title: string
  description: string
  icon: Component
  tag?: string
}

const milestones: Milestone[] = [
  {
    year: '1991',
    title: 'Fundación del Colegio',
    description: 'Iniciamos con una sede inicial de educación básica, guiados por el compromiso de brindar una enseñanza con rigor académico y calidez humana.',
    icon: Building,
    tag: 'Origen',
  },
  {
    year: '2004',
    title: 'Acreditación Bilingüe Internacional',
    description: 'Adopción del modelo de inmersión total en inglés y certificación por la Universidad de Cambridge.',
    icon: Award,
    tag: 'Academia',
  },
  {
    year: '2015',
    title: 'Inauguración del Campus de Ciencias y Deportes',
    description: 'Apertura de la nueva pista atlética, alberca semiolímpica y centro de cómputo y robótica avanzada.',
    icon: Sparkles,
    tag: 'Infraestructura',
  },
  {
    year: '2024',
    title: 'Transformación Digital y Robótica',
    description: 'Integración de metodologías activas STEM, aulas interactivas y laboratorio de innovación tecnológica.',
    icon: Calendar,
    tag: 'Actualidad',
  },
]
</script>

<template>
  <div class="py-12 max-w-4xl mx-auto px-4">
    <div class="text-center mb-12">
      <Badge variant="accent" class="mb-3">Nuestra Trayectoria</Badge>
      <h2 class="text-3xl font-bold tracking-tight text-foreground">
        Más de Tres Décadas Construyendo Futuro
      </h2>
      <p class="mt-2 text-muted-foreground text-sm max-w-xl mx-auto">
        Conoce los hitos más emblemáticos que han forjado el prestigio y la identidad de nuestra comunidad educativa.
      </p>
    </div>

    <div class="relative border-l-2 border-primary/20 ml-4 md:ml-32 space-y-10 pl-6 md:pl-8">
      <div
        v-for="(item, index) in milestones"
        :key="index"
        class="relative group"
      >
        <!-- Circle Pin on the line -->
        <div class="absolute -left-[35px] md:-left-[43px] top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-card border-2 border-primary text-primary shadow-xs transition-transform duration-200 group-hover:scale-125 group-hover:bg-primary group-hover:text-primary-foreground">
          <component :is="item.icon" class="w-3.5 h-3.5" />
        </div>

        <!-- Year Badge for desktop left placement -->
        <div class="hidden md:block absolute -left-36 top-1 text-right w-24">
          <span class="text-lg font-extrabold text-primary font-mono">{{ item.year }}</span>
        </div>

        <!-- Content Card -->
        <div class="rounded-xl border border-border bg-card p-5 shadow-xs transition-all duration-200 group-hover:border-primary/40 group-hover:shadow-md">
          <div class="flex items-center justify-between gap-2 mb-1.5">
            <span class="md:hidden text-xs font-bold text-primary font-mono bg-primary/10 px-2 py-0.5 rounded">
              {{ item.year }}
            </span>
            <h3 class="text-base font-bold text-foreground">{{ item.title }}</h3>
            <Badge v-if="item.tag" variant="secondary" class="text-[10px]">{{ item.tag }}</Badge>
          </div>
          <p class="text-sm text-muted-foreground leading-relaxed mt-1">
            {{ item.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

