<template>
  <div id="top">
    <a
      class="fixed -top-20 left-4 z-20 rounded-lg bg-ink px-[18px] py-3 text-white focus:top-3 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-accent/50 motion-safe:transition"
      href="#calculator"
      >Skip to calculator</a
    >
    <header class="border-b border-line bg-surface">
      <div
        class="mx-auto flex h-[84px] max-w-[1344px] items-center gap-[60px] px-8 max-lg:px-6 max-md:gap-[35px] max-sm:h-[73px] max-sm:gap-2.5 max-sm:px-[18px]"
      >
        <a
          class="flex items-center gap-[11px] text-[15px] font-bold tracking-[-0.45px] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-accent/50 motion-safe:transition max-sm:gap-2 max-sm:text-[13px]"
          href="#top"
          aria-label="Mad Games Tycoon 2 calculator home"
        >
          <img class="rounded-xl max-sm:size-[35px]" src="/icons/favicon-96x96.png" alt="" width="42" height="42" />
          <span
            >Mad Games Tycoon <b class="text-accent">2</b
            ><small
              class="mt-[3px] block text-[11px] font-medium uppercase tracking-[1.4px] text-muted max-sm:text-[10px] max-sm:tracking-[1px]"
              >The studio companion</small
            ></span
          >
        </a>
        <nav
          class="flex gap-[30px] self-stretch text-[13px] font-semibold max-md:ml-auto max-sm:gap-0 max-sm:text-[11px] max-xs:hidden"
          aria-label="Main navigation"
        >
          <a
            class="relative flex items-center gap-1.5 text-accent after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:rounded-t-sm after:bg-accent after:content-[''] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-accent/50 motion-safe:transition max-sm:hidden"
            href="#calculator"
            >Calculator</a
          >
          <a
            class="relative flex items-center gap-1.5 text-muted hover:text-accent focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-accent/50 motion-safe:transition"
            href="#topics"
            >Topic library <UiIcon class="size-[13px] max-sm:hidden" name="arrow"
          /></a>
        </nav>
        <span class="ml-auto flex items-center gap-[7px] text-[12px] text-muted max-md:hidden"
          ><span class="size-1.5 rounded-full bg-denim-400"></span> Made for the game</span
        >
      </div>
    </header>

    <main class="mx-auto max-w-[1344px] px-8 max-lg:px-6 max-sm:px-3.5">
      <div class="flex items-center justify-between pb-[30px] pt-[35px] max-sm:px-[5px] max-sm:pb-[25px] max-sm:pt-7">
        <div>
          <p class="mb-[9px] text-[10px] font-bold tracking-[1.5px] text-accent max-sm:tracking-[1.2px]">
            LESS GUESSWORK. MORE GREAT GAMES.
          </p>
          <h1
            class="text-[clamp(28px,3vw,38px)] font-[650] leading-[1.18] tracking-[-1.8px] max-sm:text-[31px] max-sm:tracking-[-1.2px]"
          >
            Build your next <em class="font-serif font-normal text-accent">big hit.</em>
          </h1>
          <p class="mt-[11px] text-[13px] text-muted max-sm:max-w-[285px] max-sm:text-[12px] max-sm:leading-[1.7]">
            Find your genre, dial in the design, and give your next game a name.
          </p>
        </div>
        <div class="flex items-center gap-3.5 pr-3 text-[13px] leading-[1.8] text-muted max-sm:hidden">
          <UiIcon class="size-9 stroke-1 text-steel-500" name="sliders" /><span
            >Your ideas.<br /><strong class="font-semibold text-steel-900">The right settings.</strong></span
          >
        </div>
      </div>

      <div
        id="calculator"
        class="grid grid-cols-[minmax(0,.91fr)_minmax(0,1.24fr)] items-start gap-[22px] max-lg:grid-cols-[minmax(0,.95fr)_minmax(0,1.2fr)] max-lg:gap-[18px] max-md:grid-cols-[1fr]"
      >
        <section
          class="rounded-2xl border border-line bg-surface p-6 shadow-panel max-lg:p-5 max-sm:rounded-[13px] max-sm:px-4 max-sm:py-[18px]"
          aria-labelledby="genre-heading"
        >
          <div class="flex items-center justify-between gap-2">
            <div class="flex items-center gap-2.5">
              <span
                class="inline-flex size-[25px] shrink-0 items-center justify-center rounded-[7px] bg-steel-200 text-[11px] font-bold text-muted"
                >01</span
              >
              <h2 id="genre-heading" class="text-[17px] font-[650] leading-[1.4] tracking-[-0.5px] max-sm:text-[16px]">
                Choose your genre
              </h2>
            </div>
            <span class="whitespace-nowrap text-[11px] text-muted">{{ genresList.length }} genres</span>
          </div>
          <p class="mb-[21px] mt-[9px] text-[12px] leading-[1.65] text-muted max-sm:mb-[17px] max-sm:text-[11px]">
            Every great game starts with a good combination.
          </p>
          <div class="mb-[11px] flex items-center justify-between text-[12px] font-semibold">
            <span id="primary-label">Primary genre</span
            ><span class="text-[11px] font-normal text-muted">Choose one</span>
          </div>
          <div
            class="grid grid-cols-5 gap-[7px] max-lg:grid-cols-4 max-md:grid-cols-7 max-sm:grid-cols-4 max-sm:gap-1.5 max-xs:grid-cols-3"
            role="group"
            aria-labelledby="primary-label"
          >
            <button
              v-for="genre in genresList"
              :key="genre.id"
              class="group relative flex min-h-[90px] flex-col items-center gap-1.5 rounded-[9px] border px-[3px] pb-[7px] pt-2.5 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-accent/50 motion-safe:transition xl:min-h-[94px] max-sm:min-h-[88px]"
              :class="
                selectedGenre === genre.id
                  ? 'border-accent-400 bg-accent-soft text-accent-700 ring-1 ring-accent-400/[.125]'
                  : 'border-transparent bg-steel-100 hover:border-steel-350 hover:bg-steel-200'
              "
              :aria-pressed="selectedGenre === genre.id"
              @click="selectedGenre = genre.id"
            >
              <span
                v-if="selectedGenre === genre.id"
                class="absolute right-1 top-1 grid size-[13px] place-items-center rounded-full bg-accent text-white"
                ><UiIcon class="size-[9px] stroke-[2.5]" name="check"
              /></span>
              <img
                class="size-[38px] object-contain group-hover:-translate-y-0.5 motion-safe:transition-transform motion-safe:duration-[180ms] max-sm:size-9"
                :src="getGenreIconSrc(genre.name)!"
                alt=""
                width="40"
                height="40"
              />
              <span
                class="max-w-[83px] text-[10px] font-[550] leading-[1.35] xl:text-[11px] max-md:text-[11px] max-sm:text-[10px]"
                >{{ genre.name }}</span
              >
            </button>
          </div>

          <template v-if="primaryGenre">
            <div class="mt-[22px] border-t border-line pt-[22px] max-md:mt-[17px] max-md:pt-[17px]">
              <div class="mb-[11px] flex items-center justify-between text-[12px] font-semibold">
                <span id="subgenre-label">Subgenre</span
                ><span class="text-[11px] font-normal text-muted">Optional</span>
              </div>
              <div class="flex flex-wrap gap-[7px]" role="group" aria-labelledby="subgenre-label">
                <button
                  v-for="sg in primaryGenre.subgenres"
                  :key="sg"
                  class="inline-flex min-h-[34px] items-center gap-1.5 rounded-[7px] border px-[9px] py-1.5 text-[11px] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-accent/50 motion-safe:transition max-sm:min-h-[37px] max-sm:px-2"
                  :class="
                    selectedSubgenre === sg
                      ? 'border-accent-300 bg-accent-soft text-denim-700'
                      : 'border-line hover:bg-steel-150'
                  "
                  :aria-pressed="selectedSubgenre === sg"
                  @click="selectedSubgenre = sg"
                >
                  <img
                    v-if="getGenreIconSrc(sg)"
                    class="object-contain"
                    :src="getGenreIconSrc(sg)!"
                    alt=""
                    width="21"
                    height="21"
                  />
                  <UiIcon v-else-if="selectedSubgenre === sg" class="size-[13px]" name="check" />
                  {{ sg === 'None' ? 'No subgenre' : sg }}
                </button>
              </div>
            </div>
            <div
              class="mt-[22px] flex items-center justify-between gap-2.5 rounded-lg bg-steel-100 p-3 max-md:mt-[17px] max-sm:px-[9px] max-sm:py-[11px]"
            >
              <span class="text-[11px] text-muted">Target audience</span>
              <div class="flex flex-wrap justify-end gap-[5px]">
                <span
                  v-for="group in primaryGenre.targetGroups"
                  :key="group"
                  class="rounded border border-steel-300 bg-surface px-1.5 py-[3px] text-[10px] text-steel-800"
                  >{{ group }}</span
                >
              </div>
            </div>
          </template>
        </section>

        <div class="flex min-w-0 flex-col gap-[19px]">
          <section
            v-if="primaryGenre"
            id="design-settings"
            class="rounded-2xl border border-steel-350 bg-surface px-6 pt-6 text-ink shadow-card max-lg:px-5 max-lg:pt-5 max-sm:rounded-[13px] max-sm:px-4 max-sm:pt-[18px]"
            aria-labelledby="recipe-heading"
          >
            <div
              class="mb-5 flex items-center justify-between gap-4 border-b border-line pb-[23px] max-sm:mb-[18px] max-sm:gap-2.5 max-sm:pb-[18px]"
            >
              <div class="flex min-w-0 items-center gap-[13px] max-sm:gap-2.5">
                <div
                  class="shrink-0 place-items-center rounded-xl border border-accent-150 bg-accent-soft p-[9px] max-sm:rounded-[9px]"
                  :class="
                    subgenreIcon ? 'flex gap-[5px] max-sm:gap-[3px] max-sm:px-1.5 max-sm:py-2' : 'grid max-sm:p-2'
                  "
                >
                  <img
                    class="object-contain"
                    :class="
                      subgenreIcon ? 'h-[42px] w-9 max-sm:h-[35px] max-sm:w-[30px]' : 'size-[42px] max-sm:size-[35px]'
                    "
                    :src="getGenreIconSrc(primaryGenre.name)!"
                    alt=""
                    width="48"
                    height="48"
                  />
                  <template v-if="subgenreIcon">
                    <span
                      class="text-[15px] font-medium leading-none text-denim-300 max-sm:text-[12px]"
                      aria-hidden="true"
                      >+</span
                    >
                    <img
                      class="h-[42px] w-9 object-contain max-sm:h-[35px] max-sm:w-[30px]"
                      :src="subgenreIcon"
                      alt=""
                      width="48"
                      height="48"
                    />
                  </template>
                </div>
                <div class="min-w-0 [overflow-wrap:anywhere]">
                  <p class="mb-[5px] text-[10px] font-bold tracking-[1.5px] text-accent max-xs:text-[9px]">
                    DESIGN SETTINGS
                  </p>
                  <h2
                    id="recipe-heading"
                    class="text-[23px] font-[650] leading-[1.25] tracking-[-0.5px] max-sm:text-[20px]"
                  >
                    {{ primaryGenre.name
                    }}<span
                      v-if="selectedSubgenre !== 'None'"
                      class="mt-1 block text-[12px] font-medium text-muted max-sm:text-[11px]"
                    >
                      + {{ selectedSubgenre }}</span
                    >
                  </h2>
                </div>
              </div>
              <button
                class="inline-flex shrink-0 items-center justify-center gap-[7px] whitespace-nowrap rounded-lg border border-steel-350 bg-white px-[11px] py-[9px] text-[11px] font-semibold text-steel-900 hover:border-accent-300 hover:bg-accent-soft hover:text-accent focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-accent/50 motion-safe:transition max-sm:min-h-[38px] max-sm:min-w-[38px] max-sm:p-2.5"
                :aria-label="copyStatus || 'Copy design settings'"
                :title="copyStatus || 'Copy design settings'"
                @click="copySettings"
              >
                <UiIcon class="size-3.5" :name="copyStatus === 'Copied!' ? 'check' : 'copy'" /><span
                  class="max-sm:hidden"
                  >{{ copyStatus === 'Copied!' ? 'Copied!' : 'Copy settings' }}</span
                >
              </button>
            </div>
            <div class="mb-[18px] flex items-center justify-between gap-2.5">
              <h3 class="text-[12px] font-[650]">Development priority</h3>
              <span class="text-[10px] text-muted"
                >Total
                <strong class="ml-1 inline-block rounded bg-steel-150 px-1.5 py-[3px] font-semibold text-steel-850"
                  >100%</strong
                ></span
              >
            </div>
            <DesignPriority title="" :values="primaryGenre.designPriority" />
            <template v-if="currentFocus">
              <div class="mb-4 mt-[25px] grid grid-cols-2 gap-3.5 max-lg:gap-3 max-sm:mt-[22px] max-sm:gap-2.5">
                <section
                  class="min-w-0 rounded-[10px] border border-steel-200 bg-steel-100 px-4 pb-4 pt-3.5 max-lg:p-3 max-sm:px-2.5 max-xs:px-2"
                  aria-labelledby="focus-one-heading"
                >
                  <div class="mb-[13px] flex items-center justify-between gap-2.5 max-sm:gap-[5px]">
                    <h3 id="focus-one-heading" class="text-[12px] font-[650] max-sm:text-[11px]">
                      Design focus <span class="ml-1 text-[10px] font-medium text-steel-650 max-sm:ml-0.5">01</span>
                    </h3>
                    <span class="text-[10px] text-muted max-sm:text-[9px] max-xs:hidden">0–10</span>
                  </div>
                  <DesignValues :values="currentFocus.focus1" :labels="focusLabels.focus1" type="focus" />
                </section>
                <section
                  class="min-w-0 rounded-[10px] border border-steel-200 bg-steel-100 px-4 pb-4 pt-3.5 max-lg:p-3 max-sm:px-2.5 max-xs:px-2"
                  aria-labelledby="focus-two-heading"
                >
                  <div class="mb-[13px] flex items-center justify-between gap-2.5 max-sm:gap-[5px]">
                    <h3 id="focus-two-heading" class="text-[12px] font-[650] max-sm:text-[11px]">
                      Design focus <span class="ml-1 text-[10px] font-medium text-steel-650 max-sm:ml-0.5">02</span>
                    </h3>
                    <span class="text-[10px] text-muted max-sm:text-[9px] max-xs:hidden">0–10</span>
                  </div>
                  <DesignValues :values="currentFocus.focus2" :labels="focusLabels.focus2" type="focus" />
                </section>
              </div>
              <section class="pb-5 pt-[3px]" aria-labelledby="direction-heading">
                <div class="mb-3 flex items-center justify-between gap-2.5 max-sm:gap-[5px]">
                  <h3 id="direction-heading" class="text-[12px] font-[650] max-sm:text-[11px]">Design direction</h3>
                  <span class="text-[10px] text-muted max-sm:text-[9px] max-xs:hidden">0–10</span>
                </div>
                <DesignValues :values="currentFocus.direction" :labels="focusLabels.direction" type="direction" />
              </section>
            </template>
            <div
              class="flex items-center justify-between gap-2.5 border-t border-line py-3.5 text-[10px] text-muted max-sm:gap-[7px] max-sm:text-[9px]"
            >
              <span class="flex items-center gap-[7px]"
                ><UiIcon class="size-[13px] text-steel-600 max-sm:hidden" name="sliders" /> Match these values to your
                in-game sliders.</span
              >
              <span class="flex items-center gap-[7px] whitespace-nowrap"
                ><i class="size-[5px] rounded-full bg-accent-500"></i> Live</span
              >
            </div>
            <span class="sr-only" role="status">{{ copyStatus }}</span>
          </section>

          <section
            class="rounded-2xl border border-line bg-surface p-6 shadow-panel max-lg:p-5 max-sm:rounded-[13px] max-sm:px-4 max-sm:py-[18px]"
            aria-labelledby="concept-heading"
          >
            <div class="flex items-center justify-between gap-2">
              <div class="flex items-center gap-2.5">
                <span
                  class="inline-flex size-[25px] shrink-0 items-center justify-center rounded-[7px] bg-steel-200 text-[11px] font-bold text-muted"
                  >02</span
                >
                <h2
                  id="concept-heading"
                  class="text-[17px] font-[650] leading-[1.4] tracking-[-0.5px] max-sm:text-[16px]"
                >
                  Make it your own
                </h2>
              </div>
              <UiIcon class="size-[21px] text-steel-500" name="sparkles" />
            </div>
            <p class="mb-[21px] mt-[9px] text-[12px] leading-[1.65] text-muted max-sm:mb-[17px] max-sm:text-[11px]">
              Set the scene with one or two compatible topics.
            </p>
            <div
              class="grid grid-cols-[minmax(0,1fr)_12px_minmax(0,1fr)] items-end gap-3 max-sm:grid-cols-[minmax(0,1fr)_8px_minmax(0,1fr)] max-sm:gap-[7px]"
            >
              <div>
                <label
                  for="topic-one"
                  class="mb-2 flex items-center justify-between text-[11px] font-semibold max-sm:min-h-[29px] max-sm:flex-wrap max-sm:gap-x-[5px] max-sm:gap-y-0.5"
                  >Primary topic</label
                ><select
                  id="topic-one"
                  v-model="selectedTopic"
                  class="min-h-[41px] w-full appearance-none rounded-[7px] border border-steel-350 bg-steel-50 bg-chevron bg-[length:13px] bg-[position:right_10px_center] bg-no-repeat py-2 pl-[11px] pr-[30px] text-[12px] text-steel-900 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-accent/50 disabled:cursor-not-allowed disabled:opacity-50 motion-safe:transition max-sm:min-h-11 max-sm:pl-2 max-sm:pr-[25px]"
                  :disabled="!selectedGenre"
                >
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
              <span class="self-end pb-3 text-steel-500" aria-hidden="true">+</span>
              <div>
                <label
                  for="topic-two"
                  class="mb-2 flex items-center justify-between text-[11px] font-semibold max-sm:min-h-[29px] max-sm:flex-wrap max-sm:gap-x-[5px] max-sm:gap-y-0.5"
                  >Secondary topic <span class="text-[10px] font-normal text-muted">Optional</span></label
                ><select
                  id="topic-two"
                  v-model="selectedTopic2"
                  class="min-h-[41px] w-full appearance-none rounded-[7px] border border-steel-350 bg-steel-50 bg-chevron bg-[length:13px] bg-[position:right_10px_center] bg-no-repeat py-2 pl-[11px] pr-[30px] text-[12px] text-steel-900 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-accent/50 disabled:cursor-not-allowed disabled:opacity-50 motion-safe:transition max-sm:min-h-11 max-sm:pl-2 max-sm:pr-[25px]"
                  :disabled="!selectedGenre"
                >
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
            <div class="mt-2.5 flex flex-wrap items-center justify-between gap-2.5">
              <button
                class="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-accent-300 bg-accent-soft px-4 py-2.5 text-[12px] font-[650] text-accent-700 enabled:hover:border-accent-400 enabled:hover:bg-accent-100 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-accent/50 disabled:cursor-not-allowed disabled:opacity-50 motion-safe:transition max-sm:w-full"
                :disabled="!selectedGenre"
                @click="generateRandomTopics"
              >
                <UiIcon class="size-[17px]" name="shuffle" /> Random topics
              </button>
              <a
                class="py-[5px] text-[11px] text-muted hover:text-accent focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-accent/50 motion-safe:transition max-sm:py-2.5"
                href="#topics"
                >Browse topic library <span class="ml-[5px]" aria-hidden="true">↓</span></a
              >
            </div>
            <div
              class="mt-4 flex items-center justify-between gap-3 border-t border-line pt-[19px] max-sm:mt-3 max-sm:flex-wrap max-sm:pt-4"
            >
              <div class="flex items-center gap-[9px]">
                <span class="rounded-lg bg-accent-soft p-[9px] text-denim-500 max-lg:hidden max-sm:block"
                  ><UiIcon class="size-[17px]" name="sparkles"
                /></span>
                <div>
                  <h3 class="mb-[3px] text-[12px] font-semibold max-sm:text-[13px]">A name to remember</h3>
                  <p
                    class="text-[10px] text-muted max-lg:max-w-[145px] max-lg:leading-[1.6] max-md:max-w-none max-sm:text-[11px]"
                  >
                    Turn your combination into game name ideas.
                  </p>
                </div>
              </div>
              <button
                class="inline-flex items-center justify-center gap-[7px] whitespace-nowrap rounded-[7px] border border-accent-700 bg-accent px-[13px] py-[11px] text-[11px] font-semibold text-white enabled:hover:bg-accent-700 enabled:hover:shadow-button focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-accent/50 disabled:cursor-not-allowed disabled:opacity-[.55] motion-safe:transition max-sm:min-h-[43px] max-sm:flex-[1_0_100%] max-sm:text-[12px]"
                :disabled="!selectedTopic || isLoading"
                @click="handleGenerateGameNames"
              >
                <UiIcon class="size-3.5" name="sparkles" />{{ isLoading ? 'Generating…' : 'Generate names' }}
              </button>
            </div>
            <div v-if="isLoading" class="mt-[18px] h-[3px] overflow-hidden rounded bg-steel-250" role="status">
              <span class="block h-full w-2/5 bg-accent motion-safe:animate-loading"></span
              ><span class="sr-only">Generating game names</span>
            </div>
            <p
              v-if="generationError"
              class="mt-3.5 rounded-md bg-danger-soft px-3 py-2.5 text-[12px] text-danger"
              role="alert"
            >
              {{ generationError }}
            </p>
            <div v-if="generatedGameNames.length" class="mt-5 border-t border-line pt-[18px]" aria-live="polite">
              <p class="mb-3 text-[10px] font-bold tracking-[1.5px] text-muted">A FEW IDEAS FOR YOUR NEXT RELEASE</p>
              <ol class="grid grid-cols-2 gap-2">
                <li
                  v-for="(name, index) in generatedGameNames"
                  :key="index"
                  class="flex items-baseline gap-[9px] rounded-md bg-steel-150 p-[11px] text-[12px]"
                >
                  <span class="text-[10px] text-steel-550">{{ String(index + 1).padStart(2, '0') }}</span
                  >{{ name.replace(/"/g, '') }}
                </li>
              </ol>
            </div>
          </section>
          <p class="-mt-1 text-center text-[10px] text-steel-700 max-sm:-mt-[5px]">
            <span class="mr-[5px] text-steel-550" aria-hidden="true">✳</span> A little planning goes a long way. Happy
            developing.
          </p>
        </div>
      </div>

      <section
        id="topics"
        class="mt-6 rounded-2xl border border-line bg-surface p-6 shadow-panel max-lg:p-5 max-sm:mt-5 max-sm:rounded-[13px] max-sm:px-4 max-sm:py-[18px]"
        aria-labelledby="topics-heading"
      >
        <div
          class="flex items-center justify-between gap-5 max-md:gap-4 max-sm:flex-col max-sm:items-stretch max-sm:gap-0"
        >
          <div>
            <div class="flex items-center gap-2.5">
              <span
                class="inline-flex size-[25px] shrink-0 items-center justify-center rounded-[7px] bg-steel-200 text-[11px] font-bold text-muted"
                >03</span
              >
              <h2 id="topics-heading" class="text-[17px] font-[650] leading-[1.4] tracking-[-0.5px] max-sm:text-[16px]">
                Find your inspiration
              </h2>
              <span class="rounded-[5px] bg-steel-200 px-[7px] py-[3px] text-[11px] text-muted">{{
                compatibleTopics.length
              }}</span>
            </div>
            <p class="mb-[17px] mt-[9px] text-[12px] leading-[1.65] text-muted max-sm:text-[11px]">
              Topics that fit <strong class="font-semibold text-denim-600">{{ primaryGenre?.name }}</strong
              >. Pick up to two to build your concept.
            </p>
          </div>
          <div
            class="flex min-w-[240px] items-center gap-[9px] rounded-lg border border-line bg-steel-50 px-2.5 focus-within:border-accent focus-within:outline focus-within:outline-[3px] focus-within:outline-accent/25 max-md:w-[210px] max-md:min-w-[180px] max-sm:mb-[15px] max-sm:w-full"
          >
            <UiIcon class="size-3.5 text-steel-550" name="search" /><input
              v-model="topicSearch"
              class="h-[38px] w-full min-w-0 bg-transparent text-[12px] text-ink focus:outline-none [&::-webkit-search-cancel-button]:hidden max-sm:h-[42px] max-sm:text-[13px]"
              type="search"
              aria-label="Search compatible topics"
              placeholder="Find a topic…"
            /><button
              v-if="topicSearch"
              class="inline-flex size-6 shrink-0 items-center justify-center rounded-[7px] p-[5px] text-muted focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-accent/50 motion-safe:transition"
              aria-label="Clear topic search"
              @click="topicSearch = ''"
            >
              <UiIcon name="close" />
            </button>
          </div>
        </div>
        <div
          class="flex min-h-[53px] items-center gap-3 border-t border-line text-[10px] text-muted max-sm:flex-wrap max-sm:gap-2 max-sm:py-[11px]"
        >
          <span class="text-[10px] font-semibold tracking-[1px] max-sm:hidden">{{
            topicSearch ? `${filteredTopics.length} matching topics` : 'COMPATIBLE TOPICS'
          }}</span>
          <div v-if="selectedTopicObjs.length" class="flex flex-wrap gap-[5px]">
            <button
              v-for="topic in selectedTopicObjs"
              :key="topic.id"
              class="flex items-center gap-[5px] rounded-[5px] border border-accent-200 bg-accent-soft px-[7px] py-1 text-[10px] text-denim-700 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-accent/50 motion-safe:transition max-sm:p-1.5"
              :aria-label="`Remove ${topic.name}`"
              @click="toggleTopic(topic.id)"
            >
              {{ getTopicIcon(topic.name) }} {{ topic.name }}<UiIcon class="size-2.5" name="close" />
            </button>
          </div>
          <span v-else>Click a topic to select it</span
          ><span class="ml-auto whitespace-nowrap">{{ selectedTopicObjs.length }} / 2 selected</span>
        </div>
        <div
          v-if="filteredTopics.length"
          class="grid max-h-[300px] grid-cols-7 gap-[7px] overflow-y-auto pb-[5px] pl-0.5 pr-[7px] pt-0.5 [scrollbar-color:theme(colors.steel.400)_transparent] [scrollbar-width:thin] max-lg:grid-cols-6 max-md:grid-cols-5 max-sm:max-h-[360px] max-sm:grid-cols-2"
          role="group"
          aria-label="Compatible topics"
        >
          <button
            v-for="topic in filteredTopics"
            :key="topic.id"
            class="flex min-h-[42px] items-center gap-2 rounded-[7px] border px-[9px] py-2.5 text-left text-[11px] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-accent/50 motion-safe:transition max-sm:min-h-11 max-sm:text-[12px]"
            :class="
              isSelectedTopic(topic.id)
                ? 'border-accent-300 bg-accent-soft text-accent-700'
                : 'border-transparent bg-steel-100 hover:border-steel-350 hover:bg-steel-200'
            "
            :aria-pressed="isSelectedTopic(topic.id)"
            @click="toggleTopic(topic.id)"
          >
            <span class="text-[18px] leading-none" aria-hidden="true">{{ getTopicIcon(topic.name) }}</span
            ><span class="[overflow-wrap:anywhere]">{{ topic.name }}</span
            ><UiIcon v-if="isSelectedTopic(topic.id)" class="ml-auto size-3" name="check" />
          </button>
        </div>
        <div v-else class="px-4 py-8 text-center text-muted">
          <UiIcon class="mx-auto mb-3 size-[25px]" name="search" />
          <h3 class="text-[14px] text-ink">No topics found for “{{ topicSearch }}”</h3>
          <p class="my-2 text-[13px]">Try another search or choose a different genre.</p>
          <button
            class="inline-flex items-center justify-center gap-1.5 py-[7px] text-[11px] font-semibold text-denim-600 hover:text-accent focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-accent/50 motion-safe:transition max-sm:py-2.5"
            @click="topicSearch = ''"
          >
            Clear search
          </button>
        </div>
      </section>
      <footer
        class="flex items-center justify-between gap-[18px] pb-[30px] pt-[27px] text-[10px] text-steel-650 max-sm:flex-wrap max-sm:justify-center max-sm:gap-2.5 max-sm:px-2.5 max-sm:py-[23px] max-sm:text-center"
      >
        <span class="text-muted max-sm:basis-full">Made for the love of game development.</span
        ><span>Fan-made companion · Not affiliated with Eggcode</span
        ><a
          class="hover:text-accent focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-accent/50 motion-safe:transition"
          href="#top"
          >Back to top ↑</a
        >
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
