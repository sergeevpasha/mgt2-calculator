<script setup lang="ts">
import { computed, ref } from 'vue';
import StepHeading from '~/components/StepHeading.vue';
import StepPanel from '~/components/StepPanel.vue';
import UiIcon from '~/components/UiIcon.vue';
import { getTopicIcon } from '~/data/icons';

const props = defineProps<{ genreName: string; topics: string[]; selected: string[] }>();
const emit = defineEmits<{ toggle: [topic: string] }>();

const search = ref('');
const matches = computed(() => {
  const query = search.value.trim().toLowerCase();
  return props.topics.filter(topic => topic.toLowerCase().includes(query));
});
</script>

<template>
  <StepPanel id="topics" class="mt-6 max-lg:mt-5 max-sm:mt-4" aria-labelledby="topics-heading">
    <div class="flex items-center justify-between gap-5 max-sm:flex-col max-sm:items-stretch max-sm:gap-0">
      <div>
        <StepHeading id="topics-heading" step="03">
          Topic library
          <template #after>
            <span class="rounded-md bg-steel-200 px-2 py-0.5 text-[13px] font-semibold text-muted">{{
              topics.length
            }}</span>
          </template>
        </StepHeading>
        <p class="mb-5 mt-2 text-[15px] leading-relaxed text-muted max-sm:mb-4 max-sm:text-[14px]">
          Topics that fit <strong class="font-semibold text-denim-600">{{ genreName }}</strong
          >. Pick two to use in your game.
        </p>
      </div>
      <div
        class="flex w-[280px] shrink-0 items-center gap-2.5 rounded-lg border border-line bg-steel-50 px-3 focus-within:border-accent focus-within:outline-3 focus-within:outline-accent/25 max-md:w-[240px] max-sm:mb-4 max-sm:w-full"
      >
        <UiIcon class="size-4 text-muted" name="search" /><input
          v-model="search"
          class="h-11 w-full min-w-0 bg-transparent text-[15px] text-ink placeholder:text-muted focus:outline-hidden [&::-webkit-search-cancel-button]:hidden max-sm:text-[16px]"
          type="search"
          aria-label="Search compatible topics"
          placeholder="Find a topic…"
        /><button
          v-if="search"
          class="inline-flex size-8 shrink-0 items-center justify-center rounded-lg p-1.5 text-muted hover:bg-steel-150 motion-safe:transition"
          aria-label="Clear topic search"
          @click="search = ''"
        >
          <UiIcon name="close" />
        </button>
      </div>
    </div>
    <div class="flex min-h-14 flex-wrap items-center gap-x-3 gap-y-2 border-t border-line py-3 text-[13px] text-muted">
      <span class="text-[12px] font-bold tracking-[1px] max-sm:hidden">{{
        search ? `${matches.length} matching topics` : 'COMPATIBLE TOPICS'
      }}</span>
      <div v-if="selected.length" class="flex flex-wrap gap-2">
        <button
          v-for="topic in selected"
          :key="topic"
          class="flex min-h-8 items-center gap-1.5 rounded-md border border-accent-200 bg-accent-soft px-2.5 py-1 text-[13px] text-denim-700 motion-safe:transition"
          :aria-label="`Remove ${topic}`"
          @click="emit('toggle', topic)"
        >
          {{ getTopicIcon(topic) }} {{ topic }}<UiIcon class="size-3" name="close" />
        </button>
      </div>
      <span v-else>Click a topic to select it</span
      ><span class="ml-auto whitespace-nowrap">{{ selected.length }} / 2 selected</span>
    </div>
    <div
      v-if="matches.length"
      class="grid max-h-[372px] grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2 overflow-y-auto pb-1.5 pl-0.5 pr-2 pt-0.5 [scrollbar-color:var(--color-steel-400)_transparent] [scrollbar-width:thin] max-sm:max-h-[440px] max-sm:grid-cols-2"
      role="group"
      aria-label="Compatible topics"
    >
      <button
        v-for="topic in matches"
        :key="topic"
        class="flex min-h-12 items-center gap-2.5 rounded-lg border px-3 py-2 text-left text-[14px] leading-snug motion-safe:transition"
        :class="
          selected.includes(topic)
            ? 'border-accent-300 bg-accent-soft text-accent-700'
            : 'border-transparent bg-steel-100 hover:border-steel-350 hover:bg-steel-200'
        "
        :aria-pressed="selected.includes(topic)"
        @click="emit('toggle', topic)"
      >
        <span class="text-[20px] leading-none" aria-hidden="true">{{ getTopicIcon(topic) }}</span
        ><span class="[overflow-wrap:anywhere]">{{ topic }}</span
        ><UiIcon v-if="selected.includes(topic)" class="ml-auto size-3.5" name="check" />
      </button>
    </div>
    <div v-else class="px-4 py-10 text-center text-muted">
      <UiIcon class="mx-auto mb-3 size-7" name="search" />
      <h3 class="text-[16px] font-semibold text-ink">No topics found for “{{ search }}”</h3>
      <p class="my-2 text-[14px]">Try another search or choose a different genre.</p>
      <button
        class="inline-flex min-h-10 items-center justify-center gap-1.5 px-2 text-[14px] font-semibold text-denim-600 hover:text-accent motion-safe:transition"
        @click="search = ''"
      >
        Clear search
      </button>
    </div>
  </StepPanel>
</template>
