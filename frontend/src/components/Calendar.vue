<script setup lang="ts">
import { addDays, isYesterday } from 'date-fns'
import { darkTheme, NCalendar, NConfigProvider, NPopover } from 'naive-ui'
import type { GlobalThemeOverrides } from 'naive-ui'
import { computed, ref, watch } from 'vue'

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#1A936F',
    primaryColorHover: '#1A936F',
    primaryColorPressed: '#147a5a',
    primaryColorSuppl: '#1A936F',
    textColor1: '#F3E6D2',
    textColor2: '#F3E6D2',
    textColor3: 'rgba(243, 230, 210, 0.6)',
    borderColor: '#32333A',
    dividerColor: '#32333A',
    cardColor: '#22232B',
    modalColor: '#22232B',
    popoverColor: '#22232B',
    fontFamily: "'Space Grotesk', system-ui, sans-serif",
  },
  Calendar: {
    panelColor: '#22232B',
    borderColor: '#32333A',
    titleFontWeight: '500',
    titleTextColor: '#F3E6D2',
    textColor: '#F3E6D2',
    dayTextColor: 'rgba(243, 230, 210, 0.6)',
    dateTextColor: '#F3E6D2',
    dateTextColorCurrent: '#1A936F',
    dateColorCurrent: 'rgba(26, 147, 111, 0.18)',
  },
  Popover: {
    color: '#22232B',
    textColor: '#F3E6D2',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.45)',
  },
  Button: {
    textColor: '#F3E6D2',
    textColorHover: '#1A936F',
    textColorPressed: '#1A936F',
    borderHover: '1px solid #1A936F',
  },
}

type Range = [number, number]

const props = defineProps<{
  value?: Range | null
}>()

const emit = defineEmits<{
  'update:value': [Range]
}>()

const rangeStart = ref<number | null>(props.value?.[0] ?? null)
const rangeEnd = ref<number | null>(props.value?.[1] ?? null)
const hoveredDay = ref<number | null>(null)

watch(
  () => props.value,
  (v) => {
    rangeStart.value = v?.[0] ?? null
    rangeEnd.value = v?.[1] ?? null
  },
)

const focusedDay = computed(
  () => rangeEnd.value ?? rangeStart.value ?? addDays(Date.now(), 1).valueOf(),
)

function startOfDay(ts: number) {
  const d = new Date(ts)
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()
}

function cellTimestamp(year: number, month: number, date: number) {
  return new Date(year, month - 1, date).getTime()
}

function rangeBounds() {
  if (rangeStart.value == null) return null
  const a = startOfDay(rangeStart.value)
  let b: number
  if (rangeEnd.value != null) {
    b = startOfDay(rangeEnd.value)
  } else if (hoveredDay.value != null) {
    b = startOfDay(hoveredDay.value)
  } else {
    b = a
  }
  return { min: Math.min(a, b), max: Math.max(a, b) }
}

function isInRange(year: number, month: number, date: number) {
  const b = rangeBounds()
  if (!b) return false
  const cell = cellTimestamp(year, month, date)
  return cell >= b.min && cell <= b.max
}

function rangeEdge(
  year: number,
  month: number,
  date: number,
): 'start' | 'end' | 'single' | null {
  const b = rangeBounds()
  if (!b) return null
  const cell = cellTimestamp(year, month, date)
  if (b.min === b.max && cell === b.min) return 'single'
  if (cell === b.min) return 'start'
  if (cell === b.max) return 'end'
  return null
}

function handleUpdateValue(
  ts: number,
  _: { year: number; month: number; date: number },
) {
  const day = startOfDay(ts)
  if (rangeStart.value == null || rangeEnd.value != null) {
    rangeStart.value = day
    rangeEnd.value = null
    hoveredDay.value = null
    return
  }
  const start = startOfDay(rangeStart.value)
  if (day < start) {
    rangeStart.value = day
    rangeEnd.value = start
  } else {
    rangeEnd.value = day
  }
  hoveredDay.value = null
  emit('update:value', [rangeStart.value, rangeEnd.value!])
}

function onMouseOver(e: MouseEvent) {
  if (rangeStart.value == null || rangeEnd.value != null) return
  const cell = (e.target as HTMLElement).closest('.n-calendar-cell')
  if (!cell) return
  const marker = cell.querySelector('[data-cell-date]') as HTMLElement | null
  const ts = marker?.dataset.cellDate
  if (ts) hoveredDay.value = Number(ts)
}

function onMouseLeave() {
  hoveredDay.value = null
}

function isDateDisabled(timestamp: number) {
  return isYesterday(timestamp)
}
</script>

<template>
  <NConfigProvider :theme="darkTheme" :theme-overrides="themeOverrides">
    <NPopover
      trigger="click"
      placement="bottom-start"
      :show-arrow="false"
      :content-style="{
        padding: '0',
        border: '1px solid #32333A',
        borderRadius: '12px',
      }"
    >
      <template #trigger>
        <slot name="trigger" />
      </template>
      <div
        class="range-calendar-wrap"
        @mouseover="onMouseOver"
        @mouseleave="onMouseLeave"
      >
        <NCalendar
          class="range-calendar"
          :value="focusedDay"
          :is-date-disabled="isDateDisabled"
          style="width: 560px; height: 420px"
          @update:value="handleUpdateValue"
        >
          <template #default="{ year, month, date }">
            <span
              :data-cell-date="cellTimestamp(year, month, date)"
              class="cell-marker"
            />
            <span
              v-if="isInRange(year, month, date)"
              data-in-range
              class="cell-marker"
            />
            <span
              v-if="
                rangeEdge(year, month, date) === 'start' ||
                rangeEdge(year, month, date) === 'single'
              "
              data-edge-start
              class="cell-marker"
            />
            <span
              v-if="
                rangeEdge(year, month, date) === 'end' ||
                rangeEdge(year, month, date) === 'single'
              "
              data-edge-end
              class="cell-marker"
            />
          </template>
        </NCalendar>
      </div>
    </NPopover>
  </NConfigProvider>
</template>

<style scoped>
.cell-marker {
  display: none;
}

.range-calendar :deep(.n-calendar-cell) {
  position: relative;
}

.range-calendar :deep(.n-calendar-cell) > * {
  position: relative;
  z-index: 1;
}

.range-calendar :deep(.n-calendar-cell:has([data-in-range]))::before {
  content: '';
  position: absolute;
  inset: 4px;
  background-color: rgba(26, 147, 111, 0.2);
  z-index: 0;
  pointer-events: none;
}

.range-calendar :deep(.n-calendar-cell:has([data-edge-start]))::before {
  background-color: rgba(26, 147, 111, 0.45);
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}

.range-calendar :deep(.n-calendar-cell:has([data-edge-end]))::before {
  background-color: rgba(26, 147, 111, 0.45);
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}

.range-calendar
  :deep(.n-calendar-cell:has([data-edge-start]):has([data-edge-end]))::before {
  border-radius: 6px;
}
</style>
