import Redis from 'ioredis';

/**
 * Creates and returns a single ioredis client configured from env vars.
 * Throws at startup if required vars are missing.
 */
export function createRedisClient(): Redis {
  const host = process.env.REDIS_HOST;
  const port = process.env.REDIS_PORT;

  if (!host || !port) {
    throw new Error(
      'Missing required Redis environment variables: REDIS_HOST, REDIS_PORT',
    );
  }

  const client = new Redis({
    host,
    port: parseInt(port, 10),
    // Fail fast — don't retry per command if Redis is down
    maxRetriesPerRequest: 0,
    // Give up connecting after 2 seconds so API calls don't hang
    connectTimeout: 2000,
    lazyConnect: true,
    // Don't keep retrying the connection forever in the background
    retryStrategy: () => null,
  });

  client.on('error', (err: Error) => {
    console.error('[Redis] Connection error:', err.message);
  });

  return client;
}

/** Injection token used to provide the Redis client via DI */
export const REDIS_CLIENT = Symbol('REDIS_CLIENT');
