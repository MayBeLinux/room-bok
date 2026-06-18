<script setup lang="ts">
defineProps<{
  label: string
  selected?: boolean
}>()

defineEmits<{
  click: []
}>()
</script>

<template>
  <button
    type="button"
    class="inline-flex h-11 min-w-[140px] items-center justify-center overflow-clip border-b-2 border-solid px-6 font-space text-base whitespace-nowrap text-text-color transition-colors"
    :class="
      selected
        ? 'border-accent-green font-medium'
        : 'border-stroke-button font-light'
    "
    @click="$emit('click')"
  >
    <span class="shrink-0">{{ label }}</span>
  </button>
</template>
