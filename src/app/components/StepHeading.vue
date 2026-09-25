<script setup lang="ts">
defineProps<{ id: string; step: string }>();
</script>

<template>
  <div class="flex items-center gap-3">
    <span
      class="inline-flex size-7 shrink-0 items-center justify-center rounded-lg bg-steel-200 text-[12px] font-bold text-muted"
      >{{ step }}</span
    >
    <h2 :id="id" class="text-[20px] font-[650] leading-snug tracking-[-0.4px] max-sm:text-[18px]">
      <slot />
    </h2>
    <slot name="after" />
  </div>
</template>
