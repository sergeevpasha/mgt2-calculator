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

export const generateTitles = async (apiKey: string, request: GenerateNamesRequest): Promise<string[]> => {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-5.4-mini',
      messages: [
        {
          role: 'system',
          content:
            'You name video games. Suggest titles that could sit on a real store shelf: specific to the premise, easy to say, no filler.',
        },
        { role: 'user', content: buildTitlePrompt(request) },
      ],
      reasoning_effort: 'low',
      // Reasoning tokens count toward this cap. Too small a cap returns no titles at all.
      max_completion_tokens: 2000,
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  }).catch((cause: unknown) => {
    const timedOut = cause instanceof DOMException && cause.name === 'TimeoutError';
    throw createError({
      statusCode: timedOut ? 504 : 502,
      statusMessage: timedOut ? 'Upstream timeout' : 'Upstream error',
    });
  });

  if (!response.ok) {
    // Don't leak OpenAI's response body to the client.
    throw createError({ statusCode: 502, statusMessage: 'Upstream error' });
  }

  const data = await response.json();
  const titles = parseTitles(data?.choices?.[0]?.message?.content);
  if (!titles.length) {
    throw createError({ statusCode: 502, statusMessage: 'No titles returned' });
  }
  return titles;
};
