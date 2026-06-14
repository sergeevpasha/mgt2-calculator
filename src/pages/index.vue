<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-slate-800">
    <div class="mx-auto max-w-[1200px] px-4 py-5 sm:px-6 lg:px-8">
      <!-- Header -->
      <header class="mb-5 flex items-center justify-center gap-2 text-center">
        <span class="text-xl">🎮</span>
        <h1 class="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Mad Games Tycoon 2 <span class="font-medium text-slate-400">— Game Design Calculator</span>
        </h1>
      </header>

      <!-- Configuration -->
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start">
        <!-- Genre card -->
        <section class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <div class="mb-5 flex items-center gap-2">
            <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">①</span>
            <h2 class="text-lg font-semibold text-slate-900">Genre</h2>
          </div>

          <label class="mb-2 block text-sm font-medium text-slate-600">Primary genre</label>

          <!-- Desktop: icon grid of real in-game genre icons (auto-fits the column) -->
          <div class="hidden gap-2 sm:grid [grid-template-columns:repeat(auto-fill,minmax(84px,1fr))]">
            <button
              v-for="genre in genresList"
              :key="genre.id"
              class="flex flex-col items-center gap-1.5 rounded-xl border p-2.5 transition"
              :class="
                selectedGenre === genre.id
                  ? 'border-indigo-300 bg-indigo-50 ring-1 ring-indigo-200'
                  : 'border-slate-100 bg-slate-50 hover:border-indigo-200 hover:bg-white'
              "
              @click="selectedGenre = genre.id"
            >
              <img :src="getGenreIconSrc(genre.name)!" :alt="genre.name" class="h-9 w-9 object-contain" />
              <span class="text-center text-[11px] font-medium leading-tight text-slate-700">{{ genre.name }}</span>
            </button>
          </div>

          <!-- Mobile: native select -->
          <select v-model="selectedGenre" :class="[selectClass, 'sm:hidden']">
            <option value="">Select a genre…</option>
            <option v-for="genre in genresList" :key="genre.id" :value="genre.id">{{ genre.name }}</option>
          </select>

          <template v-if="selectedGenre && primaryGenre">
            <label class="mb-2 mt-5 block text-sm font-medium text-slate-600">Subgenre</label>
            <!-- Desktop: pills -->
            <div class="hidden flex-wrap gap-2 sm:flex">
              <button
                v-for="sg in primaryGenre.subgenres"
                :key="sg"
                class="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm transition"
                :class="
                  selectedSubgenre === sg
                    ? 'border-indigo-300 bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-200'
                "
                @click="selectedSubgenre = sg"
              >
                <img v-if="getGenreIconSrc(sg)" :src="getGenreIconSrc(sg)!" :alt="sg" class="h-5 w-5 object-contain" />
                {{ sg }}
              </button>
            </div>
            <!-- Mobile: native select -->
            <select v-model="selectedSubgenre" :class="[selectClass, 'sm:hidden']">
              <option value="">Select a subgenre…</option>
              <option v-for="sg in primaryGenre.subgenres" :key="sg" :value="sg">{{ sg }}</option>
            </select>
          </template>

          <!-- Selected genre preview -->
          <div
            v-if="primaryGenre"
            class="mt-5 flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4"
          >
            <img :src="getGenreIconSrc(primaryGenre.name)!" :alt="primaryGenre.name" class="h-11 w-11 object-contain" />
            <div>
              <p class="font-semibold text-slate-900">
                {{ primaryGenre.name }}
                <span v-if="selectedSubgenre && selectedSubgenre !== 'None'" class="text-slate-400">
                  / {{ selectedSubgenre }}
                </span>
              </p>
              <p class="text-xs text-slate-500">{{ primaryGenre.targetGroups.join(' · ') }}</p>
            </div>
          </div>
        </section>

        <!-- Topic card -->
        <section class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <div class="mb-5 flex items-center gap-2">
            <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">②</span>
            <h2 class="text-lg font-semibold text-slate-900">Topics</h2>
          </div>

          <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label class="mb-1.5 block text-sm font-medium text-slate-600">Topic 1</label>
              <select v-model="selectedTopic" :disabled="!selectedGenre" :class="selectClass">
                <option value="">Select a topic…</option>
                <option v-for="topic in compatibleTopics" :key="topic.id" :value="topic.id">
                  {{ getTopicIcon(topic.name) }} {{ topic.name }}
                </option>
              </select>
            </div>
            <div>
              <label class="mb-1.5 block text-sm font-medium text-slate-600">Topic 2</label>
              <select v-model="selectedTopic2" :disabled="!selectedGenre" :class="selectClass">
                <option value="">Select a topic…</option>
                <option
                  v-for="topic in compatibleTopics"
                  :key="topic.id"
                  :value="topic.id"
                  :disabled="topic.id === selectedTopic"
                >
                  {{ getTopicIcon(topic.name) }} {{ topic.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="mt-4 flex flex-col gap-2 sm:flex-row">
            <button
              class="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              :disabled="!selectedGenre"
              @click="generateRandomTopics"
            >
              🎲 Random topics
            </button>
            <button
              class="flex-1 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
              :disabled="!selectedTopic || !selectedTopic2 || isLoading"
              @click="handleGenerateGameNames"
            >
              {{ isLoading ? 'Generating…' : '✨ Generate names' }}
            </button>
          </div>

          <!-- Selected topics preview -->
          <div v-if="selectedTopicObjs.length" class="mt-5 flex flex-wrap gap-2">
            <span
              v-for="t in selectedTopicObjs"
              :key="t.id"
              class="inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700"
            >
              <span>{{ getTopicIcon(t.name) }}</span> {{ t.name }}
            </span>
          </div>

          <div v-if="isLoading" class="mt-4">
            <div class="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div class="h-full w-1/2 rounded-full bg-indigo-500 animate-[loading_1s_ease-in-out_infinite]"></div>
            </div>
          </div>
        </section>
      </div>

      <!-- Generated names -->
      <section
        v-if="generatedGameNames.length"
        class="mt-6 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm"
      >
        <h2 class="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900">
          <span>✨</span> Game name ideas
        </h2>
        <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          <div
            v-for="(name, index) in generatedGameNames"
            :key="index"
            class="rounded-xl border border-slate-100 bg-slate-50 p-3 text-center text-sm font-medium text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50/50"
          >
            {{ name.replace(/"/g, '') }}
          </div>
        </div>
      </section>

      <!-- Genre details -->
      <section
        v-if="primaryGenre"
        class="mt-6 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm"
      >
        <h2 class="mb-5 flex items-center gap-2 text-lg font-semibold text-slate-900">
          <img :src="getGenreIconSrc(primaryGenre.name)!" :alt="primaryGenre.name" class="h-6 w-6 object-contain" />
          {{ primaryGenre.name }} — design settings
        </h2>

        <div class="mb-6">
          <p class="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Development priority</p>
          <div class="flex flex-wrap gap-3">
            <DesignPriority title="" :values="primaryGenre.designPriority" />
          </div>
        </div>

        <div
          v-if="selectedSubgenre && primaryGenre.designFocus[selectedSubgenre]"
          class="grid grid-cols-1 gap-5 sm:grid-cols-3"
        >
          <div class="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <h3 class="mb-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-400">Focus 1</h3>
            <DesignValues title="" :values="primaryGenre.designFocus[selectedSubgenre].focus1" type="focus" />
          </div>
          <div class="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <h3 class="mb-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-400">Focus 2</h3>
            <DesignValues title="" :values="primaryGenre.designFocus[selectedSubgenre].focus2" type="focus" />
          </div>
          <div class="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <h3 class="mb-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-400">Direction</h3>
            <DesignValues title="" :values="primaryGenre.designFocus[selectedSubgenre].direction" type="direction" />
          </div>
        </div>
      </section>

      <!-- Available topics grid -->
      <section class="mt-6 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <div class="mb-4 flex items-center justify-between">
          <h2 class="flex items-center gap-2 text-lg font-semibold text-slate-900">
            <span>🗂️</span> Compatible topics
          </h2>
          <span v-if="selectedGenre" class="text-sm text-slate-400">{{ compatibleTopics.length }} topics</span>
        </div>

        <p v-if="!selectedGenre" class="py-8 text-center text-sm text-slate-400">
          Select a genre above to browse compatible topics — click any tile to choose it.
        </p>

        <div v-else class="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          <button
            v-for="topic in compatibleTopics"
            :key="topic.id"
            class="group flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-sm transition"
            :class="
              isSelectedTopic(topic.id)
                ? 'border-indigo-300 bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200'
                : 'border-slate-100 bg-slate-50 text-slate-700 hover:border-indigo-200 hover:bg-white'
            "
            @click="toggleTopic(topic.id)"
          >
            <span class="text-lg transition group-hover:scale-110">{{ getTopicIcon(topic.name) }}</span>
            <span class="truncate font-medium">{{ topic.name }}</span>
          </button>
        </div>
      </section>

      <footer class="mt-10 text-center text-xs text-slate-400">
        Fan-made tool for Mad Games Tycoon 2 · not affiliated with Eggcode
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { Genre, Topic } from '~/types';
import DesignValues from '~/components/DesignValues.vue';
import DesignPriority from '~/components/DesignPriority.vue';
import genres from '~/data/genres';
import { getGenreIconSrc, getTopicIcon } from '~/data/icons';
import { useOpenAI } from '~/composables/useOpenAI';

const selectClass =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400';

const genresList = ref<Genre[]>(Object.values(genres));
const selectedGenre = ref<string>('');
const selectedSubgenre = ref<string>('');
const selectedTopic = ref<string>('');
const selectedTopic2 = ref<string>('');
const generatedGameNames = ref<string[]>([]);
const isLoading = ref<boolean>(false);
const { generateGameNames } = useOpenAI();

watch(selectedGenre, newGenre => {
  selectedTopic.value = '';
  selectedTopic2.value = '';
  if (newGenre) {
    const genre = genresList.value.find(g => g.id === newGenre);
    selectedSubgenre.value = genre && genre.subgenres.includes('None') ? 'None' : '';
  } else {
    selectedSubgenre.value = '';
  }
});

const primaryGenre = computed<Genre | null>(() => {
  if (!selectedGenre.value) return null;
  return genresList.value.find(g => g.id === selectedGenre.value) || null;
});

const compatibleTopics = computed<Topic[]>(() => {
  const genre = primaryGenre.value;
  if (!genre) return [];
  return genre.topics
    .map(topic => ({ id: topic, name: topic }))
    .sort((a, b) => a.name.localeCompare(b.name));
});

const currentTopic = computed<Topic | null>(
  () => compatibleTopics.value.find(t => t.id === selectedTopic.value) || null
);
const currentTopic2 = computed<Topic | null>(
  () => compatibleTopics.value.find(t => t.id === selectedTopic2.value) || null
);

const selectedTopicObjs = computed<Topic[]>(() =>
  [currentTopic.value, currentTopic2.value].filter((t): t is Topic => t !== null)
);

const isSelectedTopic = (id: string): boolean => id === selectedTopic.value || id === selectedTopic2.value;

const toggleTopic = (id: string): void => {
  if (id === selectedTopic.value) {
    selectedTopic.value = '';
  } else if (id === selectedTopic2.value) {
    selectedTopic2.value = '';
  } else if (!selectedTopic.value) {
    selectedTopic.value = id;
  } else if (!selectedTopic2.value) {
    selectedTopic2.value = id;
  } else {
    // both slots full — replace the first
    selectedTopic.value = id;
  }
};

const generateRandomTopics = (): void => {
  const genre = primaryGenre.value;
  if (!genre) return;
  const shuffled = [...genre.topics].sort(() => 0.5 - Math.random());
  const [topic1, topic2] = shuffled.slice(0, 2);
  selectedTopic.value = topic1 ?? '';
  selectedTopic2.value = topic2 ?? '';
};

const handleGenerateGameNames = async (): Promise<void> => {
  const genre = primaryGenre.value;
  const topic = currentTopic.value;
  if (!genre || !topic) return;
  isLoading.value = true;
  try {
    generatedGameNames.value = await generateGameNames(
      genre.name,
      topic.name,
      currentTopic2.value?.name,
      selectedSubgenre.value
    );
  } finally {
    isLoading.value = false;
  }
};
</script>

<style>
@keyframes loading {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(300%);
  }
}
</style>
