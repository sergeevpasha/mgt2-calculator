<script setup lang="ts">
import { TITLE_COUNT } from '#shared/generateNames';
import UiIcon from '~/components/UiIcon.vue';

defineProps<{ names: string[]; error: string; isLoading: boolean; disabled: boolean }>();
const emit = defineEmits<{ generate: [] }>();
</script>

<template>
  <div>
    <div class="mt-5 flex items-center justify-between gap-4 border-t border-line pt-5 max-sm:flex-wrap">
      <div class="flex items-center gap-3">
        <span class="rounded-[10px] bg-accent-soft p-2.5 text-denim-500 max-lg:hidden max-sm:block"
          ><UiIcon class="size-5" name="sparkles"
        /></span>
        <div>
          <h3 class="mb-0.5 text-[15px] font-semibold">Need a name?</h3>
          <p class="text-[14px] text-muted">
            Get {{ TITLE_COUNT }} AI-generated title ideas for your genre and topics.
          </p>
        </div>
      </div>
      <button
        class="inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-accent-700 bg-accent px-4 py-2.5 text-[14px] font-semibold text-white enabled:hover:bg-accent-700 enabled:hover:shadow-button disabled:cursor-not-allowed disabled:opacity-[.55] motion-safe:transition max-sm:flex-[1_0_100%]"
        :disabled="disabled || isLoading"
        @click="emit('generate')"
      >
        <UiIcon class="size-4" name="sparkles" />{{ isLoading ? 'Generating…' : 'Generate names' }}
      </button>
    </div>
    <div v-if="isLoading" class="mt-5 h-1 overflow-hidden rounded-sm bg-steel-250" role="status">
      <span class="block h-full w-2/5 bg-accent motion-safe:animate-loading"></span
      ><span class="sr-only">Generating game names</span>
    </div>
    <p v-if="error" class="mt-4 rounded-lg bg-danger-soft px-3.5 py-3 text-[14px] text-danger" role="alert">
      {{ error }}
    </p>
    <div v-if="names.length" class="mt-5 border-t border-line pt-5" aria-live="polite">
      <p class="mb-3 text-[12px] font-bold tracking-[1.5px] text-muted">NAME IDEAS</p>
      <ol class="grid grid-cols-2 gap-2 max-sm:grid-cols-1">
        <li
          v-for="(name, index) in names"
          :key="index"
          class="flex items-baseline gap-2.5 rounded-lg bg-steel-150 px-3.5 py-3 text-[15px]"
        >
          <span class="text-[12px] tabular-nums text-muted">{{ String(index + 1).padStart(2, '0') }}</span
          >{{ name }}
        </li>
      </ol>
    </div>
  </div>
</template>
