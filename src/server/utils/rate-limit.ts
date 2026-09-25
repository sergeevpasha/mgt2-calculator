// Sliding-window request limit, counted in memory. Vercel runs this route as serverless functions that
// don't share memory, and each cold start begins with an empty count, so the limit only caps bursts that
// reach one warm instance. A limit per visitor across instances needs a Vercel Firewall rate-limit rule
// or a shared store.
export const createRateLimiter = ({ limit, windowMs }: { limit: number; windowMs: number }) => {
  const hits = new Map<string, number[]>();
  let lastSweep = 0;

  const isLimited = (key: string, now = Date.now()): boolean => {
    // Forget keys that stayed quiet for a whole window, so visitors who never come back don't pile up.
    if (now - lastSweep >= windowMs) {
      for (const [otherKey, times] of hits) {
        if (now - (times.at(-1) ?? 0) >= windowMs) hits.delete(otherKey);
      }
      lastSweep = now;
    }
    const recent = (hits.get(key) ?? []).filter(time => now - time < windowMs);
    recent.push(now);
    hits.set(key, recent);
    return recent.length > limit;
  };

  return {
    isLimited,
    get size(): number {
      return hits.size;
    },
  };
};
