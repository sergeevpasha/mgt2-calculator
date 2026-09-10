<template>
  <div id="top" class="studio-app">
    <a class="skip-link" href="#calculator">Skip to calculator</a>
    <header class="site-header">
      <div class="header-inner">
        <a class="brand" href="#top" aria-label="Mad Games Tycoon 2 calculator home">
          <img src="/icons/favicon-96x96.png" alt="" width="42" height="42" />
          <span>Mad Games Tycoon <b>2</b><small>The studio companion</small></span>
        </a>
        <nav class="main-nav" aria-label="Main navigation">
          <a class="nav-active" href="#calculator">Calculator</a>
          <a href="#topics">Topic library <UiIcon name="arrow" /></a>
        </nav>
        <span class="fan-label"><span></span> Made for the game</span>
      </div>
    </header>

    <main class="page-shell">
      <div class="page-intro">
        <div>
          <p class="eyebrow">LESS GUESSWORK. MORE GREAT GAMES.</p>
          <h1>Build your next <em>big hit.</em></h1>
          <p class="intro-description">Find your genre, dial in the design, and give your next game a name.</p>
        </div>
        <div class="intro-note">
          <UiIcon name="sliders" /><span>Your ideas.<br /><strong>The right settings.</strong></span>
        </div>
      </div>

      <div id="calculator" class="calculator-layout">
        <section class="panel genre-panel" aria-labelledby="genre-heading">
          <div class="section-heading">
            <div class="heading-title">
              <span class="step-number">01</span>
              <h2 id="genre-heading">Choose your genre</h2>
            </div>
            <span class="subtle-count">{{ genresList.length }} genres</span>
          </div>
          <p class="section-description">Every great game starts with a good combination.</p>
          <div class="field-heading"><span id="primary-label">Primary genre</span><span>Choose one</span></div>
          <div class="genre-grid" role="group" aria-labelledby="primary-label">
            <button
              v-for="genre in genresList"
              :key="genre.id"
              class="genre-tile"
              :class="{ 'is-selected': selectedGenre === genre.id }"
              :aria-pressed="selectedGenre === genre.id"
              @click="selectedGenre = genre.id"
            >
              <span v-if="selectedGenre === genre.id" class="selection-check"><UiIcon name="check" /></span>
              <img :src="getGenreIconSrc(genre.name)!" alt="" width="40" height="40" />
              <span>{{ genre.name }}</span>
            </button>
          </div>

          <template v-if="primaryGenre">
            <div class="subgenre-section">
              <div class="field-heading"><span id="subgenre-label">Subgenre</span><span>Optional</span></div>
              <div class="subgenre-options" role="group" aria-labelledby="subgenre-label">
                <button
                  v-for="sg in primaryGenre.subgenres"
                  :key="sg"
                  class="subgenre-chip"
                  :class="{ 'is-selected': selectedSubgenre === sg }"
                  :aria-pressed="selectedSubgenre === sg"
                  @click="selectedSubgenre = sg"
                >
                  <img v-if="getGenreIconSrc(sg)" :src="getGenreIconSrc(sg)!" alt="" width="21" height="21" />
                  <UiIcon v-else-if="selectedSubgenre === sg" name="check" />
                  {{ sg === 'None' ? 'No subgenre' : sg }}
                </button>
              </div>
            </div>
            <div class="audience-row">
              <span class="audience-label">Target audience</span>
              <div>
                <span v-for="group in primaryGenre.targetGroups" :key="group">{{ group }}</span>
              </div>
            </div>
          </template>
        </section>

        <div class="results-column">
          <section v-if="primaryGenre" id="design-settings" class="recipe-panel" aria-labelledby="recipe-heading">
            <div class="recipe-heading">
              <div class="recipe-identity">
                <div class="recipe-art" :class="{ 'recipe-art-pair': subgenreIcon }">
                  <img :src="getGenreIconSrc(primaryGenre.name)!" alt="" width="48" height="48" />
                  <template v-if="subgenreIcon">
                    <span class="genre-pair-plus" aria-hidden="true">+</span>
                    <img :src="subgenreIcon" alt="" width="48" height="48" />
                  </template>
                </div>
                <div class="recipe-title">
                  <p class="eyebrow">DESIGN SETTINGS</p>
                  <h2 id="recipe-heading">
                    {{ primaryGenre.name }}<span v-if="selectedSubgenre !== 'None'"> + {{ selectedSubgenre }}</span>
                  </h2>
                </div>
              </div>
              <button
                class="copy-button"
                :aria-label="copyStatus || 'Copy design settings'"
                :title="copyStatus || 'Copy design settings'"
                @click="copySettings"
              >
                <UiIcon :name="copyStatus === 'Copied!' ? 'check' : 'copy'" /><span>{{
                  copyStatus === 'Copied!' ? 'Copied!' : 'Copy settings'
                }}</span>
              </button>
            </div>
            <div class="recipe-label">
              <h3>Development priority</h3>
              <span>Total <strong>100%</strong></span>
            </div>
            <DesignPriority title="" :values="primaryGenre.designPriority" />
            <template v-if="currentFocus">
              <div class="focus-grid">
                <section class="focus-group" aria-labelledby="focus-one-heading">
                  <div class="focus-heading">
                    <h3 id="focus-one-heading">Design focus <span>01</span></h3>
                    <span>0–10</span>
                  </div>
                  <DesignValues :values="currentFocus.focus1" :labels="focusLabels.focus1" type="focus" />
                </section>
                <section class="focus-group" aria-labelledby="focus-two-heading">
                  <div class="focus-heading">
                    <h3 id="focus-two-heading">Design focus <span>02</span></h3>
                    <span>0–10</span>
                  </div>
                  <DesignValues :values="currentFocus.focus2" :labels="focusLabels.focus2" type="focus" />
                </section>
              </div>
              <section class="direction-group" aria-labelledby="direction-heading">
                <div class="focus-heading">
                  <h3 id="direction-heading">Design direction</h3>
                  <span>0–10</span>
                </div>
                <DesignValues :values="currentFocus.direction" :labels="focusLabels.direction" type="direction" />
              </section>
            </template>
            <div class="recipe-footnote">
              <span><UiIcon name="sliders" /> Match these values to your in-game sliders.</span>
              <span class="live-indicator"><i></i> Live</span>
            </div>
            <span class="sr-only" role="status">{{ copyStatus }}</span>
          </section>

          <section class="panel concept-panel" aria-labelledby="concept-heading">
            <div class="section-heading">
              <div class="heading-title">
                <span class="step-number">02</span>
                <h2 id="concept-heading">Make it your own</h2>
              </div>
              <UiIcon class="section-icon" name="sparkles" />
            </div>
            <p class="section-description">Set the scene with one or two compatible topics.</p>
            <div class="topic-fields">
              <div>
                <label for="topic-one">Primary topic</label
                ><select id="topic-one" v-model="selectedTopic" :disabled="!selectedGenre">
                  <option value="">Choose a topic</option>
                  <option
                    v-for="topic in compatibleTopics"
                    :key="topic.id"
                    :value="topic.id"
                    :disabled="topic.id === selectedTopic2"
                  >
                    {{ getTopicIcon(topic.name) }} {{ topic.name }}
                  </option>
                </select>
              </div>
              <span class="topic-join" aria-hidden="true">+</span>
              <div>
                <label for="topic-two">Secondary topic <span>Optional</span></label
                ><select id="topic-two" v-model="selectedTopic2" :disabled="!selectedGenre">
                  <option value="">Choose a topic</option>
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
            <div class="concept-actions">
              <button class="random-topics-button" :disabled="!selectedGenre" @click="generateRandomTopics">
                <UiIcon name="shuffle" /> Random topics
              </button>
              <a href="#topics">Browse topic library <span aria-hidden="true">↓</span></a>
            </div>
            <div class="name-generator">
              <div>
                <span class="generator-icon"><UiIcon name="sparkles" /></span>
                <div>
                  <h3>A name to remember</h3>
                  <p>Turn your combination into game name ideas.</p>
                </div>
              </div>
              <button class="primary-button" :disabled="!selectedTopic || isLoading" @click="handleGenerateGameNames">
                <UiIcon name="sparkles" />{{ isLoading ? 'Generating…' : 'Generate names' }}
              </button>
            </div>
            <div v-if="isLoading" class="loading-line" role="status">
              <span></span><span class="sr-only">Generating game names</span>
            </div>
            <p v-if="generationError" class="inline-error" role="alert">{{ generationError }}</p>
            <div v-if="generatedGameNames.length" class="generated-names" aria-live="polite">
              <p class="eyebrow">A FEW IDEAS FOR YOUR NEXT RELEASE</p>
              <ol>
                <li v-for="(name, index) in generatedGameNames" :key="index">
                  <span>{{ String(index + 1).padStart(2, '0') }}</span
                  >{{ name.replace(/"/g, '') }}
                </li>
              </ol>
            </div>
          </section>
          <p class="workspace-note">
            <span aria-hidden="true">✳</span> A little planning goes a long way. Happy developing.
          </p>
        </div>
      </div>

      <section id="topics" class="panel library-panel" aria-labelledby="topics-heading">
        <div class="library-heading">
          <div>
            <div class="heading-title">
              <span class="step-number">03</span>
              <h2 id="topics-heading">Find your inspiration</h2>
              <span class="count-badge">{{ compatibleTopics.length }}</span>
            </div>
            <p class="section-description">
              Topics that fit <strong>{{ primaryGenre?.name }}</strong
              >. Pick up to two to build your concept.
            </p>
          </div>
          <div class="topic-search">
            <UiIcon name="search" /><input
              v-model="topicSearch"
              type="search"
              aria-label="Search compatible topics"
              placeholder="Find a topic…"
            /><button v-if="topicSearch" class="icon-button" aria-label="Clear topic search" @click="topicSearch = ''">
              <UiIcon name="close" />
            </button>
          </div>
        </div>
        <div class="library-toolbar">
          <span>{{ topicSearch ? `${filteredTopics.length} matching topics` : 'COMPATIBLE TOPICS' }}</span>
          <div v-if="selectedTopicObjs.length" class="selected-topics">
            <button
              v-for="topic in selectedTopicObjs"
              :key="topic.id"
              :aria-label="`Remove ${topic.name}`"
              @click="toggleTopic(topic.id)"
            >
              {{ getTopicIcon(topic.name) }} {{ topic.name }}<UiIcon name="close" />
            </button>
          </div>
          <span v-else>Click a topic to select it</span
          ><span class="selection-count">{{ selectedTopicObjs.length }} / 2 selected</span>
        </div>
        <div v-if="filteredTopics.length" class="topic-grid" role="group" aria-label="Compatible topics">
          <button
            v-for="topic in filteredTopics"
            :key="topic.id"
            class="topic-tile"
            :class="{ 'is-selected': isSelectedTopic(topic.id) }"
            :aria-pressed="isSelectedTopic(topic.id)"
            @click="toggleTopic(topic.id)"
          >
            <span class="topic-emoji" aria-hidden="true">{{ getTopicIcon(topic.name) }}</span
            ><span>{{ topic.name }}</span
            ><UiIcon v-if="isSelectedTopic(topic.id)" name="check" />
          </button>
        </div>
        <div v-else class="empty-search">
          <UiIcon name="search" />
          <h3>No topics found for “{{ topicSearch }}”</h3>
          <p>Try another search or choose a different genre.</p>
          <button class="text-button" @click="topicSearch = ''">Clear search</button>
        </div>
      </section>
      <footer class="site-footer">
        <span>Made for the love of game development.</span><span>Fan-made companion · Not affiliated with Eggcode</span
        ><a href="#top">Back to top ↑</a>
      </footer>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { Genre, Topic } from '~/types';
import DesignValues from '~/components/DesignValues.vue';
import DesignPriority from '~/components/DesignPriority.vue';
import UiIcon from '~/components/UiIcon.vue';
import genres from '~/data/genres';
import { focusLabels, priorityLabels } from '~/data/designLabels';
import { getGenreIconSrc, getTopicIcon } from '~/data/icons';
import { useOpenAI } from '~/composables/useOpenAI';

const genresList: Genre[] = Object.values(genres);
const selectedGenre = ref('action');
const selectedSubgenre = ref('None');
const selectedTopic = ref('');
const selectedTopic2 = ref('');
const topicSearch = ref('');
const generatedGameNames = ref<string[]>([]);
const generationError = ref('');
const copyStatus = ref('');
const isLoading = ref(false);
const { generateGameNames } = useOpenAI();

const primaryGenre = computed(() => genresList.find(g => g.id === selectedGenre.value) || null);
const subgenreIcon = computed(() => getGenreIconSrc(selectedSubgenre.value));
const currentFocus = computed(() => primaryGenre.value?.designFocus[selectedSubgenre.value]);
const compatibleTopics = computed<Topic[]>(() =>
  (primaryGenre.value?.topics || []).map(name => ({ id: name, name })).sort((a, b) => a.name.localeCompare(b.name))
);
const filteredTopics = computed(() =>
  compatibleTopics.value.filter(topic => topic.name.toLowerCase().includes(topicSearch.value.trim().toLowerCase()))
);
const currentTopic = computed(() => compatibleTopics.value.find(t => t.id === selectedTopic.value) || null);
const currentTopic2 = computed(() => compatibleTopics.value.find(t => t.id === selectedTopic2.value) || null);
const selectedTopicObjs = computed(() =>
  [currentTopic.value, currentTopic2.value].filter((t): t is Topic => t !== null)
);
const selectionKey = computed(() =>
  JSON.stringify([selectedGenre.value, selectedSubgenre.value, selectedTopic.value, selectedTopic2.value])
);

watch(selectedGenre, () => {
  selectedTopic.value = '';
  selectedTopic2.value = '';
  topicSearch.value = '';
  selectedSubgenre.value = primaryGenre.value?.subgenres.includes('None') ? 'None' : '';
});
watch(selectionKey, () => {
  generatedGameNames.value = [];
  generationError.value = '';
  copyStatus.value = '';
});

const isSelectedTopic = (id: string): boolean => id === selectedTopic.value || id === selectedTopic2.value;
const toggleTopic = (id: string): void => {
  if (id === selectedTopic.value) selectedTopic.value = '';
  else if (id === selectedTopic2.value) selectedTopic2.value = '';
  else if (!selectedTopic.value) selectedTopic.value = id;
  else if (!selectedTopic2.value) selectedTopic2.value = id;
  else selectedTopic.value = id;
};
const generateRandomTopics = (): void => {
  const topics = [...(primaryGenre.value?.topics || [])];
  const first = topics.splice(Math.floor(Math.random() * topics.length), 1)[0];
  const second = topics[Math.floor(Math.random() * topics.length)];
  selectedTopic.value = first ?? '';
  selectedTopic2.value = second ?? '';
};
const handleGenerateGameNames = async (): Promise<void> => {
  const genre = primaryGenre.value;
  const topic = currentTopic.value;
  if (!genre || !topic || isLoading.value) return;
  const requestSelection = selectionKey.value;
  isLoading.value = true;
  generationError.value = '';
  try {
    const names = await generateGameNames(genre.name, topic.name, currentTopic2.value?.name, selectedSubgenre.value);
    if (requestSelection === selectionKey.value) generatedGameNames.value = names;
  } catch {
    if (requestSelection === selectionKey.value)
      generationError.value = 'Couldn’t generate names right now. Please try again.';
  } finally {
    isLoading.value = false;
  }
};
const copySettings = async (): Promise<void> => {
  const genre = primaryGenre.value;
  const focus = currentFocus.value;
  if (!genre || !focus) return;
  const text = [
    genre.name + (selectedSubgenre.value !== 'None' ? ` + ${selectedSubgenre.value}` : ''),
    `Development priority: ${genre.designPriority.map((value, index) => `${priorityLabels[index]} ${value}%`).join(' / ')}`,
    `Design focus 1: ${focus.focus1.join(' / ')}`,
    `Design focus 2: ${focus.focus2.join(' / ')}`,
    `Direction: ${focus.direction.join(' / ')}`,
  ].join('\n');
  try {
    await navigator.clipboard.writeText(text);
    copyStatus.value = 'Copied!';
  } catch {
    copyStatus.value = 'Unable to copy. Please copy the displayed values manually.';
  }
};
</script>
