<template>
  <div
    class="min-h-screen bg-[#1a1f24] overflow-auto scrollbar-thin scrollbar-track-[#171c21] scrollbar-thumb-purple-600 hover:scrollbar-thumb-purple-700"
  >
    <div class="container mx-auto px-4 py-8 max-w-[1400px]">
      <h1 class="text-3xl font-bold mb-8 text-center text-purple-400">Mad Games Tycoon 2 Calculator</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-[#1e252b] p-6 rounded-lg shadow-lg border border-purple-500/10">
          <h2 class="text-xl font-semibold mb-6 text-purple-400">Genre Selection</h2>

          <div class="mb-4">
            <label class="block mb-3 font-medium text-gray-300">Primary Genre:</label>
            <select
              v-model="selectedGenre"
              class="w-full p-3 bg-[#171c21] border border-purple-500/20 rounded text-gray-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 appearance-none bg-no-repeat bg-[right_0.5rem_center] bg-[length:1.5em_1.5em] pr-10"
            >
              <option value="">Select a genre</option>
              <option v-for="genre in genresList" :key="genre.id" :value="genre.id">
                {{ genre.name }}
              </option>
            </select>
          </div>

          <div v-if="selectedGenre" class="mb-4">
            <label class="block mb-3 font-medium text-gray-300">Subgenre (Optional):</label>
            <select
              v-model="selectedSubgenre"
              class="w-full p-3 bg-[#171c21] border border-purple-500/20 rounded text-gray-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 appearance-none bg-no-repeat bg-[right_0.5rem_center] bg-[length:1.5em_1.5em] pr-10"
            >
              <option value="">Select a subgenre</option>
              <option v-for="subgenre in primaryGenre?.subgenres" :key="subgenre" :value="subgenre">
                {{ subgenre }}
              </option>
            </select>
          </div>
        </div>

        <div class="bg-[#1e252b] p-6 rounded-lg shadow-lg border border-purple-500/10">
          <h2 class="text-xl font-semibold mb-6 text-purple-400">Topic Selection</h2>

          <div class="mb-4">
            <label class="block mb-3 font-medium text-gray-300">Select Topics:</label>
            <select
              v-model="selectedTopic"
              class="w-full p-3 bg-[#171c21] border border-purple-500/20 rounded text-gray-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 appearance-none bg-no-repeat bg-[right_0.5rem_center] bg-[length:1.5em_1.5em] pr-10"
            >
              <option value="">Select a topic</option>
              <option v-for="topic in compatibleTopics" :key="topic.id" :value="topic.id">
                {{ topic.name }}
              </option>
            </select>
            <select
              v-model="selectedTopic2"
              class="w-full p-3 bg-[#171c21] border border-purple-500/20 rounded text-gray-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 appearance-none bg-no-repeat bg-[right_0.5rem_center] bg-[length:1.5em_1.5em] pr-10 mt-3"
            >
              <option value="">Select a second topic</option>
              <option
                v-for="topic in compatibleTopics"
                :key="topic.id"
                :value="topic.id"
                :disabled="topic.id === selectedTopic"
              >
                {{ topic.name }}
              </option>
            </select>
            <div class="flex gap-2 mt-4">
              <button
                class="flex-1 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="!selectedGenre"
                @click="generateRandomTopics"
              >
                Generate Topics
              </button>
              <button
                :disabled="!selectedTopic || !selectedTopic2 || isLoading"
                class="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                @click="handleGenerateGameNames"
              >
                {{ isLoading ? 'Generating...' : 'Generate Names' }}
              </button>
            </div>
            <!-- Loading Bar Container - Fixed Height -->
            <div class="h-[44px] mt-4">
              <div v-if="isLoading" class="w-full">
                <div class="w-full h-2 bg-[#171c21] rounded-full overflow-hidden">
                  <div class="h-full bg-blue-600 rounded-full animate-[loading_1s_ease-in-out_infinite]"></div>
                </div>
                <p class="text-sm text-gray-400 text-center mt-2">Generating game names...</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Game Names Section -->
      <div
        v-if="generatedGameNames.length > 0"
        class="mt-6 bg-[#1e252b] p-6 rounded-lg shadow-lg border border-purple-500/10"
      >
        <h2 class="text-xl font-semibold mb-6 text-purple-400">Generated Game Names</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <div
            v-for="(name, index) in generatedGameNames"
            :key="index"
            class="p-3 bg-[#171c21] rounded-lg border border-purple-500/20"
          >
            <p class="text-sm font-medium text-purple-300 text-center">
              {{ name.replace(/"/g, '') }}
            </p>
          </div>
        </div>
      </div>

      <div
        v-if="selectedGenre || selectedSubgenre"
        class="mt-6 p-6 bg-[#1e252b] rounded-lg shadow-lg border border-purple-500/10"
      >
        <h3 class="text-2xl font-bold mb-6 text-purple-400 text-center">Genre Details</h3>
        <div v-if="primaryGenre" class="mb-6">
          <p class="text-lg text-gray-300 text-center">
            <span class="font-semibold">Target Groups:</span>
            {{ primaryGenre.targetGroups.join(', ') }}
          </p>
          <div class="flex flex-wrap justify-center gap-3 mt-4">
            <DesignPriority title="" :values="primaryGenre.designPriority" />
          </div>
        </div>

        <div
          v-if="selectedSubgenre && primaryGenre && primaryGenre.designFocus[selectedSubgenre]"
          class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div>
            <h5 class="text-md font-medium mb-3 text-gray-300 text-center">Focus 1</h5>
            <div class="flex flex-wrap justify-center gap-3">
              <DesignValues title="" :values="primaryGenre.designFocus[selectedSubgenre].focus1" type="focus" />
            </div>
          </div>
          <div>
            <h5 class="text-md font-medium mb-3 text-gray-300 text-center">Focus 2</h5>
            <div class="flex flex-wrap justify-center gap-3">
              <DesignValues title="" :values="primaryGenre.designFocus[selectedSubgenre].focus2" type="focus" />
            </div>
          </div>
          <div>
            <h5 class="text-md font-medium mb-3 text-gray-300 text-center">Direction</h5>
            <div class="flex flex-wrap justify-center gap-3">
              <DesignValues title="" :values="primaryGenre.designFocus[selectedSubgenre].direction" type="direction" />
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 bg-[#1e252b] p-6 rounded-lg shadow-lg border border-purple-500/10">
        <h2 class="text-xl font-semibold mb-6 text-purple-400 text-center">Available Topics by Genre</h2>

        <div v-if="!selectedGenre" class="text-gray-400 italic text-center">
          Select a primary genre to see available topics
        </div>

        <div v-else>
          <p class="mb-6 text-gray-300 text-center">
            These topics are compatible with
            <span class="font-semibold text-purple-400">{{ primaryGenre?.name }}</span
            >:
          </p>
          <div class="flex flex-wrap justify-center gap-2">
            <span
              v-for="topic in compatibleTopics"
              :key="topic.id"
              class="px-3 py-1 bg-[#171c21] text-purple-300 rounded-full text-sm border border-purple-500/20"
            >
              {{ topic.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { Genre, Topic } from '~/types';
import DesignValues from '~/components/DesignValues.vue';
import DesignPriority from '~/components/DesignPriority.vue';
import genres from '~/data/genres';
import { useOpenAI } from '~/composables/useOpenAI';

const genresList = ref<Genre[]>(Object.values(genres));
const selectedGenre = ref<string>('');
const selectedSubgenre = ref<string>('');
const selectedTopic = ref<string>('');
const selectedTopic2 = ref<string>('');
const generatedGameNames = ref<string[]>([]);
const isLoading = ref<boolean>(false);
const { generateGameNames } = useOpenAI();

watch(selectedGenre, newGenre => {
  if (newGenre) {
    const genre = genresList.value.find(g => g.id === newGenre);
    if (genre && genre.subgenres.includes('None')) {
      selectedSubgenre.value = 'None';
    } else {
      selectedSubgenre.value = '';
    }
  } else {
    selectedSubgenre.value = '';
  }
});

const primaryGenre = computed<Genre | null>(() => {
  if (!selectedGenre.value) return null;
  return genresList.value.find(g => g.id === selectedGenre.value) || null;
});

const compatibleTopics = computed<Topic[]>(() => {
  if (!selectedGenre.value) return [];

  const genre = genresList.value.find(g => g.id === selectedGenre.value);
  if (!genre) return [];

  return genre.topics
    .map(topic => ({
      id: topic,
      name: topic,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
});

const currentTopic = computed<Topic | null>(() => {
  if (!selectedTopic.value) return null;
  return compatibleTopics.value.find(t => t.id === selectedTopic.value) || null;
});

const currentTopic2 = computed<Topic | null>(() => {
  if (!selectedTopic2.value) return null;
  return compatibleTopics.value.find(t => t.id === selectedTopic2.value) || null;
});

const generateRandomTopics = (): void => {
  if (!selectedGenre.value) {
    alert('Please select a genre first');
    return;
  }

  const genre = primaryGenre.value;
  if (!genre) return;

  const availableTopics = genre.topics;

  const shuffled = [...availableTopics].sort(() => 0.5 - Math.random());
  const [topic1, topic2] = shuffled.slice(0, 2);

  const topic1Obj = compatibleTopics.value.find(t => t.name === topic1);
  const topic2Obj = compatibleTopics.value.find(t => t.name === topic2);

  if (topic1Obj && topic2Obj) {
    selectedTopic.value = topic1Obj.id;
    selectedTopic2.value = topic2Obj.id;
  }
};

const handleGenerateGameNames = async (): Promise<void> => {
  if (!selectedGenre.value || !selectedTopic.value) {
    return;
  }
  isLoading.value = true;
  const genre = primaryGenre.value;
  const topic = currentTopic.value;
  const subtopic = currentTopic2.value;

  if (!genre || !topic) return;

  generatedGameNames.value = await generateGameNames(genre.name, topic.name, subtopic?.name, selectedSubgenre.value);

  isLoading.value = false;
};
</script>

<style>
@keyframes loading {
  0% {
    width: 0;
    margin-left: 0;
  }
  50% {
    width: 100%;
    margin-left: 0;
  }
  100% {
    width: 0;
    margin-left: 100%;
  }
}
</style>
