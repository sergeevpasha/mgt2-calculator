<script setup lang="ts">
import { computed } from 'vue';
import { NO_SUBGENRE } from '#shared/genres';
import type { Genre } from '#shared/genres';
import StepHeading from '~/components/StepHeading.vue';
import StepPanel from '~/components/StepPanel.vue';
import UiIcon from '~/components/UiIcon.vue';
import { getGenreIconSrc, getSubgenreIconSrc } from '~/data/icons';

const props = defineProps<{ genres: Genre[]; genre: Genre; subgenre: string }>();
const emit = defineEmits<{ selectGenre: [genre: Genre]; selectSubgenre: [subgenre: string] }>();

const subgenreOptions = computed(() =>
  props.genre.subgenres.map(name => ({
    name,
    label: name === NO_SUBGENRE ? 'No subgenre' : name,
    icon: getSubgenreIconSrc(name),
  }))
);
</script>

<template>
  <StepPanel aria-labelledby="genre-heading">
    <div class="flex items-center justify-between gap-3">
      <StepHeading id="genre-heading" step="01">Choose your genre</StepHeading>
      <span class="whitespace-nowrap text-[13px] text-muted">{{ genres.length }} genres</span>
    </div>
    <p class="mb-6 mt-2 text-[15px] leading-relaxed text-muted max-sm:mb-5 max-sm:text-[14px]">
      Pick a primary genre, then a subgenre. Leaving the subgenre empty costs review points.
    </p>
    <div class="mb-3 flex items-baseline justify-between gap-3">
      <span id="primary-label" class="text-[15px] font-semibold">Primary genre</span
      ><span class="text-[13px] text-muted">Choose one</span>
    </div>
    <div
      class="grid grid-cols-[repeat(auto-fill,minmax(90px,1fr))] gap-2 max-sm:gap-1.5"
      role="group"
      aria-labelledby="primary-label"
    >
      <button
        v-for="option in genres"
        :key="option.id"
        class="group relative flex min-h-[104px] flex-col items-center gap-2 rounded-[10px] border px-1.5 pb-2.5 pt-3 motion-safe:transition max-sm:min-h-[88px] max-sm:gap-1.5 max-sm:pb-2 max-sm:pt-2.5"
        :class="
          option.id === genre.id
            ? 'border-accent-400 bg-accent-soft text-accent-700 ring-1 ring-accent-400/[.125]'
            : 'border-transparent bg-steel-100 hover:border-steel-350 hover:bg-steel-200'
        "
        :aria-pressed="option.id === genre.id"
        @click="emit('selectGenre', option)"
      >
        <span
          v-if="option.id === genre.id"
          class="absolute right-1.5 top-1.5 grid size-4 place-items-center rounded-full bg-accent text-white"
          ><UiIcon class="size-2.5 stroke-[2.5]" name="check"
        /></span>
        <img
          class="size-10 object-contain group-hover:-translate-y-0.5 motion-safe:transition-transform motion-safe:duration-[180ms] max-sm:size-9"
          :src="getGenreIconSrc(option)"
          alt=""
          width="40"
          height="40"
        />
        <span class="text-[13px] font-semibold leading-[1.3]">{{ option.name }}</span>
      </button>
    </div>

    <div id="subgenres" class="mt-6 border-t border-line pt-6 max-md:mt-5 max-md:pt-5">
      <div class="mb-3 flex items-baseline justify-between gap-3">
        <span id="subgenre-label" class="text-[15px] font-semibold">Subgenre</span
        ><span class="text-[13px] text-muted">Recommended</span>
      </div>
      <div class="flex flex-wrap gap-2" role="group" aria-labelledby="subgenre-label">
        <button
          v-for="option in subgenreOptions"
          :key="option.name"
          class="inline-flex min-h-11 items-center gap-2 rounded-lg border px-3 py-1.5 text-[14px] motion-safe:transition"
          :class="
            option.name === subgenre
              ? 'border-accent-300 bg-accent-soft text-denim-700'
              : 'border-line hover:bg-steel-150'
          "
          :aria-pressed="option.name === subgenre"
          @click="emit('selectSubgenre', option.name)"
        >
          <img v-if="option.icon" class="size-6 object-contain" :src="option.icon" alt="" width="24" height="24" />
          <UiIcon v-else-if="option.name === subgenre" class="size-4" name="check" />
          {{ option.label }}
        </button>
      </div>
    </div>
    <div
      class="mt-6 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 rounded-[10px] bg-steel-100 px-4 py-3 max-md:mt-5"
    >
      <span class="text-[14px] text-muted">Target audience</span>
      <div class="flex flex-wrap gap-1.5">
        <span
          v-for="group in genre.targetGroups"
          :key="group"
          class="rounded-md border border-steel-300 bg-surface px-2 py-1 text-[13px] text-steel-900"
          >{{ group }}</span
        >
      </div>
    </div>
  </StepPanel>
</template>
