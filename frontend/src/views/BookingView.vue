<script setup lang="ts">
import { computed, ref } from 'vue'
import Calendar from '../components/Calendar.vue'
import Logo from '../components/Logo.vue'
import MenuButton from '../components/MenuButton.vue'
import ParametersZone from '../components/ParametersZone.vue'
import SelectField from '../components/SelectField.vue'
import SelectMenu from '../components/SelectMenu.vue'
import FloorView from '../components/FloorView.vue'
import NavbarButton from '../components/NavbarButton.vue'
import type { DropdownItem } from '../components/DropdownList.vue'

const selectedBuilding = ref<string | number | null>(null)
const selectedFloor = ref<string | number | null>(null)
const selectedRooms = ref<string | number | null>(null)
const selectedEquipment = ref<string | null>(null)
const selectedDateValue = ref<[number, number] | null>(null)
const selectedDate = computed(() => {
  if (selectedDateValue.value == null) return null
  const fmt = (ts: number) => {
    const d = new Date(ts)
    const dd = String(d.getDate()).padStart(2, '0')
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    return `${dd}/${mm}/${d.getFullYear()}`
  }
  const [start, end] = selectedDateValue.value
  return `${fmt(start)} → ${fmt(end)}`
})

// Mocks — à remplacer par la vraie source de données plus tard
const buildings: DropdownItem[] = [
  { value: 'a', label: 'Bâtiment A' },
  { value: 'b', label: 'Bâtiment B' },
  { value: 'c', label: 'Bâtiment C' },
]
const floors: DropdownItem[] = [
  { value: '0', label: 'RDC' },
  { value: '1', label: '1er étage' },
  { value: '2', label: '2e étage' },
]
const rooms: DropdownItem[] = [
  { value: 'r1', label: 'Salle 101' },
  { value: 'r2', label: 'Salle 102' },
  { value: 'r3', label: 'Salle 103' },
]
const menuItems: DropdownItem[] = [
  { value: 'login', label: 'Login' },
  { value: 'register', label: 'Register' },
  { value: 'logout', label: 'Logout' },
]

function onMenuAction(_item: DropdownItem) {
  // câblage réel plus tard (router push, store auth, etc.)
}

type Tab = 'booking' | 'floor' | 'building'
const activeTab = ref<Tab>('booking')
</script>

<template>
  <div class="flex min-h-screen flex-col bg-background p-6 lg:p-8">
    <!-- Header : Logo gauche + MenuButton droite -->
    <header class="flex items-start justify-between">
      <Logo />
      <SelectMenu
        label="Menu"
        :items="menuItems"
        placement="bottom-end"
        :match-trigger-width="false"
        @change="onMenuAction"
      >
        <template #trigger="{ toggle }">
          <MenuButton aria-label="Open menu" @click="toggle" />
        </template>
      </SelectMenu>
    </header>

    <!-- Main : ParametersZone gauche + FloorView droite -->
    <main
      class="mt-6 grid flex-1 grid-cols-1 gap-6 lg:grid-cols-[minmax(320px,420px)_1fr] lg:gap-8 xl:gap-12"
    >
      <!-- Zone gauche : paramètres -->
      <ParametersZone>
        <div class="mx-auto flex h-full max-w-[260px] flex-col px-6 py-10">
          <!-- Section 1 : filtres de recherche (lieu + date) -->
          <div class="flex flex-col gap-2">
            <SelectMenu
              v-model="selectedBuilding"
              label="Select Building"
              :items="buildings"
              size="sm"
              block
            />
            <SelectMenu
              v-model="selectedFloor"
              label="Select Floor"
              :items="floors"
              size="sm"
              block
            />
            <SelectMenu
              v-model="selectedRooms"
              label="Select Rooms"
              :items="rooms"
              size="sm"
              block
            />
          </div>

          <div class="mt-5">
            <Calendar
              :value="selectedDateValue"
              @update:value="(v: [number, number]) => (selectedDateValue = v)"
            >
              <template #trigger>
                <SelectField :label="selectedDate ?? 'Select Date'" size="sm" block />
              </template>
            </Calendar>
          </div>

          <!-- Divider entre les deux sections -->
          <hr class="my-10 border-1 border-t border-stroke-button/40" />

          <!-- Section 2 : équipement -->
          <div>
            <SelectField :label="selectedEquipment ?? 'Select Equipment'" size="sm" block />
          </div>
        </div>
      </ParametersZone>

      <!-- Zone droite : plan du floor -->
      <FloorView />
    </main>

    <!-- Footer : navbar tabs -->
    <nav class="mt-1 flex">
      <NavbarButton
        label="Booking Room"
        :selected="activeTab === 'booking'"
        @click="activeTab = 'booking'"
      />
      <NavbarButton
        label="Add floor"
        :selected="activeTab === 'floor'"
        @click="activeTab = 'floor'"
      />
      <NavbarButton
      label="Add Building"
      :selected="activeTab === 'building'"
      @click="activeTab = 'building'"
      />
    </nav>
  </div>
</template>
