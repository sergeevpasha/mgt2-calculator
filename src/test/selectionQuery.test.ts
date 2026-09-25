import { describe, expect, it } from 'vitest';
import { NO_SUBGENRE, defaultGenre, findGenreById, genres } from '#shared/genres';
import type { Genre } from '#shared/genres';
import { parseSelection, toQueryParams } from '~/utils/selectionQuery';

const genre = (id: string): Genre => findGenreById(id) ?? expect.unreachable(`unknown genre ${id}`);

describe('selection query', () => {
  it('writes the parameters that shared links already use', () => {
    const selection = {
      genre: genre('racing'),
      subgenre: 'Sports Game',
      primaryTopic: 'Stock Car',
      secondaryTopic: 'Jet Ski',
    };
    expect(toQueryParams(selection)).toEqual({
      genre: 'racing',
      subgenre: 'sports-game',
      topic: 'stock-car',
      topic2: 'jet-ski',
    });
  });

  it('leaves out the subgenre and topics that are not set', () => {
    const selection = { genre: genre('racing'), subgenre: NO_SUBGENRE, primaryTopic: '', secondaryTopic: '' };
    expect(toQueryParams(selection)).toEqual({ genre: 'racing', subgenre: '', topic: '', topic2: '' });
  });

  it('reads back every genre, subgenre and topic it writes', () => {
    for (const current of genres) {
      const [primaryTopic = '', secondaryTopic = ''] = current.topics;
      for (const subgenre of current.subgenres) {
        const selection = { genre: current, subgenre, primaryTopic, secondaryTopic };
        expect(parseSelection(toQueryParams(selection))).toEqual(selection);
      }
      for (const topic of current.topics) {
        const selection = { genre: current, subgenre: NO_SUBGENRE, primaryTopic: topic, secondaryTopic: '' };
        expect(parseSelection(toQueryParams(selection))).toEqual(selection);
      }
    }
  });

  it('falls back to the defaults for unknown values', () => {
    expect(parseSelection({ genre: 'nope', subgenre: 'x', topic: ['a', 'b'], topic2: 'y' })).toEqual({
      genre: defaultGenre,
      subgenre: NO_SUBGENRE,
      primaryTopic: '',
      secondaryTopic: '',
    });
  });

  it('ignores a subgenre or topic that the genre does not have', () => {
    expect(parseSelection({ genre: 'racing', subgenre: 'strategy', topic: 'zombies' })).toMatchObject({
      subgenre: NO_SUBGENRE,
      primaryTopic: '',
    });
  });

  it('drops a secondary topic that repeats the primary one', () => {
    expect(parseSelection({ genre: 'racing', topic: 'cars', topic2: 'cars' })).toMatchObject({
      primaryTopic: 'Cars',
      secondaryTopic: '',
    });
  });
});
