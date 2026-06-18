<script setup lang="ts">
import { computed, onBeforeUnmount, ref, useTemplateRef } from 'vue'
import SelectField from './SelectField.vue'
import DropdownList, { type DropdownItem } from './DropdownList.vue'

const props = withDefaults(
  defineProps<{
    label: string
    items: DropdownItem[]
    modelValue?: string | number | null
    size?: 'sm' | 'md'
    block?: boolean
    placement?: 'bottom-start' | 'bottom-end'
    matchTriggerWidth?: boolean
    disabled?: boolean
  }>(),
  {
    modelValue: null,
    size: 'md',
    block: false,
    placement: 'bottom-start',
    matchTriggerWidth: true,
    disabled: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string | number | null]
  change: [item: DropdownItem]
}>()

const triggerEl = useTemplateRef<HTMLDivElement>('triggerEl')
const dropdownEl = useTemplateRef<HTMLDivElement>('dropdownEl')

const isOpen = ref(false)
const position = ref({ top: 0, left: 0, right: 0, width: 0 })

const selectedItem = computed(
  () => props.items.find((i) => i.value === props.modelValue) ?? null,
)
const displayLabel = computed(() => selectedItem.value?.label ?? props.label)

function updatePosition() {
  if (!triggerEl.value) return
  const rect = triggerEl.value.getBoundingClientRect()
  position.value = {
    top: rect.bottom + 8,
    left: rect.left,
    right: window.innerWidth - rect.right,
    width: rect.width,
  }
}

function open() {
  if (props.disabled) return
  updatePosition()
  isOpen.value = true
  window.addEventListener('scroll', updatePosition, true)
  window.addEventListener('resize', updatePosition)
  document.addEventListener('mousedown', onClickOutside)
}

function close() {
  isOpen.value = false
  window.removeEventListener('scroll', updatePosition, true)
  window.removeEventListener('resize', updatePosition)
  document.removeEventListener('mousedown', onClickOutside)
}

function toggle() {
  isOpen.value ? close() : open()
}

function onClickOutside(e: MouseEvent) {
  const target = e.target as Node
  if (
    !triggerEl.value?.contains(target) &&
    !dropdownEl.value?.contains(target)
  ) {
    close()
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && isOpen.value) {
    e.preventDefault()
    close()
    triggerEl.value?.querySelector<HTMLElement>('button')?.focus()
  }
}

function onSelect(item: DropdownItem) {
  emit('update:modelValue', item.value)
  emit('change', item)
  close()
}

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updatePosition, true)
  window.removeEventListener('resize', updatePosition)
  document.removeEventListener('mousedown', onClickOutside)
})
</script>

<template>
  <div
    ref="triggerEl"
    :class="block ? 'block w-full' : 'inline-block'"
    @keydown="onKeydown"
  >
    <slot
      name="trigger"
      :toggle="toggle"
      :is-open="isOpen"
      :label="displayLabel"
    >
      <SelectField
        :label="displayLabel"
        :size="size"
        :block="block"
        aria-haspopup="listbox"
        :aria-expanded="isOpen"
        @click="toggle"
      />
    </slot>

    <Teleport to="body">
      <div
        v-if="isOpen"
        ref="dropdownEl"
        :style="
          placement === 'bottom-end'
            ? {
                position: 'fixed',
                top: `${position.top}px`,
                right: `${position.right}px`,
                minWidth: matchTriggerWidth
                  ? `${position.width}px`
                  : undefined,
                zIndex: 50,
              }
            : {
                position: 'fixed',
                top: `${position.top}px`,
                left: `${position.left}px`,
                minWidth: matchTriggerWidth
                  ? `${position.width}px`
                  : undefined,
                zIndex: 50,
              }
        "
        role="listbox"
      >
        <DropdownList :items="items" @select="onSelect" />
      </div>
    </Teleport>
  </div>
</template>
