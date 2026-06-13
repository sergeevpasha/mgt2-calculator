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
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT;
};

// Keep input bounded so a caller can't smuggle a huge prompt through our key.
const clean = (value: unknown, max = 60): string =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

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

  let prompt = `Given a ${genre}`;
  if (subgenre && subgenre !== 'None') {
    prompt += ` ${subgenre}`;
  }
  prompt += ` game with ${topic}`;
  if (subtopic) {
    prompt += ` and ${subtopic}`;
  }
  prompt += ` themes, generate 12 creative and catchy game titles with the following word count distribution:
- 4 one-word titles
- 4 two-word titles
- 4 three-word titles
Return only the titles, one per line.`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.openaiApiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            "You are a creative game title generator. Generate catchy and memorable game titles that reflect the game's genre and themes. Follow the exact word count distribution requested in the prompt.",
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.8,
      max_tokens: 150,
    }),
  });

  if (!response.ok) {
    // Don't leak OpenAI's response body to the client.
    throw createError({ statusCode: 502, statusMessage: 'Upstream error' });
  }

  const data = await response.json();
  const content: unknown = data?.choices?.[0]?.message?.content;
  if (typeof content !== 'string') {
    return [];
  }

  return content
    .split('\n')
    .map((name) => name.trim())
    .filter((name) => name.length > 0);
});
