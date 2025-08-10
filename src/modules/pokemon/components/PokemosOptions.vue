<script setup lang="ts">
import { defineEmits } from 'vue'
import type { Pokemon } from '@/modules/pokemon/interfaces/PokemonResponse'

interface Props {
  options: Pokemon[]
  disabledOptions?: boolean
  correctOption?: number
}
const props = defineProps<Props>()

defineEmits<{
  selectedOption: [id: number]
}>()
</script>

<template>
  <div class="flex flex-col flex-wrap justify-center mt-4">
    <button
      v-for="pokemon in props.options"
      :key="pokemon.id"
      @click="$emit('selectedOption', pokemon.id)"
      :disabled="props.disabledOptions"
      :class="[
        'disabled:shadow-none disabled:cursor-not-allowed disabled:bg-slate-100',
        {
          success: pokemon.id === props.correctOption && props.disabledOptions,
          wrong: pokemon.id !== props.correctOption && props.disabledOptions,
        },
      ]"
    >
      {{ pokemon.name }}
    </button>
  </div>
</template>

<style scoped>
@reference "tailwindcss";
button {
  @apply bg-white
  shadow-md
  rounded-lg
  p-3
 cursor-pointer
 w-48
 text-center
transition-all
m-2
hover:bg-slate-200
capitalize;
}

.success {
  @apply bg-emerald-100 text-emerald-500 shadow-none border-emerald-500/20 border hover:bg-emerald-100;
}

.wrong {
  @apply bg-gray-100 text-gray-400 shadow-none border-gray-500/10 border hover:bg-gray-100;
}
</style>
