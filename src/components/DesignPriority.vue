<template>
  <div>
    <h3 v-if="title">{{ title }}</h3>
    <dl class="grid grid-cols-4">
      <div
        v-for="(value, index) in values"
        :key="index"
        class="min-w-0 border-l border-line px-4 first:border-l-0 first:pl-0 last:pr-0 max-lg:px-3 max-sm:px-2.5 max-xs:px-[7px]"
      >
        <dt class="text-[11px] text-muted max-sm:text-[10px]">{{ priorityLabels[index] }}</dt>
        <dd
          class="mt-1 text-[32px] font-semibold leading-normal tracking-[-1px] tabular-nums max-sm:text-[28px] max-xs:text-[25px]"
        >
          {{ value
          }}<small class="ml-0.5 text-[14px] font-medium tracking-normal text-steel-650 max-sm:text-[11px]">%</small
          ><span class="mt-2 block h-1 overflow-hidden rounded-[3px] bg-steel-250" aria-hidden="true"
            ><span
              class="block h-full rounded-[inherit] bg-accent-500 motion-safe:transition-[width] motion-safe:duration-[180ms]"
              :style="{ width: `${value}%` }"
            ></span
          ></span>
        </dd>
      </div>
    </dl>
  </div>
</template>

<script setup lang="ts">
import type { DesignPriorityProps } from '~/types';
import { priorityLabels } from '~/data/designLabels';
defineProps<DesignPriorityProps>();
</script>
