import Anthropic from '@anthropic-ai/sdk';
import { TITLE_COUNT } from '#shared/generateNames';
import type { GenerateNamesRequest } from '#shared/generateNames';

// A hung upstream would otherwise hold the function until the platform stops it.
const TIMEOUT_MS = 25_000;

export const buildTitlePrompt = ({ genre, subgenre, topics }: GenerateNamesRequest): string => {
  const genreLine = subgenre ? `${genre} (subgenre: ${subgenre})` : genre;
  const topicLine = `${topics.length > 1 ? 'Topics' : 'Topic'}: ${topics.join(' and ')}`;
  // Exact word counts made the model pad titles with filler ("Robotic Onslaught Chronicles"),
  // so ask for a mix of lengths and name the stock words to avoid.
  return `Genre: ${genreLine}
${topicLine}

Suggest ${TITLE_COUNT} titles for this game. Mix lengths: a few single words, several two or three words, a few with a short subtitle after a colon. Avoid stock title words such as Chronicles, Saga, Quest, Legends, Odyssey, Mayhem, Fury, Rampage, Onslaught, Unveiled, Galore and Showdown, and don't just join the genre and topic names. Return only the titles, one per line.`;
};

// Models sometimes number, bullet or quote the list even when told not to.
export const parseTitles = (content: unknown): string[] =>
  typeof content === 'string'
    ? content
        .split('\n')
        .map(line =>
          line
            .replace(/^\s*(?:\d+[.)]|[-*•])\s+/, '')
            .trim()
            .replace(/^["“](.*)["”]$/, '$1')
            .trim()
        )
        .filter(title => title.length > 0)
    : [];

// The titles in Claude's answer. A request Claude declined has none.
export const titlesFromMessage = (message: Anthropic.Beta.BetaMessage): string[] => {
  if (message.stop_reason === 'refusal') return [];
  const text = message.content
    .filter(block => block.type === 'text')
    .map(block => block.text)
    .join('\n');
  return parseTitles(text);
};

export const generateTitles = async (claude: Anthropic, request: GenerateNamesRequest): Promise<string[]> => {
  const message = await claude.beta.messages
    .create(
      {
        model: 'claude-sonnet-5-5',
        // Thinking counts toward this cap. Low effort keeps it short, and the titles take a few hundred tokens.
        max_tokens: 4000,
        output_config: { effort: 'low' },
        system:
          'You name video games. Suggest titles that could sit on a real store shelf: specific to the premise, easy to say, no filler.',
        messages: [{ role: 'user', content: buildTitlePrompt(request) }],
        // If Claude declines a premise as cyber or AI-development work (a hacking game, say), the API retries it on
        // Anthropic's default fallback model instead of returning no titles.
        betas: ['server-side-fallback-2026-07-01'],
        fallbacks: 'default',
      },
      { timeout: TIMEOUT_MS }
    )
    .catch((cause: unknown) => {
      // Covers a failed token exchange too. Claude's error body isn't passed on to the client.
      const timedOut = cause instanceof Anthropic.APIConnectionTimeoutError;
      throw createError({
        statusCode: timedOut ? 504 : 502,
        statusMessage: timedOut ? 'Upstream timeout' : 'Upstream error',
      });
    });

  const titles = titlesFromMessage(message);
  if (!titles.length) {
    throw createError({ statusCode: 502, statusMessage: 'No titles returned' });
  }
  return titles;
};
