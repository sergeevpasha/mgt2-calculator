<script setup lang="ts">
import { nextTick, useTemplateRef, watch } from 'vue';
import { useGtag, useHead, useRoute, useRuntimeConfig } from '#imports';
import { NO_SUBGENRE, genres } from '#shared/genres';
import type { Genre } from '#shared/genres';
import DesignSettingsCard from '~/components/DesignSettingsCard.vue';
import GenrePicker from '~/components/GenrePicker.vue';
import NameGenerator from '~/components/NameGenerator.vue';
import TopicLibrary from '~/components/TopicLibrary.vue';
import TopicPicker from '~/components/TopicPicker.vue';
import { useCalculatorSelection } from '~/composables/useCalculatorSelection';
import { useNameGenerator } from '~/composables/useNameGenerator';
import { useQuerySync } from '~/composables/useQuerySync';
import { parseSelection, toQueryParams } from '~/utils/selectionQuery';

const { siteUrl } = useRuntimeConfig().public;
useHead({ link: [{ rel: 'canonical', href: `${siteUrl}/` }] });

const {
  genre,
  subgenre,
  primaryTopic,
  secondaryTopic,
  selection,
  compatibleTopics,
  selectedTopics,
  selectGenre,
  isTopicSelected,
  toggleTopic,
  pickRandomTopics,
} = useCalculatorSelection(parseSelection(useRoute().query));
useQuerySync(() => toQueryParams(selection.value));

const { names, error: nameError, isLoading: isGenerating, generate, reset: resetNames } = useNameGenerator();
// Name ideas belong to the selection they were generated for.
watch(selection, resetNames);

// Report calculator interactions to GA4. Without them, a visitor who finds their numbers in a few
// seconds and leaves looks exactly like one who bounced.
const { gtag } = useGtag();
const track = (name: string, params: Record<string, string> = {}): void => {
  gtag('event', name, { genre: genre.value.name, ...params });
};

// When the columns stack (below the md breakpoint), the next step sits under the genre grid after a tap.
// Scroll it into view; html's motion-safe:scroll-smooth decides whether that animates.
const calculator = useTemplateRef('calculator');
const revealWhenStacked = (id: string): void => {
  const grid = calculator.value;
  if (!grid || getComputedStyle(grid).gridTemplateColumns.split(' ').length > 1) return;
  nextTick(() => document.getElementById(id)?.scrollIntoView({ block: 'start' }));
};

const onSelectGenre = (next: Genre): void => {
  selectGenre(next);
  track('select_genre');
  revealWhenStacked('subgenres');
};
const onSelectSubgenre = (name: string): void => {
  subgenre.value = name;
  track('select_subgenre', { subgenre: name });
  revealWhenStacked('design-settings');
};
const onToggleTopic = (topic: string): void => {
  toggleTopic(topic);
  if (isTopicSelected(topic)) track('select_topic', { topic });
};
const onRandomTopics = (): void => {
  pickRandomTopics();
  track('random_topics');
};
const onGenerateNames = (): void => {
  if (!primaryTopic.value || isGenerating.value) return;
  track('generate_names', { topic: primaryTopic.value, topic2: secondaryTopic.value });
  generate({
    genre: genre.value.name,
    subgenre: subgenre.value === NO_SUBGENRE ? undefined : subgenre.value,
    topics: selectedTopics.value,
  });
};
</script>

<template>
  <div>
    <div class="pb-8 pt-10 max-sm:px-1 max-sm:pb-5 max-sm:pt-6">
      <h1
        class="text-[clamp(30px,3.2vw,44px)] font-[650] leading-[1.15] tracking-[-1.5px] max-sm:text-[28px] max-sm:tracking-[-0.8px]"
      >
        Build your next <em class="font-serif font-normal text-accent">big hit.</em>
      </h1>
      <p class="mt-3 text-[17px] leading-relaxed text-muted max-sm:mt-2 max-sm:text-[15px]">
        Pick a genre to see its slider values, target groups and compatible topics.
      </p>
    </div>

    <div
      id="calculator"
      ref="calculator"
      class="grid grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] items-start gap-6 max-lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] max-lg:gap-5 max-md:grid-cols-[1fr] max-sm:gap-4"
    >
      <GenrePicker
        :genres="genres"
        :genre="genre"
        :subgenre="subgenre"
        @select-genre="onSelectGenre"
        @select-subgenre="onSelectSubgenre"
      />
      <div class="flex min-w-0 flex-col gap-6 max-lg:gap-5 max-sm:gap-4">
        <DesignSettingsCard
          id="design-settings"
          :genre="genre"
          :subgenre="subgenre"
          @copied="track('copy_settings', { subgenre })"
        />
        <TopicPicker
          v-model:primary-topic="primaryTopic"
          v-model:secondary-topic="secondaryTopic"
          :genre-name="genre.name"
          :topics="compatibleTopics"
          @select-topic="topic => track('select_topic', { topic })"
          @random="onRandomTopics"
        >
          <NameGenerator
            :names="names"
            :error="nameError"
            :is-loading="isGenerating"
            :disabled="!primaryTopic"
            @generate="onGenerateNames"
          />
        </TopicPicker>
      </div>
    </div>

    <!-- Keyed by genre so each genre's library opens with an empty search. -->
    <TopicLibrary
      :key="genre.id"
      :genre-name="genre.name"
      :topics="compatibleTopics"
      :selected="selectedTopics"
      @toggle="onToggleTopic"
    />
  </div>
</template>
