import type Anthropic from '@anthropic-ai/sdk';
import { describe, expect, it } from 'vitest';
import { buildTitlePrompt, parseTitles, titlesFromMessage } from '../../server/utils/titles';

// Only the fields titlesFromMessage reads.
const claudeAnswer = (
  stopReason: Anthropic.Beta.BetaMessage['stop_reason'],
  content: Anthropic.Beta.BetaContentBlock[]
): Anthropic.Beta.BetaMessage => ({ stop_reason: stopReason, content }) as Anthropic.Beta.BetaMessage;

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

describe('titlesFromMessage', () => {
  it('reads the titles from the text after a fallback', () => {
    const answer = claudeAnswer('end_turn', [
      {
        type: 'fallback',
        from: { model: 'claude-sonnet-5-5' },
        to: { model: 'claude-sonnet-5' },
      } as Anthropic.Beta.BetaFallbackBlock,
      { type: 'text', text: '1. Gearbox Saints\n2. Cold Tarmac', citations: null },
    ]);
    expect(titlesFromMessage(answer)).toEqual(['Gearbox Saints', 'Cold Tarmac']);
  });

  it('returns nothing when Claude declined', () => {
    expect(titlesFromMessage(claudeAnswer('refusal', []))).toEqual([]);
  });
});
