<script setup lang="ts">
import { computed } from 'vue';
import type { LabeledValue } from '~/utils/designSettings';

const props = defineProps<{ rows: LabeledValue[]; variant?: 'focus' | 'direction' }>();
const isDirection = computed(() => props.variant === 'direction');
</script>

<template>
  <ol
    class="grid"
    :class="isDirection ? 'grid-cols-3 gap-6 max-lg:gap-4 max-sm:grid-cols-1' : 'gap-4'"
    :aria-label="isDirection ? 'Direction values' : 'Focus values'"
  >
    <li
      v-for="row in rows"
      :key="row.label"
      class="flex min-w-0 flex-col justify-between"
      :aria-label="`${row.label}: ${row.value} out of 10`"
    >
      <div class="mb-2 flex items-baseline justify-between gap-3">
        <span class="text-[14px] leading-snug text-steel-900">{{ row.label }}</span
        ><strong class="text-[20px] font-semibold leading-none tabular-nums text-denim-800">{{ row.value }}</strong>
      </div>
      <div class="grid grid-cols-10 gap-1" aria-hidden="true">
        <span
          v-for="step in 10"
          :key="step"
          class="h-1.5 rounded-full"
          :class="step <= row.value ? (isDirection ? 'bg-denim-350' : 'bg-accent-400') : 'bg-steel-300'"
        ></span>
      </div>
    </li>
  </ol>
</template>
