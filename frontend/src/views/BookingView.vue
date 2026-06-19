<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import Calendar from '../components/Calendar.vue'
import Logo from '../components/Logo.vue'
import MenuButton from '../components/MenuButton.vue'
import ParametersZone from '../components/ParametersZone.vue'
import SelectField from '../components/SelectField.vue'
import SelectMenu from '../components/SelectMenu.vue'
import FloorView from '../components/FloorView.vue'
import NavbarButton from '../components/NavbarButton.vue'
import type { DropdownItem } from '../components/DropdownList.vue'
import { api } from '../api/client'
import floor1Url from '../assets/svg/floors/floor1.svg'
import floor2Url from '../assets/svg/floors/floor2.svg'

interface BuildingRecord {
  id: number
  name: string | null
}
interface FloorRecord {
  id: number
  level: number | null
}
interface RoomRecord {
  id: number
  nameRoom: string | null
}
interface EquipmentRecord {
  id: number
  name: string | null
}

const selectedBuilding = ref<number | null>(null)
const selectedFloor = ref<number | null>(null)
const selectedRoom = ref<number | null>(null)
const selectedEquipment = ref<number | null>(null)
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

const buildingRecords = ref<BuildingRecord[]>([])
const floorRecords = ref<FloorRecord[]>([])
const roomRecords = ref<RoomRecord[]>([])
const equipmentRecords = ref<EquipmentRecord[]>([])

function formatFloorLevel(level: number | null): string {
  if (level == null) return '—'
  if (level === 0) return 'RDC'
  return `${level}${level === 1 ? 'er' : 'e'} étage`
}

const buildings = computed<DropdownItem[]>(() =>
  buildingRecords.value.map((b) => ({
    value: b.id,
    label: b.name ?? `Bâtiment #${b.id}`,
  })),
)
const floors = computed<DropdownItem[]>(() =>
  floorRecords.value.map((f) => ({
    value: f.id,
    label: formatFloorLevel(f.level),
  })),
)
const rooms = computed<DropdownItem[]>(() =>
  roomRecords.value.map((r) => ({
    value: r.id,
    label: r.nameRoom ?? `Salle #${r.id}`,
  })),
)
const equipments = computed<DropdownItem[]>(() =>
  equipmentRecords.value.map((e) => ({
    value: e.id,
    label: e.name ?? `#${e.id}`,
  })),
)

async function fetchBuildings(): Promise<BuildingRecord[]> {
  const { data } = await api.get<BuildingRecord[]>('/buildings')
  return data
}

async function fetchEquipments(): Promise<EquipmentRecord[]> {
  const { data } = await api.get<EquipmentRecord[]>('/equipments')
  return data
}

async function fetchFloorsForBuilding(buildingId: number): Promise<FloorRecord[]> {
  const { data } = await api.get<BuildingRecord & { floors: FloorRecord[] }>(
    `/buildings/${buildingId}`,
  )
  return data.floors ?? []
}

async function fetchRoomsForFloor(floorId: number): Promise<RoomRecord[]> {
  const { data } = await api.get<FloorRecord & { classrooms: RoomRecord[] }>(
    `/floors/${floorId}`,
  )
  return data.classrooms ?? []
}

// Request tokens guard against a stale response from a previous selection
// overwriting the records that match the user's current choice.
let buildingReqToken = 0
let floorReqToken = 0

watch(selectedBuilding, async (id) => {
  selectedFloor.value = null
  selectedRoom.value = null
  floorRecords.value = []
  roomRecords.value = []
  if (id == null) return
  const token = ++buildingReqToken
  const next = await fetchFloorsForBuilding(id)
  if (token === buildingReqToken) floorRecords.value = next
})

watch(selectedFloor, async (id) => {
  selectedRoom.value = null
  roomRecords.value = []
  if (id == null) return
  const token = ++floorReqToken
  const next = await fetchRoomsForFloor(id)
  if (token === floorReqToken) roomRecords.value = next
})

onMounted(async () => {
  const [buildingsList, equipmentsList] = await Promise.all([
    fetchBuildings(),
    fetchEquipments(),
  ])
  buildingRecords.value = buildingsList
  equipmentRecords.value = equipmentsList
})

const floorPlanUrl = computed<string | undefined>(() => {
  if (selectedBuilding.value == null || selectedFloor.value == null) return undefined
  const floor = floorRecords.value.find((f) => f.id === selectedFloor.value)
  switch (floor?.level) {
    case 1:
      return floor1Url
    case 2:
      return floor2Url
    default:
      return undefined
  }
})

const menuItems: DropdownItem[] = [
  { value: 'login', label: 'Login' },
  { value: 'register', label: 'Register' },
  { value: 'logout', label: 'Logout' },
]

type Tab = 'booking' | 'floor' | 'building'
const activeTab = ref<Tab>('booking')
</script>

<template>
  <div class="flex min-h-screen flex-col bg-background p-6 lg:p-8">
    <header class="flex items-start justify-between">
      <Logo />
      <SelectMenu
        label="Menu"
        :items="menuItems"
        placement="bottom-end"
        :match-trigger-width="false"
      >
        <template #trigger="{ toggle }">
          <MenuButton aria-label="Open menu" @click="toggle" />
        </template>
      </SelectMenu>
    </header>

    <main
      class="mt-6 grid flex-1 grid-cols-1 gap-6 lg:grid-cols-[minmax(320px,420px)_1fr] lg:gap-8 xl:gap-12"
    >
      <ParametersZone>
        <div class="mx-auto flex h-full max-w-[260px] flex-col px-6 py-10">
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
              v-model="selectedRoom"
              label="Select Room"
              :items="rooms"
              size="sm"
              block
            />
          </div>

          <div class="mt-5">
            <Calendar v-model:value="selectedDateValue">
              <template #trigger>
                <SelectField :label="selectedDate ?? 'Select Date'" size="sm" block />
              </template>
            </Calendar>
          </div>

          <hr class="my-10 border-1 border-t border-stroke-button/40" />

          <SelectMenu
            v-model="selectedEquipment"
            label="Select Equipment"
            :items="equipments"
            size="sm"
            block
          />
        </div>
      </ParametersZone>

      <FloorView :floor-image-url="floorPlanUrl" />
    </main>

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
