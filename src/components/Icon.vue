<template>
  <span class="icon" :title="name" role="img" :aria-label="name">{{ glyph }}</span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getGenreIcon, getTopicIcon } from '~/data/icons';

const props = defineProps<{
  name: string;
  kind?: 'genre' | 'topic';
}>();

// Swap point: today this returns an emoji glyph. To use real sprite files,
// resolve `name`/`kind` to an image path and render an <img> here instead.
const glyph = computed(() => (props.kind === 'genre' ? getGenreIcon(props.name) : getTopicIcon(props.name)));
</script>

<style scoped>
.icon {
  display: inline-block;
  line-height: 1;
  font-style: normal;
}
</style>
