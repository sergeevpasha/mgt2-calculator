<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { useHead } from '#imports';

useHead({
  htmlAttrs: {
    class:
      'scroll-pt-6 bg-paper antialiased [-webkit-tap-highlight-color:transparent] [color-scheme:light] [font-synthesis:none] [text-rendering:optimizeLegibility] motion-safe:scroll-smooth max-sm:scroll-pt-3.5',
  },
  bodyAttrs: {
    class: 'text-[14px] text-ink',
  },
});
</script>
