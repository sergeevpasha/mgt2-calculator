import { NO_SUBGENRE, defaultGenre, findGenreById } from '#shared/genres';
import type { Genre } from '#shared/genres';

export interface Selection {
  genre: Genre;
  subgenre: string;
  primaryTopic: string;
  secondaryTopic: string;
}

// The selection is mirrored in the query string (?genre=…&subgenre=…&topic=…&topic2=…), so a shared
// link or a bookmark opens the same settings. Links are already out there, so keep these names stable.
export const slugify = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const fromSlug = (values: string[], slug: unknown): string | undefined => values.find(v => slugify(v) === slug);

// Anything unknown or not valid for the genre falls back to the default.
export const parseSelection = (query: Record<string, unknown>): Selection => {
  const genre = findGenreById(query.genre) ?? defaultGenre;
  const primaryTopic = fromSlug(genre.topics, query.topic) ?? '';
  const secondaryTopic = fromSlug(genre.topics, query.topic2) ?? '';
  return {
    genre,
    subgenre: fromSlug(genre.subgenres, query.subgenre) ?? NO_SUBGENRE,
    primaryTopic,
    secondaryTopic: secondaryTopic === primaryTopic ? '' : secondaryTopic,
  };
};

// An empty value means the parameter is left out.
export const toQueryParams = (selection: Selection): Record<string, string> => ({
  genre: selection.genre.id,
  subgenre: selection.subgenre === NO_SUBGENRE ? '' : slugify(selection.subgenre),
  topic: slugify(selection.primaryTopic),
  topic2: slugify(selection.secondaryTopic),
});
