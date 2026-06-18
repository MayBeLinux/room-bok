<script setup lang="ts">
import { PhCaretDown } from '@phosphor-icons/vue'

defineProps<{
  label: string
}>()
</script>

<template>
  <button
    type="button"
    class="inline-flex items-center justify-center gap-[10px] overflow-clip rounded-[25px] border-[3px] border-solid border-accent-green bg-background-zone px-[23px] py-[19px] font-space text-[25px] font-medium whitespace-nowrap text-text-color shadow-[9px_8px_1.5px_-5px_rgba(0,0,0,0.25)]"
  >
    <PhCaretDown :size="35" weight="bold" class="shrink-0" />
    <span>{{ label }}</span>
  </button>
</template>
