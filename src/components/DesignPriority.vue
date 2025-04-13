<template>
  <div class="mt-2">
    <h3 class="font-medium mb-2 text-center">{{ title }}</h3>
    <div class="flex flex-wrap gap-2 justify-center">
      <div
        v-for="(value, index) in values"
        :key="index"
        class="relative w-8 h-8 flex items-center justify-center group"
      >
        <div class="absolute inset-0 rounded-full" :class="getColorClass(value)"></div>
        <span class="relative z-10 text-white font-bold text-sm">{{ value }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DesignPriorityProps } from '~/types';

defineProps<DesignPriorityProps>();

const getColorClass = (value: number): string => {
  if (value <= 15) return 'bg-red-500';
  if (value <= 25) return 'bg-orange-500';
  if (value <= 35) return 'bg-yellow-500';
  return 'bg-green-500';
};
</script>
