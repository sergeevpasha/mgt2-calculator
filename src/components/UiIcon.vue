<template>
  <svg
    class="shrink-0"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.7"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path v-for="(path, index) in paths[name]" :key="index" :d="path" />
  </svg>
</template>

<script setup lang="ts">
defineProps<{ name: 'arrow' | 'check' | 'search' | 'shuffle' | 'sparkles' | 'copy' | 'close' | 'sliders' }>();
const paths = {
  arrow: ['M7 17 17 7M7 7h10v10'],
  check: ['m5 12 4 4L19 6'],
  search: ['M21 21l-5-5', 'M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0'],
  shuffle: ['M3 7h3c5 0 7 10 12 10h3m-4-4 4 4-4 4', 'M3 17h3c2 0 3-1 4-3m4-4c1-2 2-3 4-3h3m-4-4 4 4-4 4'],
  sparkles: ['m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3', 'M20 2v4m-2-2h4'],
  copy: ['M9 9h11v12H9z', 'M5 16H3V3h12v2'],
  close: ['m6 6 12 12M6 18 18 6'],
  sliders: ['M4 7h7m4 0h5M4 17h2m4 0h10', 'M11 4v6m-5 4v6'],
};
</script>
