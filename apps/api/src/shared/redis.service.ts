import { Injectable, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private client: Redis;
  private readonly logger = new Logger(RedisService.name);
  private isConnected = false;

  constructor(private configService: ConfigService) {
    const redisUrl = configService.get<string>('REDIS_URL');

    if (!redisUrl) {
      this.logger.warn('REDIS_URL not configured - Redis features disabled');
      this.client = new Redis({ lazyConnect: true, maxRetriesPerRequest: 0 });
      return;
    }

    try {
      this.client = new Redis(redisUrl, {
        lazyConnect: true,
        maxRetriesPerRequest: 0,
        retryStrategy: () => null,
      });

      this.client.on('error', (err) => {
        if (this.isConnected) {
          this.logger.warn(`Redis error: ${err.message}`);
        }
        this.isConnected = false;
      });

      this.client.on('connect', () => {
        this.isConnected = true;
        this.logger.log('Redis connected');
      });

      this.client.connect().catch(() => {
        this.logger.warn('Redis connection failed - continuing without Redis');
      });
    } catch (error) {
      this.logger.warn('Redis initialization failed - continuing without Redis');
      this.client = new Redis({ lazyConnect: true, maxRetriesPerRequest: 0 });
    }
  }

  async get(key: string): Promise<string | null> {
    if (!this.isConnected) return null;
    try {
      return await this.client.get(key);
    } catch {
      return null;
    }
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    if (!this.isConnected) return;
    try {
      if (ttl) {
        await this.client.setex(key, ttl, value);
      } else {
        await this.client.set(key, value);
      }
    } catch {
      // Silently fail
    }
  }

  async del(key: string): Promise<void> {
    if (!this.isConnected) return;
    try {
      await this.client.del(key);
    } catch {
      // Silently fail
    }
  }

  async exists(key: string): Promise<boolean> {
    if (!this.isConnected) return false;
    try {
      return (await this.client.exists(key)) === 1;
    } catch {
      return false;
    }
  }

  async incr(key: string): Promise<number> {
    if (!this.isConnected) return 0;
    try {
      return await this.client.incr(key);
    } catch {
      return 0;
    }
  }

  async expire(key: string, seconds: number): Promise<void> {
    if (!this.isConnected) return;
    try {
      await this.client.expire(key, seconds);
    } catch {
      // Silently fail
    }
  }

  async hset(key: string, field: string, value: string): Promise<void> {
    if (!this.isConnected) return;
    try {
      await this.client.hset(key, field, value);
    } catch {
      // Silently fail
    }
  }

  async hget(key: string, field: string): Promise<string | null> {
    if (!this.isConnected) return null;
    try {
      return await this.client.hget(key, field);
    } catch {
      return null;
    }
  }

  async hgetall(key: string): Promise<Record<string, string>> {
    if (!this.isConnected) return {};
    try {
      return await this.client.hgetall(key);
    } catch {
      return {};
    }
  }

  async publish(channel: string, message: string): Promise<void> {
    if (!this.isConnected) return;
    try {
      await this.client.publish(channel, message);
    } catch {
      // Silently fail
    }
  }

  async onModuleDestroy() {
    try {
      await this.client.quit();
    } catch {
      // Ignore
    }
  }
}
