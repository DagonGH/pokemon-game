import { ref, computed, onMounted } from 'vue'
import { GameEstatus } from '@/modules/pokemon/interfaces/GameEstatus'
import type { Pokemon, Result } from '@/modules/pokemon/interfaces/PokemonResponse'
import launchConfetti from '@/modules/pokemon/helpers/LaunchConfetti'

export const usePokemonGame = () => {
  const gameStatus = ref<GameEstatus>(GameEstatus.playing)
  const pokemons = ref<Pokemon[]>([])
  const pokemonOptions = ref<Pokemon[]>([])
  const successCounter = ref<number>(0)
  const lostCounter = ref<number>(0)
  const automaticRound = ref<boolean>(true)

  const randomPokemon = computed<Pokemon | null>(() => {
    // Protección por si las opciones aún no están cargadas
    if (pokemonOptions.value.length === 0) return null

    // Elige un pokémon al azar de las opciones para mezclarlo, math.floor redondea y le quita decimales
    const randomIndex = Math.floor(Math.random() * pokemonOptions.value.length)
    return pokemonOptions.value[randomIndex]
  })

  const isLoading = computed(() => pokemons.value.length === 0)

  const getPokemons = async (): Promise<Pokemon[]> => {
    const data = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150').then((res) =>
      res.json(),
    )
    const pokemonsArray = data.results.map((pokemon: Result) => {
      return {
        id: pokemon.url.split('/').slice(-2, -1)[0],
        name: pokemon.name,
      }
    })
    //Se hace un sort random para que no siempre sea la misma lista o este en desorden
    return pokemonsArray.sort(() => Math.random() - 0.5)
  }

  const getNextRound = (howMany: number = 4) => {
    gameStatus.value = GameEstatus.playing
    //Se toman los primeros 4 pokemons
    pokemonOptions.value = pokemons.value.slice(0, howMany)
    //Se quitan los primeros 4 pokemons
    pokemons.value = pokemons.value.slice(howMany)
  }

  const checkAnswer = (id: number) => {
    const hasWon = randomPokemon.value?.id === id

    if (hasWon) {
      gameStatus.value = GameEstatus.won
      launchConfetti()
      successCounter.value++
    } else {
      gameStatus.value = GameEstatus.lost
      lostCounter.value++
    }
    if (automaticRound.value) {
      setTimeout(() => {
        getNextRound()
      }, 1500)
    }
  }

  onMounted(async () => {
    pokemons.value = await getPokemons()
    getNextRound()
  })

  return {
    gameStatus,
    isLoading,
    pokemonOptions,
    randomPokemon,
    successCounter,
    lostCounter,
    automaticRound,
    //Funciones
    getNextRound,
    checkAnswer,
  }
}
