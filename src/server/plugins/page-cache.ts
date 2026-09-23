// A rendered page depends only on its URL (the selection lives in the query string), so Vercel's CDN can
// cache each one. The CDN cache is scoped to a deployment, so a new deploy never serves old markup.
// Prerendering isn't an option: static files ignore the query string, which would break shared links.
export default defineNitroPlugin(nitroApp => {
  nitroApp.hooks.hook('render:response', response => {
    if (response.statusCode === 200) {
      response.headers = {
        ...response.headers,
        'cache-control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
      };
    }
  });
});
