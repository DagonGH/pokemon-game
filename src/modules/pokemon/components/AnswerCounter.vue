<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { Trophy, CircleX } from 'lucide-vue-next'
import { useTransition } from '@vueuse/core'

interface Props {
  successCounter: number
  lostCounter: number
}
const props = defineProps<Props>()

// 1. Creamos una fuente reactiva (computed) para cada prop.
//    Esto asegura que `useTransition` reaccione a los cambios.
const successSource = computed(() => props.successCounter)
const lostSource = computed(() => props.lostCounter)

// 2. Aplicamos la transición. `useTransition` nos devuelve un `ref`
//    cuyo valor se animará automáticamente.
const animatedSuccess = useTransition(successSource, {
  duration: 600, // Duración de la animación en milisegundos
  transition: [0.76, 0, 0.24, 1], // Curva de easing (suavizado) para un efecto moderno
})

const animatedLost = useTransition(lostSource, {
  duration: 600,
  transition: [0.76, 0, 0.24, 1],
})
</script>

<template>
  <div v-if="props.successCounter > 0 || props.lostCounter > 0" class="flex gap-2 mr-8">
    <div
      class="px-3 flex justify-between gap-4 items-center bg-emerald-50 border border-emerald-500/20 rounded text-emerald-500"
    >
      <Trophy stroke-width="1.5" :size="18" />
      <span class="text-sm font-mono">{{ Math.round(animatedSuccess) }}</span>
    </div>
    <div
      class="px-3 flex justify-between gap-4 items-center bg-rose-50 border border-rose-500/20 rounded text-rose-500"
    >
      <CircleX stroke-width="1.5" :size="18" />
      <span class="text-sm font-mono">{{ Math.round(animatedLost) }}</span>
    </div>
  </div>
</template>
