<template>
  <div>
    <h3 v-if="title">{{ title }}</h3>
    <ol
      class="grid"
      :class="
        isDirection ? 'grid-cols-3 gap-[18px] max-sm:grid-cols-[1fr] max-sm:gap-[13px]' : 'gap-[13px] max-sm:gap-[11px]'
      "
      :aria-label="title || (isDirection ? 'Direction values' : 'Focus values')"
    >
      <li
        v-for="(value, index) in values"
        :key="index"
        class="min-w-0"
        :class="{ 'max-sm:grid max-sm:grid-cols-2 max-sm:items-center max-sm:gap-4': isDirection }"
        :aria-label="`${labels?.[index] || `Position ${index + 1}`}: ${value} out of 10`"
      >
        <div
          class="mb-[5px] flex min-h-[22px] items-center justify-between gap-2 max-lg:min-h-[30px]"
          :class="isDirection ? 'max-sm:m-0 max-sm:min-h-6' : 'max-sm:min-h-8'"
        >
          <span
            class="leading-[1.4] text-steel-850"
            :class="isDirection ? 'text-[10px]' : 'text-[11px] max-sm:text-[10px]'"
            >{{ labels?.[index] || `Position ${index + 1}` }}</span
          ><strong class="text-[17px] font-semibold leading-none tabular-nums text-denim-800">{{ value }}</strong>
        </div>
        <div class="grid grid-cols-10 gap-[3px] max-sm:gap-0.5" aria-hidden="true">
          <span
            v-for="step in 10"
            :key="step"
            class="h-1 rounded-sm"
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
