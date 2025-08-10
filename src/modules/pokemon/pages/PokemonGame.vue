<script setup lang="ts">
import PokemonPicture from '@/modules/pokemon/components/PokemonPicture.vue'
import PokemonOptions from '@/modules/pokemon/components/PokemosOptions.vue'
import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame'
import { GameEstatus } from '@/modules/pokemon/interfaces/GameEstatus'

const { randomPokemon, isLoading, gameStatus, pokemonOptions, checkAnswer, getNextRound } =
  usePokemonGame()

const onSelectedOption = (id: number) => {
  checkAnswer(id)
}
</script>

<template>
  <section
    v-if="isLoading || randomPokemon === null"
    class="flex flex-col items-center justify-center h-screen w-screen"
  >
    <h1 class="text-3xl font-bold">Espere por favor</h1>
    <p class="text-xl animate-pulse">Espere por favor</p>
  </section>

  <section v-else class="flex flex-col items-center justify-center h-screen w-screen">
    <img src="@/assets/who-is.png" alt="Who is this Pokemon?" class="w-96 mb-8" />
    <PokemonPicture
      :pokemon-id="randomPokemon.id"
      :show-pokemon="gameStatus !== GameEstatus.playing"
    />
    <PokemonOptions
      :options="pokemonOptions"
      @selected-option="onSelectedOption"
      :disabled-options="gameStatus !== GameEstatus.playing"
      :correct-option="randomPokemon.id"
    />
    <button
      v-if="gameStatus !== GameEstatus.playing"
      @click="getNextRound()"
      class="mt-8 hover:bg-blue-100 w-48 p-4 rounded-lg text-blue-500 transition-all cursor-pointer"
    >
      Jugar de nuevo
    </button>
  </section>
</template>
