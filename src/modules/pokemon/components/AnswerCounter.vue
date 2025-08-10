<script setup lang="ts">
import { defineProps } from 'vue'
import { Trophy, CircleX } from 'lucide-vue-next'

interface Props {
  successCounter: number
  lostCounter: number
}
const props = defineProps<Props>()
</script>

<template>
  <div v-if="props.successCounter > 0 || props.lostCounter > 0" class="flex gap-2 mr-8">
    <div
      class="px-3 flex justify-between gap-4 items-center bg-emerald-50 border border-emerald-500/20 rounded text-emerald-500"
    >
      <Trophy stroke-width="1.5" :size="18" />
      <span class="text-sm">{{ props.successCounter }}</span>
    </div>
    <div
      class="px-3 flex justify-between gap-4 items-center bg-rose-50 border border-rose-500/20 rounded text-rose-500"
    >
      <CircleX stroke-width="1.5" :size="18" />
      <span class="text-sm">{{ props.lostCounter }}</span>
    </div>
  </div>
</template>
