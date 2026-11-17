<script setup lang="ts">
const {
  formulario,
  enviando,
  enviado,
  mensajeError,
  erroresCampo,
  enviar,
  reiniciar,
} = useFormularioContacto()
</script>

<template>
  <section id="formulario" class="contact-form-section">
    <div class="contact-form-intro">
      <p class="section-label">SOLICITA INFORMES</p>
      <h2>Cuéntanos qué necesitas.</h2>
      <p>Completa tus datos para preparar tu solicitud de información.</p>
    </div>

    <form v-if="!enviado" class="school-form" @submit.prevent="enviar">
      <label>
        Nombre de madre, padre o tutor
        <input
          v-model="formulario.nombre"
          name="nombre"
          autocomplete="name"
          required
          placeholder="Nombre completo"
        >
        <span v-if="erroresCampo.nombre" class="text-xs text-red-500">{{ erroresCampo.nombre[0] }}</span>
      </label>

      <label>
        Correo electrónico
        <input
          v-model="formulario.correo"
          name="correo"
          type="email"
          autocomplete="email"
          required
          placeholder="nombre@correo.com"
        >
        <span v-if="erroresCampo.correo" class="text-xs text-red-500">{{ erroresCampo.correo[0] }}</span>
      </label>

      <label>
        Teléfono de contacto
        <input
          v-model="formulario.telefono"
          name="telefono"
          type="tel"
          autocomplete="tel"
          required
          placeholder="Número telefónico"
        >
        <span v-if="erroresCampo.telefono" class="text-xs text-red-500">{{ erroresCampo.telefono[0] }}</span>
      </label>

      <label>
        Mensaje
        <textarea
          v-model="formulario.mensaje"
          name="mensaje"
          rows="4"
          placeholder="¿Qué información deseas recibir?"
        />
        <span v-if="erroresCampo.mensaje" class="text-xs text-red-500">{{ erroresCampo.mensaje[0] }}</span>
      </label>

      <div v-if="mensajeError" class="col-span-full text-sm text-red-600">
        {{ mensajeError }}
      </div>

      <UButton
        type="submit"
        color="primary"
        size="lg"
        :loading="enviando"
        trailing-icon="i-lucide-send"
      >
        Preparar solicitud
      </UButton>

      <small>Prototipo visual: el envío a correo institucional se habilitará al confirmar la dirección oficial.</small>
    </form>

    <div v-else class="form-confirmation" role="status">
      <UIcon name="i-lucide-circle-check" class="size-8" />
      <h3>Solicitud preparada</h3>
      <p>El formulario todavía no envía correo. La escuela deberá conectar su dirección institucional para recibir las solicitudes.</p>
      <button type="button" class="underlined-link" @click="reiniciar">
        Volver al formulario
      </button>
    </div>
  </section>
</template>

