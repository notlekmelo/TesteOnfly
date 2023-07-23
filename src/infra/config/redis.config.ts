import { CacheModuleOptions, CacheOptionsFactory } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CACHE_1_DAY } from '@shared/constants';
import * as redisStore from 'cache-manager-redis-store';

export class RedisConfigFactory implements CacheOptionsFactory {
  createCacheOptions(): CacheModuleOptions {
    //cache module not accept => register async
    const config = new ConfigService();
    if (!config.get('REDIS_HOST')) {
      return {
        ttl: CACHE_1_DAY,
      };
    }
    return {
      store: redisStore,
      host: config.get('REDIS_HOST'),
      port: config.get('REDIS_PORT'),
      password: config.get('REDIS_PASSWORD'),
      ttl: CACHE_1_DAY,
      db: 0,
    };
  }
}
