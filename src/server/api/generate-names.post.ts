// Game name ideas from Claude. The server signs in to the Claude API with the identity token Vercel signs for each
// request (Workload Identity Federation), so there is no API key anywhere and nothing secret reaches the browser.
import Anthropic from '@anthropic-ai/sdk';
import { createFederatedCredentials } from '../utils/claude-sign-in';
import { parseNameRequest } from '../utils/name-request';
import { createRateLimiter } from '../utils/rate-limit';
import { generateTitles } from '../utils/titles';

const limiter = createRateLimiter({ limit: 10, windowMs: 60_000 });
const credentials = createFederatedCredentials();

export default defineEventHandler(async (event): Promise<string[]> => {
  const ip = getRequestIP(event, { xForwardedFor: true }) ?? 'unknown';
  if (limiter.isLimited(ip)) {
    throw createError({ statusCode: 429, statusMessage: 'Too many requests' });
  }

  const { anthropicFederationRuleId, anthropicOrganizationId, anthropicServiceAccountId } = useRuntimeConfig(event);
  // Vercel puts a token it signed for this project and environment on every request to the function. The development
  // server has no Vercel in front of it, so it uses the token `vercel env pull` wrote to .env.local.
  const identityToken =
    getHeader(event, 'x-vercel-oidc-token') ?? (import.meta.dev ? process.env.VERCEL_OIDC_TOKEN : undefined);
  if (!anthropicFederationRuleId || !anthropicOrganizationId || !anthropicServiceAccountId || !identityToken) {
    throw createError({ statusCode: 500, statusMessage: 'Claude sign-in not configured' });
  }

  const request = parseNameRequest(await readBody(event));
  if (!request) {
    throw createError({ statusCode: 400, statusMessage: 'A known genre and one or two of its topics are required' });
  }

  const federation = {
    ruleId: anthropicFederationRuleId,
    organizationId: anthropicOrganizationId,
    serviceAccountId: anthropicServiceAccountId,
  };
  // The SDK retries twice by default. A single attempt keeps the whole call within the request's timeout.
  const claude = new Anthropic({ credentials: credentials.providerFor(federation, identityToken), maxRetries: 0 });
  return generateTitles(claude, request);
});
