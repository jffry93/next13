import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Create a new ratelimiter, that allows 3 requests per the specified duration
const prodRateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, '1 h'),
  analytics: true,
  prefix: '@upstash/ratelimit',
});

const localRateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1m'),
  analytics: true,
  prefix: '@upstash/ratelimit',
});

export const rateLimit = () => {
  if (process.env.LOCAL === 'true') {
    return localRateLimit;
  } else {
    return prodRateLimit;
  }
};
