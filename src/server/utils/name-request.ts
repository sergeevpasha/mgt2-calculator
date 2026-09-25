import { NO_SUBGENRE, findGenreByName } from '#shared/genres';
import type { GenerateNamesRequest } from '#shared/generateNames';

const isOneOf = (value: unknown, names: string[]): value is string =>
  typeof value === 'string' && names.includes(value);

// Accept only names from the genre data. The prompt is built from them, so the endpoint can't be used to
// send arbitrary text to OpenAI on our key.
export const parseNameRequest = (body: unknown): GenerateNamesRequest | undefined => {
  if (typeof body !== 'object' || body === null) return undefined;
  const { genre: genreName, subgenre, topics } = body as Record<string, unknown>;

  const genre = typeof genreName === 'string' ? findGenreByName(genreName) : undefined;
  if (!genre) return undefined;
  if (subgenre !== undefined && (subgenre === NO_SUBGENRE || !isOneOf(subgenre, genre.subgenres))) return undefined;
  if (!Array.isArray(topics) || topics.length < 1 || topics.length > 2 || new Set(topics).size < topics.length) {
    return undefined;
  }
  if (!topics.every(topic => isOneOf(topic, genre.topics))) return undefined;

  return { genre: genre.name, subgenre, topics };
};
