<script setup lang="ts">
import { computed } from 'vue'
import { PhCaretDown } from '@phosphor-icons/vue'

const props = withDefaults(
  defineProps<{
    label: string
    block?: boolean
    size?: 'sm' | 'md'
  }>(),
  { block: false, size: 'md' },
)

const sizeClasses = computed(() =>
  props.size === 'sm'
    ? 'gap-2 rounded-[14px] border-[1.5px] px-3 py-[6px] text-sm'
    : 'gap-2.5 rounded-[20px] border-[2px] px-[15px] py-[10px] text-lg',
)

const iconSize = computed(() => (props.size === 'sm' ? 14 : 18))
</script>

<template>
  <button
    type="button"
    :class="[
      block ? 'flex w-full' : 'inline-flex',
      sizeClasses,
      'items-center justify-between overflow-clip border-solid border-accent-green bg-background-zone font-space font-medium whitespace-nowrap text-text-color shadow-[9px_8px_1.5px_-5px_rgba(0,0,0,0.25)]',
    ]"
  >
    <span>{{ label }}</span>
    <PhCaretDown :size="iconSize" weight="bold" class="shrink-0" />
  </button>
</template>
