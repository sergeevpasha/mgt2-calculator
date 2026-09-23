<template>
  <div id="top">
    <a
      class="fixed -top-20 left-4 z-20 rounded-lg bg-ink px-[18px] py-3 text-[15px] font-semibold text-white focus:top-3 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-accent/50 motion-safe:transition"
      href="#calculator"
      >Skip to calculator</a
    >
    <header class="border-b border-line bg-surface">
      <div
        class="mx-auto flex h-[84px] max-w-[1344px] items-center gap-[60px] px-8 max-lg:px-6 max-md:gap-9 max-sm:h-[72px] max-sm:gap-3 max-sm:px-4"
      >
        <a
          class="flex items-center gap-3 text-[17px] font-bold tracking-[-0.4px] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-accent/50 motion-safe:transition max-sm:gap-2.5 max-sm:text-[15px]"
          href="#top"
          aria-label="Mad Games Tycoon 2 calculator home"
        >
          <img class="rounded-xl max-sm:size-10" src="/icons/favicon-96x96.png" alt="" width="46" height="46" />
          <span
            >Mad Games Tycoon <b class="text-accent">2</b
            ><small
              class="mt-0.5 block text-[12px] font-semibold uppercase tracking-[1.3px] text-muted max-sm:tracking-[0.8px]"
              >The studio companion</small
            ></span
          >
        </a>
        <nav
          class="flex gap-9 self-stretch text-[15px] font-semibold max-md:ml-auto max-sm:gap-0 max-sm:text-[13px] max-xs:hidden"
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
            >Topic library <UiIcon class="size-3.5 max-sm:hidden" name="arrow"
          /></a>
        </nav>
        <span class="ml-auto flex items-center gap-2 text-[14px] text-muted max-md:hidden"
          ><span class="size-1.5 rounded-full bg-denim-400"></span> Made for the game</span
        >
      </div>
    </header>

    <main class="mx-auto max-w-[1344px] px-8 max-lg:px-6 max-sm:px-3">
      <div class="flex items-center justify-between gap-6 pb-8 pt-10 max-sm:px-1 max-sm:pb-5 max-sm:pt-6">
        <div>
          <p class="mb-3 text-[12px] font-bold tracking-[1.5px] text-accent max-sm:mb-2 max-sm:tracking-[1.2px]">
            LESS GUESSWORK. MORE GREAT GAMES.
          </p>
          <h1
            class="text-[clamp(30px,3.2vw,44px)] font-[650] leading-[1.15] tracking-[-1.5px] max-sm:text-[28px] max-sm:tracking-[-0.8px]"
          >
            Build your next <em class="font-serif font-normal text-accent">big hit.</em>
          </h1>
          <p class="mt-3 text-[17px] leading-relaxed text-muted max-sm:mt-2 max-sm:text-[15px]">
            Find your genre, dial in the design, and give your next game a name.
          </p>
        </div>
        <div class="flex shrink-0 items-center gap-4 pr-3 text-[15px] leading-[1.7] text-muted max-sm:hidden">
          <UiIcon class="size-10 stroke-1 text-steel-500" name="sliders" /><span
            >Your ideas.<br /><strong class="font-semibold text-steel-900">The right settings.</strong></span
          >
        </div>
      </div>

      <div
        id="calculator"
        class="grid grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] items-start gap-6 max-lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] max-lg:gap-5 max-md:grid-cols-[1fr] max-sm:gap-4"
      >
        <section
          class="rounded-2xl border border-line bg-surface p-6 shadow-panel max-lg:p-5 max-sm:rounded-[14px] max-sm:px-4 max-sm:py-5"
          aria-labelledby="genre-heading"
        >
          <div class="flex items-center justify-between gap-3">
            <div class="flex items-center gap-3">
              <span
                class="inline-flex size-7 shrink-0 items-center justify-center rounded-lg bg-steel-200 text-[12px] font-bold text-muted"
                >01</span
              >
              <h2 id="genre-heading" class="text-[20px] font-[650] leading-snug tracking-[-0.4px] max-sm:text-[18px]">
                Choose your genre
              </h2>
            </div>
            <span class="whitespace-nowrap text-[13px] text-muted">{{ genresList.length }} genres</span>
          </div>
          <p class="mb-6 mt-2 text-[15px] leading-relaxed text-muted max-sm:mb-5 max-sm:text-[14px]">
            Every great game starts with a good combination.
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
              v-for="genre in genresList"
              :key="genre.id"
              class="group relative flex min-h-[104px] flex-col items-center gap-2 rounded-[10px] border px-1.5 pb-2.5 pt-3 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-accent/50 motion-safe:transition max-sm:min-h-[88px] max-sm:gap-1.5 max-sm:pb-2 max-sm:pt-2.5"
              :class="
                selectedGenre === genre.id
                  ? 'border-accent-400 bg-accent-soft text-accent-700 ring-1 ring-accent-400/[.125]'
                  : 'border-transparent bg-steel-100 hover:border-steel-350 hover:bg-steel-200'
              "
              :aria-pressed="selectedGenre === genre.id"
              @click="selectGenre(genre.id)"
            >
              <span
                v-if="selectedGenre === genre.id"
                class="absolute right-1.5 top-1.5 grid size-4 place-items-center rounded-full bg-accent text-white"
                ><UiIcon class="size-2.5 stroke-[2.5]" name="check"
              /></span>
              <img
                class="size-10 object-contain group-hover:-translate-y-0.5 motion-safe:transition-transform motion-safe:duration-[180ms] max-sm:size-9"
                :src="getGenreIconSrc(genre.name)!"
                alt=""
                width="40"
                height="40"
              />
              <span class="text-[13px] font-semibold leading-[1.3]">{{ genre.name }}</span>
            </button>
          </div>

          <template v-if="primaryGenre">
            <div ref="subgenresSection" class="mt-6 border-t border-line pt-6 max-md:mt-5 max-md:pt-5">
              <div class="mb-3 flex items-baseline justify-between gap-3">
                <span id="subgenre-label" class="text-[15px] font-semibold">Subgenre</span
                ><span class="text-[13px] text-muted">Recommended</span>
              </div>
              <div class="flex flex-wrap gap-2" role="group" aria-labelledby="subgenre-label">
                <button
                  v-for="sg in primaryGenre.subgenres"
                  :key="sg"
                  class="inline-flex min-h-11 items-center gap-2 rounded-lg border px-3 py-1.5 text-[14px] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-accent/50 motion-safe:transition"
                  :class="
                    selectedSubgenre === sg
                      ? 'border-accent-300 bg-accent-soft text-denim-700'
                      : 'border-line hover:bg-steel-150'
                  "
                  :aria-pressed="selectedSubgenre === sg"
                  @click="selectSubgenre(sg)"
                >
                  <img
                    v-if="getGenreIconSrc(sg)"
                    class="size-6 object-contain"
                    :src="getGenreIconSrc(sg)!"
                    alt=""
                    width="24"
                    height="24"
                  />
                  <UiIcon v-else-if="selectedSubgenre === sg" class="size-4" name="check" />
                  {{ sg === 'None' ? 'No subgenre' : sg }}
                </button>
              </div>
            </div>
            <div
              class="mt-6 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 rounded-[10px] bg-steel-100 px-4 py-3 max-md:mt-5"
            >
              <span class="text-[14px] text-muted">Target audience</span>
              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="group in primaryGenre.targetGroups"
                  :key="group"
                  class="rounded-md border border-steel-300 bg-surface px-2 py-1 text-[13px] text-steel-900"
                  >{{ group }}</span
                >
              </div>
            </div>
          </template>
        </section>

        <div class="flex min-w-0 flex-col gap-6 max-lg:gap-5 max-sm:gap-4">
          <section
            v-if="primaryGenre"
            id="design-settings"
            ref="designSettingsSection"
            class="rounded-2xl border border-steel-350 bg-surface px-6 pt-6 text-ink shadow-card max-lg:px-5 max-lg:pt-5 max-sm:rounded-[14px] max-sm:px-4"
            aria-labelledby="recipe-heading"
          >
            <div
              class="mb-6 flex items-center justify-between gap-4 border-b border-line pb-6 max-sm:mb-5 max-sm:gap-3 max-sm:pb-5"
            >
              <div class="flex min-w-0 items-center gap-4 max-sm:gap-3">
                <div
                  class="shrink-0 place-items-center rounded-xl border border-accent-150 bg-accent-soft p-2.5 max-sm:rounded-[10px] max-sm:p-2"
                  :class="subgenreIcon ? 'flex gap-1.5 max-sm:gap-1' : 'grid'"
                >
                  <img
                    class="object-contain"
                    :class="subgenreIcon ? 'h-11 w-10 max-sm:h-9 max-sm:w-8' : 'size-11 max-sm:size-9'"
                    :src="getGenreIconSrc(primaryGenre.name)!"
                    alt=""
                    width="48"
                    height="48"
                  />
                  <template v-if="subgenreIcon">
                    <span
                      class="text-[16px] font-medium leading-none text-denim-300 max-sm:text-[13px]"
                      aria-hidden="true"
                      >+</span
                    >
                    <img
                      class="h-11 w-10 object-contain max-sm:h-9 max-sm:w-8"
                      :src="subgenreIcon"
                      alt=""
                      width="48"
                      height="48"
                    />
                  </template>
                </div>
                <div class="min-w-0 [overflow-wrap:anywhere]">
                  <p class="mb-1 text-[12px] font-bold tracking-[1.5px] text-accent">DESIGN SETTINGS</p>
                  <h2
                    id="recipe-heading"
                    class="text-[26px] font-[650] leading-tight tracking-[-0.5px] max-sm:text-[22px]"
                  >
                    {{ primaryGenre.name
                    }}<span
                      v-if="selectedSubgenre !== 'None'"
                      class="mt-1 block text-[15px] font-medium tracking-normal text-muted max-sm:text-[14px]"
                    >
                      + {{ selectedSubgenre }}</span
                    >
                  </h2>
                </div>
              </div>
              <button
                class="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-steel-350 bg-white px-3.5 py-2 text-[14px] font-semibold text-steel-900 hover:border-accent-300 hover:bg-accent-soft hover:text-accent focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-accent/50 motion-safe:transition max-sm:min-h-11 max-sm:min-w-11 max-sm:p-2.5"
                :aria-label="copyStatus || 'Copy design settings'"
                :title="copyStatus || 'Copy design settings'"
                @click="copySettings"
              >
                <UiIcon class="size-4" :name="copyStatus === 'Copied!' ? 'check' : 'copy'" /><span
                  class="max-sm:hidden"
                  >{{ copyStatus === 'Copied!' ? 'Copied!' : 'Copy settings' }}</span
                >
              </button>
            </div>
            <div class="mb-4 flex items-center justify-between gap-3">
              <h3 class="text-[15px] font-[650]">Development priority</h3>
              <span class="text-[13px] text-muted"
                >Total
                <strong class="ml-1 inline-block rounded-md bg-steel-150 px-2 py-0.5 font-semibold text-steel-900"
                  >100%</strong
                ></span
              >
            </div>
            <DesignPriority title="" :values="primaryGenre.designPriority" />
            <template v-if="currentFocus">
              <div class="mb-6 mt-7 grid grid-cols-2 gap-4 max-lg:gap-3 max-sm:mt-6 max-sm:grid-cols-1">
                <section
                  class="min-w-0 rounded-xl border border-steel-200 bg-steel-100 px-5 pb-5 pt-4 max-lg:px-4 max-lg:pb-4"
                  aria-labelledby="focus-one-heading"
                >
                  <div class="mb-4 flex items-baseline justify-between gap-3">
                    <h3 id="focus-one-heading" class="text-[15px] font-[650]">
                      Design focus <span class="ml-1 text-[13px] font-medium text-muted">01</span>
                    </h3>
                    <span class="text-[12px] text-muted">0–10</span>
                  </div>
                  <DesignValues :values="currentFocus.focus1" :labels="focusLabels.focus1" type="focus" />
                </section>
                <section
                  class="min-w-0 rounded-xl border border-steel-200 bg-steel-100 px-5 pb-5 pt-4 max-lg:px-4 max-lg:pb-4"
                  aria-labelledby="focus-two-heading"
                >
                  <div class="mb-4 flex items-baseline justify-between gap-3">
                    <h3 id="focus-two-heading" class="text-[15px] font-[650]">
                      Design focus <span class="ml-1 text-[13px] font-medium text-muted">02</span>
                    </h3>
                    <span class="text-[12px] text-muted">0–10</span>
                  </div>
                  <DesignValues :values="currentFocus.focus2" :labels="focusLabels.focus2" type="focus" />
                </section>
              </div>
              <section class="pb-6" aria-labelledby="direction-heading">
                <div class="mb-4 flex items-baseline justify-between gap-3">
                  <h3 id="direction-heading" class="text-[15px] font-[650]">Design direction</h3>
                  <span class="text-[12px] text-muted">0–10</span>
                </div>
                <DesignValues :values="currentFocus.direction" :labels="focusLabels.direction" type="direction" />
              </section>
            </template>
            <div class="flex items-center justify-between gap-4 border-t border-line py-4 text-[13px] text-muted">
              <span class="flex items-center gap-2.5"
                ><UiIcon class="size-4 shrink-0 text-steel-600 max-sm:hidden" name="sliders" /> Match these values to
                your in-game sliders. Assumes the random game concept and genre combination options are off.</span
              >
              <span class="flex items-center gap-2 whitespace-nowrap"
                ><i class="size-1.5 rounded-full bg-accent-500"></i> Live</span
              >
            </div>
            <span class="sr-only" role="status">{{ copyStatus }}</span>
          </section>

          <section
            class="rounded-2xl border border-line bg-surface p-6 shadow-panel max-lg:p-5 max-sm:rounded-[14px] max-sm:px-4 max-sm:py-5"
            aria-labelledby="concept-heading"
          >
            <div class="flex items-center justify-between gap-3">
              <div class="flex items-center gap-3">
                <span
                  class="inline-flex size-7 shrink-0 items-center justify-center rounded-lg bg-steel-200 text-[12px] font-bold text-muted"
                  >02</span
                >
                <h2
                  id="concept-heading"
                  class="text-[20px] font-[650] leading-snug tracking-[-0.4px] max-sm:text-[18px]"
                >
                  Make it your own
                </h2>
              </div>
              <UiIcon class="size-6 text-steel-500" name="sparkles" />
            </div>
            <p class="mb-6 mt-2 text-[15px] leading-relaxed text-muted max-sm:mb-5 max-sm:text-[14px]">
              Set the scene with two compatible topics.
            </p>
            <div
              class="grid grid-cols-[minmax(0,1fr)_16px_minmax(0,1fr)] items-end gap-3 max-sm:grid-cols-1 max-sm:gap-4"
            >
              <div>
                <label for="topic-one" class="mb-2 flex items-baseline justify-between gap-2 text-[14px] font-semibold"
                  >Primary topic</label
                ><select
                  id="topic-one"
                  v-model="selectedTopic"
                  class="min-h-11 w-full appearance-none rounded-lg border border-steel-350 bg-steel-50 bg-chevron bg-[length:16px] bg-[position:right_12px_center] bg-no-repeat py-2 pl-3 pr-10 text-[15px] text-steel-900 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-accent/50 disabled:cursor-not-allowed disabled:opacity-50 motion-safe:transition max-sm:text-[16px]"
                  :disabled="!selectedGenre"
                  @change="onTopicSelect"
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
              <span class="self-end pb-3 text-center text-[16px] text-steel-500 max-sm:hidden" aria-hidden="true"
                >+</span
              >
              <div>
                <label for="topic-two" class="mb-2 flex items-baseline justify-between gap-2 text-[14px] font-semibold"
                  >Secondary topic <span class="text-[13px] font-normal text-muted">Recommended</span></label
                ><select
                  id="topic-two"
                  v-model="selectedTopic2"
                  class="min-h-11 w-full appearance-none rounded-lg border border-steel-350 bg-steel-50 bg-chevron bg-[length:16px] bg-[position:right_12px_center] bg-no-repeat py-2 pl-3 pr-10 text-[15px] text-steel-900 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-accent/50 disabled:cursor-not-allowed disabled:opacity-50 motion-safe:transition max-sm:text-[16px]"
                  :disabled="!selectedGenre"
                  @change="onTopicSelect"
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
            <div class="mt-4 flex flex-wrap items-center justify-between gap-3">
              <button
                class="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-accent-300 bg-accent-soft px-4 py-2.5 text-[14px] font-[650] text-accent-700 enabled:hover:border-accent-400 enabled:hover:bg-accent-100 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-accent/50 disabled:cursor-not-allowed disabled:opacity-50 motion-safe:transition max-sm:w-full"
                :disabled="!selectedGenre"
                @click="generateRandomTopics"
              >
                <UiIcon class="size-[18px]" name="shuffle" /> Random topics
              </button>
              <a
                class="inline-flex min-h-11 items-center text-[14px] text-muted hover:text-accent focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-accent/50 motion-safe:transition max-sm:w-full max-sm:justify-center"
                href="#topics"
                >Browse topic library <span class="ml-1.5" aria-hidden="true">↓</span></a
              >
            </div>
            <div class="mt-5 flex items-center justify-between gap-4 border-t border-line pt-5 max-sm:flex-wrap">
              <div class="flex items-center gap-3">
                <span class="rounded-[10px] bg-accent-soft p-2.5 text-denim-500 max-lg:hidden max-sm:block"
                  ><UiIcon class="size-5" name="sparkles"
                /></span>
                <div>
                  <h3 class="mb-0.5 text-[15px] font-semibold">A name to remember</h3>
                  <p class="text-[14px] text-muted">Turn your combination into game name ideas.</p>
                </div>
              </div>
              <button
                class="inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-accent-700 bg-accent px-4 py-2.5 text-[14px] font-semibold text-white enabled:hover:bg-accent-700 enabled:hover:shadow-button focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-accent/50 disabled:cursor-not-allowed disabled:opacity-[.55] motion-safe:transition max-sm:flex-[1_0_100%]"
                :disabled="!selectedTopic || isLoading"
                @click="handleGenerateGameNames"
              >
                <UiIcon class="size-4" name="sparkles" />{{ isLoading ? 'Generating…' : 'Generate names' }}
              </button>
            </div>
            <div v-if="isLoading" class="mt-5 h-1 overflow-hidden rounded bg-steel-250" role="status">
              <span class="block h-full w-2/5 bg-accent motion-safe:animate-loading"></span
              ><span class="sr-only">Generating game names</span>
            </div>
            <p
              v-if="generationError"
              class="mt-4 rounded-lg bg-danger-soft px-3.5 py-3 text-[14px] text-danger"
              role="alert"
            >
              {{ generationError }}
            </p>
            <div v-if="generatedGameNames.length" class="mt-5 border-t border-line pt-5" aria-live="polite">
              <p class="mb-3 text-[12px] font-bold tracking-[1.5px] text-muted">A FEW IDEAS FOR YOUR NEXT RELEASE</p>
              <ol class="grid grid-cols-2 gap-2 max-sm:grid-cols-1">
                <li
                  v-for="(name, index) in generatedGameNames"
                  :key="index"
                  class="flex items-baseline gap-2.5 rounded-lg bg-steel-150 px-3.5 py-3 text-[15px]"
                >
                  <span class="text-[12px] tabular-nums text-muted">{{ String(index + 1).padStart(2, '0') }}</span
                  >{{ name.replace(/"/g, '') }}
                </li>
              </ol>
            </div>
          </section>
          <p class="-mt-1 text-center text-[13px] text-muted">
            <span class="mr-1.5 text-steel-500" aria-hidden="true">✳</span> A little planning goes a long way. Happy
            developing.
          </p>
        </div>
      </div>

      <section
        id="topics"
        class="mt-6 rounded-2xl border border-line bg-surface p-6 shadow-panel max-lg:mt-5 max-lg:p-5 max-sm:mt-4 max-sm:rounded-[14px] max-sm:px-4 max-sm:py-5"
        aria-labelledby="topics-heading"
      >
        <div class="flex items-center justify-between gap-5 max-sm:flex-col max-sm:items-stretch max-sm:gap-0">
          <div>
            <div class="flex items-center gap-3">
              <span
                class="inline-flex size-7 shrink-0 items-center justify-center rounded-lg bg-steel-200 text-[12px] font-bold text-muted"
                >03</span
              >
              <h2 id="topics-heading" class="text-[20px] font-[650] leading-snug tracking-[-0.4px] max-sm:text-[18px]">
                Find your inspiration
              </h2>
              <span class="rounded-md bg-steel-200 px-2 py-0.5 text-[13px] font-semibold text-muted">{{
                compatibleTopics.length
              }}</span>
            </div>
            <p class="mb-5 mt-2 text-[15px] leading-relaxed text-muted max-sm:mb-4 max-sm:text-[14px]">
              Topics that fit <strong class="font-semibold text-denim-600">{{ primaryGenre?.name }}</strong
              >. Pick two to build your concept.
            </p>
          </div>
          <div
            class="flex w-[280px] shrink-0 items-center gap-2.5 rounded-lg border border-line bg-steel-50 px-3 focus-within:border-accent focus-within:outline focus-within:outline-[3px] focus-within:outline-accent/25 max-md:w-[240px] max-sm:mb-4 max-sm:w-full"
          >
            <UiIcon class="size-4 text-muted" name="search" /><input
              v-model="topicSearch"
              class="h-11 w-full min-w-0 bg-transparent text-[15px] text-ink placeholder:text-muted focus:outline-none [&::-webkit-search-cancel-button]:hidden max-sm:text-[16px]"
              type="search"
              aria-label="Search compatible topics"
              placeholder="Find a topic…"
            /><button
              v-if="topicSearch"
              class="inline-flex size-8 shrink-0 items-center justify-center rounded-lg p-1.5 text-muted hover:bg-steel-150 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-accent/50 motion-safe:transition"
              aria-label="Clear topic search"
              @click="topicSearch = ''"
            >
              <UiIcon name="close" />
            </button>
          </div>
        </div>
        <div
          class="flex min-h-14 flex-wrap items-center gap-x-3 gap-y-2 border-t border-line py-3 text-[13px] text-muted"
        >
          <span class="text-[12px] font-bold tracking-[1px] max-sm:hidden">{{
            topicSearch ? `${filteredTopics.length} matching topics` : 'COMPATIBLE TOPICS'
          }}</span>
          <div v-if="selectedTopicObjs.length" class="flex flex-wrap gap-2">
            <button
              v-for="topic in selectedTopicObjs"
              :key="topic.id"
              class="flex min-h-8 items-center gap-1.5 rounded-md border border-accent-200 bg-accent-soft px-2.5 py-1 text-[13px] text-denim-700 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-accent/50 motion-safe:transition"
              :aria-label="`Remove ${topic.name}`"
              @click="toggleTopic(topic.id)"
            >
              {{ getTopicIcon(topic.name) }} {{ topic.name }}<UiIcon class="size-3" name="close" />
            </button>
          </div>
          <span v-else>Click a topic to select it</span
          ><span class="ml-auto whitespace-nowrap">{{ selectedTopicObjs.length }} / 2 selected</span>
        </div>
        <div
          v-if="filteredTopics.length"
          class="grid max-h-[372px] grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2 overflow-y-auto pb-1.5 pl-0.5 pr-2 pt-0.5 [scrollbar-color:theme(colors.steel.400)_transparent] [scrollbar-width:thin] max-sm:max-h-[440px] max-sm:grid-cols-2"
          role="group"
          aria-label="Compatible topics"
        >
          <button
            v-for="topic in filteredTopics"
            :key="topic.id"
            class="flex min-h-12 items-center gap-2.5 rounded-lg border px-3 py-2 text-left text-[14px] leading-snug focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-accent/50 motion-safe:transition"
            :class="
              isSelectedTopic(topic.id)
                ? 'border-accent-300 bg-accent-soft text-accent-700'
                : 'border-transparent bg-steel-100 hover:border-steel-350 hover:bg-steel-200'
            "
            :aria-pressed="isSelectedTopic(topic.id)"
            @click="toggleTopic(topic.id)"
          >
            <span class="text-[20px] leading-none" aria-hidden="true">{{ getTopicIcon(topic.name) }}</span
            ><span class="[overflow-wrap:anywhere]">{{ topic.name }}</span
            ><UiIcon v-if="isSelectedTopic(topic.id)" class="ml-auto size-3.5" name="check" />
          </button>
        </div>
        <div v-else class="px-4 py-10 text-center text-muted">
          <UiIcon class="mx-auto mb-3 size-7" name="search" />
          <h3 class="text-[16px] font-semibold text-ink">No topics found for “{{ topicSearch }}”</h3>
          <p class="my-2 text-[14px]">Try another search or choose a different genre.</p>
          <button
            class="inline-flex min-h-10 items-center justify-center gap-1.5 px-2 text-[14px] font-semibold text-denim-600 hover:text-accent focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-accent/50 motion-safe:transition"
            @click="topicSearch = ''"
          >
            Clear search
          </button>
        </div>
      </section>
      <footer
        class="flex items-center justify-between gap-5 pb-8 pt-7 text-[13px] text-muted max-sm:flex-wrap max-sm:justify-center max-sm:gap-3 max-sm:px-2 max-sm:py-6 max-sm:text-center"
      >
        <span class="max-sm:basis-full">Made for the love of game development.</span
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
import { ref, computed, watch, nextTick } from 'vue';
import type { Ref } from 'vue';
import { useGtag, useHead, useRoute, useRuntimeConfig } from '#imports';
import type { Genre, Topic } from '~/types';
import DesignValues from '~/components/DesignValues.vue';
import DesignPriority from '~/components/DesignPriority.vue';
import UiIcon from '~/components/UiIcon.vue';
import genres from '~/data/genres';
import { focusLabels, priorityLabels } from '~/data/designLabels';
import { getGenreIconSrc, getTopicIcon } from '~/data/icons';
import { useOpenAI } from '~/composables/useOpenAI';

const { siteUrl } = useRuntimeConfig().public;
useHead({ link: [{ rel: 'canonical', href: `${siteUrl}/` }] });

const genresList: Genre[] = Object.values(genres);

// The selection is mirrored in the query string (?genre=…&subgenre=…&topic=…&topic2=…), so a shared
// link or a bookmark opens the same settings.
const slugify = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
const fromSlug = (values: string[], slug: unknown): string | undefined => values.find(v => slugify(v) === slug);
const query = useRoute().query;
const initialGenre = genresList.find(g => g.id === query.genre) ?? genres.action;
const initialTopic = fromSlug(initialGenre.topics, query.topic) ?? '';
const initialTopic2 = fromSlug(initialGenre.topics, query.topic2) ?? '';

const selectedGenre = ref(initialGenre.id);
const selectedSubgenre = ref(fromSlug(initialGenre.subgenres, query.subgenre) ?? 'None');
const selectedTopic = ref(initialTopic);
const selectedTopic2 = ref(initialTopic2 === initialTopic ? '' : initialTopic2);
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
watch(selectionKey, () => {
  const url = new URL(window.location.href);
  const params = {
    genre: selectedGenre.value,
    subgenre: selectedSubgenre.value === 'None' ? '' : slugify(selectedSubgenre.value),
    topic: slugify(selectedTopic.value),
    topic2: slugify(selectedTopic2.value),
  };
  for (const [key, value] of Object.entries(params)) {
    if (value) url.searchParams.set(key, value);
    else url.searchParams.delete(key);
  }
  // Not a router navigation: Nuxt's scroll behavior would jump to the #hash target or to the top.
  window.history.replaceState(window.history.state, '', url);
});

// Report calculator interactions to GA4. Without them, a visitor who finds their numbers in a few
// seconds and leaves looks exactly like one who bounced.
const { gtag } = useGtag();
const trackEvent = (name: string, params: Record<string, string> = {}): void => {
  gtag('event', name, { genre: primaryGenre.value?.name ?? '', ...params });
};

// Below the md breakpoint (921px) the columns stack, so the next step sits under the genre grid after
// a tap. Scroll it into view; html's motion-safe:scroll-smooth decides whether that animates.
const subgenresSection = ref<HTMLElement | null>(null);
const designSettingsSection = ref<HTMLElement | null>(null);
const revealOnStackedLayout = (section: Ref<HTMLElement | null>): void => {
  if (window.matchMedia('(min-width: 921px)').matches) return;
  nextTick(() => section.value?.scrollIntoView({ block: 'start' }));
};

const selectGenre = (id: string): void => {
  selectedGenre.value = id;
  trackEvent('select_genre');
  revealOnStackedLayout(subgenresSection);
};
const selectSubgenre = (subgenre: string): void => {
  selectedSubgenre.value = subgenre;
  trackEvent('select_subgenre', { subgenre });
  revealOnStackedLayout(designSettingsSection);
};
const onTopicSelect = (event: Event): void => {
  const topic = (event.target as HTMLSelectElement).value;
  if (topic) trackEvent('select_topic', { topic });
};

const isSelectedTopic = (id: string): boolean => id === selectedTopic.value || id === selectedTopic2.value;
const toggleTopic = (id: string): void => {
  if (id === selectedTopic.value) selectedTopic.value = '';
  else if (id === selectedTopic2.value) selectedTopic2.value = '';
  else if (!selectedTopic.value) selectedTopic.value = id;
  else if (!selectedTopic2.value) selectedTopic2.value = id;
  else selectedTopic.value = id;
  if (isSelectedTopic(id)) trackEvent('select_topic', { topic: id });
};
const generateRandomTopics = (): void => {
  const topics = [...(primaryGenre.value?.topics || [])];
  const first = topics.splice(Math.floor(Math.random() * topics.length), 1)[0];
  const second = topics[Math.floor(Math.random() * topics.length)];
  selectedTopic.value = first ?? '';
  selectedTopic2.value = second ?? '';
  trackEvent('random_topics');
};
const handleGenerateGameNames = async (): Promise<void> => {
  const genre = primaryGenre.value;
  const topic = currentTopic.value;
  if (!genre || !topic || isLoading.value) return;
  const requestSelection = selectionKey.value;
  isLoading.value = true;
  generationError.value = '';
  trackEvent('generate_names', { topic: topic.name, topic2: currentTopic2.value?.name ?? '' });
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
    trackEvent('copy_settings', { subgenre: selectedSubgenre.value });
  } catch {
    copyStatus.value = 'Unable to copy. Please copy the displayed values manually.';
  }
};
</script>
