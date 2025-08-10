<script setup lang="ts">
import PokemonPicture from '@/modules/pokemon/components/PokemonPicture.vue'
import PokemonOptions from '@/modules/pokemon/components/PokemosOptions.vue'
import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame'
import { GameEstatus } from '@/modules/pokemon/interfaces/GameEstatus'

const {
  randomPokemon,
  isLoading,
  gameStatus,
  pokemonOptions,
  checkAnswer,
  getNextRound,
  successCounter,
  lostCounter,
} = usePokemonGame()

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
    <div v-if="successCounter > 0 || lostCounter > 0" class="flex gap-4 mb-8">
      <div
        class="w-22 flex justify-center bg-emerald-50 border border-emerald-500/20 p-2 rounded-lg text-emerald-500"
      >
        <span>{{ successCounter }}</span>
      </div>
      <div
        class="w-22 flex justify-center bg-rose-50 border border-rose-500/20 p-2 rounded-lg text-rose-500"
      >
        <span>{{ lostCounter }}</span>
      </div>
    </div>
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
