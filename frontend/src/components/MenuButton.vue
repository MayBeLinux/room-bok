<script setup lang="ts">
import { PhCaretDown } from '@phosphor-icons/vue'

defineProps<{
  ariaLabel?: string
}>()
</script>

<template>
  <button
    type="button"
    :aria-label="ariaLabel ?? 'Open menu'"
    class="inline-flex size-10 items-center justify-center overflow-clip rounded-lg border-[1.5px] border-solid border-stroke-button bg-background-zone p-2 text-text-color shadow-[6px_5px_1px_-3px_rgba(0,0,0,0.25)]"
  >
    <PhCaretDown :size="22" weight="bold" />
  </button>
</template>
