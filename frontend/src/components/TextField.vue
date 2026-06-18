<script setup lang="ts">
defineProps<{
  placeholder?: string
  type?: string
}>()

const model = defineModel<string>({ default: '' })
</script>

<template>
  <div
    class="inline-flex h-[50px] w-[273px] items-center rounded-[10px] border-[3px] border-solid border-stroke-button bg-background-zone p-[10px] shadow-[9px_8px_1.5px_-5px_rgba(0,0,0,0.25)]"
  >
    <input
      v-model="model"
      :type="type ?? 'text'"
      :placeholder="placeholder"
      class="h-full w-full rounded-[5px] bg-stroke-button px-[7px] font-space text-[15px] font-medium whitespace-nowrap text-text-color outline-none placeholder:text-text-color/80"
    />
  </div>
</template>
