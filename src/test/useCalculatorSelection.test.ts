import { describe, expect, it } from 'vitest';
import { NO_SUBGENRE, findGenreById } from '#shared/genres';
import type { Genre } from '#shared/genres';
import { useCalculatorSelection } from '~/composables/useCalculatorSelection';
import type { Selection } from '~/utils/selectionQuery';

const genre = (id: string): Genre => findGenreById(id) ?? expect.unreachable(`unknown genre ${id}`);

const start = (overrides: Partial<Selection> = {}) =>
  useCalculatorSelection({
    genre: genre('racing'),
    subgenre: 'Action',
    primaryTopic: 'Cars',
    secondaryTopic: 'Police',
    ...overrides,
  });

describe('useCalculatorSelection', () => {
  it('starts the subgenre and topics over for a new genre', () => {
    const calculator = start();
    calculator.selectGenre(genre('strategy'));
    expect(calculator.selection.value).toEqual({
      genre: genre('strategy'),
      subgenre: NO_SUBGENRE,
      primaryTopic: '',
      secondaryTopic: '',
    });
  });

  it('keeps everything when the current genre is picked again', () => {
    const calculator = start();
    calculator.selectGenre(genre('racing'));
    expect(calculator.subgenre.value).toBe('Action');
    expect(calculator.selectedTopics.value).toEqual(['Cars', 'Police']);
  });

  it('fills the free topic slot, replaces the primary topic when both are taken and removes a picked topic', () => {
    const calculator = start({ primaryTopic: '', secondaryTopic: '' });
    calculator.toggleTopic('Cars');
    calculator.toggleTopic('Police');
    expect(calculator.selectedTopics.value).toEqual(['Cars', 'Police']);

    calculator.toggleTopic('Trucks');
    expect(calculator.selectedTopics.value).toEqual(['Trucks', 'Police']);

    calculator.toggleTopic('Trucks');
    expect(calculator.selectedTopics.value).toEqual(['Police']);
    expect(calculator.isTopicSelected('Police')).toBe(true);

    calculator.toggleTopic('Cars');
    expect(calculator.primaryTopic.value).toBe('Cars');
    expect(calculator.secondaryTopic.value).toBe('Police');
  });

  it('lists the compatible topics by name', () => {
    const calculator = start({ genre: genre('action'), subgenre: NO_SUBGENRE, primaryTopic: '', secondaryTopic: '' });
    const topics = calculator.compatibleTopics.value;
    expect(topics).toEqual([...genre('action').topics].sort((a, b) => a.localeCompare(b)));
    expect(topics).toHaveLength(genre('action').topics.length);
  });

  it('picks two different random topics of the genre', () => {
    const calculator = start();
    for (let i = 0; i < 50; i++) {
      calculator.pickRandomTopics();
      const [primary, secondary] = calculator.selectedTopics.value;
      expect(genre('racing').topics).toContain(primary);
      expect(genre('racing').topics).toContain(secondary);
      expect(primary).not.toBe(secondary);
    }
  });
});
