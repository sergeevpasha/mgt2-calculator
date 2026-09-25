<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { NO_SUBGENRE } from '#shared/genres';
import type { Genre } from '#shared/genres';
import DesignPriority from '~/components/DesignPriority.vue';
import DesignValues from '~/components/DesignValues.vue';
import UiIcon from '~/components/UiIcon.vue';
import { getGenreIconSrc, getSubgenreIconSrc } from '~/data/icons';
import { formatDesignSettings, labelFocus, labelPriority } from '~/utils/designSettings';

const props = defineProps<{ genre: Genre; subgenre: string }>();
const emit = defineEmits<{ copied: [] }>();

const hasSubgenre = computed(() => props.subgenre !== NO_SUBGENRE);
const subgenreIcon = computed(() => getSubgenreIconSrc(props.subgenre));
const priority = computed(() => labelPriority(props.genre.designPriority));
const focus = computed(() => {
  const values = props.genre.designFocus[props.subgenre];
  return values && labelFocus(values);
});
const focusGroups = computed(() =>
  focus.value
    ? [
        { id: 'focus-one', step: '01', rows: focus.value.focus1 },
        { id: 'focus-two', step: '02', rows: focus.value.focus2 },
      ]
    : []
);

const copyText = computed(() => {
  if (!focus.value) return '';
  const title = hasSubgenre.value ? `${props.genre.name} + ${props.subgenre}` : props.genre.name;
  return formatDesignSettings(title, priority.value, focus.value);
});
const copyStatus = ref<'' | 'copied' | 'failed'>('');
// "Copied!" is about the text on the clipboard, so it goes away once the settings change.
watch(copyText, () => {
  copyStatus.value = '';
});
const copyButton = computed(() =>
  copyStatus.value === 'copied'
    ? ({ icon: 'check', label: 'Copied!', text: 'Copied!' } as const)
    : ({ icon: 'copy', label: 'Copy design settings', text: 'Copy settings' } as const)
);
const copy = async (): Promise<void> => {
  if (!copyText.value) return;
  try {
    await navigator.clipboard.writeText(copyText.value);
    copyStatus.value = 'copied';
    emit('copied');
  } catch {
    copyStatus.value = 'failed';
  }
};
</script>

<template>
  <section
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
            :src="getGenreIconSrc(genre)"
            alt=""
            width="48"
            height="48"
          />
          <template v-if="subgenreIcon">
            <span class="text-[16px] font-medium leading-none text-denim-300 max-sm:text-[13px]" aria-hidden="true"
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
          <h2 id="recipe-heading" class="text-[26px] font-[650] leading-tight tracking-[-0.5px] max-sm:text-[22px]">
            {{ genre.name
            }}<span
              v-if="hasSubgenre"
              class="mt-1 block text-[15px] font-medium tracking-normal text-muted max-sm:text-[14px]"
            >
              + {{ subgenre }}</span
            >
          </h2>
        </div>
      </div>
      <button
        class="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-steel-350 bg-white px-3.5 py-2 text-[14px] font-semibold text-steel-900 hover:border-accent-300 hover:bg-accent-soft hover:text-accent motion-safe:transition max-sm:min-h-11 max-sm:min-w-11 max-sm:p-2.5"
        :aria-label="copyButton.label"
        :title="copyButton.label"
        @click="copy"
      >
        <UiIcon class="size-4" :name="copyButton.icon" /><span class="max-sm:hidden">{{ copyButton.text }}</span>
      </button>
    </div>
    <p
      v-if="copyStatus === 'failed'"
      class="mb-6 rounded-lg bg-danger-soft px-3.5 py-3 text-[14px] text-danger max-sm:mb-5"
      role="alert"
    >
      Couldn’t copy. Select the values and copy them yourself.
    </p>
    <div class="mb-4 flex items-center justify-between gap-3">
      <h3 class="text-[15px] font-[650]">Development priority</h3>
      <span class="text-[13px] text-muted"
        >Total
        <strong class="ml-1 inline-block rounded-md bg-steel-150 px-2 py-0.5 font-semibold text-steel-900"
          >100%</strong
        ></span
      >
    </div>
    <DesignPriority :rows="priority" />
    <template v-if="focus">
      <div class="mb-6 mt-7 grid grid-cols-2 gap-4 max-lg:gap-3 max-sm:mt-6 max-sm:grid-cols-1">
        <section
          v-for="group in focusGroups"
          :key="group.id"
          class="min-w-0 rounded-xl border border-steel-200 bg-steel-100 px-5 pb-5 pt-4 max-lg:px-4 max-lg:pb-4"
          :aria-labelledby="`${group.id}-heading`"
        >
          <div class="mb-4 flex items-baseline justify-between gap-3">
            <h3 :id="`${group.id}-heading`" class="text-[15px] font-[650]">
              Design focus <span class="ml-1 text-[13px] font-medium text-muted">{{ group.step }}</span>
            </h3>
            <span class="text-[12px] text-muted">0–10</span>
          </div>
          <DesignValues :rows="group.rows" />
        </section>
      </div>
      <section class="pb-6" aria-labelledby="direction-heading">
        <div class="mb-4 flex items-baseline justify-between gap-3">
          <h3 id="direction-heading" class="text-[15px] font-[650]">Design direction</h3>
          <span class="text-[12px] text-muted">0–10</span>
        </div>
        <DesignValues :rows="focus.direction" variant="direction" />
      </section>
    </template>
    <p class="flex items-center gap-2.5 border-t border-line py-4 text-[13px] text-muted">
      <UiIcon class="size-4 shrink-0 text-steel-600 max-sm:hidden" name="sliders" /> Set your in-game sliders to these
      values. They assume the random game concept and genre combination options are off.
    </p>
    <span class="sr-only" role="status">{{ copyStatus === 'copied' ? 'Copied!' : '' }}</span>
  </section>
</template>
