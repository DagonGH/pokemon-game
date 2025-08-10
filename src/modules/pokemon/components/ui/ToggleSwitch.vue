<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

// 1. Definimos la prop que recibirá el valor booleano desde el padre.
//    La convención para v-model es que la prop se llame 'modelValue'.
defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
})

// 2. Definimos el evento que el componente puede emitir.
//    La convención es 'update:modelValue'.
const emit = defineEmits(['update:modelValue'])

// ✅ 2. Crea el método que maneja el evento
const handleChange = (event: Event) => {
  // ✅ 3. Informa a TypeScript que el target es un HTMLInputElement
  const target = event.target as HTMLInputElement
  // Ahora TypeScript sabe que 'target.checked' existe y es un booleano
  emit('update:modelValue', target.checked)
}
</script>
<template>
  <div class="flex items-center space-x-4">
    <label class="relative inline-flex cursor-pointer items-center">
      <input type="checkbox" :checked="modelValue" @change="handleChange" class="peer sr-only" />

      <div
        class="h-6 w-12 rounded-full bg-gray-300 after:absolute after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow-md after:transition-all after:content-[''] peer-checked:bg-emerald-500 peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300"
      ></div>
    </label>
  </div>
</template>
