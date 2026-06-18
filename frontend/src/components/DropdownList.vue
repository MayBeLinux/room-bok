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
    class="overflow-clip rounded-[25px] border-[3px] border-solid border-stroke-button bg-background-zone shadow-[9px_8px_1.5px_-5px_rgba(0,0,0,0.25)]"
  >
    <button
      v-for="item in items"
      :key="item.value"
      type="button"
      class="block w-full cursor-pointer px-[30px] py-[10px] text-left font-space text-[25px] font-light whitespace-nowrap text-text-color transition-colors hover:bg-stroke-button/40"
      @click="emit('select', item)"
    >
      {{ item.label }}
    </button>
  </div>
</template>
