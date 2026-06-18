<script setup lang="ts">
export interface DropdownItem {
  value: string | number
  label: string
}

defineProps<{
  items: DropdownItem[]
}>()

const emit = defineEmits<{
  select: [item: DropdownItem]
}>()
</script>

<template>
  <div
    class="overflow-clip rounded-2xl border-[1.5px] border-solid border-stroke-button bg-background-zone shadow-[6px_5px_1px_-3px_rgba(0,0,0,0.25)]"
  >
    <button
      v-for="item in items"
      :key="item.value"
      type="button"
      class="block w-full cursor-pointer px-5 py-2.5 text-left font-space text-base font-light whitespace-nowrap text-text-color transition-colors hover:bg-stroke-button/40"
      @click="emit('select', item)"
    >
      {{ item.label }}
    </button>
  </div>
</template>
