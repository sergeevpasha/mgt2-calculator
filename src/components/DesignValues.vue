<template>
  <div class="design-values" :class="{ 'direction-values': type === 'direction' }">
    <h3 v-if="title">{{ title }}</h3>
    <ol class="value-list" :aria-label="title || (type === 'direction' ? 'Direction values' : 'Focus values')">
      <li
        v-for="(value, index) in values"
        :key="index"
        class="design-value"
        :aria-label="`${labels?.[index] || `Position ${index + 1}`}: ${value} out of 10`"
      >
        <div class="value-heading">
          <span>{{ labels?.[index] || `Position ${index + 1}` }}</span
          ><strong>{{ value }}</strong>
        </div>
        <div class="value-track" aria-hidden="true">
          <span v-for="step in 10" :key="step" :class="{ 'is-filled': step <= value }"></span>
        </div>
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
import type { DesignValuesProps } from '~/types';
defineProps<DesignValuesProps>();
</script>
