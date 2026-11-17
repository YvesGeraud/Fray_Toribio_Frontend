<script setup lang="ts">
import CarouselBanner, { type SlideItem } from '~/components/blocks/CarouselBanner.vue'
import ContentSplitSection from '~/components/blocks/ContentSplitSection.vue'

useSeoMeta({
  title: 'Inicio | Colegio Fray Toribio de Benavente',
  description: 'Conoce el Colegio Fray Toribio de Benavente en Xicohtzinco, Tlaxcala. Secundaria General, vida escolar e información para familias.',
})

const slidesAvisos: SlideItem[] = [
  {
    id: 's1',
    badge: 'Convocatoria Abierta',
    title: 'Proceso de Admisiones Ciclo 2026 - 2027',
    subtitle: 'Acompañamos a tu familia en el registro, documentación y recorrido guiado por las instalaciones de la secundaria.',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80',
    ctaText: 'Ver requisitos de admisión',
    ctaLink: '/admisiones',
  },
  {
    id: 's2',
    badge: 'Formación Integral',
    title: 'Talleres Científicos y Expresión Artística',
    subtitle: 'Fomentamos el pensamiento crítico, la curiosidad científica y el desarrollo humano de cada estudiante.',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=80',
    ctaText: 'Explorar oferta educativa',
    ctaLink: '/oferta-educativa',
  },
  {
    id: 's3',
    badge: 'Comunidad Escolar',
    title: 'Vida estudiantil y actividades cívico-deportivas',
    subtitle: 'Espacios de convivencia sana, proyectos colaborativos y disciplina formativa en Xicohtzinco, Tlaxcala.',
    imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1600&q=80',
    ctaText: 'Conocer vida escolar',
    ctaLink: '/vida-escolar',
  },
]

const schoolFeatures = [
  'Acompañamiento tutorial continuo y orientación psicopedagógica.',
  'Laboratorio de ciencias, cómputo y espacios cívicos adecuados.',
  'Formación con valores cívicos, disciplina formativa y respeto mutuo.',
  'Comunicación y vinculación constante con madres y padres de familia.',
]

const pillars = [
  { icon: 'i-lucide-book-open-check', title: 'Aprendizaje', text: 'Una etapa clave para desarrollar conocimientos, criterio y confianza.' },
  { icon: 'i-lucide-heart-handshake', title: 'Formación humana', text: 'Acompañamiento para crecer con respeto, responsabilidad y comunidad.' },
  { icon: 'i-lucide-users-round', title: 'Comunidad escolar', text: 'Un entorno donde escuela y familia colaboran en el desarrollo adolescente.' },
]
</script>

