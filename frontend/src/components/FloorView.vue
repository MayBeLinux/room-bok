<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import panzoom, { type PanZoom } from 'panzoom'
import {
  PhArrowsCounterClockwise,
  PhMinus,
  PhPlus,
} from '@phosphor-icons/vue'

const props = defineProps<{
  floorImageUrl?: string
}>()

const viewportEl = ref<HTMLDivElement | null>(null)
const stageEl = ref<HTMLDivElement | null>(null)
let instance: PanZoom | null = null

function detach() {
  instance?.dispose()
  instance = null
}

function attach() {
  detach()
  if (!stageEl.value) return
  instance = panzoom(stageEl.value, {
    maxZoom: 5,
    minZoom: 0.5,
    bounds: true,
    boundsPadding: 0.2,
    zoomDoubleClickSpeed: 1,
  })
}

watch(() => props.floorImageUrl, attach, { flush: 'post', immediate: true })

onBeforeUnmount(detach)

function zoomBy(factor: number) {
  if (!instance || !viewportEl.value) return
  const rect = viewportEl.value.getBoundingClientRect()
  instance.smoothZoom(
    rect.left + rect.width / 2,
    rect.top + rect.height / 2,
    factor,
  )
}

function zoomIn() {
  zoomBy(1.25)
}

function zoomOut() {
  zoomBy(0.8)
}

function reset() {
  if (!instance) return
  instance.moveTo(0, 0)
  instance.zoomAbs(0, 0, 1)
}
</script>

<template>
  <div
    ref="viewportEl"
    class="relative size-full overflow-hidden rounded-[20px] border-[3px] border-solid border-stroke-button bg-background-zone"
  >
    <div
      v-if="floorImageUrl"
      ref="stageEl"
      class="absolute inset-0 cursor-grab active:cursor-grabbing"
    >
      <img
        :src="floorImageUrl"
        alt="Floor plan"
        draggable="false"
        class="size-full select-none object-contain"
      />
    </div>
    <div v-else class="relative size-full">
      <model-viewer
        src="/models/appartamenti.glb"
        alt="Building preview"
        camera-controls
        auto-rotate
        auto-rotate-delay="0"
        rotation-per-second="20deg"
        shadow-intensity="1"
        exposure="1"
        interaction-prompt="none"
        class="block size-full bg-transparent"
      />
      <p
        class="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 font-space text-[14px] font-light text-text-color/60"
      >
        Pick a building and floor to load the 2D plan
      </p>
    </div>

    <div
      v-if="floorImageUrl"
      class="pointer-events-none absolute right-4 bottom-4 flex flex-col gap-1"
    >
      <button
        type="button"
        aria-label="Zoom in"
        class="pointer-events-auto grid size-9 place-items-center rounded-lg border border-stroke-button/40 bg-background/80 text-text-color backdrop-blur transition-colors hover:bg-stroke-button/30"
        @click="zoomIn"
      >
        <PhPlus :size="18" weight="bold" />
      </button>
      <button
        type="button"
        aria-label="Zoom out"
        class="pointer-events-auto grid size-9 place-items-center rounded-lg border border-stroke-button/40 bg-background/80 text-text-color backdrop-blur transition-colors hover:bg-stroke-button/30"
        @click="zoomOut"
      >
        <PhMinus :size="18" weight="bold" />
      </button>
      <button
        type="button"
        aria-label="Reset view"
        class="pointer-events-auto grid size-9 place-items-center rounded-lg border border-stroke-button/40 bg-background/80 text-text-color backdrop-blur transition-colors hover:bg-stroke-button/30"
        @click="reset"
      >
        <PhArrowsCounterClockwise :size="18" weight="bold" />
      </button>
    </div>

    <slot />
  </div>
</template>
