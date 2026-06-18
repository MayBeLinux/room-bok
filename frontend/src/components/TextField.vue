<script setup lang="ts">
defineProps<{
  placeholder?: string
  type?: string
}>()

const model = defineModel<string>({ default: '' })
</script>

<template>
  <div
    class="inline-flex h-10 w-full max-w-xs items-center rounded-lg border-[1.5px] border-solid border-stroke-button bg-background-zone p-2 shadow-[6px_5px_1px_-3px_rgba(0,0,0,0.25)]"
  >
    <input
      v-model="model"
      :type="type ?? 'text'"
      :placeholder="placeholder"
      class="h-full w-full rounded-md bg-stroke-button px-2 font-space text-sm font-medium whitespace-nowrap text-text-color outline-none placeholder:text-text-color/70"
    />
  </div>
</template>