<template>
  <main>
    <!-- Hero Principal Full-Width perfectamente alineado con las páginas internas -->
    <section class="w-full bg-[#f4f7fa] border-b border-[#e5ebf2] transition-colors duration-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <!-- Columna izquierda: Información institucional -->
        <div class="space-y-5">
          <p class="eyebrow !mb-2">
            <span class="eyebrow-rule" />
            Colegio Fray Toribio de Benavente
          </p>

          <h1 class="text-4xl sm:text-5xl lg:text-[3.5rem] font-normal tracking-tight text-[#12396d] font-serif leading-[1.05]">
            Aprender hoy.<br>
            <em class="italic text-[#38669e]">Construir</em> el mañana.
          </h1>

          <p class="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
            Una comunidad educativa que acompaña a las y los jóvenes en una etapa decisiva de su formación con valores, excelencia académica y sentido humano.
          </p>

          <!-- Características clave -->
          <ul class="space-y-2 pt-1 text-sm font-medium text-slate-700">
            <li class="flex items-center gap-2.5">
              <UIcon name="i-lucide-check-circle-2" class="size-4 text-primary shrink-0" />
              <span>Secundaria General · CCT 29PES0084Y</span>
            </li>
            <li class="flex items-center gap-2.5">
              <UIcon name="i-lucide-check-circle-2" class="size-4 text-primary shrink-0" />
              <span>Formación académica y humana en Xicohtzinco, Tlaxcala</span>
            </li>
            <li class="flex items-center gap-2.5">
              <UIcon name="i-lucide-check-circle-2" class="size-4 text-primary shrink-0" />
              <span>Acompañamiento cercano para el desarrollo adolescente</span>
            </li>
          </ul>

          <div class="pt-3 flex flex-wrap items-center gap-4">
            <UButton
              to="/oferta-educativa"
              color="primary"
              size="lg"
              trailing-icon="i-lucide-arrow-right"
              class="shadow-md shadow-blue-900/10"
            >
              Conoce la secundaria
            </UButton>

            <UButton
              to="/admisiones"
              color="neutral"
              variant="outline"
              size="lg"
              trailing-icon="i-lucide-arrow-up-right"
            >
              Información de admisiones
            </UButton>
          </div>
        </div>

        <!-- Columna derecha: Foto destacada con sello -->
        <div class="relative">
          <div class="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl bg-white aspect-[4/3] group">
            <img
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src="https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1400&q=85"
              alt="Estudiantes conviviendo en un entorno escolar"
              fetchpriority="high"
            >
            <span class="hero-index">EDUCACIÓN · COMUNIDAD · FUTURO</span>
            <div class="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl sm:rounded-3xl pointer-events-none" />
          </div>

          <div class="absolute -bottom-4 -left-3 sm:bottom-4 sm:left-4 bg-white/95 backdrop-blur-md border border-slate-200/90 p-3 sm:p-4 rounded-xl shadow-xl flex items-center gap-3 max-w-[280px] sm:max-w-xs transition-transform duration-300 hover:translate-y-[-2px]">
            <img
              class="w-11 h-11 sm:w-13 sm:h-13 object-contain rounded-md shrink-0"
              src="/images/escudo.jpeg"
              alt="Escudo oficial del Colegio Fray Toribio de Benavente"
              width="52"
              height="52"
            >
            <div class="flex flex-col">
              <strong class="font-serif text-xs sm:text-sm font-bold text-[#12396d] leading-snug">
                Secundaria General
              </strong>
              <small class="text-[9px] sm:text-[10px] text-slate-500 font-medium tracking-wide">
                Xicohtzinco, Tlaxcala · CCT 29PES0084Y
              </small>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Banda de aviso institucional -->
    <section class="notice-band" aria-label="Aviso para familias">
      <span class="notice-icon"><UIcon name="i-lucide-bell" class="size-5" /></span>
      <div>
        <strong>Información para familias</strong>
        <p>Consulta los detalles vigentes de admisión y atención directamente con el colegio.</p>
      </div>
      <UButton to="/admisiones" color="neutral" variant="outline" trailing-icon="i-lucide-arrow-right">
        Ver admisiones
      </UButton>
    </section>

    <!-- Carrusel de Convocatorias y Avisos (Componente Estructural: CarouselBanner) -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 border-b border-slate-200/80">
      <div class="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <p class="eyebrow !mb-1">
            <span class="eyebrow-rule" />
            COMUNICADOS Y ACTIVIDADES
          </p>
          <h2 class="text-2xl sm:text-3xl font-serif font-bold text-[#12396d]">
            Vida y actualidad en la secundaria
          </h2>
        </div>
        <NuxtLink to="/vida-escolar" class="text-sm font-semibold text-[#174789] hover:underline inline-flex items-center gap-1.5">
          <span>Ver todas las novedades</span>
          <UIcon name="i-lucide-arrow-right" class="size-4" />
        </NuxtLink>
      </div>

      <CarouselBanner :slides="slidesAvisos" :autoplay="true" :interval="6000" />
    </section>

    <!-- Bloque Estructural: ContentSplitSection (Nuestra Escuela) -->
    <ContentSplitSection
      badge="NUESTRA ESCUELA"
      title="Una secundaria para crecer con propósito."
      subtitle="El Colegio Fray Toribio de Benavente ofrece educación secundaria general en Xicohtzinco. En este portal, las familias pueden conocer la identidad de la institución, su propuesta educativa y las vías de contacto directo."
      :features="schoolFeatures"
      image-src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=80"
      image-alt="Alumnos en clase participativa en Colegio Fray Toribio"
    >
      <template #actions>
        <UButton to="/el-colegio" color="neutral" size="md" trailing-icon="i-lucide-arrow-right">
          Conoce más del colegio
        </UButton>
        <UButton to="/contacto" variant="outline" color="neutral" size="md">
          Contáctanos
        </UButton>
      </template>
    </ContentSplitSection>

    <section class="pillars-section">
      <div class="section-heading-row">
        <div><p class="section-label">LO QUE NOS GUÍA</p><h2>Formación con bases<br><em>para la vida.</em></h2></div>
        <p class="section-intro">Una etapa para fortalecer aprendizajes, identidad y vínculos de comunidad.</p>
      </div>
      <div class="pillar-grid">
        <RevealContent v-for="(pillar, index) in pillars" :key="pillar.title" class="pillar-card" :delay="index * 100">
          <span class="pillar-icon"><UIcon :name="pillar.icon" class="size-5" /></span>
          <span class="pillar-number">0{{ index + 1 }}</span>
          <h3>{{ pillar.title }}</h3><p>{{ pillar.text }}</p>
        </RevealContent>
      </div>
    </section>

    <!-- Bloque Estructural: ContentSplitSection Invertido (Vida Escolar) -->
    <ContentSplitSection
      :reverse="true"
      badge="VIDA ESCOLAR"
      title="La escuela también se construye juntos."
      subtitle="Noticias, eventos y proyectos colaborativos de la comunidad escolar para fortalecer el compañerismo y el sentido cívico."
      :features="[
        'Actividades cívicas, torneos deportivos y conmemoraciones patrias.',
        'Muestras pedagógicas y proyectos de ciencias en equipo.',
        'Participación activa y coordinada con las familias de Xicohtzinco.'
      ]"
      image-src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85"
      image-alt="Actividades dinámicas en el colegio"
      class="bg-slate-50/70 border-y border-slate-200/80 my-8"
    >
      <template #actions>
        <UButton to="/vida-escolar" color="neutral" variant="outline" trailing-icon="i-lucide-arrow-right">
          Explora la galería y vida escolar
        </UButton>
      </template>
    </ContentSplitSection>

    <section class="admissions-cta">
      <div><p class="section-label section-label-light">ADMISIONES</p><h2>¿Buscas secundaria<br>para tu familia?</h2><p>Solicita información oficial sobre requisitos, fechas y proceso de ingreso.</p></div>
      <UButton to="/admisiones" color="neutral" size="lg" trailing-icon="i-lucide-arrow-right">Conoce el proceso</UButton>
    </section>
  </main>
</template>
