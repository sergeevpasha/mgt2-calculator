import { toValue, watch } from 'vue';
import type { MaybeRefOrGetter } from 'vue';

// Keeps the query string in step with `params` (an empty value removes the parameter).
export const useQuerySync = (params: MaybeRefOrGetter<Record<string, string>>): void => {
  watch(
    () => toValue(params),
    current => {
      const url = new URL(window.location.href);
      for (const [key, value] of Object.entries(current)) {
        if (value) url.searchParams.set(key, value);
        else url.searchParams.delete(key);
      }
      // Not a router navigation: Nuxt's scroll behavior would jump to the #hash target or to the top.
      window.history.replaceState(window.history.state, '', url);
    }
  );
};
