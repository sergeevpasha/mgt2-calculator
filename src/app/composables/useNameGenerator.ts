import { ref } from 'vue';
import type { GenerateNamesRequest } from '#shared/generateNames';

const isRateLimited = (cause: unknown): boolean =>
  typeof cause === 'object' && cause !== null && 'statusCode' in cause && cause.statusCode === 429;

// Game name ideas from /api/generate-names, which calls OpenAI on the server so the key stays there.
export const useNameGenerator = () => {
  const names = ref<string[]>([]);
  const error = ref('');
  const isLoading = ref(false);
  // The request in flight. A response only lands while its request is still this one.
  let current: AbortController | undefined;

  // Drops the names, the error and any request still in flight.
  const reset = (): void => {
    current?.abort();
    current = undefined;
    names.value = [];
    error.value = '';
    isLoading.value = false;
  };

  const generate = async (request: GenerateNamesRequest): Promise<void> => {
    reset();
    const controller = new AbortController();
    current = controller;
    isLoading.value = true;
    try {
      const result = await $fetch('/api/generate-names', {
        method: 'POST',
        body: request,
        signal: controller.signal,
      });
      if (current === controller) names.value = result;
    } catch (cause) {
      if (current === controller) {
        error.value = isRateLimited(cause)
          ? 'Too many requests. Wait a minute and try again.'
          : 'Couldn’t generate names right now. Please try again.';
      }
    } finally {
      if (current === controller) {
        current = undefined;
        isLoading.value = false;
      }
    }
  };

  return { names, error, isLoading, generate, reset };
};
