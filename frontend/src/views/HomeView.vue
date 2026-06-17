<script setup lang="ts">
import { ref } from 'vue'
import SelectField from '../components/SelectField.vue'

const selectedBuilding = ref<string | null>(null)
</script>

<template>
  <div class="min-h-screen bg-background p-8">
    <SelectField :label="selectedBuilding ?? 'Select Building'" />
  </div>
</template>
