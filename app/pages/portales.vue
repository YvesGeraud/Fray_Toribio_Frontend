<script setup lang="ts">
import { portalesEscolares } from '~/data/portales.datos'
import Accordion, { type AccordionItem } from '~/components/ui/Accordion.vue'
import Button from '~/components/ui/Button.vue'
import Badge from '~/components/ui/Badge.vue'

useSeoMeta({
  title: 'Portales y Plataformas Escolares | Colegio Fray Toribio de Benavente',
  description: 'Accesos directos al sistema de control escolar ServoEscolar, la plataforma de enseñanza Suite AMCO y la tienda oficial de libros y licencias.',
})

const faqItems: AccordionItem[] = [
  {
    value: 'acceso-control-escolar',
    title: '¿Cómo obtengo mi usuario y contraseña para el Control Escolar (ServoEscolar)?',
    content: 'Las claves de acceso son entregadas por la dirección escolar al formalizar la inscripción de la o el estudiante. Si eres de nuevo ingreso o no cuentas con tus accesos, solicítalos en las oficinas administrativas del colegio con tu identificación oficial.',
  },
  {
    value: 'acceso-suite-amco',
    title: '¿Quién debe ingresar a Suite AMCO y desde qué dispositivos?',
    content: 'Suite AMCO está diseñada para el uso diario de las y los alumnos y profesores. Se puede ingresar desde cualquier navegador web moderno en computadoras, laptops o tablets, utilizando la cuenta de correo o usuario institucional asignado al inicio del ciclo escolar.',
  },
  {
    value: 'compra-libros',
    title: '¿Cómo realizar la compra de libros en compradelibros.amco.me?',
    content: 'Ingresa al portal oficial de compra, selecciona el estado de Tlaxcala y busca el Colegio Fray Toribio de Benavente. Elige el grado escolar que cursará el alumno para desplegar el paquete correspondiente. Puedes pagar en línea de forma segura o generar ficha de depósito.',
  },
  {
    value: 'soporte-tecnico',
    title: '¿Qué hacer si una plataforma no me permite ingresar o marca error?',
    content: 'Verifica que estés escribiendo tu usuario y contraseña sin espacios adicionales al inicio o al final. Si el problema persiste, comunícate con la coordinación administrativa del colegio o envía un mensaje vía nuestro formulario de contacto para canalizar tu caso.',
  },
]
</script>

<template>
  <main class="bg-slate-50/50 pb-20">
    <!-- Hero de la Sección de Portales -->
    <section class="w-full bg-[#f4f7fa] border-b border-[#e5ebf2] py-12 lg:py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Migas de pan" class="mb-4">
          <ol class="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <li>
              <NuxtLink to="/" class="hover:text-primary transition-colors">Inicio</NuxtLink>
            </li>
            <li class="opacity-50">/</li>
            <li class="text-slate-800 font-semibold" aria-current="page">Portales escolares</li>
          </ol>
        </nav>

        <div class="max-w-3xl space-y-4">
          <p class="eyebrow !mb-2">
            <span class="eyebrow-rule" />
            SERVICIOS Y PLATAFORMAS DIGITALES
          </p>
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#12396d] leading-tight">
            Portales y herramientas para nuestra comunidad
          </h1>
          <p class="text-base sm:text-lg text-slate-600 leading-relaxed">
            Acceso directo y centralizado a los sistemas oficiales de control escolar, plataformas de enseñanza bilingüe y tienda de adquisición de materiales para el ciclo escolar.
          </p>
        </div>
      </div>
    </section>

    <!-- Listado detallado de los 3 Portales -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <article
        v-for="(portal, index) in portalesEscolares"
        :key="portal.id"
        class="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 transition-all duration-300 hover:shadow-lg"
      >
        <!-- Columna de Imagen / Previsualización (5 cols) -->
        <div :class="['lg:col-span-5 relative overflow-hidden bg-slate-100 aspect-[16/10] lg:aspect-auto min-h-[260px]', index % 2 === 1 ? 'lg:order-2' : 'lg:order-1']">
          <img
            :src="portal.imagen"
            :alt="portal.imagenAlt"
            class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          <div class="absolute top-4 left-4">
            <Badge variant="accent" class="shadow-sm">
              {{ portal.badge }}
            </Badge>
          </div>
          <div class="absolute bottom-4 left-4 right-4 text-white">
            <span class="text-xs font-semibold tracking-wider uppercase text-amber-200/90">
              {{ portal.categoria }}
            </span>
          </div>
        </div>

        <!-- Columna de Información e Instrucciones (7 cols) -->
        <div :class="['lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6', index % 2 === 1 ? 'lg:order-1' : 'lg:order-2']">
          <div class="space-y-4">
            <div class="space-y-1">
              <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Plataforma Oficial #0{{ index + 1 }}</span>
              <h2 class="text-2xl sm:text-3xl font-serif font-bold text-[#12396d] leading-snug">
                {{ portal.titulo }}
              </h2>
              <p class="text-sm font-semibold text-slate-500">
                {{ portal.subtitulo }}
              </p>
            </div>

            <p class="text-sm sm:text-base text-slate-600 leading-relaxed">
              {{ portal.descripcion }}
            </p>

            <!-- Lista de consideraciones importantes -->
            <div v-if="portal.indicaciones?.length" class="pt-2">
              <h3 class="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
                Indicaciones clave para el acceso:
              </h3>
              <ul class="space-y-2 text-xs sm:text-sm text-slate-600">
                <li v-for="(ind, i) in portal.indicaciones" :key="i" class="flex items-start gap-2.5">
                  <UIcon name="i-lucide-check-circle-2" class="size-4 text-primary shrink-0 mt-0.5" />
                  <span>{{ ind }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Botón de Acción y URL visible -->
          <div class="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div class="min-w-0">
              <span class="block text-[11px] text-slate-400 font-medium">Enlace institucional:</span>
              <code class="text-xs font-mono text-slate-700 truncate block max-w-xs sm:max-w-sm">
                {{ portal.url }}
              </code>
            </div>

            <Button
              :href="portal.url"
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              class="w-full sm:w-auto shrink-0 shadow-md shadow-primary/25"
            >
              <span>{{ portal.textoEnlace }}</span>
              <UIcon name="i-lucide-external-link" class="size-4" />
            </Button>
          </div>
        </div>
      </article>

      <!-- Sección de Preguntas Frecuentes con Accordion -->
      <section class="mt-16 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/90 shadow-sm max-w-4xl mx-auto">
        <div class="text-center max-w-xl mx-auto mb-8 space-y-2">
          <p class="eyebrow !mb-1">
            <span class="eyebrow-rule" />
            RESOLUCIÓN DE DUDAS
          </p>
          <h2 class="text-2xl sm:text-3xl font-serif font-bold text-[#12396d]">
            Preguntas frecuentes sobre los portales
          </h2>
          <p class="text-sm text-slate-500">
            Conoce los pasos de ingreso, cómo obtener tus accesos y las recomendaciones para el uso de cada herramienta.
          </p>
        </div>

        <Accordion :items="faqItems" type="single" variant="cards" />

        <div class="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <strong class="text-sm font-bold text-slate-800">¿Tienes dudas adicionales o necesitas restablecer tu contraseña?</strong>
            <p class="text-xs text-slate-500">Contáctanos directamente en la coordinación del colegio o envíanos un mensaje.</p>
          </div>
          <UButton to="/contacto" color="neutral" variant="outline" trailing-icon="i-lucide-arrow-right">
            Contactar al colegio
          </UButton>
        </div>
      </section>
    </div>
  </main>
</template>

