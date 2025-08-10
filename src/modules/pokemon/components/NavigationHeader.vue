<script setup lang="ts">
import { Settings } from 'lucide-vue-next'
import AnswerCounter from './AnswerCounter.vue'
import { ref, defineEmits } from 'vue'
import ToggleSwitch from './ui/ToggleSwitch.vue'

interface Props {
  successCounter: number
  lostCounter: number
  automaticRound: boolean
}
const props = defineProps<Props>()

const showSettings = ref<boolean>(false)
const emit = defineEmits(['update:automaticRound'])
</script>

<template>
  <nav class="flex justify-end p-4 mb-4 sticky top-0 z-10 bg-transparent backdrop-blur">
    <AnswerCounter :success-counter="props.successCounter" :lost-counter="props.lostCounter" />
    <Settings stroke-width="1.5" @click="showSettings = !showSettings" />
    <div
      v-if="showSettings"
      class="absolute top-10 right-5 bg-white w-56 h-48 z-20 border rounded border-gray-200 p-4"
    >
      <div class="flex flex-col gap-2">
        <h1 class="text-sm font-semibold border-b border-gray-200 pb-2">Configuración</h1>
        <span class="text-sm">Automatico</span>
        <ToggleSwitch
          :model-value="props.automaticRound"
          @update:model-value="(newValue) => emit('update:automaticRound', newValue)"
        />
      </div>
    </div>
  </nav>
</template>
