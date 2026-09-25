<script setup lang="ts">
import { getTopicIcon } from '~/data/icons';

const topic = defineModel<string>({ required: true });
defineProps<{ id: string; topics: string[]; excluded: string }>();
const emit = defineEmits<{ change: [topic: string] }>();

// Read the element: the model still holds the old value until the parent re-renders.
const onChange = (event: Event): void => emit('change', (event.target as HTMLSelectElement).value);
</script>

<template>
  <div>
    <label :for="id" class="mb-2 flex items-baseline justify-between gap-2 text-[14px] font-semibold"><slot /></label
    ><select
      :id="id"
      v-model="topic"
      class="min-h-11 w-full appearance-none rounded-lg border border-steel-350 bg-steel-50 bg-chevron bg-[length:16px] bg-[position:right_12px_center] bg-no-repeat py-2 pl-3 pr-10 text-[15px] text-steel-900 motion-safe:transition max-sm:text-[16px]"
      @change="onChange"
    >
      <option value="">Choose a topic</option>
      <option v-for="option in topics" :key="option" :value="option" :disabled="option === excluded">
        {{ getTopicIcon(option) }} {{ option }}
      </option>
    </select>
  </div>
</template>
