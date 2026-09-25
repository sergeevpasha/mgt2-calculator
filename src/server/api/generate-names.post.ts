// Server-side proxy for OpenAI. The API key lives only here (private
// runtimeConfig) and never reaches the browser. The client calls this
// endpoint instead of api.openai.com directly.
import { parseNameRequest } from '../utils/name-request';
import { createRateLimiter } from '../utils/rate-limit';
import { generateTitles } from '../utils/titles';

const limiter = createRateLimiter({ limit: 10, windowMs: 60_000 });

export default defineEventHandler(async (event): Promise<string[]> => {
  const ip = getRequestIP(event, { xForwardedFor: true }) ?? 'unknown';
  if (limiter.isLimited(ip)) {
    throw createError({ statusCode: 429, statusMessage: 'Too many requests' });
  }

  const { openaiApiKey } = useRuntimeConfig(event);
  if (!openaiApiKey) {
    throw createError({ statusCode: 500, statusMessage: 'OpenAI key not configured' });
  }

  const request = parseNameRequest(await readBody(event));
  if (!request) {
    throw createError({ statusCode: 400, statusMessage: 'A known genre and one or two of its topics are required' });
  }

  return generateTitles(openaiApiKey, request);
});
