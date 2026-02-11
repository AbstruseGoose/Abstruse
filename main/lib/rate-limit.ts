import { RateLimiterMemory } from "rate-limiter-flexible";

const limiter = new RateLimiterMemory({
  points: 6,
  duration: 60,
});

export async function rateLimit(key: string) {
  try {
    await limiter.consume(key);
    return { success: true };
  } catch {
    return { success: false };
  }
}
