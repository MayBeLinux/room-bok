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
    class="inline-flex h-[80px] w-[200px] items-center justify-center overflow-clip border-b-[3px] border-solid px-[80px] py-[27px] font-space text-[25px] whitespace-nowrap text-text-color transition-colors"
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
