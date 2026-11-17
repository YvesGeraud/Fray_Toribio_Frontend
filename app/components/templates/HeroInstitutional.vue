<script setup lang="ts">
import { ShieldCheck, ArrowRight, GraduationCap, Users, Award } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import GlowBadge from '@/components/bits/GlowBadge.vue'
import StatCounter from '@/components/bits/StatCounter.vue'
import SpotlightCard from '@/components/bits/SpotlightCard.vue'

defineEmits<{
  'explore': []
  'admissions': []
}>()
</script>

<template>
  <div class="relative overflow-hidden pt-8 pb-16">
    <!-- Subtle Institutional Background Decor -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-primary/5 via-primary/2 to-transparent -z-10 pointer-events-none rounded-b-[48px]" />

    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <!-- Top Badge -->
      <div class="flex justify-center mb-6">
        <GlowBadge
          status="active"
          text="Admisiones Abiertas Ciclo 2026 - 2027"
          subtext="Cupos Limitados"
        />
      </div>

      <!-- Main Headline -->
      <div class="text-center max-w-3xl mx-auto space-y-4">
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
          Formando Líderes con <br />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/90 to-primary/70">
            Excelencia y Valores
          </span>
        </h1>
        <p class="text-lg sm:text-xl text-muted-foreground leading-relaxed">
          Más de tres décadas impulsando el desarrollo integral, pensamiento crítico y bilingüismo en un entorno seguro, humano y vanguardista.
        </p>

        <!-- CTA Action Buttons -->
        <div class="pt-4 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" class="shadow-lg shadow-primary/20" @click="$emit('admissions')">
            <span>Iniciar Proceso de Admisión</span>
            <ArrowRight class="w-4 h-4 ml-1" />
          </Button>
          <Button variant="outline" size="lg" @click="$emit('explore')">
            <GraduationCap class="w-4 h-4 mr-1 text-primary" />
            <span>Oferta Académica</span>
          </Button>
        </div>

        <!-- Trust Badges -->
        <div class="pt-6 flex items-center justify-center gap-6 text-xs text-muted-foreground font-medium">
          <span class="flex items-center gap-1.5">
            <ShieldCheck class="w-4 h-4 text-primary" /> Acreditación Oficial SEP / IB
          </span>
          <span class="flex items-center gap-1.5">
            <Award class="w-4 h-4 text-accent" /> Certificación Cambridge English
          </span>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-card border border-border/80 shadow-xs">
        <StatCounter
          :target="35"
          suffix="+"
          label="Años de Historia"
          sublabel="Fundado en 1991"
        />
        <StatCounter
          :target="1450"
          label="Alumnos Activos"
          sublabel="Kínder a Preparatoria"
        />
        <StatCounter
          :target="99"
          suffix="%"
          label="Ingreso Universitario"
          sublabel="Primer intento nacional"
        />
        <StatCounter
          :target="100"
          suffix="%"
          label="Campus Seguro"
          sublabel="Protocolos certificados"
        />
      </div>

      <!-- 3 Pillars Spotlight Cards -->
      <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <SpotlightCard>
          <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
            <GraduationCap class="w-6 h-6" />
          </div>
          <h3 class="text-lg font-bold text-foreground">Excelencia Académica</h3>
          <p class="mt-2 text-sm text-muted-foreground leading-relaxed">
            Currícula internacional, robótica, laboratorios de ciencias y desarrollo de habilidades STEM desde temprana edad.
          </p>
        </SpotlightCard>

        <SpotlightCard>
          <div class="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center text-accent mb-4">
            <ShieldCheck class="w-6 h-6" />
          </div>
          <h3 class="text-lg font-bold text-foreground">Ambiente Seguro y Familiar</h3>
          <p class="mt-2 text-sm text-muted-foreground leading-relaxed">
            Instalaciones de acceso biométrico, monitoreo 24/7 y un departamento psicopedagógico cercano a cada alumno.
          </p>
        </SpotlightCard>

        <SpotlightCard>
          <div class="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-4">
            <Users class="w-6 h-6" />
          </div>
          <h3 class="text-lg font-bold text-foreground">Formación Humana</h3>
          <p class="mt-2 text-sm text-muted-foreground leading-relaxed">
            Programas de servicio comunitario, artes escénicas, deportes de alto rendimiento y fomento a la empatía social.
          </p>
        </SpotlightCard>
      </div>
    </div>
  </div>
</template>

