import { Request, Response, NextFunction } from 'express';
import Redis from 'ioredis';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import { AppError } from '@shared/errors/AppError';
import { Status } from '@shared/classes/Status';
import { cacheConfig } from '@config/cache';
const { tooManyRequests } = new Status();

const {
  config: { redis: redisConfigs },
} = cacheConfig;

export async function rateLimiter(req: Request, res: Response, next: NextFunction) {
  try {
    const redisClient = new Redis({ ...redisConfigs });

    const [maxRequestPerSecond, limiterInSeconds] = [5, 1];

    const limiter = new RateLimiterRedis({
      storeClient: redisClient,
      keyPrefix: 'ratelimit',
      points: maxRequestPerSecond,
      duration: limiterInSeconds,
    });

    await limiter.consume(req.ip);

    return next();
  } catch (err) {
    throw new AppError('Too many requests.', tooManyRequests);
  }
}
