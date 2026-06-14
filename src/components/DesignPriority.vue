<template>
  <div>
    <h3 v-if="title" class="font-medium mb-2 text-center">{{ title }}</h3>
    <div class="flex flex-wrap gap-2">
      <div
        v-for="(value, index) in values"
        :key="index"
        class="relative flex h-10 w-10 items-center justify-center"
      >
        <div class="absolute inset-0 rounded-full shadow-sm ring-1 ring-black/5" :class="getColorClass(value)"></div>
        <span class="relative z-10 text-sm font-bold text-white">{{ value }}</span>
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
