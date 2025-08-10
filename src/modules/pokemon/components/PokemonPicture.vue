<script setup lang="ts">
import { computed, defineProps } from 'vue'

interface Props {
  pokemonId: number
  showPokemon?: boolean
}
const props = defineProps<Props>()

const pokemonImage = computed(() => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.pokemonId}.svg`
})
</script>

<template>
  <img
    v-if="showPokemon"
    :src="pokemonImage"
    alt="Pokemon image"
    class="trasition-all fade-in h-48 w-48 mb-8"
  />
  <img v-else :src="pokemonImage" alt="Pokemon image" class="brightness-0 h-48 w-48" />
</template>
