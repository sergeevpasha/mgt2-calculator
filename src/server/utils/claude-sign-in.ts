import type { AccessToken, AccessTokenProvider } from '@anthropic-ai/sdk/lib/credentials';
import { oidcFederationProvider } from '@anthropic-ai/sdk/lib/credentials/oidc-federation';

// The Claude API, which also hands out the access tokens.
const CLAUDE_API_URL = 'https://api.anthropic.com';
// Access tokens last ten minutes (the federation rule's default) and a request gives up after 25 seconds, so a shared
// token replaced this long before it expires never runs out under a request.
const RENEWAL_MARGIN_SECONDS = 60;

// The IDs the Claude Console's federation setup gives. None of them is secret.
export interface FederationSettings {
  ruleId: string;
  organizationId: string;
  serviceAccountId: string;
}

// Trades an identity token that Vercel signed for a short-lived Claude API access token.
export type TokenExchange = (settings: FederationSettings, identityToken: string) => Promise<AccessToken>;

export const exchangeIdentityToken: TokenExchange = (settings, identityToken) => {
  const exchange = oidcFederationProvider({
    identityTokenProvider: () => identityToken,
    federationRuleId: settings.ruleId,
    organizationId: settings.organizationId,
    serviceAccountId: settings.serviceAccountId,
    baseURL: CLAUDE_API_URL,
    fetch: (input, init) => fetch(input, init),
  });
  return exchange();
};

// Claude API access without an API key, through Workload Identity Federation. Vercel signs an identity token for every
// request to the function, and the Claude API trades it for an access token that all the requests this instance serves
// then share. Only when that token nears its end is the identity token of the request at hand traded for a new one. A
// trade that fails leaves the shared token as it was, so a request with a bad identity token spoils only itself.
export const createFederatedCredentials = (
  exchange: TokenExchange = exchangeIdentityToken,
  nowInSeconds: () => number = () => Date.now() / 1000
) => {
  let sharedToken: AccessToken | undefined;

  const isFresh = (token: AccessToken): boolean =>
    token.expiresAt === null || token.expiresAt - nowInSeconds() > RENEWAL_MARGIN_SECONDS;

  // Access for one request: the shared token, or a new one traded from this request's identity token.
  const providerFor =
    (settings: FederationSettings, identityToken: string): AccessTokenProvider =>
    async options => {
      // After the API turns a token down, the client asks again with forceRefresh.
      if (sharedToken && isFresh(sharedToken) && !options?.forceRefresh) return sharedToken;
      sharedToken = await exchange(settings, identityToken);
      return sharedToken;
    };

  return { providerFor };
};
