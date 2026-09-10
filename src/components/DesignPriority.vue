<template>
  <div class="design-priority">
    <h3 v-if="title">{{ title }}</h3>
    <dl class="priority-values">
      <div v-for="(value, index) in values" :key="index" class="priority-item">
        <dt class="priority-label">{{ priorityLabels[index] }}</dt>
        <dd class="priority-number">
          {{ value }}<small>%</small
          ><span class="priority-track" aria-hidden="true"><span :style="{ width: `${value}%` }"></span></span>
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
