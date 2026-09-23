// Server-side proxy for OpenAI. The API key lives only here (private
// runtimeConfig) and never reaches the browser. The client calls this
// endpoint instead of api.openai.com directly.

interface GenerateNamesBody {
  genre?: string;
  topic?: string;
  subtopic?: string;
  subgenre?: string;
}

// Simple in-memory rate limiter (per-IP, sliding window). Adequate for a
// single node-server instance; swap for a shared store (Redis) if you scale
// horizontally or move to serverless functions that don't share memory.
const RATE_LIMIT = 10; // requests
const RATE_WINDOW_MS = 60_000; // per minute
const hits = new Map<string, number[]>();

const isRateLimited = (ip: string): boolean => {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter(t => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT;
};

// Keep input bounded so a caller can't smuggle a huge prompt through our key.
const clean = (value: unknown, max = 60): string => (typeof value === 'string' ? value.trim().slice(0, max) : '');

export default defineEventHandler(async (event): Promise<string[]> => {
  const ip = getRequestIP(event, { xForwardedFor: true }) ?? 'unknown';
  if (isRateLimited(ip)) {
    throw createError({ statusCode: 429, statusMessage: 'Too many requests' });
  }

  const config = useRuntimeConfig();
  if (!config.openaiApiKey) {
    throw createError({ statusCode: 500, statusMessage: 'OpenAI key not configured' });
  }

  const body = await readBody<GenerateNamesBody>(event);
  const genre = clean(body?.genre);
  const topic = clean(body?.topic);
  const subtopic = clean(body?.subtopic);
  const subgenre = clean(body?.subgenre);

  if (!genre || !topic) {
    throw createError({ statusCode: 400, statusMessage: 'genre and topic are required' });
  }

  const genreLine = subgenre && subgenre !== 'None' ? `${genre} (subgenre: ${subgenre})` : genre;
  const topicLine = subtopic ? `Topics: ${topic} and ${subtopic}` : `Topic: ${topic}`;
  // Exact word counts made the model pad titles with filler ("Robotic Onslaught Chronicles"),
  // so ask for a mix of lengths and name the stock words to avoid.
  const prompt = `Genre: ${genreLine}
${topicLine}

Suggest 12 titles for this game. Mix lengths: a few single words, several two or three words, a few with a short subtitle after a colon. Avoid stock title words such as Chronicles, Saga, Quest, Legends, Odyssey, Mayhem, Fury, Rampage, Onslaught, Unveiled, Galore and Showdown, and don't just join the genre and topic names. Return only the titles, one per line.`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.openaiApiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-5.4-mini',
      messages: [
        {
          role: 'system',
          content:
            'You name video games. Suggest titles that could sit on a real store shelf: specific to the premise, easy to say, no filler.',
        },
        { role: 'user', content: prompt },
      ],
      reasoning_effort: 'low',
      // Reasoning tokens count toward this cap. Too small a cap returns no titles at all.
      max_completion_tokens: 2000,
    }),
  });

  if (!response.ok) {
    // Don't leak OpenAI's response body to the client.
    throw createError({ statusCode: 502, statusMessage: 'Upstream error' });
  }

  const data = await response.json();
  const content: unknown = data?.choices?.[0]?.message?.content;
  const titles =
    typeof content === 'string'
      ? content
          .split('\n')
          // Models sometimes number or bullet the list even when told not to.
          .map(name => name.replace(/^\s*(?:\d+[.)]|[-*•])\s+/, '').trim())
          .filter(name => name.length > 0)
      : [];
  if (!titles.length) {
    throw createError({ statusCode: 502, statusMessage: 'No titles returned' });
  }

  return titles;
});
