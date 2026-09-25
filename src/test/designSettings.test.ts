import { describe, expect, it } from 'vitest';
import { findGenreById } from '#shared/genres';
import { formatDesignSettings, labelFocus, labelPriority } from '~/utils/designSettings';

describe('design settings', () => {
  const racing = findGenreById('racing') ?? expect.unreachable('racing is missing');
  const focus = racing.designFocus.Action ?? expect.unreachable('Racing has no Action settings');

  it('labels the values in slider order', () => {
    expect(labelPriority(racing.designPriority)).toEqual([
      { label: 'Gameplay', value: 10 },
      { label: 'Graphics', value: 40 },
      { label: 'Sound', value: 30 },
      { label: 'Technical', value: 20 },
    ]);
    expect(labelFocus(focus).direction).toEqual([
      { label: 'Core → Casual', value: 7 },
      { label: 'Nonviolent → Explicit', value: 2 },
      { label: 'Easy → Hard', value: 5 },
    ]);
  });

  it('formats the text the copy button puts on the clipboard', () => {
    expect(formatDesignSettings('Racing + Action', labelPriority(racing.designPriority), labelFocus(focus))).toBe(
      [
        'Racing + Action',
        'Development priority: Gameplay 10% / Graphics 40% / Sound 30% / Technical 20%',
        'Design focus 1: Game length 6 / Game depth 3 / Beginner friendliness 7 / Innovation 6',
        'Design focus 2: Story 2 / Character design 3 / Level design 9 / Mission design 4',
        'Design direction: Core → Casual 7 / Nonviolent → Explicit 2 / Easy → Hard 5',
      ].join('\n')
    );
  });
});
