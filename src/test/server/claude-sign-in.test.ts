import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  createFederatedCredentials,
  exchangeIdentityToken,
  type FederationSettings,
} from '../../server/utils/claude-sign-in';

const SETTINGS: FederationSettings = {
  ruleId: 'fdrl_test',
  organizationId: '00000000-0000-0000-0000-000000000000',
  serviceAccountId: 'svac_test',
};
// The federation rule's default token lifetime.
const TOKEN_LIFETIME_SECONDS = 600;

// A stand-in for the Claude API's token endpoint: it records every trade and gives tokens valid for ten minutes.
const standInTokenEndpoint = (nowInSeconds: () => number) => {
  const tradedIdentityTokens: string[] = [];
  const exchange = async (_settings: FederationSettings, identityToken: string) => {
    tradedIdentityTokens.push(identityToken);
    if (identityToken === 'forged') throw new Error('Authentication failed');
    return { token: `access-from-${identityToken}`, expiresAt: nowInSeconds() + TOKEN_LIFETIME_SECONDS };
  };
  return { exchange, tradedIdentityTokens };
};

describe('createFederatedCredentials', () => {
  it('trades one identity token and shares the access token until it nears its end', async () => {
    let now = 1_000_000;
    const tokenEndpoint = standInTokenEndpoint(() => now);
    const credentials = createFederatedCredentials(tokenEndpoint.exchange, () => now);

    expect((await credentials.providerFor(SETTINGS, 'first')()).token).toBe('access-from-first');
    expect((await credentials.providerFor(SETTINGS, 'second')()).token).toBe('access-from-first');

    // Under a minute before the shared token ends, the request at hand trades its own identity token.
    now += TOKEN_LIFETIME_SECONDS - 50;
    expect((await credentials.providerFor(SETTINGS, 'third')()).token).toBe('access-from-third');
    expect(tokenEndpoint.tradedIdentityTokens).toEqual(['first', 'third']);
  });

  it('trades again when the API has turned the shared token down', async () => {
    const tokenEndpoint = standInTokenEndpoint(() => 1_000_000);
    const credentials = createFederatedCredentials(tokenEndpoint.exchange, () => 1_000_000);
    await credentials.providerFor(SETTINGS, 'first')();

    const afterRefusal = await credentials.providerFor(SETTINGS, 'second')({ forceRefresh: true });
    expect(afterRefusal.token).toBe('access-from-second');
  });

  it('keeps the shared token when a request brings an identity token that cannot be traded', async () => {
    const tokenEndpoint = standInTokenEndpoint(() => 1_000_000);
    const credentials = createFederatedCredentials(tokenEndpoint.exchange, () => 1_000_000);
    await credentials.providerFor(SETTINGS, 'first')();

    await expect(credentials.providerFor(SETTINGS, 'forged')({ forceRefresh: true })).rejects.toThrow();
    expect((await credentials.providerFor(SETTINGS, 'second')()).token).toBe('access-from-first');
  });
});

describe('exchangeIdentityToken', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('sends the identity token and the federation IDs to the Claude API', async () => {
    const sentRequests: { url: string; body: unknown }[] = [];
    vi.stubGlobal('fetch', async (url: string, init: RequestInit) => {
      sentRequests.push({ url, body: JSON.parse(String(init.body)) });
      const tokenResponse = { access_token: 'sk-ant-oat01-test', token_type: 'Bearer', expires_in: 600 };
      return new Response(JSON.stringify(tokenResponse), { headers: { 'Content-Type': 'application/json' } });
    });

    const accessToken = await exchangeIdentityToken(SETTINGS, 'identity-token');
    expect(accessToken.token).toBe('sk-ant-oat01-test');
    expect(sentRequests).toEqual([
      {
        url: 'https://api.anthropic.com/v1/oauth/token',
        body: {
          grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
          assertion: 'identity-token',
          federation_rule_id: 'fdrl_test',
          organization_id: '00000000-0000-0000-0000-000000000000',
          service_account_id: 'svac_test',
        },
      },
    ]);
  });
});
