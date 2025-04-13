<template>
  <div>
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
import type { DesignValuesProps } from '~/types';

const props = defineProps<DesignValuesProps>();

const getColorClass = (value: number): string => {
  if (props.type === 'focus') {
    if (value <= 3) return 'bg-red-500';
    if (value <= 5) return 'bg-yellow-500';
    if (value <= 7) return 'bg-blue-500';
    return 'bg-green-500';
  } else {
    if (value <= 5) return 'bg-purple-500';
    if (value <= 7) return 'bg-indigo-500';
    return 'bg-blue-600';
  }
};
</script>
