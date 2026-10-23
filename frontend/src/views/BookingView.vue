<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Calendar from '../components/Calendar.vue'
import Logo from '../components/Logo.vue'
import MenuButton from '../components/MenuButton.vue'
import ParametersZone from '../components/ParametersZone.vue'
import SelectField from '../components/SelectField.vue'
import SelectMenu from '../components/SelectMenu.vue'
import FloorView from '../components/FloorView.vue'
import NavbarButton from '../components/NavbarButton.vue'
import type { DropdownItem } from '../components/DropdownList.vue'
import type { FloorHighlight, FloorPlan } from '../components/FloorView.vue'
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
interface CafeteriaRecord {
  id: number
  capacity: number | null
  openingTime: string | null
  closingTime: string | null
  classroom: { id: number; nameRoom: string | null }
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
const cafeteriaRecords = ref<CafeteriaRecord[]>([])

// A cafeteria is a classroom with extra details, so match it by classroom id.
const selectedCafeteria = computed<CafeteriaRecord | null>(
  () => cafeteriaRecords.value.find((c) => c.classroom.id === selectedRoom.value) ?? null,
)

// The DB stores times as "HH:MM:SS"; only "HH:MM" is useful to display.
function formatTime(time: string | null): string {
  return time ? time.slice(0, 5) : '—'
}

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

async function fetchCafeterias(): Promise<CafeteriaRecord[]> {
  const { data } = await api.get<CafeteriaRecord[]>('/cafeterias')
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
  const [buildingsList, equipmentsList, cafeteriasList] = await Promise.all([
    fetchBuildings(),
    fetchEquipments(),
    fetchCafeterias(),
  ])
  buildingRecords.value = buildingsList
  equipmentRecords.value = equipmentsList
  cafeteriaRecords.value = cafeteriasList
})

const floor1Plan: FloorPlan = { url: floor1Url, width: 1899, height: 1282 }
const floor2Plan: FloorPlan = { url: floor2Url, width: 3416, height: 1282 }

// Cafeteria area of floor1Plan (open space with the round tables, under the
// left offices), in the plan's pixel coordinates.
const CAFETERIA_ZONE = {
  points: '225,752 545,752 545,1065 22,1065 22,905 225,905',
  center: { x: 284, y: 909 },
}

const floorPlan = computed<FloorPlan | undefined>(() => {
  // A selected cafeteria is shown on floor1Plan, where its area is highlighted.
  if (selectedCafeteria.value) return floor1Plan
  if (selectedBuilding.value == null || selectedFloor.value == null) return undefined
  const floor = floorRecords.value.find((f) => f.id === selectedFloor.value)
  switch (floor?.level) {
    case 1:
      return floor1Plan
    case 2:
      return floor2Plan
    default:
      return undefined
  }
})

const floorHighlight = computed<FloorHighlight | null>(() => {
  if (!selectedCafeteria.value) return null
  return {
    ...CAFETERIA_ZONE,
    label: selectedCafeteria.value.classroom.nameRoom ?? 'Cafétéria',
  }
})

const router = useRouter()
const auth = useAuthStore()

const menuItems: DropdownItem[] = [
  { value: 'login', label: 'Login' },
  { value: 'register', label: 'Register' },
  { value: 'logout', label: 'Logout' },
]

function onMenuSelect(item: DropdownItem) {
  if (item.value === 'logout') {
    auth.clearSession()
    router.push({ name: 'login' })
    return
  }
  router.push({ name: item.value as string })
}

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
        @change="onMenuSelect"
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
              label="Select Space"
              :items="rooms"
              size="sm"
              block
            />
          </div>

          <dl
            v-if="selectedCafeteria"
            class="mt-3 flex flex-col gap-1 font-space text-sm text-text-color"
          >
            <div class="flex justify-between">
              <dt>Opening</dt>
              <dd class="font-medium">{{ formatTime(selectedCafeteria.openingTime) }}</dd>
            </div>
            <div class="flex justify-between">
              <dt>Closing</dt>
              <dd class="font-medium">{{ formatTime(selectedCafeteria.closingTime) }}</dd>
            </div>
          </dl>

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

      <FloorView :floor-plan="floorPlan" :highlight="floorHighlight" />
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
