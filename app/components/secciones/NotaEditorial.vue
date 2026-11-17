<script setup lang="ts">
defineProps<{
  nota: string
}>()
</script>

<template>
  <div class="editorial-note">
    <UIcon name="i-lucide-info" class="size-5" />
    <p>{{ nota }}</p>
  </div>
</template>

