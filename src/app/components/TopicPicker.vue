<script setup lang="ts">
import StepHeading from '~/components/StepHeading.vue';
import StepPanel from '~/components/StepPanel.vue';
import TopicSelect from '~/components/TopicSelect.vue';
import UiIcon from '~/components/UiIcon.vue';

const primaryTopic = defineModel<string>('primaryTopic', { required: true });
const secondaryTopic = defineModel<string>('secondaryTopic', { required: true });
defineProps<{ genreName: string; topics: string[] }>();
const emit = defineEmits<{ selectTopic: [topic: string]; random: [] }>();

const onTopicChange = (topic: string): void => {
  if (topic) emit('selectTopic', topic);
};
</script>

<template>
  <StepPanel aria-labelledby="concept-heading">
    <div class="flex items-center justify-between gap-3">
      <StepHeading id="concept-heading" step="02">Pick your topics</StepHeading>
      <UiIcon class="size-6 text-steel-500" name="sparkles" />
    </div>
    <p class="mb-6 mt-2 text-[15px] leading-relaxed text-muted max-sm:mb-5 max-sm:text-[14px]">
      Only topics that fit <strong class="font-semibold text-denim-600">{{ genreName }}</strong> are listed. Pick two,
      since a single topic costs review points.
    </p>
    <div class="grid grid-cols-[minmax(0,1fr)_16px_minmax(0,1fr)] items-end gap-3 max-sm:grid-cols-1 max-sm:gap-4">
      <TopicSelect
        id="topic-one"
        v-model="primaryTopic"
        :topics="topics"
        :excluded="secondaryTopic"
        @change="onTopicChange"
        >Primary topic</TopicSelect
      >
      <span class="self-end pb-3 text-center text-[16px] text-steel-500 max-sm:hidden" aria-hidden="true">+</span>
      <TopicSelect
        id="topic-two"
        v-model="secondaryTopic"
        :topics="topics"
        :excluded="primaryTopic"
        @change="onTopicChange"
        >Secondary topic <span class="text-[13px] font-normal text-muted">Recommended</span></TopicSelect
      >
    </div>
    <div class="mt-4 flex flex-wrap items-center justify-between gap-3">
      <button
        class="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-accent-300 bg-accent-soft px-4 py-2.5 text-[14px] font-[650] text-accent-700 hover:border-accent-400 hover:bg-accent-100 motion-safe:transition max-sm:w-full"
        @click="emit('random')"
      >
        <UiIcon class="size-[18px]" name="shuffle" /> Random topics
      </button>
      <a
        class="inline-flex min-h-11 items-center text-[14px] text-muted hover:text-accent motion-safe:transition max-sm:w-full max-sm:justify-center"
        href="#topics"
        >Browse topic library <span class="ml-1.5" aria-hidden="true">↓</span></a
      >
    </div>
    <slot />
  </StepPanel>
</template>
