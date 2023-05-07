import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly client: Redis;

  constructor() {
    this.client = new Redis({
      host: process.env.UPSTASH_REDIS_HOST,
      port: parseInt(process.env.UPSTASH_REDIS_PORT),
      password: process.env.UPSTASH_REDIS_PASSWORD,
      tls: {},
    });
  }

  async ping(): Promise<string> {
    return await this.client.ping();
  }

  async getValue(key: string): Promise<string> {
    return await this.client.get(key);
  }

  async setValue(
    key: string,
    value: string,
    expireSeconds?: number,
  ): Promise<void> {
    await this.client.set(key, value);
    if (expireSeconds) {
      await this.client.expire(key, expireSeconds);
    }
  }

  async setSortedList(key: string, score: number, name: string): Promise<void> {
    await this.client.zadd(key, score, name);
  }

  async getRank(key: string, content: string): Promise<number | null> {
    const rank = await this.client.zrevrank(key, content);
    return rank !== null ? rank + 1 : null;
  }
}
