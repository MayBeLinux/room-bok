<script setup lang="ts">
import { ref } from 'vue'
import SelectField from '../components/SelectField.vue'
import MenuButton from '../components/MenuButton.vue'
import DropdownList, { type DropdownItem } from '../components/DropdownList.vue'
import TextField from '../components/TextField.vue'
import NavbarButton from '../components/NavbarButton.vue'
import ParametersZone from '../components/ParametersZone.vue'

const selectedBuilding = ref<string | null>(null)

const buildings: DropdownItem[] = [
  { value: 1, label: 'Building 1' },
  { value: 2, label: 'Building 2' },
  { value: 3, label: 'Building 3' },
]

const roomNumber = ref<string>('')

const onSelect = (item: DropdownItem) => {
  selectedBuilding.value = item.label
}

const tabs = ['Button 1', 'Button 2', 'Button 3']
const activeTab = ref<string>('Button 1')
</script>

<template>
  <div class="min-h-screen bg-background p-8">
    <div class="flex items-center gap-6">
      <MenuButton aria-label="Open navigation menu" />
      <SelectField :label="selectedBuilding ?? 'Select Building'" />
    </div>

    <div class="mt-6 w-[262px]">
      <DropdownList :items="buildings" @select="onSelect" />
    </div>

    <div class="mt-6">
      <TextField v-model="roomNumber" placeholder="Room number............" />
    </div>

    <div class="mt-8 flex">
      <NavbarButton
        v-for="tab in tabs"
        :key="tab"
        :label="tab"
        :selected="activeTab === tab"
        @click="activeTab = tab"
      />
    </div>

    <div class="mt-8 h-[300px] w-[400px]">
      <ParametersZone>
        <div class="flex flex-col gap-4 p-6">
          <TextField v-model="roomNumber" placeholder="Champ A..." />
          <TextField v-model="roomNumber" placeholder="Champ B..." />
        </div>
      </ParametersZone>
    </div>
  </div>
</template>
