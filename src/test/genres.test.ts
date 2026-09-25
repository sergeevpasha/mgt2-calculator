import { existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { NO_SUBGENRE, findGenreByName, genres } from '#shared/genres';
import { focusLabels, priorityLabels } from '~/data/designLabels';
import { topicIcons } from '~/data/icons';
import { slugify } from '~/utils/selectionQuery';

// The page trusts this data. A subgenre without design settings hides the focus block and a missing
// icon renders an empty image, both without an error, so check the files here instead.
describe('genre data', () => {
  it('has unique ids and names', () => {
    expect(new Set(genres.map(genre => genre.id)).size).toBe(genres.length);
    expect(new Set(genres.map(genre => genre.name)).size).toBe(genres.length);
  });

  describe.each(genres)('$name', genre => {
    it('has its icon file', () => {
      expect(existsSync(new URL(`../public/icons/genres/${genre.icon}`, import.meta.url))).toBe(true);
    });

    it('offers no subgenre, and names only other genres as subgenres', () => {
      expect(genre.subgenres).toContain(NO_SUBGENRE);
      for (const subgenre of genre.subgenres.filter(name => name !== NO_SUBGENRE)) {
        expect(findGenreByName(subgenre), subgenre).toBeDefined();
      }
    });

    it('has design settings for exactly its subgenres', () => {
      expect(Object.keys(genre.designFocus).sort()).toEqual([...genre.subgenres].sort());
    });

    it('has development priorities that add up to 100', () => {
      expect(genre.designPriority).toHaveLength(priorityLabels.length);
      expect(genre.designPriority.reduce((sum, value) => sum + value, 0)).toBe(100);
    });

    it('has one value from 0 to 10 for every slider', () => {
      for (const focus of Object.values(genre.designFocus)) {
        for (const key of ['focus1', 'focus2', 'direction'] as const) {
          expect(focus[key]).toHaveLength(focusLabels[key].length);
          expect(Math.min(...focus[key])).toBeGreaterThanOrEqual(0);
          expect(Math.max(...focus[key])).toBeLessThanOrEqual(10);
        }
      }
    });

    it('has an emoji and a unique URL slug for every topic', () => {
      for (const topic of genre.topics) expect(topicIcons[topic], topic).toBeDefined();
      expect(new Set(genre.topics.map(slugify)).size).toBe(genre.topics.length);
    });
  });
});
