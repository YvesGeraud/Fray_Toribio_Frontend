<script setup lang="ts">
import { ref } from 'vue'
import { UploadCloud, CheckCircle2, FileText, Trash2, Shield, AlertCircle } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import Badge from '@/components/ui/Badge.vue'

interface UploadedFile {
  id: string
  name: string
  size: string
  type: string
  status: 'ready' | 'uploading' | 'error'
  progress: number
  date: string
}

const isDragging = ref(false)
const title = ref('')
const category = ref('campus')

const uploadedFiles = ref<UploadedFile[]>([
  {
    id: 'f1',
    name: 'laboratorio-quimica-prepa.jpg',
    size: '2.4 MB',
    type: 'image/jpeg',
    status: 'ready',
    progress: 100,
    date: 'Hace 10 minutos',
  },
  {
    id: 'f2',
    name: 'himno-institucional-concierto.mp4',
    size: '48.1 MB',
    type: 'video/mp4',
    status: 'ready',
    progress: 100,
    date: 'Ayer, 16:30',
  },
])

const handleDrop = (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = false
  if (e.dataTransfer?.files) {
    addFiles(e.dataTransfer.files)
  }
}

const handleFileSelect = (e: Event) => {
  const input = e.target as HTMLInputElement
  if (input.files) {
    addFiles(input.files)
  }
}

const addFiles = (files: FileList) => {
  Array.from(files).forEach((file, idx) => {
    const sizeInMb = (file.size / (1024 * 1024)).toFixed(1) + ' MB'
    uploadedFiles.value.unshift({
      id: 'file-' + Date.now() + '-' + idx,
      name: file.name,
      size: sizeInMb,
      type: file.type,
      status: 'ready',
      progress: 100,
      date: 'Recién subido',
    })
  })
}

const removeFile = (id: string) => {
  uploadedFiles.value = uploadedFiles.value.filter(f => f.id !== id)
}
</script>

<template>
  <div class="py-8 max-w-5xl mx-auto px-4">
    <!-- Top Security & Admin Notice -->
    <div class="mb-6 flex items-center justify-between p-4 rounded-xl bg-card border border-border">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
          <Shield class="w-5 h-5" />
        </div>
        <div>
          <h2 class="text-base font-bold text-foreground">Panel Administrable: Gestión de Contenido Multimedia</h2>
          <p class="text-xs text-muted-foreground">Sesión autenticada como: Coordinación de Comunicación Institucional</p>
        </div>
      </div>
      <Badge variant="success" class="flex items-center gap-1">
        <CheckCircle2 class="w-3.5 h-3.5" /> Servidor Seguro SSL
      </Badge>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Upload Box & Metadata (2 cols) -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Form info -->
        <div class="p-6 rounded-2xl bg-card border border-border shadow-xs space-y-4">
          <h3 class="text-sm font-bold uppercase tracking-wider text-muted-foreground">
            1. Detalles de la Publicación
          </h3>

          <Input
            v-model="title"
            label="Título de la Foto / Video o Noticia"
            placeholder="Ej: Inauguración de la Pista Atlética 2026"
          />

          <div class="space-y-1.5">
            <label class="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Categoría Institucional
            </label>
            <select
              v-model="category"
              class="w-full h-10 rounded-lg border border-border bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-xs"
            >
              <option value="campus">Campus e Instalaciones</option>
              <option value="academics">Vida Académica y Robótica</option>
              <option value="sports">Deportes y Torneos</option>
              <option value="events">Eventos y Graduaciones</option>
            </select>
          </div>

          <!-- Drag and Drop Area -->
          <div class="pt-2">
            <h3 class="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2">
              2. Archivos Multimedia
            </h3>
            <div
              :class="[
                'border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer relative',
                isDragging
                  ? 'border-primary bg-primary/5 scale-[0.99]'
                  : 'border-border hover:border-primary/50 hover:bg-muted/40'
              ]"
              @dragover.prevent="isDragging = true"
              @dragleave.prevent="isDragging = false"
              @drop="handleDrop"
            >
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                class="absolute inset-0 opacity-0 cursor-pointer"
                @change="handleFileSelect"
              />
              <div class="mx-auto w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3">
                <UploadCloud class="w-6 h-6" />
              </div>
              <p class="text-sm font-semibold text-foreground">
                Haz clic o arrastra fotos y videos aquí
              </p>
              <p class="text-xs text-muted-foreground mt-1">
                Soporta JPG, PNG, WEBP, MP4 hasta 100 MB por archivo
              </p>
            </div>
          </div>

          <div class="pt-4 flex justify-end gap-3">
            <Button variant="outline" size="md">Guardar Borrador</Button>
            <Button size="md">
              <CheckCircle2 class="w-4 h-4 mr-1.5" />
              Publicar Inmediatamente
            </Button>
          </div>
        </div>
      </div>

      <!-- Right: Current uploads list (1 col) -->
      <div class="space-y-4">
        <div class="p-6 rounded-2xl bg-card border border-border shadow-xs">
          <div class="flex items-center justify-between pb-3 border-b border-border/50">
            <h3 class="text-sm font-bold text-foreground">Archivos en Cola / Subidos</h3>
            <span class="text-xs font-mono text-muted-foreground">{{ uploadedFiles.length }} elementos</span>
          </div>

          <div class="divide-y divide-border/40 mt-3 max-h-[380px] overflow-y-auto">
            <div
              v-for="file in uploadedFiles"
              :key="file.id"
              class="py-3 flex items-start justify-between gap-3 group"
            >
              <div class="flex items-start gap-2.5 min-w-0">
                <div class="p-2 rounded-lg bg-muted text-muted-foreground mt-0.5">
                  <FileText class="w-4 h-4" />
                </div>
                <div class="min-w-0">
                  <p class="text-xs font-semibold text-foreground truncate max-w-[160px]" :title="file.name">
                    {{ file.name }}
                  </p>
                  <p class="text-[11px] text-muted-foreground flex items-center gap-1.5 mt-0.5">
                    <span>{{ file.size }}</span>
                    <span>•</span>
                    <span class="text-emerald-600 font-medium">Listo</span>
                  </p>
                </div>
              </div>

              <button
                class="text-muted-foreground hover:text-destructive p-1 rounded-md transition-colors opacity-60 group-hover:opacity-100"
                title="Eliminar archivo"
                @click="removeFile(file.id)"
              >
                <Trash2 class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <!-- Security Hint Box -->
        <div class="p-4 rounded-xl bg-muted/40 border border-border/60 text-xs text-muted-foreground flex gap-2.5 items-start">
          <AlertCircle class="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <p>
            Los archivos subidos se optimizan automáticamente en formato WebP y HLS para asegurar tiempos de carga ultra rápidos en dispositivos móviles.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

