<script setup lang="ts">
defineProps<{
  floorImageUrl?: string
}>()
</script>

<template>
  <div
    class="relative size-full overflow-clip rounded-[20px] border-[3px] border-solid border-stroke-button bg-background-zone"
  >
    <!-- Image du plan du floor (à brancher quand assets/floor*.png ou *.svg sera prêt) -->
    <img
      v-if="floorImageUrl"
      :src="floorImageUrl"
      alt="Floor plan"
      class="size-full object-contain"
    />
    <div
      v-else
      class="flex size-full items-center justify-center text-text-color/30"
    >
      <p class="font-space text-[20px] font-light">
        Floor plan — à brancher (assets/floor*.svg)
      </p>
    </div>

    <!-- Slot pour superposer des FieldRoom badges plus tard -->
    <slot />
  </div>
</template>
