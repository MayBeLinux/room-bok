<script setup lang="ts">
import { ref } from 'vue'
import Logo from '../components/Logo.vue'
import MenuButton from '../components/MenuButton.vue'
import ParametersZone from '../components/ParametersZone.vue'
import SelectField from '../components/SelectField.vue'
import FloorView from '../components/FloorView.vue'
import NavbarButton from '../components/NavbarButton.vue'

const selectedBuilding = ref<string | null>(null)
const selectedFloor = ref<string | null>(null)
const selectedRooms = ref<string | null>(null)
const selectedEquipment = ref<string | null>(null)
const selectedDate = ref<string | null>(null)

type Tab = 'booking' | 'floor' | 'building'
const activeTab = ref<Tab>('booking')
</script>

<template>
  <div class="flex min-h-screen flex-col bg-background p-6 lg:p-8">
    <!-- Header : Logo gauche + MenuButton droite -->
    <header class="flex items-start justify-between">
      <Logo />
      <MenuButton aria-label="Open menu" />
    </header>

    <!-- Main : ParametersZone gauche + FloorView droite -->
    <main
      class="mt-6 grid flex-1 grid-cols-1 gap-6 lg:grid-cols-[minmax(320px,420px)_1fr] lg:gap-8 xl:gap-12"
    >
      <!-- Zone gauche : paramètres -->
      <ParametersZone>
        <div class="flex h-full flex-col items-center gap-10 py-8">
          <!-- 3 selects principaux -->
          <div class="flex flex-col items-center gap-4">
            <SelectField :label="selectedBuilding ?? 'Select Building'" />
            <SelectField :label="selectedFloor ?? 'Select Floor'" />
            <SelectField :label="selectedRooms ?? 'Select Rooms'" />
          </div>

          <!-- Select Equipment -->
          <SelectField :label="selectedEquipment ?? 'Select Equipment'" />

          <!-- Select Date -->
          <div class="w-full max-w-xs">
            <SelectField
              :label="selectedDate ?? 'Select Date'"
              class="!w-full"
            />
          </div>
        </div>
      </ParametersZone>

      <!-- Zone droite : plan du floor -->
      <FloorView />
    </main>

    <!-- Footer : navbar tabs -->
    <nav class="mt-8 flex">
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
        label="Add building"
        :selected="activeTab === 'building'"
        @click="activeTab = 'building'"
      />
    </nav>
  </div>
</template>
