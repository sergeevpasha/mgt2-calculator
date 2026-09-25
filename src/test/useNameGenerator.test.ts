import { afterEach, describe, expect, it, vi } from 'vitest';
import { useNameGenerator } from '~/composables/useNameGenerator';

const request = { genre: 'Racing', topics: ['Cars'] };

// A $fetch that answers only when told to. By default it rejects like ofetch once its request is aborted;
// `ignoreAbort` stands for an answer that was already on its way.
const pendingFetch = ({ ignoreAbort = false } = {}) => {
  const answer: { resolve?: (names: string[]) => void } = {};
  const fetch = vi.fn(
    (_url: string, options: { signal: AbortSignal }) =>
      new Promise<string[]>((resolve, reject) => {
        answer.resolve = resolve;
        if (!ignoreAbort) {
          options.signal.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')));
        }
      })
  );
  return { fetch, answer };
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('useNameGenerator', () => {
  it('shows the names from the API', async () => {
    const fetch = vi.fn().mockResolvedValue(['Gearbox Saints', 'Cold Tarmac']);
    vi.stubGlobal('$fetch', fetch);
    const generator = useNameGenerator();

    await generator.generate(request);

    expect(fetch).toHaveBeenCalledWith(
      '/api/generate-names',
      expect.objectContaining({ method: 'POST', body: request })
    );
    expect(generator.names.value).toEqual(['Gearbox Saints', 'Cold Tarmac']);
    expect(generator.isLoading.value).toBe(false);
  });

  it('drops a request that is still running when reset', async () => {
    const { fetch } = pendingFetch();
    vi.stubGlobal('$fetch', fetch);
    const generator = useNameGenerator();

    const running = generator.generate(request);
    expect(generator.isLoading.value).toBe(true);
    generator.reset();
    expect(generator.isLoading.value).toBe(false);
    await running;

    expect(generator.names.value).toEqual([]);
    expect(generator.error.value).toBe('');
  });

  it('ignores the answer to a request that a newer one replaced', async () => {
    const first = pendingFetch({ ignoreAbort: true });
    vi.stubGlobal('$fetch', first.fetch);
    const generator = useNameGenerator();
    const older = generator.generate(request);

    const second = pendingFetch();
    vi.stubGlobal('$fetch', second.fetch);
    const newer = generator.generate(request);

    first.answer.resolve?.(['Older']);
    await older;
    expect(generator.names.value).toEqual([]);
    expect(generator.isLoading.value).toBe(true);

    second.answer.resolve?.(['Newer']);
    await newer;
    expect(generator.names.value).toEqual(['Newer']);
    expect(generator.isLoading.value).toBe(false);
  });

  it('says when the visitor hit the rate limit', async () => {
    vi.stubGlobal(
      '$fetch',
      vi.fn().mockRejectedValue(Object.assign(new Error('Too Many Requests'), { statusCode: 429 }))
    );
    const generator = useNameGenerator();

    await generator.generate(request);

    expect(generator.error.value).toMatch(/Too many requests/);
  });

  it('reports any other failure', async () => {
    vi.stubGlobal('$fetch', vi.fn().mockRejectedValue(Object.assign(new Error('Bad Gateway'), { statusCode: 502 })));
    const generator = useNameGenerator();

    await generator.generate(request);

    expect(generator.error.value).toMatch(/Couldn’t generate names/);
    expect(generator.names.value).toEqual([]);
  });
});
