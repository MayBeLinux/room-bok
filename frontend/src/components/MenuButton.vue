<script setup lang="ts">
import { PhList } from '@phosphor-icons/vue'

defineProps<{
  ariaLabel?: string
}>()
</script>

<template>
  <button
    type="button"
    :aria-label="ariaLabel ?? 'Open menu'"
    class="inline-flex size-[75px] items-center justify-center overflow-clip rounded-[10px] border-[3px] border-solid border-stroke-button bg-background-zone p-[10px] text-text-color shadow-[9px_8px_1.5px_-5px_rgba(0,0,0,0.25)]"
  >
    <PhList :size="55" weight="bold" />
  </button>
</template>
