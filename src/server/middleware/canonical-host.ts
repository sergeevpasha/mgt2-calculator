// The site also answers on www and on the Vercel project domain. Send those visitors to the canonical
// domain so search engines index a single copy of each page.
const ALIAS_HOSTS = new Set(['www.madgamestycoon.com', 'mgt2-calculator.vercel.app']);

export default defineEventHandler(event => {
  if (event.method !== 'GET' && event.method !== 'HEAD') return;
  if (!ALIAS_HOSTS.has(getRequestHost(event, { xForwardedHost: true }))) return;

  const { siteUrl } = useRuntimeConfig(event).public;
  return sendRedirect(event, `${siteUrl}${event.path}`, 308);
});
