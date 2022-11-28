import Redis, { Redis as RedisClient } from 'ioredis';
import { cacheConfig } from '@config/cache';

export class RedisCache {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  public async save(key: string, value: any) {
    await this.client.set(key, JSON.stringify(value));
  }

  public async recover<T>(key: string) {
    const data = await this.client.get(key);

    if (!data) return null;

    const parsedData = JSON.parse(data) as T;

    return parsedData;
  }

  public async invalidate(key: string) {
    await this.client.del(key);
  }
}
