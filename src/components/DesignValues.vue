<template>
  <div>
    <h3 v-if="title">{{ title }}</h3>
    <ol
      class="grid"
      :class="isDirection ? 'grid-cols-3 gap-6 max-lg:gap-4 max-sm:grid-cols-1' : 'gap-4'"
      :aria-label="title || (isDirection ? 'Direction values' : 'Focus values')"
    >
      <li
        v-for="(value, index) in values"
        :key="index"
        class="flex min-w-0 flex-col justify-between"
        :aria-label="`${labels?.[index] || `Position ${index + 1}`}: ${value} out of 10`"
      >
        <div class="mb-2 flex items-baseline justify-between gap-3">
          <span class="text-[14px] leading-snug text-steel-900">{{ labels?.[index] || `Position ${index + 1}` }}</span
          ><strong class="text-[20px] font-semibold leading-none tabular-nums text-denim-800">{{ value }}</strong>
        </div>
        <div class="grid grid-cols-10 gap-1" aria-hidden="true">
          <span
            v-for="step in 10"
            :key="step"
            class="h-1.5 rounded-full"
            :class="step <= value ? (isDirection ? 'bg-denim-350' : 'bg-accent-400') : 'bg-steel-300'"
          ></span>
        </div>
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { DesignValuesProps } from '~/types';
const props = defineProps<DesignValuesProps>();
const isDirection = computed(() => props.type === 'direction');
</script>
