import { computed, ref, shallowRef } from 'vue';
import { NO_SUBGENRE } from '#shared/genres';
import type { Genre } from '#shared/genres';
import type { Selection } from '~/utils/selectionQuery';

const byName = (a: string, b: string): number => a.localeCompare(b);

// The calculator's state: a genre, a subgenre and up to two topics.
export const useCalculatorSelection = (initial: Selection) => {
  const genre = shallowRef(initial.genre);
  const subgenre = ref(initial.subgenre);
  const primaryTopic = ref(initial.primaryTopic);
  const secondaryTopic = ref(initial.secondaryTopic);

  const selection = computed<Selection>(() => ({
    genre: genre.value,
    subgenre: subgenre.value,
    primaryTopic: primaryTopic.value,
    secondaryTopic: secondaryTopic.value,
  }));
  const compatibleTopics = computed(() => [...genre.value.topics].sort(byName));
  const selectedTopics = computed(() => [primaryTopic.value, secondaryTopic.value].filter(Boolean));

  // Subgenres and topics depend on the genre, so a new genre starts them over.
  const selectGenre = (next: Genre): void => {
    if (next.id === genre.value.id) return;
    genre.value = next;
    subgenre.value = NO_SUBGENRE;
    primaryTopic.value = '';
    secondaryTopic.value = '';
  };

  const isTopicSelected = (topic: string): boolean => topic === primaryTopic.value || topic === secondaryTopic.value;

  // A selected topic is removed. Otherwise the topic fills the first free slot, or replaces the primary topic.
  const toggleTopic = (topic: string): void => {
    if (topic === primaryTopic.value) primaryTopic.value = '';
    else if (topic === secondaryTopic.value) secondaryTopic.value = '';
    else if (!primaryTopic.value) primaryTopic.value = topic;
    else if (!secondaryTopic.value) secondaryTopic.value = topic;
    else primaryTopic.value = topic;
  };

  const pickRandomTopics = (): void => {
    const topics = [...genre.value.topics];
    primaryTopic.value = topics.splice(Math.floor(Math.random() * topics.length), 1)[0] ?? '';
    secondaryTopic.value = topics[Math.floor(Math.random() * topics.length)] ?? '';
  };

  return {
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
  };
};
