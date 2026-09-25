import { describe, expect, it } from 'vitest';
import { createRateLimiter } from '../../server/utils/rate-limit';

describe('createRateLimiter', () => {
  it('allows the limit per window for each key', () => {
    const limiter = createRateLimiter({ limit: 2, windowMs: 1000 });
    expect(limiter.isLimited('a', 0)).toBe(false);
    expect(limiter.isLimited('a', 10)).toBe(false);
    expect(limiter.isLimited('a', 20)).toBe(true);
    expect(limiter.isLimited('b', 20)).toBe(false);
  });

  it('lets requests through again as old ones leave the window', () => {
    const limiter = createRateLimiter({ limit: 2, windowMs: 1000 });
    limiter.isLimited('a', 0);
    limiter.isLimited('a', 100);
    expect(limiter.isLimited('a', 200)).toBe(true);
    expect(limiter.isLimited('a', 1150)).toBe(false);
  });

  it('forgets keys that stayed quiet for a whole window', () => {
    const limiter = createRateLimiter({ limit: 5, windowMs: 1000 });
    limiter.isLimited('a', 0);
    limiter.isLimited('b', 500);
    expect(limiter.size).toBe(2);
    limiter.isLimited('c', 1200);
    expect(limiter.size).toBe(2);
    limiter.isLimited('c', 2600);
    expect(limiter.size).toBe(1);
  });
});
