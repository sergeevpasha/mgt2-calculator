import { describe, expect, it } from 'vitest';
import { buildTitlePrompt, parseTitles } from '../../server/utils/titles';

describe('buildTitlePrompt', () => {
  it('names the genre, subgenre and both topics', () => {
    const prompt = buildTitlePrompt({ genre: 'Racing', subgenre: 'Action', topics: ['Cars', 'Police'] });
    expect(prompt).toMatch(/^Genre: Racing \(subgenre: Action\)\nTopics: Cars and Police\n/);
    expect(prompt).toContain('Suggest 12 titles');
  });

  it('handles a single topic without a subgenre', () => {
    expect(buildTitlePrompt({ genre: 'Racing', topics: ['Cars'] })).toMatch(/^Genre: Racing\nTopic: Cars\n/);
  });
});

describe('parseTitles', () => {
  it('strips numbering, bullets and wrapping quotes', () => {
    const content = [
      '1. Gearbox Saints',
      '2) Cold Tarmac',
      '- Lanes of Dust',
      '• Siren Line',
      '* Overpass',
      '',
      '"Quoted"',
      '“Curly”',
      '  Midnight Relay: Harbor Run  ',
    ].join('\n');
    expect(parseTitles(content)).toEqual([
      'Gearbox Saints',
      'Cold Tarmac',
      'Lanes of Dust',
      'Siren Line',
      'Overpass',
      'Quoted',
      'Curly',
      'Midnight Relay: Harbor Run',
    ]);
  });

  it('keeps quotes and numbers that belong to the title', () => {
    expect(parseTitles('Operation "Nightfall"\n1984\n3. 2049')).toEqual(['Operation "Nightfall"', '1984', '2049']);
  });

  it('returns nothing for a missing answer', () => {
    expect(parseTitles(undefined)).toEqual([]);
    expect(parseTitles('\n  \n')).toEqual([]);
  });
});
