<script setup lang="ts">
import { ref, computed } from 'vue'
import { Image as ImageIcon, Video, Maximize2 } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import Modal from '@/components/ui/Modal.vue'

interface MediaItem {
  id: string
  title: string
  category: 'campus' | 'academics' | 'sports' | 'events'
  type: 'image' | 'video'
  url: string
  date: string
}

const activeFilter = ref<string>('all')
const selectedMedia = ref<MediaItem | null>(null)
const isModalOpen = ref(false)

const items: MediaItem[] = [
  {
    id: '1',
    title: 'Laboratorio de Robótica y Computación',
    category: 'academics',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=800&q=80',
    date: 'Noviembre 2026',
  },
  {
    id: '2',
    title: 'Complejo Deportivo y Alberca Olímpica',
    category: 'sports',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&w=800&q=80',
    date: 'Octubre 2026',
  },
  {
    id: '3',
    title: 'Ceremonia de Graduación Generación XXXII',
    category: 'events',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    date: 'Julio 2026',
  },
  {
    id: '4',
    title: 'Biblioteca Central y Salas de Estudio Silencioso',
    category: 'campus',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
    date: 'Septiembre 2026',
  },
  {
    id: '5',
    title: 'Torneo Intercolegial de Fútbol y Atletismo',
    category: 'sports',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
    date: 'Mayo 2026',
  },
  {
    id: '6',
    title: 'Feria de Ciencias y Emprendimiento Juvenil',
    category: 'academics',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    date: 'Agosto 2026',
  },
]

const categories = [
  { id: 'all', label: 'Todos' },
  { id: 'campus', label: 'Instalaciones' },
  { id: 'academics', label: 'Academia & STEM' },
  { id: 'sports', label: 'Deportes' },
  { id: 'events', label: 'Eventos' },
]

const filteredItems = computed(() => {
  if (activeFilter.value === 'all') return items
  return items.filter(item => item.category === activeFilter.value)
})

const openPreview = (item: MediaItem) => {
  selectedMedia.value = item
  isModalOpen.value = true
}
</script>

<template>
  <div class="py-8 max-w-6xl mx-auto px-4">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
      <div>
        <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Galería Fotográfica & Multimedia
        </h2>
        <p class="text-sm text-muted-foreground mt-1">
          Un vistazo a la vida diaria, instalaciones y eventos de nuestra comunidad estudiantil.
        </p>
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap gap-1.5 p-1 bg-muted/60 rounded-xl border border-border">
        <button
          v-for="cat in categories"
          :key="cat.id"
          :class="[
            'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
            activeFilter === cat.id
              ? 'bg-card text-foreground shadow-xs'
              : 'text-muted-foreground hover:text-foreground'
          ]"
          @click="activeFilter = cat.id"
        >
          {{ cat.label }}
        </button>
      </div>
    </div>

    <!-- Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="item in filteredItems"
        :key="item.id"
        class="group relative rounded-2xl overflow-hidden border border-border bg-card shadow-xs transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
        @click="openPreview(item)"
      >
        <!-- Media Container -->
        <div class="aspect-[4/3] w-full overflow-hidden bg-muted relative">
          <img
            :src="item.url"
            :alt="item.title"
            class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

          <!-- Floating Badges -->
          <div class="absolute top-3 left-3 flex gap-2">
            <span class="inline-flex items-center gap-1 rounded-md bg-black/60 backdrop-blur-md px-2 py-0.5 text-[11px] font-medium text-white">
              <component :is="item.type === 'video' ? Video : ImageIcon" class="w-3 h-3" />
              {{ item.type === 'video' ? 'Video' : 'Foto' }}
            </span>
          </div>

          <div class="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <div class="h-8 w-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white">
              <Maximize2 class="w-4 h-4" />
            </div>
          </div>

          <!-- Bottom Text on Card -->
          <div class="absolute bottom-3 inset-x-3 text-white">
            <p class="text-xs text-white/70">{{ item.date }}</p>
            <h4 class="text-sm font-semibold text-white leading-snug line-clamp-2 mt-0.5">
              {{ item.title }}
            </h4>
          </div>
        </div>
      </div>
    </div>

    <!-- Preview Modal -->
    <Modal
      v-model="isModalOpen"
      :title="selectedMedia?.title"
      :description="selectedMedia?.date"
      size="lg"
    >
      <div v-if="selectedMedia" class="rounded-xl overflow-hidden bg-black/5 flex items-center justify-center">
        <img
          :src="selectedMedia.url"
          :alt="selectedMedia.title"
          class="max-h-[65vh] w-auto object-contain rounded-lg"
        />
      </div>
      <template #footer>
        <Button variant="outline" size="sm" @click="isModalOpen = false">Cerrar</Button>
      </template>
    </Modal>
  </div>
</template>

