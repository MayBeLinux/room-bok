<script setup lang="ts">
import { PhCaretDown } from '@phosphor-icons/vue'

withDefaults(
  defineProps<{
    label: string
    block?: boolean
  }>(),
  { block: false },
)
</script>

<template>
  <button
    type="button"
    :class="[
      block ? 'flex w-full' : 'inline-flex',
      'items-center justify-between gap-2.5 overflow-clip rounded-[20px] border-[2px] border-solid border-accent-green bg-background-zone px-[15px] py-[10px] font-space text-lg font-medium whitespace-nowrap text-text-color shadow-[9px_8px_1.5px_-5px_rgba(0,0,0,0.25)]',
    ]"
  >
    <span>{{ label }}</span>
    <PhCaretDown :size="18" weight="bold" class="shrink-0" />
  </button>
</template>
